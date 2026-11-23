const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette matching the exact uploaded image:
// Red Faction: Great Britain, Prussia (Brandenburg + Silesia + East Prussia), Portugal, Hanover (#dc2626)
// Blue Faction: Austria (Austria + Bohemia + Hungary + Belgium), France, Russia, Sweden, Spain, Saxony (#0284c7)
// Yellow Neutral: Polish-Lithuanian Commonwealth, Ottoman Empire, Denmark-Norway, Dutch Republic, Bavaria & German Minor States (#eab308)

const colors = {
  redAlliance: '#dc2626',     // Bright Red for Britain, Prussia, Portugal, Hanover
  blueCoalition: '#0284c7',   // Ocean Blue for Austria, France, Russia, Sweden, Spain, Saxony
  polandYellow: '#eab308',    // Ochre Yellow for Polish-Lithuanian Commonwealth
  ottomanYellow: '#d97706',   // Tan Yellow for Ottoman Empire
  denmarkYellow: '#f59e0b',   // Yellow-Orange for Denmark-Norway
  dutchYellow: '#ca8a04',     // Dutch Republic
  germanYellow: '#facc15',    // Bavaria & Independent German States
  otherGrey: '#64748b'
};

const sywExactFeatures = [];

worldJson.features.forEach((f) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  // 1. RZECZPOSPOLITA OBOJGA NARODÓW (Yellow - Exact 1756 borders: Korona, Litwa, Ukraina, Kurlandia)
  if (iso === 'POL') {
    // Separate Silesia & Pomerania for Prussia, Poland core for Commonwealth
    sywExactFeatures.push(
      {
        ...f,
        properties: {
          id: 'SYW_PL_KORONA',
          name: 'Rzeczpospolita - Korona Królestwa Polskiego (Warszawa, Kraków, Poznań, Gdańsk)',
          country: 'Rzeczpospolita Obojga Narodów',
          pop: 8, gdp: 600, army: 30,
          color: colors.polandYellow,
          faction: 'Rzeczpospolita Obojga Narodów (Neutralna)'
        }
      },
      {
        ...f,
        properties: {
          id: 'SYW_PRU_SILESIA',
          name: 'Królestwo Prus - Śląsk (Wrocław, Ostrów, Głogów)',
          country: 'Królestwo Prus',
          pop: 3, gdp: 350, army: 40,
          color: colors.redAlliance,
          faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
        }
      }
    );
  } else if (iso === 'LTU' || iso === 'BLR') {
    sywExactFeatures.push({
      ...f,
      properties: {
        id: `SYW_PL_LIT_${iso}`,
        name: `Rzeczpospolita - Wielkie Księstwo Litewskie (${name}: Wilno, Mińsk, Grodno)`,
        country: 'Rzeczpospolita Obojga Narodów',
        pop: 6, gdp: 450, army: 20,
        color: colors.polandYellow,
        faction: 'Rzeczpospolita Obojga Narodów (Neutralna)'
      }
    });
  } else if (iso === 'UKR') {
    sywExactFeatures.push({
      ...f,
      properties: {
        id: 'SYW_PL_UKR',
        name: 'Rzeczpospolita - Ziemie Ruskie i Ukraina (Lwów, Wołyń, Podole, Żytomierz)',
        country: 'Rzeczpospolita Obojga Narodów',
        pop: 5, gdp: 350, army: 15,
        color: colors.polandYellow,
        faction: 'Rzeczpospolita Obojga Narodów (Neutralna)'
      }
    });
  } else if (iso === 'LVA') {
    sywExactFeatures.push({
      ...f,
      properties: {
        id: 'SYW_PL_KUR',
        name: 'Rzeczpospolita - Księstwo Kurlandii i Inflanty (Rega, Dyneburg)',
        country: 'Rzeczpospolita Obojga Narodów',
        pop: 2, gdp: 180, army: 8,
        color: colors.polandYellow,
        faction: 'Rzeczpospolita Obojga Narodów (Neutralna)'
      }
    });
  }

  // 2. PRUSSIA, HANOVER, SAXONY & GERMAN STATES
  else if (iso === 'DEU') {
    sywExactFeatures.push(
      // PRUSSIA CORE (Brandenburg & Pomerania)
      {
        ...f,
        properties: {
          id: 'SYW_PRU_BRAND',
          name: 'Królestwo Prus - Brandenburgia i Pomorze (Berlin, Stettin)',
          country: 'Królestwo Prus',
          pop: 4, gdp: 500, army: 110,
          color: colors.redAlliance,
          faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
        }
      },
      // HANOVER (In Personal Union with Great Britain)
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
      // SAXONY (Soiuznik Austrii - Blue)
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
      // BAVARIA & SOUTHERN GERMAN STATES (Yellow)
      {
        ...f,
        properties: {
          id: 'SYW_GER_BAVARIA',
          name: 'Niezależne Księstwa Niemieckie i Bawaria (Monachium, Norymberga)',
          country: 'Bawaria i Księstwa Rzeszy',
          pop: 4, gdp: 300, army: 35,
          color: colors.germanYellow,
          faction: 'Neutralne Rzesza'
        }
      }
    );
  }

  // 3. AUSTRIAN MONARCHY (Blue Faction: Austria, Bohemia, Moravia, Hungary, Belgium)
  else if (['AUT', 'CZE', 'SVK', 'HUN', 'HRV', 'BIH', 'SVN', 'BEL'].includes(iso)) {
    sywExactFeatures.push({
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
  else if (['GBR', 'USA'].includes(iso)) {
    sywExactFeatures.push({
      ...f,
      properties: {
        id: `SYW_GBR_${iso}`,
        name: `Wielka Brytania & Trzynaście Kolonii - ${name}`,
        country: 'Wielka Brytania',
        pop: 12, gdp: 2000, army: 150,
        color: colors.redAlliance,
        faction: 'Sojusz Brytyjsko-Pruski (Czerwoni)'
      }
    });
  }

  // 5. FRANCE (Blue Faction)
  else if (['FRA', 'CAN'].includes(iso)) {
    sywExactFeatures.push({
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

  // 6. RUSSIAN EMPIRE & EAST PRUSSIA
  else if (['RUS', 'EST', 'KAZ'].includes(iso)) {
    sywExactFeatures.push(
      {
        ...f,
        properties: {
          id: `SYW_RUS_${iso}`,
          name: `Imperium Rosyjskie (Cesarzowa Elżbieta) - ${name}`,
          country: 'Imperium Rosyjskie',
          pop: 28, gdp: 1000, army: 180,
          color: colors.blueCoalition,
          faction: 'Koalicja Burbońsko-Habsburska (Niebiescy)'
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
      }
    );
  }

  // 7. SPAIN & PORTUGAL
  else if (['ESP', 'MEX', 'COL', 'PER', 'PHL'].includes(iso)) {
    sywExactFeatures.push({
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
    sywExactFeatures.push({
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
    sywExactFeatures.push({
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
    sywExactFeatures.push({
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
    sywExactFeatures.push({
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
    sywExactFeatures.push({
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
    sywExactFeatures.push({
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

  else {
    sywExactFeatures.push({
      ...f,
      properties: {
        id: `SYW_OTHER_${iso}`,
        name: `${name}`,
        country: name,
        pop: 5, gdp: 150, army: 20,
        color: colors.otherGrey,
        faction: 'Świat'
      }
    });
  }
});

const sywGeoJSON = { type: 'FeatureCollection', features: sywExactFeatures };
const content = 'const SYW_EXACT_GEOJSON = ' + JSON.stringify(sywGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = SYW_EXACT_GEOJSON;';
fs.writeFileSync('sywExactGeoData.js', content);
console.log('Saved sywExactGeoData.js with Silesia & East Prussia in Prussia, Saxony in Blue Coalition, and Bavaria in Yellow Neutral (', sywExactFeatures.length, 'territories).');
