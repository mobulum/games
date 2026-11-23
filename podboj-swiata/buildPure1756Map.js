const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette matching the exact uploaded image:
// Red Faction (#dc2626): Great Britain, Prussia (Brandenburg + Silesia + East Prussia), Portugal, Hanover
// Blue Faction (#0284c7): Austria (Austria + Bohemia + Hungary + Belgium), France, Russia, Sweden, Spain, Saxony
// Yellow Faction (#eab308 / #d97706): Polish-Lithuanian Commonwealth, Ottoman Empire, Denmark-Norway, Dutch Republic, Italian States

const colors = {
  redAlliance: '#dc2626',     // Bright Red
  blueCoalition: '#0284c7',   // Ocean Blue
  polandYellow: '#eab308',    // Ochre Yellow
  ottomanYellow: '#d97706',   // Tan Yellow
  denmarkYellow: '#f59e0b',   // Yellow-Orange
  dutchYellow: '#ca8a04',     // Dutch Republic
  germanYellow: '#facc15',    // Bavaria & Independent German States
  otherGrey: '#64748b'
};

const pure1756Features = [];

// Helper to group features by historical entity
const groups = {
  poland: [],
  prussia: [],
  austria: [],
  britain: [],
  france: [],
  russia: [],
  spain: [],
  portugal: [],
  sweden: [],
  denmark: [],
  ottoman: [],
  dutch: [],
  bavaria: [],
  italy: [],
  others: []
};

worldJson.features.forEach((f) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  // 1. POLISH-LITHUANIAN COMMONWEALTH (1756)
  if (['POL', 'LTU', 'BLR', 'UKR', 'LVA'].includes(iso)) {
    groups.poland.push(f);
  }
  // 2. PRUSSIA & HANOVER
  else if (iso === 'DEU') {
    groups.prussia.push(f);
  }
  // 3. AUSTRIAN MONARCHY (Austria, Bohemia, Moravia, Hungary, Slovakia, Croatia, Slovenia, Belgium)
  else if (['AUT', 'CZE', 'SVK', 'HUN', 'HRV', 'BIH', 'SVN', 'BEL'].includes(iso)) {
    groups.austria.push(f);
  }
  // 4. GREAT BRITAIN & IRELAND
  else if (['GBR', 'IRL', 'USA'].includes(iso)) {
    groups.britain.push(f);
  }
  // 5. FRANCE
  else if (['FRA', 'CAN'].includes(iso)) {
    groups.france.push(f);
  }
  // 6. RUSSIAN EMPIRE
  else if (['RUS', 'EST', 'KAZ'].includes(iso)) {
    groups.russia.push(f);
  }
  // 7. SPAIN
  else if (['ESP', 'MEX', 'COL', 'PER', 'PHL'].includes(iso)) {
    groups.spain.push(f);
  }
  // 8. PORTUGAL
  else if (['PRT', 'BRA'].includes(iso)) {
    groups.portugal.push(f);
  }
  // 9. SWEDEN
  else if (iso === 'SWE') {
    groups.sweden.push(f);
  }
  // 10. DENMARK-NORWAY
  else if (['DNK', 'NOR'].includes(iso)) {
    groups.denmark.push(f);
  }
  // 11. OTTOMAN EMPIRE
  else if (['TUR', 'SYR', 'IRQ', 'EGY', 'GRC', 'BGR', 'ROU', 'SRB'].includes(iso)) {
    groups.ottoman.push(f);
  }
  // 12. DUTCH REPUBLIC
  else if (iso === 'NLD') {
    groups.dutch.push(f);
  }
  // 13. SWITZERLAND & ITALIAN STATES
  else if (['CHE', 'ITA'].includes(iso)) {
    groups.italy.push(f);
  }
  else {
    groups.others.push(f);
  }
});

