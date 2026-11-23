/* ==========================================================================
   WYPRAWA BOHATERA: MINECRAFT WORLD & LOCHY 2D - SILNIK JS
   ========================================================================== */

// --- SYNTESTYZATOR DŹWIĘKÓW (WEB AUDIO API) ---
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playStep() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playChop() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playMine() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playPlace() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playPickup() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playTeleport() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playSlash() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playSpell() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(950, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playHit() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playHeal() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(750, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.1);
      osc.stop(this.ctx.currentTime + i * 0.1 + 0.3);
    });
  }

  playDefeat() {
    if (!this.enabled) return;
    this.init();
    const notes = [300, 260, 220, 180];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.15 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.15);
      osc.stop(this.ctx.currentTime + i * 0.15 + 0.3);
    });
  }
}

const audio = new SoundSynth();

// --- DEFINICJA KLAS POSTACI ---
const HERO_CLASSES = {
  warrior: { name: 'Górnik / Wojownik', avatar: '⚔️', baseHp: 140, baseMp: 40, str: 14, dex: 8, int: 5, vit: 12 },
  mage: { name: 'Alchemik / Mag', avatar: '🔮', baseHp: 90, baseMp: 120, str: 5, dex: 10, int: 18, vit: 8 },
  rogue: { name: 'Budowniczy / Łotrzyk', avatar: '🗡️', baseHp: 105, baseMp: 60, str: 8, dex: 18, int: 7, vit: 10 }
};

// --- DEFINICJA BLOKÓW MINECRAFT ---
const BLOCK_TYPES = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  COAL_ORE: 4,
  IRON_ORE: 5,
  WOOD: 6,
  LEAVES: 7,
  PLANKS: 8,
  TORCH: 9
};

const BLOCK_DATA = {
  [BLOCK_TYPES.GRASS]: { name: 'Blok Trawy', icon: '🟩', color: '#4ade80', hard: 3, drop: BLOCK_TYPES.DIRT },
  [BLOCK_TYPES.DIRT]: { name: 'Blok Ziemi', icon: '🟤', color: '#78350f', hard: 3, drop: BLOCK_TYPES.DIRT },
  [BLOCK_TYPES.STONE]: { name: 'Kamień', icon: '🗿', color: '#64748b', hard: 8, drop: BLOCK_TYPES.STONE },
  [BLOCK_TYPES.COAL_ORE]: { name: 'Ruda Węgla', icon: '⬛', color: '#334155', hard: 10, drop: 'coal' },
  [BLOCK_TYPES.IRON_ORE]: { name: 'Ruda Żelaza', icon: '🪙', color: '#b45309', hard: 14, drop: 'iron' },
  [BLOCK_TYPES.WOOD]: { name: 'Pień Drzewa', icon: '🪵', color: '#92400e', hard: 6, drop: BLOCK_TYPES.WOOD },
  [BLOCK_TYPES.LEAVES]: { name: 'Liście', icon: '🍃', color: '#15803d', hard: 1, drop: null },
  [BLOCK_TYPES.PLANKS]: { name: 'Deski', icon: '🪵', color: '#d97706', hard: 4, drop: BLOCK_TYPES.PLANKS },
  [BLOCK_TYPES.TORCH]: { name: 'Pochodnia', icon: '🕯️', color: '#fbbf24', hard: 1, drop: BLOCK_TYPES.TORCH }
};

// --- RECEPTURY CRAFTINGU ---
const CRAFTING_RECIPES = [
  { id: 'rec_planks', name: 'Deski (x4)', icon: '🪵', desc: 'Wymaga: 1x Pień Drzewa', req: { [BLOCK_TYPES.WOOD]: 1 }, give: { type: 'block', id: BLOCK_TYPES.PLANKS, count: 4 } },
  { id: 'rec_sticks', name: 'Patyki (x4)', icon: '🥢', desc: 'Wymaga: 2x Deski', req: { [BLOCK_TYPES.PLANKS]: 2 }, give: { type: 'item', id: 'stick', name: 'Patyk', icon: '🥢', count: 4 } },
  { id: 'rec_pickaxe', name: 'Drewniany Kilof', icon: '⛏️', desc: 'Wymaga: 3x Deski, 2x Patyk', req: { [BLOCK_TYPES.PLANKS]: 3, 'stick': 2 }, give: { type: 'tool', id: 'wood_pickaxe', name: 'Drewniany Kilof', icon: '⛏️', count: 1 } },
  { id: 'rec_axe', name: 'Drewniana Siekiera', icon: '🪓', desc: 'Wymaga: 3x Deski, 2x Patyk', req: { [BLOCK_TYPES.PLANKS]: 3, 'stick': 2 }, give: { type: 'tool', id: 'wood_axe', name: 'Drewniana Siekiera', icon: '🪓', count: 1 } },
  { id: 'rec_sword', name: 'Kamienny Miecz', icon: '🗡️', desc: 'Wymaga: 2x Kamień, 1x Patyk', req: { [BLOCK_TYPES.STONE]: 2, 'stick': 1 }, give: { type: 'weapon', id: 'stone_sword', name: 'Kamienny Miecz', icon: '🗡️', count: 1 } },
  { id: 'rec_torch', name: 'Pochodnia (x4)', icon: '🕯️', desc: 'Wymaga: 1x Węgiel, 1x Patyk', req: { 'coal': 1, 'stick': 1 }, give: { type: 'block', id: BLOCK_TYPES.TORCH, count: 4 } }
];

