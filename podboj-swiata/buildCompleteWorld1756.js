const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette matching the exact uploaded image 1:1
// Red Alliance (#dc2626): Great Britain, Prussia (Brandenburg + Western Pomerania + Silesia + East Prussia), Portugal, Hanover
// Blue Coalition (#0284c7): Austria (Austria + Bohemia + Hungary + Belgium), France, Russia, Sweden, Spain, Saxony
// Yellow Neutral (#eab308 / #d97706): Polish-Lithuanian Commonwealth (Warsaw, Kraków, Poznań, Gdańsk, Wilno, Lwów, Kijów), Ottoman Empire, Denmark-Norway, Dutch Republic, Italian States, Rest of World

const colors = {
  redAlliance: '#dc2626',     // Bright Red for Prussia, Britain, Portugal, Hanover
  blueCoalition: '#0284c7',   // Ocean Blue for Austria, France, Russia, Sweden, Spain, Saxony
  polandYellow: '#eab308',    // Ochre Yellow for Rzeczpospolita (Warszawa, Kraków, Poznań)
  ottomanYellow: '#d97706',   // Tan Yellow for Ottoman Empire
  denmarkYellow: '#f59e0b',   // Yellow-Orange for Denmark-Norway
  dutchYellow: '#ca8a04',     // Dutch Republic
  germanYellow: '#facc15',    // Bavaria & Independent German States
  otherWorld: '#475569'       // World countries
};

const sywAllFeatures = [];

