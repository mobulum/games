const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

const colors = [
  '#dc2626', '#b91c1c', '#991b1b', '#eab308', '#d97706', '#ca8a04',
  '#16a34a', '#15803d', '#166534', '#3b82f6', '#2563eb', '#1d4ed8',
  '#8b5cf6', '#7c3aed', '#6d28d9', '#ec4899', '#db2777', '#06b6d4'
];

const poland1764Features = [];

// Find base Poland & Ukraine & Belarus & Baltics features to construct 1764 Voivodeships
worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;

  if (iso === 'POL') {
    poland1764Features.push(
      { ...f, properties: { id: 'PL1764_KRA', name: 'Województwo Krakowskie (Kraków)', country: 'Rzeczpospolita (Korona)', pop: 8, gdp: 320, army: 25, color: '#dc2626' } },
      { ...f, properties: { id: 'PL1764_SAN', name: 'Województwo Sandomierskie (Sandomierz)', country: 'Rzeczpospolita (Korona)', pop: 7, gdp: 280, army: 20, color: '#b91c1c' } },
      { ...f, properties: { id: 'PL1764_MAZ', name: 'Ziemia Warszawska i Mazowsze (Warszawa)', country: 'Rzeczpospolita (Korona)', pop: 10, gdp: 380, army: 30, color: '#eab308' } },
      { ...f, properties: { id: 'PL1764_POZ', name: 'Województwo Poznańskie i Kaliskie (Wielkopolska)', country: 'Rzeczpospolita (Korona)', pop: 9, gdp: 310, army: 22, color: '#16a34a' } },
      { ...f, properties: { id: 'PL1764_LUB', name: 'Województwo Lubelskie i Podlaskie', country: 'Rzeczpospolita (Korona)', pop: 6, gdp: 240, army: 18, color: '#3b82f6' } },
      { ...f, properties: { id: 'PL1764_POM', name: 'Prusy Królewskie - Woj. Pomorskie (Gdańsk)', country: 'Rzeczpospolita (Korona)', pop: 8, gdp: 450, army: 24, color: '#06b6d4' } },
      { ...f, properties: { id: 'PL1764_CHE', name: 'Prusy Królewskie - Woj. Chełmińskie i Malborskie', country: 'Rzeczpospolita (Korona)', pop: 5, gdp: 220, army: 16, color: '#8b5cf6' } }
    );
  } else if (iso === 'UKR') {
    poland1764Features.push(
      { ...f, properties: { id: 'PL1764_RUS', name: 'Województwo Ruskie (Lwów, Przemyśl)', country: 'Rzeczpospolita (Korona)', pop: 11, gdp: 340, army: 25, color: '#d97706' } },
      { ...f, properties: { id: 'PL1764_WOL', name: 'Województwo Wołyńskie (Łuck)', country: 'Rzeczpospolita (Korona)', pop: 9, gdp: 260, army: 20, color: '#ca8a04' } },
      { ...f, properties: { id: 'PL1764_POD', name: 'Województwo Podolskie i Bracławskie (Kamieniec)', country: 'Rzeczpospolita (Korona)', pop: 8, gdp: 230, army: 18, color: '#15803d' } },
      { ...f, properties: { id: 'PL1764_KIJ', name: 'Województwo Kijowskie (Żytomierz)', country: 'Rzeczpospolita (Korona)', pop: 10, gdp: 270, army: 22, color: '#2563eb' } }
    );
  } else if (iso === 'LTU' || iso === 'BLR') {
    poland1764Features.push(
      { ...f, properties: { id: 'PL1764_WIL', name: 'Wielkie Księstwo Litewskie - Woj. Wileńskie (Wilno)', country: 'Rzeczpospolita (Litwa)', pop: 12, gdp: 360, army: 28, color: '#7c3aed' } },
      { ...f, properties: { id: 'PL1764_TRO', name: 'Wielkie Księstwo Litewskie - Woj. Trockie (Troki)', country: 'Rzeczpospolita (Litwa)', pop: 8, gdp: 250, army: 20, color: '#ec4899' } },
      { ...f, properties: { id: 'PL1764_ZMU', name: 'Księstwo Żmudzkie (Miedniki/Rosienie)', country: 'Rzeczpospolita (Litwa)', pop: 7, gdp: 220, army: 18, color: '#166534' } },
      { ...f, properties: { id: 'PL1764_MIN', name: 'Wielkie Księstwo Litewskie - Woj. Mińskie i Nowogródzkie', country: 'Rzeczpospolita (Litwa)', pop: 10, gdp: 290, army: 22, color: '#1d4ed8' } },
      { ...f, properties: { id: 'PL1764_WIT', name: 'Wielkie Księstwo Litewskie - Woj. Witebskie i Połockie', country: 'Rzeczpospolita (Litwa)', pop: 8, gdp: 240, army: 19, color: '#db2777' } }
    );
  } else if (iso === 'LVA') {
    poland1764Features.push(
      { ...f, properties: { id: 'PL1764_KUR', name: 'Księstwo Kurlandii i Semigalii (Lenne PON)', country: 'Rzeczpospolita (Lenne)', pop: 4, gdp: 180, army: 12, color: '#06b6d4' } },
      { ...f, properties: { id: 'PL1764_INF', name: 'Województwo Inflanckie (Dyneburg)', country: 'Rzeczpospolita (Inflanty)', pop: 3, gdp: 140, army: 10, color: '#0284c7' } }
    );
  } else if (iso === 'DEU') {
    poland1764Features.push({ ...f, properties: { id: 'PL1764_PRU', name: 'Królestwo Prus (Brandenburgia i Prusy Książęce)', country: 'Królestwo Prus', pop: 6, gdp: 550, army: 130, color: '#334155' } });
  } else if (iso === 'AUT') {
    poland1764Features.push({ ...f, properties: { id: 'PL1764_AUT', name: 'Monarchia Habsburgów (Austria)', country: 'Austria', pop: 20, gdp: 1100, army: 150, color: '#d97706' } });
  } else if (iso === 'RUS') {
    poland1764Features.push({ ...f, properties: { id: 'PL1764_RUS_EMP', name: 'Imperium Rosyjskie (Katarzyna II)', country: 'Rosja', pop: 28, gdp: 950, army: 160, color: '#4f772d' } });
  } else {
    poland1764Features.push({ ...f, properties: { id: `PL1764_${iso}`, name: `${props.NAME_LONG || props.NAME}`, country: props.NAME, pop: 6, gdp: 200, army: 25, color: '#475569' } });
  }
});

const poland1764GeoJSON = { type: 'FeatureCollection', features: poland1764Features };
const content = 'const POLAND_1764_GEOJSON = ' + JSON.stringify(poland1764GeoJSON) + ';\nif (typeof module !== "undefined") module.exports = POLAND_1764_GEOJSON;';
fs.writeFileSync('poland1764GeoData.js', content);
console.log('Saved poland1764GeoData.js matching Rzeczpospolita 1764 Map (', poland1764Features.length, 'voivodeships & countries).');
