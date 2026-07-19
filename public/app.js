"use strict";

const SUBJECTS = {
  math: { name: "Matma bez spiny", icon: "÷", mascot: "🪐", color: "#bbf03c" },
  polish: { name: "Polski kombinator", icon: "Ą", mascot: "🦫", color: "#ff6b7a" },
  english: { name: "English level up", icon: "Hi!", mascot: "🍞", color: "#30d7f0" },
  world: { name: "Świat na opak", icon: "◎", mascot: "🤖", color: "#a78bfa" },
  mix: { name: "Chaos Mix", icon: "✦", mascot: "🧠", color: "#ffc93d" }
};

const QUESTION_BANK = {
  8: {
    math: [
      { prompt: "Aksolot odpala kalkulator", question: "Ile to jest 36 + 27?", answers: ["53", "63", "73", "62"], answer: "63", fact: "36 + 20 = 56, a potem +7 = 63." },
      { prompt: "Kapibara układa paczki po równo", question: "Ile to jest 9 × 4?", answers: ["32", "36", "40", "45"], answer: "36", fact: "9 + 9 + 9 + 9 daje 36." },
      { prompt: "Tostobot zjadł część baterii", question: "Ile to jest 100 − 46?", answers: ["54", "56", "64", "44"], answer: "54", fact: "100 − 40 = 60, a 60 − 6 = 54." },
      { prompt: "Naklejkowy alarm", question: "Tymon miał 24 naklejki i oddał 7. Ile mu zostało?", answers: ["17", "18", "19", "16"], answer: "17", fact: "24 − 7 = 17." },
      { prompt: "Sekwencja z kosmosu", question: "Jaka liczba będzie następna: 5, 10, 15, …?", answers: ["18", "20", "25", "30"], answer: "20", fact: "Za każdym razem dodajemy 5." },
      { prompt: "Pół na pół", question: "Jaka jest połowa liczby 18?", answers: ["8", "9", "10", "6"], answer: "9", fact: "Dwie dziewiątki razem dają 18." },
      { prompt: "Dzielenie kryształów", question: "24 kryształy dzielimy między 4 roboty. Ile dostanie każdy?", answers: ["4", "5", "6", "8"], answer: "6", fact: "24 ÷ 4 = 6." }
    ],
    polish: [
      { prompt: "Ortograficzny skaner", question: "Który wyraz zapisano poprawnie?", answers: ["krulik", "królik", "krulikj", "krulikó"], answer: "królik", fact: "Piszemy „królik” przez ó." },
      { prompt: "Słowny obrót o 180°", question: "Przeciwieństwem słowa „wysoki” jest…", answers: ["długi", "niski", "wąski", "lekki"], answer: "niski", fact: "Wysoki i niski to wyrazy o przeciwnym znaczeniu." },
      { prompt: "Polowanie na rzeczownik", question: "Który wyraz jest nazwą rzeczy?", answers: ["biegnie", "wesoły", "rower", "szybko"], answer: "rower", fact: "Rower to rzeczownik — nazwa rzeczy." },
      { prompt: "Znakowy boss", question: "Jaki znak powinien kończyć zdanie: „Gdzie jest mój plecak”", answers: ["?", "!", ".", ","], answer: "?", fact: "To pytanie, więc kończymy je znakiem zapytania." },
      { prompt: "Sylabowy beat", question: "Ile sylab ma słowo „kapibara”?", answers: ["2", "3", "4", "5"], answer: "4", fact: "Ka-pi-ba-ra — cztery sylaby." },
      { prompt: "Więcej niż jedno", question: "Liczba mnoga od słowa „dziecko” to…", answers: ["dziecki", "dziecka", "dzieci", "dzieckowie"], answer: "dzieci", fact: "Jedno dziecko, wiele dzieci." },
      { prompt: "U czy ó?", question: "Uzupełnij wyraz: g_ra", answers: ["gura", "góra", "gora", "góóra"], answer: "góra", fact: "Piszemy „góra” przez ó." }
    ],
    english: [
      { prompt: "Koci translator", question: "Co po angielsku znaczy „cat”?", answers: ["pies", "kot", "ptak", "ryba"], answer: "kot", fact: "Cat to po polsku kot." },
      { prompt: "Poranny level", question: "Jak powiesz po angielsku „dzień dobry” rano?", answers: ["Good night", "Good morning", "Goodbye", "Thank you"], answer: "Good morning", fact: "Good morning używamy rano." },
      { prompt: "Kolorowy skaner", question: "Który kolor to „red”?", answers: ["niebieski", "zielony", "czerwony", "żółty"], answer: "czerwony", fact: "Red oznacza czerwony." },
      { prompt: "Mam moc", question: "Uzupełnij: I ___ a book.", answers: ["have", "am", "is", "can"], answer: "have", fact: "I have a book — mam książkę." },
      { prompt: "Psia wiadomość", question: "Jak jest „pies” po angielsku?", answers: ["duck", "dog", "door", "doll"], answer: "dog", fact: "Dog to pies." },
      { prompt: "Liczbowy kod", question: "Która liczba to „five”?", answers: ["4", "5", "6", "9"], answer: "5", fact: "Five oznacza pięć." },
      { prompt: "Miejsce nauki", question: "Co oznacza słowo „school”?", answers: ["dom", "sklep", "szkoła", "boisko"], answer: "szkoła", fact: "School to szkoła." }
    ],
    world: [
      { prompt: "Kosmiczna orbita", question: "Na jakiej planecie mieszkamy?", answers: ["Mars", "Ziemia", "Wenus", "Jowisz"], answer: "Ziemia", fact: "Naszym domem jest planeta Ziemia." },
      { prompt: "Zwierzęcy detektor", question: "Które z tych zwierząt jest ssakiem?", answers: ["delfin", "rekin", "pstrąg", "ośmiornica"], answer: "delfin", fact: "Delfin oddycha płucami i karmi młode mlekiem." },
      { prompt: "Wschodni patrol", question: "Po której stronie świata wschodzi Słońce?", answers: ["na północy", "na południu", "na wschodzie", "na zachodzie"], answer: "na wschodzie", fact: "Słońce wschodzi na wschodzie." },
      { prompt: "Czasomierz Tostobota", question: "Ile minut ma jedna godzina?", answers: ["30", "45", "60", "100"], answer: "60", fact: "Jedna godzina to 60 minut." },
      { prompt: "Roślinny superskan", question: "Która część rośliny pobiera wodę z ziemi?", answers: ["kwiat", "liść", "korzeń", "owoc"], answer: "korzeń", fact: "Korzenie pobierają z podłoża wodę i sole mineralne." },
      { prompt: "Mapa Polski", question: "Jak nazywa się stolica Polski?", answers: ["Kraków", "Gdańsk", "Warszawa", "Wrocław"], answer: "Warszawa", fact: "Stolicą Polski jest Warszawa." },
      { prompt: "Wodna przemiana", question: "Co powstaje, gdy woda zamarza?", answers: ["para", "lód", "deszcz", "mgła"], answer: "lód", fact: "Zamarznięta woda zmienia się w lód." }
    ]
  },
  9: {
    math: [
      { prompt: "Tabliczkowy turboatak", question: "Ile to jest 7 × 8?", answers: ["54", "56", "64", "48"], answer: "56", fact: "7 × 8 = 56." },
      { prompt: "Dzielenie bez paniki", question: "Ile to jest 72 ÷ 8?", answers: ["8", "9", "10", "7"], answer: "9", fact: "Bo 8 × 9 = 72." },
      { prompt: "Trzycyfrowy kombos", question: "Ile to jest 235 + 168?", answers: ["393", "403", "413", "503"], answer: "403", fact: "235 + 100 + 60 + 8 = 403." },
      { prompt: "Laser odejmowania", question: "Ile to jest 500 − 247?", answers: ["243", "253", "263", "347"], answer: "253", fact: "500 − 200 − 40 − 7 = 253." },
      { prompt: "Prostokątny boss", question: "Prostokąt ma boki 6 cm i 4 cm. Jaki ma obwód?", answers: ["10 cm", "20 cm", "24 cm", "12 cm"], answer: "20 cm", fact: "6 + 4 + 6 + 4 = 20 cm." },
      { prompt: "Ułamkowy portal", question: "Połowa liczby 24 to…", answers: ["10", "12", "14", "16"], answer: "12", fact: "24 podzielone na dwie równe części daje 12." },
      { prompt: "Kolejność ma moc", question: "Ile to jest 5 + 3 × 4?", answers: ["32", "17", "20", "27"], answer: "17", fact: "Najpierw mnożymy: 3 × 4 = 12, potem dodajemy 5." }
    ],
    polish: [
      { prompt: "Części mowy w akcji", question: "Który wyraz jest przymiotnikiem?", answers: ["biegnie", "zielony", "rower", "wczoraj"], answer: "zielony", fact: "Przymiotnik opisuje cechę — zielony." },
      { prompt: "Ruch w zdaniu", question: "Wskaż czasownik.", answers: ["skacze", "wysoki", "piłka", "daleko"], answer: "skacze", fact: "Czasownik nazywa czynność — skacze." },
      { prompt: "RZ czy Ż?", question: "Który wyraz zapisano poprawnie?", answers: ["dżewo", "drzewo", "dżewło", "drzewó"], answer: "drzewo", fact: "Piszemy „drzewo” przez rz." },
      { prompt: "Zdaniowy konstruktor", question: "Które zdanie jest rozkazujące?", answers: ["Czy zamkniesz drzwi?", "Zamknij drzwi!", "Drzwi są zamknięte.", "Lubię te drzwi."], answer: "Zamknij drzwi!", fact: "Zdanie rozkazujące wyraża polecenie lub prośbę." },
      { prompt: "Rodzina wyrazów", question: "Który wyraz należy do rodziny wyrazu „dom”?", answers: ["domek", "dym", "droga", "drzewo"], answer: "domek", fact: "Dom i domek mają wspólny rdzeń oraz znaczenie." },
      { prompt: "Alfabetowy porządek", question: "Który wyraz będzie pierwszy w słowniku?", answers: ["banan", "arbuz", "cytryna", "śliwka"], answer: "arbuz", fact: "Litera A występuje w alfabecie przed B, C i Ś." },
      { prompt: "Ortograficzny radar", question: "Uzupełnij poprawnie: ___mura", answers: ["Ch", "H", "Ż", "Rz"], answer: "Ch", fact: "Piszemy „chmura” przez ch." }
    ],
    english: [
      { prompt: "Zdaniowy upgrade", question: "Wybierz poprawne zdanie: „Ona ma kota”.", answers: ["She have a cat.", "She has a cat.", "He has a cat.", "She is a cat."], answer: "She has a cat.", fact: "Dla she używamy has: She has a cat." },
      { prompt: "Pytanie o wiek", question: "Co znaczy: How old are you?", answers: ["Jak się masz?", "Ile masz lat?", "Gdzie mieszkasz?", "Jak masz na imię?"], answer: "Ile masz lat?", fact: "How old are you? to pytanie o wiek." },
      { prompt: "Dzień tygodnia", question: "Który dzień następuje po Monday?", answers: ["Sunday", "Friday", "Tuesday", "Thursday"], answer: "Tuesday", fact: "Po Monday jest Tuesday." },
      { prompt: "Jedzenie Tostobota", question: "Które słowo oznacza „śniadanie”?", answers: ["breakfast", "dinner", "kitchen", "bread"], answer: "breakfast", fact: "Breakfast to śniadanie." },
      { prompt: "Can power", question: "Uzupełnij: I can ___ a bike.", answers: ["ride", "read", "eat", "open"], answer: "ride", fact: "Ride a bike znaczy jeździć na rowerze." },
      { prompt: "Zegar po angielsku", question: "Co znaczy: It is three o’clock?", answers: ["Jest druga.", "Jest trzecia.", "Jest wpół do trzeciej.", "Są trzy zegary."], answer: "Jest trzecia.", fact: "Three o’clock oznacza godzinę trzecią." },
      { prompt: "Liczba mnoga", question: "Jaka jest liczba mnoga słowa „book”?", answers: ["bookes", "books", "bookies", "book"], answer: "books", fact: "Najczęściej dodajemy końcówkę -s: books." }
    ],
    world: [
      { prompt: "Kontynentalny skan", question: "Na którym kontynencie leży Polska?", answers: ["Azja", "Europa", "Afryka", "Australia"], answer: "Europa", fact: "Polska leży w Europie." },
      { prompt: "Układ Słoneczny", question: "Która planeta znajduje się najbliżej Słońca?", answers: ["Merkury", "Ziemia", "Mars", "Saturn"], answer: "Merkury", fact: "Merkury jest pierwszą planetą od Słońca." },
      { prompt: "Stan skupienia", question: "Jak nazywa się zmiana lodu w wodę?", answers: ["parowanie", "topnienie", "zamarzanie", "skraplanie"], answer: "topnienie", fact: "Pod wpływem ciepła lód topnieje." },
      { prompt: "Rzeczny patrol", question: "Która rzeka jest najdłuższa w Polsce?", answers: ["Odra", "Warta", "Wisła", "Bug"], answer: "Wisła", fact: "Najdłuższą rzeką Polski jest Wisła." },
      { prompt: "Oddech planety", question: "Który gaz jest potrzebny ludziom do oddychania?", answers: ["tlen", "wodór", "hel", "azot"], answer: "tlen", fact: "Organizm wykorzystuje tlen podczas oddychania." },
      { prompt: "Łańcuch pokarmowy", question: "Które zwierzę jest roślinożercą?", answers: ["wilk", "sarna", "lis", "sowa"], answer: "sarna", fact: "Sarna żywi się głównie roślinami." },
      { prompt: "Kierunkowy kod", question: "Jeśli stoisz twarzą na północ, po prawej stronie masz…", answers: ["zachód", "wschód", "południe", "północ"], answer: "wschód", fact: "Na mapie wschód leży po prawej stronie północy." }
    ]
  }
};

