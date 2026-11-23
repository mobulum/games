// ==========================================
// GRA: CZŁOWIEK PRZEZ EPOKI I KONTYNENTY 3D
// ==========================================

// BAZA DANYCH EPOK
const ERAS = [
    {
        id: 0,
        name: "Epoka Kamienia & Prehistoria",
        icon: "🦴",
        skyColor: 0xffdfba,
        fogColor: 0xd6c2a5,
        groundColor: 0x8b7355,
        weaponName: "Kamienna Maczuga",
        playerColor: 0x8d5524,
        clothingColor: 0xa0522d,
        enemyType: "Dzikie Bestie & Pierwotni",
        enemyColor: 0x5c4033,
        quest: "Zbierz 3 Zwoje Wiedzy i pokonaj pierwotne bestie, by odkryć ogień i narzędzia!",
        requiredPoints: 50,
        rewardText: "Odkryłeś Ogień i Metalurgię! Przechodzisz do Starożytności!"
    },
    {
        id: 1,
        name: "Starożytność (Egipt / Grecja / Rzym)",
        icon: "🏛️",
        skyColor: 0x93c5fd,
        fogColor: 0xbfdbfe,
        groundColor: 0xd4a373,
        weaponName: "Brązowa Włócznia & Gladius",
        playerColor: 0xc68642,
        clothingColor: 0xd97706,
        enemyType: "Gladiatorzy & Nomadzi",
        enemyColor: 0xb91c1c,
        quest: "Opanuj pismo, kamieniarstwo i pokonaj strażników areny, by wznieść pierwsze imperium!",
        requiredPoints: 120,
        rewardText: "Zbudowałeś Akropol i Piramidy! Wkraczasz w Średniowiecze!"
    },
    {
        id: 2,
        name: "Średniowiecze & Rycerstwo",
        icon: "🏰",
        skyColor: 0x94a3b8,
        fogColor: 0x64748b,
        groundColor: 0x2e6f40,
        weaponName: "Stalowy Miecz Dwuręczny",
        playerColor: 0xe0ac69,
        clothingColor: 0x475569, // zbroja
        enemyType: "Zbrojni Najeźdźcy",
        enemyColor: 0x1e293b,
        quest: "Opanuj wytop stali i sztukę obrony zamków przed hordą najeźdźców!",
        requiredPoints: 220,
        rewardText: "Opanowałeś mechanikę i proch strzelniczy! Witamy w Erze Przemysłowej!"
    },
    {
        id: 3,
        name: "Rewolucja Przemysłowa & Wiek Pary",
        icon: "🏭",
        skyColor: 0xa8a29e,
        fogColor: 0x78716c,
        groundColor: 0x44403c,
        weaponName: "Karabin Powtarzalny & Rewolwer",
        playerColor: 0xf1c27d,
        clothingColor: 0x1c1917,
        enemyType: "Mechaniczni Strażnicy Fabryk",
        enemyColor: 0x7c2d12,
        quest: "Uruchom maszyny parowe, zbierz technologie elektryczne i zmechanizuj świat!",
        requiredPoints: 350,
        rewardText: "Wynalazłeś silnik, telegraf i komputery! Witamy w Erze Współczesnej!"
    },
    {
        id: 4,
        name: "Współczesność & Wiek Informacji",
        icon: "🏙️",
        skyColor: 0x7dd3fc,
        fogColor: 0x38bdf8,
        groundColor: 0x334155,
        weaponName: "Taktyczny Karabin Automatyczny",
        playerColor: 0xffdbac,
        clothingColor: 0x0284c7,
        enemyType: "Najemnicy Korporacji",
        enemyColor: 0x0f172a,
        quest: "Zbuduj globalną sieć satelitarną i przygotuj ludzkość do lotu w kosmos!",
        requiredPoints: 500,
        rewardText: "Osiągnąłeś fuzję termojądrową i nanotechnologię! Wkraczasz w Przyszłość Cybernetyczną!"
    },
    {
        id: 5,
        name: "Super Przyszłość Cybernetyczna 3000",
        icon: "🛸",
        skyColor: 0x0f172a,
        fogColor: 0x312e81,
        groundColor: 0x1e1b4b,
        weaponName: "Działo Plazmowe & Ostrze Fotonowe",
        playerColor: 0x67e8f9,
        clothingColor: 0x8b5cf6,
        enemyType: "Zbuntowane Maszyny Bojowe AI",
        enemyColor: 0xec4899,
        quest: "Ocal kolonistów, unicestwij Główny Rdzeń AI i zapewnij nieśmiertelność gatunku ludzkiego!",
        requiredPoints: 750,
        rewardText: "Gratulacje! Doprowadziłeś ludzkość do statusu cywilizacji międzygwiezdnej typu II!"
    }
];

// BAZA DANYCH KONTYNENTÓW
const CONTINENTS = [
    { id: "all", name: "Wszystkie Kraje", icon: "🌐" },
    { id: "europe", name: "Europa", icon: "🏰", groundColor: 0x3b6b3e, treeColor: 0x1b4324 },
    { id: "asia", name: "Azja", icon: "🏯", groundColor: 0x5a7d5a, treeColor: 0x32612d },
    { id: "africa", name: "Afryka", icon: "🌍", groundColor: 0xb58548, treeColor: 0x8da35c },
    { id: "americas", name: "Ameryki", icon: "🌎", groundColor: 0x826644, treeColor: 0x3f5e3f },
    { id: "oceania", name: "Australia i Oceania", icon: "🦘", groundColor: 0x9c4221, treeColor: 0x857c42 },
    { id: "polar_space", name: "Bieguny i Przyszłość", icon: "🌌", groundColor: 0x1b1d36, treeColor: 0x06b6d4 }
];

// BAZA DANYCH KRAJÓW ŚWIATA
const COUNTRIES = [
    // EUROPA
    {
        id: "poland",
        continentId: "europe",
        name: "Polska",
        flag: "🇵🇱",
        capital: "Warszawa / Gniezno / Kraków",
        perk: "+20% Odporności w walce (Husarska tradycja)",
        groundColor: 0x2e6f40,
        treeColor: 0x1b4324,
        buildingType: "castle"
    },
    {
        id: "greece",
        continentId: "europe",
        name: "Grecja",
        flag: "🇬🇷",
        capital: "Ateny / Sparta",
        perk: "+25% Punktów Wiedzy ze Zwojów (Kolebka Filozofii)",
        groundColor: 0x94a3b8,
        treeColor: 0x475569,
        buildingType: "shrine"
    },
    {
        id: "italy",
        continentId: "europe",
        name: "Włochy (Imperium Rzymskie)",
        flag: "🇮🇹",
        capital: "Rzym",
        perk: "+30% Zasięgu i trwałości budowli osady",
        groundColor: 0xa16207,
        treeColor: 0x166534,
        buildingType: "castle"
    },
    {
        id: "uk",
        continentId: "europe",
        name: "Wielka Brytania",
        flag: "🇬🇧",
        capital: "Londyn",
        perk: "Szybszy rozwój w Wieku Przemysłowym",
        groundColor: 0x3f6212,
        treeColor: 0x14532d,
        buildingType: "factory"
    },

    // AFRYKA
    {
        id: "egypt",
        continentId: "africa",
        name: "Egipt",
        flag: "🇪🇬",
        capital: "Kair / Memfis / Teby",
        perk: "Monumentalne Piramidy i starożytna astronomia",
        groundColor: 0xd4a373,
        treeColor: 0xa16207,
        buildingType: "pyramid"
    },
    {
        id: "kenya",
        continentId: "africa",
        name: "Kenia (Wielki Rów Afrykański)",
        flag: "🇰🇪",
        capital: "Nairobi",
        perk: "Kolebka ludzkości i naturalna sawanna",
        groundColor: 0xb58548,
        treeColor: 0x8da35c,
        buildingType: "pyramid"
    },

    // AZJA
    {
        id: "japan",
        continentId: "asia",
        name: "Japonia",
        flag: "🇯🇵",
        capital: "Tokio / Kioto",
        perk: "+20% Szybkości ataku broni białej i technologia robotyczna",
        groundColor: 0x475569,
        treeColor: 0xec4899, // kwiaty wiśni
        buildingType: "pagoda"
    },
    {
        id: "china",
        continentId: "asia",
        name: "Chiny",
        flag: "🇨🇳",
        capital: "Pekin / Chang'an",
        perk: "Wielki Mur, wynalazek prochu i papieru",
        groundColor: 0x5a7d5a,
        treeColor: 0x166534,
        buildingType: "pagoda"
    },

    // AMERYKI
    {
        id: "usa",
        continentId: "americas",
        name: "Stany Zjednoczone",
        flag: "🇺🇸",
        capital: "Waszyngton",
        perk: "Potężny przemysł i drapacze chmur",
        groundColor: 0x826644,
        treeColor: 0x3f5e3f,
        buildingType: "skyscraper"
    },
    {
        id: "brazil",
        continentId: "americas",
        name: "Brazylia (Amazonia)",
        flag: "🇧🇷",
        capital: "Brasília",
        perk: "Bezkresna dżungla i bogactwo natury",
        groundColor: 0x15803d,
        treeColor: 0x052e16,
        buildingType: "totem"
    },

    // OCEANIA
    {
        id: "australia",
        continentId: "oceania",
        name: "Australia",
        flag: "🇦🇺",
        capital: "Canberra / Sydney",
        perk: "Święte monolity piaskowca i fauna outbacku",
        groundColor: 0x9c4221,
        treeColor: 0x857c42,
        buildingType: "monolith"
    },

    // BIEGUNY I PRZYSZŁOŚĆ
    {
        id: "antarctica",
        continentId: "polar_space",
        name: "Antarktyda (Stacja Naukowa)",
        flag: "🇦🇶",
        capital: "Baza Polarna",
        perk: "Podlodowcowe laboratoria i badania ekstremalne",
        groundColor: 0xe2e8f0,
        treeColor: 0x38bdf8,
        buildingType: "polar_station"
    },
    {
        id: "orbital_station",
        continentId: "polar_space",
        name: "Zjednoczone Kolonie Orbitalne",
        flag: "🚀",
        capital: "Stacja Pangea Nova",
        perk: "Kwantowe generatory i megastruktura 3000 roku",
        groundColor: 0x1b1d36,
        treeColor: 0x06b6d4,
        buildingType: "scifi_pylon"
    }
];

