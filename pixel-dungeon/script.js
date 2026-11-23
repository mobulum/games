/* ===================================================
   PIXEL DUNGEON DECKBUILDER - CORE GAME ENGINE
   Pixel Art Sprites, Audio Synthesizer, Roguelike Logic
   =================================================== */

// --- AUDIO SYNTHESIZER (Web Audio API 8-bit Sound FX) ---
class RetroAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }

    playTone(freq, type = 'square', duration = 0.1, gainVal = 0.1) {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio play error", e);
        }
    }

    playCardDraw() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.08);
    }

    playAttack() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.15);
    }

    playShield() {
        this.playTone(320, 'sine', 0.2, 0.15);
        setTimeout(() => this.playTone(480, 'sine', 0.25, 0.12), 60);
    }

    playMagic() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(850, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.25);
    }

    playVictory() {
        const notes = [261, 329, 392, 523];
        notes.forEach((n, i) => {
            setTimeout(() => this.playTone(n, 'square', 0.2, 0.15), i * 120);
        });
    }

    playHurt() {
        this.playTone(90, 'sawtooth', 0.25, 0.25);
    }
}

const audio = new RetroAudio();

// --- PIXEL ART PROCEDURAL SPRITE RENDERER ---
class PixelRenderer {
    // 16x16 sprite generator
    static drawPixelSprite(ctx, spriteMatrix, palette, pixelSize = 4) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let r = 0; r < spriteMatrix.length; r++) {
            for (let c = 0; c < spriteMatrix[r].length; c++) {
                const colorKey = spriteMatrix[r][c];
                if (colorKey && palette[colorKey]) {
                    ctx.fillStyle = palette[colorKey];
                    ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
                }
            }
        }
    }
}

// Pixel art definition templates
const PALETTES = {
    knight: {
        '.': null,
        'H': '#dfe4ea', // Helm silver
        'D': '#747d8c', // Dark armor
        'F': '#ffbe76', // Face/skin
        'E': '#2f3542', // Eyes
        'S': '#3742fa', // Blue cape/tunic
        'G': '#f1c40f', // Gold trim
        'W': '#ffffff'  // Highlight
    },
    goblin: {
        '.': null,
        'G': '#2ed573', // Green skin
        'D': '#1e824c', // Dark green
        'E': '#ff4757', // Red eyes
        'C': '#8b572a', // Cloth/leather
        'W': '#ffffff'  // Dagger steel
    },
    skeleton: {
        '.': null,
        'B': '#f1f2f6', // Bone
        'D': '#a4b0be', // Dark bone
        'E': '#00d2d3', // Glowing cyan eyes
        'R': '#57606f', // Rags
        'S': '#dfe4ea'  // Sword
    },
    demon: {
        '.': null,
        'R': '#ff4757', // Red skin
        'D': '#b33939', // Dark red
        'H': '#2f3542', // Horns
        'Y': '#ffa502', // Lava eyes/mouth
        'G': '#1e272e'  // Claws/armor
    },
    dragon: {
        '.': null,
        'S': '#5f27cd', // Purple scales
        'D': '#341f97', // Dark purple
        'F': '#ff9f43', // Fire/eyes
        'W': '#ffffff', // Fangs
        'G': '#ffda79'  // Horns
    },
    cardSword: {
        '.': null,
        'M': '#dfe4ea', // Metal blade
        'H': '#ff4757', // Ruby / Grip
        'G': '#f1c40f', // Golden Guard
        'B': '#2f3542'  // Pommel
    },
    cardShield: {
        '.': null,
        'I': '#3742fa', // Blue crest
        'B': '#70a1ff', // Light shield
        'O': '#2f3542', // Border
        'G': '#f1c40f'  // Gold boss
    },
    cardFire: {
        '.': null,
        'F': '#ff4757', // Red flame
        'O': '#ff793f', // Orange flame
        'Y': '#f1c40f', // Yellow center
        'W': '#ffffff'  // Core
    },
    cardHeal: {
        '.': null,
        'G': '#2ed573', // Green cross
        'W': '#ffffff', // Light sparkles
        'H': '#ff6b81'  // Heart red
    },
    cardDagger: {
        '.': null,
        'S': '#70a1ff', // Poison / Sharp
        'M': '#dfe4ea', // Blade
        'G': '#e056fd'  // Venom
    },
    heroMage: {
        '.': null,
        'H': '#9b5de5', // Purple hood
        'F': '#ffbe76', // Face
        'E': '#00d2d3', // Glowing cyan eyes
        'R': '#5f27cd', // Robe
        'G': '#f1c40f', // Gold amulet
        'S': '#00d2d3'  // Magic crystal staff
    },
    heroRogue: {
        '.': null,
        'H': '#2f3542', // Dark hood
        'F': '#ffbe76', // Skin
        'E': '#2ed573', // Green eyes
        'M': '#57606f', // Mask
        'C': '#1e272e', // Cloak
        'D': '#dfe4ea'  // Dagger steel
    },
    heroBerserk: {
        '.': null,
        'H': '#b33939', // Warpaint / Red hair
        'F': '#e58e26', // Tanned skin
        'E': '#ffffff', // White rage eyes
        'B': '#747d8c', // Spiked pauldron
        'A': '#dfe4ea', // Giant battle axe
        'W': '#ff3838'  // Blood tattoo
    },
    heroNecro: {
        '.': null,
        'H': '#130f40', // Midnight hood
        'F': '#dff9fb', // Pale skull face
        'E': '#badc58', // Eerie green eyes
        'R': '#30336b', // Robe of skulls
        'S': '#6ab04c'  // Necro flame
    },
    heroPaladin: {
        '.': null,
        'H': '#f9ca24', // Golden winged helm
        'F': '#ffbe76', // Face
        'E': '#3498db', // Blue eyes
        'A': '#f6e58d', // Radiant golden armor
        'S': '#ffffff', // Sacred blade
        'B': '#30336b'  // Royal blue mantle
    }
};