const STORAGE_KEY = "tymomoc-progress-v1";
const AGE_KEY = "tymomoc-age";
const SOUND_KEY = "tymomoc-sound";
const SYNC_CODE_KEY = "tymomoc-sync-code-v1";
const PROGRESS_API_URL = "https://tymomoc-api.damianolbrys5.workers.dev/api/progress";

const els = {
  ageModal: document.querySelector("#age-modal"),
  ageClose: document.querySelector("#age-close"),
  ageSwitch: document.querySelector("#age-switch"),
  ageOptions: [...document.querySelectorAll(".age-option")],
  topAge: document.querySelector("#top-age"),
  xpCount: document.querySelector("#xp-count"),
  heroStreak: document.querySelector("#hero-streak"),
  todayCount: document.querySelector("#today-count"),
  levelCopy: document.querySelector("#level-copy"),
  subjectCards: [...document.querySelectorAll(".subject-card")],
  questionCountToggle: document.querySelector("#question-count-toggle"),
  questionCountTotal: document.querySelector("#question-count-total"),
  questionCountModal: document.querySelector("#question-count-modal"),
  questionCountClose: document.querySelector("#question-count-close"),
  questionCountTitle: document.querySelector("#question-count-title"),
  questionCountList: document.querySelector("#question-count-list"),
  questionCountModalTotal: document.querySelector("#question-count-modal-total"),
  randomMission: document.querySelector("#random-mission"),
  mixMission: document.querySelector("#mix-mission"),
  soundToggle: document.querySelector("#sound-toggle"),
  soundIcon: document.querySelector("#sound-icon"),
  syncToggle: document.querySelector("#sync-toggle"),
  syncIcon: document.querySelector("#sync-icon"),
  syncProgress: document.querySelector("#sync-progress"),
  syncLabel: document.querySelector("#sync-label"),
  syncStatus: document.querySelector("#sync-status"),
  syncModal: document.querySelector("#sync-modal"),
  syncForm: document.querySelector("#sync-form"),
  syncClose: document.querySelector("#sync-close"),
  syncCodeInput: document.querySelector("#sync-code-input"),
  syncSubmit: document.querySelector("#sync-submit"),
  resetProgress: document.querySelector("#reset-progress"),
  quizOverlay: document.querySelector("#quiz-overlay"),
  quizClose: document.querySelector("#quiz-close"),
  quizIcon: document.querySelector("#quiz-icon"),
  quizKicker: document.querySelector("#quiz-kicker"),
  quizSubject: document.querySelector("#quiz-subject"),
  quizEarned: document.querySelector("#quiz-earned"),
  quizProgress: document.querySelector("#quiz-progress"),
  questionNumber: document.querySelector("#question-number"),
  levelBadge: document.querySelector("#level-badge"),
  questionCard: document.querySelector("#question-card"),
  toast: document.querySelector("#toast"),
  confetti: document.querySelector("#confetti")
};