// DRZEWKO TECHNOLOGICZNE & CRAFTING (Rozbudowane drzewo z zależnościami 'requires')
const TECHNOLOGIES = [
    // ==========================================
    // EPOKA 0: PREHISTORIA & EPOKA KAMIENIA
    // ==========================================
    // Tier 1 (Podstawy)
    {
        id: "flint_knapping",
        eraId: 0,
        tier: 1,
        requires: [],
        name: "Obróbka Krzemienia",
        icon: "🪨",
        costPoints: 15,
        costMats: 5,
        desc: "Odłupywanie ostrych krawędzi krzemienia do cięcia i skrobania.",
        bonus: "+10 Obrażeń broni kamiennej",
        effect: (s) => { s.bonusDmg += 10; }
    },
    {
        id: "foraging_gathering",
        eraId: 0,
        tier: 1,
        requires: [],
        name: "Zbieractwo & Ziołolecznictwo",
        icon: "🌿",
        costPoints: 15,
        costMats: 5,
        desc: "Rozpoznawanie pożywnych korzeni, jagód oraz roślin tamujących krew.",
        bonus: "+20 Maksymalnego Zdrowia",
        effect: (s) => { s.maxHp += 20; s.hp += 20; }
    },
    // Tier 2 (Wymaga Tier 1)
    {
        id: "taming_fire",
        eraId: 0,
        tier: 2,
        requires: ["flint_knapping"],
        name: "Opanowanie Ognia",
        icon: "🔥",
        costPoints: 30,
        costMats: 10,
        desc: "Krzesanie iskier za pomocą pirytu i krzemienia. Ciepło, ochrona przed drapieżnikami i pieczenie mięsa.",
        bonus: "+25 HP oraz przyspieszona regeneracja energii",
        effect: (s) => { s.maxHp += 25; s.hp += 25; }
    },
    {
        id: "stone_spear",
        eraId: 0,
        tier: 2,
        requires: ["flint_knapping"],
        name: "Włócznia z Krzemiennym Grotem",
        icon: "🗡️",
        costPoints: 35,
        costMats: 12,
        desc: "Przymocowanie ostrego grotu do drewnianego drzewca za pomocą żywicy.",
        bonus: "+1.5 Zasięgu ataku oraz +15 Obrażeń",
        effect: (s) => { s.attackRangeBonus += 1.5; s.bonusDmg += 15; }
    },
    {
        id: "bone_needle",
        eraId: 0,
        tier: 2,
        requires: ["foraging_gathering"],
        name: "Kościana Igła & Szwy",
        icon: "🧵",
        costPoints: 25,
        costMats: 8,
        desc: "Wycinanie igieł z kości mamutów do zszywania skór ścięgnami zwierzęcymi.",
        bonus: "+4 Pancerza ochronnego",
        effect: (s) => { s.armor += 4; }
    },
    // Tier 3 (Zaawansowana Prehistoria)
    {
        id: "stone_axe",
        eraId: 0,
        tier: 3,
        requires: ["stone_spear", "taming_fire"],
        name: "Kamienny Topór Bojowy",
        icon: "🪓",
        costPoints: 45,
        costMats: 15,
        desc: "Gładzony kamień osadzony w rozszczepionym trzonku, związany rzemieniami.",
        bonus: "+25 Obrażeń i +50% zysku surowców",
        effect: (s) => { s.bonusDmg += 25; s.matsMultiplier += 0.5; }
    },
    {
        id: "mammoth_leather",
        eraId: 0,
        tier: 3,
        requires: ["bone_needle", "taming_fire"],
        name: "Opancerzenie ze Skór Mamuta",
        icon: "🥋",
        costPoints: 45,
        costMats: 15,
        desc: "Wielowarstwowa wyprawiona skóra chroniąca przed kłami tygrysów i mrozem.",
        bonus: "+5 Pancerza i +30 Maksymalnego Życia",
        effect: (s) => { s.armor += 5; s.maxHp += 30; s.hp += 30; }
    },
    {
        id: "cave_painting",
        eraId: 0,
        tier: 3,
        requires: ["taming_fire"],
        name: "Malarstwo Jaskiniowe & Symbole",
        icon: "🎨",
        costPoints: 50,
        costMats: 10,
        desc: "Utrwalanie wiedzy o polowaniach na ścianach jaskiń przy użyciu ochry i węgla.",
        bonus: "+50% Zysku punktów wiedzy ze zwojów",
        effect: (s) => { s.pointsMultiplier += 0.5; }
    },

    // ==========================================
    // EPOKA 1: STAROŻYTNOŚĆ (EGIPT / GRECJA / RZYM)
    // ==========================================
    // Tier 1
    {
        id: "copper_smelting",
        eraId: 1,
        tier: 1,
        requires: [],
        name: "Wytop Miedzi",
        icon: "🪨",
        costPoints: 60,
        costMats: 20,
        desc: "Wytapianie pierwszego miękkiego metalu w piecach glinianych.",
        bonus: "+20 Obrażeń broni",
        effect: (s) => { s.bonusDmg += 20; }
    },
    {
        id: "pottery_wheel",
        eraId: 1,
        tier: 1,
        requires: [],
        name: "Koło Garncarskie & Logistyka",
        icon: "🏺",
        costPoints: 55,
        costMats: 15,
        desc: "Obracające się koło umożliwia masowe tworzenie naczyń i magazynowanie zapasów.",
        bonus: "+30% Zysku surowców z budowli",
        effect: (s) => { s.matsMultiplier += 0.3; }
    },
    // Tier 2
    {
        id: "bronze_smelting",
        eraId: 1,
        tier: 2,
        requires: ["copper_smelting"],
        name: "Stop Brązu & Odlewnictwo",
        icon: "🥉",
        costPoints: 85,
        costMats: 25,
        desc: "Rewolucyjny stop miedzi z cyną - twardszy od kamienia, idealny na miecze i pancerze.",
        bonus: "+35 Obrażeń i +5 Pancerza",
        effect: (s) => { s.bonusDmg += 35; s.armor += 5; }
    },
    {
        id: "wheel_chariot",
        eraId: 1,
        tier: 2,
        requires: ["pottery_wheel"],
        name: "Koło ze Szprychami & Rydwany",
        icon: "⚙️",
        costPoints: 80,
        costMats: 25,
        desc: "Lekkie koło szprychowe zwiększa dynamikę wojen i transportu.",
        bonus: "+2.5 do prędkości poruszania się",
        effect: (s) => { s.speedBonus += 2.5; }
    },
    {
        id: "written_script",
        eraId: 1,
        tier: 2,
        requires: ["copper_smelting"],
        name: "Pismo Klinowe & Hieroglify",
        icon: "📜",
        costPoints: 90,
        costMats: 15,
        desc: "Kodyfikacja praw, rachunkowości i wiedzy naukowej.",
        bonus: "+60% Punktów Wiedzy ze wszystkich źródeł",
        effect: (s) => { s.pointsMultiplier += 0.6; }
    },
    // Tier 3
    {
        id: "phalanx_tactics",
        eraId: 1,
        tier: 3,
        requires: ["bronze_smelting"],
        name: "Falanga Hoplitów & Scutum",
        icon: "🛡️",
        costPoints: 110,
        costMats: 35,
        desc: "Zwarty mur z brązowych tarcz i długich saris nie do przełamania.",
        bonus: "+8 Pancerza oraz +50 HP",
        effect: (s) => { s.armor += 8; s.maxHp += 50; s.hp += 50; }
    },
    {
        id: "monumental_architecture",
        eraId: 1,
        tier: 3,
        requires: ["written_script", "wheel_chariot"],
        name: "Architektura Kolumnowa & Kamieniołomy",
        icon: "🏛️",
        costPoints: 120,
        costMats: 40,
        desc: "Precyzyjne ciosanie marmuru, wznoszenie świątyń i piramid.",
        bonus: "+100% Dochodów z budowli osady",
        effect: (s) => { s.matsMultiplier += 0.5; s.pointsMultiplier += 0.3; }
    },

    // ==========================================
    // EPOKA 2: ŚREDNIOWIECZE & RENESANS
    // ==========================================
    // Tier 1
    {
        id: "bloomery_iron",
        eraId: 2,
        tier: 1,
        requires: [],
        name: "Dymarki & Wytop Żelaza",
        icon: "⛏️",
        costPoints: 130,
        costMats: 35,
        desc: "Redukcja rudy darniowej w dymarkach do czystego kowalnego żelaza.",
        bonus: "+30 Obrażeń broni",
        effect: (s) => { s.bonusDmg += 30; }
    },
    {
        id: "crop_rotation",
        eraId: 2,
        tier: 1,
        requires: [],
        name: "Trójpolówka & Pług Koleśny",
        icon: "🌾",
        costPoints: 120,
        costMats: 30,
        desc: "Wydajniejsze rolnictwo podtrzymujące wielkie armie i miasta.",
        bonus: "+60 Maksymalnego Zdrowia",
        effect: (s) => { s.maxHp += 60; s.hp += 60; }
    },
    // Tier 2
    {
        id: "iron_steel",
        eraId: 2,
        tier: 2,
        requires: ["bloomery_iron"],
        name: "Stal Nawęglana & Kowalstwo",
        icon: "⚔️",
        costPoints: 160,
        costMats: 45,
        desc: "Kucie elastycznych i zabójczo ostrych mieczy dwuręcznych oraz szyszaków.",
        bonus: "+45 Obrażeń w walce wręcz",
        effect: (s) => { s.bonusDmg += 45; }
    },
    {
        id: "crossbow_mechanics",
        eraId: 2,
        tier: 2,
        requires: ["bloomery_iron"],
        name: "Mechanizmy Kuszy & Kołowroty",
        icon: "🏹",
        costPoints: 150,
        costMats: 40,
        desc: "Stalowy łuk kuszy miotający bełty z potężną siłą przebicia.",
        bonus: "+2.0 Zasięgu ataku oraz +30 Obrażeń",
        effect: (s) => { s.attackRangeBonus += 2.0; s.bonusDmg += 30; }
    },
    {
        id: "plate_armor",
        eraId: 2,
        tier: 2,
        requires: ["bloomery_iron", "crop_rotation"],
        name: "Pełna Zbroja Płytowa",
        icon: "🛡️",
        costPoints: 170,
        costMats: 50,
        desc: "Profilowane płyty stalowe chroniące rycerza przed bełtami i cięciami.",
        bonus: "+12 Pancerza redukującego obrażenia",
        effect: (s) => { s.armor += 12; }
    },
    // Tier 3
    {
        id: "printing_press",
        eraId: 2,
        tier: 3,
        requires: ["iron_steel"],
        name: "Ruchoma Czcionka Gutenberga",
        icon: "📖",
        costPoints: 200,
        costMats: 40,
        desc: "Masowy druk ksiąg renesansowych i eksplozja myśli naukowej.",
        bonus: "+80% Punktów Wiedzy ze wszystkich źródeł",
        effect: (s) => { s.pointsMultiplier += 0.8; }
    },
    {
        id: "early_gunpowder",
        eraId: 2,
        tier: 3,
        requires: ["crossbow_mechanics", "iron_steel"],
        name: "Czarny Proch & Arkebuzy",
        icon: "💣",
        costPoints: 210,
        costMats: 50,
        desc: "Mieszanina saletry, siarki i węgla - pierwsze hakownice i bombardy.",
        bonus: "+60 Obrażeń dystansowych",
        effect: (s) => { s.bonusDmg += 60; }
    },

    // ==========================================
    // EPOKA 3: WIEK PRZEMYSŁU & WIEK PARY
    // ==========================================
    // Tier 1
    {
        id: "coke_smelting",
        eraId: 3,
        tier: 1,
        requires: [],
        name: "Wytop Koksem & Masowa Stal",
        icon: "🏭",
        costPoints: 220,
        costMats: 50,
        desc: "Węgiel koksowy zastępuje drewno, umożliwiając gigantyczne huty stali.",
        bonus: "+50 Obrażeń i +8 Pancerza",
        effect: (s) => { s.bonusDmg += 50; s.armor += 8; }
    },
    {
        id: "textile_loom",
        eraId: 3,
        tier: 1,
        requires: [],
        name: "Mechaniczne Krosno Tkackie",
        icon: "🧶",
        costPoints: 200,
        costMats: 45,
        desc: "Zmechanizowana produkcja tkanin i uniformów dla robotników.",
        bonus: "+80 Maksymalnego Zdrowia",
        effect: (s) => { s.maxHp += 80; s.hp += 80; }
    },
    // Tier 2
    {
        id: "steam_engine",
        eraId: 3,
        tier: 2,
        requires: ["coke_smelting"],
        name: "Maszyna Parowa Jamesa Watta",
        icon: "🚂",
        costPoints: 260,
        costMats: 60,
        desc: "Ciągły ruch obrotowy z pary wodnej napędza lokomotywy i pompy kopalniane.",
        bonus: "+3.5 Prędkości biegu i podwojenie zysku surowców",
        effect: (s) => { s.speedBonus += 3.5; s.matsMultiplier += 1.0; }
    },
    {
        id: "gunpowder_rifling",
        eraId: 3,
        tier: 2,
        requires: ["coke_smelting"],
        name: "Gwintowana Lufa & Nabój Scalony",
        icon: "💥",
        costPoints: 270,
        costMats: 55,
        desc: "Rotacja pocisku w lufie zapewnia zabójczy zasięg i precyzję karabinów powtarzalnych.",
        bonus: "+75 Obrażeń i +3.0 Zasięgu ataku",
        effect: (s) => { s.bonusDmg += 75; s.attackRangeBonus += 3.0; }
    },
    {
        id: "telegraph_wires",
        eraId: 3,
        tier: 2,
        requires: ["coke_smelting", "textile_loom"],
        name: "Telegraf Elektryczny Morse'a",
        icon: "⚡",
        costPoints: 250,
        costMats: 50,
        desc: "Błyskawiczne przesyłanie depesz kablami transatlantyckimi.",
        bonus: "+90% Przyrostu Punktów Wiedzy",
        effect: (s) => { s.pointsMultiplier += 0.9; }
    },
    // Tier 3
    {
        id: "dynamo_generator",
        eraId: 3,
        tier: 3,
        requires: ["steam_engine", "telegraph_wires"],
        name: "Prądnica & Elektryfikacja",
        icon: "💡",
        costPoints: 310,
        costMats: 70,
        desc: "Indukcja elektromagnetyczna Faradaya - narodziny sieci elektrycznej.",
        bonus: "+100 HP, +50 Obrażeń oraz pasywne leczenie",
        effect: (s) => { s.maxHp += 100; s.hp += 100; s.bonusDmg += 50; }
    },

    // ==========================================
    // EPOKA 4: WSPÓŁCZESNOŚĆ & WIEK INFORMACJI
    // ==========================================
    // Tier 1
    {
        id: "combustion_engine",
        eraId: 4,
        tier: 1,
        requires: [],
        name: "Silnik Spalinowy & Rafinacja Ropy",
        icon: "⛽",
        costPoints: 320,
        costMats: 70,
        desc: "Paliwa płynne napędzające pojazdy opancerzone i lotnictwo.",
        bonus: "+4.0 Prędkości poruszania się",
        effect: (s) => { s.speedBonus += 4.0; }
    },
    {
        id: "penicillin_antibiotics",
        eraId: 4,
        tier: 1,
        requires: [],
        name: "Antybiotyki & Chirurgia Polowa",
        icon: "💉",
        costPoints: 330,
        costMats: 60,
        desc: "Penicylina eliminuje infekcje bakteryjne, drastycznie podnosząc przeżywalność.",
        bonus: "+120 Maksymalnego Zdrowia",
        effect: (s) => { s.maxHp += 120; s.hp += 120; }
    },
    // Tier 2
    {
        id: "microprocessor",
        eraId: 4,
        tier: 2,
        requires: ["combustion_engine"],
        name: "Krzemowy Mikroprocesor & Komputery",
        icon: "💻",
        costPoints: 380,
        costMats: 80,
        desc: "Miliony tranzystorów na płytce krzemu - obliczenia cyfrowe i automatyka.",
        bonus: "+120% Zysku punktów wiedzy",
        effect: (s) => { s.pointsMultiplier += 1.2; }
    },
    {
        id: "kevlar_armor",
        eraId: 4,
        tier: 2,
        requires: ["combustion_engine", "penicillin_antibiotics"],
        name: "Włókna Aramidowe & Kevlar",
        icon: "🛡️",
        costPoints: 370,
        costMats: 75,
        desc: "Syntetyczne włókna o wytrzymałości przewyższającej stal - kamizelki balistyczne.",
        bonus: "+18 Pancerza ochronnego",
        effect: (s) => { s.armor += 18; }
    },
    {
        id: "radar_gps",
        eraId: 4,
        tier: 2,
        requires: ["combustion_engine"],
        name: "Radar & Nawigacja Satelitarna GPS",
        icon: "📡",
        costPoints: 390,
        costMats: 80,
        desc: "Globalna konstelacja satelitów podglądająca cały teatr działań.",
        bonus: "+4.0 Zasięgu ataku broni palnej",
        effect: (s) => { s.attackRangeBonus += 4.0; }
    },
    // Tier 3
    {
        id: "nuclear_energy",
        eraId: 4,
        tier: 3,
        requires: ["microprocessor", "radar_gps"],
        name: "Energia Jądrowa & Reaktor Rozszczepialny",
        icon: "☢️",
        costPoints: 460,
        costMats: 95,
        desc: "Rozszczepienie jąder uranu uwalnia niewyobrażalną potęgę atomu.",
        bonus: "+110 Obrażeń i +150 HP",
        effect: (s) => { s.bonusDmg += 110; s.maxHp += 150; s.hp += 150; }
    },

    // ==========================================
    // EPOKA 5: SUPER PRZYSZŁOŚĆ CYBERNETYCZNA 3000
    // ==========================================
    // Tier 1
    {
        id: "neural_interface",
        eraId: 5,
        tier: 1,
        requires: [],
        name: "Interfejs Mózg-Maszyna & Cyberwszepki",
        icon: "🧠",
        costPoints: 480,
        costMats: 90,
        desc: "Bezpośrednie połączenie synaps z procesorami kwantowymi.",
        bonus: "+5.0 Prędkości i natychmiastowa reakcja bojowa",
        effect: (s) => { s.speedBonus += 5.0; }
    },
    {
        id: "nanite_repair",
        eraId: 5,
        tier: 1,
        requires: [],
        name: "Nanoroboty Medyczne Samonaprawcze",
        icon: "🤖",
        costPoints: 500,
        costMats: 100,
        desc: "Mikroskopijne roje rekonstruujące uszkodzone komórki w czasie rzeczywistym.",
        bonus: "+200 Maksymalnego Zdrowia i stała autoregeneracja",
        effect: (s) => { s.maxHp += 200; s.hp = s.maxHp; }
    },
    // Tier 2
    {
        id: "plasma_containment",
        eraId: 5,
        tier: 2,
        requires: ["neural_interface"],
        name: "Pułapka Magnetyczna Plazmy",
        icon: "⚡",
        costPoints: 560,
        costMats: 110,
        desc: "Pole magnetyczne ściskające zjonizowany gaz do temperatury milionów kelwinów.",
        bonus: "+140 Obrażeń czystą energią plazmową",
        effect: (s) => { s.bonusDmg += 140; }
    },
    {
        id: "forcefield_shields",
        eraId: 5,
        tier: 2,
        requires: ["nanite_repair", "neural_interface"],
        name: "Tarcza Energetyczna Fotonowa",
        icon: "🔮",
        costPoints: 570,
        costMats: 115,
        desc: "Kwantowa bariera pochłaniająca uderzenia kinetyczne i wiązki cząstek.",
        bonus: "+25 Pancerza ochronnego",
        effect: (s) => { s.armor += 25; }
    },
    // Tier 3
    {
        id: "quantum_core",
        eraId: 5,
        tier: 3,
        requires: ["plasma_containment", "forcefield_shields"],
        name: "Reaktor Kwantowej Antymaterii",
        icon: "⚛️",
        costPoints: 650,
        costMats: 130,
        desc: "Anihilacja materii i antymaterii - nieograniczona moc gwiezdna.",
        bonus: "+200 Obrażeń, +250 HP i maksymalny skok technologiczny",
        effect: (s) => { s.bonusDmg += 200; s.maxHp += 250; s.hp += 250; }
    },
    {
        id: "antigrav_singularity",
        eraId: 5,
        tier: 3,
        requires: ["quantum_core"],
        name: "Silnik Osobliwości Grawitacyjnej",
        icon: "🌌",
        costPoints: 800,
        costMats: 160,
        desc: "Zakrzywianie czasoprzestrzeni do lotów międzygwiezdnych - status cywilizacji kosmicznej.",
        bonus: "+300% Mnożnik Wiedzy i potrójna siła",
        effect: (s) => { s.pointsMultiplier += 2.0; s.bonusDmg += 100; }
    }
];

