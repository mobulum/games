const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette for Empires
const colors = {
  germany_ww1: '#525252',
  austria_hungary: '#a855f7',
  russia_ww1: '#0284c7',
  ottoman: '#d97706',
  uk: '#1e40af',
  france: '#2563eb',
  italy: '#15803d',
  japan: '#be123c',
  usa: '#1d4ed8',
  germany_ww2: '#334155',
  ussr_ww2: '#b91c1c',
  china_ww2: '#ea580c',
  poland: '#dc2626',
  neutral: '#78716c'
};

// --- 1. GENERATE WW1 GLOBAL MAP (1914) ---
const ww1Features = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  if (iso === 'DEU' || iso === 'NAM' || iso === 'TZA' || iso === 'CMR') {
    ww1Features.push({ ...f, properties: { id: `WW1_DEU_${iso}`, name: `Cesarstwo Niemieckie - ${name}`, country: 'Cesarstwo Niemieckie', pop: 68, gdp: 2100, army: 220, color: colors.germany_ww1, faction: 'Państwa Centralne' } });
  } else if (iso === 'AUT' || iso === 'HUN' || iso === 'CZE' || iso === 'SVK' || iso === 'HRV' || iso === 'BIH') {
    ww1Features.push({ ...f, properties: { id: `WW1_AH_${iso}`, name: `Austro-Węgry - ${name}`, country: 'Austro-Węgry', pop: 52, gdp: 1100, army: 160, color: colors.austria_hungary, faction: 'Państwa Centralne' } });
  } else if (iso === 'TUR' || iso === 'SYR' || iso === 'IRQ' || iso === 'JOR' || iso === 'ISR') {
    ww1Features.push({ ...f, properties: { id: `WW1_OTT_${iso}`, name: `Imperium Osmańskie - ${name}`, country: 'Imperium Osmańskie', pop: 25, gdp: 400, army: 110, color: colors.ottoman, faction: 'Państwa Centralne' } });
  } else if (iso === 'RUS' || iso === 'POL' || iso === 'FIN' || iso === 'UKR' || iso === 'BLR' || iso === 'EST' || iso === 'LVA' || iso === 'LTU') {
    ww1Features.push({ ...f, properties: { id: `WW1_RUS_${iso}`, name: `Imperium Rosyjskie - ${name}`, country: 'Imperium Rosyjskie', pop: 165, gdp: 1900, army: 280, color: colors.russia_ww1, faction: 'Ententa' } });
  } else if (iso === 'GBR' || iso === 'CAN' || iso === 'AUS' || iso === 'NZL' || iso === 'IND' || iso === 'EGY' || iso === 'ZAF') {
    ww1Features.push({ ...f, properties: { id: `WW1_GBR_${iso}`, name: `Imperium Brytyjskie - ${name}`, country: 'Imperium Brytyjskie', pop: 400, gdp: 3500, army: 250, color: colors.uk, faction: 'Ententa' } });
  } else if (iso === 'FRA' || iso === 'DZA' || iso === 'VNM' || iso === 'MDG') {
    ww1Features.push({ ...f, properties: { id: `WW1_FRA_${iso}`, name: `Francja i Kolonie - ${name}`, country: 'Francja', pop: 90, gdp: 2200, army: 190, color: colors.france, faction: 'Ententa' } });
  } else if (iso === 'USA') {
    ww1Features.push({ ...f, properties: { id: 'WW1_USA', name: 'Stany Zjednoczone (USA)', country: 'USA', pop: 98, gdp: 3800, army: 120, color: colors.usa, faction: 'Ententa' } });
  } else if (iso === 'JPN') {
    ww1Features.push({ ...f, properties: { id: 'WW1_JPN', name: 'Cesarstwo Japońskie', country: 'Japonia', pop: 53, gdp: 800, army: 140, color: colors.japan, faction: 'Ententa' } });
  } else if (iso === 'ITA') {
    ww1Features.push({ ...f, properties: { id: 'WW1_ITA', name: 'Królestwo Włoch', country: 'Włochy', pop: 35, gdp: 850, army: 130, color: colors.italy, faction: 'Ententa' } });
  } else {
    ww1Features.push({ ...f, properties: { id: `WW1_NEU_${iso}`, name: `${name} (Neutralne/Inne)`, country: name, pop: 12, gdp: 300, army: 30, color: colors.neutral, faction: 'Neutralni' } });
  }
});