const SPRITES = {
    knight: [
        "....HHHHHH......",
        "...HDDDDDDH.....",
        "...HDEEEDEH.....",
        "...HDFFFDEH.....",
        "...HDFFFDEH.....",
        "....DDDDDD......",
        "...SSGGGGSS.....",
        "..SSSSGGSSSS....",
        "..SSDDDDDDSS....",
        "..SHDDDDDDHS....",
        "..SH.DDDD.HS....",
        ".....DDDD.......",
        ".....DD.DD......",
        "....DDD.DDD.....",
        "....DDD.DDD.....",
        "................"
    ],
    goblin: [
        "...GG....GG.....",
        "..GGGG..GGGG....",
        "..GGGGGGGGGG....",
        "..GGEGGGGEGG....",
        "...GGGGGGGG.....",
        "....DDGGDD......",
        "...CCCCCCCCC....",
        "..CCCCCCCCCCC...",
        "..CGCCCCCCGGC...",
        "..CG.CCCC.GGC...",
        ".....CCCC.......",
        ".....CCCC.......",
        "....GG..GG......",
        "....GG..GG......",
        "...GGG..GGG.....",
        "................"
    ],
    skeleton: [
        "....BBBBBB......",
        "...BBBBBBBB.....",
        "...BBDEBDEBB....",
        "...BBBBBBBBB....",
        "....BDBBDB......",
        ".....BBBB.......",
        "....RRBBRR......",
        "...RRRDBRRR.....",
        "...R..DB..R.....",
        "......DB........",
        ".....BBBB.......",
        ".....BB.BB......",
        ".....BB.BB......",
        "....BBB.BBB.....",
        "....BBB.BBB.....",
        "................"
    ],
    demon: [
        "..H........H....",
        "..HH......HH....",
        "...RRRRRRRR.....",
        "..RRYRRRRYRR....",
        "..RRRRRRRRRR....",
        "...RRRYYYRR.....",
        "..GGRRRRRRGG....",
        ".GGGRRRRRRGGG...",
        ".GGGRRDDRRGGG...",
        "...GRRDDRG......",
        "....RD..DR......",
        "....RD..DR......",
        "....RD..DR......",
        "...RRR..RRR.....",
        "...GGG..GGG.....",
        "................"
    ],
    dragon: [
        "....GG....GG....",
        "...SSSSSSSSSS...",
        "..SSSFSSSSSFSS..",
        "..SSSSSSSSSSSS..",
        "...SSSWWWSSSS...",
        "....SSSSSSSS....",
        "..DDDSDDDDSDD...",
        ".DDDDSSSSDDDD...",
        ".DDDDSSSSDDDD...",
        "..DD.SSSS.DD....",
        ".....SSSS.......",
        "....SS..SS......",
        "....SS..SS......",
        "...SSS..SSS.....",
        "...SSS..SSS.....",
        "................"
    ],
    cardSword: [
        "..............M.",
        ".............MM.",
        "............MM..",
        "...........MM...",
        "..........MM....",
        ".........MM.....",
        "........MM......",
        ".......MM.......",
        "......MM........",
        ".....MM.........",
        "..GGMMGG........",
        "...GGGG.........",
        "....HH..........",
        "...HH...........",
        "..B.............",
        "................"
    ],
    cardShield: [
        "....OOOOOOOO....",
        "...OBBBBBBBBO...",
        "..OBBIIIIIIBBO..",
        "..OBBIIIIIIBBO..",
        "..OBBIIGGIIRBO..",
        "..OBBIIGGIIRBO..",
        "..OBBIIIIIIBBO..",
        "...OBBIIIIBBO...",
        "...OBBBBBBBBO...",
        "....OBBBBBBO....",
        ".....OBBBBBO....",
        "......OBBBO.....",
        ".......OBO......",
        "........O.......",
        "................",
        "................"
    ],
    cardFire: [
        ".......FF.......",
        "......FFFF......",
        ".....FOOOFF.....",
        "....FOOYOOFF....",
        "...FOOYYYYOOF...",
        "...FOYYYYYYOF...",
        "..FOOYYWWYYOOF..",
        "..FOYYYYWWYYOF..",
        "..FOOYYWWYYOOF..",
        "...FOYYYYYYOF...",
        "...FOOYYYYOOF...",
        "....FFFOOOFF....",
        ".....FFFFFF.....",
        "......FFFF......",
        ".......FF.......",
        "................"
    ],
    cardHeal: [
        ".......WW.......",
        "......GGGG......",
        "......GGGG......",
        "...GGGGGGGGGG...",
        "...GGGGGGGGGG...",
        "......GGGG......",
        "......GGGG......",
        ".......WW.......",
        ".....HH..HH.....",
        "....HHHHHHHH....",
        "....HHHHHHHH....",
        ".....HHHHHH.....",
        "......HHHH......",
        ".......HH.......",
        "................",
        "................"
    ],
    cardDagger: [
        "..............S.",
        ".............SS.",
        "............SM..",
        "...........SM...",
        "..........SM....",
        ".........SM.....",
        "........SM......",
        ".......SM.......",
        "......SM........",
        "....GGSMGG......",
        ".....GGGG.......",
        "......MM........",
        ".....MM.........",
        "....B...........",
        "................",
        "................"
    ],
    heroMage: [
        ".....HHHHHH.....",
        "....HHHHHHHH....",
        "....HHEEEHHH....",
        "....HHFFFHHH....",
        ".....RRRRRR.....",
        "....RRRGGRRR....",
        "...SRRRRRRRR....",
        "..SSR.RRRR.R....",
        "..SSR.RRRR.R....",
        "...S..RRRR......",
        "...S..RRRR......",
        "...S..RR.RR.....",
        "......RR.RR.....",
        ".....RRR.RRR....",
        "................",
        "................"
    ],
    heroRogue: [
        ".....HHHHHH.....",
        "....HHHHHHHH....",
        "....HHEEEHHH....",
        "....HHMMMHHH....",
        ".....CCCCCC.....",
        "....CCCCDCCC....",
        "...CCCCC.CCCC...",
        "..CC.CCC.CCC.C..",
        ".....CCC.CCC....",
        ".....CCCCCC.....",
        ".....CC..CC.....",
        "....CCC..CCC....",
        "....CCC..CCC....",
        "................",
        "................",
        "................"
    ],
    heroBerserk: [
        "....HHHHHHHH....",
        "...HHHHHHHHHH...",
        "...HHFEEFFHHH...",
        "...HHFWWFFHHH...",
        "....FFFFFFFF....",
        "...BBAAFFFF.....",
        "..BBBAAFFFFFF...",
        "..B..AAFFFF.F...",
        ".....AA.FFFF....",
        ".....AA.FFFF....",
        ".....FF..FF.....",
        "....FFF..FFF....",
        "....FFF..FFF....",
        "................",
        "................",
        "................"
    ],
    heroNecro: [
        ".....HHHHHH.....",
        "....HHHHHHHH....",
        "....HHFFFHHH....",
        "....HHEEEHHH....",
        ".....RRRRRR.....",
        "....RRRRRRRR....",
        "...SRRRRRRRR....",
        "..SSR.RRRR.R....",
        "..SSR.RRRR......",
        "...S..RRRR......",
        "...S..RR.RR.....",
        "......RR.RR.....",
        ".....RRR.RRR....",
        "................",
        "................",
        "................"
    ],
    heroPaladin: [
        "....HHHHHHHH....",
        "...HHAAAAAAHH...",
        "...HAAEEEAAAH...",
        "...HAFFFFFAAH...",
        "....AAAAAAAA....",
        "...BBAAAAAABB...",
        "..BBBBAAAABBBB..",
        "..B..SAAAS..B...",
        ".....SAAAA......",
        ".....SAAAA......",
        ".....AA..AA.....",
        "....AAA..AAA....",
        "....AAA..AAA....",
        "................",
        "................",
        "................"
    ]
};

