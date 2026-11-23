const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette for 1756 Seven Years' War
const colors = {
  prussia: '#334155',        // Prussian Blue / Slate Dark
  britain: '#1e40af',        // British Imperial Blue
  france: '#2563eb',         // Royal French Blue
  austria: '#d97706',        // Habsburg Gold / Imperial Yellow
  russia: '#4f772d',         // Imperial Russian Green
  spain: '#b91c1c',          // Bourbon Spanish Crimson
  poland: '#dc2626',         // Polish Crown Crimson
  portugal: '#15803d',       // Portuguese Green
  sweden: '#0284c7',         // Swedish Blue
  ottoman: '#c2847a',        // Ottoman Tan
  mogul: '#d97706',          // Mughal Empire Orange
  qing: '#ca8a04',           // Qing Empire Yellow
  neutral: '#78716c'         // Neutral Grey
};

const sywFeatures = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  if (['DEU'].includes(iso)) {
    // Prussia & Hanover
    sywFeatures.push({ ...f, properties: { id: 'SYW_PRU', name: 'Królestwo Prus (Fryderyk II Wielki)', country: 'Królestwo Prus', pop: 6, gdp: 500, army: 140, color: colors.prussia, faction: 'Sojusz Brytyjsko-Pruski' } });
  } else if (['AUT', 'CZE', 'SVK', 'BEL'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: `SYW_AUT_${iso}`, name: `Monarchia Habsburgów (Austria) - ${name}`, country: 'Austria (Habsburgowie)', pop: 22, gdp: 1100, army: 160, color: colors.austria, faction: 'Koalicja Burbońsko-Habsburska' } });
  } else if (['GBR', 'USA'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: `SYW_GBR_${iso}`, name: `Wielka Brytania & Trzynaście Kolonii - ${name}`, country: 'Wielka Brytania', pop: 12, gdp: 1800, army: 150, color: colors.britain, faction: 'Sojusz Brytyjsko-Pruski' } });
  } else if (['FRA', 'CAN'].includes(iso)) {
    ww1Name = iso === 'CAN' ? 'Nowa Francja (Kanada Francuska)' : 'Królestwo Francji (Ludwik XV)';
    sywFeatures.push({ ...f, properties: { id: `SYW_FRA_${iso}`, name: `${ww1Name}`, country: 'Królestwo Francji', pop: 25, gdp: 2000, army: 180, color: colors.france, faction: 'Koalicja Burbońsko-Habsburska' } });
  } else if (['RUS', 'BLR', 'UKR', 'EST', 'LVA', 'LTU', 'FIN'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: `SYW_RUS_${iso}`, name: `Imperium Rosyjskie (Cesarzowa Elżbieta) - ${name}`, country: 'Imperium Rosyjskie', pop: 30, gdp: 900, army: 170, color: colors.russia, faction: 'Koalicja Burbońsko-Habsburska' } });
  } else if (['ESP', 'MEX', 'COL', 'VEN', 'PER', 'CHL', 'ARG', 'PHL'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: `SYW_ESP_${iso}`, name: `Imperium Hiszpańskie (Karol III) - ${name}`, country: 'Imperium Hiszpańskie', pop: 20, gdp: 1200, army: 110, color: colors.spain, faction: 'Koalicja Burbońsko-Habsburska' } });
  } else if (['POL'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: 'SYW_POL', name: 'Rzeczpospolita Obojga Narodów (August III Sas)', country: 'Rzeczpospolita Obojga Narodów', pop: 11, gdp: 350, army: 30, color: colors.poland, faction: 'Neutralna (Rzeczpospolita)' } });
  } else if (['PRT', 'BRA'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: `SYW_PRT_${iso}`, name: `Królestwo Portugalii & Brazylia - ${name}`, country: 'Portugalia', pop: 4, gdp: 400, army: 40, color: colors.portugal, faction: 'Sojusz Brytyjsko-Pruski' } });
  } else if (['SWE'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: 'SYW_SWE', name: 'Królestwo Szwecji (Wojna Pomorska)', country: 'Szwecja', pop: 3, gdp: 200, army: 45, color: colors.sweden, faction: 'Koalicja Burbońsko-Habsburska' } });
  } else if (['TUR', 'SYR', 'IRQ', 'EGY'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: `SYW_OTT_${iso}`, name: `Imperium Osmańskie - ${name}`, country: 'Imperium Osmańskie', pop: 22, gdp: 500, army: 80, color: colors.ottoman, faction: 'Neutralni' } });
  } else if (['IND'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: 'SYW_IND', name: 'Indie (Imperium Mogołów / Faktorie Brytyjskie i Francuskie)', country: 'Indie', pop: 150, gdp: 1500, army: 90, color: colors.mogul, faction: 'Teatr Indyjski' } });
  } else if (['CHN'].includes(iso)) {
    sywFeatures.push({ ...f, properties: { id: 'SYW_CHN', name: 'Chiny (Dynastia Qing - Cesarz Qianlong)', country: 'Chiny (Qing)', pop: 250, gdp: 2500, army: 150, color: colors.qing, faction: 'Neutralne Azja' } });
  } else {
    sywFeatures.push({ ...f, properties: { id: `SYW_OTHER_${iso}`, name: `${name}`, country: name, pop: 5, gdp: 150, army: 20, color: colors.neutral, faction: 'Świat' } });
  }
});

const sywGeoJSON = { type: 'FeatureCollection', features: sywFeatures };
const sywContent = 'const SYW_GEOJSON = ' + JSON.stringify(sywGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = SYW_GEOJSON;';
fs.writeFileSync('sywGeoData.js', sywContent);
console.log('Saved sywGeoData.js matching Seven Years War 1756–1763 (', sywFeatures.length, 'territories).');