// --- STAN GRY ---
let gameState = {
  hero: {
    name: 'Steve',
    classKey: 'warrior',
    level: 1,
    xp: 0,
    maxXp: 100,
    hp: 140,
    maxHp: 140,
    mp: 40,
    maxMp: 40,
    gold: 50,
    statPoints: 0,
    str: 14,
    dex: 8,
    int: 5,
    vit: 12,
    potions: 3,
    gear: { weapon: null, armor: null }
  },
  inventory: [
    { id: BLOCK_TYPES.WOOD, name: 'Pień Drzewa', icon: '🪵', count: 5, type: 'block' },
    { id: BLOCK_TYPES.DIRT, name: 'Blok Ziemi', icon: '🟤', count: 10, type: 'block' }
  ],
  selectedHotbarIndex: 0,
  mapPos: { x: 18, y: 70 },
  unlockedRegionIndex: 0,
  completedRegions: []
};

// --- SILNIK ŚWIATA MINECRAFT SANDBOX ---
class MinecraftEngine {
  constructor() {
    this.canvas = document.getElementById('mc-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;

    this.cols = 30;
    this.rows = 16;
    this.tileSize = 32;

    this.grid = [];
    this.isNight = false;

    this.player = {
      x: 300,
      y: 100,
      width: 26,
      height: 48,
      vx: 0,
      vy: 0,
      speed: 4,
      isGrounded: false,
      facingRight: true,
      miningProgress: 0,
      miningTarget: null
    };

    this.itemDrops = [];
    this.monsters = [];

    this.keys = { left: false, right: false, up: false };
    this.setupEvents();
  }

  setupEvents() {
    window.addEventListener('keydown', (e) => {
      if (!this.isRunning) return;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.keys.left = true;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.keys.right = true;
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp' || e.key === ' ') this.keys.up = true;

      // Wybór slotów 1-9
      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (idx < 9) {
          gameState.selectedHotbarIndex = idx;
          renderHotbar();
          audio.playClick();
        }
      }

      if (e.key === 'c' || e.key === 'C') {
        openCraftingModal();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (!this.isRunning) return;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.keys.left = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.keys.right = false;
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp' || e.key === ' ') this.keys.up = false;
    });

    // Myszka - Kopanie (Lewy) / Stawianie (Prawy)
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.isRunning) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const col = Math.floor(mouseX / this.tileSize);
      const row = Math.floor(mouseY / this.tileSize);

      if (e.button === 0) {
        // Lewy Przycisk: Kopanie / Niszczenie
        this.startMining(col, row);
      } else if (e.button === 2) {
        // Prawy Przycisk: Stawianie bloku
        e.preventDefault();
        this.placeBlock(col, row);
      }
    });

    this.canvas.addEventListener('contextmenu', e => e.preventDefault());
  }

  initWorld() {
    this.grid = [];
    const surfaceRow = 7;

    for (let r = 0; r < this.rows; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        if (r < surfaceRow) {
          this.grid[r][c] = BLOCK_TYPES.AIR;
        } else if (r === surfaceRow) {
          this.grid[r][c] = BLOCK_TYPES.GRASS;
        } else if (r <= surfaceRow + 3) {
          this.grid[r][c] = BLOCK_TYPES.DIRT;
        } else {
          // Głębiny - Kamień i złoża węgla/żelaza
          const rand = Math.random();
          if (rand < 0.12) this.grid[r][c] = BLOCK_TYPES.COAL_ORE;
          else if (rand < 0.20) this.grid[r][c] = BLOCK_TYPES.IRON_ORE;
          else this.grid[r][c] = BLOCK_TYPES.STONE;
        }
      }
    }

    // Wygenerowanie Drzew na trawie
    for (let c = 3; c < this.cols - 3; c += 6) {
      this.spawnTree(c, surfaceRow - 1);
    }
  }

  spawnTree(col, baseRow) {
    const height = 4;
    // Pień
    for (let i = 0; i < height; i++) {
      if (baseRow - i >= 0) this.grid[baseRow - i][col] = BLOCK_TYPES.WOOD;
    }
    // Korona liści
    const topR = baseRow - height;
    for (let r = topR - 1; r <= topR; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && c >= 0 && c < this.cols && this.grid[r][c] === BLOCK_TYPES.AIR) {
          this.grid[r][c] = BLOCK_TYPES.LEAVES;
        }
      }
    }
  }

  start(resetWorld = true) {
    if (resetWorld || this.grid.length === 0) {
      this.initWorld();
    }
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  startMining(col, row) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;
    const blockType = this.grid[row][col];
    if (blockType === BLOCK_TYPES.AIR) return;

    // Sprawdzenie zasięgu gracza
    const pCol = Math.floor((this.player.x + 13) / this.tileSize);
    const pRow = Math.floor((this.player.y + 24) / this.tileSize);
    const dist = Math.sqrt((pCol - col) ** 2 + (pRow - row) ** 2);

    if (dist > 6) return;

    const bData = BLOCK_DATA[blockType];
    if (!bData) return;

    if (blockType === BLOCK_TYPES.WOOD || blockType === BLOCK_TYPES.LEAVES) audio.playChop();
    else audio.playMine();

    // Niszczenie bloku
    this.grid[row][col] = BLOCK_TYPES.AIR;

    // Drop przedmiotu
    if (bData.drop) {
      this.addItemDrop(col * this.tileSize + 16, row * this.tileSize + 16, bData.drop, bData.name, bData.icon);
    }
  }

  placeBlock(col, row) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;
    if (this.grid[row][col] !== BLOCK_TYPES.AIR) return;

    const slot = gameState.inventory[gameState.selectedHotbarIndex];
    if (!slot || slot.count <= 0) return;

    if (slot.type === 'block') {
      this.grid[row][col] = slot.id;
      slot.count--;
      audio.playPlace();

      if (slot.count <= 0) {
        gameState.inventory.splice(gameState.selectedHotbarIndex, 1);
      }
      renderHotbar();
    }
  }

  addItemDrop(x, y, id, name, icon) {
    this.itemDrops.push({
      x, y, id, name, icon,
      vy: -3
    });
  }

  update() {
    // Movement Gracza
    if (this.keys.left) {
      this.player.vx = -this.player.speed;
      this.player.facingRight = false;
    } else if (this.keys.right) {
      this.player.vx = this.player.speed;
      this.player.facingRight = true;
    } else {
      this.player.vx *= 0.7;
    }

    if (this.keys.up && this.player.isGrounded) {
      this.player.vy = -10.5;
      this.player.isGrounded = false;
    }

    this.player.vy += 0.55;
    this.player.x += this.player.vx;
    this.player.y += this.player.vy;

    // Kolizja z blokami terenu
    this.checkBlockCollisions();

    // Podnoszenie item dropów
    for (let i = this.itemDrops.length - 1; i >= 0; i--) {
      const item = this.itemDrops[i];
      item.y += item.vy;
      if (item.vy < 0) item.vy += 0.2;

      const dx = (this.player.x + 13) - item.x;
      const dy = (this.player.y + 24) - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 40) {
        // Podniesienie przedmiotu do ekwipunku
        this.addInventoryItem(item);
        audio.playPickup();
        this.itemDrops.splice(i, 1);
      }
    }

    // Nocny spawn Zombie
    if (this.isNight && Math.random() < 0.008 && this.monsters.length < 3) {
      this.monsters.push({
        x: Math.random() > 0.5 ? 20 : 900,
        y: 200,
        hp: 40,
        sprite: '🧟',
        speed: 1.5
      });
    }

    // Ruch Nocnych Potworów
    for (let i = this.monsters.length - 1; i >= 0; i--) {
      const m = this.monsters[i];
      const dir = Math.sign(this.player.x - m.x);
      m.x += dir * m.speed;

      // Atak na gracza
      if (Math.abs(m.x - this.player.x) < 25 && Math.abs(m.y - this.player.y) < 30) {
        gameState.hero.hp -= 1;
        audio.playHit();
        renderTopBar();
      }
    }
  }

  checkBlockCollisions() {
    this.player.isGrounded = false;

    const pLeft = Math.floor(this.player.x / this.tileSize);
    const pRight = Math.floor((this.player.x + this.player.width) / this.tileSize);
    const pTop = Math.floor(this.player.y / this.tileSize);
    const pBottom = Math.floor((this.player.y + this.player.height) / this.tileSize);

    for (let r = pTop; r <= pBottom; r++) {
      for (let c = pLeft; c <= pRight; c++) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          const bType = this.grid[r][c];
          if (bType !== BLOCK_TYPES.AIR && bType !== BLOCK_TYPES.LEAVES && bType !== BLOCK_TYPES.TORCH) {
            // Kolizja od góry (stanie na bloku)
            const blockTop = r * this.tileSize;
            if (this.player.vy > 0 && this.player.y + this.player.height >= blockTop && this.player.y < blockTop) {
              this.player.y = blockTop - this.player.height;
              this.player.vy = 0;
              this.player.isGrounded = true;
            }
          }
        }
      }
    }

    // Granice ekranu
    this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
    if (this.player.y > this.canvas.height) {
      this.player.y = 100;
      this.player.vy = 0;
    }
  }

  addInventoryItem(drop) {
    const existing = gameState.inventory.find(i => i.id === drop.id);
    if (existing) {
      existing.count++;
    } else {
      if (gameState.inventory.length < 9) {
        gameState.inventory.push({
          id: drop.id,
          name: drop.name || 'Przedmiot',
          icon: drop.icon || '📦',
          count: 1,
          type: typeof drop.id === 'number' ? 'block' : 'item'
        });
      }
    }
    renderHotbar();
    saveGame();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Niebo Dzień/Noc
    this.ctx.fillStyle = this.isNight ? '#0b1329' : '#70a5fd';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Słońce / Księżyc
    this.ctx.font = "40px sans-serif";
    this.ctx.fillText(this.isNight ? '🌙' : '☀️', 850, 60);

    // Rysowanie Bloków Terenu
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const bType = this.grid[r][c];
        if (bType !== BLOCK_TYPES.AIR) {
          const bData = BLOCK_DATA[bType];
          const x = c * this.tileSize;
          const y = r * this.tileSize;

          if (bData) {
            this.ctx.fillStyle = bData.color;
            this.ctx.fillRect(x, y, this.tileSize, this.tileSize);

            this.ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);

            this.ctx.font = "20px 'Segoe UI Emoji', sans-serif";
            this.ctx.fillText(bData.icon, x + 4, y + 24);
          }
        }
      }
    }

    // Rysowanie Dropów Przedmiotów
    this.itemDrops.forEach(item => {
      this.ctx.font = "18px 'Segoe UI Emoji', sans-serif";
      this.ctx.fillText(item.icon || '📦', item.x, item.y);
    });

    // Rysowanie Gracza (Steve)
    const cData = HERO_CLASSES[gameState.hero.classKey];
    this.ctx.font = "38px 'Segoe UI Emoji', sans-serif";
    this.ctx.fillText(cData ? cData.avatar : '⚔️', this.player.x, this.player.y + 36);

    // Rysowanie Nocnych Potworów
    this.monsters.forEach(m => {
      this.ctx.font = "38px 'Segoe UI Emoji', sans-serif";
      this.ctx.fillText(m.sprite, m.x, m.y + 36);
    });
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