const emptyProgress = () => ({ xp: 0, streak: 0, completed: 0, correct: 0, today: { date: localDate(), count: 0 } });

let age = Number(safeGet(AGE_KEY)) || 8;
let soundOn = safeGet(SOUND_KEY) !== "off";
let progress = loadProgress();
let syncCode = normalizeSyncCode(safeGet(SYNC_CODE_KEY) || "");
let quiz = null;
let toastTimer = null;
let cloudSaveTimer = null;

function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Strona nadal działa bez zapisu. */ }
}

function safeRemove(key) {
  try { localStorage.removeItem(key); } catch { /* Brak dostępu do pamięci nie zatrzymuje strony. */ }
}

function loadProgress() {
  let saved = {};
  try { saved = JSON.parse(safeGet(STORAGE_KEY) || "{}"); } catch { saved = {}; }

  const result = {
    8: { ...emptyProgress(), ...(saved[8] || {}) },
    9: { ...emptyProgress(), ...(saved[9] || {}) }
  };

  [8, 9].forEach((level) => {
    if (!result[level].today || result[level].today.date !== localDate()) {
      result[level].today = { date: localDate(), count: 0 };
    }
  });
  return result;
}

function saveProgress({ cloud = true } = {}) {
  safeSet(STORAGE_KEY, JSON.stringify(progress));
  if (cloud && syncCode) scheduleCloudSave();
}

