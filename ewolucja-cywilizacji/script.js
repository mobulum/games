// --- DEFINICJA KRAJÓW I CYWILIZACJI ---
const NATIONS = [
  {
    id: "poland",
    name: "Polska",
    flag: "🇵🇱",
    desc: "Kolebka Kopernika i Marii Skłodowskiej-Curie. Wybitne tradycje naukowe, husaria i hart ducha.",
    bonusDesc: "+25% do Punktów Nauki (RP), +1 do bazowego badania",
    rpMult: 1.25,
    prodMult: 1.0,
    energyMult: 1.0,
    clickRpBonus: 1,
    clickProdBonus: 0,
    uniqueGenDiscount: 0.1,
    homeProvince: "poland_core"
  },
  {
    id: "germany",
    name: "Niemcy",
    flag: "🇩🇪",
    desc: "Potęga inżynierii, przemysłu ciężkiego i precyzyjnej organizacji pracy.",
    bonusDesc: "+30% do Produkcji Materiałów, tańsze struktury przemysłowe",
    rpMult: 1.0,
    prodMult: 1.30,
    energyMult: 1.0,
    clickRpBonus: 0,
    clickProdBonus: 2,
    uniqueGenDiscount: 0.2,
    homeProvince: "germany_core"
  },
  {
    id: "japan",
    name: "Japonia",
    flag: "🇯🇵",
    desc: "Lider robotyki, elektroniki i zaawansowanych technologii przyszłości.",
    bonusDesc: "+20% RP, +35% Energii w erach nowożytnych i kosmicznych",
    rpMult: 1.20,
    prodMult: 1.0,
    energyMult: 1.35,
    clickRpBonus: 1,
    clickProdBonus: 0,
    uniqueGenDiscount: 0.15,
    homeProvince: "japan_core"
  },
  {
    id: "usa",
    name: "Stany Zjednoczone",
    flag: "🇺🇸",
    desc: "Kapitalizm, innowacje Doliny Krzemowej oraz program podboju kosmosu.",
    bonusDesc: "+15% RP, +15% Produkcji, +20% Energii",
    rpMult: 1.15,
    prodMult: 1.15,
    energyMult: 1.20,
    clickRpBonus: 1,
    clickProdBonus: 1,
    uniqueGenDiscount: 0.1,
    homeProvince: "na_east"
  },
  {
    id: "china",
    name: "Chiny",
    flag: "🇨🇳",
    desc: "Tysiąclecia tradycji, wynalazcy papieru i prochu, globalna fabryka świata.",
    bonusDesc: "+40% do zbierania, +25% do Materiałów",
    rpMult: 1.05,
    prodMult: 1.25,
    energyMult: 1.1,
    clickRpBonus: 2,
    clickProdBonus: 3,
    uniqueGenDiscount: 0.15,
    homeProvince: "china_core"
  },
  {
    id: "egypt",
    name: "Starożytny Egipt",
    flag: "🇪🇬",
    desc: "Twórcy monumentalnych piramid, astronomii i wczesnej medycyny nad Nilem.",
    bonusDesc: "Monumentalizm: Podwójna produkcja kamienia i wczesnych technologii",
    rpMult: 1.15,
    prodMult: 1.25,
    energyMult: 1.0,
    clickRpBonus: 1,
    clickProdBonus: 2,
    uniqueGenDiscount: 0.25,
    homeProvince: "egypt_core"
  }
];

// --- DEFINICJA PROWINCJI MAPY ŚWIATA ---
const WORLD_PROVINCES = [
  // EUROPA
  {
    id: "poland_core",
    name: "Polska i Europa Środkowa",
    path: "M 480 150 L 530 145 L 540 185 L 490 195 Z",
    cx: 510, cy: 170,
    initialOwner: "poland",
    initialGarrison: 1000,
    bonus: "+15% RP, +5 Materiałów/s",
    cost: 50,
    desc: "Serce Europy, bogate w żyzne niziny rolnicze oraz złoża surowców."
  },
  {
    id: "germany_core",
    name: "Europa Zachodnia i Ren",
    path: "M 440 145 L 480 150 L 490 195 L 435 190 Z",
    cx: 460, cy: 170,
    initialOwner: "germany",
    initialGarrison: 2000,
    bonus: "+25% Produkcji, +10 Materiałów/s",
    cost: 60,
    desc: "Przemysłowy bastion z bogatymi złożami węgla i żelaza."
  },
  {
    id: "nordics",
    name: "Skandynawia i Bałtyk",
    path: "M 460 85 L 535 80 L 525 140 L 470 140 Z",
    cx: 495, cy: 110,
    initialOwner: "wild",
    initialGarrison: 1000,
    bonus: "+10 Energii/s, +10% Nauki",
    cost: 150,
    desc: "Zimne krainy fiordów, bogate w zasoby leśne, rudy i energię wiatru."
  },
  {
    id: "mediterranean",
    name: "Morze Śródziemne i Bałkany",
    path: "M 445 195 L 540 190 L 535 240 L 450 240 Z",
    cx: 490, cy: 215,
    initialOwner: "wild",
    initialGarrison: 1500,
    bonus: "+15 Materiałów/s, Szlaki handlowe",
    cost: 180,
    desc: "Kolebka antycznych filozofów, żeglarstwa i wymiany dóbr."
  },
  {
    id: "eastern_steppe",
    name: "Nizina Wschodnioeuropejska",
    path: "M 535 110 L 630 100 L 620 180 L 540 185 Z",
    cx: 575, cy: 145,
    initialOwner: "wild",
    initialGarrison: 2500,
    bonus: "+20 Materiałów/s, +20% rolnictwa",
    cost: 240,
    desc: "Olbrzymie czarnoziemy i nieprzebyte przestrzenie kontynentu."
  },

  // AMERYKA PÓŁNOCNA
  {
    id: "na_east",
    name: "Wschodnie Wybrzeże USA",
    path: "M 230 160 L 310 160 L 300 230 L 240 230 Z",
    cx: 270, cy: 195,
    initialOwner: "usa",
    initialGarrison: 3000,
    bonus: "+20% Nauki, +20 Energii/s",
    cost: 120,
    desc: "Metropolie naukowe, centra giełdowe i nowoczesne porty oceaniczne."
  },
  {
    id: "na_west",
    name: "Zachodnie Wybrzeże & Pacyfik",
    path: "M 150 150 L 230 160 L 240 230 L 160 220 Z",
    cx: 195, cy: 190,
    initialOwner: "wild",
    initialGarrison: 2000,
    bonus: "+30% Nauki (Dolina Krzemowa)",
    cost: 300,
    desc: "Górzyste wybrzeże i stolica światowych innowacji technologicznych."
  },
  {
    id: "na_north",
    name: "Kanadyjska Tundra i Arktyka",
    path: "M 160 70 L 320 70 L 300 155 L 170 145 Z",
    cx: 240, cy: 110,
    initialOwner: "wild",
    initialGarrison: 1500,
    bonus: "+25 Materiałów/s, Złoża minerałów",
    cost: 350,
    desc: "Arktyczne obszary bogate w złoża ropy, uranu i metali ziem rzadkich."
  },

  // AZJA
  {
    id: "china_core",
    name: "Dolina Rzeki Żółtej (Chiny)",
    path: "M 700 170 L 790 170 L 800 250 L 690 250 Z",
    cx: 745, cy: 210,
    initialOwner: "china",
    initialGarrison: 4000,
    bonus: "+35% Produkcji, +30 Materiałów/s",
    cost: 100,
    desc: "Kolebka dynastii, wielkich wynalazków i nieprzebranych rzesz pracowników."
  },
  {
    id: "japan_core",
    name: "Wyspy Japońskie",
    path: "M 825 180 L 870 175 L 860 240 L 820 235 Z",
    cx: 845, cy: 205,
    initialOwner: "japan",
    initialGarrison: 2500,
    bonus: "+40% Energii, +20% Nauki",
    cost: 140,
    desc: "Kwitnące wyspy słynące z precyzji, robotyki i automatyzacji."
  },
  {
    id: "siberia",
    name: "Syberia i Azja Północna",
    path: "M 630 80 L 850 70 L 830 165 L 630 165 Z",
    cx: 740, cy: 120,
    initialOwner: "wild",
    initialGarrison: 3000,
    bonus: "+50 Materiałów/s, +30 Energii/s",
    cost: 600,
    desc: "Niewyczerpane surowce naturalne ukryte pod wieczną zmarzliną."
  },
  {
    id: "india",
    name: "Półwysep Indyjski",
    path: "M 660 245 L 730 245 L 710 330 L 660 300 Z",
    cx: 690, cy: 285,
    initialOwner: "wild",
    initialGarrison: 3500,
    bonus: "+25% Nauki, +25 Materiałów/s",
    cost: 400,
    desc: "Prastare cywilizacje rzeki Indus, wiedza matematyczna i bogactwo przypraw."
  },

  // AFRYKA I BLISKI WSCHÓD
  {
    id: "egypt_core",
    name: "Dolina Nilu i Lewant",
    path: "M 530 235 L 610 235 L 590 310 L 530 300 Z",
    cx: 565, cy: 270,
    initialOwner: "egypt",
    initialGarrison: 2000,
    bonus: "+20% Nauki, +20 Materiałów/s",
    cost: 80,
    desc: "Żyzne delty Nilu, grobowce faraonów i pierwsze obserwatoria nieba."
  },
  {
    id: "africa_sub",
    name: "Afryka Subsaharyjska",
    path: "M 480 305 L 600 305 L 570 440 L 500 420 Z",
    cx: 540, cy: 370,
    initialOwner: "wild",
    initialGarrison: 2000,
    bonus: "+40 Materiałów/s, Diamenty i Złoto",
    cost: 450,
    desc: "Bogate złoża złota, litu i diamentów niezbędnych w nowoczesnym przemyśle."
  },

  // AMERYKA POŁUDNIOWA & AUSTRALIA
  {
    id: "south_america",
    name: "Ameryka Południowa (Amazonia)",
    path: "M 270 290 L 360 290 L 330 450 L 260 400 Z",
    cx: 310, cy: 370,
    initialOwner: "wild",
    initialGarrison: 2500,
    bonus: "+30 Materiałów/s, +20 Energii/s",
    cost: 500,
    desc: "Zielone płuca planety o niespotykanej bioróżnorodności i hydroenergii."
  },
  {
    id: "australia",
    name: "Australia i Oceania",
    path: "M 780 340 L 890 330 L 880 430 L 780 430 Z",
    cx: 835, cy: 380,
    initialOwner: "wild",
    initialGarrison: 2000,
    bonus: "+40 Energii/s, Kosmiczne stacje nasłuchowe",
    cost: 550,
    desc: "Kontynent bogaty w złoża uranu, energii słonecznej i radioteleskopów."
  }
];

