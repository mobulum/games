// ==========================================
// KRÓLESTWO CIENI 3D - OTWARTA MAPA ŚWIATA & WIOSKA ELDORII
// ==========================================

// --- AUDIO SYNTHESIZER ---
class MedievalSoundManager {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.warn("AudioContext unsupported");
            }
        }
    }

    playSwordSwing() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    playSwordHit() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
    }

    playCoinPickup() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    playPotionDrink() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    playTeleport() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
    }

    playHurt() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
    }

    playWin() {
        if (!this.ctx) return;
        const notes = [392, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((f, idx) => {
            const time = this.ctx.currentTime + idx * 0.15;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, time);
            gain.gain.setValueAtTime(0.35, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(time);
            osc.stop(time + 0.5);
        });
    }
}

const sounds = new MedievalSoundManager();

// --- GŁÓWNE ZMIENNE ---
let container, scene, camera, renderer;
let minimapCanvas, minimapCtx;
let gameState = 'START'; // START, PLAYING, SHOP, GAMEOVER, VICTORY

let currentDungeon = 0; // 0: Overworld/Wioska, 1: Katakumby, 2: Krypta, 3: Cytadela, 4: Tron Finałowy
const dungeonConfigs = {
    0: { name: "MAPA ŚWIATA: WIOSKA ELDORIA", bg: 0x182c14, isOverworld: true },
    1: { name: "DUNGEON 1: KATAKUMBY POLEGŁYCH", bg: 0x0a0705, wallColor: 0x221a14, floorColor: 0x14100c, keyName: "Rubinowy Klucz", keyColor: 0xff0044 },
    2: { name: "DUNGEON 2: KRYPTA CIENI", bg: 0x050a12, wallColor: 0x142233, floorColor: 0x0c1420, keyName: "Szafirowy Klucz", keyColor: 0x0088ff },
    3: { name: "DUNGEON 3: ŻELAZNA CYTADELA", bg: 0x120505, wallColor: 0x331414, floorColor: 0x200c0c, keyName: "Szmaragdowy Klucz", keyColor: 0x00cc55 },
    4: { name: "FINAL DUNGEON: TRON CZARNOKSIĘŻNIKA", bg: 0x140f05, wallColor: 0x3b2d18, floorColor: 0x241b0e, keyName: "Ołtarz Finałowy", keyColor: 0xffd700 }
};

// Statystyki i Uzbrojenie Rycerza
let playerGroup, playerBody, headMesh, swordMesh, shieldMesh, leftLeg, rightLeg;
let playerPos = new THREE.Vector3(0, 1, 0);
let playerVelocity = new THREE.Vector3();
let playerRotationY = 0;
let isGrounded = true;

let health = 100;
let maxHealth = 100;
let stamina = 100;
let playerGold = 50;
let potionsCount = 1;
let swordDamage = 25;
let moveSpeedMultiplier = 1.0;

let isAttacking = false;
let attackTimer = 0;

// Ekwipunek Kluczy
const keysInventory = { ruby: false, sapphire: false, emerald: false };

// System sterowania
const keys = { w: false, a: false, s: false, d: false, space: false, shift: false, e: false, f: false, q: false };
let cameraAngleX = 0.35;
let cameraAngleY = 0;
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };
let startTime = 0;

// Obiekty Poziomu
let levelGroup = null;
let walls = [];
let dungeonKeyObj = null;
let dungeonGates = [];
let merchantObj = null;
let altarObj = null;
let finalPortalObj = null;
let monsters = [];
let goldCoins = [];
let nearInteractable = null;

// ==========================================
// INICJALIZACJA SILNIKA
// ==========================================
function init() {
    container = document.getElementById('game-container');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    minimapCanvas = document.getElementById('minimap');
    minimapCtx = minimapCanvas.getContext('2d');

    setupLights();
    createKnightPlayer();
    loadZone(0); // Start na Mapie Świata
    setupEvents();
    setupShopEvents();

    requestAnimationFrame(animate);
}

// ==========================================
// OŚWIETLENIE
// ==========================================
let ambientLight, mainLight;
function setupLights() {
    ambientLight = new THREE.AmbientLight(0x554433, 1.2);
    scene.add(ambientLight);

    mainLight = new THREE.DirectionalLight(0xffeedd, 1.3);
    mainLight.position.set(30, 50, 30);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
}

