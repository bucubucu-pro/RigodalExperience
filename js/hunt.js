/* ============================================
   TREASURE HUNT LOGIC
   All content lives in QUESTS below — edit text/answers here.
   Currently Hungarian-only (this is a standalone kids' experience,
   separate from the main site's 5-language system). If you want to
   translate it later, this file is the only one that needs it.

   PLACEHOLDER ANSWER LOGIC (as requested):
   - number-type questions: always correct if the answer is 10
   - text-type questions: always correct if the answer is "kacsa"
   - button-type questions: always correct on tap (no validation)
   Swap these for real answers/logic whenever you're ready — each
   quest's "answer" field is the only thing that needs to change.
   ============================================ */

const QUESTS = [
  {
    id: 1,
    station: 'Rudi Fészke',
    icon: '🪺',
    type: 'button',
    task: 'Menjetek vissza a főoldalra, és olvassátok el (vagy hallgassátok meg, ahogy a szülő felolvassa) Rigó Rudi történetét! Utána gyertek vissza ide, és nyomjátok meg a gombot.',
    buttonLabel: 'Elolvastuk Rudi történetét!',
    reward: 'Ahogy elolvastátok Rudi történetét, egy régi, kék tollú térképdarab hullott ki egy könyv lapjai közül — ez volt az első darab! Rudi boldogan csippantott: „Ez a nagymamám kézírása... Most már tudom, hol kezdődött az utazásunk."'
  },
  {
    id: 2,
    station: 'Gyümölcsös-kanyar',
    icon: '🌳',
    type: 'number',
    task: 'Sétáljatok ki a kertbe, és számoljátok meg, hány gyümölcsfa van összesen! Írjátok be a számot ide:',
    answer: '10',
    reward: 'Pontosan ennyi fát ültetett Rudi nagymamája, egyet minden évben, amikor Rudi egyre nagyobbra nőtt. A második térképdarabon egy icipici fa rajza látszik — most már tudjátok, miért olyan fontos ez a kert Rudinak.'
  },
  {
    id: 3,
    station: 'Művész-zug',
    icon: '🎨',
    type: 'button',
    task: 'Kérjetek egy papírt és színes ceruzát, és rajzoljátok le, szerintetek hogy néz ki Rigó Rudi! Ha elkészült a rajz, nyomjátok meg a gombot.',
    buttonLabel: 'Kész a rajz!',
    reward: 'Amikor Rudi meglátta a rajzotokat, örömében megpördült a levegőben. „Ez vagyok én?!" — csiripelte boldogan. A harmadik térképdarab egy icipici ecsetet rejt — Rudi nagymamája is nagyon szeretett festeni.'
  },
  {
    id: 4,
    station: 'Vár Kaputornya',
    icon: '🏰',
    type: 'text',
    task: 'Rudi nagymamájának ez volt a kedvenc rejtvénye: „Magas kőfal, régi lakó, ágyúgolyó nem árt neki. Hívták már Egri Csillagnak is — vajon mi lehet az?" Írjátok be, mit gondoltok:',
    answer: 'kacsa',
    reward: 'Bármit is válaszoltatok, Rudi elégedetten bólintott: „Pont erre gondoltam én is!" A negyedik térképdarabon Eger vára rajzolódik ki — itt szeretett a nagymama üldögélni, és nézni a várost napnyugtakor.'
  },
  {
    id: 5,
    station: 'Emlékek Fala',
    icon: '📖',
    type: 'button',
    task: 'Keressétek meg a Vendégkönyvet (vagy egy sima papírlapot), és írjatok bele közösen egy üzenetet — valami szépet, amit szeretnétek, ha mások is elolvasnának! Ha kész vagytok, nyomjátok meg a gombot.',
    buttonLabel: 'Megírtuk az üzenetet!',
    reward: 'Rudi nagyon szereti esténként, lámpafény mellett olvasni a vendégek üzeneteit. A tiétek is bekerül a legkedvesebbek közé. Az ötödik térképdarab egy apró tollpihe rajza — Rudi mindig egy tollat hagy hátra azoknak, akiket igazán megkedvelt.'
  },
  {
    id: 6,
    station: 'Titkos Ajtók Folyosója',
    icon: '🚪',
    type: 'number',
    task: 'Járjátok körbe a házat, és számoljátok meg, hány ajtót találtok! (A bejárati ajtó, a szobaajtók, sőt, még a szekrényajtók is számítanak.) Írjátok be a számot:',
    answer: '10',
    reward: 'Ennyi ajtó mögött ennyi történet lakik! Rudi nagymamája mindig azt mondogatta: „Minden ajtó egy új kaland eleje." A hatodik térképdarab egy icipici aranykulcsot rejt — pont olyat, amilyet Rudi is a szárnya alatt tart.'
  },
  {
    id: 7,
    station: 'A Nagy Titok',
    icon: '🗝️',
    type: 'button',
    isFinal: true,
    task: 'Nyissátok meg a „Kérdezd Rigó Rudit" beszélgetést, és súgjatok neki egy titkot: mi volt eddig a kedvenc pillanatotok az utazásból? Ha elküldtétek az üzenetet, nyomjátok meg a gombot itt.',
    buttonLabel: 'Elsúgtuk a titkot Rudinak!',
    reward: 'Ahogy Rudi meghallotta a titkotokat, előhúzta az utolsó, hetedik térképdarabot — nagymamája búcsúüzenetét. Ott állt, apró betűkkel: „Kedves Rudikám, a legszebb kincs nem az, amit megtalálunk, hanem akikkel együtt keressük. Vigyázz rájuk, ahogy én vigyáztam rád." Rudi szeme csillogott. Ti mostantól örökre a kalandtársai vagytok.'
  }
];

