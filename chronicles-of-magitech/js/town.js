// Menedżer Rozbudowy Osady / Wioski (Town & Buildings)
window.TownManager = (function() {
  let buildings = {};
  let lastIncomeTick = Date.now();

  function init() {
    buildings = JSON.parse(JSON.stringify(window.GAME_CONFIG.TOWN_BUILDINGS));
  }

  function upgradeBuilding(buildingId) {
    const b = buildings[buildingId];
    if (!b) return false;

    if (b.level >= b.maxLevel) {
      if (window.UI) window.UI.showNotification(`${b.name} ma już maksymalny poziom!`);
      return false;
    }

    const goldCost = Math.floor(b.costGold * (1 + b.level * 0.8));
    const scienceCost = Math.floor(b.costScience * (1 + b.level * 0.7));

    if (window.PlayerState.getGold() < goldCost || window.PlayerState.getScience() < scienceCost) {
      if (window.UI) window.UI.showNotification(`Brakuje surowców! Koszt: ${goldCost} 🪙, ${scienceCost} 🧪`);
      return false;
    }

    window.PlayerState.spendGold(goldCost);
    window.PlayerState.spendScience(scienceCost);

    b.level++;
    window.GameAudio.techUnlocked();
    if (window.UI) {
      window.UI.showNotification(`Ulepszono: ${b.name} do Poziomu ${b.level}!`);
      window.UI.updateTownUI();
      window.UI.updateHUD();
    }
    return true;
  }

  // Pasywny przychód co 30 sekund
  function update() {
    const now = Date.now();
    if (now - lastIncomeTick >= 30000) {
      lastIncomeTick = now;

      // Dochód ze Skarbca (Złoto)
      if (buildings.treasury && buildings.treasury.level > 0) {
        const goldGain = buildings.treasury.level * 15;
        window.PlayerState.addGold(goldGain);
        if (window.UI) window.UI.showFloatingText(`+${goldGain} 🪙 (Podatek)`, 450, 400, '#ffd700');
      }

      // Dochód z Alchemii (Punkty Badań)
      if (buildings.alchemist && buildings.alchemist.level > 0) {
        const sciGain = buildings.alchemist.level * 6;
        window.PlayerState.addScience(sciGain);
        if (window.UI) window.UI.showFloatingText(`+${sciGain} 🧪 (Badania)`, 480, 360, '#00e5ff');
      }
    }
  }

  function getBonuses() {
    return {
      shopDiscount: buildings.blacksmith ? buildings.blacksmith.level * 0.05 : 0,
      forgeBonus: buildings.blacksmith ? buildings.blacksmith.level * 0.10 : 0,
      defenseBonus: buildings.defense_tower ? buildings.defense_tower.level * 0.10 : 0
    };
  }

  return {
    init,
    update,
    upgradeBuilding,
    getBuildings: () => buildings,
    getBonuses
  };
})();
