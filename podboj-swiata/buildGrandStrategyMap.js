const fs = require('fs');
const raw = fs.readFileSync('world.geojson', 'utf8');
const worldJson = JSON.parse(raw);

// Color Palette matching the exact Age of History / HOI uploaded image:
// Carstwo Rosyjskie: Forest Green (#1e4a23)
// Rzeczpospolita: Ochre Gold (#b45309 / #d97706)
// Szwecja: Dark Navy Blue (#1d3557)
// Imperium Osmańskie: Imperial Crimson (#991b1b)
// Francja: Deep Blue (#1e3a8a)
// Wielka Brytania & Dania-Norwegia: Dark Red (#991b1b / #b91c1c)
// Prusy: Prussian Slate (#334155)
// Austria: Habsburg Amber (#c2410c)
// Hiszpania & Portugalia: Terracotta (#ca8a04 / #0f766e)

const colors = {
  russia: '#1e4a23',
  poland: '#b45309',
  sweden: '#1d3557',
  ottoman: '#991b1b',
  france: '#1e3a8a',
  britain: '#b91c1c',
  prussia: '#334155',
  austria: '#c2410c',
  spain: '#ca8a04',
  portugal: '#0f766e',
  denmark: '#991b1b',
  dutch: '#d97706',
  hre: '#475569',
  other: '#334155'
};

const grandFeatures = [];