// GŁÓWNY STAN GRY
let state = {
    currentEraIndex: 0,
    currentContinentId: "europe",
    currentCountryId: "poland",
    score: 0,
    points: 0,
    materials: 0,
    enemiesKilled: 0,
    hp: 100,
    maxHp: 100,
    energy: 100,
    isAttacking: false,
    audioEnabled: true,
    unlockedTechs: [],
    // Bonusy z drzewka technologicznego
    bonusDmg: 0,
    armor: 0,
    speedBonus: 0,
    matsMultiplier: 1.0,
    pointsMultiplier: 1.0,
    attackRangeBonus: 0,
    builtStructures: []
};

// STRUKTURY BUDOWLANE DO POSTAWIENIA W OSADZIE (zależne od epoki)
const BUILDINGS = [
    {
        id: "shelter_tent",
        eraId: 0,
        name: "Szałas ze Skór & Ognisko",
        icon: "⛺",
        costPoints: 15,
        costMats: 10,
        bonusPts: 25,
        bonusMats: 15,
        passivePts: 1,
        passiveMats: 1,
        healRate: 8,
        desc: "Pierwotne schronienie: daje natychmiast +25 Wiedzy, +15 Surowców oraz pasywnie leczy i generuje surowce!",
        color: 0x854d0e,
        type: "tent"
    },
    {
        id: "totem_spirit",
        eraId: 0,
        name: "Totem Duchów & Kości Mamuta",
        icon: "🗿",
        costPoints: 25,
        costMats: 15,
        bonusPts: 45,
        bonusMats: 20,
        passivePts: 2,
        passiveMats: 1,
        healRate: 3,
        desc: "Święty totem: daje natychmiast +45 Wiedzy, +20 Surowców i stale generuje +2 Wiedzy co 3s.",
        color: 0xd97706,
        type: "totem"
    },
    {
        id: "ancient_shrine",
        eraId: 1,
        name: "Antyczna Świątynia z Kolumnami",
        icon: "🏛️",
        costPoints: 50,
        costMats: 30,
        bonusPts: 90,
        bonusMats: 45,
        passivePts: 4,
        passiveMats: 2,
        healRate: 5,
        desc: "Monument filozofii: daje od razu +90 Wiedzy i stale generuje wiedzę oraz surowce!",
        color: 0xe2e8f0,
        type: "shrine"
    },
    {
        id: "stone_watchtower",
        eraId: 2,
        name: "Kamienna Baszta Strażnicza",
        icon: "🏰",
        costPoints: 80,
        costMats: 45,
        bonusPts: 140,
        bonusMats: 60,
        passivePts: 6,
        passiveMats: 4,
        healRate: 6,
        desc: "Średniowieczna baszta: daje natychmiast +140 Wiedzy, +60 Surowców oraz stały dochód obronny!",
        color: 0x64748b,
        type: "watchtower"
    },
    {
        id: "steam_workshop",
        eraId: 3,
        name: "Warsztat Parowy & Piec Hutniczy",
        icon: "🏭",
        costPoints: 120,
        costMats: 60,
        bonusPts: 220,
        bonusMats: 100,
        passivePts: 10,
        passiveMats: 8,
        healRate: 0,
        desc: "Zmechanizowana fabryka: daje natychmiast +220 Wiedzy i automatycznie produkuje masę surowców!",
        color: 0x475569,
        type: "factory"
    },
    {
        id: "solar_matrix",
        eraId: 4,
        name: "Stacja Łączności Satelitarnej",
        icon: "📡",
        costPoints: 180,
        costMats: 80,
        bonusPts: 320,
        bonusMats: 140,
        passivePts: 16,
        passiveMats: 10,
        healRate: 8,
        desc: "Węzeł informacyjny XXIw: natychmiastowy potężny skok wiedzy (+320) i pasywny transfer danych!",
        color: 0x0284c7,
        type: "radar"
    },
    {
        id: "antigrav_shield",
        eraId: 5,
        name: "Generator Tarczy Antygrawitacyjnej",
        icon: "🔮",
        costPoints: 250,
        costMats: 120,
        bonusPts: 500,
        bonusMats: 200,
        passivePts: 25,
        passiveMats: 18,
        healRate: 15,
        desc: "Kwantowa tarcza: daje natychmiast +500 Wiedzy oraz maksymalne pole regeneracji i zasilania!",
        color: 0xa855f7,
        type: "shield_gen"
    }
];

// ZMIENNE THREE.JS
let scene, camera, renderer;
let playerMesh, playerWeaponMesh;
let terrainMesh;
let worldObjects = [];
let enemies = [];
let fauna = []; // Mamuty, Tygrysy szablozębne, jelenie
let currentBoss = null;
let placedStructures = [];
let pickups = [];
let clock = new THREE.Clock();

// STEROWANIE I KAMERA (OBRÓT POSTACI I WIDOKU)
const keys = {
    KeyW: false, KeyS: false, KeyA: false, KeyD: false,
    Space: false, ShiftLeft: false, KeyF: false, KeyE: false, KeyQ: false,
    ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false
};
let mouse = { x: 0, y: 0 };
let isRightMouseDown = false;
let cameraYaw = 0;   // Kąt obrotu w poziomie (lewo-prawo)
let cameraPitch = 0.35; // Kąt pochylenia kamery w pionie
let cameraDistance = 11.0;
let playerVelocity = new THREE.Vector3();
let isGrounded = true;

// SYSTEM DŹWIĘKÓW PROCESOWYCH (Web Audio API)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(type) {
    if (!state.audioEnabled || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const t = audioCtx.currentTime;

        if (type === 'hit') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, t);
            osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.15);
            osc.start(t);
            osc.stop(t + 0.15);
        } else if (type === 'slash') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, t);
            osc.frequency.exponentialRampToValueAtTime(100, t + 0.12);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.12);
            osc.start(t);
            osc.stop(t + 0.12);
        } else if (type === 'shoot') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.exponentialRampToValueAtTime(80, t + 0.1);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.1);
            osc.start(t);
            osc.stop(t + 0.1);
        } else if (type === 'laser') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(900, t);
            osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.2);
            osc.start(t);
            osc.stop(t + 0.2);
        } else if (type === 'pickup') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, t); // C5
            osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
            osc.frequency.setValueAtTime(783.99, t + 0.16); // G5
            gain.gain.setValueAtTime(0.25, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.3);
            osc.start(t);
            osc.stop(t + 0.3);
        } else if (type === 'era') {
            // Fanfara awansu ery
            [440, 554.37, 659.25, 880].forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.frequency.setValueAtTime(freq, t + i * 0.12);
                subGain.gain.setValueAtTime(0.3, t + i * 0.12);
                subGain.gain.linearRampToValueAtTime(0.01, t + i * 0.12 + 0.4);
                subOsc.start(t + i * 0.12);
                subOsc.stop(t + i * 0.12 + 0.45);
            });
        }
    } catch(e) {
        console.warn("Audio err:", e);
    }
}

// INICJALIZACJA GRY THREE.JS
function init3D() {
    const container = document.getElementById('game-container');
    
    // Scena
    scene = new THREE.Scene();
    const currentEra = ERAS[state.currentEraIndex];
    scene.background = new THREE.Color(currentEra.skyColor);
    scene.fog = new THREE.FogExp2(currentEra.fogColor, 0.015);

    // Kamera
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Oświetlenie
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 0.85);
    dirLight.position.set(40, 70, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 200;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Budowa świata i postaci
    buildPlayer();
    buildWorld();

    // Event listenery
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onMouseWheel, { passive: false });
    window.addEventListener('contextmenu', (e) => e.preventDefault()); // Blokada menu kontekstowego, aby PPM obracał kamerą

    setupUI();
    animate();
}