const STORAGE_KEY = 'rigodal_hunt_v2';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completed: [] };
  } catch (e) {
    return { completed: [] };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) { /* localStorage unavailable — degrade silently */ }
}

let progress = loadProgress();

// Node positions as percentages of the map container — an S-curve
// winding from top to bottom. Matches the <path> coordinates in the
// SVG below (viewBox 400x1200), converted to percent.
const NODE_POSITIONS = [
  { x: 17.5, y: 5 },
  { x: 82.5, y: 15.8 },
  { x: 17.5, y: 28.3 },
  { x: 82.5, y: 40.8 },
  { x: 17.5, y: 53.3 },
  { x: 82.5, y: 65.8 },
  { x: 50, y: 91.7 }
];

function getNodeState(index) {
  const completedCount = progress.completed.length;
  if (index < completedCount) return 'completed';
  if (index === completedCount) return 'current';
  return 'locked';
}

function renderMap() {
  const mapEl = document.getElementById('huntMap');
  const completedCount = progress.completed.length;

  let nodesHtml = '';
  QUESTS.forEach((quest, i) => {
    const pos = NODE_POSITIONS[i];
    const state = getNodeState(i);
    const finalClass = quest.isFinal ? ' is-final' : '';
    nodesHtml += `
      <button class="hunt-node is-${state}${finalClass}" style="left:${pos.x}%; top:${pos.y}%;" data-quest-index="${i}">
        <span class="hunt-node-circle">${state === 'completed' ? '✓' : quest.icon}</span>
        <span class="hunt-node-label">${quest.station}</span>
      </button>
    `;
  });

  // Rudi sits at the last completed node, or just above the first node if nothing's done yet
  const rudiIndex = Math.max(0, completedCount - 1);
  const rudiPos = completedCount === 0
    ? { x: NODE_POSITIONS[0].x, y: Math.max(0, NODE_POSITIONS[0].y - 3) }
    : NODE_POSITIONS[rudiIndex];

  mapEl.innerHTML = `
    <svg class="hunt-map-svg" viewBox="0 0 400 1200" preserveAspectRatio="none">
      <path class="hunt-map-path" d="M 70,60 C 70,140 330,110 330,190 C 330,270 70,260 70,340 C 70,420 330,410 330,490 C 330,570 70,560 70,640 C 70,720 330,710 330,790 C 330,900 200,950 200,1100" />
    </svg>
    ${nodesHtml}
    <div class="hunt-rudi-token" id="huntRudiToken" style="left:${rudiPos.x}%; top:${rudiPos.y}%;">
      <svg viewBox="0 0 100 100" fill="none">
        <ellipse cx="46" cy="60" rx="30" ry="26" fill="#302F35"/>
        <circle cx="52" cy="34" r="22" fill="#302F35"/>
        <circle cx="45" cy="33" r="9" fill="white"/><circle cx="45" cy="34" r="6.4" fill="#8A5A2B"/><circle cx="45" cy="34" r="3.6" fill="#1A1210"/>
        <circle cx="62" cy="33" r="9.5" fill="white"/><circle cx="62" cy="34" r="6.8" fill="#8A5A2B"/><circle cx="62" cy="34" r="3.9" fill="#1A1210"/>
        <path d="M53 40 Q54 47 61 48 Q56 51 51 49 Q49 44 53 40 Z" fill="#F0A030"/>
      </svg>
    </div>
  `;

  document.getElementById('huntProgressLabel').textContent = `${completedCount}/${QUESTS.length} térképdarab`;

  mapEl.querySelectorAll('[data-quest-index]').forEach((btn) => {
    btn.addEventListener('click', () => openQuest(Number(btn.dataset.questIndex)));
  });

  if (completedCount === QUESTS.length) {
    renderFinale();
  }
}

