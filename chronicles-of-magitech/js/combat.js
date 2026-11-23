// Rozszerzony Menedżer Walki: Obsługa Zdolności Ultimate [R], Efektów Klejnotów i Szarży
window.CombatManager = (function() {
  let playerProjectiles = [];
  let enemyProjectiles = [];
  let particles = [];
  let floatingTexts = [];

  function init() {
    playerProjectiles = [];
    enemyProjectiles = [];
    particles = [];
    floatingTexts = [];
  }

  function performHeroAttack(hero, targetWorldX, targetWorldY) {
    if (!hero) return;
    const now = Date.now();
    if (now - hero.lastAttack < hero.attackCooldown) return;
    hero.lastAttack = now;

    // Ładowanie Furii przy ataku
    window.HeroManager.addFury(4);

    const angle = Math.atan2(targetWorldY - hero.y, targetWorldX - hero.x);
    const baseAtk = window.HeroManager.getAtk(hero);
    const bonuses = window.HeroManager.getBonuses();
    const isCrit = Math.random() < (hero.stats.critChance + (bonuses.critBonus || 0));
    const critMult = isCrit ? (1.5 + (bonuses.critDmgBonus || 0)) : 1.0;
    const finalDmg = Math.floor(baseAtk * critMult);

    if (hero.attackType === 'melee' || hero.attackType === 'melee_heavy') {
      window.GameAudio.swordSwing();
      const range = hero.attackRange;
      const arcAngle = 0.9;
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, range + 20);

      enemies.forEach(e => {
        const eAngle = Math.atan2(e.y - hero.y, e.x - hero.x);
        let diff = Math.abs(angle - eAngle);
        while (diff > Math.PI) diff -= Math.PI * 2;
        if (Math.abs(diff) < arcAngle) {
          window.EnemyManager.damageEnemy(e.id, finalDmg, isCrit);
          spawnHitParticles(e.x, e.y, '#ffffff');
          applyGemEffects(e, finalDmg);
        }
      });

      spawnSlashEffect(hero.x, hero.y, angle, range, hero.attackType === 'melee_heavy' ? '#ff9800' : '#eceff1');

    } else if (hero.attackType === 'ranged') {
      window.GameAudio.bowShot();
      playerProjectiles.push({
        x: hero.x, y: hero.y,
        vx: Math.cos(angle) * 7.5, vy: Math.sin(angle) * 7.5,
        radius: 4, dmg: finalDmg, isCrit, type: 'arrow', color: '#8d6e63', lifetime: 45
      });

    } else if (hero.attackType === 'magic') {
      window.GameAudio.lightning();
      playerProjectiles.push({
        x: hero.x, y: hero.y,
        vx: Math.cos(angle) * 6.5, vy: Math.sin(angle) * 6.5,
        radius: 6, dmg: finalDmg, isCrit, type: 'lightning_orb', color: '#00e5ff', lifetime: 50
      });

    } else if (hero.attackType === 'cosmic') {
      window.GameAudio.cosmicBeam();
      playerProjectiles.push({
        x: hero.x, y: hero.y,
        vx: Math.cos(angle) * 8.5, vy: Math.sin(angle) * 8.5,
        radius: 8, dmg: finalDmg, isCrit, type: 'cosmic_star', color: '#ff1744', lifetime: 45
      });
    }
  }

  function performHeroSkill(hero, targetWorldX, targetWorldY) {
    if (!hero) return;
    const now = Date.now();
    const cd = window.HeroManager.getSkillCooldown(hero);
    if (now - hero.lastSkill < cd) {
      const remainingSec = Math.ceil((cd - (now - hero.lastSkill)) / 1000);
      if (window.UI) window.UI.showFloatingText(`Odnowienie skilla (${remainingSec}s)`, hero.x, hero.y - 20, '#ff9800');
      return;
    }
    hero.lastSkill = now;
    window.HeroManager.addFury(12);

    const baseAtk = window.HeroManager.getAtk(hero);

    if (hero.id === 'warrior') {
      window.GameAudio.swordSwing();
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, 90);
      enemies.forEach(e => {
        window.EnemyManager.damageEnemy(e.id, Math.floor(baseAtk * 2.2), true);
        spawnHitParticles(e.x, e.y, '#ffffff');
      });
      spawnShockwave(hero.x, hero.y, 90, '#eceff1');

    } else if (hero.id === 'archer') {
      window.GameAudio.bowShot();
      const baseAngle = Math.atan2(targetWorldY - hero.y, targetWorldX - hero.x);
      for (let i = -2; i <= 2; i++) {
        const spreadAngle = baseAngle + (i * 0.15);
        playerProjectiles.push({
          x: hero.x, y: hero.y,
          vx: Math.cos(spreadAngle) * 8.0, vy: Math.sin(spreadAngle) * 8.0,
          radius: 5, dmg: Math.floor(baseAtk * 1.4), isCrit: true, type: 'arrow', color: '#29b6f6', lifetime: 55
        });
      }

    } else if (hero.id === 'mage') {
      window.GameAudio.lightning();
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, 300);
      const chainTargets = enemies.slice(0, 5);
      chainTargets.forEach((e, idx) => {
        setTimeout(() => {
          window.EnemyManager.damageEnemy(e.id, Math.floor(baseAtk * 2.6), true);
          spawnHitParticles(e.x, e.y, '#00e5ff');
          spawnLightningBolt(hero.x, hero.y, e.x, e.y);
        }, idx * 100);
      });

    } else if (hero.id === 'behemoth') {
      window.GameAudio.rocketLaunch();
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const randAngle = Math.random() * Math.PI * 2;
          playerProjectiles.push({
            x: hero.x, y: hero.y,
            vx: Math.cos(randAngle) * 5.5, vy: Math.sin(randAngle) * 5.5,
            radius: 7, dmg: Math.floor(baseAtk * 2.0), isCrit: true, type: 'rocket', color: '#ffa726', lifetime: 60
          });
        }, i * 80);
      }

    } else if (hero.id === 'avatar') {
      window.GameAudio.explosion();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const offsetX = (Math.random() - 0.5) * 320;
          const offsetY = (Math.random() - 0.5) * 320;
          spawnMeteorImpact(targetWorldX + offsetX, targetWorldY + offsetY, Math.floor(baseAtk * 3.0));
        }, i * 140);
      }
    }
  }

  // Aktywacja Ataku Ostatecznego Ultimate [R]
  function performHeroUltimate(hero) {
    if (!hero) return;
    if (!window.HeroManager.canUseUltimate()) {
      if (window.UI) window.UI.showFloatingText('Furia nie jest naładowana! (100% wymagane)', hero.x, hero.y - 25, '#ff5252');
      return;
    }
    window.HeroManager.consumeUltimate();
    window.GameAudio.questComplete();

    const baseAtk = window.HeroManager.getAtk(hero);

    if (hero.id === 'warrior') {
      // Tytaniczny Skok i Pęknięcie Ziemi
      window.GameAudio.explosion();
      spawnShockwave(hero.x, hero.y, 220, '#ffea00');
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, 220);
      enemies.forEach(e => {
        window.EnemyManager.damageEnemy(e.id, Math.floor(baseAtk * 5.0), true);
        e.spd = 0.5; // ogłuszenie
        setTimeout(() => { e.spd = window.GAME_CONFIG.ENEMIES[e.typeKey].spd; }, 3000);
      });
      if (window.UI) window.UI.showFloatingText('TYTANICZNE PĘKNIĘCIE ZIEMI!', hero.x, hero.y - 35, '#ffea00');

    } else if (hero.id === 'archer') {
      // Deszcz Eterycznych Strzał
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          const rx = hero.x + (Math.random() - 0.5) * 600;
          const ry = hero.y + (Math.random() - 0.5) * 600;
          playerProjectiles.push({
            x: rx, y: ry - 180, vx: 0, vy: 9.0, radius: 5, dmg: Math.floor(baseAtk * 1.8), isCrit: true, type: 'arrow', color: '#00e5ff', lifetime: 30
          });
        }, i * 35);
      }
      if (window.UI) window.UI.showFloatingText('DESZCZ ETERU!', hero.x, hero.y - 35, '#00e5ff');

    } else if (hero.id === 'mage') {
      // Singularność Grawitacyjna (Czarna Dziura)
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, 450);
      enemies.forEach(e => {
        e.x = hero.x + (Math.random() - 0.5) * 60;
        e.y = hero.y + (Math.random() - 0.5) * 60;
        window.EnemyManager.damageEnemy(e.id, Math.floor(baseAtk * 6.0), true);
      });
      spawnShockwave(hero.x, hero.y, 160, '#7c4dff');
      if (window.UI) window.UI.showFloatingText('SINGULARNOŚĆ GRAWITACYJNA!', hero.x, hero.y - 35, '#7c4dff');

    } else if (hero.id === 'behemoth') {
      // Przeciążenie Reaktora
      spawnShockwave(hero.x, hero.y, 250, '#ff3d00');
      const enemies = window.EnemyManager.getNearby(hero.x, hero.y, 250);
      enemies.forEach(e => window.EnemyManager.damageEnemy(e.id, Math.floor(baseAtk * 5.5), true));
      hero.stats.hp = Math.min(window.HeroManager.getMaxHp(hero), hero.stats.hp + 250);
      if (window.UI) window.UI.showFloatingText('PRZECIĄŻENIE REAKTORA!', hero.x, hero.y - 35, '#ff3d00');

    } else if (hero.id === 'avatar') {
      // Supernowa
      window.GameAudio.explosion();
      window.EnemyManager.getAll().forEach(e => {
        window.EnemyManager.damageEnemy(e.id, 1200, true);
        spawnHitParticles(e.x, e.y, '#ff1744');
      });
      spawnShockwave(hero.x, hero.y, 500, '#ff1744');
      if (window.UI) window.UI.showFloatingText('SUPERNOWA KOSMICZNA!', hero.x, hero.y - 35, '#ff1744');
    }
  }

  function applyGemEffects(enemy, dmg) {
    const eq = window.InventoryManager.getEquipped();
    const weapon = eq.weapon;
    if (!weapon || !weapon.socketedGems) return;

    weapon.socketedGems.forEach(gId => {
      if (gId === 'gem_ruby') {
        // Podpalenie DoT
        setTimeout(() => window.EnemyManager.damageEnemy(enemy.id, 25, false), 500);
        setTimeout(() => window.EnemyManager.damageEnemy(enemy.id, 25, false), 1000);
      } else if (gId === 'gem_sapphire') {
        // Zamrożenie
        enemy.spd = 0.8;
        setTimeout(() => { enemy.spd = window.GAME_CONFIG.ENEMIES[enemy.typeKey].spd; }, 2000);
      } else if (gId === 'gem_amethyst') {
        // Kradzież życia
        const hero = window.HeroManager.getActive();
        if (hero) hero.stats.hp = Math.min(window.HeroManager.getMaxHp(hero), hero.stats.hp + Math.floor(dmg * 0.06));
      }
    });
  }

  function spawnEnemyProjectile(startX, startY, targetX, targetY, dmg, color) {
    const angle = Math.atan2(targetY - startY, targetX - startX);
    enemyProjectiles.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * 4.5, vy: Math.sin(angle) * 4.5,
      radius: 5, dmg, color: color || '#ff5252', lifetime: 65
    });
  }

  function update(dt, hero) {
    for (let i = playerProjectiles.length - 1; i >= 0; i--) {
      const p = playerProjectiles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.lifetime--;

      if (window.GameMap.isBlocked(p.x, p.y, p.radius)) {
        spawnHitParticles(p.x, p.y, p.color);
        playerProjectiles.splice(i, 1);
        continue;
      }

      const nearby = window.EnemyManager.getNearby(p.x, p.y, p.radius + 15);
      if (nearby.length > 0) {
        const target = nearby[0];
        window.EnemyManager.damageEnemy(target.id, p.dmg, p.isCrit);
        spawnHitParticles(p.x, p.y, p.color);
        applyGemEffects(target, p.dmg);
        playerProjectiles.splice(i, 1);
        continue;
      }

      if (p.lifetime <= 0) playerProjectiles.splice(i, 1);
    }

    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
      const ep = enemyProjectiles[i];
      ep.x += ep.vx;
      ep.y += ep.vy;
      ep.lifetime--;

      if (window.GameMap.isBlocked(ep.x, ep.y, ep.radius)) {
        spawnHitParticles(ep.x, ep.y, ep.color);
        enemyProjectiles.splice(i, 1);
        continue;
      }

      if (hero && Math.hypot(ep.x - hero.x, ep.y - hero.y) < ep.radius + 14) {
        window.HeroManager.takeDamage(ep.dmg);
        spawnHitParticles(ep.x, ep.y, ep.color);
        enemyProjectiles.splice(i, 1);
        continue;
      }

      if (ep.lifetime <= 0) enemyProjectiles.splice(i, 1);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const part = particles[i];
      part.x += part.vx;
      part.y += part.vy;
      part.life -= dt;
      if (part.life <= 0) particles.splice(i, 1);
    }

    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y -= 0.6;
      ft.life -= dt;
      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }
  }

  function spawnMeteorImpact(x, y, dmg) {
    window.GameAudio.explosion();
    spawnShockwave(x, y, 70, '#ff1744');
    const hitEnemies = window.EnemyManager.getNearby(x, y, 70);
    hitEnemies.forEach(e => {
      window.EnemyManager.damageEnemy(e.id, dmg, true);
      spawnHitParticles(e.x, e.y, '#ff1744');
    });
  }

  function spawnHitParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 2.5;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 2, color, life: 250 + Math.random() * 150
      });
    }
  }

  function spawnDeathParticles(x, y, color) {
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.0 + Math.random() * 3.5;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 3, color, life: 400 + Math.random() * 250
      });
    }
  }

  function spawnSlashEffect(x, y, angle, radius, color) {
    particles.push({ x, y, vx: 0, vy: 0, angle, radius, color, isSlash: true, life: 120 });
  }

  function spawnShockwave(x, y, radius, color) {
    particles.push({ x, y, vx: 0, vy: 0, maxRadius: radius, color, isShockwave: true, life: 200, maxLife: 200 });
  }

  function spawnLightningBolt(x1, y1, x2, y2) {
    particles.push({ x1, y1, x2, y2, color: '#00e5ff', isLightning: true, life: 150 });
  }

  function addFloatingText(text, x, y, color = '#ffffff') {
    floatingTexts.push({ text, x, y, color, life: 800, maxLife: 800 });
  }

  function render(ctx, camera) {
    ctx.save();
    playerProjectiles.forEach(p => {
      const sx = Math.floor(p.x - camera.x);
      const sy = Math.floor(p.y - camera.y);
      ctx.fillStyle = p.color;
      ctx.fillRect(sx - p.radius, sy - p.radius, p.radius * 2, p.radius * 2);
    });

    enemyProjectiles.forEach(ep => {
      const sx = Math.floor(ep.x - camera.x);
      const sy = Math.floor(ep.y - camera.y);
      ctx.fillStyle = ep.color;
      ctx.fillRect(sx - ep.radius, sy - ep.radius, ep.radius * 2, ep.radius * 2);
    });

    particles.forEach(part => {
      const sx = Math.floor(part.x - camera.x);
      const sy = Math.floor(part.y - camera.y);

      if (part.isSlash) {
        ctx.beginPath();
        ctx.arc(sx, sy, part.radius, part.angle - 0.7, part.angle + 0.7);
        ctx.strokeStyle = part.color;
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (part.isShockwave) {
        const progress = 1 - (part.life / part.maxLife);
        ctx.beginPath();
        ctx.arc(sx, sy, part.maxRadius * progress, 0, Math.PI * 2);
        ctx.strokeStyle = part.color;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.stroke();
      } else if (part.isLightning) {
        ctx.beginPath();
        ctx.moveTo(part.x1 - camera.x, part.y1 - camera.y);
        ctx.lineTo(part.x2 - camera.x, part.y2 - camera.y);
        ctx.strokeStyle = part.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.fillStyle = part.color;
        ctx.fillRect(sx, sy, part.size, part.size);
      }
    });

    ctx.font = '8px "Press Start 2P", monospace, sans-serif';
    ctx.textAlign = 'center';
    floatingTexts.forEach(ft => {
      const sx = Math.floor(ft.x - camera.x);
      const sy = Math.floor(ft.y - camera.y);
      const alpha = Math.max(0, ft.life / ft.maxLife);
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.fillText(ft.text, sx + 1, sy + 1);
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = alpha;
      ctx.fillText(ft.text, sx, sy);
      ctx.globalAlpha = 1.0;
    });
    ctx.restore();
  }

  return {
    init,
    performHeroAttack,
    performHeroSkill,
    performHeroUltimate,
    spawnEnemyProjectile,
    spawnDeathParticles,
    spawnHitParticles,
    addFloatingText,
    update,
    render
  };
})();