// TWORZENIE POSTACI GRACZA (Dostosowywanej do Epoki)
function buildPlayer() {
    if (playerMesh) scene.remove(playerMesh);

    const era = ERAS[state.currentEraIndex];
    const group = new THREE.Group();

    // Ciało / Tułów
    const bodyGeo = new THREE.CylinderGeometry(0.45, 0.35, 1.2, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ 
        color: era.clothingColor, 
        roughness: 0.7, 
        metalness: state.currentEraIndex >= 3 ? 0.3 : 0.0 
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    group.add(body);

    // Głowa
    const headGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const headMat = new THREE.MeshStandardMaterial({ color: era.playerColor, roughness: 0.8 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.05;
    head.castShadow = true;
    group.add(head);

    // Hełm / Nakrycie głowy zależnie od epoki
    if (state.currentEraIndex === 1) { // Starożytność: hełm z pióropuszem
        const helmGeo = new THREE.CylinderGeometry(0.38, 0.4, 0.3, 8);
        const helmMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 });
        const helm = new THREE.Mesh(helmGeo, helmMat);
        helm.position.y = 2.25;
        group.add(helm);
    } else if (state.currentEraIndex === 2) { // Średniowiecze: stalowy szyszak
        const helmGeo = new THREE.ConeGeometry(0.42, 0.6, 8);
        const helmMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
        const helm = new THREE.Mesh(helmGeo, helmMat);
        helm.position.y = 2.4;
        group.add(helm);
    } else if (state.currentEraIndex === 5) { // Cyberpunk: Wizjer neonowy
        const visorGeo = new THREE.BoxGeometry(0.45, 0.15, 0.25);
        const visorMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.8 });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(0, 2.05, 0.25);
        group.add(visor);
    }

    // Nogi
    const legGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.8, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(-0.22, 0.4, 0);
    legL.castShadow = true;
    group.add(legL);

    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(0.22, 0.4, 0);
    legR.castShadow = true;
    group.add(legR);

    // Ręka trzymająca broń
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.7, 6);
    const armMat = new THREE.MeshStandardMaterial({ color: era.playerColor });
    const armR = new THREE.Mesh(armGeo, armMat);
    armR.position.set(0.55, 1.25, 0.2);
    armR.rotation.x = Math.PI / 4;
    group.add(armR);

    // Broń w ręku
    buildPlayerWeapon(group);

    group.position.set(0, 0, 0);
    scene.add(group);
    playerMesh = group;
}

// TWORZENIE MODELU BRONI ZALEŻNIE OD EPOKI
function buildPlayerWeapon(parentGroup) {
    if (playerWeaponMesh) parentGroup.remove(playerWeaponMesh);

    const eraIndex = state.currentEraIndex;
    const weaponGroup = new THREE.Group();

    if (eraIndex === 0) {
        // Maczuga z kamienia
        const stickGeo = new THREE.CylinderGeometry(0.06, 0.04, 0.8, 6);
        const stickMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
        const stick = new THREE.Mesh(stickGeo, stickMat);
        stick.position.set(0, 0.3, 0);

        const headGeo = new THREE.DodecahedronGeometry(0.18);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9 });
        const stoneHead = new THREE.Mesh(headGeo, headMat);
        stoneHead.position.set(0, 0.7, 0);

        weaponGroup.add(stick, stoneHead);
    } else if (eraIndex === 1) {
        // Włócznia grecka / rzymska
        const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6);
        const shaftMat = new THREE.MeshStandardMaterial({ color: 0x854d0e });
        const shaft = new THREE.Mesh(shaftGeo, shaftMat);
        shaft.position.set(0, 0.5, 0);

        const tipGeo = new THREE.ConeGeometry(0.1, 0.35, 4);
        const tipMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 });
        const tip = new THREE.Mesh(tipGeo, tipMat);
        tip.position.set(0, 1.4, 0);

        weaponGroup.add(shaft, tip);
    } else if (eraIndex === 2) {
        // Stalowy Miecz
        const bladeGeo = new THREE.BoxGeometry(0.12, 1.2, 0.03);
        const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0.6, 0);

        const guardGeo = new THREE.BoxGeometry(0.4, 0.06, 0.06);
        const guardMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 });
        const guard = new THREE.Mesh(guardGeo, guardMat);
        guard.position.set(0, 0.05, 0);

        weaponGroup.add(blade, guard);
    } else if (eraIndex === 3) {
        // Strzelba powtarzalna XIXw
        const stockGeo = new THREE.BoxGeometry(0.1, 0.6, 0.15);
        const stockMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
        const barrelGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 6);
        const barrelMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, metalness: 0.9 });
        const stock = new THREE.Mesh(stockGeo, stockMat);
        const barrel = new THREE.Mesh(barrelGeo, barrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.2, 0.4);
        weaponGroup.add(stock, barrel);
    } else if (eraIndex === 4) {
        // Współczesny Karabin
        const rifleGeo = new THREE.BoxGeometry(0.12, 0.3, 0.9);
        const rifleMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
        const rifle = new THREE.Mesh(rifleGeo, rifleMat);
        rifle.position.set(0, 0.2, 0.3);
        weaponGroup.add(rifle);
    } else {
        // Przyszłość: Ostrze Plazmowe
        const hiltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8);
        const hiltMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
        const hilt = new THREE.Mesh(hiltGeo, hiltMat);

        const plasmaGeo = new THREE.CylinderGeometry(0.08, 0.04, 1.4, 8);
        const plasmaMat = new THREE.MeshStandardMaterial({ 
            color: 0x06b6d4, 
            emissive: 0x06b6d4, 
            emissiveIntensity: 1.2 
        });
        const plasma = new THREE.Mesh(plasmaGeo, plasmaMat);
        plasma.position.set(0, 0.8, 0);

        weaponGroup.add(hilt, plasma);
    }

    weaponGroup.position.set(0.65, 1.3, 0.4);
    weaponGroup.rotation.x = Math.PI / 3;
    parentGroup.add(weaponGroup);
    playerWeaponMesh = weaponGroup;
}

// GENERACJA ŚWIATA I BIOUMU DLA KONTYNENTU I EPOKI
function buildWorld() {
    // Czyszczenie starych obiektów
    worldObjects.forEach(obj => scene.remove(obj));
    worldObjects = [];
    enemies.forEach(e => scene.remove(e.mesh));
    enemies = [];
    pickups.forEach(p => scene.remove(p.mesh));
    pickups = [];
    if (terrainMesh) scene.remove(terrainMesh);

    const era = ERAS[state.currentEraIndex];
    const country = COUNTRIES.find(c => c.id === state.currentCountryId) || COUNTRIES[0];

    // Kolory sceny i mgły
    scene.background = new THREE.Color(era.skyColor);
    scene.fog = new THREE.FogExp2(era.fogColor, 0.015);

    // Teren
    const groundGeo = new THREE.PlaneGeometry(350, 350, 40, 40);
    // Dodanie lekkich wzgórz
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const distFromCenter = Math.sqrt(vx*vx + vy*vy);
        if (distFromCenter > 15) {
            pos.setZ(i, Math.sin(vx * 0.05) * Math.cos(vy * 0.05) * 3);
        }
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({ 
        color: country.groundColor, 
        roughness: 0.9,
        flatShading: true
    });
    terrainMesh = new THREE.Mesh(groundGeo, groundMat);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // Drzewa / Roślinność zależna od kraju
    for (let i = 0; i < 40; i++) {
        const x = (Math.random() - 0.5) * 260;
        const z = (Math.random() - 0.5) * 260;
        if (Math.abs(x) < 15 && Math.abs(z) < 15) continue; // wolne centrum

        const treeGroup = createBiomeFlora(country);
        treeGroup.position.set(x, 0, z);
        scene.add(treeGroup);
        worldObjects.push(treeGroup);
    }

    // Budowle Specjalne / Architektura danego kraju i ery
    for (let i = 0; i < 6; i++) {
        const x = (Math.random() - 0.5) * 220;
        const z = (Math.random() - 0.5) * 220;
        if (Math.abs(x) < 25 && Math.abs(z) < 25) continue;

        const monument = createMonument(country.buildingType, era);
        monument.position.set(x, 0, z);
        scene.add(monument);
        worldObjects.push(monument);
    }

    // Zwoje Wiedzy / Artefakty Ewolucji do zbierania
    spawnPickups();

    // Spawnowanie Wrogów Epoki
    spawnEnemies();
}

// GENEROWANIE ROŚLINNOŚCI
function createBiomeFlora(continent) {
    const group = new THREE.Group();
    if (continent.id === 'orbital') {
        // Futurystyczne filary świetlne
        const geo = new THREE.CylinderGeometry(0.3, 0.6, 6, 6);
        const mat = new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x06b6d4, emissiveIntensity: 0.6 });
        const pylon = new THREE.Mesh(geo, mat);
        pylon.position.y = 3;
        group.add(pylon);
        return group;
    }

    // Pień
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.5;
    trunk.castShadow = true;
    group.add(trunk);

    // Korona
    const crownGeo = continent.id === 'africa' 
        ? new THREE.CylinderGeometry(3.5, 0.5, 1.2, 7) // Akacja sawannowa
        : new THREE.ConeGeometry(2.5, 4.5, 6);        // Klasyczne drzewo iglaste/liściaste
    const crownMat = new THREE.MeshStandardMaterial({ color: continent.treeColor, roughness: 0.8 });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.y = continent.id === 'africa' ? 3.4 : 4;
    crown.castShadow = true;
    group.add(crown);

    const scale = 0.7 + Math.random() * 0.7;
    group.scale.set(scale, scale, scale);
    return group;
}

// GENEROWANIE BUDOWLI / ZABYTKÓW
function createMonument(type, era) {
    const group = new THREE.Group();

    if (type === 'pyramid') {
        // Piramida schodkowa
        for (let i = 0; i < 4; i++) {
            const size = 12 - i * 2.8;
            const geo = new THREE.BoxGeometry(size, 2.5, size);
            const mat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.9 });
            const step = new THREE.Mesh(geo, mat);
            step.position.y = 1.25 + i * 2.5;
            step.castShadow = true;
            step.receiveShadow = true;
            group.add(step);
        }
    } else if (type === 'castle') {
        // Wieża zamkowa z blankami
        const towerGeo = new THREE.CylinderGeometry(3, 3.4, 12, 10);
        const towerMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.y = 6;
        tower.castShadow = true;
        group.add(tower);

        const roofGeo = new THREE.ConeGeometry(3.5, 4, 10);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x991b1b });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 14;
        roof.castShadow = true;
        group.add(roof);
    } else if (type === 'pagoda') {
        // Pagoda azjatycka
        for (let i = 0; i < 3; i++) {
            const floorGeo = new THREE.BoxGeometry(6 - i * 1.2, 2.5, 6 - i * 1.2);
            const floorMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c });
            const floor = new THREE.Mesh(floorGeo, floorMat);
            floor.position.y = 1.25 + i * 3.5;

            const roofGeo = new THREE.ConeGeometry(6 - i * 1.0, 1.2, 4);
            const roofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
            const roof = new THREE.Mesh(roofGeo, roofMat);
            roof.position.y = 3.1 + i * 3.5;
            roof.rotation.y = Math.PI / 4;

            group.add(floor, roof);
        }
    } else if (type === 'skyscraper') {
        // Drapacz chmur ery przemysłowej/nowoczesnej
        const height = 18 + Math.random() * 10;
        const bldGeo = new THREE.BoxGeometry(7, height, 7);
        const bldMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.2 });
        const bld = new THREE.Mesh(bldGeo, bldMat);
        bld.position.y = height / 2;
        bld.castShadow = true;
        group.add(bld);
    } else if (type === 'monolith') {
        // Święty Monolit / Uluru w Australii
        const monoGeo = new THREE.DodecahedronGeometry(8, 1);
        const monoMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.95 });
        const mono = new THREE.Mesh(monoGeo, monoMat);
        mono.scale.set(2, 0.9, 1.4);
        mono.position.y = 5;
        mono.castShadow = true;
        group.add(mono);
    } else if (type === 'polar_station') {
        // Kopułowa Stacja Badawcza na Antarktydzie
        const domeGeo = new THREE.SphereGeometry(6, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.3 });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.y = 0;
        dome.castShadow = true;

        const commGeo = new THREE.CylinderGeometry(0.1, 0.1, 8);
        const commMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const antenna = new THREE.Mesh(commGeo, commMat);
        antenna.position.set(0, 8, 0);

        group.add(dome, antenna);
    } else {
        // Kosmiczny Pylon Sci-Fi
        const pylonGeo = new THREE.OctahedronGeometry(4, 0);
        const pylonMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: true });
        const pylon = new THREE.Mesh(pylonGeo, pylonMat);
        pylon.position.y = 8;

        const baseGeo = new THREE.CylinderGeometry(2, 3, 5, 8);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, metalness: 0.8 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 2.5;

        group.add(pylon, base);
    }

    return group;
}

// SPAWN PODNOSZONYCH ARTEFAKTÓW WIEDZY
function spawnPickups() {
    pickups.forEach(p => scene.remove(p.mesh));
    pickups = [];

    const pickupCount = 12;
    for (let i = 0; i < pickupCount; i++) {
        const x = (Math.random() - 0.5) * 220;
        const z = (Math.random() - 0.5) * 220;

        const geo = new THREE.OctahedronGeometry(0.5);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0xf59e0b, 
            emissive: 0xf59e0b, 
            emissiveIntensity: 0.6,
            roughness: 0.2 
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 1.2, z);
        scene.add(mesh);

        pickups.push({ mesh, baseY: 1.2, rotationSpeed: 1.5 + Math.random() });
    }
}