const mcEngine = new MinecraftEngine();

// --- INICJALIZACJA I ZDARZENIA ---
document.addEventListener('DOMContentLoaded', () => {
  loadGame();
  setupEvents();
  renderAllUI();
});

function setupEvents() {
  // Przełączanie Trybów Gry
  document.getElementById('tab-mc-mode').addEventListener('click', () => {
    switchGameMode('mc');
  });
  document.getElementById('tab-dungeon-mode').addEventListener('click', () => {
    switchGameMode('dungeon');
  });

  // Tworzenie Postaci
  document.querySelectorAll('.class-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.class-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      audio.playClick();
    });
  });

  document.getElementById('btn-start-game').addEventListener('click', () => {
    const nameInput = document.getElementById('hero-name').value.trim() || 'Steve';
    const selectedClassOpt = document.querySelector('.class-option.selected');
    const classKey = selectedClassOpt ? selectedClassOpt.dataset.class : 'warrior';

    initHero(nameInput, classKey);
    document.getElementById('char-creation').classList.remove('active');
    document.getElementById('game-main').classList.add('active');
    audio.playClick();
    saveGame();
    renderAllUI();
    switchGameMode('mc');
  });

  // Dźwięk toggle
  document.getElementById('btn-sound-toggle').addEventListener('click', (e) => {
    audio.enabled = !audio.enabled;
    e.target.innerText = audio.enabled ? '🔊' : '🔇';
    audio.playClick();
  });

  // Przycisk Zmiany Dnia/Nocy
  document.getElementById('btn-toggle-time').addEventListener('click', () => {
    mcEngine.isNight = !mcEngine.isNight;
    document.getElementById('mc-time-text').innerText = mcEngine.isNight ? 'Noc 🌙' : 'Dzień ☀️';
    audio.playClick();
  });

  // Crafting Modal
  document.getElementById('btn-open-crafting').addEventListener('click', openCraftingModal);
  document.getElementById('btn-close-crafting').addEventListener('click', () => document.getElementById('crafting-modal').close());

  // Modale
  document.getElementById('btn-open-hero').addEventListener('click', () => { renderHeroModal(); document.getElementById('hero-modal').showModal(); audio.playClick(); });
  document.getElementById('btn-close-hero').addEventListener('click', () => document.getElementById('hero-modal').close());

  document.getElementById('btn-open-shop').addEventListener('click', () => { renderShopModal(); document.getElementById('shop-modal').showModal(); audio.playClick(); });
  document.getElementById('btn-close-shop').addEventListener('click', () => document.getElementById('shop-modal').close());
}