// --- GAME CARD DATABASE ---
const CARD_DB = {
    // Podstawowe
    strike: {
        id: 'strike',
        name: 'Cięcie Mieczem',
        cost: 1,
        type: 'attack',
        sprite: 'cardSword',
        palette: 'cardSword',
        desc: 'Zadaje 6 pkt obrażeń wrogowi.',
        rarity: 'common',
        effect: (state) => {
            dealDamageToEnemy(state, 6);
            audio.playAttack();
        }
    },
    defend: {
        id: 'defend',
        name: 'Obrona Tarczą',
        cost: 1,
        type: 'defense',
        sprite: 'cardShield',
        palette: 'cardShield',
        desc: 'Daje 5 pkt Pancerza.',
        rarity: 'common',
        effect: (state) => {
            addPlayerShield(state, 5);
            audio.playShield();
        }
    },
    fireball: {
        id: 'fireball',
        name: 'Kula Ognia',
        cost: 2,
        type: 'magic',
        sprite: 'cardFire',
        palette: 'cardFire',
        desc: 'Wybuch ognia: 14 pkt potężnych obrażeń.',
        rarity: 'uncommon',
        effect: (state) => {
            dealDamageToEnemy(state, 14);
            audio.playMagic();
        }
    },
    quickSlash: {
        id: 'quickSlash',
        name: 'Szybki Sztych',
        cost: 0,
        type: 'attack',
        sprite: 'cardDagger',
        palette: 'cardDagger',
        desc: 'Koszt 0: Zadaje 4 pkt obrażeń.',
        rarity: 'uncommon',
        effect: (state) => {
            dealDamageToEnemy(state, 4);
            audio.playAttack();
        }
    },
    holyHeal: {
        id: 'holyHeal',
        name: 'Błogosławieństwo',
        cost: 1,
        type: 'magic',
        sprite: 'cardHeal',
        palette: 'cardHeal',
        desc: 'Leczy 7 PŻ i daje 3 Pancerza.',
        rarity: 'rare',
        effect: (state) => {
            healPlayer(state, 7);
            addPlayerShield(state, 3);
            audio.playMagic();
        }
    },
    heavyBash: {
        id: 'heavyBash',
        name: 'Miażdżący Cios',
        cost: 2,
        type: 'attack',
        sprite: 'cardSword',
        palette: 'cardSword',
        desc: 'Zadaje 10 obrażeń i daje 8 Pancerza.',
        rarity: 'rare',
        effect: (state) => {
            dealDamageToEnemy(state, 10);
            addPlayerShield(state, 8);
            audio.playAttack();
        }
    },
    poisonDagger: {
        id: 'poisonDagger',
        name: 'Zatrute Ostrze',
        cost: 1,
        type: 'attack',
        sprite: 'cardDagger',
        palette: 'cardDagger',
        desc: 'Zadaje 4 obrażeń i nakłada Truciznę (3/turę).',
        rarity: 'uncommon',
        effect: (state) => {
            dealDamageToEnemy(state, 4);
            state.enemy.poison = (state.enemy.poison || 0) + 3;
            addLog(`🧪 Wróg został otruty (+3 zatrucia)!`);
            audio.playAttack();
        }
    },
    fortress: {
        id: 'fortress',
        name: 'Forteca',
        cost: 2,
        type: 'defense',
        sprite: 'cardShield',
        palette: 'cardShield',
        desc: 'Zapewnia potężny pancerz: 16 pkt.',
        rarity: 'rare',
        effect: (state) => {
            addPlayerShield(state, 16);
            audio.playShield();
        }
    },

    // ============================================
    // KARTY POSTACI (HERO CHARACTER CARDS Z PACZEK)
    // ============================================
    heroKnightCard: {
        id: 'heroKnightCard',
        name: 'Rycerz: Szarża',
        cost: 2,
        type: 'hero',
        sprite: 'knight',
        palette: 'knight',
        isCharacter: true,
        charClass: 'Rycerz',
        desc: 'Postać Rycerza: Uderza za 14 dmg i daje 10 Tarczy.',
        rarity: 'rare',
        effect: (state) => {
            dealDamageToEnemy(state, 14);
            addPlayerShield(state, 10);
            audio.playAttack();
            addLog("🛡️ <b>Rycerz</b> przeprowadza niepowstrzymaną szarżę!");
        }
    },
    heroMageCard: {
        id: 'heroMageCard',
        name: 'Czarodziejka: Burza',
        cost: 2,
        type: 'hero',
        sprite: 'heroMage',
        palette: 'heroMage',
        isCharacter: true,
        charClass: 'Czarodziejka',
        desc: 'Postać Maga: Poraża wroga za 18 pkt magicznych obrażeń!',
        rarity: 'rare',
        effect: (state) => {
            dealDamageToEnemy(state, 18);
            audio.playMagic();
            addLog("⚡ <b>Czarodziejka</b> wyzwala niszczycielską burzę arcana!");
        }
    },
    heroRogueCard: {
        id: 'heroRogueCard',
        name: 'Zabójca z Cienia',
        cost: 1,
        type: 'hero',
        sprite: 'heroRogue',
        palette: 'heroRogue',
        isCharacter: true,
        charClass: 'Łotrzyk',
        desc: 'Postać Łotrzyka: Cios w plecy za 10 dmg + 5 Trucizny!',
        rarity: 'rare',
        effect: (state) => {
            dealDamageToEnemy(state, 10);
            state.enemy.poison = (state.enemy.poison || 0) + 5;
            audio.playAttack();
            addLog("🗡️ <b>Zabójca</b> zadaje zdradziecki cios w plecy i zatruwa wroga!");
        }
    },
    heroBerserkCard: {
        id: 'heroBerserkCard',
        name: 'Berserker: Szał Krwi',
        cost: 3,
        type: 'hero',
        sprite: 'heroBerserk',
        palette: 'heroBerserk',
        isCharacter: true,
        charClass: 'Berserker',
        desc: 'Postać Berserkera: Zadaje dewastujące 26 obrażeń!',
        rarity: 'legendary',
        effect: (state) => {
            dealDamageToEnemy(state, 26);
            audio.playAttack();
            addLog("🪓 <b>Berserker</b> wpada w szał bitewny rozcinając pancerz wroga!");
        }
    },
    heroNecroCard: {
        id: 'heroNecroCard',
        name: 'Nekromanta: Klątwa',
        cost: 2,
        type: 'hero',
        sprite: 'heroNecro',
        palette: 'heroNecro',
        isCharacter: true,
        charClass: 'Nekromanta',
        desc: 'Postać Nekromanty: Wysysa 10 PŻ z wroga i leczy Gracza!',
        rarity: 'legendary',
        effect: (state) => {
            dealDamageToEnemy(state, 10);
            healPlayer(state, 10);
            audio.playMagic();
            addLog("💀 <b>Nekromanta</b> wysysa esencję życiową z przeciwnika!");
        }
    },
    heroPaladinCard: {
        id: 'heroPaladinCard',
        name: 'Paladyn: Złota Aura',
        cost: 2,
        type: 'hero',
        sprite: 'heroPaladin',
        palette: 'heroPaladin',
        isCharacter: true,
        charClass: 'Paladyn',
        desc: 'Postać Paladyna: Daje 15 Tarczy i przywraca 8 PŻ!',
        rarity: 'legendary',
        effect: (state) => {
            addPlayerShield(state, 15);
            healPlayer(state, 8);
            audio.playMagic();
            addLog("✨ <b>Paladyn</b> rozświetla podziemia świętą aurą obrony!");
        }
    }
};