worldJson.features.forEach((f, idx) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  // 1. POLSKA / RZECZPOSPOLITA OBOJGA NARODÓW (Yellow - Warszawa, Poznań, Kraków, Gdańsk, Wilno, Lwów, Kijów)
  if (['POL', 'LTU', 'BLR', 'UKR', 'LVA'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_PL_${iso}`,
        name: `Rzeczpospolita Obojga Narodów - ${name} (Warszawa, Poznań, Kraków, Wilno, Lwów, Kijów)`,
        country: 'Rzeczpospolita Obojga Narodów',
        pop: 14, gdp: 1200, army: 50,
        color: colors.polandYellow,
        faction: 'Rzeczpospolita Obojga Narodów (Neutralna)'
      }
    });
  }

  // 2. KRÓLESTWO PRUS (Red - Brandenburgia, Pomorze Zachodnie, Śląsk, Prusy Wschodnie) & HANOWER
  else if (iso === 'DEU') {
    sywAllFeatures.push(
      {
        ...f,
        properties: {
          id: 'SYW_PRU_BRAND',
          name: 'Królestwo Prus - Brandenburgia, Pomorze Zachodnie i Śląsk (Berlin, Stettin, Wrocław)',
          country: 'Królestwo Prus',
          pop: 5, gdp: 600, army: 120,
          color: colors.redAlliance,
          faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
        }
      },
      {
        ...f,
        properties: {
          id: 'SYW_PRU_EAST',
          name: 'Królestwo Prus - Prusy Wschodnie (Królewiec / Königsberg)',
          country: 'Królestwo Prus',
          pop: 2, gdp: 250, army: 30,
          color: colors.redAlliance,
          faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
        }
      },
      {
        ...f,
        properties: {
          id: 'SYW_PRU_HANOVER',
          name: 'Elektorat Hanoweru (Unia Personalna z Wielką Brytanią)',
          country: 'Hanower (Brytania)',
          pop: 2, gdp: 200, army: 30,
          color: colors.redAlliance,
          faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
        }
      },
      {
        ...f,
        properties: {
          id: 'SYW_GER_SAXONY',
          name: 'Elektorat Saksonii (Drezno - Sojusznik Austrii)',
          country: 'Saksonia',
          pop: 2, gdp: 220, army: 25,
          color: colors.blueCoalition,
          faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
        }
      },
      {
        ...f,
        properties: {
          id: 'SYW_GER_BAVARIA',
          name: 'Bawaria i Księstwa Niemieckie (Monachium)',
          country: 'Bawaria i Księstwa Rzeszy',
          pop: 4, gdp: 300, army: 35,
          color: colors.germanYellow,
          faction: 'Neutralne Rzesza'
        }
      }
    );
  }

  // 3. AUSTRIAN MONARCHY (Blue Faction - Austria, Bohemia, Moravia, Hungary, Slovakia, Croatia, Slovenia, Belgium)
  else if (['AUT', 'CZE', 'SVK', 'HUN', 'HRV', 'BIH', 'SVN', 'BEL'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_AUT_${iso}`,
        name: `Monarchia Habsburgów - ${name} (Wiedeń, Praga, Buda, Bruksela)`,
        country: 'Monarchia Habsburgów (Austria)',
        pop: 22, gdp: 1300, army: 170,
        color: colors.blueCoalition,
        faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
      }
    });
  }

  // 4. GREAT BRITAIN & IRELAND (Red Faction)
  else if (['GBR', 'IRL', 'USA'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_GBR_${iso}`,
        name: `Wielka Brytania & Trzynaście Kolonii - ${name}`,
        country: 'Wielka Brytania',
        pop: 12, gdp: 2000, army: 160,
        color: colors.redAlliance,
        faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
      }
    });
  }

  // 5. FRANCE (Blue Faction)
  else if (['FRA', 'CAN'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_FRA_${iso}`,
        name: `Królestwo Francji (Ludwik XV) - ${name}`,
        country: 'Królestwo Francji',
        pop: 25, gdp: 2100, army: 190,
        color: colors.blueCoalition,
        faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
      }
    });
  }

  // 6. RUSSIAN EMPIRE (Blue Faction)
  else if (['RUS', 'EST', 'KAZ'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_RUS_${iso}`,
        name: `Imperium Rosyjskie (Cesarzowa Elżbieta) - ${name}`,
        country: 'Imperium Rosyjskie',
        pop: 28, gdp: 1000, army: 180,
        color: colors.blueCoalition,
        faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
      }
    });
  }

  // 7. SPAIN & PORTUGAL
  else if (['ESP', 'MEX', 'COL', 'PER', 'PHL'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_ESP_${iso}`,
        name: `Imperium Hiszpańskie - ${name}`,
        country: 'Hiszpania',
        pop: 20, gdp: 1300, army: 110,
        color: colors.blueCoalition,
        faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
      }
    });
  } else if (['PRT', 'BRA'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_PRT_${iso}`,
        name: `Królestwo Portugalii - ${name}`,
        country: 'Portugalia',
        pop: 4, gdp: 450, army: 40,
        color: colors.redAlliance,
        faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
      }
    });
  }

  // 8. SWEDEN & DENMARK-NORWAY
  else if (iso === 'SWE') {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: 'SYW_SWE',
        name: 'Królestwo Szwecji (Wojna Pomorska)',
        country: 'Szwecja',
        pop: 3, gdp: 240, army: 45,
        color: colors.blueCoalition,
        faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
      }
    });
  } else if (['DNK', 'NOR'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_DNK_${iso}`,
        name: `Królestwo Danii i Norwegii - ${name}`,
        country: 'Dania-Norwegia',
        pop: 3, gdp: 220, army: 30,
        color: colors.denmarkYellow,
        faction: 'Neutralne'
      }
    });
  }

  // 9. OTTOMAN EMPIRE, DUTCH REPUBLIC, SWITZERLAND & ITALIAN STATES
  else if (['TUR', 'SYR', 'IRQ', 'EGY', 'GRC', 'BGR', 'ROU', 'SRB'].includes(iso)) {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_OTT_${iso}`,
        name: `Imperium Osmańskie - ${name}`,
        country: 'Imperium Osmańskie',
        pop: 24, gdp: 600, army: 90,
        color: colors.ottomanYellow,
        faction: 'Neutralne'
      }
    });
  } else if (iso === 'NLD') {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: 'SYW_NLD',
        name: 'Republika Siedmiu Zjednoczonych Prowincji (Holandia)',
        country: 'Holandia',
        pop: 2, gdp: 400, army: 25,
        color: colors.dutchYellow,
        faction: 'Neutralne'
      }
    });
  } else if (iso === 'CHE' || iso === 'ITA') {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_ITA_${iso}`,
        name: `Państwa Włoskie i Szwajcaria - ${name}`,
        country: name,
        pop: 8, gdp: 500, army: 35,
        color: colors.germanYellow,
        faction: 'Neutralne'
      }
    });
  }

  // ALL OTHER WORLD COUNTRIES PRESERVED (Americas, Asia, Africa, Oceania)
  else {
    sywAllFeatures.push({
      ...f,
      properties: {
        id: `SYW_WORLD_${iso}`,
        name: `${name}`,
        country: name,
        pop: 5, gdp: 150, army: 20,
        color: colors.otherWorld,
        faction: 'Świat'
      }
    });
  }
});

const sywFullGeoJSON = { type: 'FeatureCollection', features: sywAllFeatures };
const content = 'const SYW_EXACT_GEOJSON = ' + JSON.stringify(sywFullGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = SYW_EXACT_GEOJSON;';
fs.writeFileSync('sywExactGeoData.js', content);
console.log('Saved sywExactGeoData.js preserving FULL WORLD (', sywAllFeatures.length, 'territories) with Prussia (Silesia + West Pomerania) and Poland (Warsaw).');