// SPAWN PRZECIWNIKÓW, FAUNY (MAMUTY/TYGRYSY) ORAZ BOSSA EPOKI
function spawnEnemies() {
    enemies.forEach(e => scene.remove(e.mesh));
    enemies = [];
    fauna.forEach(f => scene.remove(f.mesh));
    fauna = [];
    if (currentBoss && currentBoss.mesh) {
        scene.remove(currentBoss.mesh);
        currentBoss = null;
        document.getElementById('boss-hud-bar').classList.add('hidden');
    }

    const era = ERAS[state.currentEraIndex];
    const enemyCount = 6 + state.currentEraIndex * 2;

    // Przeciwnicy standardowi
    for (let i = 0; i < enemyCount; i++) {
        const x = (Math.random() - 0.5) * 240;
        const z = (Math.random() - 0.5) * 240;
        if (Math.abs(x) < 20 && Math.abs(z) < 20) continue;

        const enemyGroup = new THREE.Group();

        // Model wroga
        const geo = new THREE.BoxGeometry(0.9, 1.6, 0.9);
        const mat = new THREE.MeshStandardMaterial({ color: era.enemyColor, roughness: 0.5 });
        const body = new THREE.Mesh(geo, mat);
        body.position.y = 0.8;
        body.castShadow = true;
        enemyGroup.add(body);

        // Oczy / Celownik
        const eyeGeo = new THREE.SphereGeometry(0.12, 6, 6);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const eye1 = new THREE.Mesh(eyeGeo, eyeMat);
        eye1.position.set(-0.2, 1.2, 0.45);
        const eye2 = new THREE.Mesh(eyeGeo, eyeMat);
        eye2.position.set(0.2, 1.2, 0.45);
        enemyGroup.add(eye1, eye2);

        enemyGroup.position.set(x, 0, z);
        scene.add(enemyGroup);

        enemies.push({
            mesh: enemyGroup,
            hp: 30 + state.currentEraIndex * 20,
            maxHp: 30 + state.currentEraIndex * 20,
            speed: 3.5 + Math.random() * 2,
            attackCooldown: 0
        });
    }

    // Specjalna fauna w Epoce Kamienia / Prehistorii (Mamuty i Tygrysy Szablozębne)
    if (state.currentEraIndex === 0) {
        // Spawnowanie Mamutów
        for (let i = 0; i < 4; i++) {
            const mx = (Math.random() - 0.5) * 200;
            const mz = (Math.random() - 0.5) * 200;
            if (Math.abs(mx) < 25 && Math.abs(mz) < 25) continue;
            const mammoth = createMammothMesh();
            mammoth.position.set(mx, 0, mz);
            scene.add(mammoth);
            fauna.push({
                mesh: mammoth,
                type: "mammoth",
                hp: 120,
                maxHp: 120,
                speed: 2.2,
                rewardPoints: 35,
                rewardMats: 25,
                attackCooldown: 0
            });
        }

        // Spawnowanie Tygrysów Szablozębnych
        for (let i = 0; i < 4; i++) {
            const tx = (Math.random() - 0.5) * 200;
            const tz = (Math.random() - 0.5) * 200;
            if (Math.abs(tx) < 25 && Math.abs(tz) < 25) continue;
            const tiger = createSabertoothMesh();
            tiger.position.set(tx, 0, tz);
            scene.add(tiger);
            fauna.push({
                mesh: tiger,
                type: "sabertooth",
                hp: 60,
                maxHp: 60,
                speed: 4.8,
                rewardPoints: 25,
                rewardMats: 15,
                attackCooldown: 0
            });
        }
    }

    // Boss Epoki
    spawnEraBoss();
}

// MODEL 3D PRADAWNEGO MAMUTA
function createMammothMesh(scale = 1.0) {
    const group = new THREE.Group();
    // Tułów
    const bodyGeo = new THREE.BoxGeometry(2.4 * scale, 2.0 * scale, 3.6 * scale);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 2.2 * scale;
    body.castShadow = true;
    group.add(body);

    // Głowa
    const headGeo = new THREE.BoxGeometry(1.6 * scale, 1.6 * scale, 1.8 * scale);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0, 2.6 * scale, 2.2 * scale);
    head.castShadow = true;
    group.add(head);

    // Trąba
    const trunkGeo = new THREE.CylinderGeometry(0.2 * scale, 0.35 * scale, 2.2 * scale, 6);
    const trunk = new THREE.Mesh(trunkGeo, bodyMat);
    trunk.position.set(0, 1.5 * scale, 3.0 * scale);
    trunk.rotation.x = Math.PI / 6;
    group.add(trunk);

    // Potężne ciosy mamuta (kły z kości słoniowej)
    const tuskMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.3 });
    const tuskGeo = new THREE.ConeGeometry(0.18 * scale, 2.2 * scale, 6);
    const tuskL = new THREE.Mesh(tuskGeo, tuskMat);
    tuskL.position.set(-0.8 * scale, 2.0 * scale, 3.2 * scale);
    tuskL.rotation.x = -Math.PI / 4;
    tuskL.rotation.z = -0.2;

    const tuskR = new THREE.Mesh(tuskGeo, tuskMat);
    tuskR.position.set(0.8 * scale, 2.0 * scale, 3.2 * scale);
    tuskR.rotation.x = -Math.PI / 4;
    tuskR.rotation.z = 0.2;
    group.add(tuskL, tuskR);

    // Nogi
    const legGeo = new THREE.CylinderGeometry(0.35 * scale, 0.4 * scale, 1.5 * scale, 6);
    const positions = [
        [-0.8, 0.75, 1.2],
        [0.8, 0.75, 1.2],
        [-0.8, 0.75, -1.2],
        [0.8, 0.75, -1.2]
    ];
    positions.forEach(p => {
        const leg = new THREE.Mesh(legGeo, bodyMat);
        leg.position.set(p[0] * scale, p[1] * scale, p[2] * scale);
        leg.castShadow = true;
        group.add(leg);
    });

    return group;
}

// MODEL 3D TYGRYSA SZABLOZĘBNEGO
function createSabertoothMesh() {
    const group = new THREE.Group();
    const furMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });

    // Tułów
    const bodyGeo = new THREE.BoxGeometry(1.0, 0.9, 2.2);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.y = 1.1;
    body.castShadow = true;
    group.add(body);

    // Głowa
    const headGeo = new THREE.BoxGeometry(0.8, 0.7, 0.9);
    const head = new THREE.Mesh(headGeo, furMat);
    head.position.set(0, 1.4, 1.3);
    group.add(head);

    // Kły szablozębne
    const fangGeo = new THREE.ConeGeometry(0.08, 0.6, 4);
    const fangMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const fangL = new THREE.Mesh(fangGeo, fangMat);
    fangL.position.set(-0.25, 1.0, 1.7);
    fangL.rotation.x = Math.PI;

    const fangR = new THREE.Mesh(fangGeo, fangMat);
    fangR.position.set(0.25, 1.0, 1.7);
    fangR.rotation.x = Math.PI;
    group.add(fangL, fangR);

    // 4 Łapy
    const legGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.8, 6);
    [[-0.35, 0.4, 0.7], [0.35, 0.4, 0.7], [-0.35, 0.4, -0.7], [0.35, 0.4, -0.7]].forEach(pos => {
        const leg = new THREE.Mesh(legGeo, furMat);
        leg.position.set(...pos);
        group.add(leg);
    });

    return group;
}

// SPAWNOWANIE BOSSA EPOKI
function spawnEraBoss() {
    const bossNames = [
        "👑 PRADAWNY MAMUT MATRIARCHA",
        "👑 KOLOS Z RODOS / CHAMPION ARENY",
        "👑 CZARNY RYCERZ MONARCHII",
        "👑 ŻELAZNY KOLOS PAROWY",
        "👑 ZMECHANIZOWANY DRON KORPORACJI",
        "👑 CYBERNETYCZNY SUPEREKOMPUTER OMEGA 3000"
    ];

    const bx = 45;
    const bz = 45;
    let bossMesh;

    if (state.currentEraIndex === 0) {
        bossMesh = createMammothMesh(1.8);
    } else {
        const geo = new THREE.BoxGeometry(2.5, 4.5, 2.5);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0xef4444, 
            roughness: 0.3,
            metalness: 0.6
        });
        bossMesh = new THREE.Mesh(geo, mat);
        bossMesh.position.y = 2.25;
    }

    bossMesh.position.set(bx, 0, bz);
    scene.add(bossMesh);

    const bHp = 250 + state.currentEraIndex * 150;
    currentBoss = {
        name: bossNames[state.currentEraIndex] || "👑 WŁADCA EPOKI",
        mesh: bossMesh,
        hp: bHp,
        maxHp: bHp,
        speed: 3.0,
        attackCooldown: 0
    };

    document.getElementById('boss-name').innerText = currentBoss.name;
    document.getElementById('boss-hp-fill').style.width = '100%';
    document.getElementById('boss-hp-text').innerText = `${currentBoss.hp}/${currentBoss.maxHp}`;
    document.getElementById('boss-hud-bar').classList.remove('hidden');
}

// OBSŁUGA KLAWIATURY I MYSZKI
function onKeyDown(e) {
    if (keys.hasOwnProperty(e.code)) keys[e.code] = true;

    if (e.code === 'Escape') {
        handleEscapeKey();
    }
    if (e.code === 'KeyM') {
        toggleContinentModal();
    }
    if (e.code === 'KeyK') {
        toggleTechModal();
    }
    if (e.code === 'KeyB') {
        toggleBuildModal();
    }
    if (e.code === 'KeyZ') {
        saveGameState();
    }
    if (e.code === 'KeyX') {
        loadGameState();
    }
    if (e.code === 'KeyT') {
        attemptAdvanceEra();
    }
    if (e.code === 'KeyF') {
        performAttack();
    }
}

function onKeyUp(e) {
    if (keys.hasOwnProperty(e.code)) keys[e.code] = false;
}

function onMouseDown(e) {
    if (e.target.closest && e.target.closest('.modal, .hud-top-bar, .hud-stats-left, .hud-quest-box, .cta-btn')) {
        return; // Kliknięcie w interfejs
    }
    if (e.button === 0) { // LPM
        performAttack();
    }
    if (e.button === 2) { // PPM - obracanie z przytrzymaniem
        isRightMouseDown = true;
    }
}

function onMouseUp(e) {
    if (e.button === 2) {
        isRightMouseDown = false;
    }
}

function onMouseMove(e) {
    // Obracanie kamery: działa przy ruchu myszą po ekranie gry (oraz z PPM)
    if (e.target.closest && e.target.closest('.modal')) return;

    // Obrót w poziomie i pionie
    const sensitivity = 0.005;
    cameraYaw -= e.movementX * sensitivity;
    cameraPitch += e.movementY * sensitivity;

    // Ograniczenie pionu (aby kamera nie przekręciła się do góry nogami)
    cameraPitch = Math.max(0.05, Math.min(Math.PI / 2.2, cameraPitch));
}