// --- ENEMY ENCOUNTER DEFINITIONS ---
const ENEMY_TEMPLATES = [
    {
        name: 'Goblin Rozbójnik',
        maxHp: 28,
        sprite: 'goblin',
        palette: 'goblin',
        goldReward: 15,
        actions: [
            { type: 'attack', val: 6, desc: 'Cięcie Sztyletem' },
            { type: 'attack', val: 9, desc: 'Wściekły Wyskoczek' },
            { type: 'defend', val: 6, desc: 'Zasłona Małą Tarczą' }
        ]
    },
    {
        name: 'Szkielet Wojownik',
        maxHp: 38,
        sprite: 'skeleton',
        palette: 'skeleton',
        goldReward: 22,
        actions: [
            { type: 'attack', val: 8, desc: 'Rdzawe Ostrze' },
            { type: 'shieldAttack', attack: 7, shield: 6, desc: 'Atak ze Zwarcia' },
            { type: 'attack', val: 13, desc: 'Toporny Zamach' }
        ]
    },
    {
        name: 'Ognisty Bies',
        maxHp: 52,
        sprite: 'demon',
        palette: 'demon',
        goldReward: 35,
        actions: [
            { type: 'attack', val: 12, desc: 'Piekielne Pazury' },
            { type: 'attack', val: 16, desc: 'Płomienny Oddech' },
            { type: 'defend', val: 12, desc: 'Lawa Ochronna' }
        ]
    },
    {
        name: 'Smok Otchłani (Boss)',
        maxHp: 80,
        sprite: 'dragon',
        palette: 'dragon',
        goldReward: 60,
        actions: [
            { type: 'attack', val: 15, desc: 'Miażdżące Kły' },
            { type: 'attack', val: 22, desc: 'Piekielna Kula Cienia' },
            { type: 'shieldAttack', attack: 10, shield: 15, desc: 'Skrzydlata Zasłona' }
        ]
    }
];

