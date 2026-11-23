// Menedżer Mapy integrujący Proceduralne Lochy i Obiekty Minigier
window.GameMap = (function() {
  const TILE_SIZE = 32;
  const COLS = 75;
  const ROWS = 60;

  let currentWorldId = 'hub';
  let grid = [];
  let collisionGrid = [];
  let interactiveObjects = [];

  function initMap(worldId = 'hub') {
    currentWorldId = worldId;
    grid = [];
    collisionGrid = [];
    interactiveObjects = [];

    if (worldId === 'catacombs') {
      // Wywołanie proceduralnego generatora lochów!
      const dungeon = window.DungeonGenerator.generateDungeon();
      grid = dungeon.grid;
      collisionGrid = dungeon.collisions;
      return;
    }

    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      collisionGrid[r] = [];
      for (let c = 0; c < COLS; c++) {
        if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) {
          grid[r][c] = 'tile_wall';
          collisionGrid[r][c] = 1;
          continue;
        }

        if (worldId === 'hub') {
          generateHubTile(r, c);
        } else if (worldId === 'frostlands') {
          generateFrostTile(r, c);
        } else if (worldId === 'fire_realm') {
          generateFireTile(r, c);
        }
      }
    }

    if (worldId === 'hub') {
      setupHubWorld();
    } else {
      setupSubWorld(worldId);
    }
  }

  function generateHubTile(r, c) {
    if (r < 25 && c < 28) {
      if ((r === 12 && c >= 6 && c <= 22) || (c === 14 && r >= 4 && r <= 20)) {
        grid[r][c] = 'tile_path';
      } else {
        grid[r][c] = 'tile_grass';
      }
      collisionGrid[r][c] = 0;
    } else if (r < 30 && c >= 28) {
      grid[r][c] = 'tile_grass';
      if ((r * 11 + c * 17) % 19 === 0) {
        grid[r][c] = 'tile_wall';
        collisionGrid[r][c] = 1;
      } else {
        collisionGrid[r][c] = 0;
      }
    } else if (r >= 25 && c < 38) {
      grid[r][c] = 'tile_ruin';
      if ((r * 7 + c * 13) % 17 === 0) {
        grid[r][c] = 'tile_wall';
        collisionGrid[r][c] = 1;
      } else {
        collisionGrid[r][c] = 0;
      }
    } else {
      grid[r][c] = 'tile_lava';
      if ((r * 5 + c * 23) % 15 === 0) {
        grid[r][c] = 'tile_wall';
        collisionGrid[r][c] = 1;
      } else {
        collisionGrid[r][c] = 0;
      }
    }
  }

  function generateFrostTile(r, c) {
    grid[r][c] = 'tile_snow';
    collisionGrid[r][c] = 0;
    if ((r * 9 + c * 7) % 11 === 0) grid[r][c] = 'tile_ice';
    if ((r * 13 + c * 19) % 23 === 0) {
      grid[r][c] = 'tile_wall';
      collisionGrid[r][c] = 1;
    }
  }

  function generateFireTile(r, c) {
    grid[r][c] = 'tile_lava';
    collisionGrid[r][c] = 0;
    if ((r * 17 + c * 11) % 13 === 0) {
      grid[r][c] = 'tile_wall';
      collisionGrid[r][c] = 1;
    }
  }

  function setupHubWorld() {
    buildStructure(5, 5, 5, 4, 'Warsztat Badań');
    buildStructure(16, 5, 5, 4, 'Sklep Kupca Barnaby');
    buildStructure(10, 15, 6, 4, 'Kowalia & Baza');

    // Rzeka (Wędkarstwo)
    for (let r = 8; r < 24; r++) {
      if (r !== 12) {
        grid[r][28] = 'tile_water';
        collisionGrid[r][28] = 1;
      } else {
        grid[r][28] = 'tile_path';
        collisionGrid[r][28] = 0;
      }
    }

    grid[12][18] = 'tile_portal';
    collisionGrid[12][18] = 0;

    const corePositions = [
      { x: 300, y: 1100 }, { x: 550, y: 1250 }, { x: 800, y: 1400 },
      { x: 450, y: 1600 }, { x: 950, y: 1200 }
    ];
    corePositions.forEach((pos, idx) => {
      interactiveObjects.push({
        id: 'core_' + idx,
        type: 'power_core',
        x: pos.x,
        y: pos.y,
        radius: 18,
        collected: false
      });
    });
  }

  function setupSubWorld(worldId) {
    grid[7][7] = 'tile_portal';
    collisionGrid[7][7] = 0;
  }

  function buildStructure(startC, startR, width, height, name) {
    for (let r = startR; r < startR + height; r++) {
      for (let c = startC; c < startC + width; c++) {
        if (r === startR + height - 1 && c === startC + Math.floor(width / 2)) {
          grid[r][c] = 'tile_path';
          collisionGrid[r][c] = 0;
        } else {
          grid[r][c] = 'tile_wall';
          collisionGrid[r][c] = 1;
        }
      }
    }
  }

  function switchWorld(worldId) {
    if (!window.GAME_CONFIG.WORLDS[worldId]) return;
    initMap(worldId);

    const worldDef = window.GAME_CONFIG.WORLDS[worldId];
    const hero = window.HeroManager.getActive();
    if (hero) {
      hero.x = worldDef.spawn.x;
      hero.y = worldDef.spawn.y;
    }

    if (window.EnemyManager) window.EnemyManager.spawnForWorld(worldId);

    window.GameAudio.questComplete();
    if (window.UI) {
      window.UI.showModalNotification(
        `PRZENIESIONO DO ŚWIATA:`,
        `<strong style="color:${worldDef.color}">${worldDef.name}</strong><br>` +
        `<em>${worldDef.description}</em>`
      );
      window.UI.updateHUD();
    }
  }

  function isBlocked(x, y, radius = 12) {
    const minC = Math.floor((x - radius) / TILE_SIZE);
    const maxC = Math.floor((x + radius) / TILE_SIZE);
    const minR = Math.floor((y - radius) / TILE_SIZE);
    const maxR = Math.floor((y + radius) / TILE_SIZE);

    if (minC < 0 || maxC >= COLS || minR < 0 || maxR >= ROWS) return true;

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        if (collisionGrid[r] && collisionGrid[r][c] === 1) {
          return true;
        }
      }
    }
    return false;
  }

  function checkPortalInteraction(heroX, heroY) {
    const c = Math.floor(heroX / TILE_SIZE);
    const r = Math.floor(heroY / TILE_SIZE);
    if (grid[r] && grid[r][c] === 'tile_portal') {
      if (currentWorldId === 'hub') {
        if (window.UI) window.UI.toggleWorldPortalModal();
      } else {
        switchWorld('hub');
      }
      return true;
    }
    return false;
  }

  function render(ctx, camera) {
    const startCol = Math.max(0, Math.floor(camera.x / TILE_SIZE));
    const endCol = Math.min(COLS - 1, Math.ceil((camera.x + camera.width) / TILE_SIZE));
    const startRow = Math.max(0, Math.floor(camera.y / TILE_SIZE));
    const endRow = Math.min(ROWS - 1, Math.ceil((camera.y + camera.height) / TILE_SIZE));

    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const tileName = grid[r] ? grid[r][c] : 'tile_wall';
        const sprite = PixelSprites.get(tileName);
        const posX = Math.floor(c * TILE_SIZE - camera.x);
        const posY = Math.floor(r * TILE_SIZE - camera.y);

        if (sprite) {
          ctx.drawImage(sprite, posX, posY, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = '#222';
          ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    // Rysowanie lochów (pułapki i skrzynie)
    if (currentWorldId === 'catacombs') {
      window.DungeonGenerator.render(ctx, camera);
    }

    // Minigry (żyły rudy)
    if (window.MiniGames) window.MiniGames.render(ctx, camera);

    // Rdzenie w Hubie
    if (currentWorldId === 'hub') {
      interactiveObjects.forEach(obj => {
        if (obj.collected) return;
        if (
          obj.x + 30 >= camera.x && obj.x - 30 <= camera.x + camera.width &&
          obj.y + 30 >= camera.y && obj.y - 30 <= camera.y + camera.height
        ) {
          const sprite = PixelSprites.get('item_core');
          const drawX = Math.floor(obj.x - 16 - camera.x);
          const drawY = Math.floor(obj.y - 16 - camera.y);
          if (sprite) ctx.drawImage(sprite, drawX, drawY, 32, 32);
          ctx.save();
          ctx.beginPath();
          ctx.arc(drawX + 16, drawY + 16, 16 + Math.sin(Date.now() / 200) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      });
    }
  }

  return {
    init: initMap,
    render,
    isBlocked,
    switchWorld,
    checkPortalInteraction,
    getCurrentWorldId: () => currentWorldId,
    getInteractiveObjects: () => interactiveObjects,
    TILE_SIZE,
    COLS,
    ROWS,
    width: COLS * TILE_SIZE,
    height: ROWS * TILE_SIZE
  };
})();
