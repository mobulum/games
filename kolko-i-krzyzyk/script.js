// Stan Gry (Game State)
const state = {
    board: Array(9).fill(null),
    currentPlayer: 'X', // 'X' or 'O'
    gameMode: 'pvp',    // 'pvp' or 'ai'
    aiDifficulty: 'hard', // 'easy' or 'hard'
    gameActive: true,
    scores: {
        X: 0,
        O: 0,
        draw: 0
    },
    soundEnabled: true,
    winningLine: null
};

// Kombinacje wygrywające
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Poziomo
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Pionowo
    [0, 4, 8], [2, 4, 6]             // Przekątne
];

// Elementy DOM
const DOM = {
    cells: document.querySelectorAll('.cell'),
    board: document.getElementById('board'),
    statusText: document.getElementById('status-text'),
    scoreX: document.getElementById('score-x'),
    scoreO: document.getElementById('score-o'),
    scoreDraw: document.getElementById('score-draw'),
    labelO: document.getElementById('label-o'),
    btnPvp: document.getElementById('mode-pvp'),
    btnAi: document.getElementById('mode-ai'),
    aiDifficultyContainer: document.getElementById('ai-difficulty-container'),
    aiDifficultySelect: document.getElementById('ai-difficulty'),
    btnRestart: document.getElementById('btn-restart'),
    btnResetScore: document.getElementById('btn-reset-score'),
    btnSound: document.getElementById('btn-sound'),
    soundIcon: document.getElementById('sound-icon'),
    confettiCanvas: document.getElementById('confetti-canvas')
};

// Web Audio API Synthesizer (bez zewnętrznych plików dźwiękowych)
class SoundFx {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playMove(player) {
        if (!state.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const freq = player === 'X' ? 440 : 330;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    playWin() {
        if (!state.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

            gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.08 + 0.2);

            osc.start(this.ctx.currentTime + idx * 0.08);
            osc.stop(this.ctx.currentTime + idx * 0.08 + 0.2);
        });
    }

    playDraw() {
        if (!state.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }
}

const audio = new SoundFx();

// System Konfetti (Confetti Generator)
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animId = null;
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    start() {
        this.resize();
        this.particles = [];
        const colors = ['#38bdf8', '#f43f5e', '#f59e0b', '#10b981', '#a855f7'];

        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12 - 4,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.2,
                opacity: 1
            });
        }

        if (this.animId) cancelAnimationFrame(this.animId);
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let activeParticles = 0;

        this.particles.forEach(p => {
            if (p.opacity <= 0) return;
            activeParticles++;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // Grawitacja
            p.opacity -= 0.015;
            p.rotation += p.vRot;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
        });

        if (activeParticles > 0) {
            this.animId = requestAnimationFrame(() => this.animate());
        }
    }
}

const confetti = new Confetti(DOM.confettiCanvas);

// Ładowanie zapisanych wyników z LocalStorage
function loadSavedScores() {
    const saved = localStorage.getItem('ticTacToeScores');
    if (saved) {
        try {
            state.scores = JSON.parse(saved);
            updateScoreboardUI();
        } catch (e) {
            console.error('Błąd odczytu z localStorage', e);
        }
    }
}

function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(state.scores));
}

function updateScoreboardUI() {
    DOM.scoreX.textContent = state.scores.X;
    DOM.scoreO.textContent = state.scores.O;
    DOM.scoreDraw.textContent = state.scores.draw;
}

// Inicjalizacja Gry
function init() {
    loadSavedScores();

    DOM.cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    DOM.btnPvp.addEventListener('click', () => setGameMode('pvp'));
    DOM.btnAi.addEventListener('click', () => setGameMode('ai'));
    DOM.aiDifficultySelect.addEventListener('change', (e) => {
        state.aiDifficulty = e.target.value;
        restartGame();
    });

    DOM.btnRestart.addEventListener('click', restartGame);
    DOM.btnResetScore.addEventListener('click', resetScores);
    DOM.btnSound.addEventListener('click', toggleSound);

    window.addEventListener('resize', () => confetti.resize());

    restartGame();
}

// Zmiana trybu gry
function setGameMode(mode) {
    if (state.gameMode === mode) return;

    state.gameMode = mode;
    if (mode === 'pvp') {
        DOM.btnPvp.classList.add('active');
        DOM.btnAi.classList.remove('active');
        DOM.aiDifficultyContainer.classList.add('hidden');
        DOM.labelO.textContent = 'Gracz O';
    } else {
        DOM.btnAi.classList.add('active');
        DOM.btnPvp.classList.remove('active');
        DOM.aiDifficultyContainer.classList.remove('hidden');
        DOM.labelO.textContent = 'Komputer';
    }

    restartGame();
}

// Przełącznik dźwięku
function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    DOM.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
    DOM.btnSound.setAttribute('aria-label', state.soundEnabled ? 'Wycisz dźwięk' : 'Włącz dźwięk');
}

