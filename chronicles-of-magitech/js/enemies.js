// Aktualizacja modułu wrogów: rejestracja zgonów w Arenie, Najazdach i Zleceniach oraz EXP
window.EnemyManager = (function() {
  let enemies = [];
  let nextId = 1;

  function init() {
    enemies = [];
    spawnForWorld('hub');
  }

  function spawnForWorld(worldId) {
    enemies = [];

    if (worldId === 'hub') {
      for (let i = 0; i < 14; i++) spawnEnemy('wolf', 1100 + Math.random() * 900, 200 + Math.random() * 650);
      for (let i = 0; i < 10; i++) spawnEnemy('goblin', 1200 + Math.random() * 800, 300 + Math.random() * 550);
      for (let i = 0; i < 12; i++) spawnEnemy('drone', 250 + Math.random() * 850, 1050 + Math.random() * 650);
      for (let i = 0; i < 8; i++) spawnEnemy('golem_minion', 300 + Math.random() * 800, 1150 + Math.random() * 600);
      spawnEnemy('ruin_guardian', 600, 1600);

    } else if (worldId === 'frostlands') {
      for (let i = 0; i < 16; i++) spawnEnemy('frost_wolf', 500 + Math.random() * 1200, 400 + Math.random() * 1000);
      for (let i = 0; i < 12; i++) spawnEnemy('frost_golem', 600 + Math.random() * 1100, 500 + Math.random() * 900);
      spawnEnemy('frost_titan', 1400, 1200);

    } else if (worldId === 'catacombs') {
      for (let i = 0; i < 20; i++) spawnEnemy('skeleton', 350 + Math.random() * 1200, 350 + Math.random() * 1000);
      for (let i = 0; i < 12; i++) spawnEnemy('skeleton_mage', 400 + Math.random() * 1100, 400 + Math.random() * 900);
      spawnEnemy('skeleton_king', 1200, 1100);

    } else if (worldId === 'fire_realm') {
      for (let i = 0; i < 22; i++) spawnEnemy('fire_elemental', 500 + Math.random() * 1300, 500 + Math.random() * 1000);
      spawnEnemy('flame_lord', 1600, 1400);
    }
  }

  function spawnEnemy(typeKey, x, y) {
    const proto = window.GAME_CONFIG.ENEMIES[typeKey];
    if (!proto) return null;

    const enemy = {
      id: nextId++,
      typeKey,
      name: proto.name,
      x,
      y,
      hp: proto.hp,
      maxHp: proto.hp,
      atk: proto.atk,
      spd: proto.spd,
      isBoss: proto.isBoss || false,
      isRanged: proto.isRanged || false,
      exp: proto.exp,
      gold: proto.gold,
      science: proto.science,
      spriteType: proto.spriteType,
      color: proto.color,
      lastAttack: 0,
      attackCooldown: proto.isBoss ? 1200 : 900,
      state: 'idle',
      spawnX: x,
      spawnY: y,
      wanderTimer: 0,
      targetX: x,
      targetY: y
    };

    enemies.push(enemy);
    return enemy;
  }

  function update(dt, hero) {
    if (!hero) return;

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      const dx = hero.x - e.x;
      const dy = hero.y - e.y;
      const dist = Math.hypot(dx, dy);
      const aggroRadius = e.isBoss ? 450 : 260;

      if (dist < aggroRadius) {
        e.state = 'chase';
        const stopDist = e.isRanged ? 180 : 36;

        if (dist > stopDist) {
          const moveX = (dx / dist) * e.spd;
          const moveY = (dy / dist) * e.spd;
          const newX = e.x + moveX;
          const newY = e.y + moveY;

          if (!window.GameMap.isBlocked(newX, e.y, 14)) e.x = newX;
          if (!window.GameMap.isBlocked(e.x, newY, 14)) e.y = newY;
        }

        const attackRange = e.isRanged ? 220 : 42;
        if (dist <= attackRange && Date.now() - e.lastAttack >= e.attackCooldown) {
          e.lastAttack = Date.now();
          if (e.isRanged) {
            window.CombatManager.spawnEnemyProjectile(e.x, e.y, hero.x, hero.y, e.atk, e.color);
          } else {
            window.HeroManager.takeDamage(e.atk);
          }
        }
      } else {
        e.state = 'idle';
        e.wanderTimer -= dt;
        if (e.wanderTimer <= 0) {
          e.wanderTimer = 2000 + Math.random() * 3000;
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 60;
          e.targetX = e.spawnX + Math.cos(angle) * r;
          e.targetY = e.spawnY + Math.sin(angle) * r;
        }

        const wdx = e.targetX - e.x;
        const wdy = e.targetY - e.y;
        const wdist = Math.hypot(wdx, wdy);
        if (wdist > 5) {
          e.x += (wdx / wdist) * (e.spd * 0.4);
          e.y += (wdy / wdist) * (e.spd * 0.4);
        }
      }
    }
  }

  function damageEnemy(enemyId, amount, isCrit = false) {
    const enemy = enemies.find(e => e.id === enemyId);
    if (!enemy) return false;

    enemy.hp -= amount;
    window.GameAudio.enemyHit();
    if (window.UI) {
      const color = isCrit ? '#ffea00' : '#ffffff';
      window.UI.showFloatingText(isCrit ? `KRYT! -${Math.round(amount)}` : `-${Math.round(amount)}`, enemy.x, enemy.y - 20, color);
    }

    if (enemy.hp <= 0) {
      killEnemy(enemy);
      return true;
    }
    return false;
  }

  function killEnemy(enemy) {
    enemies = enemies.filter(e => e.id !== enemy.id);

    const bonuses = window.HeroManager.getBonuses();
    const finalGold = Math.floor(enemy.gold * (1 + (bonuses.resourceGold || 0)));
    const finalScience = Math.floor(enemy.science * (1 + (bonuses.resourceScience || 0)));

    if (window.PlayerState) {
      window.PlayerState.addGold(finalGold);
      window.PlayerState.addScience(finalScience);
    }

    // Dodanie punktów EXP dla bohatera
    if (window.TalentManager) {
      window.TalentManager.addExp(enemy.exp || 25);
    }

    // Drop przedmiotów i klejnotów
    rollLootDrop(enemy);

    // Rejestracja zabójstw w systemach
    if (window.QuestManager) window.QuestManager.onEnemyKilled(enemy.typeKey, enemy.isBoss);
    if (window.BountyManager) window.BountyManager.onEnemyKilled(enemy.typeKey, enemy.isBoss);
    if (window.ArenaManager) window.ArenaManager.onEnemyKilled();
    if (window.TownDefense) window.TownDefense.onEnemyKilled();

    if (window.CombatManager) {
      window.CombatManager.spawnDeathParticles(enemy.x, enemy.y, enemy.color);
    }

    if (!enemy.isBoss && !window.ArenaManager.isArenaActive()) {
      setTimeout(() => {
        spawnEnemy(enemy.typeKey, enemy.spawnX, enemy.spawnY);
      }, 16000);
    }
  }

  function rollLootDrop(enemy) {
    const dropChance = enemy.isBoss ? 1.0 : 0.25;
    if (Math.random() <= dropChance && window.InventoryManager) {
      const shopItems = window.GAME_CONFIG.SHOP_ITEMS.filter(i => i.type !== 'consumable');
      const randomItem = shopItems[Math.floor(Math.random() * shopItems.length)];
      if (randomItem) window.InventoryManager.addItem(randomItem);
    }

    // Szansa na kamień runiczny
    if (Math.random() < 0.15 && window.GemManager) {
      const gems = ['gem_ruby', 'gem_sapphire', 'gem_emerald', 'gem_amethyst'];
      window.GemManager.addGem(gems[Math.floor(Math.random() * gems.length)]);
    }
  }

  function render(ctx, camera) {
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      if (
        e.x + 60 >= camera.x && e.x - 60 <= camera.x + camera.width &&
        e.y + 60 >= camera.y && e.y - 60 <= camera.y + camera.height
      ) {
        const screenX = Math.floor(e.x - camera.x);
        const screenY = Math.floor(e.y - camera.y);

        ctx.save();
        ctx.beginPath();
        const radX = e.isBoss ? 28 : 14;
        const radY = e.isBoss ? 14 : 7;
        ctx.ellipse(screenX, screenY + 12, radX, radY, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fill();

        const sprite = PixelSprites.get(e.spriteType);
        const size = e.isBoss ? 64 : 32;
        if (sprite) {
          ctx.drawImage(sprite, screenX - size / 2, screenY - size / 2, size, size);
        } else {
          ctx.fillStyle = e.color;
          ctx.fillRect(screenX - size / 2, screenY - size / 2, size, size);
        }

        const barW = e.isBoss ? 60 : 30;
        const barH = e.isBoss ? 7 : 4;
        const hpRatio = Math.max(0, e.hp / e.maxHp);
        ctx.fillStyle = '#000';
        ctx.fillRect(screenX - barW / 2, screenY - size / 2 - 10, barW, barH);
        ctx.fillStyle = e.isBoss ? '#ff1744' : '#e53935';
        ctx.fillRect(screenX - barW / 2 + 1, screenY - size / 2 - 9, (barW - 2) * hpRatio, barH - 2);

        if (e.isBoss) {
          ctx.font = '8px "Press Start 2P", monospace, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#ffea00';
          ctx.fillText(e.name, screenX, screenY - size / 2 - 14);
        }

        ctx.restore();
      }
    }
  }

  return {
    init,
    spawnForWorld,
    spawnEnemy,
    update,
    render,
    damageEnemy,
    getAll: () => enemies,
    getNearby: (x, y, radius) => enemies.filter(e => Math.hypot(e.x - x, e.y - y) <= radius)
  };
})();