// ==========================================
// MODEL RYCERZA 3D
// ==========================================
function createKnightPlayer() {
    playerGroup = new THREE.Group();

    const armorMat = new THREE.MeshStandardMaterial({ color: 0x99aabb, roughness: 0.3, metalness: 0.8 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.9 });
    const clothMat = new THREE.MeshStandardMaterial({ color: 0x881111, roughness: 0.7 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.1, metalness: 0.95 });

    const torsoGeo = new THREE.BoxGeometry(0.75, 0.9, 0.45);
    playerBody = new THREE.Mesh(torsoGeo, armorMat);
    playerBody.position.y = 1.35;
    playerBody.castShadow = true;
    playerGroup.add(playerBody);

    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.5, 0.48), goldMat);
    chestPlate.position.set(0, 0.1, 0);
    playerBody.add(chestPlate);

    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 0.1), clothMat);
    cape.position.set(0, -0.1, -0.26);
    playerBody.add(cape);

    const helm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.45, 12), armorMat);
    helm.position.set(0, 0.7, 0);
    helm.castShadow = true;
    playerBody.add(helm);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.28), goldMat);
    visor.position.set(0, 0.05, 0.08);
    helm.add(visor);

    // Prawa Ręka + Miecz
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.5, 0.1, 0);
    playerBody.add(rightArmGroup);

    const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), armorMat);
    rightArmMesh.position.y = -0.2;
    rightArmGroup.add(rightArmMesh);

    swordMesh = new THREE.Group();
    const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.08), goldMat);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.3, 0.03), steelMat);
    blade.position.y = 0.65;
    swordMesh.add(hilt);
    swordMesh.add(blade);
    swordMesh.position.set(0.15, -0.4, 0.2);
    swordMesh.rotation.x = Math.PI / 3;
    rightArmGroup.add(swordMesh);

    // Lewa Ręka + Tarcza
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.5, 0.1, 0);
    playerBody.add(leftArmGroup);

    const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), armorMat);
    leftArmMesh.position.y = -0.2;
    leftArmGroup.add(leftArmMesh);

    shieldMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.08), goldMat);
    shieldMesh.position.set(-0.15, -0.2, 0.15);
    shieldMesh.rotation.y = Math.PI / 6;
    leftArmGroup.add(shieldMesh);

    // Nogi
    const legGeo = new THREE.BoxGeometry(0.28, 0.8, 0.28);
    leftLeg = new THREE.Mesh(legGeo, armorMat);
    leftLeg.position.set(-0.2, -0.85, 0);
    leftLeg.castShadow = true;
    playerGroup.add(leftLeg);

    rightLeg = new THREE.Mesh(legGeo, armorMat);
    rightLeg.position.set(0.2, -0.85, 0);
    rightLeg.castShadow = true;
    playerGroup.add(rightLeg);

    playerGroup.position.copy(playerPos);
    scene.add(playerGroup);
}

// ==========================================
// ŁADOWANIE LOKACJI (0: OVERWORLD, 1-4: DUNGEONY)
// ==========================================
function loadZone(zoneId) {
    currentDungeon = zoneId;
    const cfg = dungeonConfigs[zoneId];

    scene.background = new THREE.Color(cfg.bg);
    scene.fog = new THREE.FogExp2(cfg.bg, zoneId === 0 ? 0.012 : 0.025);

    if (levelGroup) scene.remove(levelGroup);
    levelGroup = new THREE.Group();
    scene.add(levelGroup);

    walls = [];
    monsters = [];
    goldCoins = [];
    dungeonGates = [];
    dungeonKeyObj = null;
    merchantObj = null;
    altarObj = null;
    finalPortalObj = null;

    document.getElementById('dungeon-name').textContent = cfg.name;

    if (zoneId === 0) {
        // --- OVERWORLD MAPA ŚWIATA 3D ---
        buildOverworldMap();
        playerPos.set(0, 1, 0);
    } else {
        // --- LOCHY (DUNGEONS 1-4) ---
        buildDungeonLevel(zoneId);
        playerPos.set(0, 1, 10);
    }

    playerGroup.position.copy(playerPos);
    updateHUDStats();
}