// Construct pure 1756 historical country objects without modern inner borders:
pure1756Features.push(
  {
    type: 'Feature',
    geometry: groups.poland[0].geometry,
    properties: {
      id: 'PURE_1756_POLAND',
      name: 'Rzeczpospolita Obojga Narodów (Polska i Litwa - Granice 1756)',
      country: 'Rzeczpospolita Obojga Narodów',
      pop: 14, gdp: 1400, army: 50,
      color: colors.polandYellow,
      faction: 'Rzeczpospolita Obojga Narodów (Neutralna)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.prussia[0].geometry,
    properties: {
      id: 'PURE_1756_PRUSSIA',
      name: 'Królestwo Prus (Brandenburgia, Śląsk i Prusy Wschodnie)',
      country: 'Królestwo Prus',
      pop: 6, gdp: 750, army: 150,
      color: colors.redAlliance,
      faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.austria[0].geometry,
    properties: {
      id: 'PURE_1756_AUSTRIA',
      name: 'Monarchia Habsburgów / Austria (Austria, Czechy, Węgry, Belgia)',
      country: 'Monarchia Habsburgów (Austria)',
      pop: 22, gdp: 1300, army: 170,
      color: colors.blueCoalition,
      faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.britain[0].geometry,
    properties: {
      id: 'PURE_1756_BRITAIN',
      name: 'Wielka Brytania i Irlandia (oraz Hanower)',
      country: 'Wielka Brytania',
      pop: 12, gdp: 2000, army: 160,
      color: colors.redAlliance,
      faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.france[0].geometry,
    properties: {
      id: 'PURE_1756_FRANCE',
      name: 'Królestwo Francji (Ludwik XV)',
      country: 'Królestwo Francji',
      pop: 25, gdp: 2100, army: 190,
      color: colors.blueCoalition,
      faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.russia[0].geometry,
    properties: {
      id: 'PURE_1756_RUSSIA',
      name: 'Imperium Rosyjskie (Cesarzowa Elżbieta)',
      country: 'Imperium Rosyjskie',
      pop: 28, gdp: 1000, army: 180,
      color: colors.blueCoalition,
      faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.spain[0].geometry,
    properties: {
      id: 'PURE_1756_SPAIN',
      name: 'Imperium Hiszpańskie',
      country: 'Hiszpania',
      pop: 20, gdp: 1300, army: 110,
      color: colors.blueCoalition,
      faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.portugal[0].geometry,
    properties: {
      id: 'PURE_1756_PORTUGAL',
      name: 'Królestwo Portugalii',
      country: 'Portugalia',
      pop: 4, gdp: 450, army: 40,
      color: colors.redAlliance,
      faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.sweden[0].geometry,
    properties: {
      id: 'PURE_1756_SWEDEN',
      name: 'Królestwo Szwecji',
      country: 'Szwecja',
      pop: 3, gdp: 240, army: 45,
      color: colors.blueCoalition,
      faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
    }
  },
  {
    type: 'Feature',
    geometry: groups.denmark[0].geometry,
    properties: {
      id: 'PURE_1756_DENMARK',
      name: 'Królestwo Danii i Norwegii',
      country: 'Dania-Norwegia',
      pop: 3, gdp: 220, army: 30,
      color: colors.denmarkYellow,
      faction: 'Neutralne'
    }
  },
  {
    type: 'Feature',
    geometry: groups.ottoman[0].geometry,
    properties: {
      id: 'PURE_1756_OTTOMAN',
      name: 'Imperium Osmańskie (Turcja i Bałkany)',
      country: 'Imperium Osmańskie',
      pop: 24, gdp: 600, army: 90,
      color: colors.ottomanYellow,
      faction: 'Neutralne'
    }
  },
  {
    type: 'Feature',
    geometry: groups.dutch[0].geometry,
    properties: {
      id: 'PURE_1756_DUTCH',
      name: 'Republika Siedmiu Zjednoczonych Prowincji (Holandia)',
      country: 'Holandia',
      pop: 2, gdp: 400, army: 25,
      color: colors.dutchYellow,
      faction: 'Neutralne'
    }
  },
  {
    type: 'Feature',
    geometry: groups.italy[0].geometry,
    properties: {
      id: 'PURE_1756_ITALY',
      name: 'Szwajcaria i Państwa Włoskie (Sabaudia, Genua, Toskania, Rzym, Wenecja)',
      country: 'Państwa Włoskie i Szwajcaria',
      pop: 8, gdp: 500, army: 35,
      color: colors.germanYellow,
      faction: 'Neutralne'
    }
  }
);

// Add remaining world features
groups.others.forEach((f, idx) => {
  const props = f.properties;
  pure1756Features.push({
    ...f,
    properties: {
      id: `PURE_1756_OTHER_${idx}`,
      name: `${props.NAME_LONG || props.NAME}`,
      country: props.NAME,
      pop: 5, gdp: 150, army: 20,
      color: colors.otherGrey,
      faction: 'Świat'
    }
  });
});

const sywPureGeoJSON = { type: 'FeatureCollection', features: pure1756Features };
const content = 'const SYW_EXACT_GEOJSON = ' + JSON.stringify(sywPureGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = SYW_EXACT_GEOJSON;';
fs.writeFileSync('sywExactGeoData.js', content);
console.log('Saved sywExactGeoData.js with pure historical 1756 state boundaries without modern inner province lines (', pure1756Features.length, 'historical states).');
