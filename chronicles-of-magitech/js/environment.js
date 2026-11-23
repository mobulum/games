// Menedżer Środowiska: Cykl Dnia i Nocy, Latarnia wokół gracza oraz Dynamiczna Pogoda
window.EnvironmentManager = (function() {
  let timeOfDay = 0.2; // 0.0 - 1.0 (0.0: świt, 0.25: południe, 0.75: noc, 0.9: północ)
  let weather = 'clear'; // 'clear', 'rain', 'storm', 'snow'
  let weatherTimer = 0;
  let lightningStrike = null;

  function init() {
    timeOfDay = 0.25;
    weather = 'clear';
    weatherTimer = 0;
  }

  function update(dt) {
    // Cykl 240 sekund na pełny dzień i noc
    timeOfDay += dt / 240000;
    if (timeOfDay >= 1.0) timeOfDay -= 1.0;

    weatherTimer += dt;
    if (weatherTimer >= 45000) {
      weatherTimer = 0;
      // Losowa zmiana pogody
      const weathers = ['clear', 'rain', 'storm'];
      weather = weathers[Math.floor(Math.random() * weathers.length)];
      if (window.UI) {
        const labels = { clear: 'Słoneczna pogoda', rain: 'Deszcz eteru', storm: 'Burza z piorunami' };
        window.UI.showNotification(`Pogoda: ${labels[weather]}`);
      }
    }

    if (weather === 'storm' && Math.random() < 0.008) {
      // Uderzenie pioruna w losowym punkcie
      const hero = window.HeroManager.getActive();
      if (hero) {
        lightningStrike = {
          x: hero.x + (Math.random() - 0.5) * 500,
          y: hero.y + (Math.random() - 0.5) * 500,
          life: 200
        };
        window.GameAudio.lightning();
      }
    }

    if (lightningStrike) {
      lightningStrike.life -= dt;
      if (lightningStrike.life <= 0) lightningStrike = null;
    }
  }

  function render(ctx, camera, hero) {
    if (!hero) return;

    // Obliczenie ciemności nocy
    // Od 0.6 do 0.95 jest noc
    let nightAlpha = 0;
    if (timeOfDay > 0.55 && timeOfDay < 0.95) {
      nightAlpha = Math.sin((timeOfDay - 0.55) / 0.4 * Math.PI) * 0.75;
    }

    if (nightAlpha > 0.05) {
      ctx.save();
      const hx = Math.floor(hero.x - camera.x);
      const hy = Math.floor(hero.y - camera.y);

      // Maska oświetlenia latarni
      const grad = ctx.createRadialGradient(hx, hy, 40, hx, hy, 180);
      grad.addColorStop(0, 'rgba(0, 0, 15, 0)');
      grad.addColorStop(1, `rgba(0, 0, 15, ${nightAlpha})`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, camera.width, camera.height);
      ctx.restore();
    }

    // Efekty pogody (deszcz/błyskawica)
    if (weather === 'rain' || weather === 'storm') {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 40; i++) {
        const rx = (Date.now() * 0.6 + i * 45) % camera.width;
        const ry = (Date.now() * 0.9 + i * 37) % camera.height;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 4, ry + 12);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Błysk pioruna
    if (lightningStrike) {
      const sx = Math.floor(lightningStrike.x - camera.x);
      const sy = Math.floor(lightningStrike.y - camera.y);
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy - 200);
      ctx.lineTo(sx - 10, sy - 80);
      ctx.lineTo(sx + 15, sy - 40);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.restore();
    }
  }

  function isNight() {
    return timeOfDay > 0.6 && timeOfDay < 0.95;
  }

  return {
    init,
    update,
    render,
    isNight,
    getWeather: () => weather,
    getTimeOfDay: () => timeOfDay
  };
})();