// --- DEFINICJA DRZEWKA TECHNOLOGICZNEGO ---
const TECH_TREE = [
  // EPOKA KAMIENIA
  {
    id: "fire",
    name: "Rozniecanie Ognia",
    era: "stone",
    eraName: "Epoka Kamienia",
    icon: "🔥",
    desc: "Opanowanie ognia pozwoliło przetrwać zimne noce i zapoczątkowało rozwój ludzkości.",
    cost: { rp: 10, prod: 0, energy: 0 },
    reqs: [],
    x: 100,
    y: 280,
    effects: ["Klikanie 'Badaj' daje +2 RP zamiast +1", "Odblokowuje ognisko plemienne"]
  },
  {
    id: "stone_tools",
    name: "Narzędzia Kamienne",
    era: "stone",
    eraName: "Epoka Kamienia",
    icon: "🪓",
    desc: "Pierwsze prymitywne ostrza i pięściaki do pozyskiwania drewna i krzemienia.",
    cost: { rp: 15, prod: 5, energy: 0 },
    reqs: ["fire"],
    x: 340,
    y: 180,
    effects: ["Klikanie 'Zbieraj' daje +2 materiałów", "Zwiększa produkcję o 20%"]
  },
  {
    id: "cave_paintings",
    name: "Malarstwo Jaskiniowe",
    era: "stone",
    eraName: "Epoka Kamienia",
    icon: "🎨",
    desc: "Symboliczne rejestrowanie wiedzy i wierzeń przodków.",
    cost: { rp: 25, prod: 0, energy: 0 },
    reqs: ["fire"],
    x: 340,
    y: 380,
    effects: ["Generuje pasywnie +1 RP/s", "Odblokowuje Szamana Plemiennego"]
  },
  {
    id: "agriculture",
    name: "Rolnictwo i Osadnictwo",
    era: "stone",
    eraName: "Epoka Kamienia",
    icon: "🌾",
    desc: "Porzucenie koczowniczego trybu życia na rzecz stałych upraw i hodowli.",
    cost: { rp: 60, prod: 30, energy: 0 },
    reqs: ["stone_tools", "cave_paintings"],
    x: 580,
    y: 280,
    effects: ["Odblokowuje Osadę Rolniczą", "+2 Materiałów/s pasywnie", "Umożliwia ruch i ekspansję armii na mapie"]
  },

  // EPOKA BRĄZU I ŻELAZA
  {
    id: "pottery",
    name: "Garncarstwo i Koło",
    era: "bronze",
    eraName: "Epoka Brązu i Żelaza",
    icon: "🏺",
    desc: "Przechowywanie zapasów i łatwiejszy transport ładunków.",
    cost: { rp: 140, prod: 80, energy: 0 },
    reqs: ["agriculture"],
    x: 840,
    y: 160,
    effects: ["Wydajność zbierania materiałów x2", "Odblokowuje Magazyn"]
  },
  {
    id: "metallurgy",
    name: "Metalurgia Brązu",
    era: "bronze",
    eraName: "Epoka Brązu i Żelaza",
    icon: "⚔️",
    desc: "Wytapianie miedzi i cyny dało początek trwałym narzędziom i orężu.",
    cost: { rp: 220, prod: 150, energy: 0 },
    reqs: ["agriculture"],
    x: 840,
    y: 380,
    effects: ["Odblokowuje Kuźnię Brązu", "+5 Materiałów/s", "+15 Siły Ognia Armii ⚔️"]
  },
  {
    id: "writing",
    name: "Pismo Klinowe",
    era: "bronze",
    eraName: "Epoka Brązu i Żelaza",
    icon: "📜",
    desc: "Zapisywanie praw, handlu i wiedzy dla przyszłych pokoleń.",
    cost: { rp: 350, prod: 100, energy: 0 },
    reqs: ["pottery"],
    x: 1080,
    y: 160,
    effects: ["Pasywne RP +5/s", "Odblokowuje Bibliotekę", "Odblokowuje traktaty dyplomatyczne na mapie"]
  },
  {
    id: "iron_working",
    name: "Obróbka Żelaza",
    era: "bronze",
    eraName: "Epoka Brązu i Żelaza",
    icon: "🛡️",
    desc: "Twardszy metal pozwolił na budowę solidnych maszyn i wielkich fortec.",
    cost: { rp: 500, prod: 300, energy: 0 },
    reqs: ["metallurgy"],
    x: 1080,
    y: 380,
    effects: ["Podwaja produkcję budynków materiałowych", "+35 Siły Ognia Armii ⚔️"]
  },

  // REWOLUCJA PRZEMYSŁOWA
  {
    id: "printing_press",
    name: "Druk Gutenberga",
    era: "steam",
    eraName: "Rewolucja Przemysłowa",
    icon: "📖",
    desc: "Masowy druk książek zapoczątkował erę powszechnej edukacji i nauki.",
    cost: { rp: 1200, prod: 600, energy: 0 },
    reqs: ["writing"],
    x: 1340,
    y: 160,
    effects: ["Zwiększa pasywny przyrost RP o +50%", "Odblokowuje Akademię Nauk"]
  },
  {
    id: "steam_engine",
    name: "Silnik Parowy",
    era: "steam",
    eraName: "Rewolucja Przemysłowa",
    icon: "🚂",
    desc: "Węgiel i para zastąpiły siłę mięśni, a kolej przyspieszyła marsz wojsk.",
    cost: { rp: 1800, prod: 1200, energy: 0 },
    reqs: ["iron_working"],
    x: 1340,
    y: 380,
    effects: ["Odblokowuje Fabrykę Parową", "+30 Materiałów/s", "+60 Siły Armii"]
  },
  {
    id: "electricity",
    name: "Elektryczność",
    era: "steam",
    eraName: "Rewolucja Przemysłowa",
    icon: "💡",
    desc: "Poskromienie prądu elektrycznego otworzyło bramy do nowoczesności.",
    cost: { rp: 3200, prod: 2000, energy: 0 },
    reqs: ["printing_press", "steam_engine"],
    x: 1600,
    y: 280,
    effects: ["Odblokowuje zasób: ENERGIA ⚡", "Odblokowuje Elektrownię Węglową"]
  },

  // WIEK ATOMU I KRZEMU
  {
    id: "assembly_line",
    name: "Linia Produkcyjna",
    era: "atomic",
    eraName: "Wiek Atomu i Krzemu",
    icon: "🏭",
    desc: "Masowa standaryzacja i automatyzacja procesów montażowych czołgów i sprzętu.",
    cost: { rp: 6500, prod: 4500, energy: 50 },
    reqs: ["electricity"],
    x: 1860,
    y: 160,
    effects: ["Wszystkie budynki produkcyjne działają 2x szybciej", "Rekrutacja wojsk 50% tańsza"]
  },
  {
    id: "nuclear_fission",
    name: "Rozszczepienie Jądra",
    era: "atomic",
    eraName: "Wiek Atomu i Krzemu",
    icon: "☢️",
    desc: "Niewyobrażalna potęga ukryta w jądrze atomu.",
    cost: { rp: 9000, prod: 6000, energy: 100 },
    reqs: ["electricity"],
    x: 1860,
    y: 380,
    effects: ["Odblokowuje Reaktor Jądrowy (+50 Energii/s)", "Daje status Mocarstwa Atomowego (+200 Siły Ognia)"]
  },
  {
    id: "microprocessor",
    name: "Mikroprocesory",
    era: "atomic",
    eraName: "Wiek Atomu i Krzemu",
    icon: "💻",
    desc: "Układy scalone o miliardach tranzystorów sterujące cyfrowym światem.",
    cost: { rp: 15000, prod: 10000, energy: 200 },
    reqs: ["assembly_line"],
    x: 2120,
    y: 160,
    effects: ["Odblokowuje Centrum Obliczeniowe (+100 RP/s)"]
  },
  {
    id: "internet",
    name: "Globalna Sieć (Internet)",
    era: "atomic",
    eraName: "Wiek Atomu i Krzemu",
    icon: "🌐",
    desc: "Połączenie umysłów całej planety w jedną sieć informacyjną.",
    cost: { rp: 25000, prod: 15000, energy: 400 },
    reqs: ["microprocessor"],
    x: 2360,
    y: 160,
    effects: ["Mnożnik badań naukowych x3"]
  },
  {
    id: "rocketry",
    name: "Technologia Rakietowa",
    era: "atomic",
    eraName: "Wiek Atomu i Krzemu",
    icon: "🚀",
    desc: "Przełamanie grawitacji Ziemi i pierwsze satelity na orbicie.",
    cost: { rp: 30000, prod: 25000, energy: 600 },
    reqs: ["nuclear_fission", "assembly_line"],
    x: 2240,
    y: 380,
    effects: ["Odblokowuje Kosmodrom", "+150 Materiałów/s"]
  },

  // ERA KOSMICZNA
  {
    id: "quantum_computing",
    name: "Komputery Kwantowe",
    era: "future",
    eraName: "Era Kosmiczna",
    icon: "🔮",
    desc: "Kwantowa superpozycja rozwiązująca problemy nieosiągalne dla klasycznych maszyn.",
    cost: { rp: 60000, prod: 40000, energy: 1200 },
    reqs: ["internet"],
    x: 2600,
    y: 160,
    effects: ["Pasywne RP +500/s", "Automatyczne badania wspomagane AI"]
  },
  {
    id: "fusion_power",
    name: "Fuzja Termojądrowa",
    era: "future",
    eraName: "Era Kosmiczna",
    icon: "☀️",
    desc: "Sztuczne słońce na Ziemi dostarczające niewyczerpanej, czystej energii.",
    cost: { rp: 75000, prod: 55000, energy: 2000 },
    reqs: ["rocketry"],
    x: 2520,
    y: 380,
    effects: ["+500 Energii/s", "Usuwa wszelkie limity energetyczne"]
  },
  {
    id: "dyson_sphere",
    name: "Sfera Dysona",
    era: "future",
    eraName: "Era Kosmiczna",
    icon: "🪐",
    desc: "Megastruktura przechwytująca pełną moc gwiazdy. Cywilizacja osiąga Typ II!",
    cost: { rp: 150000, prod: 120000, energy: 5000 },
    reqs: ["quantum_computing", "fusion_power"],
    x: 2820,
    y: 280,
    effects: ["Zwycięstwo naukowe! Cywilizacja staje się międzygwiezdnym imperium!"]
  }
];