// ==========================================
// BUDOWA MAPY ŚWIATA 3D (OVERWORLD & WIOSKA)
// ==========================================
function buildOverworldMap() {
    document.getElementById('dungeon-objective').textContent = "● Zwiedzaj świat, ulepszaj ekwipunek w wiosce i podbijaj Dungeony";

    // Trawnik
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x2e5a1e, roughness: 0.9 });
    const terrain = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), grassMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    levelGroup.add(terrain);

    // Drzewa i Skały wokół mapy
    buildNaturalScenery();

    // Wioska Eldoria (Środek Mapy)
    buildVillageCenter();

    // 4 Bramy do Lochów na krańcach Mapy Świata
    createDungeonGate(-50, -50, 1, "💀 Katakumby Poległych (Dungeon 1)", 0xff0044);
    createDungeonGate(50, -50, 2, "❄️ Krypta Cieni (Dungeon 2)", 0x0088ff);
    createDungeonGate(-50, 50, 3, "🌋 Żelazna Cytadela (Dungeon 3)", 0x00cc55);
    createDungeonGate(50, 50, 4, "👑 Tron Czarnoksiężnika (Final)", 0xffd700);
}

function buildVillageCenter() {
    const houseMat = new THREE.MeshStandardMaterial({ color: 0x4a3423, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x772211, roughness: 0.6 });

    // Chatki wiejskie
    const houses = [
        { x: -15, z: -15 }, { x: 15, z: -15 }, { x: -18, z: 10 }
    ];

    houses.forEach(h => {
        const body = new THREE.Mesh(new THREE.BoxGeometry(7, 5, 7), houseMat);
        body.position.set(h.x, 2.5, h.z);
        body.castShadow = true;
        levelGroup.add(body);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(5.5, 3.5, 4), roofMat);
        roof.position.set(h.x, 6.25, h.z);
        roof.rotation.y = Math.PI / 4;
        levelGroup.add(roof);

        body.geometry.computeBoundingBox();
        walls.push(new THREE.Box3().setFromObject(body));
    });

    // Studnia na rynku
    const well = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 1.2, 12), new THREE.MeshStandardMaterial({ color: 0x666666 }));
    well.position.set(0, 0.6, -10);
    levelGroup.add(well);
    walls.push(new THREE.Box3().setFromObject(well));

    // Stragan Handlarza (Merchant NPC)
    const stall = new THREE.Mesh(new THREE.BoxGeometry(4, 1.2, 2), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
    stall.position.set(0, 0.6, 12);
    levelGroup.add(stall);

    // Kupiec NPC
    const merchantGroup = new THREE.Group();
    const merchantBody = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.6), new THREE.MeshStandardMaterial({ color: 0x228833 }));
    merchantBody.position.y = 0.8;
    merchantGroup.add(merchantBody);

    const merchantHead = new THREE.Mesh(new THREE.SphereGeometry(0.35), new THREE.MeshStandardMaterial({ color: 0xffccaa }));
    merchantHead.position.y = 1.8;
    merchantGroup.add(merchantHead);

    // Świecąca aura Kupca
    const light = new THREE.PointLight(0xffd700, 2, 8);
    light.position.set(0, 2.2, 0);
    merchantGroup.add(light);

    merchantGroup.position.set(0, 0, 14);
    levelGroup.add(merchantGroup);

    merchantObj = { pos: new THREE.Vector3(0, 0, 14), radius: 3.5 };
}

function buildNaturalScenery() {
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817 });
    const treeLeavesMat = new THREE.MeshStandardMaterial({ color: 0x1b4012 });

    for (let i = 0; i < 40; i++) {
        const x = (Math.random() - 0.5) * 160;
        const z = (Math.random() - 0.5) * 160;
        if (Math.hypot(x, z) < 25) continue; // Omiń wioskę

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 3), treeTrunkMat);
        trunk.position.set(x, 1.5, z);
        levelGroup.add(trunk);

        const leaves = new THREE.Mesh(new THREE.ConeGeometry(2.5, 5, 8), treeLeavesMat);
        leaves.position.set(x, 4.5, z);
        levelGroup.add(leaves);

        walls.push(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(x, 2, z), new THREE.Vector3(1.2, 4, 1.2)));
    }
}

