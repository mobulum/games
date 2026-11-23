// Inicjalizacja Wszystkich 10 Modułów Gry
window.addEventListener('DOMContentLoaded', () => {
  window.GameAudio.init();
  window.GameMap.init('hub');
  window.HeroManager.init();
  window.EnemyManager.init();
  window.CombatManager.init();
  window.InventoryManager.init();
  window.TownManager.init();
  window.PetManager.init();
  window.TalentManager.init();
  window.MountManager.init();
  window.ArenaManager.init();
  window.BountyManager.init();
  window.EnvironmentManager.init();
  window.QuestManager.init();
  window.TechTree.init();
  window.PlayerState.init();
  window.UI.init();
  window.GameEngine.init('gameCanvas');

  // Wstępny ekwipunek
  if (window.InventoryManager.getBackpack().length === 0 && !window.InventoryManager.getEquipped().weapon) {
    const starterSword = window.GAME_CONFIG.SHOP_ITEMS.find(i => i.id === 'sword_iron');
    const starterArmor = window.GAME_CONFIG.SHOP_ITEMS.find(i => i.id === 'armor_leather');
    if (starterSword) window.InventoryManager.addItem(starterSword);
    if (starterArmor) window.InventoryManager.addItem(starterArmor);
    window.InventoryManager.equipItem(window.InventoryManager.getBackpack()[0].uniqueId);
  }

  setInterval(() => {
    window.UI.updateHUD();
  }, 100);

  setTimeout(() => {
    window.UI.showModalNotification(
      'WITAJ W ROZSZERZENIU 10 MODUŁÓW!',
      'Gra została wzbogacona o wszystkie zaawansowane mechaniki:<br><br>' +
      '💥 <strong>Atak Ostateczny [R]</strong> – naładuj pasek Furii (100%) i zmieć wrogów z mapy!<br>' +
      '🌟 <strong>Talenty [K]</strong> – awansuj bohaterów (poziomy 1-20) i rozwijaj unikalne drzewka!<br>' +
      '🐎 <strong>Wierzchowce [Z]</strong> – dosiadaj Konia Parowego lub Smoczego Mecha i taranuj wrogów szarżą!<br>' +
      '💎 <strong>Kamienie Runiczne</strong> – osadzaj rubiny, szafiry i ametysty w gniazdach rynsztunku!<br>' +
      '📜 <strong>Tablica Zleceń</strong> – poluj na elity i wymieniaj Żetony Łowcy na epickie skrzynie!<br>' +
      '🏟️ <strong>Koloseum Areny</strong> – przetrwaj kolejne fale wrogów i bossów!<br>' +
      '🛡️ <strong>Najazdy na Wioskę</strong> – wezwij róg bojowy i broń osady z wieżami obronnymi!<br>' +
      '⛏️ <strong>Minigry</strong> – wydobywaj rudę kilofem [E] i łów mechaniczne ryby w rzece!<br>' +
      '🌧️ <strong>Cykl Dnia i Nocy</strong> – uważaj na nocne bestie przy świetle latarni!'
    );
  }, 400);
});