// GENERATORY / BUDYNKI
const GENERATORS = [
  {
    id: "shaman",
    name: "Mędrzec / Szaman",
    emoji: "🧙‍♂️",
    unlockedBy: "cave_paintings",
    baseCost: 20,
    costType: "prod",
    rpYield: 1.2,
    prodYield: 0,
    energyYield: 0,
    count: 0
  },
  {
    id: "gatherer_hut",
    name: "Chata Zbieraczy",
    emoji: "🛖",
    unlockedBy: "stone_tools",
    baseCost: 15,
    costType: "rp",
    rpYield: 0,
    prodYield: 1.5,
    energyYield: 0,
    count: 0
  },
  {
    id: "farm",
    name: "Osada Rolnicza",
    emoji: "🏡",
    unlockedBy: "agriculture",
    baseCost: 75,
    costType: "prod",
    rpYield: 0.5,
    prodYield: 4.0,
    energyYield: 0,
    count: 0
  },
  {
    id: "library",
    name: "Starożytna Biblioteka",
    emoji: "🏛️",
    unlockedBy: "writing",
    baseCost: 250,
    costType: "prod",
    rpYield: 8.0,
    prodYield: 0,
    energyYield: 0,
    count: 0
  },
  {
    id: "forge",
    name: "Kuźnia Żelaza",
    emoji: "⚒️",
    unlockedBy: "iron_working",
    baseCost: 500,
    costType: "prod",
    rpYield: 0,
    prodYield: 18.0,
    energyYield: 0,
    count: 0
  },
  {
    id: "steam_factory",
    name: "Fabryka Parowa",
    emoji: "🏭",
    unlockedBy: "steam_engine",
    baseCost: 1600,
    costType: "prod",
    rpYield: 0,
    prodYield: 50.0,
    energyYield: 0,
    count: 0
  },
  {
    id: "coal_plant",
    name: "Elektrownia Węglowa",
    emoji: "⚡",
    unlockedBy: "electricity",
    baseCost: 2500,
    costType: "prod",
    rpYield: 0,
    prodYield: 0,
    energyYield: 15.0,
    count: 0
  },
  {
    id: "nuclear_plant",
    name: "Reaktor Jądrowy",
    emoji: "☢️",
    unlockedBy: "nuclear_fission",
    baseCost: 8000,
    costType: "prod",
    rpYield: 0,
    prodYield: 0,
    energyYield: 60.0,
    count: 0
  },
  {
    id: "ai_datacenter",
    name: "Centrum Superkomputerowe",
    emoji: "🖥️",
    unlockedBy: "microprocessor",
    baseCost: 15000,
    costType: "prod",
    rpYield: 120.0,
    prodYield: 0,
    energyYield: -20.0,
    count: 0
  },
  {
    id: "orbital_station",
    name: "Stacja Orbitalna",
    emoji: "🛰️",
    unlockedBy: "rocketry",
    baseCost: 35000,
    costType: "prod",
    rpYield: 300.0,
    prodYield: 250.0,
    energyYield: -50.0,
    count: 0
  }
];

// STAN GRY
let state = {
  rp: 0,
  prod: 0,
  energy: 0,
  baseClickRp: 1,
  baseClickProd: 1,
  researched: new Set(),
  generators: {},
  soundEnabled: true,
  currentEra: "stone",
  selectedCountry: "poland",
  alliances: new Set(),
  provinceOwnership: {},
  provinceGarrisons: {},
  // Stan Armii Polowej Gracza:
  armySize: 1000, // Zaczyna z 1000 żołnierzy
  armyLocation: "poland_core" // ID prowincji, w której stacjonuje armia
};

// Inicjalizacja domyślnych danych mapy
WORLD_PROVINCES.forEach(p => {
  state.provinceOwnership[p.id] = p.initialOwner;
  state.provinceGarrisons[p.id] = p.initialGarrison;
});

