/* ============================================
   RIGÓ RUDI ADVENTURE (treasure hunt)
   Handles: quest trail rendering, completion state,
   feather rewards (shared with Rewards Club via localStorage).
   ============================================ */

(function () {
  const trailEl = document.getElementById('questTrail');
  const featherCountEl = document.getElementById('featherCount');
  const nestCountEl = document.getElementById('nestCount');

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
  }

  let progress = loadProgress();

  function renderFeatherCount() {
    featherCountEl.textContent = progress.feathers;
    if (nestCountEl) nestCountEl.textContent = progress.feathers;
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

    // Bonus for completing the whole hunt
    if (progress.completedQuests.length === RIGODAL_DATA.quests.length) {
      progress.feathers += 50;
      saveProgress(progress);
      renderFeatherCount();
      // Future: trigger full-screen celebration animation + certificate generation here
      setTimeout(() => alert('🎉 Adventure complete! +50 bonus feathers. Certificate coming soon.'), 300);
    }
  }

  trailEl.addEventListener('click', (e) => {
    const node = e.target.closest('.quest-node');
    if (!node || node.classList.contains('is-locked')) return;
    const id = Number(node.dataset.questId);
    completeQuest(id);
  });

  renderTrail();
  renderFeatherCount();
})();
