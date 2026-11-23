// Menedżer Tablicy Zleceń Łowcy Głów (Bounties) & Najazdów na Wioskę (Town Defense)
window.BountyManager = (function() {
  let activeBounties = [];
  let hunterTokens = 0;

  function init() {
    activeBounties = JSON.parse(JSON.stringify(window.GAME_CONFIG.BOUNTIES));
    activeBounties.forEach(b => {
      b.current = 0;
      b.completed = false;
    });
    hunterTokens = 0;
  }

  function onEnemyKilled(enemyTypeKey, isBoss) {
    activeBounties.forEach(b => {
      if (!b.completed && b.target === enemyTypeKey) {
        b.current++;
        if (b.current >= b.count) {
          b.completed = true;
          hunterTokens += b.rewardTokens;
          window.PlayerState.addGold(b.rewardGold);
          window.GameAudio.questComplete();
          if (window.UI) {
            window.UI.showModalNotification(
              'LIST GOŃCZY ZREALIZOWANY!',
              `Zrealizowano zlecenie: <strong>${b.title}</strong>!<br>` +
              `Nagroda: +${b.rewardGold} 🪙 oraz <strong>+${b.rewardTokens} Żetonów Łowcy</strong>!`
            );
            window.UI.updateBountiesUI();
          }
        }
      }
    });
  }

  function buyHunterChest() {
    if (hunterTokens < 5) {
      if (window.UI) window.UI.showNotification('Potrzebujesz 5 Żetonów Łowcy na skrzynię!');
      return false;
    }
    hunterTokens -= 5;
    window.GameAudio.questComplete();
    // Przyznanie losowego epickiego/legendarnego przedmiotu
    const pool = window.GAME_CONFIG.SHOP_ITEMS.filter(i => i.rarity === 'EPIC' || i.rarity === 'LEGENDARY');
    const reward = pool[Math.floor(Math.random() * pool.length)];
    if (reward && window.InventoryManager) {
      window.InventoryManager.addItem(reward);
    }
    if (window.UI) {
      window.UI.showNotification(`Otwarto Skrzynię Łowcy! Zdobyto: ${reward.name}!`);
      window.UI.updateBountiesUI();
    }
    return true;
  }

  return {
    init,
    onEnemyKilled,
    buyHunterChest,
    getBounties: () => activeBounties,
    getTokens: () => hunterTokens
  };
})();

// Tryb Najazdów na Wioskę (Town Defense Event)
window.TownDefense = (function() {
  let isRaidActive = false;
  let raidEnemiesLeft = 0;

  function triggerRaid() {
    if (isRaidActive) return;
    isRaidActive = true;
    raidEnemiesLeft = 14;

    window.GameAudio.questComplete();
    if (window.UI) {
      window.UI.showModalNotification(
        'ALARM BOJOWY! NAJAZD NA WIOSKĘ!',
        'Róg wojenny rozbrzmiał w Dolinie! Horda potworów szturmuje Osadę!<br>' +
        'Broń wioski wspólnie ze swoimi Wieżami Strażniczymi!'
      );
    }

    // Spawn fali najeźdźców wokół osady
    for (let i = 0; i < 14; i++) {
      const rx = 300 + Math.random() * 400;
      const ry = 150 + Math.random() * 350;
      const type = Math.random() < 0.5 ? 'goblin' : 'wolf';
      window.EnemyManager.spawnEnemy(type, rx, ry);
    }
  }

  function onEnemyKilled() {
    if (!isRaidActive) return;
    raidEnemiesLeft--;
    if (raidEnemiesLeft <= 0) {
      isRaidActive = false;
      window.PlayerState.addGold(250);
      window.PlayerState.addScience(150);
      window.GameAudio.questComplete();
      if (window.UI) {
        window.UI.showModalNotification(
          'NAJAZD ODPARTY!',
          'Wioska jest bezpieczna! Mieszkańcy nagrodzili Cię kwotą +250 🪙 oraz +150 🧪 badań!'
        );
      }
    }
  }

  return {
    triggerRaid,
    onEnemyKilled,
    isRaidActive: () => isRaidActive
  };
})();