// SYNTEZATOR DŹWIĘKÓW WEBAUDIO
let audioCtx = null;
function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'research') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'buy') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'march') {
      // Dźwięk marszu bębnów wojennych
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'battle_win') {
      // Dźwięk wygranej bitwy
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(392, now + 0.15);
      osc.frequency.setValueAtTime(523, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'battle_loss') {
      // Dźwięk odwrotu
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'ally') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.setValueAtTime(450, now + 0.15);
      osc.frequency.setValueAtTime(600, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + idx * 0.15);
        g.gain.setValueAtTime(0.25, now + idx * 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.4);
        o.start(now + idx * 0.15);
        o.stop(now + idx * 0.15 + 0.4);
      });
    }
  } catch (e) {
    console.warn("Audio Context issue:", e);
  }
}

// FORMATOWANIE LICZB
function formatNumber(num) {
  if (num === undefined || num === null) return "0";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return Math.floor(num).toLocaleString('pl-PL');
}

// OBLICZANIE SIŁY MILITARNEJ I RANGI WOJSK
function getPlayerMilitaryPower() {
  let power = 10;
  if (state.researched.has("metallurgy")) power += 15;
  if (state.researched.has("iron_working")) power += 35;
  if (state.researched.has("steam_engine")) power += 60;
  if (state.researched.has("nuclear_fission")) power += 200;
  if (state.researched.has("rocketry")) power += 150;

  const ownedCount = Object.values(state.provinceOwnership).filter(o => o === state.selectedCountry).length;
  power += (ownedCount * 5);
  return power;
}

function getArmyRankName(size) {
  if (size < 2000) return "Wojownicy Plemion (Lekka)";
  if (size < 5000) return "Legion / Zbrojne Chorągwie";
  if (size < 10000) return "Dywizja Piechoty i Artylerii";
  if (size < 25000) return "Korpus Pancerno-Zmotoryzowany";
  return "Armia Kosmiczno-Strategiczna";
}

// INICJALIZACJA GENERATORÓW
GENERATORS.forEach(g => {
  state.generators[g.id] = 0;
});

// ZARZĄDZANIE KRAJEM
function getCurrentCountry() {
  return NATIONS.find(n => n.id === state.selectedCountry) || NATIONS[0];
}

function updateCountryUI() {
  const current = getCurrentCountry();
  document.getElementById("badgeFlag").textContent = current.flag;
  document.getElementById("badgeName").textContent = current.name;
  document.getElementById("badgePerk").textContent = current.bonusDesc.split(',')[0];

  const ownedCount = Object.values(state.provinceOwnership).filter(o => o === state.selectedCountry).length;
  document.getElementById("ownedProvincesCount").textContent = `${ownedCount} / ${WORLD_PROVINCES.length}`;
  document.getElementById("militaryPowerVal").textContent = `${getPlayerMilitaryPower()} ⚔️`;

  // UI Armii
  document.getElementById("armySoldiersCount").textContent = state.armySize.toLocaleString('pl-PL');
  document.getElementById("armyRankName").textContent = getArmyRankName(state.armySize);
  
  const currentProv = WORLD_PROVINCES.find(p => p.id === state.armyLocation);
  document.getElementById("armyLocationTag").textContent = currentProv ? `Stacjonuje: ${currentProv.name.split(' ')[0]}` : "W drodze";

  updateRecruitButtons();
}

// REKRUTACJA WOJSK (1000, 2000, 5000)
function getRecruitCost(amount) {
  let base = (amount / 1000) * 100;
  if (amount === 2000) base = 180; // rabat hurtowy
  if (amount === 5000) base = 400; // rabat hurtowy
  if (state.researched.has("assembly_line")) base *= 0.5;
  return Math.floor(base);
}

function updateRecruitButtons() {
  const cost1000 = getRecruitCost(1000);
  const cost2000 = getRecruitCost(2000);
  const cost5000 = getRecruitCost(5000);

  document.getElementById("costRecruit1000").textContent = `${formatNumber(cost1000)} ⚙️`;
  document.getElementById("costRecruit2000").textContent = `${formatNumber(cost2000)} ⚙️`;
  document.getElementById("costRecruit5000").textContent = `${formatNumber(cost5000)} ⚙️`;

  document.getElementById("btnRecruit1000").disabled = state.prod < cost1000;
  document.getElementById("btnRecruit2000").disabled = state.prod < cost2000;
  document.getElementById("btnRecruit5000").disabled = state.prod < cost5000;
}

function recruitSoldiers(amount) {
  const cost = getRecruitCost(amount);
  if (state.prod >= cost) {
    state.prod -= cost;
    state.armySize += amount;
    playSound("buy");
    showToast(`🪖 Powołano pod broń +${amount.toLocaleString('pl-PL')} żołnierzy! Łączna armia: ${state.armySize.toLocaleString('pl-PL')}.`);
    updateCountryUI();
    renderWorldMap();
    saveGame();
  }
}

document.getElementById("btnRecruit1000").addEventListener("click", () => recruitSoldiers(1000));
document.getElementById("btnRecruit2000").addEventListener("click", () => recruitSoldiers(2000));
document.getElementById("btnRecruit5000").addEventListener("click", () => recruitSoldiers(5000));

// MODAL WYBORU KRAJU
const countryModal = document.getElementById("countryModal");
const countryGrid = document.getElementById("countrySelectionGrid");

function openCountrySelectionModal() {
  countryGrid.innerHTML = "";
  NATIONS.forEach(nat => {
    const isCurrent = nat.id === state.selectedCountry;
    const card = document.createElement("div");
    card.className = `country-select-card ${isCurrent ? 'active-country' : ''}`;
    card.innerHTML = `
      <div class="card-flag">${nat.flag}</div>
      <div class="card-country-name">${nat.name}</div>
      <p class="card-country-desc">${nat.desc}</p>
      <div class="card-country-bonus">✨ ${nat.bonusDesc}</div>
    `;

    card.addEventListener("click", () => {
      setPlayerCountry(nat.id);
      countryModal.setAttribute("hidden", "");
    });

    countryGrid.appendChild(card);
  });

  countryModal.removeAttribute("hidden");
}

function setPlayerCountry(countryId) {
  state.selectedCountry = countryId;
  const current = getCurrentCountry();

  if (current.homeProvince) {
    state.provinceOwnership[current.homeProvince] = countryId;
    state.armyLocation = current.homeProvince; // Przemieszczenie armii do nowej stolicy
  }

  updateCountryUI();
  renderNationsTab();
  renderWorldMap();
  showToast(`Wybrano kraj: ${current.name} ${current.flag}! Twoja armia stacjonuje w stolicy.`);
  playSound("buy");
  saveGame();
}

document.getElementById("countryBadge").addEventListener("click", openCountrySelectionModal);
document.getElementById("btnOpenCountries").addEventListener("click", (e) => {
  e.stopPropagation();
  openCountrySelectionModal();
});
document.getElementById("countryModalClose").addEventListener("click", () => {
  countryModal.setAttribute("hidden", "");
});
countryModal.addEventListener("click", (e) => {
  if (e.target === countryModal) countryModal.setAttribute("hidden", "");
});

// PRZEŁĄCZNIK WIDOKÓW (MAPA vs DRZEWKO)
const btnViewTree = document.getElementById("btnViewTree");
const btnViewMap = document.getElementById("btnViewMap");
const viewTreeContainer = document.getElementById("viewTreeContainer");
const viewMapContainer = document.getElementById("viewMapContainer");
const modeInfoTag = document.getElementById("modeInfoTag");

btnViewTree.addEventListener("click", () => {
  btnViewTree.classList.add("active");
  btnViewMap.classList.remove("active");
  viewTreeContainer.style.display = "flex";
  viewMapContainer.style.display = "none";
  modeInfoTag.textContent = "Opracowuj technologie, aby zyskać przewagę na arenie międzynarodowej!";
  renderTreeNodes();
  updateTransform();
});

btnViewMap.addEventListener("click", () => {
  btnViewMap.classList.add("active");
  btnViewTree.classList.remove("active");
  viewTreeContainer.style.display = "none";
  viewMapContainer.style.display = "flex";
  modeInfoTag.textContent = "Wybierz prowincję na mapie i kliknij 'Wyślij Armię', aby ruszyć swoje wojska!";
  renderWorldMap();
});