function switchGameMode(mode) {
  const tabMc = document.getElementById('tab-mc-mode');
  const tabDungeon = document.getElementById('tab-dungeon-mode');
  const viewMc = document.getElementById('mc-view');
  const viewDungeon = document.getElementById('dungeon-view');

  audio.playClick();

  if (mode === 'mc') {
    tabMc.classList.add('active');
    tabDungeon.classList.remove('active');
    viewMc.classList.add('active');
    viewDungeon.classList.remove('active');

    mcEngine.start(false);
    renderHotbar();
  } else {
    tabDungeon.classList.add('active');
    tabMc.classList.remove('active');
    viewDungeon.classList.add('active');
    viewMc.classList.remove('active');

    mcEngine.stop();
    renderWorldMap();
  }
}

function renderHotbar() {
  const hotbarEl = document.getElementById('mc-hotbar');
  if (!hotbarEl) return;
  hotbarEl.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const item = gameState.inventory[i];
    const slotDiv = document.createElement('div');
    slotDiv.className = `mc-hotbar-slot ${i === gameState.selectedHotbarIndex ? 'selected' : ''}`;
    slotDiv.innerHTML = `
      <span class="slot-num">${i + 1}</span>
      <span class="slot-icon">${item ? item.icon : ''}</span>
      <span class="slot-qty">${item && item.count > 1 ? item.count : ''}</span>
    `;

    slotDiv.addEventListener('click', () => {
      gameState.selectedHotbarIndex = i;
      renderHotbar();
      audio.playClick();
    });

    hotbarEl.appendChild(slotDiv);
  }
}

