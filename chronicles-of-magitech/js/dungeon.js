// Generator Proceduralnych Lochów (Dungeon Crawler) z Pokojami, Korytarzami, Pułapkami i Skarbami
window.DungeonGenerator = (function() {
  const DUNGEON_COLS = 60;
  const DUNGEON_ROWS = 50;

  let dungeonGrid = [];
  let dungeonCollisions = [];
  let traps = []; // { x, y, type: 'spikes'|'fire', state: 0, timer: 0 }
  let chests = []; // { x, y, opened: false }

  function generateDungeon() {
    dungeonGrid = [];
    dungeonCollisions = [];
    traps = [];
    chests = [];

    // Wypełnienie ścianami
    for (let r = 0; r < DUNGEON_ROWS; r++) {
      dungeonGrid[r] = [];
      dungeonCollisions[r] = [];
      for (let c = 0; c < DUNGEON_COLS; c++) {
        dungeonGrid[r][c] = 'tile_wall';
        dungeonCollisions[r][c] = 1;
      }
    }

    // Wygenerowanie 8 losowych połączonych sal
    const rooms = [];
    const roomCount = 8;

    for (let i = 0; i < roomCount; i++) {
      const w = 6 + Math.floor(Math.random() * 6);
      const h = 5 + Math.floor(Math.random() * 5);
      const x = 3 + Math.floor(Math.random() * (DUNGEON_COLS - w - 6));
      const y = 3 + Math.floor(Math.random() * (DUNGEON_ROWS - h - 6));

      // Wyrzeźbienie pokoju
      for (let r = y; r < y + h; r++) {
        for (let c = x; c < x + w; c++) {
          dungeonGrid[r][c] = 'tile_dungeon_floor';
          dungeonCollisions[r][c] = 0;
        }
      }

      // Dodanie pułapki w pokoju (50% szansy)
      if (Math.random() < 0.5 && i > 0) {
        traps.push({
          x: (x + Math.floor(w / 2)) * 32,
          y: (y + Math.floor(h / 2)) * 32,
          type: Math.random() < 0.5 ? 'spikes' : 'fire',
          active: false,
          timer: Math.random() * 2000
        });
      }

      // Dodanie skrzyni ze skarbami (40% szansy)
      if (Math.random() < 0.45 && i > 0) {
        chests.push({
          x: (x + 2) * 32,
          y: (y + 2) * 32,
          opened: false
        });
      }

      rooms.push({ x: x + Math.floor(w / 2), y: y + Math.floor(h / 2) });
    }

    // Połączenie sal korytarzami
    for (let i = 0; i < rooms.length - 1; i++) {
      connectRooms(rooms[i], rooms[i + 1]);
    }

    // Portal powrotny w pierwszej sali
    const start = rooms[0];
    dungeonGrid[start.y][start.x] = 'tile_portal';
    dungeonCollisions[start.y][start.x] = 0;

    return {
      grid: dungeonGrid,
      collisions: dungeonCollisions,
      spawn: { x: (start.x + 1) * 32, y: start.y * 32 },
      traps,
      chests
    };
  }

  function connectRooms(r1, r2) {
    let curX = r1.x;
    let curY = r1.y;

    while (curX !== r2.x) {
      dungeonGrid[curY][curX] = 'tile_dungeon_floor';
      dungeonCollisions[curY][curX] = 0;
      curX += curX < r2.x ? 1 : -1;
    }

    while (curY !== r2.y) {
      dungeonGrid[curY][curX] = 'tile_dungeon_floor';
      dungeonCollisions[curY][curX] = 0;
      curY += curY < r2.y ? 1 : -1;
    }
  }

  function update(dt, hero) {
    if (!hero) return;

    // Aktualizacja i detekcja pułapek
    traps.forEach(trap => {
      trap.timer += dt;
      if (trap.timer >= 2200) {
        trap.timer = 0;
        trap.active = !trap.active;
      }

      if (trap.active && Math.hypot(trap.x - hero.x, trap.y - hero.y) < 22) {
        window.HeroManager.takeDamage(18);
        if (window.UI) window.UI.showFloatingText('PUŁAPKA!', trap.x, trap.y - 15, '#ff1744');
      }
    });

    // Otwieranie skrzyń klawiszem E
    chests.forEach(chest => {
      if (!chest.opened && Math.hypot(chest.x - hero.x, chest.y - hero.y) < 32) {
        chest.opened = true;
        window.GameAudio.questComplete();
        const goldGain = 60 + Math.floor(Math.random() * 80);
        const sciGain = 30 + Math.floor(Math.random() * 40);
        window.PlayerState.addGold(goldGain);
        window.PlayerState.addScience(sciGain);

        // Szansa na losowy przedmiot ze skrzyni
        if (Math.random() < 0.6 && window.InventoryManager) {
          const items = window.GAME_CONFIG.SHOP_ITEMS.filter(i => i.type !== 'consumable');
          const randomItem = items[Math.floor(Math.random() * items.length)];
          if (randomItem) window.InventoryManager.addItem(randomItem);
        }

        if (window.UI) {
          window.UI.showNotification(`Otwarto Skrzynię Skarbów! (+${goldGain} 🪙, +${sciGain} 🧪)`);
          window.UI.showFloatingText(`SKARB! +${goldGain} 🪙`, chest.x, chest.y - 20, '#ffd700');
        }
      }
    });
  }

  function render(ctx, camera) {
    // Rysowanie pułapek
    traps.forEach(t => {
      const sx = Math.floor(t.x - camera.x);
      const sy = Math.floor(t.y - camera.y);
      ctx.fillStyle = t.active ? (t.type === 'fire' ? '#ff3d00' : '#b0bec5') : '#37474f';
      ctx.fillRect(sx - 12, sy - 12, 24, 24);
      ctx.strokeStyle = t.active ? '#ffeb3b' : '#263238';
      ctx.strokeRect(sx - 12, sy - 12, 24, 24);
    });

    // Rysowanie skrzyń
    chests.forEach(c => {
      const sx = Math.floor(c.x - camera.x);
      const sy = Math.floor(c.y - camera.y);
      ctx.fillStyle = c.opened ? '#4e342e' : '#ffd700';
      ctx.fillRect(sx - 14, sy - 10, 28, 20);
      ctx.strokeStyle = '#000';
      ctx.strokeRect(sx - 14, sy - 10, 28, 20);
    });
  }

  return {
    generateDungeon,
    update,
    render,
    getTraps: () => traps,
    getChests: () => chests
  };
})();