// --- HERO CHARACTERS DATABASE (POSTACIE GRACZA) ---
const HERO_CLASSES = {
    knight: {
        id: 'knight',
        name: 'Sir Roland',
        title: 'Rycerz Zakonu',
        sprite: 'knight',
        palette: 'knight',
        maxHp: 60,
        maxEnergy: 3,
        startShield: 4,
        passiveDesc: 'Pancerz Zakonu: Zaczyna każdą walkę z 4 pkt darmowej Tarczy.',
        startDeck: ['strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'heroKnightCard', 'quickSlash'],
        color: '#3498db'
    },
    mage: {
        id: 'mage',
        name: 'Archimagini Lyra',
        title: 'Czarodziejka Arcana',
        sprite: 'heroMage',
        palette: 'heroMage',
        maxHp: 44,
        maxEnergy: 4,
        startShield: 0,
        passiveDesc: 'Źródło Many: Posiada 4 punkty energii w każdej turze (zamiast 3).',
        startDeck: ['strike', 'defend', 'defend', 'fireball', 'fireball', 'heroMageCard', 'holyHeal'],
        color: '#9b5de5'
    },
    rogue: {
        id: 'rogue',
        name: 'Vex Cichy Cień',
        title: 'Mistrz Zabójców',
        sprite: 'heroRogue',
        palette: 'heroRogue',
        maxHp: 48,
        maxEnergy: 3,
        startShield: 0,
        passiveDesc: 'Trujący Płaszcz: Każde zagrane Cięcie lub Sztych nakłada +1 Truciznę.',
        startDeck: ['strike', 'strike', 'quickSlash', 'quickSlash', 'poisonDagger', 'defend', 'heroRogueCard'],
        color: '#2ed573'
    },
    berserk: {
        id: 'berserk',
        name: 'Gromm Topornik',
        title: 'Krwawy Berserker',
        sprite: 'heroBerserk',
        palette: 'heroBerserk',
        maxHp: 75,
        maxEnergy: 3,
        startShield: 0,
        passiveDesc: 'Potęga Krwi: Zaczyna z aż 75 PŻ i potężnymi atakami wręcz.',
        startDeck: ['strike', 'strike', 'strike', 'strike', 'heavyBash', 'heroBerserkCard', 'defend'],
        color: '#e74c3c'
    },
    necro: {
        id: 'necro',
        name: 'Malakor Ponury',
        title: 'Pan Cmentarzy',
        sprite: 'heroNecro',
        palette: 'heroNecro',
        maxHp: 50,
        maxEnergy: 3,
        startShield: 0,
        passiveDesc: 'Wampiryzm Duszy: Zabicie wroga leczy dodatkowo 8 PŻ gracza.',
        startDeck: ['strike', 'strike', 'defend', 'defend', 'poisonDagger', 'heroNecroCard', 'fireball'],
        color: '#130f40'
    },
    paladin: {
        id: 'paladin',
        name: 'Kaelen Świetlisty',
        title: 'Święty Paladyn',
        sprite: 'heroPaladin',
        palette: 'heroPaladin',
        maxHp: 65,
        maxEnergy: 3,
        startShield: 5,
        passiveDesc: 'Święte Błogosławieństwo: Zaczyna z 5 Pancerza i kartami leczenia.',
        startDeck: ['strike', 'strike', 'defend', 'defend', 'defend', 'holyHeal', 'heroPaladinCard', 'fortress'],
        color: '#f1c40f'
    }
};

// --- GAME STATE ---
class GameState {
    constructor() {
        this.floor = 1;
        this.gold = 30;
        this.kills = 0;

        // Selected Hero Character
        this.heroClass = 'knight';

        // Player
        this.player = {
            maxHp: 60,
            hp: 60,
            shield: 0,
            maxEnergy: 3,
            energy: 3
        };

        // Decks
        this.deck = [];
        this.drawPile = [];
        this.discardPile = [];
        this.hand = [];

        // Current enemy
        this.enemy = null;
        this.turn = 'player'; // 'player' | 'enemy' | 'animating'

        this.applyHeroClass('knight');
    }

    applyHeroClass(heroId) {
        const hero = HERO_CLASSES[heroId] || HERO_CLASSES.knight;
        this.heroClass = hero.id;
        this.player.maxHp = hero.maxHp;
        this.player.hp = hero.maxHp;
        this.player.maxEnergy = hero.maxEnergy;
        this.player.energy = hero.maxEnergy;
        this.player.shield = hero.startShield || 0;

        this.deck = [...hero.startDeck];
        this.drawPile = [...this.deck];
        this.shuffle(this.drawPile);
        this.discardPile = [];
        this.hand = [];
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

let G = new GameState();

// --- DOM ELEMENTS ---
const el = {
    floorNum: document.getElementById('floor-num'),
    goldVal: document.getElementById('gold-val'),
    deckCount: document.getElementById('deck-count'),
    killsVal: document.getElementById('kills-val'),
    soundBtn: document.getElementById('sound-btn'),

    playerHpBar: document.getElementById('player-hp-bar'),
    playerHpText: document.getElementById('player-hp-text'),
    playerShieldVal: document.getElementById('player-shield-val'),
    playerShieldBadge: document.getElementById('player-shield-badge'),
    energyCrystals: document.getElementById('energy-crystals'),
    playerHeroName: document.getElementById('player-hero-name'),
    playerCanvas: document.getElementById('player-canvas'),
    playerWrap: document.getElementById('player-wrap'),
    playerDmgAnchor: document.getElementById('player-dmg-anchor'),

    enemyName: document.getElementById('enemy-name'),
    enemyHpBar: document.getElementById('enemy-hp-bar'),
    enemyHpText: document.getElementById('enemy-hp-text'),
    enemyShieldVal: document.getElementById('enemy-shield-val'),
    enemyIntentIcon: document.getElementById('enemy-intent-icon'),
    enemyIntentVal: document.getElementById('enemy-intent-val'),
    enemyCanvas: document.getElementById('enemy-canvas'),
    enemyWrap: document.getElementById('enemy-wrap'),
    enemyDmgAnchor: document.getElementById('enemy-dmg-anchor'),

    cardsHand: document.getElementById('cards-hand'),
    drawCount: document.getElementById('draw-count'),
    discardCount: document.getElementById('discard-count'),
    endTurnBtn: document.getElementById('end-turn-btn'),
    logMessages: document.getElementById('log-messages'),
    turnAnnouncer: document.getElementById('turn-announcer'),

    // Modals
    rewardModal: document.getElementById('reward-modal'),
    rewardCardsContainer: document.getElementById('reward-cards-container'),
    lootGoldText: document.getElementById('loot-gold-text'),
    skipRewardBtn: document.getElementById('skip-reward-btn'),

    restModal: document.getElementById('rest-modal'),
    campHealBtn: document.getElementById('camp-heal-btn'),
    campShopBtn: document.getElementById('camp-shop-btn'),
    shopItemsArea: document.getElementById('shop-items-area'),
    shopCardsList: document.getElementById('shop-cards-list'),
    leaveShopBtn: document.getElementById('leave-shop-btn'),

    gameOverModal: document.getElementById('game-over-modal'),
    gameOverTitle: document.getElementById('game-over-title'),
    gameOverStats: document.getElementById('game-over-stats'),
    restartGameBtn: document.getElementById('restart-game-btn'),

    // Booster Packs
    openPackShopBtn: document.getElementById('open-pack-shop-btn'),
    packsModal: document.getElementById('packs-modal'),
    closePacksBtn: document.getElementById('close-packs-btn'),
    packOpeningStage: document.getElementById('pack-opening-stage'),
    pulledCardsContainer: document.getElementById('pulled-cards-container'),
    collectPulledBtn: document.getElementById('collect-pulled-btn'),
    openingPackAnim: document.getElementById('opening-pack-anim'),

    // Hero Selection Modal
    selectHeroBtn: document.getElementById('select-hero-btn'),
    heroSelectModal: document.getElementById('hero-select-modal'),
    heroesGrid: document.getElementById('heroes-grid'),
    closeHeroSelectBtn: document.getElementById('close-hero-select-btn')
};

// Canvas 2D contexts
const playerCtx = el.playerCanvas.getContext('2d');
const enemyCtx = el.enemyCanvas.getContext('2d');

// --- HELPER LOGGING ---
function addLog(msg) {
    const p = document.createElement('div');
    p.innerHTML = msg;
    el.logMessages.appendChild(p);
    el.logMessages.scrollTop = el.logMessages.scrollHeight;
}

// --- FLOATING TEXT ---
function popText(anchorEl, text, type = 'damage') {
    const span = document.createElement('div');
    span.className = `pop-number ${type}`;
    span.textContent = text;
    anchorEl.appendChild(span);
    setTimeout(() => span.remove(), 900);
}

// --- RENDER COMBATANTS SPRITES ---
function renderSprites() {
    const hero = HERO_CLASSES[G.heroClass] || HERO_CLASSES.knight;
    PixelRenderer.drawPixelSprite(playerCtx, SPRITES[hero.sprite], PALETTES[hero.palette], 4);
    if (G.enemy) {
        PixelRenderer.drawPixelSprite(enemyCtx, SPRITES[G.enemy.sprite], PALETTES[G.enemy.palette], 4);
    }
}

// --- SPAWN ENEMY ---
function spawnEnemyForFloor(floor) {
    let tplIndex = 0;
    if (floor === 1) tplIndex = 0; // Goblin
    else if (floor === 2) tplIndex = 1; // Skeleton
    else if (floor === 3) tplIndex = 2; // Demon
    else if (floor >= 4) tplIndex = 3; // Dragon boss

    const tpl = ENEMY_TEMPLATES[tplIndex] || ENEMY_TEMPLATES[0];
    const hpScale = 1 + (floor - 1) * 0.15;
    const finalHp = Math.round(tpl.maxHp * hpScale);

    G.enemy = {
        name: tpl.name,
        maxHp: finalHp,
        hp: finalHp,
        shield: 0,
        sprite: tpl.sprite,
        palette: tpl.palette,
        goldReward: tpl.goldReward + Math.floor(Math.random() * 5),
        actions: tpl.actions,
        actionIndex: 0,
        nextAction: null,
        poison: 0
    };

    decideEnemyNextAction();
    addLog(`⚔️ Spotykasz przeciwnika: <b style="color:#ffbe76;">${G.enemy.name}</b> (PŻ: ${G.enemy.maxHp})`);
    renderSprites();
}

function decideEnemyNextAction() {
    if (!G.enemy) return;
    const action = G.enemy.actions[G.enemy.actionIndex % G.enemy.actions.length];
    G.enemy.nextAction = action;
    G.enemy.actionIndex++;

    // Update Intent UI
    if (action.type === 'attack') {
        el.enemyIntentIcon.textContent = '🗡️';
        el.enemyIntentVal.textContent = action.val;
    } else if (action.type === 'defend') {
        el.enemyIntentIcon.textContent = '🛡️';
        el.enemyIntentVal.textContent = action.val;
    } else if (action.type === 'shieldAttack') {
        el.enemyIntentIcon.textContent = '⚔️🛡️';
        el.enemyIntentVal.textContent = `${action.attack} / +${action.shield}`;
    }
}

// --- COMBAT MECHANICS ---
function dealDamageToEnemy(state, rawDmg) {
    let dmg = rawDmg;
    if (state.enemy.shield > 0) {
        if (state.enemy.shield >= dmg) {
            state.enemy.shield -= dmg;
            popText(el.enemyDmgAnchor, `-${dmg} (Tarcza)`, 'shield');
            dmg = 0;
        } else {
            dmg -= state.enemy.shield;
            popText(el.enemyDmgAnchor, `Zniszczono tarczę!`, 'shield');
            state.enemy.shield = 0;
        }
    }

    if (dmg > 0) {
        state.enemy.hp = Math.max(0, state.enemy.hp - dmg);
        popText(el.enemyDmgAnchor, `-${dmg}`, 'damage');
        el.enemyCanvas.classList.add('anim-shake');
        setTimeout(() => el.enemyCanvas.classList.remove('anim-shake'), 300);
    }

    updateUI();

    if (state.enemy.hp <= 0) {
        onEnemyDefeated();
    }
}

function addPlayerShield(state, val) {
    state.player.shield += val;
    popText(el.playerDmgAnchor, `+${val} Tarcza`, 'shield');
    updateUI();
}

function healPlayer(state, val) {
    const healReal = Math.min(val, state.player.maxHp - state.player.hp);
    state.player.hp += healReal;
    popText(el.playerDmgAnchor, `+${healReal} PŻ`, 'heal');
    updateUI();
}

function onEnemyDefeated() {
    addLog(`✨ <b style="color:#2ed573;">Pokonałeś ${G.enemy.name}!</b> Zdobyto ${G.enemy.goldReward} 🪙!`);
    audio.playVictory();
    G.gold += G.enemy.goldReward;
    G.kills++;

    // Pasywna Nekromanty: Wampiryzm Duszy
    if (G.heroClass === 'necro') {
        healPlayer(G, 8);
        addLog("💀 <i>Pasywna Nekromanty:</i> Dusza wroga leczy Cię o +8 PŻ!");
    }

    // Boss check or Floor Progression
    setTimeout(() => {
        if (G.floor === 4) {
            showGameOver(true);
        } else {
            showRewardModal();
        }
    }, 600);
}

// --- CARD ACTIONS & DRAWING ---
function drawCards(num) {
    for (let i = 0; i < num; i++) {
        if (G.drawPile.length === 0) {
            if (G.discardPile.length === 0) break; // Brak kart
            G.drawPile = [...G.discardPile];
            G.discardPile = [];
            G.shuffle(G.drawPile);
            addLog("🔄 Przemieszano stos odrzuconych kart do talii dobierania.");
        }
        if (G.drawPile.length > 0) {
            const cardId = G.drawPile.pop();
            G.hand.push(cardId);
            audio.playCardDraw();
        }
    }
    renderHand();
    updateUI();
}

function discardHand() {
    while (G.hand.length > 0) {
        G.discardPile.push(G.hand.pop());
    }
    renderHand();
    updateUI();
}

function playCard(index) {
    if (G.turn !== 'player') return;
    const cardId = G.hand[index];
    const card = CARD_DB[cardId];
    if (!card) return;

    if (G.player.energy < card.cost) {
        addLog("⚠️ Za mało energii, by zagrać tę kartę!");
        audio.playTone(150, 'sawtooth', 0.1, 0.1);
        return;
    }

    // Spend energy
    G.player.energy -= card.cost;
    // Execute effect
    card.effect(G);
    addLog(`🎴 Zagrano: <b>${card.name}</b> (${card.cost} ⚡)`);

    // Pasywna Łotrzyka: Trujący Płaszcz
    if (G.heroClass === 'rogue' && card.type === 'attack' && G.enemy && G.enemy.hp > 0) {
        G.enemy.poison = (G.enemy.poison || 0) + 1;
        addLog("🗡️ <i>Pasywna Łotrzyka:</i> Cios zatruwa cel (+1 Trucizna)!");
    }

    // Remove from hand to discard
    G.hand.splice(index, 1);
    G.discardPile.push(cardId);

    // Character animate
    el.playerCanvas.classList.add('anim-attack-right');
    setTimeout(() => el.playerCanvas.classList.remove('anim-attack-right'), 300);

    renderHand();
    updateUI();
}

// --- TURN LOGIC ---
function startPlayerTurn() {
    G.turn = 'player';
    G.player.energy = G.player.maxEnergy;
    G.player.shield = 0; // Tarcza resetuje się na początku tury
    showTurnBanner("TWOJA TURA");
    drawCards(5);
}

function endPlayerTurn() {
    if (G.turn !== 'player') return;
    G.turn = 'enemy';
    discardHand();
    showTurnBanner("TURA WROGA");

    setTimeout(() => {
        executeEnemyTurn();
    }, 700);
}

function executeEnemyTurn() {
    if (!G.enemy || G.enemy.hp <= 0) return;

    // Obsługa trucizny
    if (G.enemy.poison && G.enemy.poison > 0) {
        const poisonDmg = G.enemy.poison;
        G.enemy.hp = Math.max(0, G.enemy.hp - poisonDmg);
        popText(el.enemyDmgAnchor, `-${poisonDmg} Trucizna`, 'damage');
        addLog(`🧪 Trucizna zadaje ${poisonDmg} obrażeń wrogowi!`);
        G.enemy.poison--;
        updateUI();
        if (G.enemy.hp <= 0) {
            onEnemyDefeated();
            return;
        }
    }

    G.enemy.shield = 0; // Reset tarczy wroga
    const act = G.enemy.nextAction;

    el.enemyCanvas.classList.add('anim-attack-left');
    setTimeout(() => el.enemyCanvas.classList.remove('anim-attack-left'), 300);

    setTimeout(() => {
        if (act.type === 'attack') {
            applyDamageToPlayer(act.val);
            audio.playHurt();
            addLog(`💥 ${G.enemy.name} wykonuje [${act.desc}] zadając ${act.val} obrażeń!`);
        } else if (act.type === 'defend') {
            G.enemy.shield += act.val;
            popText(el.enemyDmgAnchor, `+${act.val} Tarcza`, 'shield');
            audio.playShield();
            addLog(`🛡️ ${G.enemy.name} używa [${act.desc}] i zyskuje ${act.val} Tarczy.`);
        } else if (act.type === 'shieldAttack') {
            applyDamageToPlayer(act.attack);
            G.enemy.shield += act.shield;
            audio.playAttack();
            addLog(`⚔️ ${G.enemy.name} atakuje za ${act.attack} i osłania się tarczą +${act.shield}!`);
        }

        decideEnemyNextAction();
        updateUI();

        // Jeśli gracz przeżył, powrót do gracza
        if (G.player.hp > 0) {
            setTimeout(() => {
                startPlayerTurn();
            }, 600);
        }
    }, 350);
}

function applyDamageToPlayer(rawDmg) {
    let dmg = rawDmg;
    if (G.player.shield > 0) {
        if (G.player.shield >= dmg) {
            G.player.shield -= dmg;
            popText(el.playerDmgAnchor, `-${dmg} (Tarcza)`, 'shield');
            dmg = 0;
        } else {
            dmg -= G.player.shield;
            popText(el.playerDmgAnchor, `Zniszczono tarczę!`, 'shield');
            G.player.shield = 0;
        }
    }

    if (dmg > 0) {
        G.player.hp = Math.max(0, G.player.hp - dmg);
        popText(el.playerDmgAnchor, `-${dmg}`, 'damage');
        el.playerCanvas.classList.add('anim-shake');
        setTimeout(() => el.playerCanvas.classList.remove('anim-shake'), 300);
    }

    updateUI();

    if (G.player.hp <= 0) {
        showGameOver(false);
    }
}

function showTurnBanner(text) {
    el.turnAnnouncer.textContent = text;
    el.turnAnnouncer.classList.add('show');
    setTimeout(() => el.turnAnnouncer.classList.remove('show'), 900);
}

// --- CARD RENDERING (UI) ---
function createCardElement(cardId, onClick, costCheck = true) {
    const card = CARD_DB[cardId];
    const div = document.createElement('div');
    div.className = `pixel-card card-${card.type} rarity-${card.rarity || 'common'}`;
    if (card.isCharacter) {
        div.classList.add('card-hero');
    }

    if (costCheck && G.player.energy < card.cost) {
        div.classList.add('unplayable');
    }

    const heroBadge = card.isCharacter ? `<div class="hero-avatar-tag">👤 ${card.charClass}</div>` : '';

    div.innerHTML = `
        <div class="card-header">
            <span class="card-name">${card.name}</span>
            <div class="card-cost">${card.cost}</div>
        </div>
        ${heroBadge}
        <div class="card-artwork-box">
            <canvas width="64" height="64"></canvas>
        </div>
        <div class="card-description">${card.desc}</div>
        <div class="card-type-tag">${card.isCharacter ? '⭐ BOHATER' : card.type.toUpperCase()}</div>
    `;

    // Render card mini pixel art
    const cardCanvas = div.querySelector('canvas');
    const cCtx = cardCanvas.getContext('2d');
    if (SPRITES[card.sprite]) {
        PixelRenderer.drawPixelSprite(cCtx, SPRITES[card.sprite], PALETTES[card.palette], 4);
    }

    div.addEventListener('click', onClick);
    return div;
}

function renderHand() {
    el.cardsHand.innerHTML = '';
    G.hand.forEach((cardId, idx) => {
        const cardNode = createCardElement(cardId, () => playCard(idx));
        el.cardsHand.appendChild(cardNode);
    });
}

// --- UPDATE HUD UI ---
function updateUI() {
    el.floorNum.textContent = G.floor;
    el.goldVal.textContent = G.gold;
    el.deckCount.textContent = G.deck.length;
    el.killsVal.textContent = G.kills;

    // Player stats
    const heroObj = HERO_CLASSES[G.heroClass] || HERO_CLASSES.knight;
    if (el.playerHeroName) {
        el.playerHeroName.textContent = `${heroObj.name} (${heroObj.title})`;
    }
    const pPct = Math.max(0, (G.player.hp / G.player.maxHp) * 100);
    el.playerHpBar.style.width = `${pPct}%`;
    el.playerHpText.textContent = `${G.player.hp} / ${G.player.maxHp}`;
    el.playerShieldVal.textContent = G.player.shield;
    el.playerShieldBadge.style.opacity = G.player.shield > 0 ? '1' : '0.4';

    // Player Energy Crystals
    el.energyCrystals.innerHTML = '';
    for (let i = 0; i < G.player.maxEnergy; i++) {
        const orb = document.createElement('div');
        orb.className = `energy-orb ${i >= G.player.energy ? 'spent' : ''}`;
        el.energyCrystals.appendChild(orb);
    }

    // Enemy stats
    if (G.enemy) {
        el.enemyName.textContent = G.enemy.name;
        const ePct = Math.max(0, (G.enemy.hp / G.enemy.maxHp) * 100);
        el.enemyHpBar.style.width = `${ePct}%`;
        el.enemyHpText.textContent = `${G.enemy.hp} / ${G.enemy.maxHp}`;
        el.enemyShieldVal.textContent = G.enemy.shield;
        el.enemyShieldBadge.style.opacity = G.enemy.shield > 0 ? '1' : '0.4';
    }

    // Deck counters
    el.drawCount.textContent = G.drawPile.length;
    el.discardCount.textContent = G.discardPile.length;

    // End Turn button state
    el.endTurnBtn.disabled = G.turn !== 'player';
}

// --- MODALS & REWARD FLOW ---
function showRewardModal() {
    el.rewardModal.classList.remove('hidden');
    el.lootGoldText.textContent = `+${G.enemy.goldReward} 🪙`;
    el.rewardCardsContainer.innerHTML = '';

    // Pick 3 random cards
    const pool = ['strike', 'defend', 'fireball', 'quickSlash', 'holyHeal', 'heavyBash', 'poisonDagger', 'fortress'];
    const chosen = [];
    while (chosen.length < 3) {
        const r = pool[Math.floor(Math.random() * pool.length)];
        if (!chosen.includes(r)) chosen.push(r);
    }

    chosen.forEach(cId => {
        const cardElem = createCardElement(cId, () => {
            G.deck.push(cId);
            addLog(`📥 Dodano kartę <b>${CARD_DB[cId].name}</b> do Twojej talii!`);
            closeRewardAndProceed();
        }, false);
        el.rewardCardsContainer.appendChild(cardElem);
    });
}

function closeRewardAndProceed() {
    el.rewardModal.classList.add('hidden');
    // If not boss, show Rest Camp event
    showRestCamp();
}

function showRestCamp() {
    el.restModal.classList.remove('hidden');
    el.shopItemsArea.classList.add('hidden');
}

function proceedToNextFloor() {
    el.restModal.classList.add('hidden');
    G.floor++;
    G.player.shield = 0;
    // Reset deck for new fight
    G.drawPile = [...G.deck];
    G.discardPile = [];
    G.hand = [];
    G.shuffle(G.drawPile);

    spawnEnemyForFloor(G.floor);
    startPlayerTurn();
}

function showGameOver(isVictory) {
    el.gameOverModal.classList.remove('hidden');
    if (isVictory) {
        el.gameOverTitle.textContent = "👑 ZWYCIĘSTWO! POKONAŁEŚ SMOKA! 👑";
        el.gameOverTitle.style.color = "#2ed573";
    } else {
        el.gameOverTitle.textContent = "💀 POLEGŁEŚ W PODZIEMIACH... 💀";
        el.gameOverTitle.style.color = "#ff4757";
    }

    el.gameOverStats.innerHTML = `
        Dotarłeś do Poziomu: <b>${G.floor}</b><br>
        Pokonani Wrogowie: <b>${G.kills}</b><br>
        Zgromadzone Złoto: <b>${G.gold} 🪙</b><br>
        Rozmiar Twojej Talii: <b>${G.deck.length} kart</b>
    `;
}

// --- EVENT LISTENERS ---
el.endTurnBtn.addEventListener('click', () => {
    endPlayerTurn();
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (G.turn === 'player') endPlayerTurn();
    }
});

el.soundBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    el.soundBtn.textContent = audio.enabled ? '🔊 SFX' : '🔇 MUTE';
});

