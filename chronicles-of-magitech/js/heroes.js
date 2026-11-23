// Zaktualizowany Menedżer Postaci z obsługą Furii (Ultimate [R]), Talentów i Wierzchowców
window.HeroManager = (function() {
  let heroes = [];
  let activeHeroId = 'warrior';
  let activeHero = null;
  let fury = 0; // 0 - 100

  let techBonuses = {
    atkPercent: 0, hpPercent: 0, hpRegen: 0, critBonus: 0,
    critDmgBonus: 0, cooldownReduction: 0, speedBonus: 0,
    dodgeChance: 0, resourceScience: 0, resourceGold: 0,
    periodicShield: 0, currentShield: 0
  };

  let gearBonuses = {
    atk: 0, hp: 0, def: 0, spd: 0, critChance: 0, critDmg: 0, hpRegen: 0
  };

  let talentBonuses = {
    atkPct: 0, def: 0, hp: 0, crit: 0, critDmg: 0, spd: 0,
    dodge: 0, cdr: 0, shield: 0, lifesteal: 0, magicDmg: 0,
    tankHp: 0, tankDef: 0, ramDmg: 0, allDmg: 0, cosmicAura: 0, furyGen: 0
  };

  function init() {
    heroes = JSON.parse(JSON.stringify(window.GAME_CONFIG.HEROES));
    activeHeroId = 'warrior';
    activeHero = heroes.find(h => h.id === activeHeroId);
    activeHero.x = 450;
    activeHero.y = 420;
    activeHero.targetX = 450;
    activeHero.targetY = 420;
    activeHero.vx = 0;
    activeHero.vy = 0;
    activeHero.facing = 'down';
    activeHero.lastAttack = 0;
    activeHero.lastSkill = 0;
    activeHero.animFrame = 0;
    activeHero.isMoving = false;
    fury = 0;
  }

  function addFury(amt) {
    const mult = 1 + (talentBonuses.furyGen || 0);
    fury = Math.min(100, fury + amt * mult);
    if (window.UI) window.UI.updateHUD();
  }

  function canUseUltimate() {
    return fury >= 100;
  }

  function consumeUltimate() {
    fury = 0;
    if (window.UI) window.UI.updateHUD();
  }

  function switchHero(heroId) {
    const target = heroes.find(h => h.id === heroId);
    if (!target) return false;
    if (!target.unlocked) {
      if (window.UI) window.UI.showFloatingText('Postać jest jeszcze zablokowana!', activeHero.x, activeHero.y - 20, '#ff5252');
      return false;
    }
    if (target.id === activeHeroId) return true;

    target.x = activeHero.x;
    target.y = activeHero.y;
    target.facing = activeHero.facing;
    target.animFrame = 0;
    target.isMoving = false;

    const currentHpRatio = activeHero.stats.hp / getMaxHp(activeHero);
    activeHeroId = target.id;
    activeHero = target;
    activeHero.stats.hp = Math.max(10, Math.floor(getMaxHp(activeHero) * currentHpRatio));

    window.GameAudio.heroSwitch();
    if (window.TalentManager) window.TalentManager.recalculateHeroTalentBonuses();

    if (window.UI) {
      const rarity = window.GAME_CONFIG.RARITY_TIERS[activeHero.rarity];
      window.UI.showFloatingText(`Aktywny: ${activeHero.name} [${rarity.name}]`, activeHero.x, activeHero.y - 30, rarity.color);
      window.UI.updateHeroRoster();
      window.UI.updateHUD();
    }
    return true;
  }

  function unlockHero(heroId) {
    const hero = heroes.find(h => h.id === heroId);
    if (hero && !hero.unlocked) {
      hero.unlocked = true;
      const rarity = window.GAME_CONFIG.RARITY_TIERS[hero.rarity];
      window.GameAudio.questComplete();
      if (window.UI) {
        window.UI.showModalNotification(
          `NOWA POSTAĆ ODBLOKOWANA!`,
          `Do Twojej drużyny dołącza: <strong>${hero.name}</strong><br>` +
          `Ranga rzadkości: <span style="color:${rarity.color}; font-weight:bold;">${rarity.name}</span><br>` +
          `<em>${hero.description}</em>`
        );
        window.UI.updateHeroRoster();
      }
      return true;
    }
    return false;
  }

  function applyTechBonuses(b) { techBonuses = { ...techBonuses, ...b }; }
  function applyGearBonuses(b) { gearBonuses = { ...gearBonuses, ...b }; }
  function applyTalentBonuses(b) { talentBonuses = { ...talentBonuses, ...b }; }

  function getMaxHp(hero = activeHero) {
    const base = hero.stats.maxHp + gearBonuses.hp + talentBonuses.hp + talentBonuses.tankHp;
    const tierMult = window.GAME_CONFIG.RARITY_TIERS[hero.rarity].multiplier;
    return Math.floor(base * (1 + techBonuses.hpPercent) * tierMult);
  }

  function getAtk(hero = activeHero) {
    const base = hero.stats.atk + gearBonuses.atk;
    const tierMult = window.GAME_CONFIG.RARITY_TIERS[hero.rarity].multiplier;
    const talentMult = 1 + talentBonuses.atkPct + talentBonuses.allDmg + talentBonuses.magicDmg;
    return Math.floor(base * (1 + techBonuses.atkPercent) * tierMult * talentMult);
  }

  function getDef(hero = activeHero) {
    const townBonuses = window.TownManager ? window.TownManager.getBonuses() : { defenseBonus: 0 };
    return Math.floor((hero.stats.def + gearBonuses.def + talentBonuses.def + talentBonuses.tankDef) * (1 + (townBonuses.defenseBonus || 0)));
  }

  function getSpeed(hero = activeHero) {
    const mountMult = window.MountManager ? window.MountManager.getSpeedMultiplier() : 1.0;
    return (hero.stats.spd + gearBonuses.spd) * (1 + techBonuses.speedBonus + talentBonuses.spd) * mountMult;
  }

  function getSkillCooldown(hero = activeHero) {
    const totalCdr = techBonuses.cooldownReduction + talentBonuses.cdr;
    return Math.floor(hero.skillCooldown * Math.max(0.2, 1 - totalCdr));
  }

  function update(dt) {
    if (!activeHero) return;

    // Regeneracja HP
    const totalRegen = techBonuses.hpRegen + gearBonuses.hpRegen + talentBonuses.cosmicAura;
    if (totalRegen > 0 && activeHero.stats.hp < getMaxHp(activeHero)) {
      activeHero.stats.hp = Math.min(getMaxHp(activeHero), activeHero.stats.hp + (totalRegen * dt / 1000));
    }

    // Tarcza okresowa
    const maxShield = techBonuses.periodicShield + talentBonuses.shield;
    if (maxShield > 0) {
      if (!activeHero.lastShieldRegen) activeHero.lastShieldRegen = Date.now();
      if (Date.now() - activeHero.lastShieldRegen > 15000) {
        techBonuses.currentShield = maxShield;
        activeHero.lastShieldRegen = Date.now();
        if (window.UI) window.UI.showFloatingText(`Tarcza Odnowiona! (+${maxShield})`, activeHero.x, activeHero.y - 25, '#00e5ff');
      }
    }
  }

  function takeDamage(amount) {
    if (!activeHero) return;

    const totalDodge = techBonuses.dodgeChance + talentBonuses.dodge;
    if (totalDodge > 0 && Math.random() < totalDodge) {
      if (window.UI) window.UI.showFloatingText('UNIK!', activeHero.x, activeHero.y - 25, '#ffff00');
      return;
    }

    addFury(6); // Furia z otrzymanych ciosów

    const currentDef = getDef(activeHero);
    let actualDmg = Math.max(1, amount - (currentDef / 2));

    if (techBonuses.currentShield > 0) {
      if (techBonuses.currentShield >= actualDmg) {
        techBonuses.currentShield -= actualDmg;
        if (window.UI) window.UI.showFloatingText(`Tarcza (-${Math.round(actualDmg)})`, activeHero.x, activeHero.y - 25, '#00e5ff');
        return;
      } else {
        actualDmg -= techBonuses.currentShield;
        techBonuses.currentShield = 0;
      }
    }

    activeHero.stats.hp -= actualDmg;
    window.GameAudio.playerHit();
    if (window.UI) {
      window.UI.showFloatingText(`-${Math.round(actualDmg)}`, activeHero.x, activeHero.y - 25, '#ff1744');
      window.UI.triggerScreenShake(4);
    }

    if (activeHero.stats.hp <= 0) {
      activeHero.stats.hp = getMaxHp(activeHero);
      if (window.GameMap.getCurrentWorldId() !== 'hub') {
        window.GameMap.switchWorld('hub');
      } else {
        activeHero.x = 450;
        activeHero.y = 420;
      }
      if (window.UI) {
        window.UI.showModalNotification('POLEGŁEŚ W WALCE!', 'Zostałeś uzdrowiony i przetransportowany z powrotem do bezpiecznej Wioski.');
      }
    }
  }

  function render(ctx, camera) {
    if (!activeHero) return;

    const screenX = Math.floor(activeHero.x - camera.x);
    const screenY = Math.floor(activeHero.y - camera.y);

    // Render wierzchowca jeśli dosiadany
    if (window.MountManager) window.MountManager.render(ctx, camera, activeHero);

    const rarity = window.GAME_CONFIG.RARITY_TIERS[activeHero.rarity];
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(screenX, screenY + 12, 16, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = rarity.glow;
    ctx.fill();

    if (techBonuses.currentShield > 0) {
      ctx.beginPath();
      ctx.arc(screenX, screenY, 22, 0, Math.PI * 2);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const sprite = PixelSprites.get(activeHero.spriteType);
    if (sprite) {
      const bob = activeHero.isMoving ? Math.sin(Date.now() / 120) * 2 : 0;
      ctx.drawImage(sprite, screenX - 16, screenY - 20 + bob, 32, 32);
    }

    const maxHp = getMaxHp(activeHero);
    const hpRatio = Math.max(0, activeHero.stats.hp / maxHp);
    ctx.fillStyle = '#000';
    ctx.fillRect(screenX - 18, screenY - 28, 36, 6);
    ctx.fillStyle = rarity.color;
    ctx.fillRect(screenX - 17, screenY - 27, 34 * hpRatio, 4);

    ctx.restore();
  }

  return {
    init,
    switchHero,
    unlockHero,
    addFury,
    canUseUltimate,
    consumeUltimate,
    getFury: () => fury,
    applyTechBonuses,
    applyGearBonuses,
    applyTalentBonuses,
    getActive: () => activeHero,
    getAll: () => heroes,
    getMaxHp,
    getAtk,
    getDef,
    getSpeed,
    getSkillCooldown,
    takeDamage,
    update,
    render,
    getBonuses: () => techBonuses
  };
})();