function createDungeonGate(x, z, targetDungeon, name, colorHex) {
    const archMat = new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.5 });
    const arch = new THREE.Mesh(new THREE.BoxGeometry(6, 7, 2), archMat);
    arch.position.set(x, 3.5, z);
    levelGroup.add(arch);

    const portal = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 5, 16), new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.5 }));
    portal.rotation.x = Math.PI / 2;
    portal.position.set(x, 3, z);
    levelGroup.add(portal);

    const light = new THREE.PointLight(colorHex, 2.5, 12);
    light.position.set(x, 3, z);
    levelGroup.add(light);

    arch.geometry.computeBoundingBox();
    walls.push(new THREE.Box3().setFromObject(arch));

    dungeonGates.push({
        pos: new THREE.Vector3(x, 0, z),
        radius: 4.0,
        targetDungeon: targetDungeon,
        name: name
    });
}

// ==========================================
// BUDOWA LOCHÓW (DUNGEONS 1-4)
// ==========================================
function buildDungeonLevel(dungeonId) {
    const cfg = dungeonConfigs[dungeonId];
    document.getElementById('dungeon-objective').textContent = dungeonId < 4 
        ? `● Odnajdź ${cfg.keyName} i portale przejściowe`
        : `● Użyj 3 Kluczy na Ołtarzu Finałowym`;

    const floorMat = new THREE.MeshStandardMaterial({ color: cfg.floorColor, roughness: 0.9 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    levelGroup.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: cfg.wallColor, roughness: 0.8 });

    const layout = [
        { x: 0, z: -50, w: 100, h: 7, d: 2 },
        { x: 0, z: 50, w: 100, h: 7, d: 2 },
        { x: -50, z: 0, w: 2, h: 7, d: 100 },
        { x: 50, z: 0, w: 2, h: 7, d: 100 },
        { x: -20, z: -10, w: 30, h: 6, d: 2 },
        { x: 20, z: -10, w: 30, h: 6, d: 2 },
        { x: -15, z: 20, w: 2, h: 6, d: 35 },
        { x: 15, z: 20, w: 2, h: 6, d: 35 }
    ];

    layout.forEach(d => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(d.w, d.h, d.d), wallMat);
        mesh.position.set(d.x, d.h / 2, d.z);
        levelGroup.add(mesh);

        mesh.geometry.computeBoundingBox();
        walls.push(new THREE.Box3().setFromObject(mesh));
    });

    // Portal powrotny na Mapę Świata
    createDungeonGate(0, 20, 0, "🗺️ Powrót na Mapę Świata", 0xffffff);

    if (dungeonId === 1) {
        createKey(-35, 1.5, -35, "ruby", "Rubinowy Klucz", cfg.keyColor);
        spawnMonsters(4);
    } else if (dungeonId === 2) {
        createKey(35, 1.5, -35, "sapphire", "Szafirowy Klucz", cfg.keyColor);
        spawnMonsters(5);
    } else if (dungeonId === 3) {
        createKey(-35, 1.5, 35, "emerald", "Szmaragdowy Klucz", cfg.keyColor);
        spawnMonsters(6);
    } else if (dungeonId === 4) {
        createFinalAltar(0, -20);
        spawnMonsters(7);
    }
}

function createKey(x, y, z, keyType, name, colorHex) {
    if (keysInventory[keyType]) return;

    const group = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.7), new THREE.MeshStandardMaterial({
        color: colorHex, emissive: colorHex, emissiveIntensity: 0.8
    }));
    group.add(mesh);
    group.position.set(x, y, z);
    levelGroup.add(group);

    dungeonKeyObj = { group: group, mesh: mesh, pos: new THREE.Vector3(x, y, z), type: keyType, name: name, collected: false };
}

function createFinalAltar(x, z) {
    const altar = new THREE.Mesh(new THREE.CylinderGeometry(3, 3.5, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0xd4af37 }));
    altar.position.set(x, 0.6, z);
    levelGroup.add(altar);

    const portalMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    finalPortalObj = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 10, 32, 1, true), portalMat);
    finalPortalObj.position.set(x, 5.6, z);
    finalPortalObj.visible = false;
    levelGroup.add(finalPortalObj);

    altarObj = { pos: new THREE.Vector3(x, 0, z), radius: 3.5, activated: false };
}

function spawnMonsters(count) {
    const monsterMat = new THREE.MeshStandardMaterial({ color: 0x440000 });
    for (let i = 0; i < count; i++) {
        const group = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.6, 0.6), monsterMat);
        body.position.y = 0.8;
        group.add(body);

        const x = (Math.random() - 0.5) * 60;
        const z = (Math.random() - 0.5) * 60;
        group.position.set(x, 0, z);
        levelGroup.add(group);

        monsters.push({ group: group, pos: group.position, hp: 40, speed: 3.5 + Math.random() });
    }
}

