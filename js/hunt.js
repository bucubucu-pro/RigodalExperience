/* ============================================
   TREASURE HUNT LOGIC
   All content lives in QUESTS below — edit text/answers here.
   Currently Hungarian-only (this is a standalone kids' experience,
   separate from the main site's 5-language system).

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
    task: 'Nyissátok meg <a href="https://rigodalvendeghazeger.hu/rigo-rudi-vendeghazunk-kis-orzoje/" target="_blank" rel="noopener" style="color:var(--color-accent-strong); font-weight:700; text-decoration:underline;">Rigó Rudi igazi történetét</a> — arról, hogyan lett egy apró madárfiókából a vár hős kis védője, majd a vendégház csendes őrzője! (Vagy hallgassátok meg, ahogy a szülő felolvassa.) Utána gyertek vissza ide.',
    buttonLabel: 'Elolvastuk Rudi történetét!',
    reward: 'Ahogy a történet végére értetek, valami icipici megcsillant a kép sarkában — egy apró, kék tollú térképdarabka volt, egy régi rajz szélébe rejtve! Rudi izgatottan pislogott, majd háromszor is megnézte: „Ezt még sosem vettem észre, pedig ott volt egész idő alatt! Pont ott, ahol a történetem elkezdődött." '
  },
  {
    id: 2,
    station: 'Gyümölcsös-kanyar',
    icon: '🌳',
    type: 'number',
    task: 'A hős várvédők régen, amikor véget ért az ostrom, gyümölcsfákat ültettek a falak tövébe — hálából, hogy a vár kitartott. Rudi szerint pont ilyen fák nőnek ebben a kertben is! Sétáljatok ki, és számoljátok meg, hány gyümölcsfa van összesen. Írjátok be a számot ide:',
    answer: '10',
    reward: 'Ott, a legvénebb fa tövében, a gyökerek között megbújva bukkant elő a második térképdarab — rajta egy icipici, mosolygós fa rajza! „A várvédők mindig fát ültettek, amikor békét ünnepeltek" — csippantette Rudi büszkén, és peckesen körberepülte a fát örömében.'
  },
  {
    id: 3,
    station: 'Művész-zug',
    icon: '🎨',
    type: 'button',
    task: 'Kérjetek egy papírt és színes ceruzát, és rajzoljátok le, ti hogyan képzelitek el Rigó Rudit — akár a hős várvédőt, akár a mai kerti őrzőt! Ha kész a remekmű, nyomjátok meg a gombot.',
    buttonLabel: 'Kész a rajz!',
    reward: 'Miközben a rajzot csodálta, Rudi észrevette, hogy egy régi vázlatfüzet lapjai közé csúszva ott lapul a harmadik térképdarab is — egy icipici ecset volt rárajzolva! „Egyszer egy várvédő is lefestett engem, amíg a toronyban énekeltem" — mesélte Rudi büszkén, és peckesen kihúzta magát, mint egy igazi hős.'
  },
  {
    id: 4,
    station: 'Vár Kaputornya',
    icon: '🏰',
    type: 'text',
    task: 'Rudi kedvenc rejtvénye ez, amit még a régi várvédőktől tanult: „Magas kőfal, régi lakó, ágyúgolyó nem árt neki, hívták már Egri Csillagnak is — vajon mi lehet ez a rejtélyes valami?" Írjátok be, mit gondoltok:',
    answer: 'kacsa',
    reward: 'Rudi olyan hangosan nevetett, hogy majdnem leesett az ágról! „Pont erre gondoltam én is, ez telibe talált!" A negyedik térképdarabot egy régi kőrésben pillantottátok meg, pont ott, ahol egykor a védők őrködtek. Rajta Eger vára látszik — Rudi kedvenc helye, ahonnan egykor bátorító dalával figyelmeztette a fáradt katonákat.'
  },
  {
    id: 5,
    station: 'Emlékek Fala',
    icon: '📖',
    type: 'button',
    task: 'Keressétek meg a Vendégkönyvet (vagy egy sima papírlapot), és írjatok bele közösen egy vidám üzenetet — egy titkos kézjelet, egy rajzot, vagy egy mondatot arról, hogy mi tetszett a legjobban eddig! Ha megvan, nyomjátok meg a gombot.',
    buttonLabel: 'Megírtuk az üzenetet!',
    reward: 'A vendégkönyv lapjai közt, egy régebbi bejegyzés mellé bújva bukkant elő az ötödik térképdarab — egy icipici, csillogó tollpihe rajza. „Régen dalban köszönték meg a segítségemet az emberek, most meg vendégkönyvben — ez is épp olyan szép!" — csiripelte meghatottan Rudi.'
  },
  {
    id: 6,
    station: 'Várkapuk Folyosója',
    icon: '🚪',
    type: 'number',
    task: 'A várnak egykor rengeteg kapuja és ajtaja volt, amit a védőknek éjjel-nappal őrizniük kellett. Járjátok körbe a házat, és számoljátok meg, hány ajtót találtok — a bejárati ajtó, a szobaajtók, sőt, még a szekrényajtók is számítanak! Írjátok be a számot:',
    answer: '10',
    reward: '„Pont ennyi kaput kellett egykor őriznünk!" — számolgatta Rudi izgatottan, miközben egyik lábáról a másikra ugrált. A hatodik térképdarabot az egyik ajtó tetején, a szemöldökfa fölött pillantottátok meg, rajta egy icipici, csillogó aranykulcs rajzával.'
  },
  {
    id: 7,
    station: 'A Nagy Titok',
    icon: '🗝️',
    type: 'button',
    isFinal: true,
    task: 'Már csak egy dolog van hátra: nyissátok meg a „Kérdezd Rigó Rudit" beszélgetést, és súgjatok neki egy igazi titkot — mi volt eddig a kedvenc pillanatotok ezen az utazáson? Ha elküldtétek az üzenetet, nyomjátok meg a gombot itt!',
    buttonLabel: 'Elsúgtuk a titkot Rudinak!',
    reward: 'Ahogy elsúgtátok a titkotokat, Rudi boldogan felrepült, és ott, a kert legmagasabb ágán megtalálta az utolsó, hetedik térképdarabot — rajta egy icipici vár és egy dallam kottája. „Régen a falakat őriztem" — mondta csendesen Rudi —, „ma már nem kőfalakat védek, hanem pillanatokat, pont amilyen ez is volt most veletek. Köszönöm, hogy megtaláltátok minden darabomat — mostantól ti is a történetem részei vagytok!" 🎉'
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
// SVG (viewBox 400x1200), converted to percent. Kept within a 20-80%
// horizontal band (not 0-100%) so node circles and labels never risk
// clipping past the container edge, even on the narrowest phones.
const NODE_POSITIONS = [
  { x: 22, y: 7 },
  { x: 78, y: 19 },
  { x: 22, y: 31 },
  { x: 78, y: 43 },
  { x: 22, y: 55 },
  { x: 78, y: 67 },
  { x: 50, y: 90 }
];

function getCurrentIndex() {
  // The next quest that isn't done yet — clamped so it never runs
  // past the last quest once everything is complete.
  return Math.min(progress.completed.length, QUESTS.length - 1);
}

function getNodeState(index) {
  const isDone = index < progress.completed.length;
  if (isDone) return 'completed';
  if (index === getCurrentIndex()) return 'current';
  return 'locked';
}

function renderMap() {
  const mapEl = document.getElementById('huntMap');
  const completedCount = progress.completed.length;
  const currentIndex = getCurrentIndex();
  const allDone = completedCount === QUESTS.length;

  let nodesHtml = '';
  QUESTS.forEach((quest, i) => {
    const pos = NODE_POSITIONS[i];
    const state = getNodeState(i);
    const finalClass = quest.isFinal ? ' is-final' : '';
    nodesHtml += `
      <button class="hunt-node is-${state}${finalClass}" style="left:${pos.x}%; top:${pos.y}%; animation-delay:${i * 80}ms;" data-quest-index="${i}">
        <span class="hunt-node-circle">${state === 'completed' ? '✓' : quest.icon}</span>
        <span class="hunt-node-label">${quest.station}</span>
      </button>
    `;
  });

  // Rudi always stands at the NEXT quest that isn't done yet — never
  // lingering at a completed one. Once everything is done, he stays
  // at the final treasure node.
  //
  // He's offset diagonally toward the node's bottom-right corner
  // (not centered directly on top of it) — partially overlapping the
  // circle rather than covering it, and importantly staying clear of
  // the "Ide kattints!" hint bubble, which stays anchored right above
  // the node's own (unmoved) position. Previously both Rudi and the
  // hint were stacked on the exact same point, so they'd collide.
  const nodePos = NODE_POSITIONS[currentIndex];
  const RUDI_OFFSET_X = 6;   // percent — nudges Rudi right of the node
  const RUDI_OFFSET_Y = 2;   // percent — nudges Rudi down (the map is
                              // 3x taller than wide, so this reads as a
                              // similar pixel offset to the X nudge —
                              // together they place Rudi diagonally at
                              // the node's bottom-right corner)
  const rudiPos = { x: nodePos.x + RUDI_OFFSET_X, y: nodePos.y + RUDI_OFFSET_Y };

  mapEl.innerHTML = `
    <svg class="hunt-map-bg" viewBox="0 0 400 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <use href="#huntBgPattern" />
    </svg>
    <svg class="hunt-map-svg" viewBox="0 0 400 1200" preserveAspectRatio="none">
      <path class="hunt-map-path" d="M 88,84 C 88,164 312,134 312,228 C 312,308 88,312 88,372 C 88,452 312,456 312,516 C 312,596 88,600 88,660 C 88,740 312,744 312,804 C 312,880 200,880 200,1080" />
    </svg>
    ${nodesHtml}
    ${!allDone ? `
      <div class="hunt-rudi-token" id="huntRudiToken" style="left:${rudiPos.x}%; top:${rudiPos.y}%;">
        <svg viewBox="0 0 100 100" fill="none">
          <ellipse cx="46" cy="60" rx="30" ry="26" fill="#302F35"/>
          <circle cx="52" cy="34" r="22" fill="#302F35"/>
          <circle cx="45" cy="33" r="9" fill="white"/><circle cx="45" cy="34" r="6.4" fill="#8A5A2B"/><circle cx="45" cy="34" r="3.6" fill="#1A1210"/>
          <circle cx="62" cy="33" r="9.5" fill="white"/><circle cx="62" cy="34" r="6.8" fill="#8A5A2B"/><circle cx="62" cy="34" r="3.9" fill="#1A1210"/>
          <path d="M53 40 Q54 47 61 48 Q56 51 51 49 Q49 44 53 40 Z" fill="#F0A030"/>
        </svg>
      </div>
      <div class="hunt-rudi-hint" style="left:${nodePos.x}%; top:${nodePos.y}%;">Ide kattints! 👆</div>
    ` : ''}
  `;

  document.getElementById('huntProgressLabel').textContent = `${completedCount}/${QUESTS.length} térképdarab`;

  mapEl.querySelectorAll('[data-quest-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.questIndex);
      const state = getNodeState(i);
      if (state === 'locked') return;
      openQuest(i, state === 'completed');
    });
  });

  renderPlayFab(currentIndex, allDone);

  if (allDone) {
    renderFinale();
  } else {
    document.getElementById('huntFinale').style.display = 'none';
  }
}

// --- Persistent "Play" button — always on screen, opens whichever
// quest is next. Hidden once every quest is done (nothing left to play). ---
function renderPlayFab(currentIndex, allDone) {
  const fab = document.getElementById('huntPlayFab');
  if (allDone) {
    fab.style.display = 'none';
    return;
  }
  fab.style.display = 'flex';
  fab.innerHTML = `<span class="hunt-play-fab-icon">▶</span>`;
  fab.onclick = () => openQuest(currentIndex, false);
}

function renderFinale() {
  const finaleEl = document.getElementById('huntFinale');
  finaleEl.style.display = 'block';
  finaleEl.innerHTML = `
    <div class="hunt-finale-icon">🎉🗝️</div>
    <div class="hunt-finale-title">Mostantól ti is felfedezők vagytok!</div>
    <div class="hunt-finale-text">${QUESTS[QUESTS.length - 1].reward}</div>
    <button class="hunt-finale-restart-btn" id="huntFinaleRestartBtn">🔄 Játsszunk újra!</button>
  `;
  document.getElementById('huntFinaleRestartBtn').addEventListener('click', restartHunt);
}

// --- Restart: clears all progress and starts the adventure over from
// scratch. Confirms first since this can't be undone. ---
function restartHunt() {
  const confirmed = confirm('Biztosan törlöd az eddigi haladást, és újrakezdjük a kalandot az elejéről?');
  if (!confirmed) return;
  progress = { completed: [] };
  saveProgress(progress);
  renderMap();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('huntRestartBtn').addEventListener('click', restartHunt);

// --- Quest modal ---
const backdrop = document.getElementById('huntSheetBackdrop');
const sheet = document.getElementById('huntSheet');
const sheetContent = document.getElementById('huntSheetContent');

function openQuest(index, readOnly) {
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

  if (readOnly) {
    renderRewardView();
  } else {
    renderTaskView();
  }

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
