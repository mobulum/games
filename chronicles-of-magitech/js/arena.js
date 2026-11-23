// Menedżer Areny Koloseum i Trybu Survival (Fale Potworów)
window.ArenaManager = (function() {
  let isArenaActive = false;
  let currentWave = 1;
  let waveTimer = 0;
  let highestWaveRecord = 1;
  let waveEnemiesRemaining = 0;

  function init() {
    isArenaActive = false;
    currentWave = 1;
    highestWaveRecord = parseInt(localStorage.getItem('GRA7_ARENA_RECORD') || '1');
  }

  function startArena() {
    isArenaActive = true;
    currentWave = 1;
    // Przeniesienie do strefy areny w Hubie
    const hero = window.HeroManager.getActive();
    if (hero) {
      hero.x = 1600;
      hero.y = 1200;
    }
    spawnWave(currentWave);
    if (window.UI) {
      window.UI.showModalNotification(
        'ARENA PRZETRWANIA ROZPOCZĘTA!',
        `Wkroczyłeś do Koloseum! Pokonuj kolejne fale wrogów, aby zdobywać legendarny rynsztunek i chwałę!`
      );
      window.UI.updateHUD();
    }
  }

  function spawnWave(waveNum) {
    const waveDef = window.GAME_CONFIG.ARENA_WAVES[(waveNum - 1) % window.GAME_CONFIG.ARENA_WAVES.length];
    waveEnemiesRemaining = 0;

    waveDef.enemies.forEach(group => {
      for (let i = 0; i < group.count; i++) {
        const rx = 1450 + Math.random() * 300;
        const ry = 1050 + Math.random() * 300;
        window.EnemyManager.spawnEnemy(group.type, rx, ry);
        waveEnemiesRemaining++;
      }
    });

    if (waveNum > highestWaveRecord) {
      highestWaveRecord = waveNum;
      localStorage.setItem('GRA7_ARENA_RECORD', highestWaveRecord.toString());
    }

    if (window.UI) {
      window.UI.showNotification(`FALA ${waveNum} ROZPOCZĘTA! ${waveDef.isBossWave ? '⚠️ FALA BOSSA!' : ''}`);
    }
  }

  function onEnemyKilled() {
    if (!isArenaActive) return;
    waveEnemiesRemaining--;

    if (waveEnemiesRemaining <= 0) {
      // Wygrana fali!
      const goldReward = currentWave * 60;
      const sciReward = currentWave * 30;
      window.PlayerState.addGold(goldReward);
      window.PlayerState.addScience(sciReward);
      window.GameAudio.questComplete();

      if (window.UI) {
        window.UI.showNotification(`FALA ${currentWave} UKOŃCZONA! (+${goldReward} 🪙, +${sciReward} 🧪)`);
      }

      currentWave++;
      setTimeout(() => {
        if (isArenaActive) spawnWave(currentWave);
      }, 4000);
    }
  }

  function stopArena() {
    isArenaActive = false;
    const hero = window.HeroManager.getActive();
    if (hero) {
      hero.x = 450;
      hero.y = 420;
    }
    if (window.UI) window.UI.showNotification('Opuściłeś Arenę Przetrwania.');
  }

  return {
    init,
    startArena,
    stopArena,
    onEnemyKilled,
    isArenaActive: () => isArenaActive,
    getCurrentWave: () => currentWave,
    getRecord: () => highestWaveRecord
  };
})();