function normalizeSyncCode(value) {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function setSyncState(state) {
  const states = {
    local: { icon: "☁", label: "Włącz zapis w chmurze", detail: "Wyniki są zapisane na tym urządzeniu" },
    waiting: { icon: "☁", label: "Zapis w chmurze włączony", detail: "Oczekiwanie na synchronizację" },
    syncing: { icon: "↻", label: "Synchronizuję wyniki…", detail: "Łączę się z bezpieczną bazą" },
    synced: { icon: "✓", label: "Wyniki są w chmurze", detail: "Synchronizacja działa automatycznie" },
    error: { icon: "!", label: "Nie udało się zsynchronizować", detail: "Wyniki nadal są bezpieczne na tym urządzeniu" }
  };
  const selected = states[state] || states.local;

  els.syncIcon.textContent = selected.icon;
  els.syncLabel.textContent = selected.label;
  els.syncStatus.textContent = selected.detail;
  els.syncToggle.dataset.syncState = state;
  els.syncProgress.dataset.syncState = state;
  els.syncToggle.setAttribute("aria-label", selected.label);
  els.syncToggle.title = selected.detail;
}

function mergeProgress(localProgress, cloudProgress) {
  const merged = {};
  const today = localDate();

  [8, 9].forEach((level) => {
    const local = localProgress[level] || emptyProgress();
    const remote = cloudProgress?.[level] || cloudProgress?.[String(level)] || emptyProgress();
    const localToday = local.today?.date === today ? Number(local.today.count) || 0 : 0;
    const remoteToday = remote.today?.date === today ? Number(remote.today.count) || 0 : 0;

    merged[level] = {
      xp: Math.max(Number(local.xp) || 0, Number(remote.xp) || 0),
      streak: Math.max(Number(local.streak) || 0, Number(remote.streak) || 0),
      completed: Math.max(Number(local.completed) || 0, Number(remote.completed) || 0),
      correct: Math.max(Number(local.correct) || 0, Number(remote.correct) || 0),
      today: { date: today, count: Math.max(localToday, remoteToday) }
    };
  });

  return merged;
}

async function cloudRequest(method, body) {
  const response = await fetch(PROGRESS_API_URL, {
    method,
    headers: {
      authorization: `Bearer ${syncCode}`,
      ...(body ? { "content-type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store"
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.error || "Błąd synchronizacji");
    error.status = response.status;
    throw error;
  }

  return payload;
}

function scheduleCloudSave() {
  window.clearTimeout(cloudSaveTimer);
  setSyncState("waiting");
  cloudSaveTimer = window.setTimeout(async () => {
    setSyncState("syncing");
    try {
      await cloudRequest("PUT", { progress });
      setSyncState("synced");
    } catch {
      setSyncState("error");
    }
  }, 650);
}

async function syncFromCloud(showMessage = true) {
  if (!syncCode) return;
  setSyncState("syncing");

  try {
    const remote = await cloudRequest("GET");
    if (remote.progress) {
      progress = mergeProgress(progress, remote.progress);
      saveProgress({ cloud: false });
      updateUI();
    }
    await cloudRequest("PUT", { progress });
    setSyncState("synced");
    if (showMessage) showToast("Wyniki zsynchronizowane ☁");
  } catch (error) {
    if (error.status === 401) {
      syncCode = "";
      safeRemove(SYNC_CODE_KEY);
      setSyncState("local");
      if (showMessage) showToast("Ten kod synchronizacji jest nieprawidłowy");
      return;
    }
    setSyncState("error");
    if (showMessage) showToast("Brak połączenia z chmurą — spróbujemy później");
  }
}

async function connectCloudSync() {
  if (syncCode) {
    await syncFromCloud(true);
    return;
  }

  els.syncModal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => els.syncCodeInput.focus(), 30);
}

function closeSyncDialog() {
  els.syncModal.hidden = true;
  els.syncCodeInput.value = "";
  updateModalLock();
}

async function submitSyncCode(event) {
  event.preventDefault();
  const candidate = normalizeSyncCode(els.syncCodeInput.value);
  if (!candidate) {
    showToast("Najpierw wpisz kod synchronizacji");
    return;
  }

  els.syncSubmit.disabled = true;
  els.syncSubmit.firstChild.textContent = "Łączę… ";
  syncCode = candidate;
  setSyncState("syncing");
  try {
    const remote = await cloudRequest("GET");
    safeSet(SYNC_CODE_KEY, syncCode);
    if (remote.progress) {
      progress = mergeProgress(progress, remote.progress);
      saveProgress({ cloud: false });
      updateUI();
    }
    await cloudRequest("PUT", { progress });
    setSyncState("synced");
    closeSyncDialog();
    showToast("Chmura połączona! Wyniki już nie znikną ☁");
  } catch (error) {
    syncCode = "";
    safeRemove(SYNC_CODE_KEY);
    setSyncState("local");
    showToast(error.status === 401 ? "Nieprawidłowy kod synchronizacji" : "Nie udało się połączyć z chmurą");
  } finally {
    els.syncSubmit.disabled = false;
    els.syncSubmit.firstChild.textContent = "Połącz wyniki ";
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatQuestionCount(count) {
  const lastTwo = count % 100;
  const last = count % 10;
  const noun = count === 1 ? "pytanie" : last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? "pytania" : "pytań";
  return `${count} ${noun}`;
}

function updateQuestionCounts() {
  const entries = Object.entries(QUESTION_BANK[age]);
  const total = entries.reduce((sum, [, questions]) => sum + questions.length, 0);

  els.questionCountTotal.textContent = formatQuestionCount(total);
  els.questionCountModalTotal.textContent = formatQuestionCount(total);
  els.questionCountTitle.textContent = `Pytania dla ${age} lat`;

  els.subjectCards.forEach((card) => {
    const count = QUESTION_BANK[age][card.dataset.subject].length;
    card.querySelector(".subject-question-count").textContent = `${formatQuestionCount(count)} łącznie`;
  });

  els.questionCountList.innerHTML = entries.map(([subject, questions]) => {
    const meta = SUBJECTS[subject];
    return `
      <div class="question-count-row">
        <span class="question-count-subject-icon" style="--subject-color: ${meta.color}" aria-hidden="true">${meta.icon}</span>
        <span><strong>${meta.name}</strong><small>pełna pula dla poziomu ${age} lat</small></span>
        <b>${formatQuestionCount(questions.length)}</b>
      </div>`;
  }).join("");
}

function updateModalLock() {
  const anyModalOpen = !els.ageModal.hidden
    || !els.syncModal.hidden
    || !els.questionCountModal.hidden
    || !els.quizOverlay.hidden;
  document.body.classList.toggle("modal-open", anyModalOpen);
}

function openQuestionCountDialog() {
  updateQuestionCounts();
  els.questionCountModal.hidden = false;
  els.questionCountToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");
  window.setTimeout(() => els.questionCountClose.focus(), 30);
}

function closeQuestionCountDialog() {
  els.questionCountModal.hidden = true;
  els.questionCountToggle.setAttribute("aria-expanded", "false");
  updateModalLock();
  els.questionCountToggle.focus();
}

function updateUI() {
  const current = progress[age];
  els.topAge.textContent = `${age} lat`;
  els.xpCount.textContent = `${current.xp} XP`;
  els.heroStreak.textContent = `${current.streak} 🔥`;
  els.todayCount.textContent = `${Math.min(current.today.count, 3)}/3 misje`;
  els.levelCopy.textContent = age === 8
    ? "Poziom dla 8 lat · zadania krótkie i konkretne"
    : "Poziom dla 9 lat · trochę więcej kombinowania";

  document.querySelector("#math-desc").textContent = age === 8
    ? "Dodawanie, mnożenie i sprytne zagadki"
    : "Działania, obwody i kolejność obliczeń";
  document.querySelector("#polish-desc").textContent = age === 8
    ? "Ortografia, sylaby i słowne wygibasy"
    : "Części mowy, pisownia i budowa zdań";
  document.querySelector("#english-desc").textContent = age === 8
    ? "Słówka, kolory i codzienne zwroty"
    : "Zdania, czas, pytania i liczba mnoga";
  document.querySelector("#world-desc").textContent = age === 8
    ? "Przyroda, Polska, kosmos i czas"
    : "Geografia, kosmos i naukowe przemiany";

  updateQuestionCounts();

  els.ageOptions.forEach((option) => option.classList.toggle("selected", Number(option.dataset.age) === age));
  els.soundToggle.setAttribute("aria-pressed", String(soundOn));
  els.soundToggle.setAttribute("aria-label", soundOn ? "Wyłącz dźwięki" : "Włącz dźwięki");
  els.soundIcon.textContent = soundOn ? "♪" : "×";
}

function chooseAge(nextAge) {
  age = Number(nextAge);
  safeSet(AGE_KEY, String(age));
  updateUI();
  closeAgeDialog();
  beep("select");
  showToast(`Poziom ${age} lat aktywowany. Turbo! ⚡`);
}

function openAgeDialog() {
  els.ageModal.hidden = false;
  document.body.classList.add("modal-open");
  updateUI();
  window.setTimeout(() => els.ageOptions.find((option) => Number(option.dataset.age) === age)?.focus(), 30);
}

function closeAgeDialog() {
  els.ageModal.hidden = true;
  updateModalLock();
}

function questionsFor(subject) {
  return shuffle(QUESTION_BANK[age][subject]).slice(0, 5).map((question) => ({ ...question, subject }));
}

function mixQuestions() {
  const subjects = Object.keys(QUESTION_BANK[age]);
  const firstFour = shuffle(subjects).map((subject) => ({ ...shuffle(QUESTION_BANK[age][subject])[0], subject }));
  const bonusSubject = subjects[Math.floor(Math.random() * subjects.length)];
  const usedQuestionTexts = new Set(firstFour.map((item) => item.question));
  const bonus = shuffle(QUESTION_BANK[age][bonusSubject]).find((item) => !usedQuestionTexts.has(item.question));
  return shuffle([...firstFour, { ...bonus, subject: bonusSubject }]);
}

function startQuiz(subject, customQuestions = null) {
  const isMix = subject === "mix";
  quiz = {
    subject,
    questions: customQuestions || questionsFor(subject),
    index: 0,
    correct: 0,
    earned: 0,
    answered: false,
    isMix
  };

  const meta = SUBJECTS[subject];
  els.quizIcon.textContent = meta.icon;
  els.quizIcon.style.background = meta.color;
  els.quizKicker.textContent = isMix ? "MISJA SPECJALNA" : "MISJA";
  els.quizKicker.style.color = meta.color;
  els.quizSubject.textContent = meta.name;
  els.quizEarned.textContent = "0 XP";
  els.levelBadge.textContent = `POZIOM ${age} LAT`;
  els.quizOverlay.hidden = false;
  document.body.classList.add("modal-open");
  renderQuestion();
  beep("open");
}

function renderQuestion() {
  if (!quiz || quiz.index >= quiz.questions.length) {
    finishQuiz();
    return;
  }

  quiz.answered = false;
  const item = quiz.questions[quiz.index];
  const itemMeta = SUBJECTS[item.subject];
  const choices = shuffle(item.answers);
  const percent = (quiz.index / quiz.questions.length) * 100;

  els.quizProgress.style.width = `${percent}%`;
  els.questionNumber.textContent = `PYTANIE ${quiz.index + 1} Z ${quiz.questions.length}`;
  els.quizEarned.textContent = `${quiz.earned} XP`;
  els.questionCard.innerHTML = `
    <div class="question-mascot" aria-hidden="true">${itemMeta.mascot}</div>
    <p class="question-prompt">${item.prompt}</p>
    <h2 id="question-title">${item.question}</h2>
    <div class="answers-grid" id="answers"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="next-button" id="next-question" type="button" hidden>
      Następne pytanie <span aria-hidden="true">→</span>
    </button>`;

  const answers = els.questionCard.querySelector("#answers");
  const letters = ["A", "B", "C", "D"];
  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.dataset.answer = choice;
    button.innerHTML = `<span class="answer-letter">${letters[index]}</span>${choice}`;
    button.addEventListener("click", () => checkAnswer(button, item));
    answers.appendChild(button);
  });

  window.setTimeout(() => answers.querySelector("button")?.focus(), 40);
}

function checkAnswer(selectedButton, item) {
  if (!quiz || quiz.answered) return;
  quiz.answered = true;

  const buttons = [...els.questionCard.querySelectorAll(".answer-button")];
  const feedback = els.questionCard.querySelector("#feedback");
  const next = els.questionCard.querySelector("#next-question");
  const isCorrect = selectedButton.dataset.answer === item.answer;

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === item.answer) button.classList.add("correct");
  });

  if (isCorrect) {
    selectedButton.classList.add("correct");
    quiz.correct += 1;
    quiz.earned += 10;
    feedback.className = "feedback good";
    feedback.textContent = `Turbo! +10 XP · ${item.fact}`;
    beep("correct");
    burstConfetti(16);
  } else {
    selectedButton.classList.add("wrong");
    feedback.className = "feedback bad";
    feedback.textContent = `Prawie! ${item.fact}`;
    beep("wrong");
  }

  els.quizEarned.textContent = `${quiz.earned} XP`;
  next.hidden = false;
  next.textContent = quiz.index === quiz.questions.length - 1 ? "Pokaż wynik →" : "Następne pytanie →";
  next.addEventListener("click", () => {
    quiz.index += 1;
    renderQuestion();
  }, { once: true });
  next.focus();
}

