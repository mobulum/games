// Menedżer EXP, Poziomów (1-20) oraz Indywidualnych Drzewek Talentów dla Każdego Bohatera [K]
window.TalentManager = (function() {
  // Postępy bohaterów: { warrior: { level: 1, exp: 0, sp: 0, talents: { w_rage: 0, ... } }, ... }
  let heroProgression = {};

  function init() {
    heroProgression = {};
    window.GAME_CONFIG.HEROES.forEach(h => {
      heroProgression[h.id] = {
        level: 1,
        exp: 0,
        sp: 0,
        talents: {}
      };
      const defs = window.GAME_CONFIG.TALENTS[h.id] || [];
      defs.forEach(t => {
        heroProgression[h.id].talents[t.id] = 0;
      });
    });
  }

  function getRequiredExp(level) {
    return level * 100 + (level - 1) * 50;
  }

  function addExp(amount) {
    const active = window.HeroManager.getActive();
    if (!active) return;

    const prog = heroProgression[active.id];
    if (!prog || prog.level >= 20) return;

    prog.exp += amount;
    let req = getRequiredExp(prog.level);

    while (prog.exp >= req && prog.level < 20) {
      prog.exp -= req;
      prog.level++;
      prog.sp++;
      window.GameAudio.questComplete();
      if (window.UI) {
        window.UI.showModalNotification(
          `AWANS NA POZIOM!`,
          `Twój bohater <strong>${active.name}</strong> osiągnął <strong>Poziom ${prog.level}</strong>!<br>` +
          `Otrzymujesz <strong>+1 Punkt Talentu (SP)</strong>!<br>` +
          `Naciśnij klawisz <strong>[K]</strong>, aby rozwinąć drzewko talentów!`
        );
        window.UI.showFloatingText(`POZIOM ${prog.level}! (+1 SP)`, active.x, active.y - 30, '#ffea00');
      }
      req = getRequiredExp(prog.level);
    }

    if (window.UI) window.UI.updateHUD();
  }

  function upgradeTalent(heroId, talentId) {
    const prog = heroProgression[heroId];
    if (!prog || prog.sp <= 0) {
      if (window.UI) window.UI.showNotification('Brak wolnych punktów talentu (SP)!');
      return false;
    }

    const tDefs = window.GAME_CONFIG.TALENTS[heroId] || [];
    const tDef = tDefs.find(t => t.id === talentId);
    if (!tDef) return false;

    const curLvl = prog.talents[talentId] || 0;
    if (curLvl >= tDef.maxLvl) {
      if (window.UI) window.UI.showNotification('Talent osiągnął maksymalny poziom!');
      return false;
    }

    prog.sp--;
    prog.talents[talentId] = curLvl + 1;
    window.GameAudio.techUnlocked();

    recalculateHeroTalentBonuses();
    if (window.UI) {
      window.UI.showNotification(`Ulepszono talent: ${tDef.name} (${prog.talents[talentId]}/${tDef.maxLvl})`);
      window.UI.updateTalentsUI();
      window.UI.updateHUD();
    }
    return true;
  }

  function recalculateHeroTalentBonuses() {
    const active = window.HeroManager.getActive();
    if (!active) return;
    const prog = heroProgression[active.id];
    if (!prog) return;

    const bonuses = {
      atkPct: 0, def: 0, hp: 0, crit: 0, critDmg: 0,
      spd: 0, dodge: 0, cdr: 0, shield: 0, lifesteal: 0,
      magicDmg: 0, tankHp: 0, tankDef: 0, ramDmg: 0, allDmg: 0,
      cosmicAura: 0, furyGen: 0
    };

    const tDefs = window.GAME_CONFIG.TALENTS[active.id] || [];
    tDefs.forEach(t => {
      const lvl = prog.talents[t.id] || 0;
      if (lvl <= 0) return;
      const b = t.bonus;

      if (b.type === 'atk_pct') bonuses.atkPct += b.val * lvl;
      if (b.type === 'def_hp') { bonuses.def += b.def * lvl; bonuses.hp += b.hp * lvl; }
      if (b.type === 'lifesteal') bonuses.lifesteal += b.val * lvl;
      if (b.type === 'crit') { bonuses.crit += b.val * lvl; bonuses.critDmg += b.dmg * lvl; }
      if (b.type === 'spd_dodge') { bonuses.spd += b.spd * lvl; bonuses.dodge += b.dodge * lvl; }
      if (b.type === 'cdr') bonuses.cdr += b.val * lvl;
      if (b.type === 'shield') bonuses.shield += b.val * lvl;
      if (b.type === 'magic_dmg') bonuses.magicDmg += b.val * lvl;
      if (b.type === 'tank') { bonuses.tankHp += b.hp * lvl; bonuses.tankDef += b.def * lvl; }
      if (b.type === 'ram_dmg') bonuses.ramDmg += b.val * lvl;
      if (b.type === 'all_dmg') bonuses.allDmg += b.val * lvl;
      if (b.type === 'cosmic_aura') bonuses.cosmicAura += b.val * lvl;
      if (b.type === 'fury_gen') bonuses.furyGen += b.val * lvl;
    });

    if (window.HeroManager) {
      window.HeroManager.applyTalentBonuses(bonuses);
    }
  }

  return {
    init,
    addExp,
    upgradeTalent,
    getProgression: (heroId) => heroProgression[heroId],
    getAllProgression: () => heroProgression,
    setProgression: (data) => { heroProgression = data; recalculateHeroTalentBonuses(); },
    getRequiredExp,
    recalculateHeroTalentBonuses
  };
})();