el.skipRewardBtn.addEventListener('click', () => {
    closeRewardAndProceed();
});

// Camp Options
el.campHealBtn.addEventListener('click', () => {
    const healAmount = Math.round(G.player.maxHp * 0.35);
    healPlayer(G, healAmount);
    addLog(`🔥 Wypocząłeś przy ognisku, odzyskując ${healAmount} PŻ!`);
    audio.playMagic();
    setTimeout(proceedToNextFloor, 600);
});

el.campShopBtn.addEventListener('click', () => {
    el.shopItemsArea.classList.remove('hidden');
    renderShopItems();
});

function renderShopItems() {
    el.shopCardsList.innerHTML = '';
    const shopPool = [
        { id: 'holyHeal', price: 35 },
        { id: 'fortress', price: 40 },
        { id: 'poisonDagger', price: 30 }
    ];

    shopPool.forEach(item => {
        const itemWrap = document.createElement('div');
        itemWrap.className = 'shop-item-card';

        const cardNode = createCardElement(item.id, () => {
            if (G.gold >= item.price) {
                G.gold -= item.price;
                G.deck.push(item.id);
                audio.playVictory();
                addLog(`🛒 Kupiono kartę <b>${CARD_DB[item.id].name}</b> za ${item.price} 🪙!`);
                itemWrap.style.opacity = '0.3';
                itemWrap.style.pointerEvents = 'none';
                updateUI();
            } else {
                audio.playHurt();
                addLog("⚠️ Brakuje Ci złota na tę kartę!");
            }
        }, false);

        const priceTag = document.createElement('div');
        priceTag.className = 'shop-price-tag';
        priceTag.textContent = `${item.price} 🪙`;

        itemWrap.appendChild(cardNode);
        itemWrap.appendChild(priceTag);
        el.shopCardsList.appendChild(itemWrap);
    });
}

