const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

const europeIsos = [
  'POL', 'DEU', 'FRA', 'ITA', 'ESP', 'GBR', 'UKR', 'ROU', 'BLR', 'GRC',
  'PRT', 'SWE', 'NOR', 'FIN', 'AUT', 'CHE', 'CZE', 'SVK', 'HUN', 'DNK',
  'IRL', 'NLD', 'BEL', 'SRB', 'HRV', 'BGR', 'LTU', 'LVA', 'EST', 'BIH',
  'ALB', 'MKD', 'SVN', 'MDA', 'ISL', 'RUS'
];

const colors = ['#dc2626', '#3b82f6', '#16a34a', '#eab308', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899', '#14b8a6', '#6366f1', '#a855f7', '#d97706'];

const europeFeatures = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;

  if (europeIsos.includes(iso)) {
    const name = props.NAME_LONG || props.NAME;
    
    if (iso === 'POL') {
      europeFeatures.push(
        { ...f, properties: { id: 'POL_MAZ', name: 'Polska - Mazowsze (Warszawa)', country: 'Polska', pop: 12, gdp: 350, army: 45, color: '#dc2626' } },
        { ...f, properties: { id: 'POL_SLA', name: 'Polska - Śląsk i Małopolska', country: 'Polska', pop: 14, gdp: 320, army: 40, color: '#dc2626' } },
        { ...f, properties: { id: 'POL_POM', name: 'Polska - Pomorze i Wielkopolska', country: 'Polska', pop: 12, gdp: 280, army: 35, color: '#dc2626' } }
      );
    } else if (iso === 'DEU') {
      europeFeatures.push(
        { ...f, properties: { id: 'DEU_BAV', name: 'Niemcy - Bawaria i Południe', country: 'Niemcy', pop: 25, gdp: 1400, army: 50, color: '#3b82f6' } },
        { ...f, properties: { id: 'DEU_NRW', name: 'Niemcy - Nadrenia i Północ', country: 'Niemcy', pop: 35, gdp: 1800, army: 60, color: '#3b82f6' } },
        { ...f, properties: { id: 'DEU_SAC', name: 'Niemcy - Saksonia i Berlin', country: 'Niemcy', pop: 23, gdp: 1000, army: 45, color: '#3b82f6' } }
      );
    } else if (iso === 'FRA') {
      europeFeatures.push(
        { ...f, properties: { id: 'FRA_PAR', name: 'Francja - Region Paryski', country: 'Francja', pop: 20, gdp: 1200, army: 55, color: '#2563eb' } },
        { ...f, properties: { id: 'FRA_SOU', name: 'Francja - Prowansja i Południe', country: 'Francja', pop: 25, gdp: 900, army: 45, color: '#2563eb' } },
        { ...f, properties: { id: 'FRA_NOR', name: 'Francja - Normandia i Zachód', country: 'Francja', pop: 22, gdp: 800, army: 40, color: '#2563eb' } }
      );
    } else if (iso === 'GBR') {
      europeFeatures.push(
        { ...f, properties: { id: 'GBR_ENG', name: 'Wielka Brytania - Anglia (Londyn)', country: 'Wielka Brytania', pop: 55, gdp: 2500, army: 65, color: '#8b5cf6' } },
        { ...f, properties: { id: 'GBR_SCO', name: 'Wielka Brytania - Szkocja i Irlandia Płn.', country: 'Wielka Brytania', pop: 12, gdp: 600, army: 30, color: '#8b5cf6' } }
      );
    } else if (iso === 'ESP') {
      europeFeatures.push(
        { ...f, properties: { id: 'ESP_MAD', name: 'Hiszpania - Madryt i Kastylia', country: 'Hiszpania', pop: 20, gdp: 650, army: 45, color: '#f97316' } },
        { ...f, properties: { id: 'ESP_CAT', name: 'Hiszpania - Katalonia i Wybrzeże', country: 'Hiszpania', pop: 16, gdp: 500, army: 35, color: '#f97316' } },
        { ...f, properties: { id: 'ESP_AND', name: 'Hiszpania - Andaluzja i Południe', country: 'Hiszpania', pop: 11, gdp: 350, army: 30, color: '#f97316' } }
      );
    } else if (iso === 'ITA') {
      europeFeatures.push(
        { ...f, properties: { id: 'ITA_NOR', name: 'Włochy - Lombardia i Mediolan', country: 'Włochy', pop: 26, gdp: 1100, army: 45, color: '#16a34a' } },
        { ...f, properties: { id: 'ITA_SOU', name: 'Włochy - Rzym i Sycylia', country: 'Włochy', pop: 33, gdp: 1000, army: 40, color: '#16a34a' } }
      );
    } else {
      europeFeatures.push({
        ...f,
        properties: {
          id: iso,
          name: name,
          country: name,
          pop: Math.max(2, Math.round((props.POP_EST || 5000000) / 1000000)),
          gdp: Math.max(20, Math.round(props.GDP_MD || 20000)),
          army: Math.max(10, Math.round(15 + Math.random() * 50)),
          color: colors[idx % colors.length]
        }
      });
    }
  }
});

const europeGeoJSON = {
  type: 'FeatureCollection',
  features: europeFeatures
};

const content = 'const EUROPE_GEOJSON = ' + JSON.stringify(europeGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = EUROPE_GEOJSON;';
fs.writeFileSync('europeGeoData.js', content);
console.log('Saved europeGeoData.js with', europeFeatures.length, 'European provinces.');
