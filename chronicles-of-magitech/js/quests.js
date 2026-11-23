// Zaktualizowany Menedżer Zadań i NPC uwzględniający nowe światy i kupca Barnabę
window.QuestManager = (function() {
  let quests = [];
  let npcs = [];

  function init() {
    quests = JSON.parse(JSON.stringify(window.GAME_CONFIG.QUESTS));
    initNpcs();
  }

  function initNpcs() {
    npcs = [
      {
        id: 'cedric',
        name: 'Starszy Osady Cedric',
        x: 420,
        y: 380,
        sprite: 'npc_elder',
        questId: 'q1_forest_clearing'
      },
      {
        id: 'tora',
        name: 'Inżynier Badań Tora',
        x: 500,
        y: 340,
        sprite: 'npc_elder',
        questId: 'q2_ancient_cores'
      },
      {
        id: 'barnaba',
        name: 'Kupiec Barnaba',
        x: 540,
        y: 280,
        sprite: 'npc_merchant',
        questId: 'q3_frost_exploration'
      },
      {
        id: 'arena_master',
        name: 'Mistrz Areny Brutus',
        x: 620,
        y: 420,
        sprite: 'hero_warrior',
        isArenaNpc: true
      },
      {
        id: 'oracle',
        name: 'Mistyczna Wyrocznia',
        x: 1950,
        y: 320,
        sprite: 'npc_elder',
        questId: 'q5_mythic_ascension'
      }
    ];
  }

  function getActiveQuest() {
    return quests.find(q => q.status === 'active') || quests.find(q => q.status === 'available');
  }

  function getAllQuests() {
    return quests;
  }

  function getNpcs() {
    return npcs;
  }

  function checkNpcInteraction(heroX, heroY) {
    // Sprawdzenie portalu
    if (window.GameMap.checkPortalInteraction(heroX, heroY)) {
      return true;
    }

    // Sprawdzenie NPC
    if (window.GameMap.getCurrentWorldId() === 'hub') {
      for (let npc of npcs) {
        const dist = Math.hypot(npc.x - heroX, npc.y - heroY);
        if (dist < 48) {
          if (npc.id === 'barnaba') {
            window.UI.toggleShop();
          }
          if (npc.isArenaNpc) {
            window.ArenaManager.startArena();
            return true;
          }
          interactWithNpc(npc);
          return true;
        }
      }

      // Sprawdzenie zbierania rdzeni
      const interactives = window.GameMap.getInteractiveObjects();
      for (let obj of interactives) {
        if (!obj.collected && Math.hypot(obj.x - heroX, obj.y - heroY) < obj.radius + 18) {
          collectItem(obj);
          return true;
        }
      }
    }

    return false;
  }

  function interactWithNpc(npc) {
    const quest = quests.find(q => q.npc === npc.name && (q.status === 'available' || q.status === 'active'));
    if (!quest) {
      if (window.UI) {
        window.UI.showDialogue(npc.name, 'Witaj, bohaterze! Skorzystaj z naszych warsztatów, kup miecz lub zbroję i podróżuj przez Runowy Portal!');
      }
      return;
    }

    if (quest.status === 'available') {
      quest.status = 'active';
      window.GameAudio.pickup();
      if (window.UI) {
        window.UI.showDialogue(npc.name, quest.dialogStart, () => {
          window.UI.showNotification(`Przyjęto zadanie: ${quest.title}`);
          window.UI.updateQuestTracker();
        });
      }
    } else if (quest.status === 'active') {
      const allDone = quest.objectives.every(obj => obj.current >= obj.count);
      if (allDone) {
        completeQuest(quest);
      } else {
        if (window.UI) {
          window.UI.showDialogue(npc.name, `Twój cel: ${quest.objectives.map(o => `${o.text} (${o.current}/${o.count})`).join(', ')}`);
        }
      }
    }
  }

  function completeQuest(quest) {
    quest.status = 'completed';
    window.GameAudio.questComplete();

    if (quest.rewards.gold && window.PlayerState) window.PlayerState.addGold(quest.rewards.gold);
    if (quest.rewards.science && window.PlayerState) window.PlayerState.addScience(quest.rewards.science);
    if (quest.rewards.unlockHero) window.HeroManager.unlockHero(quest.rewards.unlockHero);

    quests.forEach(q => {
      if (q.requiresQuest === quest.id && q.status === 'locked') {
        q.status = 'available';
      }
    });

    if (window.UI) {
      window.UI.showDialogue(quest.npc, quest.dialogEnd, () => {
        window.UI.showNotification(`UKOŃCZONO ZADANIE: ${quest.title}! (+${quest.rewards.gold} 🪙, +${quest.rewards.science} 🧪)`);
        window.UI.updateQuestTracker();
      });
    }
  }

  function collectItem(obj) {
    if (obj.collected) return;
    obj.collected = true;
    window.GameAudio.pickup();
    if (window.UI) window.UI.showFloatingText('+1 Rdzeń Mocy!', obj.x, obj.y - 20, '#00e5ff');

    quests.forEach(q => {
      if (q.status === 'active') {
        q.objectives.forEach(objTarget => {
          if (objTarget.type === 'collect_items' && objTarget.target === obj.type) {
            objTarget.current = Math.min(objTarget.count, objTarget.current + 1);
            if (window.UI) window.UI.updateQuestTracker();
          }
        });
      }
    });
  }

  function onEnemyKilled(enemyTypeKey, isBoss) {
    quests.forEach(q => {
      if (q.status === 'active') {
        q.objectives.forEach(obj => {
          if (obj.type === 'kill_monsters' && obj.target === enemyTypeKey) {
            obj.current = Math.min(obj.count, obj.current + 1);
          } else if (obj.type === 'kill_boss' && obj.target === enemyTypeKey) {
            obj.current = Math.min(obj.count, obj.current + 1);
          }
        });
      }
    });

    if (window.UI) window.UI.updateQuestTracker();
  }

  function renderNpcs(ctx, camera) {
    if (window.GameMap.getCurrentWorldId() !== 'hub') return;

    ctx.save();
    npcs.forEach(npc => {
      if (
        npc.x + 40 >= camera.x && npc.x - 40 <= camera.x + camera.width &&
        npc.y + 40 >= camera.y && npc.y - 40 <= camera.y + camera.height
      ) {
        const sx = Math.floor(npc.x - camera.x);
        const sy = Math.floor(npc.y - camera.y);

        const sprite = PixelSprites.get(npc.sprite);
        if (sprite) ctx.drawImage(sprite, sx - 16, sy - 20, 32, 32);

        const quest = quests.find(q => q.npc === npc.name && (q.status === 'available' || q.status === 'active'));
        if (quest) {
          const allDone = quest.status === 'active' && quest.objectives.every(o => o.current >= o.count);
          const iconText = allDone ? '?' : '!';
          const iconColor = allDone ? '#00e676' : '#ffea00';

          const bounce = Math.sin(Date.now() / 150) * 3;
          ctx.font = 'bold 12px "Press Start 2P", monospace, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#000';
          ctx.fillText(iconText, sx + 1, sy - 30 + bounce + 1);
          ctx.fillStyle = iconColor;
          ctx.fillText(iconText, sx, sy - 30 + bounce);
        }

        ctx.font = '7px "Press Start 2P", monospace, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(npc.name, sx, sy + 22);
      }
    });
    ctx.restore();
  }

  return {
    init,
    getActiveQuest,
    getAllQuests,
    getNpcs,
    checkNpcInteraction,
    collectItem,
    onEnemyKilled,
    renderNpcs
  };
})();
