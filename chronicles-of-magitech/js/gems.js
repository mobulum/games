// Menedżer Kamieni Runicznych, Gniazd i Zaklinania Przedmiotów (Gems & Sockets)
window.GemManager = (function() {
  let inventoryGems = ['gem_ruby', 'gem_sapphire', 'gem_emerald', 'gem_amethyst']; // początkowy zapas

  function addGem(gemId) {
    inventoryGems.push(gemId);
    if (window.UI) {
      const g = window.GAME_CONFIG.GEMS.find(x => x.id === gemId);
      if (g) window.UI.showNotification(`Zdobyto kamień: ${g.name}`);
      window.UI.updateGemsUI();
    }
  }

  function socketGem(itemUniqueId, gemId) {
    const item = window.InventoryManager.getBackpack().find(i => i.uniqueId === itemUniqueId) ||
                 Object.values(window.InventoryManager.getEquipped()).find(i => i && i.uniqueId === itemUniqueId);

    if (!item) return false;
    if (!item.sockets || item.sockets <= 0) {
      if (window.UI) window.UI.showNotification('Ten przedmiot nie posiada wolnych gniazd!');
      return false;
    }

    if (!item.socketedGems) item.socketedGems = [];
    if (item.socketedGems.length >= item.sockets) {
      if (window.UI) window.UI.showNotification('Wszystkie gniazda w przedmiocie są już zapełnione!');
      return false;
    }

    const gemIdx = inventoryGems.indexOf(gemId);
    if (gemIdx === -1) return false;

    inventoryGems.splice(gemIdx, 1);
    item.socketedGems.push(gemId);

    window.GameAudio.techUnlocked();
    window.InventoryManager.recalculateStats();

    if (window.UI) {
      window.UI.showNotification(`Osadzono pomyślnie kamień runiczny w ${item.name}!`);
      window.UI.updateGemsUI();
      window.UI.updateInventoryUI();
    }
    return true;
  }

  return {
    addGem,
    socketGem,
    getGems: () => inventoryGems
  };
})();