el.leaveShopBtn.addEventListener('click', () => {
    proceedToNextFloor();
});

el.restartGameBtn.addEventListener('click', () => {
    el.gameOverModal.classList.add('hidden');
    G = new GameState();
    initGame();
});

// ============================================
// BOOSTER PACKS & HERO CARDS OPENING SYSTEM
// ============================================

const PACK_DEFINITIONS = {
    bronze: {
        cost: 20,
        name: "Brązowa Paczka",
        icon: "🥉",
        // Prawdopodobieństwa
        pool: [
            { id: 'strike', weight: 25 },
            { id: 'defend', weight: 25 },
            { id: 'quickSlash', weight: 20 },
            { id: 'heroKnightCard', weight: 15 },
            { id: 'heroRogueCard', weight: 15 }
        ]
    },
    silver: {
        cost: 40,
        name: "Srebrna Paczka",
        icon: "🥈",
        pool: [
            { id: 'fireball', weight: 18 },
            { id: 'holyHeal', weight: 18 },
            { id: 'poisonDagger', weight: 18 },
            { id: 'heroMageCard', weight: 23 },
            { id: 'heroNecroCard', weight: 23 }
        ]
    },
    gold: {
        cost: 65,
        name: "Złota Paczka",
        icon: "🥇",
        pool: [
            { id: 'fortress', weight: 12 },
            { id: 'heavyBash', weight: 12 },
            { id: 'heroKnightCard', weight: 16 },
            { id: 'heroBerserkCard', weight: 20 },
            { id: 'heroPaladinCard', weight: 20 },
            { id: 'heroNecroCard', weight: 20 }
        ]
    }
};