function finishQuiz() {
  if (!quiz) return;
  const bonus = quiz.isMix ? 25 : 20;
  quiz.earned += bonus;
  els.quizProgress.style.width = "100%";
  els.quizEarned.textContent = `${quiz.earned} XP`;

  const current = progress[age];
  current.xp += quiz.earned;
  current.correct += quiz.correct;
  current.completed += 1;
  current.streak += 1;
  current.today.count += 1;
  saveProgress();
  updateUI();

  const perfect = quiz.correct === quiz.questions.length;
  const headline = perfect ? "Mózg odleciał!" : quiz.correct >= 3 ? "Misja zaliczona!" : "Trening zrobiony!";
  const icon = perfect ? "🏆" : quiz.correct >= 3 ? "⚡" : "🧠";

  els.questionNumber.textContent = "KONIEC MISJI";
  els.questionCard.innerHTML = `
    <div class="summary-view">
      <div>
        <div class="summary-icon" aria-hidden="true">${icon}</div>
        <h2 id="question-title">${headline}</h2>
        <p>${perfect ? "Komplet odpowiedzi. Kapibara nie dowierza." : "Każda misja wzmacnia TurboMózg."}</p>
        <div class="summary-stats">
          <div class="summary-stat"><strong>${quiz.correct}/${quiz.questions.length}</strong><small>poprawne</small></div>
          <div class="summary-stat"><strong>+${quiz.earned}</strong><small>zdobyte XP</small></div>
          <div class="summary-stat"><strong>${current.streak} 🔥</strong><small>seria misji</small></div>
        </div>
        <button class="next-button" id="finish-button" type="button">Wracam do misji <span aria-hidden="true">→</span></button>
      </div>
    </div>`;

  document.querySelector("#finish-button").addEventListener("click", closeQuiz, { once: true });
  beep("finish");
  burstConfetti(perfect ? 70 : 38);
}

