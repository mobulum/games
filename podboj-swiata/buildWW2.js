const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

const colors = {
  germany: '#454545', // Third Reich dark grey
  ussr: '#b91c1c',    // Soviet Red
  poland: '#dc2626',  // Poland Red/White
  uk: '#1e40af',      // Allied Blue
  france: '#2563eb',  // French Blue
  italy: '#15803d',   // Fascist Italy Green
  neutral: '#78716c', // Neutral Grey
  japan: '#be123c',
  hungary: '#d97706',
  romania: '#ca8a04',
  finland: '#0284c7'
};

const ww2Features = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;

  if (iso === 'POL') {
    ww2Features.push(
      { ...f, properties: { id: 'WW2_POL_WAR', name: 'II Rzeczpospolita - Centralna (Warszawa)', country: 'II Rzeczpospolita', pop: 18, gdp: 300, army: 80, color: colors.poland, faction: 'Alianci' } },
      { ...f, properties: { id: 'WW2_POL_KRE', name: 'II Rzeczpospolita - Kresy Wschodnie (Lwów/Wilno)', country: 'II Rzeczpospolita', pop: 16, gdp: 250, army: 60, color: colors.poland, faction: 'Alianci' } }
    );
  } else if (iso === 'DEU' || iso === 'AUT' || iso === 'CZE') {
    ww2Features.push({
      ...f,
      properties: {
        id: `WW2_DEU_${iso}`,
        name: `III Rzesza - ${props.NAME} (Wielkie Niemcy)`,
        country: 'III Rzesza',
        pop: 30,
        gdp: 1600,
        army: 180,
        color: colors.germany,
        faction: 'Oś'
      }
    });
  } else if (iso === 'RUS' || iso === 'UKR' || iso === 'BLR' || iso === 'KAZ') {
    ww2Features.push({
      ...f,
      properties: {
        id: `WW2_ZSRR_${iso}`,
        name: `ZSRR - ${props.NAME} (Związek Radziecki)`,
        country: 'ZSRR',
        pop: 50,
        gdp: 1400,
        army: 220,
        color: colors.ussr,
        faction: 'Komintern'
      }
    });
  } else if (iso === 'GBR') {
    ww2Features.push({
      ...f,
      properties: {
        id: 'WW2_GBR',
        name: 'Imperium Brytyjskie (Wielka Brytania)',
        country: 'Wielka Brytania',
        pop: 48,
        gdp: 2000,
        army: 130,
        color: colors.uk,
        faction: 'Alianci'
      }
    });
  } else if (iso === 'FRA') {
    ww2Features.push({
      ...f,
      properties: {
        id: 'WW2_FRA',
        name: 'Republika Francuska (Linia Maginota)',
        country: 'Francja',
        pop: 42,
        gdp: 1500,
        army: 110,
        color: colors.france,
        faction: 'Alianci'
      }
    });
  } else if (iso === 'ITA') {
    ww2Features.push({
      ...f,
      properties: {
        id: 'WW2_ITA',
        name: 'Włochy (Mussolini)',
        country: 'Włochy',
        pop: 44,
        gdp: 900,
        army: 95,
        color: colors.italy,
        faction: 'Oś'
      }
    });
  } else if (iso === 'HUN') {
    ww2Features.push({ ...f, properties: { id: 'WW2_HUN', name: 'Królestwo Węgier (Horthy)', country: 'Węgry', pop: 9, gdp: 200, army: 40, color: colors.hungary, faction: 'Oś' } });
  } else if (iso === 'ROU') {
    ww2Features.push({ ...f, properties: { id: 'WW2_ROU', name: 'Królestwo Rumunii (Antonescu)', country: 'Rumunia', pop: 15, gdp: 250, army: 50, color: colors.romania, faction: 'Oś' } });
  } else if (iso === 'FIN') {
    ww2Features.push({ ...f, properties: { id: 'WW2_FIN', name: 'Finlandia (Linia Mannerheima)', country: 'Finlandia', pop: 4, gdp: 150, army: 45, color: colors.finland, faction: 'Oś' } });
  } else if (['ESP', 'PRT', 'SWE', 'CHE', 'TUR'].includes(iso)) {
    ww2Features.push({ ...f, properties: { id: `WW2_NEU_${iso}`, name: `${props.NAME} (Państwo Neutralne)`, country: props.NAME, pop: 15, gdp: 400, army: 35, color: colors.neutral, faction: 'Neutralni' } });
  }
});

const ww2GeoJSON = {
  type: 'FeatureCollection',
  features: ww2Features
};

const content = 'const WW2_GEOJSON = ' + JSON.stringify(ww2GeoJSON) + ';\nif (typeof module !== "undefined") module.exports = WW2_GEOJSON;';
fs.writeFileSync('ww2GeoData.js', content);
console.log('Saved ww2GeoData.js with', ww2Features.length, 'WW2 historical factions and regions.');
