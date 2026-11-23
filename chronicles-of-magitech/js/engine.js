// Zaktualizowany Silnik Gry z obsługą klawiszy [R] Ultimate, [Z] Mount, [K] Talenty oraz Środowiska
window.GameEngine = (function() {
  let canvas, ctx;
  let lastTime = 0;
  let isRunning = false;

  const camera = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    shakeDuration: 0,
    shakeIntensity: 0
  };

  const keys = {};
  const mouse = {
    screenX: 0,
    screenY: 0,
    worldX: 0,
    worldY: 0,
    isDown: false,
    rightDown: false
  };

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setupInput();
    lastTime = performance.now();
    isRunning = true;
    requestAnimationFrame(loop);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.width = canvas.width;
    camera.height = canvas.height;
    if (ctx) ctx.imageSmoothingEnabled = false;
  }

  function setupInput() {
    window.addEventListener('keydown', (e) => {
      keys[e.key.toLowerCase()] = true;

      // 1-5 Zmiana postaci
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const heroKeys = ['warrior', 'archer', 'mage', 'behemoth', 'avatar'];
        const chosenId = heroKeys[parseInt(e.key) - 1];
        if (chosenId) window.HeroManager.switchHero(chosenId);
      }

      // Klawisze skrótowe okien
      if (e.key.toLowerCase() === 'm') window.UI.toggleShop();
      if (e.key.toLowerCase() === 'i') window.UI.toggleInventory();
      if (e.key.toLowerCase() === 'k') window.UI.toggleTalents();
      if (e.key.toLowerCase() === 'z') window.MountManager.toggleMount();
      if (e.key.toLowerCase() === 'b') window.UI.toggleTown();
      if (e.key.toLowerCase() === 'p') window.UI.togglePets();
      if (e.key.toLowerCase() === 't') window.UI.toggleTechTree();
      if (e.key.toLowerCase() === 'x') window.ArenaManager.startArena();

      // [R] - Atak Ultimate
      if (e.key.toLowerCase() === 'r') {
        const hero = window.HeroManager.getActive();
        if (hero) window.CombatManager.performHeroUltimate(hero);
      }

      // Interakcja i Minigry (Wędkarstwo / Górnictwo)
      if (e.key.toLowerCase() === 'e') {
        const hero = window.HeroManager.getActive();
        if (hero) {
          // Najpierw sprawdzamy wędkarstwo i górnictwo
          const mined = window.MiniGames && window.MiniGames.tryMine(hero.x, hero.y);
          if (!mined) {
            const fished = window.MiniGames && window.MiniGames.tryFish(hero.x, hero.y);
            if (!fished) {
              window.QuestManager.checkNpcInteraction(hero.x, hero.y);
            }
          }
        }
      }

      // Spacja - podstawowy skill
      if (e.code === 'Space') {
        e.preventDefault();
        const hero = window.HeroManager.getActive();
        if (hero) window.CombatManager.performHeroSkill(hero, mouse.worldX, mouse.worldY);
      }
    });

    window.addEventListener('keyup', (e) => {
      keys[e.key.toLowerCase()] = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.screenX = e.clientX - rect.left;
      mouse.screenY = e.clientY - rect.top;
      mouse.worldX = mouse.screenX + camera.x;
      mouse.worldY = mouse.screenY + camera.y;
    });

    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        mouse.isDown = true;
        const hero = window.HeroManager.getActive();
        if (hero) window.CombatManager.performHeroAttack(hero, mouse.worldX, mouse.worldY);
      } else if (e.button === 2) {
        mouse.rightDown = true;
        const hero = window.HeroManager.getActive();
        if (hero) window.CombatManager.performHeroSkill(hero, mouse.worldX, mouse.worldY);
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      if (e.button === 0) mouse.isDown = false;
      if (e.button === 2) mouse.rightDown = false;
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  function loop(timestamp) {
    if (!isRunning) return;
    const dt = Math.min(100, timestamp - lastTime);
    lastTime = timestamp;

    update(dt);
    render();

    requestAnimationFrame(loop);
  }

  function update(dt) {
    const hero = window.HeroManager.getActive();
    if (!hero) return;

    let moveX = 0;
    let moveY = 0;

    if (keys['w'] || keys['arrowup']) moveY -= 1;
    if (keys['s'] || keys['arrowdown']) moveY += 1;
    if (keys['a'] || keys['arrowleft']) moveX -= 1;
    if (keys['d'] || keys['arrowright']) moveX += 1;

    hero.isMoving = (moveX !== 0 || moveY !== 0);

    if (hero.isMoving) {
      const len = Math.hypot(moveX, moveY);
      const spd = window.HeroManager.getSpeed(hero);
      const vx = (moveX / len) * spd;
      const vy = (moveY / len) * spd;

      const newX = hero.x + vx;
      const newY = hero.y + vy;

      if (!window.GameMap.isBlocked(newX, hero.y, 14)) hero.x = newX;
      if (!window.GameMap.isBlocked(hero.x, newY, 14)) hero.y = newY;
    }

    mouse.worldX = mouse.screenX + camera.x;
    mouse.worldY = mouse.screenY + camera.y;

    if (mouse.isDown) {
      window.CombatManager.performHeroAttack(hero, mouse.worldX, mouse.worldY);
    }

    // Aktualizacja modułów
    window.HeroManager.update(dt);
    window.EnemyManager.update(dt, hero);
    window.CombatManager.update(dt, hero);
    if (window.PetManager) window.PetManager.update(dt, hero);
    if (window.MountManager) window.MountManager.update(dt, hero);
    if (window.TownManager) window.TownManager.update();
    if (window.EnvironmentManager) window.EnvironmentManager.update(dt);

    if (window.GameMap.getCurrentWorldId() === 'catacombs') {
      window.DungeonGenerator.update(dt, hero);
    }

    // Kamera
    let targetCamX = hero.x - camera.width / 2;
    let targetCamY = hero.y - camera.height / 2;
    targetCamX = Math.max(0, Math.min(window.GameMap.width - camera.width, targetCamX));
    targetCamY = Math.max(0, Math.min(window.GameMap.height - camera.height, targetCamY));

    camera.x += (targetCamX - camera.x) * 0.1;
    camera.y += (targetCamY - camera.y) * 0.1;

    if (camera.shakeDuration > 0) {
      camera.shakeDuration -= dt;
      camera.x += (Math.random() - 0.5) * camera.shakeIntensity;
      camera.y += (Math.random() - 0.5) * camera.shakeIntensity;
    }
  }

  function triggerShake(intensity = 5, duration = 200) {
    camera.shakeIntensity = intensity;
    camera.shakeDuration = duration;
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hero = window.HeroManager.getActive();

    window.GameMap.render(ctx, camera);
    window.QuestManager.renderNpcs(ctx, camera);
    window.EnemyManager.render(ctx, camera);
    if (window.PetManager) window.PetManager.render(ctx, camera);
    window.HeroManager.render(ctx, camera);
    window.CombatManager.render(ctx, camera);

    // Renderowanie nocy i pogody na wierzchu
    if (window.EnvironmentManager) {
      window.EnvironmentManager.render(ctx, camera, hero);
    }
  }

  return {
    init,
    triggerShake,
    getCamera: () => camera,
    getMouse: () => mouse
  };
})();