function onMouseWheel(e) {
    if (e.target.closest && e.target.closest('.modal')) return;
    cameraDistance += e.deltaY * 0.01;
    cameraDistance = Math.max(4.0, Math.min(25.0, cameraDistance));
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ATAK GRACZA
function performAttack() {
    if (state.isAttacking || state.hp <= 0) return;
    initAudio();
    state.isAttacking = true;

    // Dźwięk ataku zależny od epoki
    if (state.currentEraIndex === 0) playSound('slash');
    else if (state.currentEraIndex <= 2) playSound('slash');
    else if (state.currentEraIndex <= 4) playSound('shoot');
    else playSound('laser');

    // Animacja broni
    if (playerWeaponMesh) {
        playerWeaponMesh.rotation.x += 0.8;
        setTimeout(() => {
            if (playerWeaponMesh) playerWeaponMesh.rotation.x -= 0.8;
            state.isAttacking = false;
        }, 200);
    } else {
        setTimeout(() => { state.isAttacking = false; }, 200);
    }

    // Detekcja trafienia wroga przed graczem (uwzględnia bonusy technologiczne)
    const attackRange = (state.currentEraIndex >= 3 ? 12 : 3.8) + (state.attackRangeBonus || 0);
    const playerPos = playerMesh.position;
    const playerForward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), playerMesh.rotation.y);

    enemies.forEach((enemy, idx) => {
        const dist = playerPos.distanceTo(enemy.mesh.position);
        if (dist <= attackRange) {
            const toEnemy = new THREE.Vector3().subVectors(enemy.mesh.position, playerPos).normalize();
            const angle = playerForward.angleTo(toEnemy);

            if (angle < Math.PI / 2.5) { // Wróg przed nami
                const baseDmg = 20 + state.currentEraIndex * 15;
                const totalDamage = baseDmg + (state.bonusDmg || 0);
                enemy.hp -= totalDamage;
                playSound('hit');

                // Odrzut wroga
                enemy.mesh.position.addScaledVector(toEnemy, 1.2);

                if (enemy.hp <= 0) {
                    // Wróg pokonany
                    scene.remove(enemy.mesh);
                    enemies.splice(idx, 1);
                    state.enemiesKilled++;
                    const earnedPoints = Math.round(15 * state.pointsMultiplier);
                    const earnedMats = Math.round(5 * state.matsMultiplier);
                    state.points += earnedPoints;
                    state.materials += earnedMats;
                    updateHUD();
                    showAlert(`⚔️ Pokonałeś przeciwnika! (+${earnedPoints} Wiedzy, +${earnedMats} Surowców)`);

                    // Sprawdź czy epoka gotowa do skoku
                    checkEraProgress();
                }
            }
        }
    });

    // Detekcja trafienia fauny (Mamuty / Tygrysy szablozębne)
    fauna.forEach((beast, fIdx) => {
        const dist = playerPos.distanceTo(beast.mesh.position);
        if (dist <= attackRange) {
            const toBeast = new THREE.Vector3().subVectors(beast.mesh.position, playerPos).normalize();
            const angle = playerForward.angleTo(toBeast);
            if (angle < Math.PI / 2.5) {
                const totalDmg = 20 + state.currentEraIndex * 15 + (state.bonusDmg || 0);
                beast.hp -= totalDmg;
                playSound('hit');
                beast.mesh.position.addScaledVector(toBeast, 0.8);

                if (beast.hp <= 0) {
                    scene.remove(beast.mesh);
                    fauna.splice(fIdx, 1);
                    const pEarn = Math.round(beast.rewardPoints * state.pointsMultiplier);
                    const mEarn = Math.round(beast.rewardMats * state.matsMultiplier);
                    state.points += pEarn;
                    state.materials += mEarn;
                    updateHUD();
                    showAlert(`🏹 Upolowałeś bestię (${beast.type === 'mammoth' ? 'Mamut' : 'Tygrys Szablozębny'})! (+${pEarn} Wiedzy, +${mEarn} Surowców)`);
                    checkEraProgress();
                }
            }
        }
    });

    // Detekcja trafienia Bossa Epoki
    if (currentBoss && currentBoss.hp > 0) {
        const dist = playerPos.distanceTo(currentBoss.mesh.position);
        if (dist <= attackRange + 2.0) {
            const toBoss = new THREE.Vector3().subVectors(currentBoss.mesh.position, playerPos).normalize();
            const angle = playerForward.angleTo(toBoss);
            if (angle < Math.PI / 2.2) {
                const totalDmg = 20 + state.currentEraIndex * 15 + (state.bonusDmg || 0);
                currentBoss.hp -= totalDmg;
                playSound('hit');

                // Aktualizacja paska bossa
                const pct = Math.max(0, Math.floor((currentBoss.hp / currentBoss.maxHp) * 100));
                document.getElementById('boss-hp-fill').style.width = `${pct}%`;
                document.getElementById('boss-hp-text').innerText = `${Math.max(0, currentBoss.hp)}/${currentBoss.maxHp}`;

                if (currentBoss.hp <= 0) {
                    scene.remove(currentBoss.mesh);
                    showAlert(`👑 POKONAŁEŚ BOSSA EPOKI: ${currentBoss.name}! Zyskujesz +100 Wiedzy i +50 Surowców!`);
                    state.points += Math.round(100 * state.pointsMultiplier);
                    state.materials += Math.round(50 * state.matsMultiplier);
                    currentBoss = null;
                    document.getElementById('boss-hud-bar').classList.add('hidden');
                    updateHUD();
                    checkEraProgress();
                    playSound('era');
                }
            }
        }
    }
}

// SPRAWDZANIE POSTĘPU DO NOWEJ EPOKI
function checkEraProgress() {
    const era = ERAS[state.currentEraIndex];
    if (state.points >= era.requiredPoints) {
        const advBtn = document.getElementById('advance-era-btn');
        advBtn.classList.remove('hidden');
    }
}

// PRZEJŚCIE DO NOWEJ EPOKI
function attemptAdvanceEra() {
    const era = ERAS[state.currentEraIndex];
    if (state.points >= era.requiredPoints) {
        if (state.currentEraIndex < ERAS.length - 1) {
            state.currentEraIndex++;
            showEraTransitionModal();
        } else {
            showAlert("🏆 Osiągnąłeś absolutny szczyt ludzkiej cywilizacji!");
        }
    }
}

function showEraTransitionModal() {
    const nextEra = ERAS[state.currentEraIndex];
    document.getElementById('trans-title').innerText = `🎉 NOWA ERA: ${nextEra.name}`;
    document.getElementById('trans-desc').innerText = nextEra.rewardText;
    document.getElementById('trans-bonus').innerText = `Odblokowano nową broń: ${nextEra.weaponName}! Wrogowie ewoluują!`;
    document.getElementById('era-transition-modal').classList.remove('hidden');
    document.getElementById('advance-era-btn').classList.add('hidden');

    playSound('era');
}

function applyEraTransition() {
    document.getElementById('era-transition-modal').classList.add('hidden');
    buildPlayer();
    buildWorld();
    updateHUD();
    showAlert(`🚀 Witaj w erze: ${ERAS[state.currentEraIndex].name}!`);
}

// ZARZĄDZANIE KRAJAMI I KONTYNENTAMI
let activeContinentFilter = "all";

function changeCountry(countryId) {
    const country = COUNTRIES.find(c => c.id === countryId);
    if (!country) return;

    state.currentCountryId = countryId;
    state.currentContinentId = country.continentId;

    closeContinentModal();
    buildWorld();
    updateHUD();

    initAudio();
    playSound('pickup');
    showAlert(`✈️ Podróż ukończona! Wylądowałeś w kraju: ${country.flag} ${country.name} (${country.perk})`);
}

function toggleContinentModal() {
    const modal = document.getElementById('continent-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        renderContinentsAndCountriesList();
    }
}

function closeContinentModal() {
    document.getElementById('continent-modal').classList.add('hidden');
}

function renderContinentsAndCountriesList() {
    // 1. Renderowanie zakładek kontynentów
    const tabsContainer = document.getElementById('country-continents-tabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = '';
        CONTINENTS.forEach(cont => {
            const tab = document.createElement('div');
            tab.className = `tech-tab ${cont.id === activeContinentFilter ? 'active' : ''}`;
            tab.innerText = `${cont.icon} ${cont.name}`;
            tab.onclick = () => {
                activeContinentFilter = cont.id;
                renderContinentsAndCountriesList();
            };
            tabsContainer.appendChild(tab);
        });
    }

    // 2. Renderowanie kart krajów
    const list = document.getElementById('continents-list');
    list.innerHTML = '';

    const filteredCountries = activeContinentFilter === "all" 
        ? COUNTRIES 
        : COUNTRIES.filter(c => c.continentId === activeContinentFilter);

    filteredCountries.forEach(country => {
        const isCurrent = country.id === state.currentCountryId;
        const contObj = CONTINENTS.find(c => c.id === country.continentId) || { name: "Świat" };

        const card = document.createElement('div');
        card.className = `continent-card ${isCurrent ? 'active' : ''}`;
        card.innerHTML = `
            <div class="cont-head">
                <span class="cont-icon" style="font-size:36px;">${country.flag}</span>
                <div>
                    <div class="cont-name">${country.name}</div>
                    <div class="cont-sub">Kontynent: ${contObj.name} | Stolica: ${country.capital}</div>
                </div>
            </div>
            <div class="cont-features">
                <b>🌟 Cecha Cywilizacyjna:</b> ${country.perk}
            </div>
            <button class="cont-btn">${isCurrent ? '✓ Twoja Bieżąca Lokalizacja' : `Podróżuj do ${country.name} ➔`}</button>
        `;
        card.onclick = () => changeCountry(country.id);
        list.appendChild(card);
    });
}

// POWIADOMIENIA NA EKRANIE
let alertTimeout = null;
function showAlert(text) {
    const banner = document.getElementById('alert-banner');
    banner.innerText = text;
    banner.style.display = 'block';
    if (alertTimeout) clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
        banner.style.display = 'none';
    }, 3200);
}

// AKTUALIZACJA HUD
function updateHUD() {
    const era = ERAS[state.currentEraIndex];
    const country = COUNTRIES.find(c => c.id === state.currentCountryId) || COUNTRIES[0];
    const continent = CONTINENTS.find(c => c.id === country.continentId) || { name: "Świat" };

    document.getElementById('era-icon').innerText = era.icon;
    document.getElementById('era-name').innerText = era.name;
    document.getElementById('country-flag').innerText = country.flag;
    document.getElementById('country-name').innerText = `${country.name} (${continent.name})`;

    // Pasek wiedzy
    const percent = Math.min(100, Math.floor((state.points / era.requiredPoints) * 100));
    document.getElementById('evo-percent').innerText = `${percent}% (${state.points}/${era.requiredPoints})`;
    document.getElementById('evo-bar').style.width = `${percent}%`;

    // Statystyki
    document.getElementById('hp-bar').style.width = `${(state.hp / state.maxHp) * 100}%`;
    document.getElementById('energy-bar').style.width = `${state.energy}%`;
    document.getElementById('res-tech').innerText = state.points;
    document.getElementById('res-mats').innerText = state.materials;
    document.getElementById('res-kills').innerText = state.enemiesKilled;

    document.getElementById('quest-text').innerText = era.quest;
}

// ZMIENNA ZAKŁADKI DRZEWKA TECHNOLOGICZNEGO
let activeTechEraTab = 0;

function toggleTechModal() {
    const modal = document.getElementById('tech-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        activeTechEraTab = state.currentEraIndex;
        renderTechTree();
    }
}

function closeTechModal() {
    document.getElementById('tech-modal').classList.add('hidden');
}

function renderTechTree() {
    // Renderowanie zakładek epok
    const tabsContainer = document.getElementById('tech-era-tabs');
    tabsContainer.innerHTML = '';

    ERAS.forEach((era, idx) => {
        const tab = document.createElement('div');
        tab.className = `tech-tab ${idx === activeTechEraTab ? 'active' : ''}`;
        tab.innerText = `${era.icon} ${era.name}`;
        tab.onclick = () => {
            activeTechEraTab = idx;
            renderTechTree();
        };
        tabsContainer.appendChild(tab);
    });

    // Renderowanie kart technologii dla wybranej epoki (pogrupowane wg Tier 1, 2, 3)
    const grid = document.getElementById('tech-grid');
    grid.innerHTML = '';

    const eraTechs = TECHNOLOGIES.filter(t => t.eraId === activeTechEraTab);
    const isEraUnlocked = activeTechEraTab <= state.currentEraIndex;

    // Grupowanie według Tierów dla czytelności drzewka
    const tiers = [
        { tier: 1, name: "Tier 1: Technologie Podstawowe" },
        { tier: 2, name: "Tier 2: Technologie Zaawansowane" },
        { tier: 3, name: "Tier 3: Mistrzostwo i Odkrycia Przełomowe" }
    ];

    tiers.forEach(tierInfo => {
        const tierTechs = eraTechs.filter(t => t.tier === tierInfo.tier);
        if (tierTechs.length === 0) return;

        // Nagłówek tieru
        const tierHeader = document.createElement('div');
        tierHeader.className = 'tech-tier-header';
        tierHeader.innerHTML = `<span>⚡ ${tierInfo.name}</span>`;
        grid.appendChild(tierHeader);

        const tierRow = document.createElement('div');
        tierRow.className = 'tech-tier-row';

        tierTechs.forEach(tech => {
            const isUnlocked = state.unlockedTechs.includes(tech.id);
            const reqs = tech.requires || [];
            const missingReqs = reqs.filter(reqId => !state.unlockedTechs.includes(reqId));
            const prerequisitesMet = missingReqs.length === 0;
            const canAfford = state.points >= tech.costPoints && state.materials >= tech.costMats;
            const canCraft = isEraUnlocked && prerequisitesMet && !isUnlocked && canAfford;

            const card = document.createElement('div');
            card.className = `tech-card ${isUnlocked ? 'unlocked' : ''} ${!isEraUnlocked ? 'locked' : ''} ${!prerequisitesMet && !isUnlocked ? 'prereq-missing' : ''}`;

            let statusBadge = '';
            if (isUnlocked) {
                statusBadge = `<span class="tech-badge-status status-done">✓ Opanowane</span>`;
            } else if (!prerequisitesMet) {
                statusBadge = `<span class="tech-badge-status status-prereq">Wymaga Badań</span>`;
            } else if (canCraft) {
                statusBadge = `<span class="tech-badge-status status-ready">Gotowe do odkrycia</span>`;
            } else {
                statusBadge = `<span class="tech-badge-status status-locked">Zablokowane</span>`;
            }

            // Wizualizacja wymagań (drzewo powiązań)
            let reqsHtml = '';
            if (reqs.length > 0) {
                const reqBadges = reqs.map(reqId => {
                    const reqTech = TECHNOLOGIES.find(t => t.id === reqId);
                    const reqDone = state.unlockedTechs.includes(reqId);
                    const reqName = reqTech ? reqTech.name : reqId;
                    return `<span class="tech-req-badge ${reqDone ? 'done' : 'missing'}">${reqDone ? '✓' : '🔒'} ${reqName}</span>`;
                }).join(' ');
                reqsHtml = `<div class="tech-reqs-container"><span class="reqs-title">Wymaga:</span> ${reqBadges}</div>`;
            } else {
                reqsHtml = `<div class="tech-reqs-container"><span class="reqs-title-free">Podstawa epoki (brak wymagań wstępnych)</span></div>`;
            }

            let btnText = '🛠️ Wytwórz / Odkryj Wynalazek';
            if (isUnlocked) {
                btnText = '✓ Wynalazek Zbadany';
            } else if (!isEraUnlocked) {
                btnText = '🔒 Wymaga odblokowania wyższej epoki';
            } else if (!prerequisitesMet) {
                const firstMissing = TECHNOLOGIES.find(t => t.id === missingReqs[0]);
                btnText = `🔒 Wymaga: ${firstMissing ? firstMissing.name : 'wcześniejszej technologii'}`;
            } else if (!canAfford) {
                btnText = '❌ Za mało surowców / wiedzy';
            }

            card.innerHTML = `
                <div class="tech-header">
                    <span class="tech-icon">${tech.icon}</span>
                    <div style="flex: 1;">
                        <div class="tech-name">${tech.name}</div>
                        <div class="tech-bonus">⚡ Bonus: ${tech.bonus}</div>
                    </div>
                    ${statusBadge}
                </div>
                ${reqsHtml}
                <div class="tech-desc">${tech.desc}</div>
                <div class="tech-cost">
                    Koszt: 💡 <b>${tech.costPoints}</b> Wiedzy | 📦 <b>${tech.costMats}</b> Surowców
                </div>
                <button class="tech-btn ${canCraft ? 'craft-btn' : ''}" ${!canCraft ? 'disabled' : ''}>
                    ${btnText}
                </button>
            `;

            if (canCraft) {
                const btn = card.querySelector('button');
                btn.onclick = () => craftTechnology(tech);
            }

            tierRow.appendChild(card);
        });

        grid.appendChild(tierRow);
    });
}

