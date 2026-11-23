// Menedżer Sklepu w Wiosce (Zakup mieczy, łuków, zbroi, pierścieni, mikstur i sprzedaż)
window.ShopManager = (function() {
  function buyItem(itemConfigId) {
    const itemProto = window.GAME_CONFIG.SHOP_ITEMS.find(i => i.id === itemConfigId);
    if (!itemProto) return false;

    // Zniżka z poziomu Kuźni w osadzie
    const townBonuses = window.TownManager ? window.TownManager.getBonuses() : { shopDiscount: 0 };
    const finalPrice = Math.max(5, Math.floor(itemProto.price * (1 - (townBonuses.shopDiscount || 0))));

    if (!window.PlayerState.spendGold(finalPrice)) {
      if (window.UI) window.UI.showNotification(`Brakuje Ci złota! Cena: ${finalPrice} 🪙`);
      return false;
    }

    if (itemProto.type === 'consumable') {
      // Użycie mikstury od razu
      applyConsumable(itemProto);
    } else {
      // Dodanie do ekwipunku
      const added = window.InventoryManager.addItem(itemProto);
      if (!added) {
        // Zwrot jeśli brak miejsca
        window.PlayerState.addGold(finalPrice);
        return false;
      }
    }

    window.GameAudio.pickup();
    if (window.UI) {
      window.UI.showNotification(`Kupiono: ${itemProto.name} za ${finalPrice} 🪙!`);
      window.UI.updateShopUI();
      window.UI.updateHUD();
    }
    return true;
  }

  function sellItem(uniqueId) {
    const backpack = window.InventoryManager.getBackpack();
    const index = backpack.findIndex(i => i.uniqueId === uniqueId);
    if (index === -1) return false;

    const item = backpack[index];
    const sellPrice = Math.floor((item.price || 30) * 0.6) + ((item.upgradeLevel || 0) * 15);

    backpack.splice(index, 1);
    window.PlayerState.addGold(sellPrice);

    window.GameAudio.pickup();
    if (window.UI) {
      window.UI.showNotification(`Sprzedano: ${item.name} za +${sellPrice} 🪙!`);
      window.UI.updateInventoryUI();
      window.UI.updateShopUI();
      window.UI.updateHUD();
    }
    return true;
  }

  function applyConsumable(item) {
    const hero = window.HeroManager.getActive();
    if (!hero) return;

    if (item.effect.type === 'heal') {
      const maxHp = window.HeroManager.getMaxHp(hero);
      hero.stats.hp = Math.min(maxHp, hero.stats.hp + item.effect.value);
      if (window.UI) window.UI.showFloatingText(`+${item.effect.value} HP!`, hero.x, hero.y - 25, '#00e676');
    } else if (item.effect.type === 'reset_cd') {
      hero.lastSkill = 0;
      if (window.UI) window.UI.showFloatingText('Umiejętność Gotowa!', hero.x, hero.y - 25, '#ffea00');
    }
  }

  return {
    buyItem,
    sellItem
  };
})();