let currentPulledCards = [];

function getRandomCardFromPack(packKey) {
    const pack = PACK_DEFINITIONS[packKey];
    const totalWeight = pack.pool.reduce((sum, item) => sum + item.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const item of pack.pool) {
        if (rand < item.weight) {
            return item.id;
        }
        rand -= item.weight;
    }
    return pack.pool[0].id;
}

function openPack(packKey) {
    const pack = PACK_DEFINITIONS[packKey];
    if (G.gold < pack.cost) {
        audio.playHurt();
        addLog(`⚠️ Masz za mało złota na ${pack.name} (${pack.cost} 🪙)!`);
        return;
    }

    // Deduct gold
    G.gold -= pack.cost;
    updateUI();

    // Pick 3 cards
    currentPulledCards = [];
    for (let i = 0; i < 3; i++) {
        currentPulledCards.push(getRandomCardFromPack(packKey));
    }

    // Start opening presentation
    document.querySelector('.packs-shelf').classList.add('hidden');
    el.packOpeningStage.classList.remove('hidden');
    el.pulledCardsContainer.innerHTML = '';
    el.openingPackAnim.classList.remove('hidden');
    const shakeIcon = el.openingPackAnim.querySelector('.shaking-pack-icon');
    if (shakeIcon) shakeIcon.textContent = pack.icon || '📦';
    el.collectPulledBtn.classList.add('hidden');

    audio.playTone(300, 'sawtooth', 0.2, 0.15);
    setTimeout(() => audio.playTone(450, 'sawtooth', 0.25, 0.18), 300);
    setTimeout(() => audio.playTone(600, 'sawtooth', 0.3, 0.2), 600);

    // After animation reveal cards
    setTimeout(() => {
        el.openingPackAnim.classList.add('hidden');
        audio.playVictory();

        currentPulledCards.forEach(cardId => {
            const cardObj = CARD_DB[cardId];
            const cardEl = createCardElement(cardId, () => {}, false);
            el.pulledCardsContainer.appendChild(cardEl);
            if (cardObj.isCharacter) {
                addLog(`✨ <b>TRAFIONO POSTAĆ:</b> [${cardObj.name}] z klasy ${cardObj.charClass}!`);
            }
        });

        el.collectPulledBtn.classList.remove('hidden');
    }, 1100);
}

// Open pack modal button in top bar
el.openPackShopBtn.addEventListener('click', () => {
    el.packsModal.classList.remove('hidden');
    document.querySelector('.packs-shelf').classList.remove('hidden');
    el.packOpeningStage.classList.add('hidden');
});

// Close pack modal
el.closePacksBtn.addEventListener('click', () => {
    el.packsModal.classList.add('hidden');
});

// Buy buttons inside packs
document.querySelectorAll('.pack-buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const packType = btn.getAttribute('data-pack');
        openPack(packType);
    });
});

document.querySelectorAll('.pack-item').forEach(item => {
    item.addEventListener('click', () => {
        const packType = item.getAttribute('data-pack');
        openPack(packType);
    });
});

// Collect pulled cards button
el.collectPulledBtn.addEventListener('click', () => {
    currentPulledCards.forEach(cardId => {
        G.deck.push(cardId);
    });
    audio.playVictory();
    addLog(`🎉 Dodano ${currentPulledCards.length} nowe karty do Twojej talii!`);
    updateUI();

    // Reset back to shelf
    document.querySelector('.packs-shelf').classList.remove('hidden');
    el.packOpeningStage.classList.add('hidden');
});


// ============================================
// HERO CHARACTER SELECTION SYSTEM
// ============================================

function renderHeroSelectModal() {
    el.heroesGrid.innerHTML = '';
    Object.values(HERO_CLASSES).forEach(hero => {
        const card = document.createElement('div');
        card.className = `hero-card-select ${hero.id === G.heroClass ? 'active' : ''}`;

        const activeTag = hero.id === G.heroClass ? '<div class="hero-active-badge">WYBRANY</div>' : '';

        card.innerHTML = `
            ${activeTag}
            <div class="hero-card-name">${hero.name}</div>
            <div class="hero-card-title">${hero.title}</div>
            <canvas class="hero-preview-canvas" width="64" height="64"></canvas>
            <div class="hero-card-stats">
                <span>❤️ ${hero.maxHp} PŻ</span>
                <span>⚡ ${hero.maxEnergy} En</span>
                <span>🛡️ ${hero.startShield}</span>
            </div>
            <div class="hero-card-passive">
                <b>Pasywna:</b> ${hero.passiveDesc}
            </div>
            <button class="pixel-btn primary-btn hero-pick-btn">
                ${hero.id === G.heroClass ? 'AKTYWNY' : 'WYBIERZ POSTAĆ'}
            </button>
        `;

        // Render preview canvas
        const canvas = card.querySelector('canvas');
        const cCtx = canvas.getContext('2d');
        PixelRenderer.drawPixelSprite(cCtx, SPRITES[hero.sprite], PALETTES[hero.palette], 4);

        // Click to select
        card.addEventListener('click', () => {
            selectHeroCharacter(hero.id);
        });

        el.heroesGrid.appendChild(card);
    });
}

function selectHeroCharacter(heroId) {
    if (G.heroClass === heroId) {
        el.heroSelectModal.classList.add('hidden');
        return;
    }

    const hero = HERO_CLASSES[heroId];
    G.applyHeroClass(heroId);
    audio.playVictory();
    addLog(`🧙 <b>Wybrano postać:</b> ${hero.name} (${hero.title})!`);
    addLog(`✨ <i>Cecha:</i> ${hero.passiveDesc}`);

    // Re-render and restart combat scene
    renderSprites();
    renderHeroSelectModal();
    el.heroSelectModal.classList.add('hidden');

    // Reset deck and redraw hand
    G.drawPile = [...G.deck];
    G.discardPile = [];
    G.hand = [];
    G.shuffle(G.drawPile);
    startPlayerTurn();
    updateUI();
}

// Open Hero Select Modal
el.selectHeroBtn.addEventListener('click', () => {
    renderHeroSelectModal();
    el.heroSelectModal.classList.remove('hidden');
});

// Close Hero Select Modal
el.closeHeroSelectBtn.addEventListener('click', () => {
    el.heroSelectModal.classList.add('hidden');
});


// --- GAME BOOTSTRAP ---
function initGame() {
    addLog("⚔️ Rozpoczynasz wyprawę w mroczne lochy!");
    addLog("💡 Wskazówka: Zagrywaj karty myszką lub kończ turę klawiszem [SPACJA].");
    addLog("🧙 Kliknij [WYBIERZ POSTAĆ], aby zagrać inną klasą bohatera!");
    spawnEnemyForFloor(G.floor);
    startPlayerTurn();
    updateUI();
}

// Start
window.addEventListener('load', () => {
    initGame();
});
