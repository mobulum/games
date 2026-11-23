// Menedżer Chowańców / Towarzyszy (Pets & Drones)
window.PetManager = (function() {
  let activePet = null;
  let ownedPets = ['drone_bot']; // gracz startuje z dronem
  let petX = 450;
  let petY = 420;
  let lastAction = Date.now();

  function init() {
    activePet = window.GAME_CONFIG.PETS[0]; // Dron domyślny
    petX = 450;
    petY = 420;
  }

  function selectPet(petId) {
    const pet = window.GAME_CONFIG.PETS.find(p => p.id === petId);
    if (!pet) return false;
    if (!ownedPets.includes(petId)) {
      if (window.PlayerState.getGold() < pet.cost) {
        if (window.UI) window.UI.showNotification(`Kupno chowańca wymaga ${pet.cost} 🪙!`);
        return false;
      }
      window.PlayerState.spendGold(pet.cost);
      ownedPets.push(petId);
      window.GameAudio.questComplete();
    }
    activePet = pet;
    window.GameAudio.pickup();
    if (window.UI) {
      window.UI.showNotification(`Aktywny towarzysz: ${pet.name}`);
      window.UI.updatePetsUI();
    }
    return true;
  }

  function update(dt, hero) {
    if (!activePet || !hero) return;

    // Płynne podążanie za graczem
    const targetX = hero.x - 24;
    const targetY = hero.y - 20;
    const dx = targetX - petX;
    const dy = targetY - petY;
    petX += dx * 0.08;
    petY += dy * 0.08;

    const now = Date.now();

    // Działanie Drona Bojowego (atak pociskami)
    if (activePet.id === 'drone_bot' && now - lastAction >= activePet.attackCooldown) {
      const enemies = window.EnemyManager.getNearby(petX, petY, activePet.range);
      if (enemies.length > 0) {
        lastAction = now;
        const target = enemies[0];
        window.GameAudio.bowShot();
        if (window.CombatManager) {
          // Strzał pociskiem drona
          window.CombatManager.spawnEnemyProjectile(petX, petY, target.x, target.y, activePet.atk, '#00e5ff');
          window.EnemyManager.damageEnemy(target.id, activePet.atk, false);
        }
      }
    }

    // Działanie Duszka Mrozu (okresowe leczenie)
    if (activePet.id === 'frost_pixie' && now - lastAction >= activePet.healInterval) {
      lastAction = now;
      const maxHp = window.HeroManager.getMaxHp(hero);
      if (hero.stats.hp < maxHp) {
        hero.stats.hp = Math.min(maxHp, hero.stats.hp + activePet.healAmount);
        if (window.UI) window.UI.showFloatingText(`+${activePet.healAmount} HP (Duszek)`, petX, petY - 15, '#80d8ff');
      }
    }

    // Działanie Goblina Zbieracza (automatyczne przyciąganie rdzeni i złota)
    if (activePet.id === 'gold_goblin') {
      const interactives = window.GameMap.getInteractiveObjects();
      interactives.forEach(obj => {
        if (!obj.collected && Math.hypot(obj.x - hero.x, obj.y - hero.y) < 140) {
          window.QuestManager.collectItem(obj);
        }
      });
    }
  }

  function render(ctx, camera) {
    if (!activePet) return;
    const sx = Math.floor(petX - camera.x);
    const sy = Math.floor(petY - camera.y);

    const bob = Math.sin(Date.now() / 160) * 3;
    const spriteKey = activePet.id === 'drone_bot' ? 'pet_drone' : (activePet.id === 'frost_pixie' ? 'pet_pixie' : 'pet_goblin');
    const sprite = PixelSprites.get(spriteKey);

    ctx.save();
    if (sprite) {
      ctx.drawImage(sprite, sx - 12, sy - 12 + bob, 24, 24);
    }
    // Imię chowańca
    ctx.font = '6px "Press Start 2P", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = activePet.color;
    ctx.fillText(activePet.name, sx, sy - 14 + bob);
    ctx.restore();
  }

  return {
    init,
    selectPet,
    update,
    render,
    getActivePet: () => activePet,
    getOwnedPets: () => ownedPets
  };
})();