function closeQuiz() {
  els.quizOverlay.hidden = true;
  updateModalLock();
  quiz = null;
  els.quizProgress.style.width = "0";
  els.quizClose.focus();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("visible"), 2600);
}

function beep(type) {
  if (!soundOn) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const config = {
      correct: [660, 0.12], wrong: [180, 0.16], open: [330, 0.08],
      select: [520, 0.08], finish: [784, 0.22]
    }[type] || [440, 0.08];
    oscillator.type = type === "wrong" ? "sawtooth" : "sine";
    oscillator.frequency.setValueAtTime(config[0], context.currentTime);
    if (type === "correct" || type === "finish") {
      oscillator.frequency.exponentialRampToValueAtTime(config[0] * 1.35, context.currentTime + config[1]);
    }
    gain.gain.setValueAtTime(0.05, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + config[1]);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + config[1]);
    oscillator.addEventListener("ended", () => context.close());
  } catch { /* Dźwięk jest tylko dodatkiem. */ }
}

function burstConfetti(amount) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#bbf03c", "#30d7f0", "#ff6b7a", "#ffc93d", "#8b5cf6"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.animationDuration = `${1.4 + Math.random() * 1.1}s`;
    els.confetti.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2900);
  }
}

els.ageOptions.forEach((option) => option.addEventListener("click", () => chooseAge(option.dataset.age)));
els.ageSwitch.addEventListener("click", openAgeDialog);
els.ageClose.addEventListener("click", () => {
  if (!safeGet(AGE_KEY)) safeSet(AGE_KEY, String(age));
  closeAgeDialog();
});

