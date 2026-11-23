const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette for 1756 Seven Years' War matching historical maps
const colors = {
  poland: '#dc2626',         // Polish-Lithuanian Commonwealth Crimson (#dc2626)
  prussia: '#334155',        // Kingdom of Prussia Dark Slate/Blue
  austria: '#d97706',        // Habsburg Monarchy Gold/Yellow
  russia: '#4f772d',         // Russian Empire Green
  france: '#2563eb',         // Royal French Blue
  britain: '#1e40af',        // British Empire Blue/Salmon
  spain: '#b91c1c',          // Spanish Empire Red
  ottoman: '#c2847a',        // Ottoman Tan
  sweden: '#0284c7',         // Swedish Blue
  neutral: '#78716c'         // Neutral Grey
};

const sywFeatures = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  // 1. RZECZPOSPOLITA OBOJGA NARODÓW (Exact 1756/1764 Borders: POL + LTU + BLR + UKR + LVA)
  if (['POL', 'LTU', 'BLR', 'UKR', 'LVA'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_PON_${iso}`,
        name: `Rzeczpospolita Obojga Narodów - ${name} (Granice 1756/1764)`,
        country: 'Rzeczpospolita Obojga Narodów',
        pop: 14,
        gdp: 1200,
        army: 50,
        color: colors.poland,
        faction: 'Rzeczpospolita Obojga Narodów'
      }
    });
  } 
  // 2. KRÓLESTWO PRUS (Prusy, Brandenburgia, Pomorze)
  else if (['DEU'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: 'SYW_PRU',
        name: 'Królestwo Prus (Fryderyk II Wielki)',
        country: 'Królestwo Prus',
        pop: 6,
        gdp: 700,
        army: 150,
        color: colors.prussia,
        faction: 'Sojusz Brytyjsko-Pruski'
      }
    });
  } 
  // 3. MONARCHIA HABSBURGÓW (Austria, Węgry, Czechy, Słowacja)
  else if (['AUT', 'CZE', 'SVK', 'HUN', 'HRV', 'BIH', 'SVN', 'BEL'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_AUT_${iso}`,
        name: `Monarchia Habsburgów (Maria Teresa) - ${name}`,
        country: 'Austria (Habsburgowie)',
        pop: 22,
        gdp: 1300,
        army: 170,
        color: colors.austria,
        faction: 'Koalicja Burbońsko-Habsburska'
      }
    });
  } 
  // 4. IMPERIUM ROSYJSKIE (Rosja na Wschód od RON)
  else if (['RUS', 'KAZ'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_RUS_${iso}`,
        name: `Imperium Rosyjskie (Cesarzowa Elżbieta) - ${name}`,
        country: 'Imperium Rosyjskie',
        pop: 28,
        gdp: 1000,
        army: 180,
        color: colors.russia,
        faction: 'Koalicja Burbońsko-Habsburska'
      }
    });
  } 
  // 5. KRÓLESTWO FRANCJI & NOWA FRANCJA
  else if (['FRA', 'CAN'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_FRA_${iso}`,
        name: `Królestwo Francji (Ludwik XV) - ${name}`,
        country: 'Królestwo Francji',
        pop: 25,
        gdp: 2100,
        army: 190,
        color: colors.france,
        faction: 'Koalicja Burbońsko-Habsburska'
      }
    });
  } 
  // 6. WIELKA BRYTANIA & TRZYNAŚCIE KOLONII
  else if (['GBR', 'USA'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_GBR_${iso}`,
        name: `Wielka Brytania & Trzynaście Kolonii - ${name}`,
        country: 'Wielka Brytania',
        pop: 12,
        gdp: 2000,
        army: 160,
        color: colors.britain,
        faction: 'Sojusz Brytyjsko-Pruski'
      }
    });
  } 
  // 7. IMPERIUM HISZPAŃSKIE
  else if (['ESP', 'MEX', 'COL', 'VEN', 'PER', 'CHL', 'ARG', 'PHL'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_ESP_${iso}`,
        name: `Imperium Hiszpańskie - ${name}`,
        country: 'Imperium Hiszpańskie',
        pop: 20,
        gdp: 1300,
        army: 110,
        color: colors.spain,
        faction: 'Koalicja Burbońsko-Habsburska'
      }
    });
  } 
  // 8. IMPERIUM OSMAŃSKIE
  else if (['TUR', 'SYR', 'IRQ', 'JOR', 'ISR', 'LBN', 'EGY'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_OTT_${iso}`,
        name: `Imperium Osmańskie - ${name}`,
        country: 'Imperium Osmańskie',
        pop: 24,
        gdp: 550,
        army: 85,
        color: colors.ottoman,
        faction: 'Neutralni'
      }
    });
  } 
  // 9. SZWECJA
  else if (['SWE'].includes(iso)) {
    sywFeatures.push({
      ...f,
      properties: {
        id: 'SYW_SWE',
        name: 'Królestwo Szwecji (Wojna Pomorska)',
        country: 'Szwecja',
        pop: 3,
        gdp: 220,
        army: 45,
        color: colors.sweden,
        faction: 'Koalicja Burbońsko-Habsburska'
      }
    });
  } 
  else {
    sywFeatures.push({
      ...f,
      properties: {
        id: `SYW_OTHER_${iso}`,
        name: `${name}`,
        country: name,
        pop: 5,
        gdp: 150,
        army: 20,
        color: colors.neutral,
        faction: 'Świat'
      }
    });
  }
});

const sywExactGeoJSON = { type: 'FeatureCollection', features: sywFeatures };
const content = 'const SYW_EXACT_GEOJSON = ' + JSON.stringify(sywExactGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = SYW_EXACT_GEOJSON;';
fs.writeFileSync('sywExactGeoData.js', content);
console.log('Saved sywExactGeoData.js with exact 1756/1764 Poland borders (', sywFeatures.length, 'territories).');
