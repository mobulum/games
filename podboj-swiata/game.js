// World Conquest Strategy Game - Complete World 1756 Map
document.addEventListener('DOMContentLoaded', () => {
  
  // Technologies Database
  const TECH_DATA = [
    {
      id: 'ballistics',
      name: 'Balistyka i Artyleria',
      category: 'Militarne',
      icon: 'fa-crosshairs',
      desc: '+20% Siły rażenia Twojej armii w bitwach.',
      cost: 100
    },
    {
      id: 'heavy_tanks',
      name: 'Muszkiety i Jazda / Czołgi Ciężkie',
      category: 'Militarne',
      icon: 'fa-shield-cat',
      desc: '-25% Strat własnych wojsk podczas inwazji.',
      cost: 200
    },
    {
      id: 'automation',
      name: 'Manufaktury / Automatyzacja',
      category: 'Gospodarka',
      icon: 'fa-industry',
      desc: '+35% Większy przychód złota co turę.',
      cost: 150
    },
    {
      id: 'universities',
      name: 'Akademie Naukowe',
      category: 'Nauka',
      icon: 'fa-graduation-cap',
      desc: '+100% Więcej punktów nauki uzyskiwanych co turę.',
      cost: 180
    },
    {
      id: 'blitzkrieg',
      name: 'Doktryna Manewru / Taktyczna',
      category: 'Militarne',
      icon: 'fa-bolt',
      desc: '+40% Szansy na przełamanie obrony i rozgromienie obrońcy.',
      cost: 300
    },
    {
      id: 'espionage',
      name: 'Sieć Szpiegowska / Wywiad',
      category: 'Wywiad',
      icon: 'fa-user-secret',
      desc: 'Pełny podgląd sił i przychodów wszystkich państw świata.',
      cost: 250
    },
    {
      id: 'nuclear',
      name: 'Broń Atomowa / Super-Zasób',
      category: 'Super-broń',
      icon: 'fa-atom',
      desc: 'Odblokowuje możliwość przeprowadzenia natychmiastowej aneksji terytorium!',
      cost: 600
    }
  ];

  // Game State
  const state = {
    mapMode: 'syw', // 'syw', 'ww1', 'ww2', 'europe', 'world'
    playerNationId: null,
    selectedNationId: null,
    turn: 1,
    year: 1756,
    month: 5,
    sciencePoints: 50,
    sciencePerTurn: 25,
    unlockedTechs: [],
    soundEnabled: true,
    autoPlay: false,
    autoPlayTimer: null,
    zoom: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    nations: {}
  };

  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  // D3 Map Projections - Complete World Map for Seven Years War
  let activeGeoJSON = SYW_EXACT_GEOJSON;
  let projection = d3.geoEquirectangular().fitSize([1000, 500], SYW_EXACT_GEOJSON);
  let pathGenerator = d3.geoPath().projection(projection);

  // Sound Engine (Web Audio API)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'cannon') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'nuke') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      } else if (type === 'victory') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      }
    } catch(e) { console.error(e); }
  }

  // Initialization
  function init() {
    setupMapModeSelector();
    initNationData();
    renderCountrySelectionModal();
    setupEventListeners();
  }

  function setupMapModeSelector() {
    const btnWorld = document.getElementById('btn-mode-world');
    const btnEurope = document.getElementById('btn-mode-europe');
    const btnWW1 = document.getElementById('btn-mode-ww1');
    const btnWW2 = document.getElementById('btn-mode-ww2');
    const btnSYW = document.getElementById('btn-mode-syw');

    function setActiveBtn(target) {
      [btnWorld, btnEurope, btnWW1, btnWW2, btnSYW].forEach(b => b.classList.remove('active'));
      target.classList.add('active');
    }

    btnSYW.addEventListener('click', () => {
      playSound('click');
      state.mapMode = 'syw';
      state.year = 1756; state.month = 5;
      setActiveBtn(btnSYW);
      activeGeoJSON = SYW_EXACT_GEOJSON;
      projection = d3.geoEquirectangular().fitSize([1000, 500], SYW_EXACT_GEOJSON);
      pathGenerator = d3.geoPath().projection(projection);
      initNationData();
      renderCountrySelectionModal();
    });

    btnWorld.addEventListener('click', () => {
      playSound('click');
      state.mapMode = 'world';
      state.year = 2026; state.month = 1;
      setActiveBtn(btnWorld);
      activeGeoJSON = WORLD_GEOJSON;
      projection = d3.geoEquirectangular().fitSize([1000, 500], WORLD_GEOJSON);
      pathGenerator = d3.geoPath().projection(projection);
      initNationData();
      renderCountrySelectionModal();
    });

    btnEurope.addEventListener('click', () => {
      playSound('click');
      state.mapMode = 'europe';
      state.year = 2026; state.month = 1;
      setActiveBtn(btnEurope);
      activeGeoJSON = EUROPE_GEOJSON;
      projection = d3.geoMercator().fitSize([1000, 500], EUROPE_GEOJSON);
      pathGenerator = d3.geoPath().projection(projection);
      initNationData();
      renderCountrySelectionModal();
    });

    btnWW1.addEventListener('click', () => {
      playSound('click');
      state.mapMode = 'ww1';
      state.year = 1914; state.month = 8;
      setActiveBtn(btnWW1);
      activeGeoJSON = WW1_EXACT_GEOJSON;
      projection = d3.geoMercator().fitSize([1000, 500], WW1_EXACT_GEOJSON);
      pathGenerator = d3.geoPath().projection(projection);
      initNationData();
      renderCountrySelectionModal();
    });

    btnWW2.addEventListener('click', () => {
      playSound('click');
      state.mapMode = 'ww2';
      state.year = 1944; state.month = 7;
      setActiveBtn(btnWW2);
      activeGeoJSON = WW2_EXACT_GEOJSON;
      projection = d3.geoMercator().fitSize([1000, 500], WW2_EXACT_GEOJSON);
      pathGenerator = d3.geoPath().projection(projection);
      initNationData();
      renderCountrySelectionModal();
    });
  }

  function initNationData() {
    state.nations = {};
    state.playerNationId = null;
    document.getElementById('btn-confirm-start').disabled = true;

    activeGeoJSON.features.forEach(feature => {
      const props = feature.properties;
      state.nations[props.id] = {
        id: props.id,
        name: props.name,
        color: props.color,
        ownerId: props.id,
        gold: Math.round(props.gdp * 1.2),
        army: props.army,
        gdp: props.gdp,
        pop: props.pop,
        faction: props.faction || 'Niezależni',
        pacts: [],
        feature: feature
      };
    });
  }

  // Render Selection Grid in Start Modal
  function renderCountrySelectionModal() {
    const listContainer = document.getElementById('country-select-list');
    listContainer.innerHTML = '';

    const sorted = Object.values(state.nations).sort((a, b) => b.gdp - a.gdp);

    sorted.forEach(data => {
      const card = document.createElement('div');
      card.className = 'select-card';
      card.dataset.id = data.id;
      card.innerHTML = `
        <div class="nation-title">${data.name}</div>
        <div class="nation-stats">
          <span><i class="fa-solid fa-jet-fighter"></i> Armia: ${data.army}k</span><br>
          <span><i class="fa-solid fa-coins"></i> PKB/Skarbiec: $${data.gdp}M</span>
          ${data.faction ? `<br><span class="badge" style="margin-top:4px; display:inline-block;">Frakcja: ${data.faction}</span>` : ''}
        </div>
      `;

      card.addEventListener('click', () => {
        playSound('click');
        document.querySelectorAll('.select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.playerNationId = data.id;
        document.getElementById('btn-confirm-start').disabled = false;
      });

      listContainer.appendChild(card);
    });
  }

  // Start Campaign
  function startGame() {
    if (!state.playerNationId) return;
    playSound('victory');
    
    document.getElementById('start-modal').classList.remove('active');
    document.getElementById('game-container').classList.remove('hidden');

    renderWorldMap();
    updateHUD();
    updateSidebar();

    let startMsg = `Kampania rozpoczęta! Wybrałeś: ${state.nations[state.playerNationId].name}.`;
    if (state.mapMode === 'syw') startMsg = `WOJNA SIEDMIOLETNIA (1756–1763): Przejmujesz ${state.nations[state.playerNationId].name}! Prusy (Czerwone) mają Śląsk i Pomorze Zachodnie, Polska (Żółta) posiada Warszawę, Kraków i Poznań. Pełna mapa świata!`;
    if (state.mapMode === 'ww1') startMsg = `EUROPA 1914 (I Wojna Światowa): Wybrałeś mocarstwo ${state.nations[state.playerNationId].name}. Działa zbrojne rozpoczęte!`;
    if (state.mapMode === 'ww2') startMsg = `EUROPA 1944 (II Wojna Światowa - Szczyt Okupacji i Fronty): Przejąłeś wodzę w ${state.nations[state.playerNationId].name}!`;

    addNewsLog(startMsg);
  }

  // SVG Map Render with Compact & Small Army Markers
  function renderWorldMap() {
    const mapGroup = document.getElementById('map-group');
    mapGroup.innerHTML = '';

    activeGeoJSON.features.forEach(feature => {
      const id = feature.properties.id;
      const nation = state.nations[id];
      const ownerNation = state.nations[nation.ownerId];
      const svgD = pathGenerator(feature);

      if (!svgD) return;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', svgD);
      path.setAttribute('class', 'country-path');
      path.setAttribute('id', `path-${id}`);
      path.setAttribute('fill', ownerNation.color);

      if (nation.ownerId === state.playerNationId) {
        path.classList.add('player-controlled');
      }

      path.addEventListener('mouseenter', (e) => showTooltip(e, id));
      path.addEventListener('mousemove', (e) => positionTooltip(e));
      path.addEventListener('mouseleave', hideTooltip);

      path.addEventListener('click', () => {
        playSound('click');
        selectCountry(id);
      });

      mapGroup.appendChild(path);

      // Centroid markers with tiny, elegant badges
      const centroid = pathGenerator.centroid(feature);
      if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1]) && (feature.properties.gdp > 150 || state.mapMode !== 'world')) {
        const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        markerGroup.setAttribute('transform', `translate(${centroid[0]}, ${centroid[1]})`);
        markerGroup.setAttribute('pointer-events', 'none');

        const labelText = `${nation.army}k`;
        const rectWidth = Math.max(14, labelText.length * 4.2);
        const rectHeight = 8;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', -rectWidth / 2);
        rect.setAttribute('y', -rectHeight / 2);
        rect.setAttribute('width', rectWidth);
        rect.setAttribute('height', rectHeight);
        rect.setAttribute('class', 'army-badge-bg');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', 0);
        text.setAttribute('y', 0);
        text.setAttribute('class', 'army-badge-text');
        text.textContent = labelText;

        markerGroup.appendChild(rect);
        markerGroup.appendChild(text);
        mapGroup.appendChild(markerGroup);
      }
    });
  }

  // Select Country
  function selectCountry(nationId) {
    state.selectedNationId = nationId;

    document.querySelectorAll('.country-path').forEach(p => p.classList.remove('selected'));
    const selectedPath = document.getElementById(`path-${nationId}`);
    if (selectedPath) selectedPath.classList.add('selected');

    updateSidebar();
  }

  // Tooltip Logic
  const tooltip = document.getElementById('map-tooltip');
  function showTooltip(e, nationId) {
    const nation = state.nations[nationId];
    if (!nation) return;
    const owner = state.nations[nation.ownerId];
    tooltip.innerHTML = `
      <strong>${nation.name}</strong><br>
      Właściciel: <span style="color: ${owner.color}">${owner.name}</span><br>
      Armia: <strong>${nation.army}k</strong> | PKB: <strong>$${nation.gdp}M</strong><br>
      ${nation.faction ? `Frakcja: <strong>${nation.faction}</strong>` : ''}
    `;
    tooltip.classList.remove('hidden');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    const rect = document.getElementById('map-viewport').getBoundingClientRect();
    tooltip.style.left = `${e.clientX - rect.left + 15}px`;
    tooltip.style.top = `${e.clientY - rect.top + 15}px`;
  }

  function hideTooltip() {
    tooltip.classList.add('hidden');
  }

  // HUD Update
  function updateHUD() {
    const player = state.nations[state.playerNationId];
    
    document.getElementById('hud-nation-name').textContent = player.name;
    document.getElementById('hud-flag').textContent = player.id.substring(0, 3);
    document.getElementById('hud-flag').style.backgroundColor = player.color;
    
    document.getElementById('hud-gold').textContent = `$${Math.round(player.gold).toLocaleString()}`;
    
    // Income calculation
    let incomeMultiplier = state.unlockedTechs.includes('automation') ? 1.35 : 1.0;
    let income = 0;
    Object.values(state.nations).forEach(n => {
      if (n.ownerId === state.playerNationId) income += Math.round(n.gdp * 0.08 * incomeMultiplier);
    });
    document.getElementById('hud-income').textContent = `+$${income}/t`;

    // Science calculation
    let sciMultiplier = state.unlockedTechs.includes('universities') ? 2.0 : 1.0;
    const currentSciGain = Math.round(state.sciencePerTurn * sciMultiplier);
    document.getElementById('hud-science').textContent = `+${currentSciGain} pkt/t (${state.sciencePoints} pkt)`;

    // Total Army
    let totalArmy = 0;
    Object.values(state.nations).forEach(n => {
      if (n.ownerId === state.playerNationId) totalArmy += n.army;
    });
    document.getElementById('hud-army').textContent = `${totalArmy}k`;

    // Conquest %
    const totalCount = Object.keys(state.nations).length;
    const controlledCount = Object.values(state.nations).filter(n => n.ownerId === state.playerNationId).length;
    const pct = ((controlledCount / totalCount) * 100).toFixed(1);
    document.getElementById('hud-conquest-pct').textContent = `${pct}% (${controlledCount}/${totalCount})`;

    // Date
    document.getElementById('hud-date').textContent = `${months[state.month - 1]} ${state.year}`;

    updateLeaderboard();
  }

  // Update Sidebar
  function updateSidebar() {
    const sideName = document.getElementById('side-country-name');
    const sideOwner = document.getElementById('side-country-owner');
    const sideArmy = document.getElementById('side-army-val');
    const sideGdp = document.getElementById('side-gdp-val');
    const sidePop = document.getElementById('side-pop-val');
    const sideRelation = document.getElementById('side-relation-val');

    const btnAttack = document.getElementById('btn-action-attack');
    const btnNuke = document.getElementById('btn-action-nuke');
    const btnPact = document.getElementById('btn-action-pact');

    if (!state.selectedNationId) {
      sideName.textContent = 'Wybierz Terytorium na Mapie';
      sideOwner.textContent = '--';
      sideArmy.textContent = '--';
      sideGdp.textContent = '--';
      sidePop.textContent = '--';
      sideRelation.textContent = '--';
      btnAttack.disabled = true;
      btnNuke.classList.add('hidden');
      btnPact.disabled = true;
      return;
    }

    const selected = state.nations[state.selectedNationId];
    const owner = state.nations[selected.ownerId];
    const isPlayer = (selected.ownerId === state.playerNationId);

    sideName.textContent = selected.name;
    sideOwner.textContent = owner.name;
    sideOwner.style.borderColor = owner.color;
    sideOwner.style.color = owner.color;

    sideArmy.textContent = `${selected.army}k Wojska`;
    sideGdp.textContent = `$${selected.gdp}M`;
    sidePop.textContent = `${selected.pop} mln`;

    if (isPlayer) {
      sideRelation.textContent = 'Twoje Terytorium';
      sideRelation.style.color = '#3b82f6';
      btnAttack.disabled = true;
      btnNuke.classList.add('hidden');
      btnPact.disabled = true;
    } else {
      const isPact = selected.pacts.includes(state.playerNationId);

      sideRelation.textContent = isPact ? 'Pakt o Nieagresji' : 'Stan Wojny / Cel Inwazji';
      sideRelation.style.color = isPact ? '#22c55e' : '#ef4444';

      btnAttack.disabled = isPact;
      btnPact.disabled = isPact;

      if (state.unlockedTechs.includes('nuclear') && !isPact) {
        btnNuke.classList.remove('hidden');
      } else {
        btnNuke.classList.add('hidden');
      }
    }
  }

  // Render Tech Tree Modal
  function renderTechTree() {
    const container = document.getElementById('tech-tree-container');
    container.innerHTML = '';
    document.getElementById('tech-points-val').textContent = state.sciencePoints;

    TECH_DATA.forEach(tech => {
      const isUnlocked = state.unlockedTechs.includes(tech.id);
      const canAfford = state.sciencePoints >= tech.cost;

      const card = document.createElement('div');
      card.className = `tech-card ${isUnlocked ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div>
          <div class="tech-icon"><i class="fa-solid ${tech.icon}"></i></div>
          <div class="tech-title">${tech.name}</div>
          <div class="tech-desc">${tech.desc}</div>
        </div>
        <div class="tech-footer">
          <span class="tech-cost">${tech.cost} pkt Nauki</span>
          ${isUnlocked ? '' : `<button class="btn btn-accent btn-sm btn-unlock" ${!canAfford ? 'disabled' : ''}>Opracuj</button>`}
        </div>
      `;

      if (!isUnlocked && canAfford) {
        card.querySelector('.btn-unlock').addEventListener('click', () => unlockTech(tech.id, tech.cost));
      }

      container.appendChild(card);
    });
  }

  function unlockTech(techId, cost) {
    if (state.sciencePoints < cost) return;
    playSound('victory');
    state.sciencePoints -= cost;
    state.unlockedTechs.push(techId);

    const tech = TECH_DATA.find(t => t.id === techId);
    addNewsLog(`ODBLOKOWANO TECHNOLOGIĘ: Opracowano "${tech.name}"!`);

    renderTechTree();
    updateHUD();
    updateSidebar();
  }

  // Actions
  function recruitArmy() {
    const player = state.nations[state.playerNationId];
    if (player.gold < 200) {
      addNewsLog('Brak funduszy na rekrutację wojska ($200)!');
      return;
    }
    playSound('cannon');
    player.gold -= 200;
    player.army += 15;
    updateHUD();
    updateSidebar();
    renderWorldMap();
    addNewsLog(`Zrekrutowano +15k dywizji dla ${player.name}.`);
  }

  function developEconomy() {
    const player = state.nations[state.playerNationId];
    if (player.gold < 300) {
      addNewsLog('Brak funduszy na rozwój przemysłu ($300)!');
      return;
    }
    playSound('click');
    player.gold -= 300;
    player.gdp += 100;
    updateHUD();
    updateSidebar();
    addNewsLog(`Rozwinięto przemysł i budżet ${player.name} (+100 PKB).`);
  }

  function buildUniversity() {
    const player = state.nations[state.playerNationId];
    if (player.gold < 250) {
      addNewsLog('Brak funduszy na rozbudowę uniwersytetu ($250)!');
      return;
    }
    playSound('click');
    player.gold -= 250;
    state.sciencePerTurn += 25;
    updateHUD();
    addNewsLog(`Zbudowano nową Akademię Nauk w ${player.name} (+25 Nauki/t).`);
  }

  function signPact() {
    if (!state.selectedNationId) return;
    const target = state.nations[state.selectedNationId];
    target.pacts.push(state.playerNationId);
    playSound('click');
    addNewsLog(`Podpisano Pakt o Nieagresji z terytorium: ${target.name}.`);
    updateSidebar();
  }

  function launchNuke() {
    if (!state.selectedNationId) return;
    const defender = state.nations[state.selectedNationId];
    playSound('nuke');

    defender.ownerId = state.playerNationId;
    defender.army = 10;

    addNewsLog(`ATAK ATOMOWY / PRZEŁAMANIE: Przeprowadzono uderzenie na ${defender.name}! Terytorium przejęte!`);

    renderWorldMap();
    updateHUD();
    updateSidebar();
    checkVictoryConditions();
  }

  // Attack / Battle System
  function launchInvasion() {
    if (!state.selectedNationId) return;
    const defender = state.nations[state.selectedNationId];
    const player = state.nations[state.playerNationId];

    document.getElementById('battle-attacker-name').textContent = player.name;
    document.getElementById('battle-attacker-army').textContent = `Armia: ${player.army}k`;

    document.getElementById('battle-defender-name').textContent = defender.name;
    document.getElementById('battle-defender-army').textContent = `Armia: ${defender.army}k`;

    document.getElementById('battle-bar-att').style.width = '50%';
    document.getElementById('battle-bar-def').style.width = '50%';
    document.getElementById('battle-status-text').textContent = 'Wojska gotowe do szturmu...';

    document.getElementById('btn-battle-autowin').classList.remove('hidden');
    document.getElementById('btn-battle-close').classList.add('hidden');

    document.getElementById('battle-modal').classList.add('active');
  }

  function executeBattle() {
    playSound('cannon');
    const defender = state.nations[state.selectedNationId];
    const player = state.nations[state.playerNationId];

    let attArmy = player.army;
    let defArmy = defender.army;

    let attBonus = 1.0;
    if (state.unlockedTechs.includes('ballistics')) attBonus += 0.2;
    if (state.unlockedTechs.includes('blitzkrieg')) attBonus += 0.4;

    let defLossReducer = state.unlockedTechs.includes('heavy_tanks') ? 0.75 : 1.0;

    const attPower = attArmy * attBonus * (0.8 + Math.random() * 0.5);
    const defPower = defArmy * (1.0 + Math.random() * 0.4);

    if (attPower > defPower) {
      const casualtyAtt = Math.round(attArmy * 0.2 * defLossReducer);
      player.army = Math.max(10, attArmy - casualtyAtt);
      defender.ownerId = state.playerNationId;
      defender.army = 15;

      document.getElementById('battle-bar-att').style.width = '100%';
      document.getElementById('battle-bar-def').style.width = '0%';
      document.getElementById('battle-status-text').textContent = `ZWYCIĘSTWO! ${defender.name} zostało podbite i włączone do Twojego imperium!`;
      
      playSound('victory');
      addNewsLog(`ZWYCIĘSTWO: ${player.name} podbiło ${defender.name}!`);
    } else {
      const casualtyAtt = Math.round(attArmy * 0.35 * defLossReducer);
      player.army = Math.max(5, attArmy - casualtyAtt);

      document.getElementById('battle-bar-att').style.width = '20%';
      document.getElementById('battle-bar-def').style.width = '80%';
      document.getElementById('battle-status-text').textContent = `ATAK ODPARTY! Siły ${defender.name} odparły Twój szturm.`;

      addNewsLog(`PORAŻKA: Szturm na ${defender.name} zakończony niepowodzeniem.`);
    }

    document.getElementById('btn-battle-autowin').classList.add('hidden');
    document.getElementById('btn-battle-close').classList.remove('hidden');

    renderWorldMap();
    updateHUD();
    updateSidebar();
    checkVictoryConditions();
  }

  // Turn Engine & AI Cycle
  function advanceTurn() {
    playSound('click');
    state.month++;
    if (state.month > 12) {
      state.month = 1;
      state.year++;
    }
    state.turn++;

    let sciMultiplier = state.unlockedTechs.includes('universities') ? 2.0 : 1.0;
    state.sciencePoints += Math.round(state.sciencePerTurn * sciMultiplier);

    let incomeMultiplier = state.unlockedTechs.includes('automation') ? 1.35 : 1.0;
    Object.values(state.nations).forEach(n => {
      const mult = (n.ownerId === state.playerNationId) ? incomeMultiplier : 1.0;
      const income = Math.round(n.gdp * 0.08 * mult);
      n.gold += income;

      if (n.ownerId !== state.playerNationId && Math.random() > 0.4) {
        n.army += Math.round(2 + Math.random() * 6);
      }
    });

    processAITurn();

    updateHUD();
    updateSidebar();
    renderWorldMap();
  }

  function processAITurn() {
    const allNations = Object.values(state.nations);
    const aiNations = allNations.filter(n => n.ownerId !== state.playerNationId);
    if (aiNations.length < 2) return;

    const attacker = aiNations[Math.floor(Math.random() * aiNations.length)];
    const defender = allNations[Math.floor(Math.random() * allNations.length)];

    if (attacker && defender && attacker.ownerId !== defender.ownerId && Math.random() > 0.7) {
      if (attacker.army > defender.army * 1.3) {
        defender.ownerId = attacker.ownerId;
        addNewsLog(`WIADOMOŚCI: ${attacker.name} zaatakowało i zajęło terytorium ${defender.name}!`);
      }
    }
  }

  // Check Victory
  function checkVictoryConditions() {
    const totalCount = Object.keys(state.nations).length;
    const playerControlled = Object.values(state.nations).filter(n => n.ownerId === state.playerNationId).length;

    if (playerControlled === totalCount) {
      document.getElementById('endgame-title').textContent = 'GLOBALNA DOMINACJA!';
      document.getElementById('endgame-msg').textContent = `Gratulacje! ${state.nations[state.playerNationId].name} opanowało wszystkie terytorium!`;
      document.getElementById('endgame-modal').classList.add('active');
    }
  }

  // Leaderboard
  function updateLeaderboard() {
    const list = document.getElementById('ranking-list');
    list.innerHTML = '';

    const scores = {};
    Object.values(state.nations).forEach(n => {
      const owner = state.nations[n.ownerId].name;
      scores[owner] = (scores[owner] || 0) + 1;
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);

    sorted.forEach(([name, count], index) => {
      const li = document.createElement('li');
      li.className = 'ranking-item';
      li.innerHTML = `<span>#${index + 1} ${name}</span><strong>${count} terytoriów</strong>`;
      list.appendChild(li);
    });
  }

  function addNewsLog(msg) {
    const log = document.getElementById('news-log');
    log.innerHTML = `<span class="log-entry">[Tura ${state.turn}] ${msg}</span>`;
  }

  // Pan & Zoom Map Controls
  function setupMapPanZoom() {
    const viewport = document.getElementById('map-viewport');
    const svgGroup = document.getElementById('map-group');

    function updateTransform() {
      svgGroup.setAttribute('transform', `translate(${state.panX}, ${state.panY}) scale(${state.zoom})`);
    }

    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      state.zoom = Math.min(4, state.zoom + 0.3);
      updateTransform();
    });

    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      state.zoom = Math.max(0.5, state.zoom - 0.3);
      updateTransform();
    });

    document.getElementById('btn-zoom-reset').addEventListener('click', () => {
      state.zoom = 1;
      state.panX = 0;
      state.panY = 0;
      updateTransform();
    });

    viewport.addEventListener('mousedown', (e) => {
      state.isDragging = true;
      state.dragStart = { x: e.clientX - state.panX, y: e.clientY - state.panY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;
      state.panX = e.clientX - state.dragStart.x;
      state.panY = e.clientY - state.dragStart.y;
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      state.isDragging = false;
    });
  }

  // Event Listeners
  function setupEventListeners() {
    document.getElementById('btn-confirm-start').addEventListener('click', startGame);
    document.getElementById('btn-next-turn').addEventListener('click', advanceTurn);
    
    document.getElementById('btn-action-recruit').addEventListener('click', recruitArmy);
    document.getElementById('btn-action-economy').addEventListener('click', developEconomy);
    document.getElementById('btn-action-research').addEventListener('click', buildUniversity);
    document.getElementById('btn-action-pact').addEventListener('click', signPact);
    document.getElementById('btn-action-attack').addEventListener('click', launchInvasion);
    document.getElementById('btn-action-nuke').addEventListener('click', launchNuke);

    document.getElementById('btn-open-tech').addEventListener('click', () => {
      playSound('click');
      renderTechTree();
      document.getElementById('tech-modal').classList.add('active');
    });

    document.getElementById('btn-tech-close').addEventListener('click', () => {
      document.getElementById('tech-modal').classList.remove('active');
    });

    document.getElementById('btn-battle-autowin').addEventListener('click', executeBattle);
    document.getElementById('btn-battle-close').addEventListener('click', () => {
      document.getElementById('battle-modal').classList.remove('active');
    });

    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      document.getElementById('btn-sound-toggle').innerHTML = state.soundEnabled ? 
        '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    });

    document.getElementById('btn-speed').addEventListener('click', () => {
      state.autoPlay = !state.autoPlay;
      const btn = document.getElementById('btn-speed');
      if (state.autoPlay) {
        btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        btn.classList.add('btn-primary');
        state.autoPlayTimer = setInterval(advanceTurn, 1500);
      } else {
        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        btn.classList.remove('btn-primary');
        clearInterval(state.autoPlayTimer);
      }
    });

    setupMapPanZoom();
  }

  // Initialize Game
  init();
});