// INTERAKTYWNA MAPA ŚWIATA (SVG, PROWINCJE I RUCH ARMII)
const mapProvincesGroup = document.getElementById("mapProvincesGroup");
const mapCapitalsGroup = document.getElementById("mapCapitalsGroup");
const mapArmiesGroup = document.getElementById("mapArmiesGroup");
const mapMarchLineGroup = document.getElementById("mapMarchLineGroup");
const provinceFloatCard = document.getElementById("provinceFloatCard");
const btnMarchArmy = document.getElementById("btnMarchArmy");
let selectedProvince = null;

function renderWorldMap() {
  mapProvincesGroup.innerHTML = "";
  mapCapitalsGroup.innerHTML = "";
  mapArmiesGroup.innerHTML = "";
  mapMarchLineGroup.innerHTML = "";

  WORLD_PROVINCES.forEach(prov => {
    const owner = state.provinceOwnership[prov.id] || prov.initialOwner;
    const isPlayer = owner === state.selectedCountry;
    const isAlly = state.alliances.has(owner);
    const isWild = owner === "wild";

    let ownerClass = "rival-owned";
    if (isPlayer) ownerClass = "player-owned";
    else if (isAlly) ownerClass = "ally-owned";
    else if (isWild) ownerClass = "wild-unclaimed";

    // Ścieżka SVG prowincji
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", prov.path);
    pathEl.setAttribute("class", `province-path ${ownerClass}`);
    pathEl.setAttribute("id", `prov-${prov.id}`);

    pathEl.addEventListener("click", () => {
      openProvinceCard(prov);
    });

    mapProvincesGroup.appendChild(pathEl);

    // Etykieta / Nazwa
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", prov.cx);
    textEl.setAttribute("y", prov.cy - 10);
    textEl.setAttribute("class", "map-label");
    
    const ownerNation = NATIONS.find(n => n.id === owner);
    const flag = ownerNation ? ownerNation.flag : "🚩";
    textEl.textContent = `${flag} ${prov.name.split(' ')[0]}`;
    mapCapitalsGroup.appendChild(textEl);

    // Etykieta garnizonu obrońców (jeśli nie należy do gracza)
    if (!isPlayer) {
      const garrisonCount = state.provinceGarrisons[prov.id] || prov.initialGarrison;
      const gText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      gText.setAttribute("x", prov.cx);
      gText.setAttribute("y", prov.cy + 12);
      gText.setAttribute("class", "garrison-tag-text");
      gText.textContent = `🛡️ ${formatNumber(garrisonCount)}`;
      mapCapitalsGroup.appendChild(gText);
    }
  });

  // RYSOWANIE ARMII GRACZA
  const currentArmyProv = WORLD_PROVINCES.find(p => p.id === state.armyLocation) || WORLD_PROVINCES[0];
  if (currentArmyProv) {
    const armyGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    armyGroup.setAttribute("class", "army-token-group");
    armyGroup.setAttribute("transform", `translate(${currentArmyProv.cx}, ${currentArmyProv.cy})`);

    // Znacznik kołowy
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", "16");
    circle.setAttribute("class", "army-token-circle");

    // Tekst liczby wojsk (np. 1k, 2k, 5k)
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("y", "4");
    label.setAttribute("class", "army-badge-text");
    label.textContent = state.armySize >= 1000 ? `${Math.floor(state.armySize / 1000)}k` : state.armySize;

    // Ikona hełmu
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "text");
    icon.setAttribute("y", "-18");
    icon.setAttribute("class", "map-label");
    icon.textContent = "🪖 TWOJA ARMIA";

    armyGroup.appendChild(circle);
    armyGroup.appendChild(label);
    armyGroup.appendChild(icon);

    mapArmiesGroup.appendChild(armyGroup);
  }

  // Rysowanie linii marszu, jeśli wybrano cel inny niż obecne miejsce armii
  if (selectedProvince && selectedProvince.id !== state.armyLocation) {
    const marchLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    marchLine.setAttribute("x1", currentArmyProv.cx);
    marchLine.setAttribute("y1", currentArmyProv.cy);
    marchLine.setAttribute("x2", selectedProvince.cx);
    marchLine.setAttribute("y2", selectedProvince.cy);
    marchLine.setAttribute("class", "march-arrow-line");
    mapMarchLineGroup.appendChild(marchLine);
  }

  updateCountryUI();
}

function openProvinceCard(prov) {
  selectedProvince = prov;
  const ownerId = state.provinceOwnership[prov.id];
  const isPlayer = ownerId === state.selectedCountry;
  const isAlly = state.alliances.has(ownerId);
  const ownerNation = NATIONS.find(n => n.id === ownerId);
  const isCurrentArmyHere = state.armyLocation === prov.id;
  const garrisonCount = state.provinceGarrisons[prov.id] || prov.initialGarrison;

  document.getElementById("pfcFlag").textContent = ownerNation ? ownerNation.flag : "🏴";
  document.getElementById("pfcName").textContent = prov.name;

  let ownerTitle = "Ziemia Niczyja / Dzika";
  if (isPlayer) ownerTitle = `Twoja prowincja (${ownerNation.name}) 👑`;
  else if (ownerNation) ownerTitle = `${ownerNation.name} ${isAlly ? '(Sojusznik 🤝)' : '(Wróg ⚔️)'}`;
  document.getElementById("pfcOwner").textContent = `Władca: ${ownerTitle}`;

  document.getElementById("pfcDesc").textContent = prov.desc;

  // Informacja o garnizonie
  const garrisonBox = document.getElementById("pfcGarrisonBox");
  if (isPlayer) {
    garrisonBox.innerHTML = `<span>Twój garnizon obronny:</span><strong style="color:#10b981;">Bezpieczne terytorium</strong>`;
  } else {
    garrisonBox.innerHTML = `<span>Obrońcy prowincji:</span><strong style="color:#ef4444;">${garrisonCount.toLocaleString('pl-PL')} Wojsk</strong>`;
  }

  document.getElementById("pfcPerks").innerHTML = `
    <div><strong>Bonus prowincji:</strong> ${prov.bonus}</div>
    <div><strong>Koszt zaopatrzenia marszu:</strong> ${prov.cost} ⚙️ Materiałów</div>
  `;

  // Logika przycisku marszu
  if (isCurrentArmyHere) {
    btnMarchArmy.textContent = "Twoja Armia już tu stacjonuje 🪖";
    btnMarchArmy.disabled = true;
    btnMarchArmy.style.opacity = "0.6";
  } else if (isAlly) {
    btnMarchArmy.textContent = "Przemarsz przez ziemie sojusznika (Wizyta dyplomatyczna) 🤝";
    btnMarchArmy.disabled = false;
    btnMarchArmy.style.opacity = "1";
  } else {
    const canAfford = state.prod >= prov.cost;
    const canMove = state.researched.has("agriculture") || isPlayer;

    if (!canMove) {
      btnMarchArmy.textContent = "Wymaga technologii: Rolnictwo i Osadnictwo";
      btnMarchArmy.disabled = true;
      btnMarchArmy.style.opacity = "0.5";
    } else if (!canAfford) {
      btnMarchArmy.textContent = `Brak zaopatrzenia na marsz (${formatNumber(prov.cost)} ⚙️)`;
      btnMarchArmy.disabled = true;
      btnMarchArmy.style.opacity = "0.5";
    } else {
      if (isPlayer) {
        btnMarchArmy.textContent = `Przebazuj Armię (${prov.cost} ⚙️)`;
      } else {
        const winChance = state.armySize > garrisonCount ? "Wysoka szansa zwycięstwa" : "Ryzyko porażki!";
        btnMarchArmy.textContent = `Atakuj prowincję! [${state.armySize} vs ${garrisonCount}] (${prov.cost} ⚙️)`;
      }
      btnMarchArmy.disabled = false;
      btnMarchArmy.style.opacity = "1";
    }
  }

  provinceFloatCard.removeAttribute("hidden");
  renderWorldMap(); // Rysuje linię marszu
}

