// Minigry Rzemieślnicze: Wędkarstwo w Rzece oraz Wydobycie Rudy z Żył Minerałów
window.MiniGames = (function() {
  let oreNodes = [
    { x: 750, y: 1150, hp: 4, type: 'iron', name: 'Żyła Żelaza Runicznego' },
    { x: 420, y: 1350, hp: 4, type: 'gold', name: 'Złote Złoże Eteru' },
    { x: 880, y: 1550, hp: 5, type: 'crystal', name: 'Kryształ Kosmiczny' }
  ];

  function tryMine(heroX, heroY) {
    for (let node of oreNodes) {
      if (node.hp > 0 && Math.hypot(node.x - heroX, node.y - heroY) < 42) {
        node.hp--;
        window.GameAudio.swordSwing();

        if (node.hp <= 0) {
          window.GameAudio.pickup();
          const goldGain = node.type === 'crystal' ? 120 : (node.type === 'gold' ? 80 : 45);
          const sciGain = node.type === 'crystal' ? 60 : 25;
          window.PlayerState.addGold(goldGain);
          window.PlayerState.addScience(sciGain);

          if (Math.random() < 0.4 && window.GemManager) {
            const gems = ['gem_ruby', 'gem_sapphire', 'gem_emerald', 'gem_amethyst'];
            window.GemManager.addGem(gems[Math.floor(Math.random() * gems.length)]);
          }

          if (window.UI) {
            window.UI.showFloatingText(`WYDOBYTO! +${goldGain} 🪙`, node.x, node.y - 20, '#00e5ff');
            window.UI.showNotification(`Rozbito złoże: ${node.name}!`);
          }

          // Odrodzenie złoża po 25 sekundach
          setTimeout(() => { node.hp = 4; }, 25000);
        } else {
          if (window.UI) window.UI.showFloatingText(`KILOF (-1) [${node.hp}]`, node.x, node.y - 15, '#ffd54f');
        }
        return true;
      }
    }
    return false;
  }

  function tryFish(heroX, heroY) {
    // Sprawdzenie czy gracz stoi przy rzece w Hubie (okolice x: 890, y: 300..750)
    if (window.GameMap.getCurrentWorldId() === 'hub' && Math.abs(heroX - 896) < 48 && heroY > 250 && heroY < 750) {
      window.GameAudio.pickup();
      const roll = Math.random();

      if (roll < 0.5) {
        const goldGain = 35 + Math.floor(Math.random() * 40);
        window.PlayerState.addGold(goldGain);
        if (window.UI) window.UI.showFloatingText(`ZŁOWIONO: Mechaniczna Ryba (+${goldGain} 🪙)`, heroX, heroY - 20, '#00e5ff');
      } else if (roll < 0.85) {
        const sciGain = 25 + Math.floor(Math.random() * 30);
        window.PlayerState.addScience(sciGain);
        if (window.UI) window.UI.showFloatingText(`ZŁOWIONO: Rdzeń Złomu (+${sciGain} 🧪)`, heroX, heroY - 20, '#81c784');
      } else {
        // Skarb z rzeki!
        const items = window.GAME_CONFIG.SHOP_ITEMS.filter(i => i.type !== 'consumable');
        const prize = items[Math.floor(Math.random() * items.length)];
        if (prize && window.InventoryManager) window.InventoryManager.addItem(prize);
        if (window.UI) window.UI.showFloatingText(`ZŁOWIONO SKRZYNIE Z RYNSZTUNKIEM!`, heroX, heroY - 20, '#ffd700');
      }
      return true;
    }
    return false;
  }

  function render(ctx, camera) {
    if (window.GameMap.getCurrentWorldId() !== 'hub') return;

    oreNodes.forEach(node => {
      if (node.hp <= 0) return;
      const sx = Math.floor(node.x - camera.x);
      const sy = Math.floor(node.y - camera.y);

      ctx.save();
      ctx.fillStyle = node.type === 'crystal' ? '#e040fb' : (node.type === 'gold' ? '#ffd700' : '#78909c');
      ctx.beginPath();
      ctx.moveTo(sx, sy - 14);
      ctx.lineTo(sx + 12, sy + 10);
      ctx.lineTo(sx - 12, sy + 10);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      ctx.font = '6px "Press Start 2P", monospace, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(`RUDA [E] (${node.hp})`, sx, sy - 18);
      ctx.restore();
    });
  }

  return {
    tryMine,
    tryFish,
    render
  };
})();