function openCraftingModal() {
  renderCraftingModal();
  document.getElementById('crafting-modal').showModal();
  audio.playClick();
}

function renderCraftingModal() {
  const grid = document.getElementById('crafting-recipes-grid');
  grid.innerHTML = '';

  CRAFTING_RECIPES.forEach(recipe => {
    const div = document.createElement('div');
    div.className = 'craft-item';
    div.innerHTML = `
      <div class="craft-item-info">
        <div class="craft-item-icon">${recipe.icon}</div>
        <div class="craft-item-details">
          <h4>${recipe.name}</h4>
          <p>${recipe.desc}</p>
        </div>
      </div>
      <button class="btn btn-small btn-primary btn-craft" data-id="${recipe.id}">Stwórz</button>
    `;

    div.querySelector('.btn-craft').addEventListener('click', () => craftRecipe(recipe));
    grid.appendChild(div);
  });
}

function craftRecipe(recipe) {
  // Sprawdzenie czy gracz posiada wymagane materiały
  let canCraft = true;
  for (const [matId, reqCount] of Object.entries(recipe.req)) {
    const invItem = gameState.inventory.find(i => String(i.id) === String(matId));
    if (!invItem || invItem.count < reqCount) {
      canCraft = false;
      break;
    }
  }

  if (!canCraft) {
    alert('Brak wymaganych surowców do wytworzenia przedmiotu!');
    return;
  }

  // Zużycie surowców
  for (const [matId, reqCount] of Object.entries(recipe.req)) {
    const invItem = gameState.inventory.find(i => String(i.id) === String(matId));
    invItem.count -= reqCount;
  }
  gameState.inventory = gameState.inventory.filter(i => i.count > 0);

  // Dodanie stworzonego przedmiotu
  const give = recipe.give;
  mcEngine.addInventoryItem({
    id: give.id,
    name: recipe.name,
    icon: recipe.icon,
    count: give.count
  });

  audio.playPickup();
  renderCraftingModal();
  renderHotbar();
  saveGame();
}