// Obsługa kliknięcia pola przez gracza
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'), 10);

    if (state.board[index] !== null || !state.gameActive) {
        return;
    }

    // Ruch Gracza
    makeMove(index, state.currentPlayer);

    // Jeśli gra z komputerem i gra nadal trwa, ruch wykonuje AI
    if (state.gameActive && state.gameMode === 'ai' && state.currentPlayer === 'O') {
        disableBoard(true);
        updateStatusText('Komputer myśli...');

        setTimeout(() => {
            makeAiMove();
            disableBoard(false);
        }, 400);
    }
}

// Włączenie/Wyłączenie klikania w board
function disableBoard(disabled) {
    DOM.cells.forEach(cell => {
        if (disabled) {
            cell.classList.add('disabled');
        } else {
            cell.classList.remove('disabled');
        }
    });
}

// Wykonanie ruchu na planszy
function makeMove(index, player) {
    state.board[index] = player;
    
    // UI pola
    const cell = DOM.cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());

    audio.playMove(player);

    // Sprawdzenie wygranej lub remisu
    const winResult = checkWin(state.board, player);
    if (winResult) {
        handleWin(player, winResult);
        return;
    }

    if (checkDraw(state.board)) {
        handleDraw();
        return;
    }

    // Zmiana tury
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    updateTurnUI();
}

// Aktualizacja paska statusu tury
function updateTurnUI() {
    const playerText = (state.gameMode === 'ai' && state.currentPlayer === 'O') ? 'Komputera' : `gracza ${state.currentPlayer}`;
    const markClass = state.currentPlayer === 'X' ? 'mark-x' : 'mark-o';
    DOM.statusText.innerHTML = `Tura ${playerText} <span class="player-turn ${markClass}">${state.currentPlayer}</span>`;
}

function updateStatusText(text) {
    DOM.statusText.textContent = text;
}

// Obsługa Wygranej
function handleWin(player, winCombination) {
    state.gameActive = false;
    state.scores[player]++;
    saveScores();
    updateScoreboardUI();

    // Podświetlenie wygrywających pól
    winCombination.forEach(idx => {
        DOM.cells[idx].classList.add('winning-cell');
    });

    const winnerName = (state.gameMode === 'ai' && player === 'O') ? 'Komputer' : `Gracz ${player}`;
    const markClass = player === 'X' ? 'mark-x' : 'mark-o';
    DOM.statusText.innerHTML = `🎉 Wygrywa <span class="player-turn ${markClass}">${winnerName}</span>!`;

    audio.playWin();
    confetti.start();
}

// Obsługa Remisu
function handleDraw() {
    state.gameActive = false;
    state.scores.draw++;
    saveScores();
    updateScoreboardUI();

    DOM.statusText.textContent = '🤝 Remis!';
    audio.playDraw();
}

// Sprawdzanie wygranej
function checkWin(board, player) {
    for (let combo of WINNING_COMBINATIONS) {
        if (board[combo[0]] === player && board[combo[1]] === player && board[combo[2]] === player) {
            return combo;
        }
    }
    return null;
}

// Sprawdzanie remisu
function checkDraw(board) {
    return board.every(cell => cell !== null);
}

// Algorytmy AI (Sztuczna Inteligencja)
function makeAiMove() {
    if (!state.gameActive) return;

    let moveIndex;
    if (state.aiDifficulty === 'easy') {
        moveIndex = getRandomMove();
    } else {
        moveIndex = getBestMoveMinimax();
    }

    if (moveIndex !== null && moveIndex !== undefined) {
        makeMove(moveIndex, 'O');
    }
}

// Losowy ruch dla poziomu Łatwego
function getRandomMove() {
    const emptyIndices = state.board
        .map((val, idx) => val === null ? idx : null)
        .filter(val => val !== null);
    
    if (emptyIndices.length === 0) return null;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

// Niezwyciężony Algorytm Minimax dla poziomu Trudnego
function getBestMoveMinimax() {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
        if (state.board[i] === null) {
            state.board[i] = 'O';
            let score = minimax(state.board, 0, false);
            state.board[i] = null;

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(board, 'O')) return 10 - depth;
    if (checkWin(board, 'X')) return depth - 10;
    if (checkDraw(board)) return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                let evaluation = minimax(board, depth + 1, false);
                board[i] = null;
                maxEval = Math.max(maxEval, evaluation);
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = 'X';
                let evaluation = minimax(board, depth + 1, true);
                board[i] = null;
                minEval = Math.min(minEval, evaluation);
            }
        }
        return minEval;
    }
}

// Restart Planszy
function restartGame() {
    state.board = Array(9).fill(null);
    state.currentPlayer = 'X';
    state.gameActive = true;

    DOM.cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });

    updateTurnUI();
}

// Reset Punktacji
function resetScores() {
    state.scores = { X: 0, O: 0, draw: 0 };
    saveScores();
    updateScoreboardUI();
    restartGame();
}

// Uruchomienie aplikacji po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', init);
