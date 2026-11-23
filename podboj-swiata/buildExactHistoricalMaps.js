const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// --- 1. WW1 1914 EXACT MAP (Matching Image 1) ---
// 1914 Map Colors from Image 1:
// German Empire: Dark Steel Grey-Green (#4b5563)
// Austria-Hungary: Ochre Gold (#d97706)
// Russian Empire: Olive Green (#4f772d)
// Ottoman Empire: Desert Tan (#c2847a)
// UK & Ireland: Salmon Pink (#e07a5f)
// France: Steel Blue (#457b9d)
// Spain/Portugal: Ochre Yellow (#eab308) / Green (#15803d)

const ww1Features = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  if (['DEU'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_DEU', name: 'Cesarstwo Niemieckie (Deutsches Kaiserreich)', country: 'Cesarstwo Niemieckie', pop: 68, gdp: 2400, army: 240, color: '#4b5563', faction: 'Państwa Centralne' } });
  } else if (['AUT', 'HUN', 'CZE', 'SVK', 'HRV', 'BIH', 'SVN'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: `WW1_AH_${iso}`, name: `Austro-Węgry - ${name}`, country: 'Austro-Węgry', pop: 52, gdp: 1200, army: 170, color: '#d97706', faction: 'Państwa Centralne' } });
  } else if (['RUS', 'POL', 'FIN', 'UKR', 'BLR', 'EST', 'LVA', 'LTU', 'MDA'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: `WW1_RUS_${iso}`, name: `Imperium Rosyjskie - ${name}`, country: 'Imperium Rosyjskie', pop: 165, gdp: 1900, army: 290, color: '#4f772d', faction: 'Ententa' } });
  } else if (['TUR', 'SYR', 'IRQ', 'JOR', 'ISR', 'LBN'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: `WW1_OTT_${iso}`, name: `Imperium Osmańskie - ${name}`, country: 'Imperium Osmańskie', pop: 25, gdp: 450, army: 120, color: '#c2847a', faction: 'Państwa Centralne' } });
  } else if (['GBR', 'IRL'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: `WW1_GBR_${iso}`, name: `Zjednoczone Królestwo Wielkiej Brytanii i Irlandii - ${name}`, country: 'Wielka Brytania', pop: 45, gdp: 2800, army: 200, color: '#e07a5f', faction: 'Ententa' } });
  } else if (['FRA'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_FRA', name: 'Republika Francuska (Francja)', country: 'Francja', pop: 40, gdp: 2100, army: 190, color: '#457b9d', faction: 'Ententa' } });
  } else if (['ITA'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_ITA', name: 'Królestwo Włoch', country: 'Włochy', pop: 36, gdp: 900, army: 130, color: '#2a9d8f', faction: 'Ententa' } });
  } else if (['ESP'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_ESP', name: 'Królestwo Hiszpanii (Neutralne)', country: 'Hiszpania', pop: 20, gdp: 500, army: 40, color: '#eab308', faction: 'Neutralni' } });
  } else if (['PRT'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_PRT', name: 'Portugalia', country: 'Portugalia', pop: 6, gdp: 150, army: 25, color: '#16a34a', faction: 'Ententa' } });
  } else if (['SRB', 'MNE'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: `WW1_SRB_${iso}`, name: `Królestwo Serbii / Czarnogóry - ${name}`, country: 'Serbia', pop: 5, gdp: 100, army: 50, color: '#6b7280', faction: 'Ententa' } });
  } else if (['ROU'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_ROU', name: 'Królestwo Rumunii', country: 'Rumunia', pop: 7, gdp: 160, army: 45, color: '#b45309', faction: 'Ententa' } });
  } else if (['BGR'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_BGR', name: 'Carstwo Bułgarii', country: 'Bułgaria', pop: 5, gdp: 120, army: 40, color: '#78716c', faction: 'Państwa Centralne' } });
  } else if (['GRC'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: 'WW1_GRC', name: 'Królestwo Grecji', country: 'Grecja', pop: 5, gdp: 130, army: 35, color: '#0284c7', faction: 'Ententa' } });
  } else if (['SWE', 'NOR', 'DNK', 'CHE', 'NLD', 'BEL'].includes(iso)) {
    ww1Features.push({ ...f, properties: { id: `WW1_${iso}`, name: `${name}`, country: name, pop: 8, gdp: 300, army: 30, color: '#9ca3af', faction: 'Neutralni/Alianci' } });
  } else {
    ww1Features.push({ ...f, properties: { id: `WW1_OTHER_${iso}`, name: `${name}`, country: name, pop: 10, gdp: 250, army: 20, color: '#475569', faction: 'Świat' } });
  }
});

const ww1GeoJSON = { type: 'FeatureCollection', features: ww1Features };
const ww1Content = 'const WW1_EXACT_GEOJSON = ' + JSON.stringify(ww1GeoJSON) + ';\nif (typeof module !== "undefined") module.exports = WW1_EXACT_GEOJSON;';
fs.writeFileSync('ww1ExactGeoData.js', ww1Content);
console.log('Saved ww1ExactGeoData.js matching Image 1 (1914 Europe).');