function craftTechnology(tech) {
    if (state.unlockedTechs.includes(tech.id)) return;
    const reqs = tech.requires || [];
    const missingReqs = reqs.filter(reqId => !state.unlockedTechs.includes(reqId));
    if (missingReqs.length > 0) return;
    if (state.points < tech.costPoints || state.materials < tech.costMats) return;

    state.points -= tech.costPoints;
    state.materials -= tech.costMats;
    state.unlockedTechs.push(tech.id);

    // Zastosowanie efektu
    if (tech.effect) {
        tech.effect(state);
    }

    initAudio();
    playSound('pickup');
    showAlert(`🎉 ODKRYTO WYNALAZEK: ${tech.name}! Aktywowano: ${tech.bonus}`);

    updateHUD();
    renderTechTree();
}

// SYSTEM BUDOWANIA OSADY & INFRASTRUKTURY
function toggleBuildModal() {
    const modal = document.getElementById('build-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        renderBuildingsList();
    }
}

function closeBuildModal() {
    document.getElementById('build-modal').classList.add('hidden');
}

function renderBuildingsList() {
    const grid = document.getElementById('buildings-grid');
    grid.innerHTML = '';

    BUILDINGS.forEach(b => {
        const isEraUnlocked = b.eraId <= state.currentEraIndex;
        const canAfford = state.points >= b.costPoints && state.materials >= b.costMats;
        const canBuild = isEraUnlocked && canAfford;

        const card = document.createElement('div');
        card.className = `continent-card ${!isEraUnlocked ? 'locked' : ''}`;
        card.innerHTML = `
            <div class="cont-head">
                <span class="cont-icon">${b.icon}</span>
                <div>
                    <div class="cont-name">${b.name}</div>
                    <div class="cont-sub">Koszt: 💡 ${b.costPoints} Wiedzy | 📦 ${b.costMats} Surowców</div>
                </div>
            </div>
            <div class="cont-features">${b.desc}</div>
            <div style="font-size:12px; color:#34d399; font-weight:bold; background:rgba(16,185,129,0.15); padding:6px 10px; border-radius:6px; border:1px dashed #10b981;">
                🎁 Nagroda za wybudowanie: +${b.bonusPts || 30} Wiedzy, +${b.bonusMats || 15} Surowców<br>
                ⏱️ Pasywny dochód: +${b.passivePts || 2} Wiedzy, +${b.passiveMats || 1} Surowców co 4s!
            </div>
            <button class="cont-btn" ${!canBuild ? 'disabled style="background:#475569; cursor:not-allowed;"' : ''}>
                ${!isEraUnlocked ? 'Wymaga nowszej epoki' : (canAfford ? '🔨 Postaw obok siebie' : 'Za mało surowców')}
            </button>
        `;

        if (canBuild) {
            card.querySelector('button').onclick = () => placeBuilding(b);
        }

        grid.appendChild(card);
    });
}

// POSTAWIENIE STRUKTURY W ŚWIECIE 3D
function placeBuilding(b) {
    if (state.points < b.costPoints || state.materials < b.costMats) return;

    state.points -= b.costPoints;
    state.materials -= b.costMats;

    const spawnPos = playerMesh.position.clone();
    // Postawienie lekko przed graczem
    const forward = new THREE.Vector3(0, 0, 3).applyAxisAngle(new THREE.Vector3(0, 1, 0), playerMesh.rotation.y);
    spawnPos.add(forward);

    const group = new THREE.Group();

    if (b.type === 'tent') {
        // Stożkowy szałas ze skór
        const coneGeo = new THREE.ConeGeometry(2.5, 3.2, 5);
        const coneMat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.9 });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.y = 1.6;
        cone.castShadow = true;

        // Ognisko obok
        const fireGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.2, 6);
        const fireMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xf97316, emissiveIntensity: 1.0 });
        const fire = new THREE.Mesh(fireGeo, fireMat);
        fire.position.set(2.0, 0.1, 0);

        group.add(cone, fire);
    } else if (b.type === 'totem') {
        // Totem
        const poleGeo = new THREE.CylinderGeometry(0.3, 0.4, 5.0, 6);
        const poleMat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.8 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = 2.5;

        const headGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const head = new THREE.Mesh(headGeo, poleMat);
        head.position.y = 4.2;

        group.add(pole, head);
    } else if (b.type === 'shrine') {
        // Świątynia
        const plinthGeo = new THREE.BoxGeometry(4.5, 0.6, 4.5);
        const colMat = new THREE.MeshStandardMaterial({ color: b.color });
        const plinth = new THREE.Mesh(plinthGeo, colMat);
        plinth.position.y = 0.3;

        for (let x of [-1.5, 1.5]) {
            for (let z of [-1.5, 1.5]) {
                const colGeo = new THREE.CylinderGeometry(0.25, 0.25, 3.5, 8);
                const col = new THREE.Mesh(colGeo, colMat);
                col.position.set(x, 2.05, z);
                group.add(col);
            }
        }
        const roofGeo = new THREE.ConeGeometry(3.5, 1.2, 4);
        const roof = new THREE.Mesh(roofGeo, colMat);
        roof.position.y = 4.3;
        roof.rotation.y = Math.PI / 4;
        group.add(plinth, roof);
    } else {
        // Nowoczesna / Przyszłościowa konstrukcja
        const boxGeo = new THREE.BoxGeometry(3.5, 4.5, 3.5);
        const boxMat = new THREE.MeshStandardMaterial({ color: b.color, metalness: 0.7, roughness: 0.2 });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.y = 2.25;
        group.add(box);
    }

    group.position.copy(spawnPos);
    scene.add(group);
    placedStructures.push({ mesh: group, type: b.type, pos: spawnPos, buildingData: b, lastPassiveTime: 0 });

    state.builtStructures.push({
        id: b.id,
        x: spawnPos.x,
        y: spawnPos.y,
        z: spawnPos.z
    });

    // NATYCHMIASTOWY BONUS PUNKTÓW WIEDZY I SUROWCÓW ZA WYBUDOWANIE
    const earnedBonusPts = Math.round((b.bonusPts || 30) * state.pointsMultiplier);
    const earnedBonusMats = Math.round((b.bonusMats || 15) * state.matsMultiplier);
    state.points += earnedBonusPts;
    state.materials += earnedBonusMats;

    closeBuildModal();
    initAudio();
    playSound('pickup');
    showAlert(`🛖 Wybudowano: ${b.name}! Zyskujesz +${earnedBonusPts} Wiedzy i +${earnedBonusMats} Surowców!`);
    updateHUD();
    checkEraProgress();
}

// SYSTEM ZAPISU I WCZYTYWANIA STANU GRY (LOCALSTORAGE)
function saveGameState() {
    try {
        const saveData = {
            currentEraIndex: state.currentEraIndex,
            currentContinentId: state.currentContinentId,
            currentCountryId: state.currentCountryId,
            points: state.points,
            materials: state.materials,
            enemiesKilled: state.enemiesKilled,
            hp: state.hp,
            maxHp: state.maxHp,
            unlockedTechs: state.unlockedTechs,
            bonusDmg: state.bonusDmg,
            armor: state.armor,
            speedBonus: state.speedBonus,
            matsMultiplier: state.matsMultiplier,
            pointsMultiplier: state.pointsMultiplier,
            attackRangeBonus: state.attackRangeBonus,
            builtStructures: state.builtStructures
        };
        localStorage.setItem('era_human_save_v1', JSON.stringify(saveData));
        showAlert("💾 Postęp gry został pomyślnie zapisany!");
        playSound('pickup');
    } catch (e) {
        console.error("Save error:", e);
        showAlert("⚠️ Błąd podczas zapisywania gry!");
    }
}

function loadGameState() {
    try {
        const raw = localStorage.getItem('era_human_save_v1');
        if (!raw) {
            showAlert("⚠️ Brak zapisanego stanu gry!");
            return;
        }
        const data = JSON.parse(raw);

        state.currentEraIndex = data.currentEraIndex ?? 0;
        state.currentContinentId = data.currentContinentId ?? "europe";
        state.currentCountryId = data.currentCountryId ?? "poland";
        state.points = data.points ?? 0;
        state.materials = data.materials ?? 0;
        state.enemiesKilled = data.enemiesKilled ?? 0;
        state.hp = data.hp ?? 100;
        state.maxHp = data.maxHp ?? 100;
        state.unlockedTechs = data.unlockedTechs ?? [];
        state.bonusDmg = data.bonusDmg ?? 0;
        state.armor = data.armor ?? 0;
        state.speedBonus = data.speedBonus ?? 0;
        state.matsMultiplier = data.matsMultiplier ?? 1.0;
        state.pointsMultiplier = data.pointsMultiplier ?? 1.0;
        state.attackRangeBonus = data.attackRangeBonus ?? 0;
        state.builtStructures = data.builtStructures ?? [];

        // Przebudowa świata dla wczytanej epoki i kontynentu
        buildPlayer();
        buildWorld();

        // Odtworzenie wybudowanych struktur
        state.builtStructures.forEach(item => {
            const b = BUILDINGS.find(x => x.id === item.id);
            if (b) {
                const group = new THREE.Group();
                const coneGeo = new THREE.ConeGeometry(2.5, 3.2, 5);
                const coneMat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.9 });
                const cone = new THREE.Mesh(coneGeo, coneMat);
                cone.position.y = 1.6;
                group.add(cone);
                group.position.set(item.x, item.y, item.z);
                scene.add(group);
                placedStructures.push({ mesh: group, type: b.type, pos: group.position, buildingData: b });
            }
        });

        updateHUD();
        const cObj = COUNTRIES.find(c => c.id === state.currentCountryId) || COUNTRIES[0];
        showAlert(`📂 Stan gry wczytany pomyślnie! Era: ${ERAS[state.currentEraIndex].name}, Kraj: ${cObj.flag} ${cObj.name}`);
        playSound('era');
    } catch (e) {
        console.error("Load error:", e);
        showAlert("⚠️ Błąd wczytywania zapisu!");
    }
}

// OBSŁUGA KLAWISZA ESCAPE (ZAMYKANIE MODALI LUB OTWARCIE MENU PAUZY)
function handleEscapeKey() {
    // Jeśli otwarty jest ekran startowy, nie rób nic
    const startScreen = document.getElementById('start-screen');
    if (!startScreen.classList.contains('hidden')) return;

    // Sprawdź czy jakikolwiek modal podrzędny jest otwarty
    const modals = [
        document.getElementById('tech-modal'),
        document.getElementById('build-modal'),
        document.getElementById('continent-modal'),
        document.getElementById('era-transition-modal')
    ];

    let anyModalClosed = false;
    modals.forEach(m => {
        if (m && !m.classList.contains('hidden')) {
            m.classList.add('hidden');
            anyModalClosed = true;
        }
    });

    // Jeśli żaden modal nie był otwarty, przełącz menu pauzy
    if (!anyModalClosed) {
        togglePauseModal();
    }
}

let isGamePaused = false;
function togglePauseModal() {
    const pauseModal = document.getElementById('pause-modal');
    pauseModal.classList.toggle('hidden');
    isGamePaused = !pauseModal.classList.contains('hidden');
}

