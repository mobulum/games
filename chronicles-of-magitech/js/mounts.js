// Menedżer Wierzchowców (Mounts) i Szarży Bojowej [Z]
window.MountManager = (function() {
  let activeMount = null;
  let ownedMounts = ['mount_steam_horse']; // gracz startuje z Koniem Parowym
  let isMounted = false;
  let lastChargeTime = 0;

  function init() {
    activeMount = window.GAME_CONFIG.MOUNTS[0];
    isMounted = false;
  }

  function toggleMount() {
    if (!activeMount) return false;
    isMounted = !isMounted;
    window.GameAudio.heroSwitch();

    if (window.UI) {
      if (isMounted) {
        window.UI.showFloatingText(`Dosiadłeś: ${activeMount.name}! [Z]`, window.HeroManager.getActive().x, window.HeroManager.getActive().y - 25, activeMount.color);
      } else {
        window.UI.showFloatingText('Zsiadłeś z wierzchowca.', window.HeroManager.getActive().x, window.HeroManager.getActive().y - 25, '#cfd8dc');
      }
      window.UI.updateHUD();
    }
    return isMounted;
  }

  function buyMount(mountId) {
    const mount = window.GAME_CONFIG.MOUNTS.find(m => m.id === mountId);
    if (!mount) return false;
    if (ownedMounts.includes(mountId)) {
      activeMount = mount;
      if (window.UI) window.UI.showNotification(`Wybrano: ${mount.name}`);
      return true;
    }

    if (!window.PlayerState.spendGold(mount.cost)) {
      if (window.UI) window.UI.showNotification(`Potrzebujesz ${mount.cost} 🪙 na zakup!`);
      return false;
    }

    ownedMounts.push(mountId);
    activeMount = mount;
    window.GameAudio.questComplete();
    if (window.UI) {
      window.UI.showNotification(`Kupiono wierzchowca: ${mount.name}!`);
      window.UI.updateMountsUI();
    }
    return true;
  }

  function update(dt, hero) {
    if (!isMounted || !activeMount || !hero) return;

    // Szarża bojowa: gdy gracz porusza się z pełną prędkością, taranuje wrogów
    if (hero.isMoving && Date.now() - lastChargeTime >= 500) {
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, 42);
      if (enemies.length > 0) {
        lastChargeTime = Date.now();
        window.GameAudio.swordSwing();
        enemies.forEach(e => {
          const dmg = activeMount.chargeDmg;
          window.EnemyManager.damageEnemy(e.id, dmg, true);
          if (window.UI) window.UI.showFloatingText(`SZARŻA! -${dmg}`, e.x, e.y - 20, activeMount.color);
        });
      }
    }
  }

  function render(ctx, camera, hero) {
    if (!isMounted || !activeMount || !hero) return;

    const sx = Math.floor(hero.x - camera.x);
    const sy = Math.floor(hero.y - camera.y);

    // Poświata wierzchowca pod stopami bohatera
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(sx, sy + 16, 22, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = activeMount.color;
    ctx.globalAlpha = 0.4;
    ctx.fill();
    ctx.restore();
  }

  function getSpeedMultiplier() {
    return isMounted && activeMount ? (1 + activeMount.speedBonus) : 1.0;
  }

  return {
    init,
    toggleMount,
    buyMount,
    update,
    render,
    isMounted: () => isMounted,
    getActiveMount: () => activeMount,
    getOwnedMounts: () => ownedMounts,
    getSpeedMultiplier
  };
})();
