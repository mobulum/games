// Zaktualizowany Kontroler Interfejsu (Furia, Ultimate [R], Talenty [K], Wierzchowce [Z], Kamienie, Zlecenia, Arena)
window.UI = (function() {
  let dialogueCallback = null;

  function init() {
    setupEventListeners();
    updateHUD();
    updateHeroRoster();
    updateQuestTracker();
    updateTechTreeUI();
    updateInventoryUI();
    updateShopUI();
    updateTownUI();
    updatePetsUI();
    updateTalentsUI();
    updateMountsUI();
    updateGemsUI();
    updateBountiesUI();
  }

  function setupEventListeners() {
    // Przyciski menu górnego
    document.getElementById('btn-shop').addEventListener('click', toggleShop);
    document.getElementById('btn-inventory').addEventListener('click', toggleInventory);
    document.getElementById('btn-talents').addEventListener('click', toggleTalents);
    document.getElementById('btn-mounts').addEventListener('click', toggleMounts);
    document.getElementById('btn-gems').addEventListener('click', toggleGems);
    document.getElementById('btn-bounties').addEventListener('click', toggleBounties);
    document.getElementById('btn-town').addEventListener('click', toggleTown);
    document.getElementById('btn-pets').addEventListener('click', togglePets);
    document.getElementById('btn-arena').addEventListener('click', () => window.ArenaManager.startArena());
    document.getElementById('btn-raid').addEventListener('click', () => window.TownDefense.triggerRaid());
    document.getElementById('btn-techtree').addEventListener('click', toggleTechTree);

    // Zamknięcia modali
    document.getElementById('btn-close-shop').addEventListener('click', toggleShop);
    document.getElementById('btn-close-inventory').addEventListener('click', toggleInventory);
    document.getElementById('btn-close-talents').addEventListener('click', toggleTalents);
    document.getElementById('btn-close-mounts').addEventListener('click', toggleMounts);
    document.getElementById('btn-close-gems').addEventListener('click', toggleGems);
    document.getElementById('btn-close-bounties').addEventListener('click', toggleBounties);
    document.getElementById('btn-close-town').addEventListener('click', toggleTown);
    document.getElementById('btn-close-pets').addEventListener('click', togglePets);
    document.getElementById('btn-close-techtree').addEventListener('click', toggleTechTree);
    document.getElementById('btn-close-portal').addEventListener('click', toggleWorldPortalModal);

    // Zapis, Dźwięk, Reset
    document.getElementById('btn-save').addEventListener('click', () => window.PlayerState.save());
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('Czy na pewno chcesz zresetować grę od nowa?')) {
        window.PlayerState.resetGame();
      }
    });

    const btnAudio = document.getElementById('btn-audio');
    btnAudio.addEventListener('click', () => {
      const isMuted = window.GameAudio.toggleMute();
      btnAudio.textContent = isMuted ? '🔇 DŹWIĘK' : '🔊 DŹWIĘK';
    });

    document.getElementById('dialogue-btn-ok').addEventListener('click', () => {
      document.getElementById('dialogue-box').classList.add('hidden');
      if (dialogueCallback) {
        const cb = dialogueCallback;
        dialogueCallback = null;
        cb();
      }
    });

    document.getElementById('modal-btn-ok').addEventListener('click', () => {
      document.getElementById('notification-modal').classList.add('hidden');
    });

    document.querySelectorAll('.portal-btn-travel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetWorld = e.currentTarget.dataset.world;
        toggleWorldPortalModal();
        window.GameMap.switchWorld(targetWorld);
      });
    });
  }

  function updateHUD() {
    const hero = window.HeroManager.getActive();
    if (!hero) return;

    const maxHp = window.HeroManager.getMaxHp(hero);
    const hpRatio = Math.max(0, hero.stats.hp / maxHp);
    document.getElementById('hud-hp-bar').style.width = `${hpRatio * 100}%`;
    document.getElementById('hud-hp-text').textContent = `${Math.ceil(hero.stats.hp)} / ${maxHp}`;

    // Pasek Furii / Ultimate
    const fury = window.HeroManager.getFury();
    const furyBar = document.getElementById('hud-fury-bar');
    if (furyBar) furyBar.style.width = `${fury}%`;
    const furyText = document.getElementById('hud-fury-text');
    if (furyText) furyText.textContent = `FURIA: ${Math.floor(fury)}% ${fury >= 100 ? '[R - ULTIMATE!]' : ''}`;

    // EXP i Poziom
    if (window.TalentManager) {
      const prog = window.TalentManager.getProgression(hero.id);
      if (prog) {
        const reqExp = window.TalentManager.getRequiredExp(prog.level);
        const expRatio = Math.min(1, prog.exp / reqExp);
        const expBar = document.getElementById('hud-exp-bar');
        if (expBar) expBar.style.width = `${expRatio * 100}%`;
        const expText = document.getElementById('hud-exp-text');
        if (expText) expText.textContent = `POZIOM: ${prog.level} (SP: ${prog.sp})`;
      }
    }

    document.getElementById('hud-gold').textContent = window.PlayerState.getGold();
    document.getElementById('hud-science').textContent = window.PlayerState.getScience();

    const rarity = window.GAME_CONFIG.RARITY_TIERS[hero.rarity];
    const heroBadge = document.getElementById('hud-hero-name');
    heroBadge.textContent = `${hero.name}`;
    heroBadge.style.color = rarity.color;

    document.getElementById('stat-atk').textContent = window.HeroManager.getAtk(hero);
    document.getElementById('stat-def').textContent = window.HeroManager.getDef(hero);
    document.getElementById('stat-spd').textContent = window.HeroManager.getSpeed(hero).toFixed(1);
    document.getElementById('stat-skill').textContent = hero.skillName;

    const curWorld = window.GAME_CONFIG.WORLDS[window.GameMap.getCurrentWorldId()];
    const worldBadge = document.getElementById('hud-current-world');
    if (worldBadge && curWorld) {
      worldBadge.textContent = curWorld.name;
      worldBadge.style.color = curWorld.color;
    }
  }

  function updateHeroRoster() {
    const rosterEl = document.getElementById('hero-roster');
    rosterEl.innerHTML = '';
    const heroes = window.HeroManager.getAll();
    const active = window.HeroManager.getActive();

    heroes.forEach((h, idx) => {
      const rarity = window.GAME_CONFIG.RARITY_TIERS[h.rarity];
      const card = document.createElement('div');
      card.className = `hero-card ${h.unlocked ? '' : 'locked'} ${active && active.id === h.id ? 'active' : ''}`;
      card.style.borderColor = rarity.color;

      card.innerHTML = `
        <div class="hero-key">[${idx + 1}]</div>
        <div class="hero-icon">${h.icon}</div>
        <div class="hero-info">
          <div class="hero-card-name" style="color:${rarity.color}">${h.name}</div>
          <div class="hero-rarity" style="color:${rarity.color}">${rarity.name}</div>
        </div>
      `;

      if (h.unlocked) {
        card.addEventListener('click', () => window.HeroManager.switchHero(h.id));
      } else {
        card.title = `Odblokowanie: ${h.unlockSource || 'Badania lub Zadania'}`;
      }

      rosterEl.appendChild(card);
    });
  }

  // Interfejs Drzewka Talentów [K]
  function updateTalentsUI() {
    const grid = document.getElementById('talents-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const hero = window.HeroManager.getActive();
    if (!hero) return;

    const prog = window.TalentManager.getProgression(hero.id);
    document.getElementById('talent-points-available').textContent = prog ? prog.sp : 0;

    const defs = window.GAME_CONFIG.TALENTS[hero.id] || [];
    defs.forEach(t => {
      const lvl = prog ? (prog.talents[t.id] || 0) : 0;
      const card = document.createElement('div');
      card.className = 'talent-card';

      card.innerHTML = `
        <div class="talent-title" style="color:#00e5ff">${t.name} (${lvl}/${t.maxLvl})</div>
        <div class="talent-desc">${t.desc}</div>
        <button class="btn-retro talent-upgrade-btn" ${lvl >= t.maxLvl || (prog && prog.sp <= 0) ? 'disabled' : ''}>
          ${lvl >= t.maxLvl ? 'MAKSYMALNY' : 'ULEPSZ (+1 SP)'}
        </button>
      `;

      card.querySelector('.talent-upgrade-btn').addEventListener('click', () => {
        window.TalentManager.upgradeTalent(hero.id, t.id);
      });

      grid.appendChild(card);
    });
  }

  // Interfejs Wierzchowców [Z]
  function updateMountsUI() {
    const grid = document.getElementById('mounts-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const activeM = window.MountManager.getActiveMount();
    const owned = window.MountManager.getOwnedMounts();

    window.GAME_CONFIG.MOUNTS.forEach(m => {
      const isOwned = owned.includes(m.id);
      const isActive = activeM && activeM.id === m.id;

      const card = document.createElement('div');
      card.className = `mount-card ${isActive ? 'active' : ''}`;
      card.style.borderColor = m.color;

      card.innerHTML = `
        <div class="mount-icon">${m.icon}</div>
        <div class="mount-title" style="color:${m.color}">${m.name}</div>
        <div class="mount-desc">${m.desc}</div>
        <div style="color:#38bdf8; font-size:7px;">Prędkość: +${Math.round(m.speedBonus*100)}% | Szarża: ${m.chargeDmg} DMG</div>
        <button class="btn-retro mount-action-btn">
          ${isActive ? 'AKTYWNY' : (isOwned ? 'WYBIERZ' : `KUP (🪙 ${m.cost})`)}
        </button>
      `;

      card.querySelector('.mount-action-btn').addEventListener('click', () => {
        window.MountManager.buyMount(m.id);
      });

      grid.appendChild(card);
    });
  }

  // Interfejs Kamieni Runicznych & Gniazd
  function updateGemsUI() {
    const list = document.getElementById('gems-list');
    if (!list) return;
    list.innerHTML = '';

    const gems = window.GemManager.getGems();
    gems.forEach((gId, idx) => {
      const g = window.GAME_CONFIG.GEMS.find(x => x.id === gId);
      if (!g) return;

      const card = document.createElement('div');
      card.className = 'gem-card';
      card.style.borderColor = g.color;

      card.innerHTML = `
        <span style="font-size:16px;">${g.icon}</span>
        <div style="flex:1;">
          <div style="color:${g.color}; font-size:8px;">${g.name}</div>
          <div style="color:#94a3b8; font-size:7px;">${g.desc}</div>
        </div>
        <button class="btn-retro gem-socket-btn">OSADŹ W BRONI</button>
      `;

      card.querySelector('.gem-socket-btn').addEventListener('click', () => {
        const eq = window.InventoryManager.getEquipped();
        if (eq.weapon) {
          window.GemManager.socketGem(eq.weapon.uniqueId, gId);
        } else {
          window.UI.showNotification('Musisz mieć założoną broń, aby osadzić kamień!');
        }
      });

      list.appendChild(card);
    });
  }

  // Interfejs Tablicy Zleceń (Bounties)
  function updateBountiesUI() {
    const list = document.getElementById('bounties-list');
    if (!list) return;
    list.innerHTML = '';

    const bounties = window.BountyManager.getBounties();
    document.getElementById('hunter-tokens-count').textContent = window.BountyManager.getTokens();

    bounties.forEach(b => {
      const card = document.createElement('div');
      card.className = `bounty-card ${b.completed ? 'done' : ''}`;

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="color:#ffea00; font-size:8px;">${b.icon} ${b.title}</span>
          <span style="color:${b.completed ? '#00e676' : '#38bdf8'}; font-size:7px;">${b.completed ? 'WYKONANO' : `${b.current}/${b.count}`}</span>
        </div>
        <div style="color:#ffca28; font-size:7px;">Nagroda: 🪙 ${b.rewardGold} | 🎖️ ${b.rewardTokens} Żetonów Łowcy</div>
      `;
      list.appendChild(card);
    });

    const buyBtn = document.getElementById('btn-buy-hunter-chest');
    if (buyBtn) {
      buyBtn.onclick = () => window.BountyManager.buyHunterChest();
    }
  }

  // Sklep Kupca
  function updateShopUI() {
    const shopList = document.getElementById('shop-items-grid');
    if (!shopList) return;
    shopList.innerHTML = '';

    const townBonuses = window.TownManager ? window.TownManager.getBonuses() : { shopDiscount: 0 };

    window.GAME_CONFIG.SHOP_ITEMS.forEach(item => {
      const rarity = window.GAME_CONFIG.RARITY_TIERS[item.rarity];
      const discountedPrice = Math.max(5, Math.floor(item.price * (1 - (townBonuses.shopDiscount || 0))));

      const el = document.createElement('div');
      el.className = 'shop-card';
      el.style.borderColor = rarity.color;

      el.innerHTML = `
        <div class="item-header">
          <span class="item-icon">${item.icon}</span>
          <span class="item-name" style="color:${rarity.color}">${item.name}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-stats">
          ${item.stats ? Object.entries(item.stats).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(' | ') : ''}
          ${item.sockets ? ` | 🔘 Gniazda: ${item.sockets}` : ''}
        </div>
        <div class="item-action">
          <span class="item-price">🪙 ${discountedPrice}</span>
          <button class="btn-retro buy-btn">KUP</button>
        </div>
      `;

      el.querySelector('.buy-btn').addEventListener('click', () => {
        window.ShopManager.buyItem(item.id);
      });

      shopList.appendChild(el);
    });
  }

  // Ekwipunek
  function updateInventoryUI() {
    const eq = window.InventoryManager.getEquipped();
    const backpack = window.InventoryManager.getBackpack();

    ['weapon', 'armor', 'ring'].forEach(slot => {
      const slotEl = document.getElementById(`slot-${slot}`);
      if (!slotEl) return;
      const item = eq[slot];

      if (item) {
        const rarity = window.GAME_CONFIG.RARITY_TIERS[item.rarity];
        const socketInfo = item.sockets ? ` (Gniazda: ${item.socketedGems ? item.socketedGems.length : 0}/${item.sockets})` : '';
        slotEl.innerHTML = `
          <div class="slot-item" style="border-color:${rarity.color}">
            <div class="slot-icon">${item.icon}</div>
            <div class="slot-name" style="color:${rarity.color}">${item.name} ${item.upgradeLevel ? `+${item.upgradeLevel}` : ''}${socketInfo}</div>
            <button class="slot-unequip-btn btn-retro">ZDEJMIJ</button>
            <button class="slot-upgrade-btn btn-retro">ULEPSZ (+1)</button>
          </div>
        `;
        slotEl.querySelector('.slot-unequip-btn').addEventListener('click', () => window.InventoryManager.unequipItem(slot));
        slotEl.querySelector('.slot-upgrade-btn').addEventListener('click', () => window.InventoryManager.upgradeItem(item.uniqueId));
      } else {
        slotEl.innerHTML = `<div class="slot-empty">[PUSTY SLOT: ${slot.toUpperCase()}]</div>`;
      }
    });

    const bpEl = document.getElementById('inventory-backpack-grid');
    if (!bpEl) return;
    bpEl.innerHTML = '';

    backpack.forEach(item => {
      const rarity = window.GAME_CONFIG.RARITY_TIERS[item.rarity];
      const card = document.createElement('div');
      card.className = 'backpack-card';
      card.style.borderColor = rarity.color;

      card.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <div class="bp-name" style="color:${rarity.color}">${item.name} ${item.upgradeLevel ? `+${item.upgradeLevel}` : ''}</div>
        <div class="bp-actions">
          <button class="btn-retro bp-equip">ZAŁÓŻ</button>
          <button class="btn-retro bp-sell danger">SPRZEDAJ</button>
        </div>
      `;

      card.querySelector('.bp-equip').addEventListener('click', () => window.InventoryManager.equipItem(item.uniqueId));
      card.querySelector('.bp-sell').addEventListener('click', () => window.ShopManager.sellItem(item.uniqueId));

      bpEl.appendChild(card);
    });
  }

  // Baza Osady
  function updateTownUI() {
    const townGrid = document.getElementById('town-buildings-grid');
    if (!townGrid) return;
    townGrid.innerHTML = '';

    const buildings = window.TownManager.getBuildings();
    Object.values(buildings).forEach(b => {
      const card = document.createElement('div');
      card.className = 'town-card';
      const goldCost = Math.floor(b.costGold * (1 + b.level * 0.8));
      const scienceCost = Math.floor(b.costScience * (1 + b.level * 0.7));

      card.innerHTML = `
        <div class="town-header">
          <span>${b.icon} ${b.name}</span>
          <span style="color:#00e5ff">POZIOM ${b.level} / ${b.maxLevel}</span>
        </div>
        <div class="town-desc">${b.desc}</div>
        <div class="town-cost">Koszt: 🪙 ${goldCost} | 🧪 ${scienceCost}</div>
        <button class="btn-retro town-upgrade-btn" ${b.level >= b.maxLevel ? 'disabled' : ''}>
          ${b.level >= b.maxLevel ? 'MAKSYMALNY' : 'ROZBUDUJ BUDYNEK'}
        </button>
      `;

      if (b.level < b.maxLevel) {
        card.querySelector('.town-upgrade-btn').addEventListener('click', () => window.TownManager.upgradeBuilding(b.id));
      }

      townGrid.appendChild(card);
    });
  }

  // Chowańce
  function updatePetsUI() {
    const petsGrid = document.getElementById('pets-grid');
    if (!petsGrid) return;
    petsGrid.innerHTML = '';

    const activePet = window.PetManager.getActivePet();
    const owned = window.PetManager.getOwnedPets();

    window.GAME_CONFIG.PETS.forEach(pet => {
      const isOwned = owned.includes(pet.id);
      const isActive = activePet && activePet.id === pet.id;

      const card = document.createElement('div');
      card.className = `pet-card ${isActive ? 'active' : ''}`;
      card.style.borderColor = pet.color;

      card.innerHTML = `
        <div class="pet-icon">${pet.icon}</div>
        <div class="pet-title" style="color:${pet.color}">${pet.name}</div>
        <div class="pet-desc">${pet.desc}</div>
        <div class="pet-footer">
          <button class="btn-retro pet-action-btn">
            ${isActive ? 'AKTYWNY' : (isOwned ? 'WYBIERZ' : `KUP (🪙 ${pet.cost})`)}
          </button>
        </div>
      `;

      card.querySelector('.pet-action-btn').addEventListener('click', () => window.PetManager.selectPet(pet.id));
      petsGrid.appendChild(card);
    });
  }

  function updateQuestTracker() {
    const trackerEl = document.getElementById('quest-tracker-content');
    const quest = window.QuestManager.getActiveQuest();

    if (!quest) {
      trackerEl.innerHTML = '<div class="no-quest">Wszystkie dostępne zadania ukończone! Eksploruj nowe światy przez portal.</div>';
      return;
    }

    let statusText = '';
    if (quest.status === 'available') statusText = `<span style="color:#ffea00">DOSTĘPNE</span> (${quest.npc})`;
    else if (quest.status === 'active') statusText = `<span style="color:#00e5ff">W TRAKCIE</span>`;

    let objectivesHtml = '';
    if (quest.status === 'active') {
      objectivesHtml = quest.objectives.map(o => {
        const isDone = o.current >= o.count;
        return `<div class="quest-obj ${isDone ? 'done' : ''}">${isDone ? '✔' : '○'} ${o.text} (${o.current}/${o.count})</div>`;
      }).join('');
    }

    trackerEl.innerHTML = `
      <div class="quest-title">${quest.title}</div>
      <div class="quest-status">${statusText}</div>
      <div class="quest-objectives">${objectivesHtml}</div>
      <div class="quest-rewards">Nagroda: 🪙 ${quest.rewards.gold} | 🧪 ${quest.rewards.science} ${quest.rewards.unlockHero ? ' | 🌟 NOWA POSTAĆ' : ''}</div>
    `;
  }

  // Toggles
  function toggleShop() { document.getElementById('shop-modal').classList.toggle('hidden'); if (!document.getElementById('shop-modal').classList.contains('hidden')) updateShopUI(); }
  function toggleInventory() { document.getElementById('inventory-modal').classList.toggle('hidden'); if (!document.getElementById('inventory-modal').classList.contains('hidden')) updateInventoryUI(); }
  function toggleTalents() { document.getElementById('talents-modal').classList.toggle('hidden'); if (!document.getElementById('talents-modal').classList.contains('hidden')) updateTalentsUI(); }
  function toggleMounts() { document.getElementById('mounts-modal').classList.toggle('hidden'); if (!document.getElementById('mounts-modal').classList.contains('hidden')) updateMountsUI(); }
  function toggleGems() { document.getElementById('gems-modal').classList.toggle('hidden'); if (!document.getElementById('gems-modal').classList.contains('hidden')) updateGemsUI(); }
  function toggleBounties() { document.getElementById('bounties-modal').classList.toggle('hidden'); if (!document.getElementById('bounties-modal').classList.contains('hidden')) updateBountiesUI(); }
  function toggleTown() { document.getElementById('town-modal').classList.toggle('hidden'); if (!document.getElementById('town-modal').classList.contains('hidden')) updateTownUI(); }
  function togglePets() { document.getElementById('pets-modal').classList.toggle('hidden'); if (!document.getElementById('pets-modal').classList.contains('hidden')) updatePetsUI(); }
  function toggleTechTree() { document.getElementById('techtree-modal').classList.toggle('hidden'); if (!document.getElementById('techtree-modal').classList.contains('hidden')) updateTechTreeUI(); }
  function toggleWorldPortalModal() { document.getElementById('portal-modal').classList.toggle('hidden'); }

  function updateTechTreeUI() {
    const container = document.getElementById('techtree-grid');
    if (!container) return;
    container.innerHTML = '';
    document.getElementById('techtree-science-points').textContent = window.PlayerState.getScience();

    const branches = [
      { key: 'military', title: 'Oddział Militarny & Pancerze', color: '#ff7043' },
      { key: 'magic', title: 'Instytut Eteru & Energii', color: '#ab47bc' },
      { key: 'cosmic', title: 'Archeologia & Kosmiczny Rezonans', color: '#00e5ff' }
    ];

    branches.forEach(br => {
      const col = document.createElement('div');
      col.className = 'tech-branch-column';
      col.innerHTML = `<h3 style="color:${br.color}; border-bottom: 2px solid ${br.color}">${br.title}</h3>`;

      const branchTechs = window.GAME_CONFIG.TECH_TREE.filter(t => t.branch === br.key);
      branchTechs.forEach(t => {
        const isResearched = window.TechTree.isResearched(t.id);
        const canResearch = window.TechTree.canResearch(t.id);

        const card = document.createElement('div');
        card.className = `tech-card ${isResearched ? 'researched' : (canResearch ? 'available' : 'locked')}`;

        card.innerHTML = `
          <div class="tech-header">
            <span class="tech-icon">${t.icon}</span>
            <span class="tech-name">${t.name}</span>
          </div>
          <div class="tech-desc">${t.desc}</div>
          <div class="tech-footer">
            <span class="tech-cost">🧪 Koszt: ${t.cost}</span>
            <button class="tech-btn" ${!canResearch || isResearched ? 'disabled' : ''}>
              ${isResearched ? 'ZBADANO' : (canResearch ? 'BADAJ' : 'ZABLOKOWANE')}
            </button>
          </div>
        `;

        if (canResearch && !isResearched) {
          card.querySelector('.tech-btn').addEventListener('click', () => window.TechTree.research(t.id));
        }

        col.appendChild(card);
      });

      container.appendChild(col);
    });
  }

  function showDialogue(speaker, text, callback = null) {
    dialogueCallback = callback;
    document.getElementById('dialogue-speaker').textContent = speaker;
    document.getElementById('dialogue-text').innerHTML = text;
    document.getElementById('dialogue-box').classList.remove('hidden');
  }

  function showModalNotification(title, content) {
    document.getElementById('modal-title').innerHTML = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('notification-modal').classList.remove('hidden');
  }

  function showNotification(msg) {
    const el = document.getElementById('game-toast');
    el.textContent = msg;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 3500);
  }

  function showFloatingText(text, worldX, worldY, color = '#ffffff') {
    if (window.CombatManager) {
      window.CombatManager.addFloatingText(text, worldX, worldY, color);
    }
  }

  function triggerScreenShake(intensity) {
    if (window.GameEngine) window.GameEngine.triggerShake(intensity);
  }

  return {
    init,
    updateHUD,
    updateHeroRoster,
    updateQuestTracker,
    toggleShop,
    toggleInventory,
    toggleTalents,
    toggleMounts,
    toggleGems,
    toggleBounties,
    toggleTown,
    togglePets,
    toggleTechTree,
    toggleWorldPortalModal,
    updateShopUI,
    updateInventoryUI,
    updateTownUI,
    updatePetsUI,
    updateTalentsUI,
    updateMountsUI,
    updateGemsUI,
    updateBountiesUI,
    updateTechTreeUI,
    showDialogue,
    showModalNotification,
    showNotification,
    showFloatingText,
    triggerScreenShake
  };
})();