// WYDANIE ROZKAZU MARSZU / BITWY
btnMarchArmy.addEventListener("click", () => {
  if (!selectedProvince) return;
  const prov = selectedProvince;
  if (state.armyLocation === prov.id) return;

  const cost = prov.cost;
  if (state.prod < cost) return;

  const ownerId = state.provinceOwnership[prov.id];
  const isPlayer = ownerId === state.selectedCountry;
  const isAlly = state.alliances.has(ownerId);
  const garrisonCount = state.provinceGarrisons[prov.id] || prov.initialGarrison;

  state.prod -= cost;
  playSound("march");

  // Jeśli prowincja nasza lub sojusznicza: bezkrwawy przemarsz
  if (isPlayer || isAlly) {
    state.armyLocation = prov.id;
    showToast(`🚩 Twoja armia (${state.armySize.toLocaleString('pl-PL')}) pomyślnie wkroczyła do: ${prov.name}.`);
    openProvinceCard(prov);
    renderWorldMap();
    updateUI();
    saveGame();
    return;
  }

  // BITWA O PROWINCJĘ
  const playerTechBonus = getPlayerMilitaryPower() / 100; // np. +0.50 siły ognia
  const effectiveArmyPower = state.armySize * (1 + playerTechBonus);

  if (effectiveArmyPower >= garrisonCount) {
    // ZWYCIĘSTWO GRACZA!
    const casualties = Math.floor(garrisonCount * 0.4);
    state.armySize = Math.max(200, state.armySize - casualties);
    state.provinceOwnership[prov.id] = state.selectedCountry;
    state.provinceGarrisons[prov.id] = 1000; // Zostawiono minimalny garnizon
    state.armyLocation = prov.id; // Armia wkracza triumfalnie

    playSound("battle_win");
    showToast(`🏆 ZWYCIĘSTWO W BITWIE! Prowincja ${prov.name} została podbita! Straty: -${casualties} żołnierzy.`);
  } else {
    // PORAŻKA / ODRZUCENIE ATAKU
    const casualties = Math.floor(state.armySize * 0.5);
    state.armySize = Math.max(100, state.armySize - casualties);
    state.provinceGarrisons[prov.id] = Math.max(100, garrisonCount - Math.floor(effectiveArmyPower * 0.5));

    playSound("battle_loss");
    showToast(`⚠️ PORAŻKA POD ${prov.name}! Wrogi garnizon odparł atak. Straty w armii: -${casualties} żołnierzy.`);
  }

  openProvinceCard(prov);
  renderWorldMap();
  updateCountryUI();
  updateUI();
  saveGame();
});

// ZAKŁADKI W PANELU BOCZNYM
const tabBtnGen = document.getElementById("tabBtnGen");
const tabBtnNations = document.getElementById("tabBtnNations");
const tabGenerators = document.getElementById("tabGenerators");
const tabNations = document.getElementById("tabNations");

tabBtnGen.addEventListener("click", () => {
  tabBtnGen.classList.add("active");
  tabBtnNations.classList.remove("active");
  tabGenerators.classList.add("active");
  tabNations.classList.remove("active");
});

tabBtnNations.addEventListener("click", () => {
  tabBtnNations.classList.add("active");
  tabBtnGen.classList.remove("active");
  tabNations.classList.add("active");
  tabGenerators.classList.remove("active");
  renderNationsTab();
});