function spawnGoldCoin(x, z) {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 12), new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffaa00 }));
    coin.rotation.x = Math.PI / 2;
    coin.position.set(x, 0.5, z);
    levelGroup.add(coin);

    goldCoins.push({ mesh: coin, pos: new THREE.Vector3(x, 0.5, z), collected: false });
}

// ==========================================
// EVENTY KLAWIATURY & INTERFEJSU SKLEPU
// ==========================================
function setupEvents() {
    window.addEventListener('resize', onWindowResize);

    const setKey = (val, e) => {
        const k = (e.key || '').toLowerCase();
        const code = (e.code || '').toLowerCase();

        if (gameState === 'START' && val === true) startGame();

        if (k === 'w' || k === 'arrowup' || code === 'keyw' || code === 'arrowup') keys.w = val;
        if (k === 's' || k === 'arrowdown' || code === 'keys' || code === 'arrowdown') keys.s = val;
        if (k === 'a' || k === 'arrowleft' || code === 'keya' || code === 'arrowleft') keys.a = val;
        if (k === 'd' || k === 'arrowright' || code === 'keyd' || code === 'arrowright') keys.d = val;
        if (k === ' ' || k === 'space' || code === 'space') keys.space = val;
        if (k === 'shift' || code === 'shiftleft' || code === 'shiftright') keys.shift = val;
        if (k === 'e' || code === 'keye') {
            keys.e = val;
            if (val === true) handleInteraction();
        }
        if (k === 'f' || code === 'keyf') {
            keys.f = val;
            if (val === true) performSwordAttack();
        }
        if (k === 'q' || k === '1' || code === 'keyq' || code === 'digit1') {
            keys.q = val;
            if (val === true) drinkPotion();
        }
    };

    window.addEventListener('keydown', (e) => setKey(true, e));
    window.addEventListener('keyup', (e) => setKey(false, e));

    window.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };

        if (gameState === 'START') startGame();
        else if (gameState === 'PLAYING') performSwordAttack();
    });

    window.addEventListener('mouseup', () => { isMouseDown = false; });

    window.addEventListener('mousemove', (e) => {
        if (gameState !== 'PLAYING') return;

        if (isMouseDown || e.buttons === 1) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            cameraAngleY -= deltaX * 0.005;
            cameraAngleX += deltaY * 0.003;
            cameraAngleX = Math.max(0.05, Math.min(Math.PI / 2.5, cameraAngleX));
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('victory-restart-btn').addEventListener('click', restartGame);
}

function setupShopEvents() {
    document.getElementById('buy-potion-btn').addEventListener('click', () => buyItem('potion', 25));
    document.getElementById('buy-stamina-btn').addEventListener('click', () => buyItem('stamina', 20));
    document.getElementById('buy-sword-btn').addEventListener('click', () => buyItem('sword', 100));
    document.getElementById('buy-armor-btn').addEventListener('click', () => buyItem('armor', 150));
    document.getElementById('buy-boots-btn').addEventListener('click', () => buyItem('boots', 80));
    document.getElementById('close-shop-btn').addEventListener('click', closeShop);
}

function buyItem(itemType, cost) {
    if (playerGold < cost) {
        showNotification("Brak wystarczającej ilości złota!");
        return;
    }

    playerGold -= cost;

    if (itemType === 'potion') {
        potionsCount++;
        showNotification("Zakupiono Miksturę Leczniczą (+50 HP)!");
    } else if (itemType === 'stamina') {
        stamina = 100;
        showNotification("Energia została odnowiona!");
    } else if (itemType === 'sword') {
        swordDamage = 50;
        showNotification("Zakupiono Stalowy Miecz Gryfa! (Obrażenia: 50 HP)");
    } else if (itemType === 'armor') {
        maxHealth = 160;
        health = 160;
        showNotification("Zakupiono Zbroję Gryfa! (Max Zdrowie: 160 HP)");
    } else if (itemType === 'boots') {
        moveSpeedMultiplier = 1.3;
        showNotification("Zakupiono Buty Szybkości! (+30% prędkości)");
    }

    updateHUDStats();
    document.getElementById('shop-user-gold').textContent = playerGold;
}

function openShop() {
    gameState = 'SHOP';
    document.getElementById('shop-user-gold').textContent = playerGold;
    document.getElementById('shop-modal').classList.remove('hidden');
}

function closeShop() {
    document.getElementById('shop-modal').classList.add('hidden');
    gameState = 'PLAYING';
}

function drinkPotion() {
    if (potionsCount <= 0) {
        showNotification("Nie masz żadnych mikstur! Kup je u Handlarza.");
        return;
    }

    if (health >= maxHealth) {
        showNotification("Masz już pełne zdrowie!");
        return;
    }

    potionsCount--;
    health = Math.min(maxHealth, health + 50);
    sounds.playPotionDrink();
    updateHUDStats();
    showNotification("Wypiłeś Miksturę! Odzyskano +50 HP.");
}

function updateHUDStats() {
    document.getElementById('gold-count').textContent = playerGold;
    document.getElementById('potion-count').textContent = potionsCount;
    document.getElementById('health-bar').style.width = (health / maxHealth * 100) + '%';
    document.getElementById('stamina-bar').style.width = stamina + '%';
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function startGame() {
    sounds.init();
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    gameState = 'PLAYING';
    startTime = Date.now();
    showNotification("Witaj na Mapie Świata! Zwiedzaj Wioskę i Dungeony.");
}

function restartGame() {
    health = 100;
    maxHealth = 100;
    stamina = 100;
    playerGold = 50;
    potionsCount = 1;
    swordDamage = 25;
    moveSpeedMultiplier = 1.0;

    keysInventory.ruby = false;
    keysInventory.sapphire = false;
    keysInventory.emerald = false;

    document.getElementById('key-ruby').classList.remove('acquired');
    document.getElementById('key-sapphire').classList.remove('acquired');
    document.getElementById('key-emerald').classList.remove('acquired');

    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.add('hidden');

    loadZone(0);
    gameState = 'PLAYING';
    startTime = Date.now();
}

function performSwordAttack() {
    if (isAttacking || gameState !== 'PLAYING') return;

    isAttacking = true;
    attackTimer = 0.35;
    sounds.playSwordSwing();

    monsters.forEach(m => {
        const dist = playerPos.distanceTo(m.pos);
        if (dist < 3.2) {
            m.hp -= swordDamage;
            sounds.playSwordHit();

            const pushDir = new THREE.Vector3().subVectors(m.pos, playerPos).normalize();
            m.pos.addScaledVector(pushDir, 1.5);

            if (m.hp <= 0) {
                levelGroup.remove(m.group);
                spawnGoldCoin(m.pos.x, m.pos.z);
                showNotification("Potwór został pokonany! Zostawił złoto.");
            }
        }
    });

    monsters = monsters.filter(m => m.hp > 0);
}

function handleInteraction() {
    if (gameState !== 'PLAYING' || !nearInteractable) return;

    if (nearInteractable.type === 'gate') {
        sounds.playTeleport();
        showNotification(`Wkraczasz do: ${nearInteractable.object.name}!`);
        loadZone(nearInteractable.object.targetDungeon);
    } else if (nearInteractable.type === 'merchant') {
        openShop();
    } else if (nearInteractable.type === 'key') {
        const k = nearInteractable.object;
        if (!k.collected) {
            k.collected = true;
            k.group.visible = false;
            keysInventory[k.type] = true;
            sounds.playCoinPickup();
            document.getElementById(`key-${k.type}`).classList.add('acquired');
            showNotification(`Zdobyłeś ${k.name}!`);
        }
    } else if (nearInteractable.type === 'altar') {
        if (keysInventory.ruby && keysInventory.sapphire && keysInventory.emerald) {
            altarObj.activated = true;
            finalPortalObj.visible = true;
            sounds.playWin();
            showNotification("Relikwie połączone! Otwarto Portal Zwycięstwa! Wejdź w portal!");
        } else {
            showNotification("Ołtarz wymaga 3 Kluczy (Rubin, Szafir, Szmaragd)!");
        }
    } else if (nearInteractable.type === 'final_win') {
        triggerVictory();
    }
}

function showNotification(text) {
    const banner = document.getElementById('notification-banner');
    banner.textContent = text;
    banner.classList.add('active');
    setTimeout(() => { banner.classList.remove('active'); }, 3500);
}

let clock = new THREE.Clock();

function updatePlayer(dt) {
    if (gameState !== 'PLAYING') return;

    let moveSpeed = (keys.shift && stamina > 5 ? 11 : 6) * moveSpeedMultiplier;

    if (keys.shift && (keys.w || keys.a || keys.s || keys.d) && stamina > 0) {
        stamina = Math.max(0, stamina - dt * 25);
    } else {
        stamina = Math.min(100, stamina + dt * 15);
    }
    updateHUDStats();

    if (isAttacking) {
        attackTimer -= dt;
        swordMesh.rotation.z = Math.sin((0.35 - attackTimer) * 10) * 1.5;
        if (attackTimer <= 0) {
            isAttacking = false;
            swordMesh.rotation.z = 0;
        }
    }

    let moveDir = new THREE.Vector3();
    if (keys.w) moveDir.z += 1;
    if (keys.s) moveDir.z -= 1;
    if (keys.a) moveDir.x += 1;
    if (keys.d) moveDir.x -= 1;

    if (moveDir.lengthSq() > 0) {
        moveDir.normalize();

        const inputAngle = Math.atan2(moveDir.x, moveDir.z);
        playerRotationY = THREE.MathUtils.lerp(playerRotationY, cameraAngleY + inputAngle, 0.2);
        playerGroup.rotation.y = playerRotationY;

        const moveX = Math.sin(playerRotationY) * moveSpeed * dt;
        const moveZ = Math.cos(playerRotationY) * moveSpeed * dt;
        const radius = 0.5;

        const testX = playerPos.clone();
        testX.x += moveX;
        const bboxX = new THREE.Box3().setFromCenterAndSize(testX, new THREE.Vector3(radius * 2, 1.8, radius * 2));
        let collideX = false;
        for (let wall of walls) {
            if (bboxX.intersectsBox(wall)) { collideX = true; break; }
        }
        if (!collideX) playerPos.x = testX.x;

        const testZ = playerPos.clone();
        testZ.z += moveZ;
        const bboxZ = new THREE.Box3().setFromCenterAndSize(testZ, new THREE.Vector3(radius * 2, 1.8, radius * 2));
        let collideZ = false;
        for (let wall of walls) {
            if (bboxZ.intersectsBox(wall)) { collideZ = true; break; }
        }
        if (!collideZ) playerPos.z = testZ.z;

        const walkTime = Date.now() * 0.01 * (moveSpeed / 6);
        leftLeg.rotation.x = Math.sin(walkTime) * 0.6;
        rightLeg.rotation.x = -Math.sin(walkTime) * 0.6;
    } else {
        leftLeg.rotation.x = 0;
        rightLeg.rotation.x = 0;
    }

    if (keys.space && isGrounded) {
        playerVelocity.y = 8;
        isGrounded = false;
    }

    if (!isGrounded) {
        playerVelocity.y -= 22 * dt;
    }

    playerPos.y += playerVelocity.y * dt;

    if (playerPos.y <= 1.0) {
        playerPos.y = 1.0;
        playerVelocity.y = 0;
        isGrounded = true;
    }

    playerGroup.position.copy(playerPos);

    const camDist = 7;
    camera.position.x = playerPos.x - Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * camDist;
    camera.position.y = playerPos.y + Math.sin(cameraAngleX) * camDist + 1.5;
    camera.position.z = playerPos.z - Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * camDist;
    camera.lookAt(playerPos.x, playerPos.y + 1.5, playerPos.z);
}

function updateObjects(dt) {
    if (gameState !== 'PLAYING') return;

    nearInteractable = null;
    const prompt = document.getElementById('interaction-prompt');

    // Bramy do lochów
    dungeonGates.forEach(g => {
        if (playerPos.distanceTo(g.pos) < g.radius) {
            nearInteractable = { type: 'gate', object: g };
        }
    });

    // Kupiec
    if (merchantObj && playerPos.distanceTo(merchantObj.pos) < merchantObj.radius) {
        nearInteractable = { type: 'merchant', object: merchantObj };
    }

    // Klucz
    if (dungeonKeyObj && !dungeonKeyObj.collected) {
        dungeonKeyObj.mesh.rotation.y += dt * 2.0;
        if (playerPos.distanceTo(dungeonKeyObj.pos) < 2.5) {
            nearInteractable = { type: 'key', object: dungeonKeyObj };
        }
    }

    // Zbieranie Złota
    goldCoins.forEach(c => {
        if (!c.collected) {
            c.mesh.rotation.z += dt * 3.0;
            if (playerPos.distanceTo(c.pos) < 2.0) {
                c.collected = true;
                levelGroup.remove(c.mesh);
                playerGold += 15;
                sounds.playCoinPickup();
                updateHUDStats();
                showNotification("Podniosłeś Złote Monety (+15 Złota)!");
            }
        }
    });

    // Ołtarz finałowy
    if (altarObj && playerPos.distanceTo(altarObj.pos) < altarObj.radius) {
        nearInteractable = altarObj.activated ? { type: 'final_win', object: altarObj } : { type: 'altar', object: altarObj };
    }

    if (nearInteractable) prompt.classList.remove('hidden');
    else prompt.classList.add('hidden');

    // Potwory AI
    monsters.forEach(m => {
        const dir = new THREE.Vector3().subVectors(playerPos, m.pos);
        const dist = dir.length();

        if (dist > 1.2 && dist < 22) {
            dir.normalize();
            m.pos.addScaledVector(dir, m.speed * dt);
            m.group.lookAt(playerPos.x, m.pos.y, playerPos.z);
        }

        if (dist < 1.8) {
            health = Math.max(0, health - dt * 22);
            updateHUDStats();
            sounds.playHurt();

            if (health <= 0) {
                triggerGameOver("Rycerz uległ potworom!");
            }
        }
    });
}

function drawMinimap() {
    minimapCtx.clearRect(0, 0, 130, 130);

    const cx = 65;
    const cy = 65;
    const scale = currentDungeon === 0 ? 0.7 : 1.3;

    // Rycerz
    minimapCtx.fillStyle = '#ffd700';
    minimapCtx.beginPath();
    minimapCtx.arc(cx, cy, 4, 0, Math.PI * 2);
    minimapCtx.fill();

    // Kupiec (Zielona kropka)
    if (merchantObj) {
        const mx = cx + (merchantObj.pos.x - playerPos.x) * scale;
        const my = cy + (merchantObj.pos.z - playerPos.z) * scale;
        if (Math.hypot(mx - cx, my - cy) < 60) {
            minimapCtx.fillStyle = '#00ff66';
            minimapCtx.beginPath();
            minimapCtx.arc(mx, my, 4, 0, Math.PI * 2);
            minimapCtx.fill();
        }
    }

    // Bramy (Niebieskie kropki)
    dungeonGates.forEach(g => {
        const gx = cx + (g.pos.x - playerPos.x) * scale;
        const gy = cy + (g.pos.z - playerPos.z) * scale;
        if (Math.hypot(gx - cx, gy - cy) < 60) {
            minimapCtx.fillStyle = '#0088ff';
            minimapCtx.beginPath();
            minimapCtx.arc(gx, gy, 4, 0, Math.PI * 2);
            minimapCtx.fill();
        }
    });

    // Potwory (Czerwone kropki)
    monsters.forEach(m => {
        const mx = cx + (m.pos.x - playerPos.x) * scale;
        const my = cy + (m.pos.z - playerPos.z) * scale;
        if (Math.hypot(mx - cx, my - cy) < 60) {
            minimapCtx.fillStyle = '#ff0033';
            minimapCtx.beginPath();
            minimapCtx.arc(mx, my, 3, 0, Math.PI * 2);
            minimapCtx.fill();
        }
    });
}

function triggerGameOver(reason) {
    gameState = 'GAMEOVER';
    document.getElementById('gameover-reason').textContent = reason;
    document.getElementById('gameover-screen').classList.remove('hidden');
}

function triggerVictory() {
    gameState = 'VICTORY';
    sounds.playWin();

    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');

    document.getElementById('final-time').textContent = `${mins}:${secs}`;
    document.getElementById('final-health').textContent = `${Math.round(health)}%`;
    document.getElementById('victory-screen').classList.remove('hidden');
}

function animate() {
    requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 0.1);

    updatePlayer(dt);
    updateObjects(dt);

    if (gameState === 'PLAYING') {
        drawMinimap();
    }

    renderer.render(scene, camera);
}

window.addEventListener('DOMContentLoaded', init);
