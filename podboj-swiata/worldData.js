// World Map SVG Paths & Data for World Conquest Strategy Game
const WORLD_DATA = [
  // Europe
  { id: 'POL', name: 'Polska', continent: 'Europe', color: '#dc2626', x: 525, y: 195, size: 28, path: 'M515,185 L535,182 L540,195 L530,208 L512,202 Z', neighbors: ['DEU', 'CZE', 'SVK', 'UKR', 'BLR', 'LTU', 'RUS'], pop: 38, gdp: 680, army: 45 },
  { id: 'DEU', name: 'Niemcy', continent: 'Europe', color: '#3b82f6', x: 495, y: 195, size: 30, path: 'M485,185 L512,185 L515,202 L495,210 L482,198 Z', neighbors: ['POL', 'FRA', 'DNK', 'NLD', 'BEL', 'AUT', 'CZE', 'CHE'], pop: 83, gdp: 4200, army: 60 },
  { id: 'FRA', name: 'Francja', continent: 'Europe', color: '#2563eb', x: 460, y: 220, size: 35, path: 'M445,205 L480,202 L482,228 L455,242 L442,220 Z', neighbors: ['DEU', 'ESP', 'BEL', 'CHE', 'ITA'], pop: 67, gdp: 2900, army: 70 },
  { id: 'GBR', name: 'Wielka Brytania', continent: 'Europe', color: '#8b5cf6', x: 440, y: 175, size: 28, path: 'M430,160 L450,158 L455,188 L435,190 Z', neighbors: ['IRL', 'FRA'], pop: 67, gdp: 3100, army: 65 },
  { id: 'UKR', name: 'Ukraina', continent: 'Europe', color: '#eab308', x: 575, y: 205, size: 40, path: 'M545,195 L595,192 L600,220 L550,222 Z', neighbors: ['POL', 'RUS', 'BLR', 'ROU', 'MDA', 'SVK', 'HUN'], pop: 41, gdp: 200, army: 55 },
  { id: 'RUS', name: 'Rosja', continent: 'Europe/Asia', color: '#ef4444', x: 670, y: 155, size: 90, path: 'M540,150 L780,110 L820,180 L600,200 L545,190 Z', neighbors: ['POL', 'UKR', 'BLR', 'FIN', 'EST', 'LVA', 'LTU', 'KAZ', 'CHN', 'MNG', 'PRK'], pop: 144, gdp: 1800, army: 120 },
  { id: 'ITA', name: 'Włochy', continent: 'Europe', color: '#16a34a', x: 495, y: 240, size: 25, path: 'M485,225 L505,225 L512,255 L492,260 Z', neighbors: ['FRA', 'CHE', 'AUT', 'SVN'], pop: 59, gdp: 2100, army: 50 },
  { id: 'ESP', name: 'Hiszpania', continent: 'Europe', color: '#f97316', x: 420, y: 250, size: 35, path: 'M395,235 L440,235 L435,268 L395,260 Z', neighbors: ['FRA', 'PRT'], pop: 47, gdp: 1400, army: 45 },
  { id: 'PRT', name: 'Portugalia', continent: 'Europe', color: '#059669', x: 385, y: 252, size: 15, path: 'M380,240 L395,240 L392,268 L380,265 Z', neighbors: ['ESP'], pop: 10, gdp: 250, army: 20 },
  { id: 'BLR', name: 'Białoruś', continent: 'Europe', color: '#65a30d', x: 555, y: 175, size: 22, path: 'M540,165 L570,165 L572,188 L540,188 Z', neighbors: ['POL', 'RUS', 'UKR', 'LTU', 'LVA'], pop: 9, gdp: 70, army: 30 },
  { id: 'ROU', name: 'Rumunia', continent: 'Europe', color: '#d97706', x: 555, y: 230, size: 24, path: 'M540,220 L572,220 L570,242 L540,240 Z', neighbors: ['UKR', 'HUN', 'SRB', 'BGR', 'MDA'], pop: 19, gdp: 280, army: 35 },
  { id: 'GRC', name: 'Grecja', continent: 'Europe', color: '#0284c7', x: 540, y: 260, size: 20, path: 'M530,250 L550,250 L548,272 L532,268 Z', neighbors: ['TUR', 'ALB', 'MKD', 'BGR'], pop: 10, gdp: 220, army: 40 },
  { id: 'SWE', name: 'Szwecja', continent: 'Europe', color: '#0ea5e9', x: 505, y: 130, size: 30, path: 'M495,100 L518,100 L515,160 L495,155 Z', neighbors: ['NOR', 'FIN'], pop: 10, gdp: 540, army: 30 },
  { id: 'NOR', name: 'Norwegia', continent: 'Europe', color: '#475569', x: 480, y: 125, size: 28, path: 'M470,100 L492,100 L490,160 L475,150 Z', neighbors: ['SWE', 'FIN', 'RUS'], pop: 5, gdp: 480, army: 25 },
  { id: 'FIN', name: 'Finlandia', continent: 'Europe', color: '#38bdf8', x: 540, y: 120, size: 26, path: 'M528,95 L552,95 L550,150 L528,145 Z', neighbors: ['SWE', 'NOR', 'RUS'], pop: 5, gdp: 300, army: 35 },

  // Asia & Middle East
  { id: 'TUR', name: 'Turcja', continent: 'Asia', color: '#dc2626', x: 575, y: 260, size: 32, path: 'M555,248 L605,248 L600,272 L552,270 Z', neighbors: ['GRC', 'SYR', 'IRQ', 'IRN', 'GEO', 'ARM'], pop: 85, gdp: 800, army: 85 },
  { id: 'SAU', name: 'Arabia Saudyjska', continent: 'Asia', color: '#15803d', x: 610, y: 310, size: 45, path: 'M585,290 L640,290 L635,340 L585,325 Z', neighbors: ['IRQ', 'JOR', 'YEM', 'OMN', 'ARE'], pop: 35, gdp: 830, army: 60 },
  { id: 'IRN', name: 'Iran', continent: 'Asia', color: '#166534', x: 645, y: 275, size: 40, path: 'M620,255 L675,255 L670,295 L618,290 Z', neighbors: ['TUR', 'IRQ', 'AFG', 'PAK', 'AZE', 'TKM'], pop: 85, gdp: 360, army: 75 },
  { id: 'IRQ', name: 'Irak', continent: 'Asia', color: '#a16207', x: 605, y: 280, size: 22, path: 'M595,270 L618,270 L615,292 L592,290 Z', neighbors: ['TUR', 'SYR', 'JOR', 'SAU', 'IRN', 'KWT'], pop: 40, gdp: 200, army: 40 },
  { id: 'SYR', name: 'Syria', continent: 'Asia', color: '#854d0e', x: 585, y: 272, size: 18, path: 'M578,265 L596,265 L594,282 L578,280 Z', neighbors: ['TUR', 'IRQ', 'JOR', 'LBN', 'ISR'], pop: 18, gdp: 60, army: 30 },
  { id: 'CHN', name: 'Chiny', continent: 'Asia', color: '#b91c1c', x: 790, y: 250, size: 80, path: 'M730,210 L845,210 L840,290 L740,285 Z', neighbors: ['RUS', 'MNG', 'IND', 'PAK', 'NPL', 'MMR', 'VNM', 'PRK', 'KAZ'], pop: 1410, gdp: 17700, army: 200 },
  { id: 'IND', name: 'Indie', continent: 'Asia', color: '#ea580c', x: 720, y: 310, size: 60, path: 'M685,280 L745,280 L735,355 L695,325 Z', neighbors: ['PAK', 'CHN', 'NPL', 'BGD', 'MMR'], pop: 1400, gdp: 3400, army: 150 },
  { id: 'JPN', name: 'Japonia', continent: 'Asia', color: '#be123c', x: 885, y: 235, size: 28, path: 'M870,215 L895,215 L898,260 L872,255 Z', neighbors: ['KOR', 'RUS'], pop: 125, gdp: 4900, army: 80 },
  { id: 'KOR', name: 'Korea Południowa', continent: 'Asia', color: '#4338ca', x: 855, y: 245, size: 18, path: 'M848,238 L862,238 L862,255 L848,255 Z', neighbors: ['PRK', 'JPN'], pop: 51, gdp: 1800, army: 85 },
  { id: 'PRK', name: 'Korea Północna', continent: 'Asia', color: '#9f1239', x: 855, y: 230, size: 16, path: 'M848,222 L862,222 L862,238 L848,238 Z', neighbors: ['KOR', 'CHN', 'RUS'], pop: 25, gdp: 40, army: 90 },
  { id: 'IDN', name: 'Indonezja', continent: 'Asia', color: '#047857', x: 840, y: 375, size: 50, path: 'M790,365 L890,365 L885,395 L795,390 Z', neighbors: ['MYS', 'PNG', 'AUS'], pop: 273, gdp: 1300, army: 60 },
  { id: 'PAK', name: 'Pakistan', continent: 'Asia', color: '#15803d', x: 685, y: 280, size: 30, path: 'M670,265 L700,265 L698,300 L670,295 Z', neighbors: ['IND', 'AFG', 'IRN', 'CHN'], pop: 230, gdp: 340, army: 80 },

  // Americas
  { id: 'USA', name: 'Stany Zjednoczone', continent: 'Americas', color: '#1d4ed8', x: 220, y: 215, size: 85, path: 'M140,180 L290,175 L280,240 L150,245 Z', neighbors: ['CAN', 'MEX'], pop: 332, gdp: 25000, army: 220 },
  { id: 'CAN', name: 'Kanada', continent: 'Americas', color: '#dc2626', x: 210, y: 120, size: 95, path: 'M110,70 L300,65 L290,170 L130,175 Z', neighbors: ['USA'], pop: 38, gdp: 2100, army: 50 },
  { id: 'MEX', name: 'Meksyk', continent: 'Americas', color: '#15803d', x: 200, y: 280, size: 40, path: 'M170,250 L230,245 L220,310 L180,295 Z', neighbors: ['USA', 'GTM', 'BLZ'], pop: 128, gdp: 1300, army: 55 },
  { id: 'BRA', name: 'Brazylia', continent: 'Americas', color: '#16a34a', x: 340, y: 380, size: 75, path: 'M300,330 L385,330 L375,430 L305,420 Z', neighbors: ['ARG', 'COL', 'VEN', 'PER', 'BOL', 'PRY', 'URY'], pop: 214, gdp: 1900, army: 90 },
  { id: 'ARG', name: 'Argentyna', continent: 'Americas', color: '#0284c7', x: 315, y: 465, size: 45, path: 'M295,430 L330,430 L325,510 L295,500 Z', neighbors: ['BRA', 'CHL', 'PRY', 'URY', 'BOL'], pop: 45, gdp: 490, army: 45 },
  { id: 'COL', name: 'Kolumbia', continent: 'Americas', color: '#eab308', x: 275, y: 340, size: 28, path: 'M260,325 L290,325 L288,358 L262,355 Z', neighbors: ['VEN', 'BRA', 'PER', 'ECU', 'PAN'], pop: 51, gdp: 340, army: 45 },
  { id: 'CHL', name: 'Chile', continent: 'Americas', color: '#e11d48', x: 290, y: 460, size: 25, path: 'M282,430 L295,430 L292,510 L280,500 Z', neighbors: ['ARG', 'PER', 'BOL'], pop: 19, gdp: 310, army: 40 },

  // Africa
  { id: 'EGY', name: 'Egipt', continent: 'Africa', color: '#ca8a04', x: 545, y: 300, size: 35, path: 'M525,280 L565,280 L560,315 L525,315 Z', neighbors: ['LBY', 'SDN', 'ISR'], pop: 104, gdp: 470, army: 70 },
  { id: 'ZAF', name: 'RPA (RPA)', continent: 'Africa', color: '#4d7c0f', x: 535, y: 470, size: 38, path: 'M510,445 L560,445 L555,490 L512,485 Z', neighbors: ['NAM', 'BWA', 'ZWE', 'MOZ'], pop: 60, gdp: 400, army: 50 },
  { id: 'NGA', name: 'Nigeria', continent: 'Africa', color: '#166534', x: 475, y: 345, size: 32, path: 'M455,330 L490,330 L488,362 L455,360 Z', neighbors: ['NER', 'BEN', 'CMR', 'TCD'], pop: 213, gdp: 440, army: 55 },
  { id: 'DZA', name: 'Algieria', continent: 'Africa', color: '#15803d', x: 465, y: 285, size: 42, path: 'M440,265 L490,265 L485,310 L440,305 Z', neighbors: ['TUN', 'LBY', 'NER', 'MLI', 'MRT', 'MAR'], pop: 44, gdp: 180, army: 60 },
  { id: 'KEN', name: 'Kenia', continent: 'Africa', color: '#b45309', x: 575, y: 375, size: 28, path: 'M560,360 L590,360 L588,390 L560,390 Z', neighbors: ['ETH', 'SOM', 'TZA', 'UGA', 'SSD'], pop: 53, gdp: 110, army: 30 },

  // Oceania
  { id: 'AUS', name: 'Australia', continent: 'Oceania', color: '#d97706', x: 850, y: 450, size: 75, path: 'M790,410 L910,410 L900,490 L800,485 Z', neighbors: ['IDN', 'NZL'], pop: 26, gdp: 1550, army: 60 },
  { id: 'NZL', name: 'Nowa Zelandia', continent: 'Oceania', color: '#0284c7', x: 940, y: 490, size: 25, path: 'M928,475 L950,475 L945,505 L925,500 Z', neighbors: ['AUS'], pop: 5, gdp: 250, army: 25 }
];

if (typeof module !== 'undefined') {
  module.exports = WORLD_DATA;
}
