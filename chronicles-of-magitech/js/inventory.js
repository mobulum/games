// Menedżer Ekwipunku i Zbrojowni (Inventory & Gear)
window.InventoryManager = (function() {
  let equipped = {
    weapon: null,
    armor: null,
    ring: null
  };
  let backpack = []; // do 18 przedmiotów
  const MAX_SLOTS = 18;

  function init() {
    equipped = { weapon: null, armor: null, ring: null };
    backpack = [];
  }

  function addItem(item) {
    if (backpack.length >= MAX_SLOTS) {
      if (window.UI) window.UI.showFloatingText('Ekwipunek jest pełny!', window.HeroManager.getActive().x, window.HeroManager.getActive().y - 20, '#ff5252');
      return false;
    }
    // Dodajemy kopię z unikalnym ID i poziomem ulepszenia
    const newItem = {
      ...item,
      uniqueId: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      upgradeLevel: item.upgradeLevel || 0
    };
    backpack.push(newItem);
    window.GameAudio.pickup();
    if (window.UI) {
      window.UI.showNotification(`Otrzymano: ${newItem.name}`);
      window.UI.updateInventoryUI();
    }
    return true;
  }

  function equipItem(itemUniqueId) {
    const itemIndex = backpack.findIndex(i => i.uniqueId === itemUniqueId);
    if (itemIndex === -1) return false;
    const item = backpack[itemIndex];

    const slot = item.slot;
    if (!slot || !['weapon', 'armor', 'ring'].includes(slot)) return false;

    // Jeżeli slot jest zajęty, zdejmujemy do plecaka
    if (equipped[slot]) {
      backpack.push(equipped[slot]);
    }

    equipped[slot] = item;
    backpack.splice(itemIndex, 1);

    window.GameAudio.heroSwitch();
    recalculateStats();
    if (window.UI) {
      window.UI.showNotification(`Założono: ${item.name}`);
      window.UI.updateInventoryUI();
      window.UI.updateHUD();
    }
    return true;
  }

  function unequipItem(slot) {
    if (!equipped[slot]) return false;
    if (backpack.length >= MAX_SLOTS) {
      if (window.UI) window.UI.showNotification('Brak miejsca w plecaku!');
      return false;
    }

    backpack.push(equipped[slot]);
    equipped[slot] = null;

    window.GameAudio.heroSwitch();
    recalculateStats();
    if (window.UI) {
      window.UI.updateInventoryUI();
      window.UI.updateHUD();
    }
    return true;
  }

  // Ulepszanie rynsztunku u Kowala (+1 .. +10)
  function upgradeItem(itemUniqueId) {
    let target = Object.values(equipped).find(i => i && i.uniqueId === itemUniqueId);
    if (!target) target = backpack.find(i => i.uniqueId === itemUniqueId);
    if (!target) return false;

    if (target.upgradeLevel >= 10) {
      if (window.UI) window.UI.showNotification('Przedmiot osiągnął maksymalny poziom ulepszenia (+10)!');
      return false;
    }

    const cost = Math.floor((target.price || 50) * 0.4 * (target.upgradeLevel + 1));
    if (!window.PlayerState.spendGold(cost)) {
      if (window.UI) window.UI.showNotification(`Potrzebujesz ${cost} złota na ulepszenie!`);
      return false;
    }

    target.upgradeLevel = (target.upgradeLevel || 0) + 1;
    // Podbicie statystyk o +15% za każdy poziom
    if (target.stats) {
      Object.keys(target.stats).forEach(stat => {
        if (typeof target.stats[stat] === 'number') {
          target.stats[stat] = Math.round(target.stats[stat] * 1.15 * 10) / 10;
        }
      });
    }

    window.GameAudio.techUnlocked();
    recalculateStats();
    if (window.UI) {
      window.UI.showNotification(`Sukces! Ulepszono ${target.name} do +${target.upgradeLevel}!`);
      window.UI.updateInventoryUI();
      window.UI.updateHUD();
    }
    return true;
  }

  // Przeliczanie sumarycznych bonusów ze sprzętu
  function getGearBonuses() {
    const total = {
      atk: 0,
      hp: 0,
      def: 0,
      spd: 0,
      critChance: 0,
      critDmg: 0,
      hpRegen: 0
    };

    Object.values(equipped).forEach(item => {
      if (!item || !item.stats) return;
      if (item.stats.atk) total.atk += item.stats.atk;
      if (item.stats.hp) total.hp += item.stats.hp;
      if (item.stats.def) total.def += item.stats.def;
      if (item.stats.spd) total.spd += item.stats.spd;
      if (item.stats.critChance) total.critChance += item.stats.critChance;
      if (item.stats.critDmg) total.critDmg += item.stats.critDmg;
      if (item.stats.hpRegen) total.hpRegen += item.stats.hpRegen;
    });

    return total;
  }

  function recalculateStats() {
    if (window.HeroManager) {
      window.HeroManager.applyGearBonuses(getGearBonuses());
    }
  }

  return {
    init,
    addItem,
    equipItem,
    unequipItem,
    upgradeItem,
    getEquipped: () => equipped,
    getBackpack: () => backpack,
    getGearBonuses,
    recalculateStats
  };
})();
