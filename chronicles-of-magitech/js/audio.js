// Dźwięki 8-bit / Chiptune generowane proceduralnie z Web Audio API
window.GameAudio = (function() {
  let ctx = null;
  let muted = false;

  function init() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
  }

  function playTone(freq, type, duration, endFreq = null, volume = 0.15) {
    if (muted) return;
    init();
    if (!ctx || ctx.state === 'suspended') {
      if (ctx) ctx.resume();
      return;
    }

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignorujemy błędy braku interakcji użytkownika
    }
  }

  return {
    init,
    toggleMute() {
      muted = !muted;
      return muted;
    },
    isMuted() {
      return muted;
    },
    // Atak mieczem (szum/świst)
    swordSwing() {
      playTone(320, 'triangle', 0.1, 120, 0.1);
    },
    // Strzał z łuku
    bowShot() {
      playTone(550, 'sawtooth', 0.12, 280, 0.08);
    },
    // Piorun / Magia
    lightning() {
      playTone(800, 'square', 0.22, 160, 0.12);
    },
    // Wystrzał rakiety mecha
    rocketLaunch() {
      playTone(180, 'sawtooth', 0.25, 420, 0.15);
    },
    // Wybuch
    explosion() {
      playTone(120, 'square', 0.35, 40, 0.2);
    },
    // Kosmiczny promień / Ogień
    cosmicBeam() {
      playTone(950, 'sine', 0.3, 300, 0.15);
    },
    // Cios wroga / Obrażenia gracza
    playerHit() {
      playTone(160, 'sawtooth', 0.15, 70, 0.2);
    },
    // Trafienie potwora
    enemyHit() {
      playTone(260, 'square', 0.08, 140, 0.08);
    },
    // Zebranie przedmiotu / Złota
    pickup() {
      playTone(520, 'sine', 0.08, 880, 0.12);
    },
    // Zbadanie technologii w drzewku
    techUnlocked() {
      if (muted) return;
      init();
      [440, 554, 659, 880].forEach((f, i) => {
        setTimeout(() => playTone(f, 'triangle', 0.15, null, 0.12), i * 80);
      });
    },
    // Ukończenie misji / Nowa postać
    questComplete() {
      if (muted) return;
      init();
      [523, 659, 784, 1046].forEach((f, i) => {
        setTimeout(() => playTone(f, 'square', 0.18, null, 0.14), i * 100);
      });
    },
    // Zmiana aktywnej postaci
    heroSwitch() {
      playTone(600, 'sine', 0.1, 900, 0.1);
    }
  };
})();