function initHero(name, classKey) {
  const cData = HERO_CLASSES[classKey];
  gameState.hero = {
    name: name,
    classKey: classKey,
    level: 1,
    xp: 0,
    maxXp: 100,
    hp: cData.baseHp,
    maxHp: cData.baseHp,
    mp: cData.baseMp,
    maxMp: cData.baseMp,
    gold: 50,
    statPoints: 0,
    str: cData.str,
    dex: cData.dex,
    int: cData.int,
    vit: cData.vit,
    potions: 3,
    gear: { weapon: null, armor: null }
  };
  gameState.inventory = [
    { id: BLOCK_TYPES.WOOD, name: 'Pień Drzewa', icon: '🪵', count: 5, type: 'block' },
    { id: BLOCK_TYPES.DIRT, name: 'Blok Ziemi', icon: '🟤', count: 10, type: 'block' }
  ];
  gameState.mapPos = { x: WORLD_REGIONS[0].x, y: WORLD_REGIONS[0].y };
  gameState.unlockedRegionIndex = 0;
  gameState.completedRegions = [];
}

function recalculateStats() {
  const h = gameState.hero;
  const cData = HERO_CLASSES[h.classKey];
  const bonusHp = (h.vit - cData.vit) * 10;
  const bonusMp = (h.int - cData.int) * 5;
  h.maxHp = cData.baseHp + bonusHp;
  h.maxMp = cData.baseMp + bonusMp;
}

function renderAllUI() {
  renderTopBar();
  renderHotbar();
  renderWorldMap();
}

function renderTopBar() {
  const h = gameState.hero;
  const cData = HERO_CLASSES[h.classKey];

  document.getElementById('player-avatar').innerText = cData.avatar;
  document.getElementById('player-display-name').innerText = h.name;
  document.getElementById('player-class-badge').innerText = `${cData.name} (Poziom ${h.level})`;

  document.getElementById('mc-hp-text').innerText = `${Math.floor(h.hp)}/${h.maxHp}`;
  document.getElementById('player-gold').innerText = h.gold;

  const statBadge = document.getElementById('stat-points-badge');
  if (h.statPoints > 0) {
    statBadge.classList.remove('hidden');
    statBadge.innerText = h.statPoints;
  } else {
    statBadge.classList.add('hidden');
  }
}

