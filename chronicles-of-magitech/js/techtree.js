// Menedżer Drzewka Badań Technologicznych (Tech Tree)
window.TechTree = (function() {
  let researchedTechs = [];

  function init() {
    researchedTechs = [];
  }

  function isResearched(techId) {
    return researchedTechs.includes(techId);
  }

  function canResearch(techId) {
    if (isResearched(techId)) return false;
    const tech = window.GAME_CONFIG.TECH_TREE.find(t => t.id === techId);
    if (!tech) return false;

    // Sprawdzenie wymagań wstępnych
    const hasPrereqs = tech.requires.every(reqId => isResearched(reqId));
    if (!hasPrereqs) return false;

    // Sprawdzenie punktów nauki
    if (window.PlayerState.getScience() < tech.cost) return false;

    return true;
  }

  function research(techId) {
    if (!canResearch(techId)) return false;
    const tech = window.GAME_CONFIG.TECH_TREE.find(t => t.id === techId);

    window.PlayerState.spendScience(tech.cost);
    researchedTechs.push(techId);
    window.GameAudio.techUnlocked();

    // Aplikacja bonusów
    applyTechEffect(tech);

    if (window.UI) {
      window.UI.showModalNotification(
        `ODKRYTO NOWĄ TECHNOLOGIĘ!`,
        `Zbadano: <strong>${tech.name}</strong><br>` +
        `<em>${tech.desc}</em>`
      );
      window.UI.updateTechTreeUI();
      window.UI.updateHUD();
    }

    return true;
  }

  function applyTechEffect(tech) {
    if (tech.bonus) {
      const b = tech.bonus;
      const bonuses = {};
      if (b.type === 'atk_percent') bonuses.atkPercent = b.value;
      if (b.type === 'hp_regen') {
        bonuses.hpPercent = b.hpPercent;
        bonuses.hpRegen = b.regen;
      }
      if (b.type === 'crit_bonus') {
        bonuses.critBonus = b.crit;
        bonuses.critDmgBonus = b.critDmg;
      }
      if (b.type === 'cooldown_reduction') bonuses.cooldownReduction = b.value;
      if (b.type === 'speed_evasion') {
        bonuses.speedBonus = b.spd;
        bonuses.dodgeChance = b.dodge;
      }
      if (b.type === 'resource_boost') {
        bonuses.resourceScience = b.science;
        bonuses.resourceGold = b.gold;
      }
      if (b.type === 'periodic_shield') {
        bonuses.periodicShield = b.shield;
        bonuses.currentShield = b.shield;
      }
      window.HeroManager.applyTechBonuses(bonuses);
    }

    // Odblokowanie bohatera z technologii
    if (tech.unlockHero) {
      window.HeroManager.unlockHero(tech.unlockHero);
    }
  }

  return {
    init,
    isResearched,
    canResearch,
    research,
    getResearchedList: () => researchedTechs
  };
})();