// --- 2. WW2 1944/1939 EXACT MAP (Matching Image 2) ---
// 1944 Map Colors from Image 2:
// Greater German Reich / Occupied Territories: Reich Crimson Red (#991b1b / #881337)
// Soviet Union (USSR): Soviet Crimson Red (#cc0000)
// Allied Normandy Landing & Western Allies: Blue (#1d4ed8 / #2563eb)
// Axis Allies (Finland, Romania, Hungary, Bulgaria): Flag Yellow/Blue (#ca8a04 / #0284c7)
// Neutrals (Spain, Portugal, Sweden, Switzerland, Turkey): Neutral Grey (#6b7280)

const ww2Features = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  // Third Reich + Occupied Europe (1944 Peak Frontline from Image 2)
  if (['DEU', 'AUT', 'CZE', 'POL', 'FRA', 'BEL', 'NLD', 'DNK', 'NOR', 'BLR', 'UKR', 'LTU', 'LVA', 'EST', 'SRB', 'HRV', 'BIH', 'GRC', 'ALB'].includes(iso)) {
    let subName = name;
    if (iso === 'POL') subName = 'Polska (Terytorium Okupowane przez III Rzeszę / Generalne Gubernatorstwo)';
    if (iso === 'FRA') subName = 'Francja (Okupacja Rzeszy / Reżim Vichy)';
    if (iso === 'DEU') subName = 'III Rzesza - Niemcy (Großdeutsches Reich)';

    ww2Features.push({ ...f, properties: { id: `WW2_REICH_${iso}`, name: `${subName}`, country: 'III Rzesza i Terytoria Okupowane', pop: 45, gdp: 2000, army: 260, color: '#991b1b', faction: 'Oś (III Rzesza)' } });
  } else if (['RUS', 'KAZ'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: `WW2_ZSRR_${iso}`, name: `ZSRR - Związek Radziecki (${name})`, country: 'ZSRR (Związek Radziecki)', pop: 120, gdp: 2500, army: 310, color: '#cc0000', faction: 'Alianci / Komintern' } });
  } else if (['GBR', 'IRL'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: `WW2_GBR_${iso}`, name: `Wielka Brytania & Alianci - ${name}`, country: 'Wielka Brytania', pop: 48, gdp: 3200, army: 220, color: '#1d4ed8', faction: 'Alianci Zachodni' } });
  } else if (['FIN'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: 'WW2_FIN', name: 'Finlandia (Wojna Kontynuacyjna z ZSRR)', country: 'Finlandia', pop: 4, gdp: 180, army: 55, color: '#0284c7', faction: 'Sojusznik Osi' } });
  } else if (['HUN'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: 'WW2_HUN', name: 'Królestwo Węgier (Horthy)', country: 'Węgry', pop: 9, gdp: 220, army: 45, color: '#d97706', faction: 'Sojusznik Osi' } });
  } else if (['ROU'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: 'WW2_ROU', name: 'Królestwo Rumunii (Antonescu)', country: 'Rumunia', pop: 15, gdp: 280, army: 60, color: '#ca8a04', faction: 'Sojusznik Osi' } });
  } else if (['BGR'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: 'WW2_BGR', name: 'Carstwo Bułgarii', country: 'Bułgaria', pop: 6, gdp: 150, army: 35, color: '#059669', faction: 'Sojusznik Osi' } });
  } else if (['ITA'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: 'WW2_ITA', name: 'Włochy (Wyzwolone Południe / Republika Salo)', country: 'Włochy', pop: 44, gdp: 1000, army: 80, color: '#15803d', faction: 'Front Włoski' } });
  } else if (['ESP', 'PRT', 'SWE', 'CHE', 'TUR'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: `WW2_NEU_${iso}`, name: `${name} (Państwo Neutralne)`, country: name, pop: 15, gdp: 450, army: 40, color: '#6b7280', faction: 'Neutralni' } });
  } else if (['USA'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: 'WW2_USA', name: 'Stany Zjednoczone (USA - Główny Sztab Aliancki)', country: 'USA', pop: 135, gdp: 6500, army: 300, color: '#2563eb', faction: 'Alianci Zachodni' } });
  } else {
    ww2Features.push({ ...f, properties: { id: `WW2_OTHER_${iso}`, name: `${name}`, country: name, pop: 12, gdp: 300, army: 30, color: '#475569', faction: 'Świat' } });
  }
});

const ww2GeoJSON = { type: 'FeatureCollection', features: ww2Features };
const ww2Content = 'const WW2_EXACT_GEOJSON = ' + JSON.stringify(ww2GeoJSON) + ';\nif (typeof module !== "undefined") module.exports = WW2_EXACT_GEOJSON;';
fs.writeFileSync('ww2ExactGeoData.js', ww2Content);
console.log('Saved ww2ExactGeoData.js matching Image 2 (1944 Europe WW2 Frontlines & Occupation).');