els.subjectCards.forEach((card) => card.addEventListener("click", () => startQuiz(card.dataset.subject)));
els.questionCountToggle.addEventListener("click", openQuestionCountDialog);
els.questionCountClose.addEventListener("click", closeQuestionCountDialog);
els.randomMission.addEventListener("click", () => {
  const subjects = Object.keys(QUESTION_BANK[age]);
  const random = subjects[Math.floor(Math.random() * subjects.length)];
  showToast(`Losowanie… ${SUBJECTS[random].name}! 🎲`);
  window.setTimeout(() => startQuiz(random), 350);
});
els.mixMission.addEventListener("click", () => startQuiz("mix", mixQuestions()));
els.quizClose.addEventListener("click", closeQuiz);

els.soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  safeSet(SOUND_KEY, soundOn ? "on" : "off");
  updateUI();
  if (soundOn) beep("select");
  showToast(soundOn ? "Dźwięki włączone ♪" : "Dźwięki wyłączone");
});

els.syncToggle.addEventListener("click", connectCloudSync);
els.syncProgress.addEventListener("click", connectCloudSync);
els.syncForm.addEventListener("submit", submitSyncCode);
els.syncClose.addEventListener("click", closeSyncDialog);

els.resetProgress.addEventListener("click", () => {
  if (!window.confirm("Wyzerować wszystkie punkty i ukończone misje?")) return;
  progress = { 8: emptyProgress(), 9: emptyProgress() };
  saveProgress();
  updateUI();
  showToast("Postęp wyzerowany. Nowy start! 🚀");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!els.quizOverlay.hidden) closeQuiz();
  else if (!els.syncModal.hidden) closeSyncDialog();
  else if (!els.questionCountModal.hidden) closeQuestionCountDialog();
  else if (!els.ageModal.hidden) closeAgeDialog();
});

updateUI();
setSyncState(syncCode ? "waiting" : "local");
if (safeGet(AGE_KEY)) {
  els.ageModal.hidden = true;
} else {
  document.body.classList.add("modal-open");
}

if (syncCode) void syncFromCloud(false);