// WIDOK KRAJÓW I DYPLOMACJI (ZAKŁADKA 2)
function renderNationsTab() {
  const container = document.getElementById("nationsList");
  container.innerHTML = "";

  NATIONS.forEach(nation => {
    const isPlayer = nation.id === state.selectedCountry;
    const isAlly = state.alliances.has(nation.id);

    const card = document.createElement("div");
    card.className = `nation-card ${isPlayer ? 'active-player' : ''}`;

    let statusHtml = "";
    if (isPlayer) {
      statusHtml = `<span class="nation-status-tag" style="color:#10b981; font-weight: bold;">Twój Kraj 👑</span>`;
    } else if (isAlly) {
      statusHtml = `<span class="nation-status-tag" style="color:#38bdf8; font-weight: bold;">Sojusznik 🤝</span>`;
    } else {
      statusHtml = `<span class="nation-status-tag">Relacje neutralne</span>`;
    }

    const allianceCost = 500;
    const canAlly = !isPlayer && !isAlly && state.prod >= allianceCost && state.researched.has("writing");

    card.innerHTML = `
      <div class="nation-card-top">
        <div class="nation-flag-name">
          <span style="font-size: 1.4rem;">${nation.flag}</span>
          <span>${nation.name}</span>
        </div>
        ${statusHtml}
      </div>
      <div class="nation-perk-text">${nation.bonusDesc}</div>
      <div class="nation-actions">
        ${isPlayer ? `
          <button class="btn-nation-action" disabled>Aktywny Naród</button>
        ` : isAlly ? `
          <button class="btn-nation-action" disabled>Pakiet Handlowy (+10% prod)</button>
        ` : `
          <button class="btn-nation-action btn-form-alliance" data-id="${nation.id}" ${canAlly ? '' : 'disabled'}>
            ${state.researched.has("writing") ? `Zawrzyj Pakt (${allianceCost} ⚙️)` : 'Wymaga: Pismo Klinowe'}
          </button>
          <button class="btn-nation-action btn-switch-nation" data-id="${nation.id}">
            Graj tym krajem
          </button>
        `}
      </div>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll(".btn-switch-nation").forEach(btn => {
    btn.addEventListener("click", () => {
      setPlayerCountry(btn.dataset.id);
    });
  });

  container.querySelectorAll(".btn-form-alliance").forEach(btn => {
    btn.addEventListener("click", () => {
      const natId = btn.dataset.id;
      const allianceCost = 500;
      if (state.prod >= allianceCost) {
        state.prod -= allianceCost;
        state.alliances.add(natId);
        playSound("ally");
        const nat = NATIONS.find(n => n.id === natId);
        showToast(`Zawarto traktat handlowy z: ${nat.name} ${nat.flag}!`);
        renderNationsTab();
        renderWorldMap();
        updateUI();
        saveGame();
      }
    });
  });
}

// PAN & ZOOM DLA DRZEWKA TECHNOLOGICZNEGO
let panX = 40;
let panY = 60;
let zoom = 1.0;
let isDragging = false;
let startX, startY;

const viewport = document.getElementById("treeViewport");
const canvas = document.getElementById("treeCanvas");

function updateTransform() {
  canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
}

viewport.addEventListener("mousedown", (e) => {
  if (e.target.closest(".tech-node")) return;
  isDragging = true;
  startX = e.clientX - panX;
  startY = e.clientY - panY;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  updateTransform();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

viewport.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomFactor = 1.1;
  const oldZoom = zoom;

  if (e.deltaY < 0) {
    zoom = Math.min(zoom * zoomFactor, 2.0);
  } else {
    zoom = Math.max(zoom / zoomFactor, 0.45);
  }

  const rect = viewport.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  panX = mouseX - (mouseX - panX) * (zoom / oldZoom);
  panY = mouseY - (mouseY - panY) * (zoom / oldZoom);

  updateTransform();
}, { passive: false });

document.getElementById("btnZoomIn").addEventListener("click", () => {
  zoom = Math.min(zoom * 1.2, 2.0);
  updateTransform();
});
document.getElementById("btnZoomOut").addEventListener("click", () => {
  zoom = Math.max(zoom / 1.2, 0.45);
  updateTransform();
});
document.getElementById("btnCenterTree").addEventListener("click", () => {
  panX = 60;
  panY = 100;
  zoom = 0.9;
  updateTransform();
});

// BUDOWANIE I RYSOWANIE DRZEWKA
const nodesContainer = document.getElementById("treeNodes");
const svgContainer = document.getElementById("treeSvg");

function getTechStatus(tech) {
  if (state.researched.has(tech.id)) return "researched";
  const reqsMet = tech.reqs.every(reqId => state.researched.has(reqId));
  if (reqsMet) return "available";
  return "locked";
}

function renderTreeNodes() {
  nodesContainer.innerHTML = "";
  
  TECH_TREE.forEach(tech => {
    const status = getTechStatus(tech);
    const nodeEl = document.createElement("div");
    nodeEl.className = `tech-node ${status}`;
    nodeEl.id = `node-${tech.id}`;
    nodeEl.style.left = `${tech.x}px`;
    nodeEl.style.top = `${tech.y}px`;
    nodeEl.dataset.era = tech.era;

    let badgeText = "Zablokowane";
    if (status === "researched") badgeText = "✓ Opracowano";
    else if (status === "available") badgeText = "Do zbadania";

    let costStr = `${formatNumber(tech.cost.rp)} RP`;
    if (tech.cost.prod > 0) costStr += ` | ${formatNumber(tech.cost.prod)} ⚙️`;
    if (tech.cost.energy > 0) costStr += ` | ${formatNumber(tech.cost.energy)} ⚡`;

    nodeEl.innerHTML = `
      <div class="node-header">
        <div class="node-icon">${tech.icon}</div>
        <div>
          <div class="node-title">${tech.name}</div>
          <div class="node-era">${tech.eraName}</div>
        </div>
      </div>
      <div class="node-footer">
        <span class="node-status-badge">${badgeText}</span>
        <span class="node-cost-tag">${status === 'researched' ? 'Aktywna' : costStr}</span>
      </div>
    `;

    nodeEl.addEventListener("click", () => {
      openTechModal(tech);
    });

    nodesContainer.appendChild(nodeEl);
  });

  renderConnections();
  updateProgressBadge();
}

function renderConnections() {
  svgContainer.innerHTML = "";
  const nodeWidth = 220;
  const nodeHeight = 110;

  TECH_TREE.forEach(tech => {
    tech.reqs.forEach(reqId => {
      const parentTech = TECH_TREE.find(t => t.id === reqId);
      if (!parentTech) return;

      const startX = parentTech.x + nodeWidth;
      const startY = parentTech.y + (nodeHeight / 2);
      const endX = tech.x;
      const endY = tech.y + (nodeHeight / 2);

      const dx = (endX - startX) * 0.55;
      const pathData = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);

      const isResearched = state.researched.has(tech.id);
      const isParentResearched = state.researched.has(parentTech.id);

      if (isResearched) {
        path.setAttribute("class", "researched");
      } else if (isParentResearched) {
        path.setAttribute("class", "available");
      } else {
        path.setAttribute("class", "locked");
      }

      svgContainer.appendChild(path);
    });
  });
}

function updateProgressBadge() {
  document.getElementById("unlockedCount").textContent = state.researched.size;
  document.getElementById("totalTechs").textContent = TECH_TREE.length;
}

// FILTROWANIE EPOK
document.querySelectorAll(".filter-chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const era = btn.dataset.era;
    const nodes = document.querySelectorAll(".tech-node");

    if (era === "all") {
      nodes.forEach(n => n.style.opacity = "1");
    } else {
      nodes.forEach(n => {
        if (n.dataset.era === era) {
          n.style.opacity = "1";
        } else {
          n.style.opacity = "0.2";
        }
      });

      const firstEraTech = TECH_TREE.find(t => t.era === era);
      if (firstEraTech) {
        panX = -firstEraTech.x + 200;
        panY = -firstEraTech.y + 200;
        updateTransform();
      }
    }
  });
});

// MODAL SZCZEGÓŁÓW TECHNOLOGII
const modal = document.getElementById("techModal");
let activeModalTech = null;

function openTechModal(tech) {
  activeModalTech = tech;
  const status = getTechStatus(tech);

  document.getElementById("modalIcon").textContent = tech.icon;
  document.getElementById("modalTitle").textContent = tech.name;
  document.getElementById("modalEra").textContent = tech.eraName;
  document.getElementById("modalDesc").textContent = tech.desc;

  const reqsList = document.getElementById("modalReqs");
  reqsList.innerHTML = "";
  if (tech.reqs.length === 0) {
    reqsList.innerHTML = `<li><span style="color:#10b981">✓ Brak wymagań wstępnych</span></li>`;
  } else {
    tech.reqs.forEach(reqId => {
      const parent = TECH_TREE.find(t => t.id === reqId);
      const isDone = state.researched.has(reqId);
      const li = document.createElement("li");
      li.innerHTML = isDone 
        ? `<span style="color:#10b981">✓ ${parent.name}</span>`
        : `<span style="color:#ef4444">✕ ${parent.name} (wymagane)</span>`;
      reqsList.appendChild(li);
    });
  }

  const effectsList = document.getElementById("modalEffects");
  effectsList.innerHTML = "";
  tech.effects.forEach(eff => {
    const li = document.createElement("li");
    li.innerHTML = `<span>✨ ${eff}</span>`;
    effectsList.appendChild(li);
  });

  const costsContainer = document.getElementById("modalCosts");
  costsContainer.innerHTML = `
    <span class="cost-pill">💡 ${formatNumber(tech.cost.rp)} RP</span>
    ${tech.cost.prod > 0 ? `<span class="cost-pill prod">⚙️ ${formatNumber(tech.cost.prod)} Materiałów</span>` : ''}
    ${tech.cost.energy > 0 ? `<span class="cost-pill energy">⚡ ${formatNumber(tech.cost.energy)} Energii</span>` : ''}
  `;

  const btnResearch = document.getElementById("btnResearchModal");
  if (status === "researched") {
    btnResearch.textContent = "Technologia Opracowana ✓";
    btnResearch.disabled = true;
    btnResearch.style.opacity = "0.5";
  } else if (status === "locked") {
    btnResearch.textContent = "Wymagania niespełnione (Zablokowane)";
    btnResearch.disabled = true;
    btnResearch.style.opacity = "0.5";
  } else {
    const canAfford = state.rp >= tech.cost.rp &&
                      state.prod >= tech.cost.prod &&
                      state.energy >= tech.cost.energy;
    btnResearch.textContent = canAfford ? "Zbadaj Technologię 🚀" : "Niewystarczająca ilość zasobów";
    btnResearch.disabled = !canAfford;
    btnResearch.style.opacity = canAfford ? "1" : "0.6";
  }

  modal.removeAttribute("hidden");
}

document.getElementById("modalClose").addEventListener("click", () => {
  modal.setAttribute("hidden", "");
  activeModalTech = null;
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.setAttribute("hidden", "");
    activeModalTech = null;
  }
});

// BADANIE TECHNOLOGII
document.getElementById("btnResearchModal").addEventListener("click", () => {
  if (!activeModalTech) return;
  const tech = activeModalTech;
  const status = getTechStatus(tech);

  if (status !== "available") return;

  if (state.rp >= tech.cost.rp && state.prod >= tech.cost.prod && state.energy >= tech.cost.energy) {
    state.rp -= tech.cost.rp;
    state.prod -= tech.cost.prod;
    state.energy -= tech.cost.energy;

    state.researched.add(tech.id);
    applyTechBonuses(tech);

    playSound("research");
    showToast(`Wynaleziono: ${tech.name}! 🌟`);

    if (tech.id === "dyson_sphere") {
      playSound("victory");
      const current = getCurrentCountry();
      showToast(`🏆 ZWYCIĘSTWO! ${current.name} zbudowała Sferę Dysona i opanowała galaktykę!`);
    }

    renderTreeNodes();
    renderGenerators();
    renderNationsTab();
    renderWorldMap();
    openTechModal(tech);
    saveGame();
  }
});

function applyTechBonuses(tech) {
  if (tech.id === "fire") state.baseClickRp = 2;
  if (tech.id === "stone_tools") state.baseClickProd = 2;
  if (tech.id === "pottery") state.baseClickProd = 5;
  if (tech.id === "internet") state.baseClickRp = 10;
  
  const eraNames = {
    stone: "Epoka Kamienia",
    bronze: "Epoka Brązu i Żelaza",
    steam: "Rewolucja Przemysłowa",
    atomic: "Wiek Atomu i Krzemu",
    future: "Era Kosmiczna"
  };
  state.currentEra = eraNames[tech.era] || state.currentEra;
  document.getElementById("currentEra").textContent = state.currentEra;
}

// KLIKANIE RĘCZNE
const btnDiscover = document.getElementById("btnDiscover");
const btnGather = document.getElementById("btnGather");

function getClickRpGain() {
  const country = getCurrentCountry();
  return state.baseClickRp + (country.clickRpBonus || 0);
}

function getClickProdGain() {
  const country = getCurrentCountry();
  return state.baseClickProd + (country.clickProdBonus || 0);
}

btnDiscover.addEventListener("click", (e) => {
  const gain = getClickRpGain();
  state.rp += gain;
  createFloatingText(e.clientX, e.clientY, `+${gain} RP`);
  playSound("click");
  updateUI();
});

btnGather.addEventListener("click", (e) => {
  const gain = getClickProdGain();
  state.prod += gain;
  createFloatingText(e.clientX, e.clientY, `+${gain} Mat`, "#60a5fa");
  playSound("click");
  updateUI();
});

function createFloatingText(x, y, text, color = "#38bdf8") {
  const el = document.createElement("div");
  el.className = "floating-num";
  el.textContent = text;
  el.style.left = `${x - 20}px`;
  el.style.top = `${y - 20}px`;
  el.style.color = color;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

// BUDYNKI I GENERATORY
const genContainer = document.getElementById("generatorsList");

function getGenCost(gen) {
  const count = state.generators[gen.id] || 0;
  const country = getCurrentCountry();
  let discount = 1.0;
  if (country.uniqueGenDiscount) {
    discount -= country.uniqueGenDiscount;
  }
  return Math.floor(gen.baseCost * Math.pow(1.15, count) * discount);
}

function renderGenerators() {
  genContainer.innerHTML = "";

  const visibleGens = GENERATORS.filter(g => {
    return !g.unlockedBy || state.researched.has(g.unlockedBy);
  });

  if (visibleGens.length === 0) {
    genContainer.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 12px;">Brak dostępnych struktur. Opracuj technologie w drzewku!</div>`;
    return;
  }

  visibleGens.forEach(gen => {
    const count = state.generators[gen.id] || 0;
    const cost = getGenCost(gen);
    const canAfford = gen.costType === "prod" ? state.prod >= cost : state.rp >= cost;

    let outputDesc = "";
    if (gen.rpYield > 0) outputDesc += `+${gen.rpYield}/s RP `;
    if (gen.prodYield > 0) outputDesc += `+${gen.prodYield}/s Mat `;
    if (gen.energyYield !== 0) outputDesc += `${gen.energyYield > 0 ? '+' : ''}${gen.energyYield}/s ⚡`;

    const card = document.createElement("div");
    card.className = `gen-card ${canAfford ? '' : 'disabled'}`;
    card.innerHTML = `
      <div class="gen-info">
        <span class="gen-emoji">${gen.emoji}</span>
        <div class="gen-names">
          <span class="gen-title">${gen.name}</span>
          <span class="gen-output">${outputDesc}</span>
        </div>
      </div>
      <div class="gen-buy">
        <span class="gen-count">${count}</span>
        <span class="gen-cost">Koszt: ${formatNumber(cost)} ${gen.costType === 'prod' ? '⚙️' : '💡'}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      buyGenerator(gen);
    });

    genContainer.appendChild(card);
  });
}

function buyGenerator(gen) {
  const cost = getGenCost(gen);
  const resource = gen.costType === "prod" ? "prod" : "rp";

  if (state[resource] >= cost) {
    state[resource] -= cost;
    state.generators[gen.id] = (state.generators[gen.id] || 0) + 1;
    playSound("buy");
    renderGenerators();
    updateUI();
    saveGame();
  }
}

// PRZYROST PASYWNY (TICK GRY)
let lastTick = performance.now();

function gameLoop(now) {
  const delta = (now - lastTick) / 1000;
  lastTick = now;

  let totalRpRate = 0;
  let totalProdRate = 0;
  let totalEnergyRate = 0;

  // Bonusy z technologii
  if (state.researched.has("cave_paintings")) totalRpRate += 1;
  if (state.researched.has("agriculture")) totalProdRate += 2;
  if (state.researched.has("metallurgy")) totalProdRate += 5;
  if (state.researched.has("quantum_computing")) totalRpRate += 500;
  if (state.researched.has("fusion_power")) totalEnergyRate += 500;

  // Bonusy z prowincji kontrolowanych na mapie świata!
  Object.keys(state.provinceOwnership).forEach(provId => {
    if (state.provinceOwnership[provId] === state.selectedCountry) {
      totalProdRate += 5;
      totalRpRate += 2;
      totalEnergyRate += 2;
    }
  });

  // Mnożniki technologii
  let prodMultiplier = 1;
  if (state.researched.has("stone_tools")) prodMultiplier *= 1.2;
  if (state.researched.has("iron_working")) prodMultiplier *= 2.0;
  if (state.researched.has("assembly_line")) prodMultiplier *= 2.0;

  let rpMultiplier = 1;
  if (state.researched.has("printing_press")) rpMultiplier *= 1.5;
  if (state.researched.has("internet")) rpMultiplier *= 3.0;

  // Bonusy kraju i sojuszy
  const country = getCurrentCountry();
  rpMultiplier *= (country.rpMult || 1.0);
  prodMultiplier *= (country.prodMult || 1.0);
  let energyMultiplier = (country.energyMult || 1.0);

  if (state.alliances.size > 0) {
    prodMultiplier *= (1 + state.alliances.size * 0.1);
  }

  // Generatory
  GENERATORS.forEach(gen => {
    const count = state.generators[gen.id] || 0;
    if (count > 0) {
      totalRpRate += (gen.rpYield * count);
      totalProdRate += (gen.prodYield * count);
      totalEnergyRate += (gen.energyYield * count);
    }
  });

  totalProdRate *= prodMultiplier;
  totalRpRate *= rpMultiplier;
  totalEnergyRate *= energyMultiplier;

  // Naliczanie zasobów
  state.rp += totalRpRate * delta;
  state.prod += totalProdRate * delta;
  state.energy = Math.max(0, state.energy + (totalEnergyRate * delta));

  // Aktualizacja wskaźników
  document.getElementById("rpVal").textContent = formatNumber(state.rp);
  document.getElementById("prodVal").textContent = formatNumber(state.prod);
  document.getElementById("energyVal").textContent = formatNumber(state.energy);

  document.getElementById("rpRate").textContent = `+${totalRpRate.toFixed(1)} /s`;
  document.getElementById("prodRate").textContent = `+${totalProdRate.toFixed(1)} /s`;
  document.getElementById("energyRate").textContent = `${totalEnergyRate >= 0 ? '+' : ''}${totalEnergyRate.toFixed(1)} /s`;

  document.getElementById("discoverYield").textContent = `+${getClickRpGain()} RP`;
  document.getElementById("gatherYield").textContent = `+${getClickProdGain()} Mat`;

  updateRecruitButtons();

  requestAnimationFrame(gameLoop);
}

function updateUI() {
  document.getElementById("rpVal").textContent = formatNumber(state.rp);
  document.getElementById("prodVal").textContent = formatNumber(state.prod);
  document.getElementById("energyVal").textContent = formatNumber(state.energy);
}

// TOASTY
function showToast(msg) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ZAPIS I WCZYTYWANIE GRY (LocalStorage)
const SAVE_KEY = "civ_tech_tree_save_v4";

function saveGame() {
  const data = {
    rp: state.rp,
    prod: state.prod,
    energy: state.energy,
    researched: Array.from(state.researched),
    generators: state.generators,
    currentEra: state.currentEra,
    selectedCountry: state.selectedCountry,
    alliances: Array.from(state.alliances),
    provinceOwnership: state.provinceOwnership,
    provinceGarrisons: state.provinceGarrisons,
    armySize: state.armySize,
    armyLocation: state.armyLocation
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    state.rp = data.rp || 0;
    state.prod = data.prod || 0;
    state.energy = data.energy || 0;
    state.researched = new Set(data.researched || []);
    state.generators = data.generators || {};
    state.currentEra = data.currentEra || "Epoka Kamienia";
    state.selectedCountry = data.selectedCountry || "poland";
    state.alliances = new Set(data.alliances || []);
    state.provinceOwnership = data.provinceOwnership || state.provinceOwnership;
    state.provinceGarrisons = data.provinceGarrisons || state.provinceGarrisons;
    state.armySize = data.armySize || 1000;
    state.armyLocation = data.armyLocation || "poland_core";

    document.getElementById("currentEra").textContent = state.currentEra;

    TECH_TREE.forEach(t => {
      if (state.researched.has(t.id)) {
        applyTechBonuses(t);
      }
    });
  } catch (e) {
    console.error("Błąd wczytywania stanu gry:", e);
  }
}

// KONTROLKI DOLNE
document.getElementById("btnReset").addEventListener("click", () => {
  if (confirm("Czy na pewno chcesz zresetować całe drzewko, armię, mapę i zasoby?")) {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
});

const btnAudio = document.getElementById("btnAudioToggle");
btnAudio.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  btnAudio.textContent = state.soundEnabled ? "🔊 Dźwięki: Wł" : "🔇 Dźwięki: Wył";
});

// START
loadGame();
updateCountryUI();
renderTreeNodes();
renderGenerators();
renderNationsTab();
renderWorldMap();
updateTransform();
requestAnimationFrame(gameLoop);

setInterval(saveGame, 10000);
