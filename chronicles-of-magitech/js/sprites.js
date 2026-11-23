// Rozszerzony Generator proceduralnych sprajtów w stylu Pixel-Art
window.PixelSprites = (function() {
  const cache = {};

  function createPixelCanvas(width, height, drawFn) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx);
    return canvas;
  }

  function getPixelMatrix(strArr, colorMap) {
    const h = strArr.length;
    const w = strArr[0].length;
    return createPixelCanvas(w, h, (ctx) => {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const char = strArr[y][x];
          if (colorMap[char]) {
            ctx.fillStyle = colorMap[char];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    });
  }

  const spritesData = {
    // Bohaterowie
    hero_warrior: {
      map: [
        "....HHHHHH......",
        "...HSSSSHSH.....",
        "...HSWWSHHH.....",
        "...HSSSSHHH.....",
        "....SSSS........",
        "...AAAAAAAA.....",
        "..AAACCAAA......",
        "..AAACCAAA..W...",
        "..AAMMMMAA.WWW..",
        "...AMMMMA..WWW..",
        "...APPPPA...W...",
        "...APPPPA...W...",
        "...LL..LL...W...",
        "...LL..LL.......",
        "..BBB..BBB......",
        "..BBB..BBB......"
      ],
      colors: {
        'H': '#6d4c41', 'S': '#ffcc80', 'W': '#ffffff', 'A': '#78909c',
        'C': '#cfd8dc', 'M': '#37474f', 'P': '#455a64', 'L': '#263238',
        'B': '#1e272c', 'W': '#eceff1'
      }
    },
    hero_archer: {
      map: [
        "....GGGGGG......",
        "...GHSSSHGG.....",
        "...GSSWWSSG.....",
        "...GSSSSSSG.....",
        "....SSSS........",
        "...GGCCCCGG.....",
        "..GGGGCCGGGB....",
        "..GGEECCEGGBB...",
        "..GGMMMMGG.BB...",
        "...GMMMMG..BB...",
        "...GPPPPG...B...",
        "...GPPPPG...B...",
        "...LL..LL.......",
        "...LL..LL.......",
        "..BBB..BBB......",
        "..BBB..BBB......"
      ],
      colors: {
        'G': '#2e7d32', 'H': '#ffb74d', 'S': '#ffe0b2', 'W': '#29b6f6',
        'C': '#81c784', 'E': '#a5d6a7', 'M': '#5d4037', 'P': '#3e2723',
        'L': '#4e342e', 'B': '#8d6e63'
      }
    },
    hero_mage: {
      map: [
        "....PPPPPP......",
        "...PPHHHHPP.....",
        "...PHSBBSSH.....",
        "...PSSBBSSH.....",
        "....SSSS...S....",
        "...PPCCPPPPSS...",
        "..PPPPCCPPPSS...",
        "..PPPPEEPPP.S...",
        "..PPPEEEPPP.S...",
        "...PPEEEPP..S...",
        "...PPPPPP...S...",
        "...PPPPPP...S...",
        "...LL..LL...S...",
        "...LL..LL...S...",
        "..BBB..BBB..S...",
        "..BBB..BBB......"
      ],
      colors: {
        'P': '#6a1b9a', 'H': '#e1bee7', 'S': '#ffccbc', 'B': '#00e5ff',
        'C': '#ba68c8', 'E': '#7c4dff', 'L': '#4a148c', 'S': '#00e5ff'
      }
    },
    hero_behemoth: {
      map: [
        "..MMMMMMMMMM....",
        ".MMMMMMMMMMMM...",
        ".MMMRROORRMMM...",
        ".MMMRROORRMMM...",
        ".MMMMMMMMMMMM...",
        "GGGGMMGGMMGGGG..",
        "GGGGMMGGMMGGGG..",
        "GGGGYYGGYYGGGG..",
        "GGGGYYYYYYGGGG..",
        ".GGGGGGGGGGGG...",
        "..GGGG..GGGG....",
        "..GGGG..GGGG....",
        "..MMMM..MMMM....",
        "..MMMM..MMMM....",
        ".BBBB....BBBB...",
        ".BBBB....BBBB..."
      ],
      colors: {
        'M': '#455a64', 'G': '#f57c00', 'R': '#ff3d00', 'O': '#ffd600',
        'Y': '#ffb300', 'B': '#263238'
      }
    },
    hero_avatar: {
      map: [
        ".....RRRR.......",
        "....RRRRRR......",
        "...RRWWWWFF.....",
        "...RWWWWWWF.....",
        "....FFFFFF......",
        "...CCFFCCFF.....",
        "..CCCCFFCCCC....",
        "..CCCCFFCCCC....",
        "...CCFFFFCC.....",
        "....FFFFFF......",
        ".....FFFF.......",
        ".....FFFF.......",
        "....FF..FF......",
        "...FFF..FFF.....",
        "...FF....FF.....",
        "................"
      ],
      colors: {
        'R': '#ff1744', 'F': '#ff9100', 'W': '#ffffff', 'C': '#d500f9'
      }
    },

    // NPC Kupiec Barnaba
    npc_merchant: {
      map: [
        "....TTTTTT......",
        "...TTSSSSSTT....",
        "...TSSBBSSTT....",
        "...TSSSSSSST....",
        "....SSSS........",
        "...YYYYYYYY.....",
        "..YYYYWWYYYY.B..",
        "..YYWWWWWWYYBB..",
        "..YYYYWWYYYY.B..",
        "...YYYYYYYY..B..",
        "...RRRRRRRR.....",
        "...RRRRRRRR.....",
        "...LL..LL.......",
        "...LL..LL.......",
        "..DDD..DDD......",
        "..DDD..DDD......"
      ],
      colors: {
        'T': '#00838f', 'S': '#ffcc80', 'B': '#004d40', 'Y': '#ffb300',
        'W': '#ffffff', 'R': '#d84315', 'L': '#bf360c', 'D': '#3e2723',
        'B': '#ffd700' // sakwa złota
      }
    },

    // Pety / Towarzysze
    pet_drone: {
      map: [
        "......CC........",
        "....CCCCCC......",
        "...CCEECCECC....",
        "..CCEEOOECCC....",
        "...CCEECCECC....",
        "....CCCCCC......",
        "......CC........",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
      ],
      colors: { 'C': '#37474f', 'E': '#00e5ff', 'O': '#ffea00' }
    },
    pet_pixie: {
      map: [
        "....WW..WW......",
        "....WWBBWW......",
        "...WWWBWWWW.....",
        "....WWWWWW......",
        ".....WWWW.......",
        "......WW........",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
      ],
      colors: { 'W': '#e0f7fa', 'B': '#80d8ff' }
    },
    pet_goblin: {
      map: [
        "....GGGG........",
        "...GGYYGG.......",
        "...GGYYGG.......",
        "....GGGG........",
        "...BBGGBB.......",
        "...BBBBBB..$....",
        "....LLLL..$$$...",
        "....LLLL...$....",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
      ],
      colors: { 'G': '#66bb6a', 'Y': '#ffeb3b', 'B': '#795548', 'L': '#4e342e', '$': '#ffd700' }
    },

    // Kafelki i Światy
    tile_grass: {
      map: ["GGGGGGGGGGGGGGGG","GGgGGGGGGGGGGgGG","GGGGgGGGGGGGGGGG","GGGGGGGGGGgGGGGG","GGGGgGGGGGGgGGGG","GGGGGGGGGGGGGGGG","GgGGGGGGgGGGGGGG","GGGGGGGGGGGGgGGG","GGGGgGGGGGGGGGGG","GGGGGGgGGGGGGGGG","gGGGGGGGGGGgGGGG","GGGGGGGGGGGGGGGG","GGgGGGGGGgGGGGgG","GGGGGGGGGGGGGGGG","GGGGgGGGGgGGGGGG","GGGGGGGGGGGGGGGG"],
      colors: { 'G': '#2e7d32', 'g': '#388e3c' }
    },
    tile_path: {
      map: ["DDdDDDDDDDdDDDDD","DDDDDDdDDDDDDDDD","DdDDDDDDDDDDDdDD","DDDDdDDDDdDDDDDD","DDDDDDDDDDDDDDDD","DDdDDDDDDDDDDdDD","DDDDDDDdDDDDDDDD","DDDDDDDDDDdDDDDD","DdDDDDdDDDDDDDDD","DDDDDDDDDDdDDdDD","DDdDDDDDDDDDDDDD","DDDDDDdDDDDDDDDD","DDDDDDDDDDdDDDDD","DdDDDDdDDDDDDdDD","DDDDDDDDDDDDDDDD","DDdDDDDDDDdDDDDD"],
      colors: { 'D': '#8d6e63', 'd': '#795548' }
    },
    tile_snow: {
      map: ["WWWWWWWWWWWWWWWW","WWsWWWWWWWWWWsWW","WWWWsWWWWWWWWWWW","WWWWWWWWWWsWWWWW","WWWWsWWWWWWsWWWW","WWWWWWWWWWWWWWWW","WsWWWWWWsWWWWWWW","WWWWWWWWWWWWsWWW","WWWWsWWWWWWWWWWW","WWWWWWsWWWWWWWWW","sWWWWWWWWWWsWWWW","WWWWWWWWWWWWWWWW","WWsWWWWWWsWWWWsW","WWWWWWWWWWWWWWWW","WWWWsWWWWsWWWWWW","WWWWWWWWWWWWWWWW"],
      colors: { 'W': '#e1f5fe', 's': '#b3e5fc' }
    },
    tile_ice: {
      map: ["IIIIIIIIIIIIIIII","IIbIIIIIIIIIIbII","IIIIIIbIIIIIIIII","IbIIIIIIIIIIIIII","IIIIIIbIIIIIIIII","IIIIIIIIIIIIbIII","IIbIIIIIIIIIIIII","IIIIIIIIbIIIIIII","IIIIIIIIIIIIIIbI","IbIIIIIIIIIIIIII","IIIIbIIIIIIIIIII","IIIIIIIIIIbIIIII","IIIIIIbIIIIIIIII","IIbIIIIIIIIIIbII","IIIIIIIIIIIIIIII","IIIIIIbIIIIIIIII"],
      colors: { 'I': '#81d4fa', 'b': '#4fc3f7' }
    },
    tile_dungeon_floor: {
      map: ["FFFFFFFFFFFFFFFF","FffFfffFffFfffFF","FffFfffFffFfffFF","FFFFFFFFFFFFFFFF","fFfffFffFfffFffF","fFfffFffFfffFffF","FFFFFFFFFFFFFFFF","FffFfffFffFfffFF","FffFfffFffFfffFF","FFFFFFFFFFFFFFFF","fFfffFffFfffFffF","fFfffFffFfffFffF","FFFFFFFFFFFFFFFF","FffFfffFffFfffFF","FffFfffFffFfffFF","FFFFFFFFFFFFFFFF"],
      colors: { 'F': '#263238', 'f': '#37474f' }
    },
    tile_water: {
      map: ["BBBBBBBBBBBBBBBB","BBbBBBBBBBBBBbBB","BBBBBBBBbBBBBBBB","BbBBBBBBBBBBBBBB","BBBBBBbBBBBBBBBB","BBBBBBBBBBBBbBBB","BBbBBBBBBBBBBBBB","BBBBBBBBbBBBBBBB","BBBBBBBBBBBBBBbB","BbBBBBBBBBBBBBBB","BBBBbBBBBBBBBBBB","BBBBBBBBBBbBBBBB","BBBBBBbBBBBBBBBB","BBbBBBBBBBBBBbBB","BBBBBBBBBBBBBBBB","BBBBBBbBBBBBBBBB"],
      colors: { 'B': '#0288d1', 'b': '#29b6f6' }
    },
    tile_wall: {
      map: ["SSSSSSSSSSSSSSSS","SssSsssSssSsssSS","SssSsssSssSsssSS","SSSSSSSSSSSSSSSS","sSsssSssSsssSssS","sSsssSssSsssSssS","SSSSSSSSSSSSSSSS","SssSsssSssSsssSS","SssSsssSssSsssSS","SSSSSSSSSSSSSSSS","sSsssSssSsssSssS","sSsssSssSsssSssS","SSSSSSSSSSSSSSSS","SssSsssSssSsssSS","SssSsssSssSsssSS","SSSSSSSSSSSSSSSS"],
      colors: { 'S': '#455a64', 's': '#607d8b' }
    },
    tile_ruin: {
      map: ["MMMMMMMMMMMMMMMM","MMnMMMMMMMMnMMMM","MMMMMMEnMMMMMMMM","MMMMMMMMMMMMMMMM","MnMMMMMMMMMMMnMM","MMMMEnMMMMEnMMMM","MMMMMMMMMMMMMMMM","MMnMMMMMMMMMMnMM","MMMMMMMMEnMMMMMM","MMMMEnMMMMMMMMMM","MnMMMMMMMMnMMMMM","MMMMMMEnMMMMMMMM","MMMMMMMMMMMMnMMM","MMnMMMMEnMMMMMMM","MMMMMMMMMMMMMMMM","MMMMMMMMnMMMMMMM"],
      colors: { 'M': '#263238', 'n': '#37474f', 'E': '#00e5ff' }
    },
    tile_lava: {
      map: ["RRRRRRRRRRRRRRRR","RRfRRRRRRRRRRfRR","RRRRRRRRfRRRRRRR","RfRRRRRRRRRRRRRR","RRRRRRfRRRRRRRRR","RRRRRRRRRRRRfRRR","RRfRRRRRRRRRRRRR","RRRRRRRRfRRRRRRR","RRRRRRRRRRRRRRfR","RfRRRRRRRRRRRRRR","RRRRfRRRRRRRRRRR","RRRRRRRRRRfRRRRR","RRRRRRfRRRRRRRRR","RRfRRRRRRRRRRfRR","RRRRRRRRRRRRRRRR","RRRRRRfRRRRRRRRR"],
      colors: { 'R': '#b71c1c', 'f': '#ff5722' }
    },
    tile_portal: {
      map: [
        "..PPPPPPPPPPPP..",
        ".PP..........PP.",
        ".P...CCCCCC...P.",
        "P...CCCCCCCC...P",
        "P..CCEEEEEECC..P",
        "P..CEEWWWWEEC..P",
        "P..CEEWWWWEEC..P",
        "P..CEEWWWWEEC..P",
        "P..CCEEEEEECC..P",
        "P...CCCCCCCC...P",
        ".P...CCCCCC...P.",
        ".PP..........PP.",
        "..PPPPPPPPPPPP..",
        "................",
        "................",
        "................"
      ],
      colors: { 'P': '#7c4dff', 'C': '#00e5ff', 'E': '#69f0ae', 'W': '#ffffff' }
    },

    // Wrogowie z Nowych Światów
    enemy_wolf: {
      map: ["................","....GG..........","...GGG......GG..","...GGGGGGGGGGG..","...GGGGGGGGGGG..","..GGGRGGGGGGG...","..GGGGGGGGGGG...","...GGGGGGGGGG...","....GGGGGGGG....","....GG....GG....","...GGG....GGG...","...GG......GG...","...GG......GG...","................","................","................"],
      colors: { 'G': '#546e7a', 'R': '#f44336' }
    },
    enemy_goblin: {
      map: ["....GGGGGG......","...GGGGGGGG.....","...GGRGGRGG.....","...GGGGGGGG.....","....GGGGGG......","...BBBBBBBB.....","..BBBYYYYBBB..S.","..BBBYYYYBBB.SS.","...BBYYYYBB..SS.","....YYYYYY...SS.","....PP..PP...SS.","...PPP..PPP...S.","...PP....PP...S.","................","................","................"],
      colors: { 'G': '#66bb6a', 'R': '#d50000', 'B': '#5d4037', 'Y': '#8d6e63', 'P': '#3e2723', 'S': '#b0bec5' }
    },
    enemy_drone: {
      map: ["......TT........",".....TTTT.......","...CCCCCCCC.....","..CCCCCCCCCC....","..CCEECCECCC....","..CCCCCCCCCC....","...CCCCCCCC.....","....AA..AA......","...AAAA.AAAA....","................","................","................","................","................","................","................"],
      colors: { 'T': '#00e5ff', 'C': '#37474f', 'E': '#00e5ff', 'A': '#78909c' }
    },
    enemy_frost_wolf: {
      map: ["................","....WW..........","...WWW......WW..","...WWWWWWWWWWW..","...WWWWWWWWWWW..","..WWWBWWWWWWW...","..WWWWWWWWWWW...","...WWWWWWWWWW...","....WWWWWWWW....","....WW....WW....","...WWW....WWW...","...WW......WW...","...WW......WW...","................","................","................"],
      colors: { 'WW': '#e0f7fa', 'W': '#b3e5fc', 'B': '#00e5ff' }
    },
    enemy_frost_golem: {
      map: ["...IIIIIIIIII...","..IIIIIIIIIIII..","..IIWWWWWWWWII..","..IIWWBBBBWWII..","..IIWWWWWWWWII..","...IIIIIIIIII...","...BBBBIIBBBB...","..BBBBBIIBBBBB..","..BB...II...BB..","......IIII......",".....II..II.....","....II....II....","................","................","................","................"],
      colors: { 'I': '#4fc3f7', 'W': '#ffffff', 'B': '#0288d1' }
    },
    boss_frost: {
      map: ["....IIIIIIII....","...IIIIIIIIII...","..IIWWWWWWWWII..","..IIWWBBBBWWII..","..IIWWBBBBWWII..","..IIWWWWWWWWII..","...IIIIIIIIII...","..DDIIIIIIIIDD..","..DDDIIIIIIIDD..","..DD..IIII..DD..","......IIII......",".....IIIIII.....","....IIII..IIII..","...IIII....IIII.","................","................"],
      colors: { 'I': '#00b0ff', 'W': '#e0f7fa', 'B': '#00e5ff', 'D': '#01579b' }
    },
    enemy_skeleton: {
      map: ["....WWWWWW......","...WWWWWWWW.....","...WWBBWWBB.....","...WWWWWWWW.....","....WWWWWW......",".....WWWW.......","...WWWWWWWW.....","..WW.WWWW.WW....","..WW.WWWW.WW....",".....WWWW.......","....WW..WW......","....WW..WW......","....WW..WW......","................","................","................"],
      colors: { 'W': '#eceff1', 'B': '#263238' }
    },
    enemy_skeleton_mage: {
      map: ["....PPPPPP......","...PPWWWWPP.....","...PWBBWWBP.....","...PPWWWWPP.....","....PPPPPP......",".....PPPP.......","...PPPEEPPP.....","..PP.PEEP.PP.S..","..PP.PEEP.PP.S..",".....PPPP....S..","....PP..PP...S..","....PP..PP...S..","....PP..PP...S..","................","................","................"],
      colors: { 'P': '#4a148c', 'W': '#eceff1', 'B': '#00e5ff', 'E': '#e040fb', 'S': '#ab47bc' }
    },
    boss_skeleton: {
      map: ["...KKKKKKKKKK...","..KKWWWWWWWWKK..","..KKWWBBBBWWKK..","..KKWWBBBBWWKK..","..KKWWWWWWWWKK..","...KKKKKKKKKK...","..DDWWWWWWWWDD..","..DD.WWWWWW.DD..",".....WWWWWW.....","....WWWWWWWW....","...WWWW..WWWW...","...WWWW..WWWW...","..DDDD....DDDD..","................","................","................"],
      colors: { 'K': '#ffd700', 'W': '#ffffff', 'B': '#d500f9', 'D': '#4a148c' }
    },
    boss_guardian: {
      map: ["...MMMMMMMMMM...","..MMMMMMMMMMMM..",".MMMOOOOOOOOMM..",".MMMOORRRROOMM..",".MMMOORRRROOMM..",".MMMOOOOOOOOMM..","..MMMMMMMMMMMM..","..GGGGMMMMGGGG..",".GGGGGGMMGGGGGG.",".GGGGGGMMGGGGGG.",".GG..GGMMGG..GG.",".....MMMMMM.....","....MMMMMMMM....","...MMMM..MMMM...","...MMMM..MMMM...","..BBBB....BBBB.."],
      colors: { 'M': '#3e2723', 'O': '#ff6d00', 'R': '#ff3d00', 'G': '#ffab00', 'B': '#212121' }
    },
    boss_flame: {
      map: ["....FFFFFFFF....","...FFFFFFFFFF...","..FFFRRRRRRFFF..",".FFFRRWWWWRRFFF.",".FFFRRWWWWRRFFF.","..FFFRRRRRRFFF..","...FFFFFFFFFF...","..DDDFFFFFFDDD..",".DDDDDFFFFDDDDD.",".DD..DDFFDD..DD.",".....FFFFFF.....","....FFFFFFFF....","...FFFF..FFFF...","..FFFF....FFFF..","..FFF......FFF..","................"],
      colors: { 'F': '#ff1744', 'R': '#ff5722', 'W': '#ffffff', 'D': '#bf360c' }
    },
    npc_elder: {
      map: ["....WWWWWW......","...WWWWWWWW.....","...WWSSWWSS.....","...WWSSSSWW.....","....WWWWWW......","...BBBWWBBB.....","..BBBBWWBBBB....","..BBBBWWBBBB.S..","..BBBBWWBBBB.S..","...BBBWWBBB..S..","...BBBBBBBB..S..","...BBBBBBBB..S..","...LL..LL....S..","...LL..LL....S..","..BBB..BBB...S..","..BBB..BBB......"],
      colors: { 'W': '#eceff1', 'S': '#ffccbc', 'B': '#1565c0', 'L': '#0d47a1', 'S': '#ffb74d' }
    },
    item_core: {
      map: ["......CC........","....CCCCCC......","...CCCCCCCC.....","..CCEEEEECCC....","..CCEEWEECCC....","...CCEEECCCC....","....CCCCCC......","......CC........","................","................","................","................","................","................","................","................"],
      colors: { 'C': '#00838f', 'E': '#00e5ff', 'W': '#ffffff' }
    }
  };

  function getSprite(name) {
    if (cache[name]) return cache[name];
    const def = spritesData[name];
    if (!def) return null;
    const canvas = getPixelMatrix(def.map, def.colors);
    cache[name] = canvas;
    return canvas;
  }

  return { get: getSprite };
})();