// --- RENDEROWANIE PORTALOWEJ MAPY LOCHÓW ---
function renderWorldMap() {
  const container = document.getElementById('map-nodes-container');
  const svg = document.getElementById('map-paths-svg');
  if (!container || !svg) return;
  container.innerHTML = '';
  svg.innerHTML = '';

  if (typeof gameState.unlockedRegionIndex !== 'number') gameState.unlockedRegionIndex = 0;
  if (!Array.isArray(gameState.completedRegions)) gameState.completedRegions = [];

  for (let i = 0; i < WORLD_REGIONS.length - 1; i++) {
    const r1 = WORLD_REGIONS[i];
    const r2 = WORLD_REGIONS[i + 1];

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${r1.x}%`);
    line.setAttribute('y1', `${r1.y}%`);
    line.setAttribute('x2', `${r2.x}%`);
    line.setAttribute('y2', `${r2.y}%`);
    line.setAttribute('class', `map-path-line ${i < gameState.unlockedRegionIndex ? 'unlocked' : ''}`);
    svg.appendChild(line);
  }

  WORLD_REGIONS.forEach((region, index) => {
    const node = document.createElement('div');
    let stateClass = 'locked';

    if (gameState.completedRegions.includes(region.id)) {
      stateClass = 'completed';
    } else if (index <= gameState.unlockedRegionIndex) {
      stateClass = 'unlocked';
    }
    if (region.isBoss) stateClass += ' boss';

    node.className = `map-node ${stateClass}`;
    node.style.left = `${region.x}%`;
    node.style.top = `${region.y}%`;

    node.innerHTML = `
      <div class="node-circle">${region.icon}</div>
      <div class="node-label">${region.name} (Poz. ${region.level})</div>
    `;

    if (index <= gameState.unlockedRegionIndex) {
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        moveHeroTo(region.x, region.y, () => enterDungeonPortal(region));
      });
    }

    container.appendChild(node);
  });

  updateMapAvatarPos();
}

function moveHeroTo(targetX, targetY, onArrival = null) {
  if (!gameState.mapPos) {
    gameState.mapPos = { x: WORLD_REGIONS[0].x, y: WORLD_REGIONS[0].y };
  }

  targetX = Math.max(5, Math.min(95, targetX));
  targetY = Math.max(5, Math.min(95, targetY));

  gameState.mapPos.x = targetX;
  gameState.mapPos.y = targetY;

  updateMapAvatarPos();
  audio.playStep();
  saveGame();

  if (onArrival) {
    setTimeout(onArrival, 400);
  }
}

function updateMapAvatarPos() {
  const avatar = document.getElementById('player-map-avatar');
  if (!avatar) return;
  if (!gameState.mapPos) gameState.mapPos = { x: WORLD_REGIONS[0].x, y: WORLD_REGIONS[0].y };

  const cData = HERO_CLASSES[gameState.hero.classKey];
  avatar.innerText = cData ? cData.avatar : '⚔️';
  avatar.style.left = `${gameState.mapPos.x}%`;
  avatar.style.top = `${gameState.mapPos.y}%`;
}

// TELEPORTACJA DO LOCHU
function enterDungeonPortal(region) {
  audio.playTeleport();

  const vortex = document.getElementById('teleport-vortex');
  vortex.classList.remove('hidden');
  vortex.classList.add('active');

  setTimeout(() => {
    vortex.classList.remove('active');
    vortex.classList.add('hidden');

    const modal = document.getElementById('dungeon-modal');
    modal.showModal();

    dungeonEngine.start(region);
  }, 600);
}

// WYGRANA W LOCHU I SPECJALNE NAGRODY
function handleDungeonVictory(region) {
  audio.playVictory();
  const h = gameState.hero;

  const xpReward = region.level * 100;
  const goldReward = region.level * 70;

  h.gold += goldReward;
  h.xp += xpReward;

  // Nagrody w postaci rzadkich przedmiotów do ekwipunku
  let lootMsg = '';
  if (region.id === 'dungeon_1') {
    mcEngine.addInventoryItem({ id: 'goblin_sword', name: 'Miecz Goblinów', icon: '🗡️', count: 1 });
    lootMsg = '🗡️ Otrzymałeś Miecz Goblinów!';
  } else if (region.id === 'dungeon_2') {
    mcEngine.addInventoryItem({ id: 'iron_pickaxe', name: 'Żelazny Kilof', icon: '⛏️', count: 1 });
    lootMsg = '⛏️ Otrzymałeś Żelazny Kilof!';
  } else if (region.id === 'dungeon_3') {
    mcEngine.addInventoryItem({ id: 'fire_gem', name: 'Ognista Runa', icon: '🔥', count: 1 });
    lootMsg = '🔥 Otrzymałeś Ognistą Runę!';
  } else if (region.id === 'dungeon_4') {
    mcEngine.addInventoryItem({ id: 'shadow_crown', name: 'Korona Cieni', icon: '👑', count: 1 });
    lootMsg = '👑 Otrzymałeś unikalną Koronę Cieni i Diamenty!';
  }

  const currentRegIdx = WORLD_REGIONS.findIndex(r => r.id === region.id);
  if (!gameState.completedRegions.includes(region.id)) {
    gameState.completedRegions.push(region.id);
  }
  if (currentRegIdx >= gameState.unlockedRegionIndex && gameState.unlockedRegionIndex < WORLD_REGIONS.length - 1) {
    gameState.unlockedRegionIndex = currentRegIdx + 1;
  }

  let levelUp = false;
  if (h.xp >= h.maxXp) {
    h.level++;
    h.xp -= h.maxXp;
    h.maxXp = Math.floor(h.maxXp * 1.5);
    h.statPoints += 3;
    h.hp = h.maxHp;
    h.mp = h.maxMp;
    levelUp = true;
  }

  saveGame();

  document.getElementById('result-title').innerText = levelUp ? 'LOCH OCZYSZCZONY I AWANS!' : 'LOCH OCZYSZCZONY!';
  document.getElementById('result-icon').innerText = levelUp ? '⭐' : '🏆';
  document.getElementById('result-message').innerText = `Oczyściłeś ${region.name}! ${lootMsg} ${levelUp ? 'Zdobyłeś Nowy Poziom!' : ''}`;
  document.getElementById('reward-xp').innerText = xpReward;
  document.getElementById('reward-gold').innerText = goldReward;

  document.getElementById('result-modal').showModal();
}

function handleDungeonDefeat() {
  audio.playDefeat();
  const h = gameState.hero;
  h.hp = Math.floor(h.maxHp * 0.5);
  saveGame();

  document.getElementById('result-title').innerText = 'PORAŻKA W LOCHU...';
  document.getElementById('result-icon').innerText = '💀';
  document.getElementById('result-message').innerText = 'Zostałeś powalony przez potwory lochu. Uciekłeś i odzyskałeś połowę zdrowia.';
  document.getElementById('reward-xp').innerText = 0;
  document.getElementById('reward-gold').innerText = 0;

  document.getElementById('result-modal').showModal();
}

function renderHeroModal() {
  const h = gameState.hero;
  const cData = HERO_CLASSES[h.classKey];

  document.getElementById('hero-modal-avatar').innerText = cData.avatar;
  document.getElementById('hero-modal-name').innerText = h.name;
  document.getElementById('hero-modal-class').innerText = `${cData.name} - Poziom ${h.level}`;
  document.getElementById('hero-stat-points').innerText = h.statPoints;

  document.getElementById('stat-str').innerText = h.str;
  document.getElementById('stat-dex').innerText = h.dex;
  document.getElementById('stat-int').innerText = h.int;
  document.getElementById('stat-vit').innerText = h.vit;

  document.getElementById('gear-weapon').innerText = h.gear.weapon ? h.gear.weapon.name : 'Brak';
  document.getElementById('gear-armor').innerText = h.gear.armor ? h.gear.armor.name : 'Brak';

  document.querySelectorAll('.btn-add-stat').forEach(btn => {
    btn.style.display = h.statPoints > 0 ? 'inline-block' : 'none';
  });
}

function renderShopModal() {
  const grid = document.getElementById('shop-items-grid');
  document.getElementById('shop-gold-display').innerText = gameState.hero.gold;
  grid.innerHTML = '';

  SHOP_ITEMS.forEach(item => {
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.innerHTML = `
      <div class="shop-item-icon">${item.icon}</div>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <div class="shop-item-price">🪙 ${item.price} Złota</div>
      <button class="btn btn-small btn-primary btn-buy" data-id="${item.id}">Kup</button>
    `;

    div.querySelector('.btn-buy').addEventListener('click', () => buyShopItem(item));
    grid.appendChild(div);
  });
}

function buyShopItem(item) {
  const h = gameState.hero;
  if (h.gold < item.price) {
    alert('Brak wystarczającej ilości złota!');
    return;
  }

  h.gold -= item.price;
  audio.playClick();

  if (item.type === 'consumable') {
    h.potions += 3;
  } else if (item.type === 'weapon') {
    h.gear.weapon = item;
  } else if (item.type === 'armor') {
    h.gear.armor = item;
  }

  recalculateStats();
  renderShopModal();
  renderTopBar();
  saveGame();
}

function saveGame() {
  try {
    localStorage.setItem('hero_quest_mc_save', JSON.stringify(gameState));
  } catch (e) {
    console.error('Błąd zapisu:', e);
  }
}

function loadGame() {
  try {
    const data = localStorage.getItem('hero_quest_mc_save');
    if (data) {
      const loaded = JSON.parse(data);
      gameState = Object.assign({}, gameState, loaded);

      if (typeof gameState.unlockedRegionIndex !== 'number') gameState.unlockedRegionIndex = 0;
      if (!Array.isArray(gameState.completedRegions)) gameState.completedRegions = [];
      if (!gameState.mapPos || typeof gameState.mapPos.x !== 'number') {
        gameState.mapPos = { x: WORLD_REGIONS[0].x, y: WORLD_REGIONS[0].y };
      }
      if (!Array.isArray(gameState.inventory)) gameState.inventory = [];

      document.getElementById('char-creation').classList.remove('active');
      document.getElementById('game-main').classList.add('active');
      recalculateStats();
    }
  } catch (e) {
    console.error('Błąd odczytu:', e);
  }
}
