// Zaktualizowany moduł zapisu gry z obsługą 10 systemów
window.PlayerState = (function() {
  let gold = 80;
  let science = 50;
  const SAVE_KEY = 'PIXEL_RPG_GRA7_SAVE_MEGA_V3';

  function init() {
    load();
  }

  function addGold(amt) {
    gold += amt;
    if (window.UI) window.UI.updateHUD();
  }

  function spendGold(amt) {
    if (gold >= amt) {
      gold -= amt;
      if (window.UI) window.UI.updateHUD();
      return true;
    }
    return false;
  }

  function addScience(amt) {
    science += amt;
    if (window.UI) {
      window.UI.updateHUD();
      window.UI.updateTechTreeUI();
    }
  }

  function spendScience(amt) {
    if (science >= amt) {
      science -= amt;
      if (window.UI) {
        window.UI.updateHUD();
        window.UI.updateTechTreeUI();
      }
      return true;
    }
    return false;
  }

  function save() {
    try {
      const activeHero = window.HeroManager.getActive();
      const data = {
        gold,
        science,
        activeHeroId: activeHero ? activeHero.id : 'warrior',
        heroPos: activeHero ? { x: activeHero.x, y: activeHero.y } : { x: 450, y: 420 },
        currentWorldId: window.GameMap.getCurrentWorldId(),
        unlockedHeroes: window.HeroManager.getAll().filter(h => h.unlocked).map(h => h.id),
        researchedTechs: window.TechTree.getResearchedList(),
        quests: window.QuestManager.getAllQuests(),
        equipped: window.InventoryManager.getEquipped(),
        backpack: window.InventoryManager.getBackpack(),
        buildings: window.TownManager.getBuildings(),
        activePetId: window.PetManager.getActivePet() ? window.PetManager.getActivePet().id : null,
        ownedPets: window.PetManager.getOwnedPets(),
        talentsProgression: window.TalentManager.getAllProgression(),
        activeMountId: window.MountManager.getActiveMount() ? window.MountManager.getActiveMount().id : null,
        ownedMounts: window.MountManager.getOwnedMounts(),
        gems: window.GemManager.getGems()
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      if (window.UI) window.UI.showNotification('Stan gry został pomyślnie zapisany!');
    } catch (e) {
      console.error('Błąd zapisu:', e);
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);

      if (typeof data.gold === 'number') gold = data.gold;
      if (typeof data.science === 'number') science = data.science;

      if (Array.isArray(data.unlockedHeroes)) {
        data.unlockedHeroes.forEach(id => window.HeroManager.unlockHero(id));
      }
      if (data.activeHeroId) {
        window.HeroManager.switchHero(data.activeHeroId);
      }
      if (data.heroPos) {
        const h = window.HeroManager.getActive();
        if (h) {
          h.x = data.heroPos.x;
          h.y = data.heroPos.y;
        }
      }
      if (Array.isArray(data.researchedTechs)) {
        data.researchedTechs.forEach(tId => window.TechTree.research(tId));
      }
      if (data.currentWorldId && data.currentWorldId !== 'hub') {
        window.GameMap.switchWorld(data.currentWorldId);
      }
      if (data.talentsProgression && window.TalentManager) {
        window.TalentManager.setProgression(data.talentsProgression);
      }
      return true;
    } catch (e) {
      console.error('Błąd wczytywania:', e);
      return false;
    }
  }

  function resetGame() {
    localStorage.removeItem(SAVE_KEY);
    window.location.reload();
  }

  return {
    init,
    getGold: () => gold,
    getScience: () => science,
    addGold,
    spendGold,
    addScience,
    spendScience,
    save,
    load,
    resetGame
  };
})();