function renderFinale() {
  const finaleEl = document.getElementById('huntFinale');
  finaleEl.innerHTML = `
    <div class="hunt-finale-icon">🎉🗝️</div>
    <div class="hunt-finale-title">Junior Felfedezők vagytok!</div>
    <div class="hunt-finale-text">${QUESTS[QUESTS.length - 1].reward}</div>
  `;
  finaleEl.style.display = 'block';
}

// --- Quest modal ---
const backdrop = document.getElementById('huntSheetBackdrop');
const sheet = document.getElementById('huntSheet');
const sheetContent = document.getElementById('huntSheetContent');

function openQuest(index) {
  const quest = QUESTS[index];

  function renderTaskView() {
    let inputHtml = '';
    if (quest.type === 'number' || quest.type === 'text') {
      inputHtml = `
        <div class="hunt-answer-row">
          <input type="${quest.type === 'number' ? 'number' : 'text'}" class="hunt-answer-input" id="huntAnswerInput" placeholder="Ide írjátok...">
          <button class="btn btn-primary" id="huntSubmitBtn">Beküldöm</button>
        </div>
        <div class="hunt-error-msg" id="huntErrorMsg">Ez még nem az! Próbáljátok meg újra 🙂</div>
      `;
    } else {
      inputHtml = `<button class="btn btn-primary btn-block" id="huntSubmitBtn" style="margin-top:16px;">${quest.buttonLabel}</button>`;
    }

    sheetContent.innerHTML = `
      <div class="hunt-sheet-title">${quest.icon} ${quest.station}</div>
      <div class="hunt-task-box">${quest.task}</div>
      ${inputHtml}
    `;

    document.getElementById('huntSubmitBtn').addEventListener('click', () => {
      if (quest.type === 'button') {
        completeQuest(index);
        renderRewardView();
        return;
      }
      const input = document.getElementById('huntAnswerInput');
      const value = input.value.trim().toLowerCase();
      const isCorrect = value === String(quest.answer).toLowerCase();
      if (isCorrect) {
        completeQuest(index);
        renderRewardView();
      } else {
        document.getElementById('huntErrorMsg').classList.add('is-visible');
      }
    });
  }

  function renderRewardView() {
    sheetContent.innerHTML = `
      <div class="hunt-reward-view">
        <div class="hunt-reward-icon">${quest.isFinal ? '🎉' : '🪶'}</div>
        <div class="hunt-reward-text">${quest.reward}</div>
        <button class="btn btn-primary btn-block" id="huntCloseBtn">Tovább a kalandban</button>
      </div>
    `;
    document.getElementById('huntCloseBtn').addEventListener('click', () => {
      closeSheet();
      renderMap();
    });
  }

  renderTaskView();
  backdrop.classList.add('is-open');
  sheet.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function completeQuest(index) {
  const id = QUESTS[index].id;
  if (!progress.completed.includes(id)) {
    progress.completed.push(id);
    saveProgress(progress);
  }
}

function closeSheet() {
  backdrop.classList.remove('is-open');
  sheet.classList.remove('is-open');
  document.body.style.overflow = '';
}

backdrop.addEventListener('click', closeSheet);

renderMap();
