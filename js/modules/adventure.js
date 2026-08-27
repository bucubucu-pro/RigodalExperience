/* ============================================
   MODULE: ADVENTURE (Treasure Hunt)
   Quest trail with feather rewards (shared storage
   key with the rewards module).
   ============================================ */

RigodalModules.register('adventure', {

  html: `
    <section class="section adventure-section" data-section>
      <div class="container">
        <div class="feather-jar"><span id="featherCount">0</span> 🪶</div>
        <div class="section-eyebrow" data-i18n="adventure.eyebrow">Family adventure</div>
        <h2 class="section-title" data-i18n="adventure.title">Rigó Rudi's Treasure Hunt</h2>
        <p class="section-subtitle" data-i18n="adventure.subtitle">Solve, explore, and earn feathers together.</p>

        <div class="quest-trail" id="questTrail"></div>
      </div>
    </section>
  `,

  init: function () {
    const trailEl = document.getElementById('questTrail');
    const featherCountEl = document.getElementById('featherCount');
    const STORAGE_KEY = 'rigodal_progress';

    function loadProgress() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { completedQuests: [], feathers: 0 };
      } catch (e) {
        return { completedQuests: [], feathers: 0 };
      }
    }

    function saveProgress(progress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      // Tell other modules (rewards) that feather count changed
      document.dispatchEvent(new CustomEvent('rigodal:feathersChanged', { detail: progress }));
    }

    let progress = loadProgress();

    function renderFeatherCount() {
      featherCountEl.textContent = progress.feathers;
    }

    function renderTrail() {
      const quests = RIGODAL_DATA.quests;

      trailEl.innerHTML = quests.map((q, i) => {
        const isComplete = progress.completedQuests.includes(q.id);
        const prevComplete = i === 0 || progress.completedQuests.includes(quests[i - 1].id);
        const isLocked = !isComplete && !prevComplete;

        let stateClass = '';
        if (isComplete) stateClass = 'is-complete';
        else if (isLocked) stateClass = 'is-locked';

        return `
          <div class="quest-node ${stateClass}" data-quest-id="${q.id}">
            <div class="quest-number">${isComplete ? '✓' : i + 1}</div>
            <div class="quest-info">
              <div class="quest-name">${q.name}</div>
              <div class="quest-hint">${q.hint}</div>
            </div>
            <div class="quest-check">${isComplete ? '🪶' : '+' + q.feathers}</div>
          </div>
        `;
      }).join('');
    }

    function completeQuest(id) {
      const quest = RIGODAL_DATA.quests.find((q) => q.id === id);
      if (!quest || progress.completedQuests.includes(id)) return;

      progress.completedQuests.push(id);
      progress.feathers += quest.feathers;
      saveProgress(progress);
      renderTrail();
      renderFeatherCount();

      if (progress.completedQuests.length === RIGODAL_DATA.quests.length) {
        progress.feathers += 50;
        saveProgress(progress);
        renderFeatherCount();
        setTimeout(() => alert(RIGODAL_I18N.t('adventure.complete')), 300);
      }
    }

    trailEl.addEventListener('click', (e) => {
      const node = e.target.closest('.quest-node');
      if (!node || node.classList.contains('is-locked')) return;
      completeQuest(Number(node.dataset.questId));
    });

    renderTrail();
    renderFeatherCount();
  }
});