const ww1GeoJSON = { type: 'FeatureCollection', features: ww1Features };
const ww1Content = 'const WW1_GLOBAL_GEOJSON = ' + JSON.stringify(ww1GeoJSON) + ';\nif (typeof module !== "undefined") module.exports = WW1_GLOBAL_GEOJSON;';
fs.writeFileSync('ww1GlobalGeoData.js', ww1Content);
console.log('Saved ww1GlobalGeoData.js with', ww1Features.length, 'WW1 global territories.');

// --- 2. GENERATE WW2 GLOBAL MAP (1939-1945) ---
const ww2Features = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  if (iso === 'POL') {
    ww2Features.push(
      { ...f, properties: { id: 'WW2_POL_WAR', name: 'II Rzeczpospolita - Centralna (Warszawa)', country: 'II Rzeczpospolita', pop: 18, gdp: 300, army: 80, color: colors.poland, faction: 'Alianci' } },
      { ...f, properties: { id: 'WW2_POL_KRE', name: 'II Rzeczpospolita - Kresy Wschodnie (Lwów/Wilno)', country: 'II Rzeczpospolita', pop: 16, gdp: 250, army: 60, color: colors.poland, faction: 'Alianci' } }
    );
  } else if (iso === 'DEU' || iso === 'AUT' || iso === 'CZE') {
    ww2Features.push({ ...f, properties: { id: `WW2_DEU_${iso}`, name: `III Rzesza - ${name}`, country: 'III Rzesza', pop: 32, gdp: 1800, army: 210, color: colors.germany_ww2, faction: 'Oś' } });
  } else if (iso === 'JPN' || iso === 'KOR' || iso === 'TWN') {
    ww2Features.push({ ...f, properties: { id: `WW2_JPN_${iso}`, name: `Imperium Japońskie - ${name}`, country: 'Imperium Japońskie', pop: 72, gdp: 1200, army: 190, color: colors.japan, faction: 'Oś' } });
  } else if (iso === 'RUS' || iso === 'UKR' || iso === 'BLR' || iso === 'KAZ') {
    ww2Features.push({ ...f, properties: { id: `WW2_ZSRR_${iso}`, name: `ZSRR - ${name}`, country: 'ZSRR', pop: 55, gdp: 1600, army: 250, color: colors.ussr_ww2, faction: 'Komintern' } });
  } else if (iso === 'USA') {
    ww2Features.push({ ...f, properties: { id: 'WW2_USA', name: 'Stany Zjednoczone (USA)', country: 'USA', pop: 132, gdp: 6000, army: 260, color: colors.usa, faction: 'Alianci' } });
  } else if (iso === 'CHN') {
    ww2Features.push({ ...f, properties: { id: 'WW2_CHN', name: 'Republika Chińska (Kuomintang)', country: 'Chiny', pop: 500, gdp: 1500, army: 170, color: colors.china_ww2, faction: 'Alianci' } });
  } else if (iso === 'GBR' || iso === 'CAN' || iso === 'AUS' || iso === 'NZL' || iso === 'IND') {
    ww2Features.push({ ...f, properties: { id: `WW2_GBR_${iso}`, name: `Wielka Brytania & Dominia - ${name}`, country: 'Wielka Brytania', pop: 350, gdp: 4000, army: 220, color: colors.uk, faction: 'Alianci' } });
  } else if (iso === 'FRA') {
    ww2Features.push({ ...f, properties: { id: 'WW2_FRA', name: 'Republika Francuska', country: 'Francja', pop: 42, gdp: 1500, army: 110, color: colors.france, faction: 'Alianci' } });
  } else if (iso === 'ITA' || iso === 'LBY') {
    ww2Features.push({ ...f, properties: { id: `WW2_ITA_${iso}`, name: `Faszystowskie Włochy - ${name}`, country: 'Włochy', pop: 45, gdp: 950, army: 100, color: colors.italy, faction: 'Oś' } });
  } else {
    ww2Features.push({ ...f, properties: { id: `WW2_NEU_${iso}`, name: `${name} (Neutralne/Inne)`, country: name, pop: 15, gdp: 350, army: 35, color: colors.neutral, faction: 'Neutralni' } });
  }
});

const ww2GeoJSON = { type: 'FeatureCollection', features: ww2Features };
const ww2Content = 'const WW2_GLOBAL_GEOJSON = ' + JSON.stringify(ww2GeoJSON) + ';\nif (typeof module !== "undefined") module.exports = WW2_GLOBAL_GEOJSON;';
fs.writeFileSync('ww2GlobalGeoData.js', ww2Content);
console.log('Saved ww2GlobalGeoData.js with', ww2Features.length, 'WW2 global territories.');