worldJson.features.forEach((f) => {
  const props = f.properties;
  const iso = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
  const name = props.NAME_LONG || props.NAME;

  // 1. RZECZPOSPOLITA OBOJGA NARODÓW (Ochre Gold - Subdivided into historical Voivodeships)
  if (iso === 'POL') {
    grandFeatures.push(
      { ...f, properties: { id: 'GS_PL_MAZ', name: 'Ziemia Warszawska i Mazowsze (Warszawa)', country: 'Rzeczpospolita Obojga Narodów', pop: 4, gdp: 350, army: 20, color: colors.poland, faction: 'Rzeczpospolita Obojga Narodów' } },
      { ...f, properties: { id: 'GS_PL_WLP', name: 'Wielkopolska (Poznań, Kalisz)', country: 'Rzeczpospolita Obojga Narodów', pop: 3, gdp: 300, army: 15, color: '#a16207' } },
      { ...f, properties: { id: 'GS_PL_MLP', name: 'Małopolska (Kraków, Sandomierz)', country: 'Rzeczpospolita Obojga Narodów', pop: 4, gdp: 320, army: 18, color: '#92400e' } },
      { ...f, properties: { id: 'GS_PL_PRU', name: 'Prusy Królewskie (Gdańsk, Toruń)', country: 'Rzeczpospolita Obojga Narodów', pop: 3, gdp: 400, army: 16, color: '#d97706' } }
    );
  } else if (iso === 'LTU') {
    grandFeatures.push(
      { ...f, properties: { id: 'GS_PL_WIL', name: 'Województwo Wileńskie i Trockie (Wilno, Troki)', country: 'Rzeczpospolita Obojga Narodów', pop: 3, gdp: 280, army: 15, color: colors.poland } },
      { ...f, properties: { id: 'GS_PL_ZMU', name: 'Księstwo Żmudzkie (Miedniki)', country: 'Rzeczpospolita Obojga Narodów', pop: 2, gdp: 180, army: 10, color: '#a16207' } }
    );
  } else if (iso === 'BLR') {
    grandFeatures.push(
      { ...f, properties: { id: 'GS_PL_MIN', name: 'Województwo Mińskie i Nowogródzkie (Mińsk, Grodno)', country: 'Rzeczpospolita Obojga Narodów', pop: 3, gdp: 240, army: 12, color: colors.poland } },
      { ...f, properties: { id: 'GS_PL_WIT', name: 'Województwo Witebskie i Połockie (Witebsk, Połock)', country: 'Rzeczpospolita Obojga Narodów', pop: 2, gdp: 200, army: 10, color: '#92400e' } }
    );
  } else if (iso === 'UKR') {
    grandFeatures.push(
      { ...f, properties: { id: 'GS_PL_RUS', name: 'Województwo Ruskie i Wołyń (Lwów, Przemyśl, Łuck)', country: 'Rzeczpospolita Obojga Narodów', pop: 4, gdp: 310, army: 16, color: colors.poland } },
      { ...f, properties: { id: 'GS_PL_POD', name: 'Podole i Bracławszczyzna (Kamieniec Podolski)', country: 'Rzeczpospolita Obojga Narodów', pop: 3, gdp: 230, army: 12, color: '#a16207' } },
      { ...f, properties: { id: 'GS_PL_KIJ', name: 'Województwo Kijowskie (Żytomierz, Biała Cerkiew)', country: 'Rzeczpospolita Obojga Narodów', pop: 3, gdp: 250, army: 14, color: '#92400e' } }
    );
  } else if (iso === 'LVA') {
    grandFeatures.push(
      { ...f, properties: { id: 'GS_PL_KUR', name: 'Księstwo Kurlandii i Inflanty (Dyneburg, Ryga)', country: 'Rzeczpospolita Obojga Narodów', pop: 2, gdp: 190, army: 8, color: colors.poland } }
    );
  }

  // 2. CARSTWO ROSYJSKIE (Forest Green)
  else if (['RUS', 'EST', 'KAZ'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_RUS_${iso}`, name: `Carstwo Rosyjskie - ${name} (Petersburg, Moskwa)`, country: 'Carstwo Rosyjskie', pop: 28, gdp: 1100, army: 180, color: colors.russia, faction: 'Carstwo Rosyjskie' } }
    );
  }

  // 3. SZWECJA (Navy Blue)
  else if (iso === 'SWE' || iso === 'FIN') {
    grandFeatures.push(
      { ...f, properties: { id: `GS_SWE_${iso}`, name: `Królestwo Szwecji - ${name} (Sztokholm, Finlandia)`, country: 'Szwecja', pop: 4, gdp: 300, army: 50, color: colors.sweden, faction: 'Szwecja' } }
    );
  }

  // 4. IMPERIUM OSMAŃSKIE (Crimson Red)
  else if (['TUR', 'SYR', 'IRQ', 'EGY', 'GRC', 'BGR', 'ROU', 'SRB'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_OTT_${iso}`, name: `Imperium Osmańskie - ${name} (Stambuł, Bałkany, Egipt)`, country: 'Imperium Osmańskie', pop: 24, gdp: 700, army: 120, color: colors.ottoman, faction: 'Imperium Osmańskie' } }
    );
  }

  // 5. FRANCJA (Royal Blue)
  else if (['FRA', 'CAN'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_FRA_${iso}`, name: `Królestwo Francji - ${name} (Paryż, Bretania)`, country: 'Francja', pop: 24, gdp: 2100, army: 190, color: colors.france, faction: 'Francja' } }
    );
  }

  // 6. WIELKA BRYTANIA & DANIA-NORWEGIA (Dark Red)
  else if (['GBR', 'IRL', 'USA'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_GBR_${iso}`, name: `Wielka Brytania - ${name} (Londyn, Edynburg)`, country: 'Wielka Brytania', pop: 12, gdp: 2000, army: 160, color: colors.britain, faction: 'Wielka Brytania' } }
    );
  } else if (['DNK', 'NOR'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_DNK_${iso}`, name: `Dania-Norwegia - ${name} (Kopenhaga)`, country: 'Dania-Norwegia', pop: 3, gdp: 250, army: 30, color: colors.denmark, faction: 'Dania-Norwegia' } }
    );
  }

  // 7. KRÓLESTWO PRUS, HANOWER, SAKSONIA I HRE
  else if (iso === 'DEU') {
    grandFeatures.push(
      { ...f, properties: { id: 'GS_PRU_BRAND', name: 'Królestwo Prus - Brandenburgia i Pomorze (Berlin, Szczecin)', country: 'Królestwo Prus', pop: 4, gdp: 500, army: 110, color: colors.prussia, faction: 'Prusy' } },
      { ...f, properties: { id: 'GS_PRU_SIL', name: 'Królestwo Prus - Śląsk (Wrocław, Głogów)', country: 'Królestwo Prus', pop: 3, gdp: 350, army: 40, color: '#1e293b', faction: 'Prusy' } },
      { ...f, properties: { id: 'GS_GER_HAN', name: 'Elektorat Hanoweru (Wielka Brytania)', country: 'Hanower', pop: 2, gdp: 200, army: 25, color: colors.britain, faction: 'Hanower' } },
      { ...f, properties: { id: 'GS_GER_SAX', name: 'Elektorat Saksonii (Drezno)', country: 'Saksonia', pop: 2, gdp: 220, army: 20, color: '#334155', faction: 'Saksonia' } },
      { ...f, properties: { id: 'GS_GER_BAV', name: 'Bawaria i Księstwa Niemieckie (Monachium)', country: 'Bawaria', pop: 4, gdp: 300, army: 30, color: colors.hre, faction: 'HRE' } }
    );
  }

  // 8. MONARCHIA HABSBURGÓW / AUSTRIA (Habsburg Amber)
  else if (['AUT', 'CZE', 'SVK', 'HUN', 'HRV', 'BIH', 'SVN', 'BEL'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_AUT_${iso}`, name: `Monarchia Habsburgów - ${name} (Wiedeń, Praga, Buda)`, country: 'Monarchia Habsburgów', pop: 22, gdp: 1300, army: 170, color: colors.austria, faction: 'Monarchia Habsburgów' } }
    );
  }

  // 9. HISZPANIA & PORTUGALIA
  else if (['ESP', 'MEX', 'COL', 'PER', 'PHL'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_ESP_${iso}`, name: `Imperium Hiszpańskie - ${name} (Madryt)`, country: 'Hiszpania', pop: 20, gdp: 1300, army: 110, color: colors.spain, faction: 'Hiszpania' } }
    );
  } else if (['PRT', 'BRA'].includes(iso)) {
    grandFeatures.push(
      { ...f, properties: { id: `GS_PRT_${iso}`, name: `Królestwo Portugalii - ${name} (Lizbona)`, country: 'Portugalia', pop: 4, gdp: 450, army: 40, color: colors.portugal, faction: 'Portugalia' } }
    );
  }

  // 10. ALL OTHER WORLD NATIONS PRESERVED
  else {
    grandFeatures.push(
      { ...f, properties: { id: `GS_WORLD_${iso}`, name: `${name}`, country: name, pop: 5, gdp: 150, army: 20, color: colors.other, faction: 'Świat' } }
    );
  }
});

const sywGrandGeoJSON = { type: 'FeatureCollection', features: grandFeatures };
const content = 'const SYW_EXACT_GEOJSON = ' + JSON.stringify(sywGrandGeoJSON) + ';\nif (typeof module !== "undefined") module.exports = SYW_EXACT_GEOJSON;';
fs.writeFileSync('sywExactGeoData.js', content);
console.log('Saved sywExactGeoData.js matching Age of History Grand Strategy Map (', grandFeatures.length, 'provinces).');