// RESTART GRY OD POCZĄTKU
function restartGame() {
    if (!confirm("Czy na pewno chcesz zresetować całą grę i zacząć ewolucję od nowa w Epoce Kamienia?")) {
        return;
    }

    // Reset stanu do stanu początkowego
    state.currentEraIndex = 0;
    state.currentContinentId = "europe";
    state.currentCountryId = "poland";
    state.points = 0;
    state.materials = 0;
    state.enemiesKilled = 0;
    state.hp = 100;
    state.maxHp = 100;
    state.energy = 100;
    state.unlockedTechs = [];
    state.bonusDmg = 0;
    state.armor = 0;
    state.speedBonus = 0;
    state.matsMultiplier = 1.0;
    state.pointsMultiplier = 1.0;
    state.attackRangeBonus = 0;
    state.builtStructures = [];

    // Zamknięcie wszystkich modali
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.getElementById('advance-era-btn').classList.add('hidden');
    isGamePaused = false;

    // Czyszczenie i regeneracja świata
    placedStructures.forEach(str => scene.remove(str.mesh));
    placedStructures = [];
    buildPlayer();
    buildWorld();
    updateHUD();

    showAlert("🔄 Rozpoczęto nową grę od Epoki Kamienia! Rozwijaj cywilizację!");
    initAudio();
    playSound('era');
}

// WYJŚCIE DO MENU GŁÓWNEGO
function goToMainMenu() {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.getElementById('start-screen').classList.remove('hidden');
    isGamePaused = false;
}

// SETUP PRZYCISKÓW I UI
function setupUI() {
    document.getElementById('continent-selector-btn').onclick = toggleContinentModal;
    document.getElementById('close-continent-modal').onclick = closeContinentModal;
    document.getElementById('techtree-toggle-btn').onclick = toggleTechModal;
    document.getElementById('close-tech-modal').onclick = closeTechModal;
    document.getElementById('build-toggle-btn').onclick = toggleBuildModal;
    document.getElementById('close-build-modal').onclick = closeBuildModal;
    document.getElementById('save-btn').onclick = saveGameState;
    document.getElementById('load-btn').onclick = loadGameState;
    document.getElementById('trans-continue-btn').onclick = applyEraTransition;
    document.getElementById('advance-era-btn').onclick = attemptAdvanceEra;

    // Przyciski menu pauzy / wyjścia ESC
    document.getElementById('resume-btn').onclick = togglePauseModal;
    document.getElementById('restart-game-btn').onclick = restartGame;
    document.getElementById('save-pause-btn').onclick = () => { saveGameState(); };
    document.getElementById('load-pause-btn').onclick = () => { loadGameState(); togglePauseModal(); };
    document.getElementById('main-menu-btn').onclick = goToMainMenu;

    document.getElementById('audio-toggle').onclick = () => {
        state.audioEnabled = !state.audioEnabled;
        document.getElementById('audio-toggle').innerText = state.audioEnabled ? "🔊 Dźwięk" : "🔇 Dźwięk Wył.";
        if (state.audioEnabled) initAudio();
    };

    document.getElementById('start-game-btn').onclick = () => {
        initAudio();
        document.getElementById('start-screen').classList.add('hidden');
    };

    updateHUD();
}

// GŁÓWNA PĘTLA ANIMACJI & FIZYKI
function animate() {
    requestAnimationFrame(animate);

    if (isGamePaused) {
        renderer.render(scene, camera);
        return;
    }

    const delta = Math.min(clock.getDelta(), 0.1);

    if (playerMesh) {
        // Obsługa obracania z klawiatury (strzałki lewo/prawo lub Q/E)
        const rotSpeed = 2.5 * delta;
        if (keys.ArrowLeft || keys.KeyQ) cameraYaw += rotSpeed;
        if (keys.ArrowRight || keys.KeyE) cameraYaw -= rotSpeed;
        if (keys.ArrowUp) cameraPitch = Math.max(0.05, cameraPitch - rotSpeed * 0.7);
        if (keys.ArrowDown) cameraPitch = Math.min(Math.PI / 2.2, cameraPitch + rotSpeed * 0.7);

        // Ruch gracza względem kąta kamery (cameraYaw)
        const baseSpeed = keys.ShiftLeft ? 12 : 7;
        const moveSpeed = baseSpeed + (state.speedBonus || 0);

        // Wektor wejściowy WSAD
        let inputX = 0;
        let inputZ = 0;
        if (keys.KeyW) inputZ += 1;
        if (keys.KeyS) inputZ -= 1;
        if (keys.KeyA) inputX -= 1;
        if (keys.KeyD) inputX += 1;

        const isMoving = inputX !== 0 || inputZ !== 0;

        if (isMoving) {
            // Obliczenie wektora ruchu w świecie względem obrotu kamery (cameraYaw)
            const forward = new THREE.Vector3(Math.sin(cameraYaw), 0, Math.cos(cameraYaw));
            const right = new THREE.Vector3(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw));

            const moveDirection = new THREE.Vector3()
                .addScaledVector(forward, inputZ)
                .addScaledVector(right, inputX)
                .normalize();

            // Płynny obrót postaci w stronę ruchu
            const targetRotation = Math.atan2(moveDirection.x, moveDirection.z);
            playerMesh.rotation.y = targetRotation;

            // Przemieszczenie postaci
            playerMesh.position.x += moveDirection.x * moveSpeed * delta;
            playerMesh.position.z += moveDirection.z * moveSpeed * delta;

            // Kołysanie chodu
            playerMesh.position.y = Math.abs(Math.sin(clock.getElapsedTime() * 10)) * 0.15;
        } else {
            // Gdy postać stoi, może być zwrócona w kierunku patrzenia kamery
            playerMesh.position.y = 0;
            // Płynne wyrównanie w stronę patrzenia
            playerMesh.rotation.y = THREE.MathUtils.lerp(playerMesh.rotation.y, cameraYaw, 0.08);
        }

        // Płynna kamera TPP sferyczna (orbitująca wokół gracza)
        const camX = playerMesh.position.x - Math.sin(cameraYaw) * Math.cos(cameraPitch) * cameraDistance;
        const camY = playerMesh.position.y + Math.sin(cameraPitch) * cameraDistance + 1.2;
        const camZ = playerMesh.position.z - Math.cos(cameraYaw) * Math.cos(cameraPitch) * cameraDistance;

        const targetCamPos = new THREE.Vector3(camX, camY, camZ);
        camera.position.lerp(targetCamPos, 0.15);

        // Cel kamery (punkt nieco ponad głową gracza)
        const lookTarget = playerMesh.position.clone().add(new THREE.Vector3(0, 1.8, 0));
        camera.lookAt(lookTarget);

        // Odnawianie energii
        if (state.energy < 100) {
            state.energy = Math.min(100, state.energy + delta * 15);
            document.getElementById('energy-bar').style.width = `${state.energy}%`;
        }

        // Podnoszenie zwojów wiedzy (ze skalowaniem przez technologie)
        pickups.forEach((p, idx) => {
            p.mesh.rotation.y += p.rotationSpeed * delta;
            p.mesh.position.y = p.baseY + Math.sin(clock.getElapsedTime() * 3 + idx) * 0.25;

            if (playerMesh.position.distanceTo(p.mesh.position) < 2.0) {
                scene.remove(p.mesh);
                pickups.splice(idx, 1);
                const earnedPoints = Math.round(10 * state.pointsMultiplier);
                const earnedMats = Math.round(2 * state.matsMultiplier);
                state.points += earnedPoints;
                state.materials += earnedMats;
                playSound('pickup');
                showAlert(`💡 Zdobyto Zwój Wiedzy! (+${earnedPoints} Wiedzy, +${earnedMats} Surowców)`);
                updateHUD();
                checkEraProgress();

                // Odradzanie nowego zwoju w losowym miejscu
                setTimeout(() => {
                    const x = (Math.random() - 0.5) * 200;
                    const z = (Math.random() - 0.5) * 200;
                    const geo = new THREE.OctahedronGeometry(0.5);
                    const mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 });
                    const newMesh = new THREE.Mesh(geo, mat);
                    newMesh.position.set(x, 1.2, z);
                    scene.add(newMesh);
                    pickups.push({ mesh: newMesh, baseY: 1.2, rotationSpeed: 1.5 });
                }, 3000);
            }
        });

        // Logika wrogów (AI zbliżania się i ataku)
        enemies.forEach(enemy => {
            const dist = enemy.mesh.position.distanceTo(playerMesh.position);

            if (dist < 40 && dist > 1.8) {
                // Pościg za graczem
                enemy.mesh.lookAt(playerMesh.position.x, enemy.mesh.position.y, playerMesh.position.z);
                const dir = new THREE.Vector3().subVectors(playerMesh.position, enemy.mesh.position).normalize();
                enemy.mesh.position.addScaledVector(dir, enemy.speed * delta);
            } else if (dist <= 1.8) {
                // Atak na gracza (uwzględnia redukcję pancerza)
                enemy.attackCooldown -= delta;
                if (enemy.attackCooldown <= 0) {
                    const rawDamage = 12 + state.currentEraIndex * 4;
                    const reducedDamage = Math.max(2, rawDamage - (state.armor || 0));
                    state.hp = Math.max(0, state.hp - reducedDamage);
                    playSound('hit');
                    enemy.attackCooldown = 1.2;
                    updateHUD();

                    if (state.hp <= 0) {
                        showAlert("💀 Zostałeś pokonany! Odradzanie w centrum ery...");
                        state.hp = state.maxHp;
                        playerMesh.position.set(0, 0, 0);
                        updateHUD();
                    }
                }
            }
        });

        // Logika fauny (Mamuty i Tygrysy Szablozębne)
        fauna.forEach(beast => {
            const dist = beast.mesh.position.distanceTo(playerMesh.position);
            if (beast.type === 'sabertooth' && dist < 30 && dist > 1.8) {
                // Tygrysy aktywnie polują na gracza
                beast.mesh.lookAt(playerMesh.position.x, beast.mesh.position.y, playerMesh.position.z);
                const dir = new THREE.Vector3().subVectors(playerMesh.position, beast.mesh.position).normalize();
                beast.mesh.position.addScaledVector(dir, beast.speed * delta);
            } else if (dist <= 2.2) {
                beast.attackCooldown -= delta;
                if (beast.attackCooldown <= 0) {
                    const dmg = beast.type === 'mammoth' ? 20 : 14;
                    const redDmg = Math.max(2, dmg - (state.armor || 0));
                    state.hp = Math.max(0, state.hp - redDmg);
                    playSound('hit');
                    beast.attackCooldown = 1.5;
                    updateHUD();
                }
            } else if (beast.type === 'mammoth') {
                // Wolne przechadzanie się mamutów
                beast.mesh.rotation.y += 0.2 * delta;
                beast.mesh.translateZ(0.5 * delta);
            }
        });

        // Logika Bossa Epoki
        if (currentBoss && currentBoss.hp > 0) {
            const bDist = currentBoss.mesh.position.distanceTo(playerMesh.position);
            if (bDist < 60 && bDist > 3.0) {
                currentBoss.mesh.lookAt(playerMesh.position.x, currentBoss.mesh.position.y, playerMesh.position.z);
                const dir = new THREE.Vector3().subVectors(playerMesh.position, currentBoss.mesh.position).normalize();
                currentBoss.mesh.position.addScaledVector(dir, currentBoss.speed * delta);
            } else if (bDist <= 3.2) {
                currentBoss.attackCooldown -= delta;
                if (currentBoss.attackCooldown <= 0) {
                    const bDmg = 25 + state.currentEraIndex * 8;
                    const redDmg = Math.max(5, bDmg - (state.armor || 0));
                    state.hp = Math.max(0, state.hp - redDmg);
                    playSound('hit');
                    currentBoss.attackCooldown = 1.6;
                    updateHUD();
                    showAlert(`⚠️ POTĘŻNY CIOS BOSSA! (-${redDmg} HP)`);
                }
            }
        }

        // Pasywny efekt wybudowanych struktur (leczenie w pobliżu + ciągłe generowanie wiedzy i surowców)
        const currentTime = clock.getElapsedTime();
        placedStructures.forEach(str => {
            const bData = str.buildingData || {};
            const dist = playerMesh.position.distanceTo(str.pos);

            // Leczenie, gdy gracz odpoczywa w pobliżu schronienia / bazy
            if (dist < 10.0 && (bData.healRate || 6) > 0) {
                if (state.hp < state.maxHp) {
                    state.hp = Math.min(state.maxHp, state.hp + delta * (bData.healRate || 6));
                    updateHUD();
                }
            }

            // Pasywny dochód wiedzy i surowców co 4 sekundy
            if (!str.lastPassiveTime || (currentTime - str.lastPassiveTime) >= 4.0) {
                str.lastPassiveTime = currentTime;
                const pGain = Math.round((bData.passivePts || 2) * state.pointsMultiplier);
                const mGain = Math.round((bData.passiveMats || 1) * state.matsMultiplier);
                state.points += pGain;
                state.materials += mGain;
                updateHUD();
                checkEraProgress();
            }
        });
    }

    renderer.render(scene, camera);
}

// START PO ZAŁADOWANIU DOM
window.addEventListener('DOMContentLoaded', () => {
    init3D();
});
