// Mega Konfiguracja: 10 Modułów Rozgrywki
window.GAME_CONFIG = {
  RARITY_TIERS: {
    COMMON: { id: 'common', name: 'Pospolity', color: '#b0bec5', glow: 'rgba(176,190,197,0.4)', multiplier: 1.0 },
    RARE: { id: 'rare', name: 'Rzadki', color: '#29b6f6', glow: 'rgba(41,182,246,0.6)', multiplier: 1.35 },
    EPIC: { id: 'epic', name: 'Epicki', color: '#ab47bc', glow: 'rgba(171,71,188,0.7)', multiplier: 1.8 },
    LEGENDARY: { id: 'legendary', name: 'Legendarny', color: '#ffa726', glow: 'rgba(255,167,38,0.85)', multiplier: 2.4 },
    MYTHIC: { id: 'mythic', name: 'Mityczny', color: '#ff1744', glow: 'rgba(255,23,68,0.95)', multiplier: 3.2 }
  },

  WORLDS: {
    hub: {
      id: 'hub',
      name: 'Dolina Technomagów (Osada & Las)',
      color: '#4caf50',
      description: 'Bezpieczna osada rzemieślników, stajnia, tablica zleceń i pradawny las.',
      spawn: { x: 450, y: 420 },
      portalPos: { x: 580, y: 390 }
    },
    frostlands: {
      id: 'frostlands',
      name: 'Mroźne Pustkowia (Świat Śniegu)',
      color: '#00e5ff',
      description: 'Zamarznięte tundry opanowane przez lodowe bestie i śnieżnego tytana.',
      spawn: { x: 250, y: 250 },
      portalPos: { x: 200, y: 200 }
    },
    catacombs: {
      id: 'catacombs',
      name: 'Podziemne Katakumby (Proceduralny Loch)',
      color: '#ba68c8',
      description: 'Losowo generowany loch z pułapkami kolcowymi, ukrytymi skarbami i nieumarłymi.',
      spawn: { x: 300, y: 300 },
      portalPos: { x: 220, y: 220 }
    },
    fire_realm: {
      id: 'fire_realm',
      name: 'Płonąca Otchłań (Wymiar Lawy)',
      color: '#ff5722',
      description: 'Piekielne pustkowia pełne lawy, demonów i Władcy Płomieni.',
      spawn: { x: 300, y: 300 },
      portalPos: { x: 200, y: 200 }
    }
  },

  // Postacie wraz z Atakami Ultimate
  HEROES: [
    {
      id: 'warrior',
      name: 'Valen (Wojownik)',
      title: 'Młody Szermierz',
      rarity: 'COMMON',
      description: 'Zwinny i odważny szermierz. Mistrz ciosów wręcz i tytanicznych skoków.',
      icon: '⚔️',
      stats: { maxHp: 160, hp: 160, atk: 22, def: 8, spd: 3.2, critChance: 0.1 },
      attackType: 'melee',
      attackRange: 46,
      attackCooldown: 280,
      skillName: 'Wir Miecza',
      skillDesc: 'Okrężne cięcie raniące wszystkich okolicznych wrogów w promieniu 80px.',
      skillCooldown: 4000,
      ultName: 'Tytaniczny Skok i Pęknięcie Ziemi',
      ultDesc: 'Wyskakuje w powietrze i spada z impetem, ogłuszając wrogów na 3s i zadając 300 DMG!',
      spriteType: 'hero_warrior',
      unlocked: true
    },
    {
      id: 'archer',
      name: 'Lyra (Łowczyni)',
      title: 'Cień Zielonego Lasu',
      rarity: 'RARE',
      description: 'Mistrzyni łuku dalekosiężnego. Atakuje z dystansu i spowalnia wrogów.',
      icon: '🏹',
      stats: { maxHp: 180, hp: 180, atk: 28, def: 7, spd: 3.6, critChance: 0.22 },
      attackType: 'ranged',
      attackRange: 240,
      attackCooldown: 340,
      skillName: 'Grad Strzał',
      skillDesc: 'Wystrzeliwuje salwę 5 przeszywających strzał.',
      skillCooldown: 4500,
      ultName: 'Deszcz Eterycznych Strzał Balistycznych',
      ultDesc: 'Przykrywa cały ekran dziesiątkami deszczu strzał, niszcząc wszystkich wrogów.',
      spriteType: 'hero_archer',
      unlocked: false,
      unlockSource: 'Misja: Oczyszczenie Pradawnego Lasu'
    },
    {
      id: 'mage',
      name: 'Aelthor (Mag Burzy)',
      title: 'Władca Runów i Eteru',
      rarity: 'EPIC',
      description: 'Czarodziej władający pradawną energią piorunów i zaginioną grawitacją.',
      icon: '⚡',
      stats: { maxHp: 220, hp: 220, atk: 42, def: 12, spd: 3.3, critChance: 0.28 },
      attackType: 'magic',
      attackRange: 280,
      attackCooldown: 380,
      skillName: 'Błyskawica Łańcuchowa',
      skillDesc: 'Piorun przeskakujący między 4 wrogami zadający potężne obrażenia.',
      skillCooldown: 5000,
      ultName: 'Singularność Grawitacyjna',
      ultDesc: 'Tworzy czarną dziurę, która zasysa wszystkich wrogów w jedno miejsce i eksploduje.',
      spriteType: 'hero_mage',
      unlocked: false,
      unlockSource: 'Badania: Projektory Piorunów'
    },
    {
      id: 'behemoth',
      name: 'Titan-01 (Żelazny Behemot)',
      title: 'Parowy Kolos Bojowy',
      rarity: 'LEGENDARY',
      description: 'Masywny mech bojowy zasilany rdzeniami technologii.',
      icon: '🤖',
      stats: { maxHp: 420, hp: 420, atk: 60, def: 26, spd: 2.8, critChance: 0.15 },
      attackType: 'melee_heavy',
      attackRange: 55,
      attackCooldown: 480,
      skillName: 'Salwa Rakietowa',
      skillDesc: 'Wypuszcza 6 samonaprowadzających rakiet parowych.',
      skillCooldown: 6000,
      ultName: 'Przeciążenie Reaktora',
      ultDesc: 'Masywna fala parowej eksplozji oraz niezniszczalna bariera na 6 sekund!',
      spriteType: 'hero_behemoth',
      unlocked: false,
      unlockSource: 'Badania: Rdzeń Pradawnego Kolosa'
    },
    {
      id: 'avatar',
      name: 'Ignis (Awatar Kosmicznego Ognia)',
      title: 'Wcielenie Gwiezdnego Płomienia',
      rarity: 'MYTHIC',
      description: 'Mityczna istota czystej energii gwiezdnej. Unosi się nad ziemią i spopiela wszystko wokół.',
      icon: '🔥',
      stats: { maxHp: 650, hp: 650, atk: 90, def: 22, spd: 4.0, critChance: 0.40 },
      attackType: 'cosmic',
      attackRange: 320,
      attackCooldown: 260,
      skillName: 'Deszcz Meteorytów',
      skillDesc: 'Przywołuje spadające meteory niszczące cały obszar walki.',
      skillCooldown: 7000,
      ultName: 'Supernowa Kosmiczna',
      ultDesc: 'Oślepiający gwiezdny rozbłysk natychmiast zadający 1200 obrażeń wszystkim wrogom na mapie.',
      spriteType: 'hero_avatar',
      unlocked: false,
      unlockSource: 'Finałowe zadanie oraz technologia Rezonans Kosmiczny'
    }
  ],

  // Drzewka Talentów dla Każdego Bohatera (3 talenty na postać, poziomy 1-5 każdy)
  TALENTS: {
    warrior: [
      { id: 'w_rage', name: 'Szał Berserkera', desc: '+8% obrażeń ataku za każdy punkt', maxLvl: 5, bonus: { type: 'atk_pct', val: 0.08 } },
      { id: 'w_bastion', name: 'Żelazny Bastion', desc: '+5 obrony i +30 HP za każdy punkt', maxLvl: 5, bonus: { type: 'def_hp', def: 5, hp: 30 } },
      { id: 'w_vamp', name: 'Zew Walki', desc: '+3% kradzieży życia przy trafieniu za punkt', maxLvl: 5, bonus: { type: 'lifesteal', val: 0.03 } }
    ],
    archer: [
      { id: 'a_eagle', name: 'Sokole Oko', desc: '+6% szansy na krytyk i +15% kryt obrażeń', maxLvl: 5, bonus: { type: 'crit', val: 0.06, dmg: 0.15 } },
      { id: 'a_agility', name: 'Zwinność Wiatru', desc: '+7% prędkości poruszania się i +4% uniku', maxLvl: 5, bonus: { type: 'spd_dodge', spd: 0.07, dodge: 0.04 } },
      { id: 'a_multishot', name: 'Wielostrzał Eteru', desc: '+1 dodatkowa strzała w salwie co 2 poziomy', maxLvl: 5, bonus: { type: 'arrow_count', val: 1 } }
    ],
    mage: [
      { id: 'm_overcharge', name: 'Przeładowanie Eteru', desc: '-6% czasu odnowienia czarów za punkt', maxLvl: 5, bonus: { type: 'cdr', val: 0.06 } },
      { id: 'm_arcane_shield', name: 'Tarcza Pradawnych', desc: '+60 tarczy energetycznej za punkt', maxLvl: 5, bonus: { type: 'shield', val: 60 } },
      { id: 'm_storm_master', name: 'Władca Burzy', desc: '+15% obrażeń od czarów i łańcuch piorunów', maxLvl: 5, bonus: { type: 'magic_dmg', val: 0.15 } }
    ],
    behemoth: [
      { id: 'b_hull', name: 'Tytaniczny Kadłub', desc: '+100 HP i +10 Def za każdy punkt', maxLvl: 5, bonus: { type: 'tank', hp: 100, def: 10 } },
      { id: 'b_boiler', name: 'Kocioł Ciśnieniowy', desc: '+10% obrażeń od eksplozji i rakiet', maxLvl: 5, bonus: { type: 'explosive', val: 0.10 } },
      { id: 'b_steam_ram', name: 'Taran Parowy', desc: '+40% obrażeń od szarży wierzchowca', maxLvl: 5, bonus: { type: 'ram_dmg', val: 0.40 } }
    ],
    avatar: [
      { id: 'v_stellar', name: 'Blask Gwiezdny', desc: '+12% wszystkich zadawanych obrażeń', maxLvl: 5, bonus: { type: 'all_dmg', val: 0.12 } },
      { id: 'v_celestial_shield', name: 'Niebiańska Ochrona', desc: 'Regeneracja 10 HP/s i stała aura parząca', maxLvl: 5, bonus: { type: 'cosmic_aura', val: 10 } },
      { id: 'v_infinity', name: 'Nieskończoność', desc: '+25% szybsze ładowanie energii Ultimate [R]', maxLvl: 5, bonus: { type: 'fury_gen', val: 0.25 } }
    ]
  },

  // Kamienie Runiczne do Gniazd
  GEMS: [
    { id: 'gem_ruby', name: 'Rubin Płomienia', icon: '💎', color: '#ff1744', type: 'fire', desc: 'Dodaje +25% szansy na podpalenie wrogów (obrażenia z upływem czasu).' },
    { id: 'gem_sapphire', name: 'Szafir Zmarzliny', icon: '🔷', color: '#00e5ff', type: 'frost', desc: 'Dodaje +30% szansy na zamrożenie i spowolnienie wrogów o 40%.' },
    { id: 'gem_emerald', name: 'Szmaragd Jadu', icon: '🟢', color: '#00e676', type: 'poison', desc: 'Zatruwa wrogów osłabiając ich atak o 20%.' },
    { id: 'gem_amethyst', name: 'Ametyst Wampiryzmu', icon: '🟣', color: '#d500f9', type: 'vampire', desc: 'Kradnie 6% zadanych obrażeń jako punkty zdrowia bohatera.' }
  ],

  // Wierzchowce (Mounts)
  MOUNTS: [
    { id: 'mount_steam_horse', name: 'Mechaniczny Koń Parowy', icon: '🐎', speedBonus: 0.65, chargeDmg: 45, cost: 200, color: '#ffb74d', desc: 'Szybki wierzchowiec napędzany parą. Szarża taranuje zwykłych wrogów.' },
    { id: 'mount_frost_wolf', name: 'Wilk Wiecznej Zmarzliny', icon: '🐺', speedBonus: 0.85, chargeDmg: 70, cost: 450, color: '#00e5ff', desc: 'Dzikia bestia północy. Szarża zamraża trafionych wrogów.' },
    { id: 'mount_dragon_mech', name: 'Smoczy Mech Bojowy', icon: '🐉', speedBonus: 1.15, chargeDmg: 120, cost: 850, color: '#ff1744', desc: 'Szczyt inżynierii bojowej. Piekielna prędkość i potężna fala uderzeniowa szarży.' }
  ],

  // Tablica Zleceń Łowcy Głów (Bounties)
  BOUNTIES: [
    { id: 'b_wolves', title: 'Polowanie na Stado Alf', target: 'wolf', count: 8, rewardGold: 120, rewardTokens: 2, icon: '🐺' },
    { id: 'b_drones', title: 'Sabotaż Zmechanizowanych Dronów', target: 'drone', count: 6, rewardGold: 180, rewardTokens: 3, icon: '🛸' },
    { id: 'b_skeletons', title: 'Oczyszczenie Kościotrupów', target: 'skeleton', count: 10, rewardGold: 220, rewardTokens: 4, icon: '💀' },
    { id: 'b_guardian', title: 'LIST GOŃCZY: Strażnik Ruin', target: 'ruin_guardian', count: 1, isBoss: true, rewardGold: 400, rewardTokens: 8, icon: '👑' }
  ],

  // Fale Areny Koloseum (Survival)
  ARENA_WAVES: [
    { wave: 1, enemies: [{ type: 'wolf', count: 6 }] },
    { wave: 2, enemies: [{ type: 'goblin', count: 6 }, { type: 'wolf', count: 4 }] },
    { wave: 3, enemies: [{ type: 'drone', count: 6 }, { type: 'golem_minion', count: 4 }] },
    { wave: 4, enemies: [{ type: 'frost_wolf', count: 8 }, { type: 'frost_golem', count: 4 }] },
    { wave: 5, isBossWave: true, enemies: [{ type: 'ruin_guardian', count: 1 }, { type: 'drone', count: 4 }] },
    { wave: 6, enemies: [{ type: 'skeleton', count: 12 }, { type: 'skeleton_mage', count: 4 }] },
    { wave: 7, enemies: [{ type: 'fire_elemental', count: 10 }] },
    { wave: 8, isBossWave: true, enemies: [{ type: 'frost_titan', count: 1 }, { type: 'frost_golem', count: 4 }] },
    { wave: 9, enemies: [{ type: 'fire_elemental', count: 14 }, { type: 'skeleton_mage', count: 6 }] },
    { wave: 10, isBossWave: true, enemies: [{ type: 'flame_lord', count: 1 }, { type: 'skeleton_king', count: 1 }] }
  ],

  // Sklep i Rynsztunek z gniazdami na klejnoty
  SHOP_ITEMS: [
    { id: 'sword_iron', name: 'Kuty Miecz Żelazny', type: 'weapon', slot: 'weapon', rarity: 'COMMON', price: 40, icon: '🗡️', stats: { atk: 15, critChance: 0.05 }, sockets: 1, desc: 'Solidne żelazne ostrze z jednym gniazdem runicznym.' },
    { id: 'sword_runic', name: 'Ostrze Runicznej Stali', type: 'weapon', slot: 'weapon', rarity: 'RARE', price: 120, icon: '⚔️', stats: { atk: 32, critChance: 0.12 }, sockets: 2, desc: 'Runiczna stal z dwoma gniazdami na klejnoty.' },
    { id: 'sword_frost', name: 'Lodowy Krawędź Północy', type: 'weapon', slot: 'weapon', rarity: 'EPIC', price: 280, icon: '❄️', stats: { atk: 65, critChance: 0.18 }, sockets: 2, desc: 'Wykute z wiecznego lodu ostrze z dwoma gniazdami.' },
    { id: 'sword_cosmic', name: 'Gwiezdny Rozpruwacz Kosmosu', type: 'weapon', slot: 'weapon', rarity: 'MYTHIC', price: 750, icon: '🌠', stats: { atk: 140, critChance: 0.35, critDmg: 0.8 }, sockets: 3, desc: 'Mityczny miecz z trzema potężnymi gniazdami gwiezdnymi.' },

    { id: 'bow_hunter', name: 'Dębowy Łuk Myśliwski', type: 'weapon', slot: 'weapon', rarity: 'COMMON', price: 45, icon: '🏹', stats: { atk: 18, spd: 0.2 }, sockets: 1, desc: 'Lekki łuk z gniazdem na kamień.' },
    { id: 'bow_composite', name: 'Kompozytowy Łuk Snajperski', type: 'weapon', slot: 'weapon', rarity: 'RARE', price: 135, icon: '🎯', stats: { atk: 38, critChance: 0.15 }, sockets: 2, desc: 'Łuk kompozytowy z dwoma gniazdami.' },
    { id: 'bow_storm', name: 'Łuk Piorunującego Wichru', type: 'weapon', slot: 'weapon', rarity: 'EPIC', price: 320, icon: '⚡', stats: { atk: 72, critChance: 0.22 }, sockets: 2, desc: 'Naładowany piorunami łuk z dwoma gniazdami.' },
    { id: 'bow_celestial', name: 'Niebiański Łuk Artemidy', type: 'weapon', slot: 'weapon', rarity: 'LEGENDARY', price: 680, icon: '✨', stats: { atk: 125, critChance: 0.30, spd: 0.6 }, sockets: 3, desc: 'Legendarny oręż z trzema gniazdami.' },

    { id: 'armor_leather', name: 'Wzmacniana Kurtka Skórzana', type: 'armor', slot: 'armor', rarity: 'COMMON', price: 35, icon: '🥋', stats: { hp: 50, def: 8 }, sockets: 1, desc: 'Skórzany kaftan z jednym gniazdem obronnym.' },
    { id: 'armor_plate', name: 'Płytowa Zbroja Strażnika', type: 'armor', slot: 'armor', rarity: 'RARE', price: 110, icon: '🛡️', stats: { hp: 120, def: 18 }, sockets: 2, desc: 'Ciężka płyta z dwoma gniazdami.' },
    { id: 'armor_steampunk', name: 'Parowy Egzoszkielet Bojowy', type: 'armor', slot: 'armor', rarity: 'EPIC', price: 300, icon: '⚙️', stats: { hp: 260, def: 32, hpRegen: 5 }, sockets: 2, desc: 'Mechaniczny pancerz z dwoma gniazdami.' },
    { id: 'armor_titan', name: 'Zbroja Pradawnego Tytana', type: 'armor', slot: 'armor', rarity: 'LEGENDARY', price: 700, icon: '🦾', stats: { hp: 500, def: 60, hpRegen: 12 }, sockets: 3, desc: 'Masywny pancerz tytana z trzema gniazdami.' },

    { id: 'ring_ruby', name: 'Rubinowy Pierścień Berserkera', type: 'ring', slot: 'ring', rarity: 'RARE', price: 90, icon: '💍', stats: { atk: 18, critChance: 0.1 }, sockets: 1, desc: 'Pierścień furii z gniazdem.' },
    { id: 'ring_sapphire', name: 'Szafirowy Pierścień Skupienia', type: 'ring', slot: 'ring', rarity: 'EPIC', price: 220, icon: '💎', stats: { hp: 140, cdReduction: 0.15 }, sockets: 1, desc: 'Pierścień eteru z gniazdem.' },

    { id: 'pot_heal', name: 'Wielka Mikstura Zdrowia', type: 'consumable', rarity: 'COMMON', price: 15, icon: '🧪', desc: 'Przywraca 150 HP.', effect: { type: 'heal', value: 150 } },
    { id: 'pot_cd', name: 'Eliksir Furii Runicznej', type: 'consumable', rarity: 'RARE', price: 30, icon: '🍶', desc: 'Resetuje cooldown umiejętności oraz natychmiast napełnia 50% Furii!', effect: { type: 'reset_cd' } }
  ],

  // Budynki Osady
  TOWN_BUILDINGS: {
    blacksmith: { id: 'blacksmith', name: 'Kuźnia Osady', level: 1, maxLevel: 5, costGold: 100, costScience: 40, desc: 'Zmniejsza ceny w sklepie o 5% i zwiększa bonus ulepszeń o 10% za poziom.', icon: '⚒️' },
    alchemist: { id: 'alchemist', name: 'Laboratorium Alchemii', level: 0, maxLevel: 5, costGold: 150, costScience: 60, desc: 'Pasywnie generuje +8 Punktów Badań na minutę za poziom.', icon: '⚗️' },
    treasury: { id: 'treasury', name: 'Skarbiec i Targowisko', level: 0, maxLevel: 5, costGold: 120, costScience: 50, desc: 'Pasywnie generuje +25 Złota na minutę za poziom.', icon: '🏦' },
    defense_tower: { id: 'defense_tower', name: 'Wieża Ochronna Straży', level: 0, maxLevel: 3, costGold: 200, costScience: 80, desc: 'Wspiera gracza ostrzałem balistycznym i daje +10% obrony.', icon: '🗼' }
  },

  // Chowańce / Pety
  PETS: [
    { id: 'drone_bot', name: 'Dron Bojowy Mk-1', desc: 'Latający automat parowy. Strzela pociskami we wrogów i zbiera złoto.', icon: '🛸', rarity: 'RARE', cost: 150, atk: 14, range: 220, attackCooldown: 1200, color: '#00e5ff' },
    { id: 'frost_pixie', name: 'Lodowy Duszek (Pixie)', desc: 'Mistyczna istota mrozu. Spowalnia wrogów i leczy bohatera.', icon: '🧚', rarity: 'EPIC', cost: 320, healAmount: 20, healInterval: 4000, color: '#80d8ff' },
    { id: 'gold_goblin', name: 'Chowaniec Złotnik', desc: 'Zasysanie wszystkich łupów i +30% do zdobywanego złota.', icon: '👺', rarity: 'LEGENDARY', cost: 500, goldMultiplier: 0.30, color: '#ffd700' }
  ],

  // Drzewko Badań
  TECH_TREE: [
    { id: 'steel_forging', name: 'Kucie Stali', branch: 'military', tier: 1, cost: 25, requires: [], desc: 'Zwiększa obrażenia ataku wszystkich bohaterów o +15%.', bonus: { type: 'atk_percent', value: 0.15 }, icon: '🗡️' },
    { id: 'combat_armor', name: 'Rynsztunek Szturmowy', branch: 'military', tier: 2, cost: 60, requires: ['steel_forging'], desc: 'Pancerze zapewniające +20% HP i regenerację 3 HP/s.', bonus: { type: 'hp_regen', hpPercent: 0.20, regen: 3 }, icon: '🛡️' },
    { id: 'steam_cannons', name: 'Działa Parowe', branch: 'military', tier: 3, cost: 130, requires: ['combat_armor'], desc: 'Modyfikacje balistyczne. +15% krytyk i +50% kryt dmg.', bonus: { type: 'crit_bonus', crit: 0.15, critDmg: 0.50 }, icon: '💣' },
    { id: 'colossus_core', name: 'Rdzeń Pradawnego Kolosa', branch: 'military', tier: 4, cost: 260, requires: ['steam_cannons'], desc: 'Odblokowuje Legendarną postać: Żelazny Behemot!', unlockHero: 'behemoth', icon: '🦾' },
    { id: 'mana_spring', name: 'Kondensacja Many', branch: 'magic', tier: 1, cost: 30, requires: [], desc: 'Skraca cooldown umiejętności o 20%.', bonus: { type: 'cooldown_reduction', value: 0.20 }, icon: '🔮' },
    { id: 'lightning_projector', name: 'Projektory Piorunów', branch: 'magic', tier: 2, cost: 80, requires: ['mana_spring'], desc: 'Odblokowuje Epicką postać: Mag Burzy Runów!', unlockHero: 'mage', icon: '⚡' },
    { id: 'gravity_warp', name: 'Manipulacja Grawitacją', branch: 'magic', tier: 3, cost: 150, requires: ['lightning_projector'], desc: 'Zwiększa prędkość poruszania się o 25% oraz daje 15% szansy na unik.', bonus: { type: 'speed_evasion', spd: 0.25, dodge: 0.15 }, icon: '🌀' },
    { id: 'ether_scavenging', name: 'Pozyskiwanie Eteru', branch: 'cosmic', tier: 1, cost: 40, requires: [], desc: 'Zwiększa zdobywane Punkty Nauki o +50% i złoto o +40%.', bonus: { type: 'resource_boost', science: 0.50, gold: 0.40 }, icon: '🧪' },
    { id: 'ancient_matrices', name: 'Starożytne Matryce', branch: 'cosmic', tier: 2, cost: 120, requires: ['ether_scavenging'], desc: 'Tarcza technologiczna pochłaniająca co 15 sekund 100 pkt obrażeń.', bonus: { type: 'periodic_shield', shield: 100 }, icon: '💠' },
    { id: 'cosmic_resonance', name: 'Rezonans Kosmiczny', branch: 'cosmic', tier: 3, cost: 350, requires: ['ancient_matrices', 'gravity_warp', 'colossus_core'], desc: 'Odblokowuje Mityczną postać: Awatar Kosmicznego Ognia!', unlockHero: 'avatar', icon: '🌌' }
  ],

  // Misje
  QUESTS: [
    {
      id: 'q1_forest_clearing',
      title: '1. Oczyszczenie Pradawnego Lasu',
      npc: 'Starszy Osady Cedric',
      dialogStart: 'Witaj, podróżniku! Las na wschodzie opanowały dzikie wilki i leśne gobliny. Pomóż nam go zabezpieczyć, a odnajdziesz uwięzioną łowczynię Lyrę!',
      dialogEnd: 'Niewiarygodne! Uratowałeś Lyrę, a las znów jest bezpieczny. Lyra dołącza do Twojej drużyny!',
      objectives: [
        { type: 'kill_monsters', target: 'wolf', count: 6, current: 0, text: 'Pokonaj Leśne Wilki' },
        { type: 'kill_monsters', target: 'goblin', count: 4, current: 0, text: 'Pokonaj Gobliny' }
      ],
      rewards: { gold: 80, science: 40, unlockHero: 'archer' },
      status: 'available'
    },
    {
      id: 'q2_ancient_cores',
      title: '2. Relikty z Zapomnianych Ruin',
      npc: 'Inżynier Badań Tora',
      dialogStart: 'Aby rozwinąć drzewko technologiczne, potrzebujemy Pradawnych Rdzeni Mocy ukrytych w ruinach na południu!',
      dialogEnd: 'Znakomicie! Możemy badać zaawansowane technologie parowe i energetyczne!',
      objectives: [
        { type: 'collect_items', target: 'power_core', count: 5, current: 0, text: 'Zbierz Rdzenie Mocy w ruinach' },
        { type: 'kill_monsters', target: 'drone', count: 5, current: 0, text: 'Zniszcz Drony Strażnicze' }
      ],
      rewards: { gold: 140, science: 90 },
      requiresQuest: 'q1_forest_clearing',
      status: 'locked'
    },
    {
      id: 'q3_frost_exploration',
      title: '3. Wrota do Mroźnych Pustkowi',
      npc: 'Kupiec Barnaba',
      dialogStart: 'Uruchomiliśmy Runowy Portal. Przejdź do Mroźnych Pustkowi i pokonaj Lodowego Golema!',
      dialogEnd: 'Wspaniale! Twoja odwaga przyniosła naszej osadzie bezcenne surowce północy!',
      objectives: [
        { type: 'kill_monsters', target: 'frost_wolf', count: 5, current: 0, text: 'Pokonaj Lodowe Wilki' },
        { type: 'kill_boss', target: 'frost_titan', count: 1, current: 0, text: 'Zgładź Tytana Mrozu' }
      ],
      rewards: { gold: 260, science: 140 },
      requiresQuest: 'q2_ancient_cores',
      status: 'locked'
    },
    {
      id: 'q4_ruin_boss',
      title: '4. Podziemny Władca Katakumb',
      npc: 'Starszy Osady Cedric',
      dialogStart: 'W podziemnych lochach przebudził się Król Szkieletów! Oczyść katakumby z nieumarłych.',
      dialogEnd: 'Katakumby zostały spacyfikowane! Możemy bezpiecznie eksplorować głębsze poziomy!',
      objectives: [
        { type: 'kill_monsters', target: 'skeleton', count: 8, current: 0, text: 'Pokonaj Szkielety' },
        { type: 'kill_boss', target: 'skeleton_king', count: 1, current: 0, text: 'Pokonaj Króla Szkieletów' }
      ],
      rewards: { gold: 350, science: 200 },
      requiresQuest: 'q3_frost_exploration',
      status: 'locked'
    },
    {
      id: 'q5_mythic_ascension',
      title: '5. Finał: Płonąca Otchłań i Władca Kosmosu',
      npc: 'Mistyczna Wyrocznia',
      dialogStart: 'Jeśli posiadasz technologię Rezonans Kosmiczny i pokonasz Pana Płomieni, zyskasz moc Mitycznego Awatara!',
      dialogEnd: 'Stało się! Wcielenie Ignisa walczy teraz u Twego boku!',
      objectives: [
        { type: 'kill_boss', target: 'flame_lord', count: 1, current: 0, text: 'Zgładź Władcę Płomieni' }
      ],
      rewards: { gold: 600, science: 300, unlockHero: 'avatar' },
      requiresQuest: 'q4_ruin_boss',
      requiresTech: 'cosmic_resonance',
      status: 'locked'
    }
  ],

  // Typy Wrogów
  ENEMIES: {
    wolf: { name: 'Leśny Wilk', hp: 55, atk: 12, spd: 2.9, exp: 20, gold: 8, science: 3, spriteType: 'enemy_wolf', color: '#78909c' },
    goblin: { name: 'Goblin Włócznik', hp: 75, atk: 16, spd: 2.3, exp: 28, gold: 14, science: 5, spriteType: 'enemy_goblin', color: '#4caf50' },
    drone: { name: 'Dron Strażniczy', hp: 110, atk: 22, spd: 2.6, exp: 45, gold: 20, science: 12, isRanged: true, spriteType: 'enemy_drone', color: '#00bcd4' },
    golem_minion: { name: 'Skalny Konstrukt', hp: 190, atk: 30, spd: 1.6, exp: 65, gold: 30, science: 18, spriteType: 'enemy_construct', color: '#8d6e63' },
    ruin_guardian: { name: 'BOSS: Strażnik Ruin', hp: 1400, atk: 55, spd: 1.8, isBoss: true, exp: 400, gold: 250, science: 150, spriteType: 'boss_guardian', color: '#ff9800' },

    frost_wolf: { name: 'Lodowy Wilk', hp: 130, atk: 26, spd: 3.1, exp: 50, gold: 25, science: 14, spriteType: 'enemy_frost_wolf', color: '#80d8ff' },
    frost_golem: { name: 'Golem Zmarzliny', hp: 280, atk: 38, spd: 1.7, exp: 80, gold: 40, science: 22, spriteType: 'enemy_frost_golem', color: '#00b0ff' },
    frost_titan: { name: 'BOSS: Tytan Mrozu', hp: 2200, atk: 68, spd: 2.0, isBoss: true, exp: 600, gold: 380, science: 220, spriteType: 'boss_frost', color: '#00e5ff' },

    skeleton: { name: 'Szkielet Wojownik', hp: 160, atk: 32, spd: 2.5, exp: 55, gold: 28, science: 16, spriteType: 'enemy_skeleton', color: '#cfd8dc' },
    skeleton_mage: { name: 'Nekromanta Kości', hp: 190, atk: 40, spd: 2.2, exp: 75, gold: 35, science: 20, isRanged: true, spriteType: 'enemy_skeleton_mage', color: '#ab47bc' },
    skeleton_king: { name: 'BOSS: Król Szkieletów', hp: 2600, atk: 75, spd: 2.1, isBoss: true, exp: 700, gold: 450, science: 250, spriteType: 'boss_skeleton', color: '#e040fb' },

    fire_elemental: { name: 'Ognisty Bies', hp: 260, atk: 45, spd: 2.7, exp: 90, gold: 45, science: 25, isRanged: true, spriteType: 'enemy_fire', color: '#ff5722' },
    flame_lord: { name: 'BOSS: Władca Płomieni', hp: 3500, atk: 85, spd: 2.3, isBoss: true, exp: 1000, gold: 600, science: 350, spriteType: 'boss_flame', color: '#d50000' }
  }
};
