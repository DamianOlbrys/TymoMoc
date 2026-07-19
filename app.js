"use strict";

const SUBJECTS = {
  math: { name: "Matma bez spiny", nameDe: "Mathe ohne Stress", nameEn: "Math without stress", icon: "÷", mascot: "🪐", color: "#bbf03c" },
  polish: { name: "Polski kombinator", nameDe: "Polnisch-Kombinator", nameEn: "Polish word master", icon: "Ą", mascot: "🦫", color: "#ff6b7a" },
  english: { name: "English level up", nameDe: "Englisch Level-up", nameEn: "English level up", icon: "Hi!", mascot: "🍞", color: "#30d7f0" },
  world: { name: "Świat na opak", nameDe: "Die Welt entdecken", nameEn: "Discover the world", icon: "◎", mascot: "🤖", color: "#a78bfa" },
  logic: { name: "Logika bez luk", nameDe: "Logik ohne Lücken", nameEn: "Logic without gaps", icon: "◇", mascot: "🧩", color: "#ff9f43" },
  reading: { name: "Czytam i kumam", nameDe: "Lesen und verstehen", nameEn: "Read and understand", icon: "Aa", mascot: "🦉", color: "#4dd599" },
  coding: { name: "Kodowanie od zera", nameDe: "Programmieren ab null", nameEn: "Coding from scratch", icon: "{ }", mascot: "🤖", color: "#f78fb3" },
  mix: { name: "Chaos Mix", nameDe: "Chaos-Mix", nameEn: "Chaos Mix", icon: "✦", mascot: "🧠", color: "#ffc93d" }
};

const GERMAN_STATIC_TEXT = new Map(Object.entries({
  "Przejdź do misji": "Zu den Missionen",
  "Nauka w trybie turbo": "Lernen im Turbomodus",
  "Zmień poziom": "Stufe ändern",
  "Twój wynik": "Dein Ergebnis",
  "Dzisiaj mózg robi salto": "Heute macht dein Gehirn einen Salto",
  "Odpal tryb": "Starte den Modus",
  "Krótki misje, szybkie punkty i zero nudy.": "Kurze Missionen, schnelle Punkte und keine Langeweile.",
  "Wybieram misję": "Mission wählen",
  "Losuj wyzwanie": "Aufgabe auslosen",
  "5 minut dziennie": "5 Minuten täglich",
  "robi wielką różnicę": "machen einen großen Unterschied",
  "za dobrą odpowiedź": "für eine richtige Antwort",
  "seria misji": "Missionsserie",
  "CENTRUM DOWODZENIA": "KOMMANDOZENTRALE",
  "Wybierz swoją misję": "Wähle deine Mission",
  "Zobacz bazę pytań": "Fragenpool ansehen",
  "dzisiejszy cel": "heutiges Ziel",
  "dzisiaj": "heute",
  "HASŁO MOTYWACYJNE NA DZIŚ": "MOTTO FÜR HEUTE",
  "Jedno z 500 haseł — nowe każdego dnia.": "Eines von 500 Mottos – jeden Tag ein neues.",
  "MISJA SPECJALNA": "SPEZIALMISSION",
  "Po jednym pytaniu z każdego świata. Kapibara Profesara twierdzi, że dasz radę.": "Eine Frage aus jeder Welt. Professor Capybara glaubt an dich.",
  "Odpal miks": "Mix starten",
  "NAGRODA": "BELOHNUNG",
  "za komplet": "für das ganze Set",
  "EKIPA TYMOMOCY": "DAS TYMOMOC-TEAM",
  "Poznaj swoich trenerów": "Lerne deine Trainer kennen",
  "Zrobione z ciekawością dla Tymona.": "Mit Neugier für Tymon gemacht.",
  "Włącz zapis w chmurze": "Cloud-Speicherung aktivieren",
  "Wyniki są zapisane na tym urządzeniu": "Ergebnisse sind auf diesem Gerät gespeichert",
  "Wyzeruj mój postęp": "Meinen Fortschritt löschen",
  "USTAW SWÓJ POZIOM": "WÄHLE DEINE STUFE",
  "Ile masz lat?": "Wie alt bist du?",
  "Dopasujemy trudność misji. Możesz zmienić poziom w każdej chwili.": "Wir passen die Schwierigkeit an. Du kannst die Stufe jederzeit ändern.",
  "Startowa moc": "Startpower",
  "Więcej wyzwań": "Mehr Herausforderungen",
  "RODZINNA CHMURA": "FAMILIEN-CLOUD",
  "Zapisz wyniki na zawsze": "Ergebnisse dauerhaft speichern",
  "Wpisz prywatny kod rodzinny. Wystarczy zrobić to raz na każdym urządzeniu.": "Gib den privaten Familiencode einmal auf jedem Gerät ein.",
  "Skąd wziąć kod?": "Woher kommt der Code?",
  "Kod synchronizacji": "Synchronisierungscode",
  "Połącz wyniki": "Ergebnisse verbinden",
  "BAZA PYTAŃ": "FRAGENPOOL",
  "Każda misja losuje 5 pytań z wybranej kategorii. Tutaj widzisz całą dostępną pulę.": "Jede Mission zieht 5 Fragen aus der gewählten Kategorie. Hier siehst du den gesamten Pool.",
  "Wszystkie kategorie": "Alle Kategorien",
  "ŚCIEŻKA MISTRZA": "MEISTERPFAD",
  "Poziomy kategorii": "Kategorien-Stufen",
  "Ile XP potrzeba?": "Wie viele XP braucht man?",
  "maksymalnie 15 poziom": "maximal Stufe 15",
  "DZIENNIK TYMOMOCY": "TYMOMOC-TAGEBUCH",
  "Historia nauki": "Lernverlauf",
  "BEZPIECZNE KONTO": "SICHERES KONTO",
  "Zaloguj się jednym kliknięciem": "Mit einem Klick anmelden",
  "Użyj konta Google. Nowe konto zacznie działać po akceptacji administratora.": "Nutze dein Google-Konto. Ein neues Konto wird nach der Freigabe aktiv.",
  "Sprawdź, czy konto zaakceptowano": "Freigabe des Kontos prüfen",
  "Nie zapisujemy hasła Google. Otrzymujemy tylko imię, adres e-mail i zdjęcie profilowe.": "Wir speichern dein Google-Passwort nicht. Wir erhalten nur Name, E-Mail und Profilbild.",
  "TWOJE KONTO": "DEIN KONTO",
  "Konto Google": "Google-Konto",
  "Wyloguj się": "Abmelden",
  "PANEL RODZICA": "ELTERNBEREICH",
  "Użytkownicy TymoMocy": "TymoMoc-Nutzer",
  "Nowe konta wymagają Twojej zgody. Blokada natychmiast wyloguje użytkownika i uniemożliwi kolejne logowanie.": "Neue Konten brauchen deine Zustimmung. Eine Sperre meldet den Nutzer sofort ab und verhindert weitere Anmeldungen.",
  "MISJA": "MISSION",
  "Gotowy?": "Bereit?",
  "Następne pytanie": "Nächste Frage"
}));

const ENGLISH_STATIC_TEXT = new Map(Object.entries({
  "Przejdź do misji": "Skip to missions",
  "Nauka w trybie turbo": "Learning in turbo mode",
  "Zmień poziom": "Change level",
  "Twój wynik": "Your score",
  "Dzisiaj mózg robi salto": "Today your brain does a backflip",
  "Odpal tryb": "Start",
  "Wybieram misję": "Choose a mission",
  "Losuj wyzwanie": "Pick a random challenge",
  "5 minut dziennie": "5 minutes a day",
  "robi wielką różnicę": "makes a huge difference",
  "za dobrą odpowiedź": "for a correct answer",
  "seria misji": "mission streak",
  "CENTRUM DOWODZENIA": "COMMAND CENTRE",
  "Wybierz swoją misję": "Choose your mission",
  "Zobacz bazę pytań": "View question bank",
  "dzisiejszy cel": "today's goal",
  "dzisiaj": "today",
  "HASŁO MOTYWACYJNE NA DZIŚ": "TODAY'S MOTIVATION",
  "Jedno z 500 haseł — nowe każdego dnia.": "One of 500 messages — a new one every day.",
  "MISJA SPECJALNA": "SPECIAL MISSION",
  "Po jednym pytaniu z każdego świata. Kapibara Profesara twierdzi, że dasz radę.": "One question from every world. Professor Capybara believes in you.",
  "Odpal miks": "Start the mix",
  "NAGRODA": "REWARD",
  "za komplet": "for the full set",
  "EKIPA TYMOMOCY": "THE TYMOMOC TEAM",
  "Poznaj swoich trenerów": "Meet your trainers",
  "Zrobione z ciekawością dla Tymona.": "Made with curiosity for Tymon.",
  "Włącz zapis w chmurze": "Enable cloud saves",
  "Wyniki są zapisane na tym urządzeniu": "Results are saved on this device",
  "Wyzeruj mój postęp": "Reset my progress",
  "USTAW SWÓJ POZIOM": "CHOOSE YOUR LEVEL",
  "Ile masz lat?": "How old are you?",
  "Dopasujemy trudność misji. Możesz zmienić poziom w każdej chwili.": "We will match the mission difficulty. You can change the level at any time.",
  "Startowa moc": "Starting power",
  "Więcej wyzwań": "More challenges",
  "RODZINNA CHMURA": "FAMILY CLOUD",
  "Zapisz wyniki na zawsze": "Keep your results forever",
  "Wpisz prywatny kod rodzinny. Wystarczy zrobić to raz na każdym urządzeniu.": "Enter your private family code once on each device.",
  "Skąd wziąć kod?": "Where do I get the code?",
  "Kod synchronizacji": "Sync code",
  "Połącz wyniki": "Connect results",
  "BAZA PYTAŃ": "QUESTION BANK",
  "Każda misja losuje 5 pytań z wybranej kategorii. Tutaj widzisz całą dostępną pulę.": "Each mission draws 5 questions from the selected category. Here you can see the complete pool.",
  "Wszystkie kategorie": "All categories",
  "ŚCIEŻKA MISTRZA": "MASTER PATH",
  "Poziomy kategorii": "Category levels",
  "Ile XP potrzeba?": "How much XP is needed?",
  "maksymalnie 15 poziom": "maximum level 15",
  "DZIENNIK TYMOMOCY": "TYMOMOC JOURNAL",
  "Historia nauki": "Learning history",
  "BEZPIECZNE KONTO": "SECURE ACCOUNT",
  "Zaloguj się jednym kliknięciem": "Sign in with one click",
  "Użyj konta Google. Nowe konto zacznie działać po akceptacji administratora.": "Use your Google account. A new account becomes active after administrator approval.",
  "Sprawdź, czy konto zaakceptowano": "Check account approval",
  "Nie zapisujemy hasła Google. Otrzymujemy tylko imię, adres e-mail i zdjęcie profilowe.": "We do not store your Google password. We only receive your name, email and profile picture.",
  "TWOJE KONTO": "YOUR ACCOUNT",
  "Konto Google": "Google account",
  "Wyloguj się": "Sign out",
  "PANEL RODZICA": "PARENT PANEL",
  "Użytkownicy TymoMocy": "TymoMoc users",
  "Nowe konta wymagają Twojej zgody. Blokada natychmiast wyloguje użytkownika i uniemożliwi kolejne logowanie.": "New accounts require your approval. Blocking immediately signs the user out and prevents future logins.",
  "MISJA": "MISSION",
  "Gotowy?": "Ready?",
  "Następne pytanie": "Next question"
}));

const GERMAN_ARIA_TEXT = new Map(Object.entries({
  "Zmień wiek": "Alter ändern",
  "Zdobyte punkty doświadczenia": "Gesammelte Erfahrungspunkte",
  "Sprawdź poziomy kategorii i progi XP": "Kategorien-Stufen und XP-Schwellen prüfen",
  "Sprawdź historię nauki": "Lernverlauf ansehen",
  "Otwórz panel administratora": "Administratorbereich öffnen",
  "Zaloguj się kontem Google": "Mit Google anmelden",
  "Połącz zapis wyników z chmurą": "Ergebnisse mit der Cloud verbinden",
  "Wyłącz dźwięki": "Töne ausschalten",
  "Włącz dźwięki": "Töne einschalten",
  "Zamknij wybór wieku": "Altersauswahl schließen",
  "Zamknij wpisywanie kodu": "Codeeingabe schließen",
  "Zamknij bazę pytań": "Fragenpool schließen",
  "Zamknij poziomy kategorii": "Kategorien-Stufen schließen",
  "Zamknij historię nauki": "Lernverlauf schließen",
  "Zamknij logowanie": "Anmeldung schließen",
  "Zamknij informacje o koncie": "Kontoinformationen schließen",
  "Zamknij panel administratora": "Administratorbereich schließen",
  "Zamknij misję": "Mission schließen",
  "Postęp misji": "Missionsfortschritt"
}));

const ENGLISH_ARIA_TEXT = new Map(Object.entries({
  "Zmień wiek": "Change age",
  "Zdobyte punkty doświadczenia": "Experience points earned",
  "Sprawdź poziomy kategorii i progi XP": "Check category levels and XP thresholds",
  "Sprawdź historię nauki": "View learning history",
  "Otwórz panel administratora": "Open administrator panel",
  "Zaloguj się kontem Google": "Sign in with Google",
  "Połącz zapis wyników z chmurą": "Connect results to the cloud",
  "Wyłącz dźwięki": "Turn sounds off",
  "Włącz dźwięki": "Turn sounds on",
  "Zamknij wybór wieku": "Close age selection",
  "Zamknij wpisywanie kodu": "Close code entry",
  "Zamknij bazę pytań": "Close question bank",
  "Zamknij poziomy kategorii": "Close category levels",
  "Zamknij historię nauki": "Close learning history",
  "Zamknij logowanie": "Close sign in",
  "Zamknij informacje o koncie": "Close account information",
  "Zamknij panel administratora": "Close administrator panel",
  "Zamknij misję": "Close mission",
  "Postęp misji": "Mission progress"
}));

const TRAINERS = {
  math: { emoji: "🪐", name: "Aksolot Kalkulot", tag: ["MATMA", "MATHE", "MATH"], copy: ["Liczy szybciej, niż leci asteroida.", "Rechnet schneller, als ein Asteroid fliegt.", "Calculates faster than an asteroid can fly."] },
  polish: { emoji: "🦫", name: "Kapibara Profesara", tag: ["POLSKI", "POLNISCH", "POLISH"], copy: ["Spokojna głowa, nawet przy „ó” i „u”.", "Bleibt selbst bei schwierigen polnischen Wörtern ganz ruhig.", "Keeps calm even with the trickiest Polish words."] },
  english: { emoji: "🍞", name: "Tostobot Lingwistor", tag: ["ENGLISH", "ENGLISCH", "ENGLISH"], copy: ["Podaje angielskie słówka zawsze na czas.", "Serviert englische Wörter genau zur richtigen Zeit.", "Serves English words right on time."] },
  world: { emoji: "🤖", name: "Robot Odkrywator", tag: ["ŚWIAT", "WELT", "WORLD"], copy: ["Skanuje Ziemię, kosmos i sekrety przyrody.", "Scannt die Erde, den Weltraum und die Geheimnisse der Natur.", "Scans Earth, space and the secrets of nature."] },
  logic: { emoji: "🧩", name: "Lis Deduktor", tag: ["LOGIKA", "LOGIK", "LOGIC"], copy: ["Każdą zagadkę rozkłada na sprytne tropy.", "Zerlegt jedes Rätsel in clevere Hinweise.", "Breaks every puzzle into clever clues."] },
  reading: { emoji: "🦉", name: "Sowa Czytelniczka", tag: ["CZYTANIE", "LESEN", "READING"], copy: ["Pomaga zauważyć to, co ukryło się w tekście.", "Hilft dir, versteckte Hinweise im Text zu entdecken.", "Helps you spot clues hidden in the text."] },
  coding: { emoji: "👾", name: "Kodzik Debugator", tag: ["KODOWANIE", "CODING", "CODING"], copy: ["Łapie błędy i zamienia pomysły w algorytmy.", "Fängt Fehler und verwandelt Ideen in Algorithmen.", "Catches bugs and turns ideas into algorithms."] }
};

const SEED_QUESTION_BANK = {
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
    ],
    logic: [
      { prompt: "Wzór pod lupą", question: "Co będzie dalej: koło, kwadrat, koło, kwadrat, …?", answers: ["trójkąt", "koło", "gwiazda", "prostokąt"], answer: "koło", fact: "Elementy występują na zmianę: koło, kwadrat." },
      { prompt: "Liczbowy trop", question: "Która liczba nie pasuje: 2, 4, 6, 9, 10?", answers: ["2", "6", "9", "10"], answer: "9", fact: "Pozostałe liczby są parzyste, a 9 jest nieparzyste." },
      { prompt: "Robot na zakręcie", question: "Robot patrzy na północ i skręca w prawo. W którą stronę patrzy?", answers: ["na zachód", "na wschód", "na południe", "na północ"], answer: "na wschód", fact: "Prawo od północy wskazuje wschód." },
      { prompt: "Pudełkowa zagadka", question: "Czerwone pudełko jest większe od zielonego. Zielone jest większe od żółtego. Które jest najmniejsze?", answers: ["czerwone", "zielone", "żółte", "wszystkie są równe"], answer: "żółte", fact: "Skoro zielone jest większe od żółtego, a czerwone od zielonego, najmniejsze jest żółte." },
      { prompt: "Kod prawdy", question: "Jeśli wszystkie koty mają ogony, a Luna jest kotem, to Luna…", answers: ["ma ogon", "jest psem", "nie ma łap", "umie latać"], answer: "ma ogon", fact: "Luna należy do grupy kotów, więc ma cechę wspólną tej grupy." },
      { prompt: "Kolejka do rakiety", question: "Olek stoi przed Mają, a Maja przed Tymonem. Kto stoi pierwszy?", answers: ["Tymon", "Maja", "Olek", "nie wiadomo"], answer: "Olek", fact: "Olek jest przed Mają, która jest przed Tymonem." },
      { prompt: "Zegarowa łamigłówka", question: "Lekcja zaczęła się o 10:00 i trwała godzinę. O której się skończyła?", answers: ["10:30", "11:00", "11:30", "12:00"], answer: "11:00", fact: "Godzina po 10:00 to 11:00." }
    ],
    reading: [
      { prompt: "Przeczytaj uważnie", passage: "Maja zabrała do parku czerwony latawiec. Wiał mocny wiatr, więc latawiec uniósł się wysoko. Po chwili do Mai dołączył jej brat Kuba.", question: "Jaki kolor miał latawiec Mai?", answers: ["niebieski", "czerwony", "zielony", "żółty"], answer: "czerwony", fact: "W pierwszym zdaniu napisano, że latawiec był czerwony." },
      { prompt: "Leśna wiadomość", passage: "W sobotę Tymon poszedł z tatą do lasu. Zbierali grzyby do wiklinowego koszyka. Wrócili przed obiadem, bo zaczął padać deszcz.", question: "Dlaczego Tymon i tata wrócili przed obiadem?", answers: ["zgubili koszyk", "zaczął padać deszcz", "było już ciemno", "skończyły się grzyby"], answer: "zaczął padać deszcz", fact: "Ostatnie zdanie podaje powód wcześniejszego powrotu." },
      { prompt: "Misja biblioteka", passage: "Zosia wypożyczyła książkę o kosmosie. Najbardziej zainteresował ją rozdział o Marsie. Książkę ma oddać w następny wtorek.", question: "O jakiej planecie Zosia czytała najchętniej?", answers: ["o Ziemi", "o Wenus", "o Marsie", "o Saturnie"], answer: "o Marsie", fact: "Tekst mówi, że najbardziej zainteresował ją rozdział o Marsie." },
      { prompt: "Śniadanie mistrza", passage: "Bartek przygotował kanapkę z serem i pomidorem. Do picia wybrał wodę. Jabłko schował do plecaka na drugie śniadanie.", question: "Co Bartek schował do plecaka?", answers: ["kanapkę", "ser", "butelkę mleka", "jabłko"], answer: "jabłko", fact: "Jabłko miało być drugim śniadaniem." },
      { prompt: "Rowerowy plan", passage: "Ania chciała pojechać rowerem do babci. Najpierw sprawdziła powietrze w oponach i założyła kask. Potem ruszyła ścieżką wzdłuż rzeki.", question: "Co Ania zrobiła przed wyjazdem?", answers: ["kupiła nowy rower", "sprawdziła opony i założyła kask", "zadzwoniła po autobus", "poszła nad jezioro"], answer: "sprawdziła opony i założyła kask", fact: "Te dwie czynności wykonała przed ruszeniem w drogę." },
      { prompt: "Nocny obserwator", passage: "Wieczorem Filip ustawił teleskop na balkonie. Niebo było bezchmurne, dlatego dobrze widział Księżyc. Zrobił rysunek jego kształtu w zeszycie.", question: "Dlaczego Filip dobrze widział Księżyc?", answers: ["było bezchmurnie", "stał w ogrodzie", "Księżyc był bardzo blisko", "zapalił lampę"], answer: "było bezchmurnie", fact: "Brak chmur ułatwił obserwację Księżyca." },
      { prompt: "Pomoc dla psa", passage: "Przed sklepem siedział mały pies. Ola zauważyła, że nie ma wody. Poprosiła sprzedawcę o miskę i nalała do niej wodę.", question: "Jak Ola pomogła psu?", answers: ["dała mu zabawkę", "zabrała go do domu", "nalała mu wodę", "kupiła mu obrożę"], answer: "nalała mu wodę", fact: "Ola poprosiła o miskę i napełniła ją wodą." }
    ],
    coding: [
      { prompt: "Robot wykonuje rozkazy", question: "Jak nazywa się dokładna lista kroków prowadzących do celu?", answers: ["algorytm", "ekran", "hasło", "piksel"], answer: "algorytm", fact: "Algorytm to uporządkowany zestaw kroków." },
      { prompt: "Kolejność ma znaczenie", question: "Co robot powinien zrobić najpierw, aby otworzyć zamknięte drzwi kluczem?", answers: ["wejść do pokoju", "włożyć klucz do zamka", "zamknąć drzwi", "odłożyć klucz"], answer: "włożyć klucz do zamka", fact: "Instrukcje wykonujemy we właściwej kolejności." },
      { prompt: "Powtarzalna moc", question: "Która instrukcja oznacza wykonanie skoku cztery razy?", answers: ["skocz raz", "powtórz 4 razy: skocz", "idź w lewo", "zatrzymaj się"], answer: "powtórz 4 razy: skocz", fact: "Pętla pozwala powtarzać tę samą czynność." },
      { prompt: "Łowca błędów", question: "Robot miał skręcić w prawo, ale skręcił w lewo. Co trzeba znaleźć w instrukcji?", answers: ["bonus", "błąd", "obrazek", "hasło"], answer: "błąd", fact: "Szukanie i poprawianie błędów nazywamy debugowaniem." },
      { prompt: "Decyzja programu", question: "Instrukcja mówi: JEŚLI pada, weź parasol. Pada deszcz. Co robisz?", answers: ["biorę parasol", "zakładam okulary", "otwieram okno", "nic"], answer: "biorę parasol", fact: "Warunek jest spełniony, więc wykonujemy przypisaną czynność." },
      { prompt: "Ekran z klocków", question: "Jak nazywa się najmniejszy kolorowy punkt obrazu na ekranie?", answers: ["piksel", "kabel", "folder", "klawisz"], answer: "piksel", fact: "Obraz na ekranie jest zbudowany z pikseli." },
      { prompt: "Komenda startowa", question: "Która komenda najlepiej każe duszkowi przesunąć się do przodu?", answers: ["idź 10 kroków", "zmień kolor", "zagraj dźwięk", "ukryj się"], answer: "idź 10 kroków", fact: "Komenda ruchu zmienia położenie duszka." }
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
    ],
    logic: [
      { prompt: "Sekwencja turbo", question: "Jaka liczba będzie następna: 3, 6, 12, 24, …?", answers: ["27", "36", "42", "48"], answer: "48", fact: "Każda kolejna liczba jest dwa razy większa." },
      { prompt: "Wyklucz intruza", question: "Które słowo nie pasuje: trójkąt, kwadrat, koło, sześcian?", answers: ["trójkąt", "kwadrat", "koło", "sześcian"], answer: "sześcian", fact: "Sześcian jest bryłą, a pozostałe figury są płaskie." },
      { prompt: "Kod pudełek", question: "Pudełko A jest cięższe od B. Pudełko C jest cięższe od A. Które jest najcięższe?", answers: ["A", "B", "C", "nie da się ustalić"], answer: "C", fact: "C jest cięższe od A, a A od B." },
      { prompt: "Warunek podwójny", question: "Do klubu wchodzi osoba, która ma bilet ORAZ opaskę. Tymon ma tylko bilet. Czy wejdzie?", answers: ["tak", "nie", "tylko rano", "nie wiadomo"], answer: "nie", fact: "Słowo ORAZ oznacza, że oba warunki muszą być spełnione." },
      { prompt: "Kalendarzowy trop", question: "Dziś jest środa. Jaki dzień będzie za 5 dni?", answers: ["piątek", "sobota", "niedziela", "poniedziałek"], answer: "poniedziałek", fact: "Czwartek 1, piątek 2, sobota 3, niedziela 4, poniedziałek 5." },
      { prompt: "Szyfr literowy", question: "Jeśli A = 1, B = 2, C = 3, to ile wynosi B + C?", answers: ["3", "4", "5", "6"], answer: "5", fact: "B ma wartość 2, C ma wartość 3, więc razem 5." },
      { prompt: "Prawda czy fałsz", question: "Każdy kwadrat jest prostokątem. Figura X jest kwadratem. Czym na pewno jest X?", answers: ["kołem", "trójkątem", "prostokątem", "pięciokątem"], answer: "prostokątem", fact: "Z podanych informacji wynika, że każdy kwadrat należy też do prostokątów." }
    ],
    reading: [
      { prompt: "Czytelniczy radar", passage: "W poniedziałek klasa Tymona odwiedziła muzeum techniki. Przewodnik pokazał uczniom stare komputery i pierwszy polski motocykl. Najwięcej pytań dzieci zadały przy robocie, który potrafił rysować.", question: "Który eksponat wzbudził najwięcej pytań?", answers: ["stary komputer", "motocykl", "rysujący robot", "radio"], answer: "rysujący robot", fact: "Ostatnie zdanie wskazuje robota jako najciekawszy dla dzieci eksponat." },
      { prompt: "Plan wyprawy", passage: "Natalia zaplanowała wycieczkę nad jezioro. Prognoza zapowiadała słońce rano i burzę po południu. Rodzina wyruszyła wcześnie, aby wrócić przed zmianą pogody.", question: "Dlaczego rodzina wyruszyła wcześnie?", answers: ["chciała uniknąć burzy", "jezioro było daleko", "zgubiła mapę", "rano było zimniej"], answer: "chciała uniknąć burzy", fact: "Wcześniejszy wyjazd miał pozwolić wrócić przed popołudniową burzą." },
      { prompt: "Mały wynalazca", passage: "Igor zbudował z kartonu model łazika. Koła wykonał z plastikowych zakrętek, a antenę ze słomki. Model nie jeździł, ale służył do prezentacji na lekcji.", question: "Do czego służył model Igora?", answers: ["do wyścigów", "do prezentacji", "do przewożenia klocków", "do mierzenia pogody"], answer: "do prezentacji", fact: "Tekst wyjaśnia, że nieruchomy model był potrzebny na prezentację." },
      { prompt: "Zagadka ogrodu", passage: "Pani Lena posadziła obok siebie miętę, bazylię i rozmaryn. Mięta rosła najszybciej, dlatego trzeba było ją częściej przycinać. Bazylię ustawiła bliżej okna, bo potrzebowała więcej światła.", question: "Która roślina wymagała częstszego przycinania?", answers: ["bazylia", "mięta", "rozmaryn", "wszystkie"], answer: "mięta", fact: "Mięta rosła najszybciej, więc przycinano ją częściej." },
      { prompt: "Sportowa decyzja", passage: "Mecz miał rozpocząć się o siedemnastej. Drużyna przyjechała pół godziny wcześniej, aby zrobić rozgrzewkę. Trener skrócił ją, ponieważ zaczął padać mocny deszcz.", question: "O której drużyna przyjechała na boisko?", answers: ["16:00", "16:30", "17:00", "17:30"], answer: "16:30", fact: "Pół godziny przed 17:00 to 16:30." },
      { prompt: "Tajemnica paczki", passage: "Kurier zostawił paczkę u sąsiadki, ponieważ nikogo nie było w domu. Po powrocie mama przeczytała wiadomość na drzwiach. Tymon odebrał przesyłkę jeszcze tego samego wieczoru.", question: "Skąd mama wiedziała, gdzie jest paczka?", answers: ["zadzwonił kurier", "przeczytała wiadomość na drzwiach", "powiedział jej Tymon", "sprawdziła w sklepie"], answer: "przeczytała wiadomość na drzwiach", fact: "Informację o miejscu paczki znalazła w wiadomości." },
      { prompt: "Ekologiczna misja", passage: "Uczniowie zauważyli dużo śmieci wokół szkolnego boiska. W piątek zorganizowali sprzątanie i podzielili odpady na papier, plastik oraz szkło. Po akcji ustawili trzy opisane pojemniki.", question: "Co uczniowie zrobili po sprzątaniu?", answers: ["zamknęli boisko", "ustawili opisane pojemniki", "posadzili drzewa", "odwołali lekcje"], answer: "ustawili opisane pojemniki", fact: "Ostatnie zdanie opisuje działanie wykonane po akcji." }
    ],
    coding: [
      { prompt: "Zmienna przechowuje moc", question: "Zmienna punkty ma wartość 5. Dodajemy do niej 3. Jaka jest nowa wartość?", answers: ["2", "5", "8", "15"], answer: "8", fact: "Zmienna przechowuje liczbę, którą można zmienić: 5 + 3 = 8." },
      { prompt: "Pętla w akcji", question: "Program powtarza komendę „klaśnij” 3 razy. Ile razy usłyszymy klaśnięcie?", answers: ["1", "2", "3", "6"], answer: "3", fact: "Pętla wykonuje komendę dokładnie tyle razy, ile podano." },
      { prompt: "Warunek logiczny", question: "JEŚLI punkty są większe niż 10, pokaż medal. Punkty wynoszą 12. Co zrobi program?", answers: ["pokaże medal", "wyzeruje punkty", "zamknie grę", "nic nie zrobi"], answer: "pokaże medal", fact: "12 jest większe od 10, więc warunek jest prawdziwy." },
      { prompt: "Przewidź wynik", question: "Robot wykonuje: krok, krok, obrót w prawo, krok. Ile kroków zrobił łącznie?", answers: ["2", "3", "4", "5"], answer: "3", fact: "Obrót nie jest krokiem, więc robot wykonał trzy kroki." },
      { prompt: "Debugowanie", question: "Program miał dodać liczby, ale je odejmuje. Jak nazywa się poprawianie takiego problemu?", answers: ["zapisywanie", "debugowanie", "drukowanie", "logowanie"], answer: "debugowanie", fact: "Debugowanie to znajdowanie i naprawianie błędów w programie." },
      { prompt: "Wartość logiczna", question: "Która para oznacza dwie podstawowe wartości logiczne?", answers: ["duży i mały", "prawda i fałsz", "start i meta", "zero i dziesięć"], answer: "prawda i fałsz", fact: "Warunki w programach przyjmują wartości prawda albo fałsz." },
      { prompt: "Dobra kolejność", question: "Chcesz narysować kwadrat. Która instrukcja jest najlepsza?", answers: ["powtórz 4 razy: idź i skręć o 90 stopni", "idź bez końca", "skręć raz o 45 stopni", "narysuj trzy koła"], answer: "powtórz 4 razy: idź i skręć o 90 stopni", fact: "Kwadrat ma cztery równe boki i cztery kąty proste." }
    ]
  }
};

const QUESTION_BANK = window.TYMO_CONTENT.buildQuestionBank(SEED_QUESTION_BANK);
const SUBJECT_KEYS = Object.keys(QUESTION_BANK[8]);
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9500];
const DAILY_CATEGORY_GOAL = 120;
const HISTORY_DAYS_LIMIT = 365;

const STORAGE_KEY = "tymomoc-progress-v1";
const AGE_KEY = "tymomoc-age";
const SOUND_KEY = "tymomoc-sound";
const SYNC_CODE_KEY = "tymomoc-sync-code-v1";
const AUTH_TOKEN_KEY = "tymomoc-auth-token-v1";
const LANGUAGE_KEY = "tymomoc-language-v1";
const PROGRESS_MIGRATION_OWNER_KEY = "tymomoc-progress-owner-v1";
const FALLBACK_API_BASE_URL = "https://tymomoc-api.damianolbrys5.workers.dev";
let apiBaseUrl = FALLBACK_API_BASE_URL;

const els = {
  languagePicker: document.querySelector("#language-picker"),
  languageToggle: document.querySelector("#language-toggle"),
  languageMenu: document.querySelector("#language-menu"),
  languageOptions: [...document.querySelectorAll(".language-option")],
  languageFlag: document.querySelector("#language-flag"),
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
  levelsToggle: document.querySelector("#levels-toggle"),
  levelsModal: document.querySelector("#levels-modal"),
  levelsClose: document.querySelector("#levels-close"),
  levelsCopy: document.querySelector("#levels-copy"),
  categoryProgressList: document.querySelector("#category-progress-list"),
  levelThresholdGrid: document.querySelector("#level-threshold-grid"),
  historyToggle: document.querySelector("#history-toggle"),
  historyModal: document.querySelector("#history-modal"),
  historyClose: document.querySelector("#history-close"),
  historyCopy: document.querySelector("#history-copy"),
  historySummary: document.querySelector("#history-summary"),
  historyList: document.querySelector("#history-list"),
  motivationTitle: document.querySelector("#motivation-title"),
  accountToggle: document.querySelector("#account-toggle"),
  accountAvatar: document.querySelector("#account-avatar"),
  accountName: document.querySelector("#account-name"),
  accountStatus: document.querySelector("#account-status"),
  authModal: document.querySelector("#auth-modal"),
  authClose: document.querySelector("#auth-close"),
  authCopy: document.querySelector("#auth-copy"),
  authMessage: document.querySelector("#auth-message"),
  authRefresh: document.querySelector("#auth-refresh"),
  googleSignin: document.querySelector("#google-signin"),
  accountModal: document.querySelector("#account-modal"),
  accountClose: document.querySelector("#account-close"),
  accountTitle: document.querySelector("#account-title"),
  accountEmail: document.querySelector("#account-email"),
  accountState: document.querySelector("#account-state"),
  accountProfileAvatar: document.querySelector("#account-profile-avatar"),
  logoutButton: document.querySelector("#logout-button"),
  adminToggle: document.querySelector("#admin-toggle"),
  adminModal: document.querySelector("#admin-modal"),
  adminClose: document.querySelector("#admin-close"),
  adminSummary: document.querySelector("#admin-summary"),
  adminUsers: document.querySelector("#admin-users"),
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

const emptyCategoryProgress = () => ({ xp: 0, correct: 0, wrong: 0, completed: 0 });
const emptyCategories = () => Object.fromEntries(SUBJECT_KEYS.map((subject) => [subject, emptyCategoryProgress()]));
const emptyProgress = () => ({
  xp: 0,
  streak: 0,
  completed: 0,
  correct: 0,
  today: { date: localDate(), count: 0 },
  categories: emptyCategories(),
  history: {}
});

let age = Number(safeGet(AGE_KEY)) || 8;
let language = ["pl", "de", "en"].includes(safeGet(LANGUAGE_KEY)) ? safeGet(LANGUAGE_KEY) : "pl";
let soundOn = safeGet(SOUND_KEY) !== "off";
let progress = loadProgress();
let syncCode = normalizeSyncCode(safeGet(SYNC_CODE_KEY) || "");
let authToken = safeGet(AUTH_TOKEN_KEY) || "";
let currentUser = null;
let authConfig = null;
let googleReadyTimer = null;
let activeProgressOwner = "guest";
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

function localized(polish, german, english) {
  return language === "de" ? german : language === "en" ? english : polish;
}

function languageIndex() {
  return language === "de" ? 1 : language === "en" ? 2 : 0;
}

function subjectName(subject) {
  const meta = SUBJECTS[subject];
  return localized(meta.name, meta.nameDe, meta.nameEn);
}

function currentLocale() {
  return localized("pl-PL", "de-DE", "en-GB");
}

function translateStaticText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!node._tymoPolishText && (GERMAN_STATIC_TEXT.has(trimmed) || ENGLISH_STATIC_TEXT.has(trimmed))) node._tymoPolishText = trimmed;
    if (node._tymoPolishText) {
      const translated = language === "de"
        ? (GERMAN_STATIC_TEXT.get(node._tymoPolishText) || node._tymoPolishText)
        : language === "en"
          ? (ENGLISH_STATIC_TEXT.get(node._tymoPolishText) || node._tymoPolishText)
          : node._tymoPolishText;
      node.nodeValue = raw.replace(trimmed, translated);
    }
    node = walker.nextNode();
  }

  document.querySelectorAll("[aria-label]").forEach((element) => {
    const current = element.getAttribute("aria-label");
    if (!element.dataset.tymoPolishAria && (GERMAN_ARIA_TEXT.has(current) || ENGLISH_ARIA_TEXT.has(current))) element.dataset.tymoPolishAria = current;
    if (element.dataset.tymoPolishAria) {
      element.setAttribute("aria-label", language === "de"
        ? (GERMAN_ARIA_TEXT.get(element.dataset.tymoPolishAria) || element.dataset.tymoPolishAria)
        : language === "en"
          ? (ENGLISH_ARIA_TEXT.get(element.dataset.tymoPolishAria) || element.dataset.tymoPolishAria)
          : element.dataset.tymoPolishAria);
    }
  });
}

function renderTrainers() {
  document.querySelectorAll("[data-trainer]").forEach((card) => {
    const trainer = TRAINERS[card.dataset.trainer];
    const copyIndex = languageIndex();
    card.querySelector(".crew-emoji").textContent = trainer.emoji;
    card.querySelector("h3").textContent = trainer.name;
    card.querySelector("p").textContent = trainer.copy[copyIndex];
    card.querySelector(".crew-tag").textContent = trainer.tag[copyIndex];
  });
}

function applyLanguageShell() {
  document.documentElement.lang = language;
  document.title = localized("TymoMoc — nauka w trybie turbo", "TymoMoc – Lernen im Turbomodus", "TymoMoc — learning in turbo mode");
  document.querySelector('meta[name="description"]')?.setAttribute("content", localized(
    "TymoMoc — kolorowe misje edukacyjne dla dzieci w wieku 8 i 9 lat.",
    "TymoMoc – bunte Lernmissionen für Kinder im Alter von 8 und 9 Jahren.",
    "TymoMoc — colourful learning missions for children aged 8 and 9."
  ));

  els.languageFlag.textContent = localized("🇵🇱", "🇩🇪", "🇬🇧");
  els.languageToggle.title = localized("Wybierz język", "Sprache auswählen", "Choose language");
  els.languageToggle.setAttribute("aria-label", localized("Wybierz język", "Sprache auswählen", "Choose language"));
  els.languageMenu.setAttribute("aria-label", localized("Wybór języka", "Sprachauswahl", "Language selection"));

  document.querySelector(".hero-copy > p").textContent = localized(
    "Krótkie misje, szybkie punkty i zero nudy. Matematyka, polski, angielski i świat — wszystko dopasowane do wieku.",
    "Kurze Missionen, schnelle Punkte und keine Langeweile. Mathe, Polnisch, Englisch und die Welt – passend zu deinem Alter.",
    "Short missions, quick points and zero boredom. Maths, Polish, English and the world — all matched to your age."
  );

  const cardNames = {
    math: ["Matma<br />Bez Spiny", "Mathe<br />Ohne Stress", "Math<br />Without Stress"],
    polish: ["Polski<br />Kombinator", "Polnisch<br />Kombinator", "Polish<br />Word Master"],
    english: ["English<br />Level Up", "Englisch<br />Level-up", "English<br />Level Up"],
    world: ["Świat<br />Na Opak", "Welt<br />Entdecken", "Discover<br />The World"],
    logic: ["Logika<br />Bez Luk", "Logik<br />Ohne Lücken", "Logic<br />Without Gaps"],
    reading: ["Czytam<br />I Kumam", "Lesen<br />Und Verstehen", "Read<br />And Understand"],
    coding: ["Kodowanie<br />Od Zera", "Coding<br />Ab Null", "Coding<br />From Scratch"]
  };
  els.subjectCards.forEach((card) => {
    card.querySelector(".subject-name").innerHTML = cardNames[card.dataset.subject][languageIndex()];
    card.querySelector(".category-daily-goal small").textContent = localized("dzisiaj", "heute", "today");
  });
  els.ageOptions.forEach((option) => {
    option.querySelector("strong").textContent = localized(`${option.dataset.age} lat`, `${option.dataset.age} Jahre`, `${option.dataset.age} years`);
  });

  translateStaticText();
  const languageChoices = {
    pl: { flag: "🇵🇱", name: "Polski", country: "Polska" },
    de: { flag: "🇩🇪", name: "Deutsch", country: "Deutschland" },
    en: { flag: "🇬🇧", name: "English", country: "United Kingdom" }
  };
  els.languageOptions.forEach((option) => {
    const choice = languageChoices[option.dataset.language];
    option.querySelector(".language-option-flag").textContent = choice.flag;
    option.querySelector("strong").textContent = choice.name;
    option.querySelector("small").textContent = choice.country;
    option.setAttribute("aria-checked", String(option.dataset.language === language));
  });
  renderTrainers();
}

function closeLanguageMenu({ restoreFocus = false } = {}) {
  if (els.languageMenu.hidden) return;
  els.languageMenu.hidden = true;
  els.languageToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) els.languageToggle.focus();
}

function openLanguageMenu() {
  els.languageMenu.hidden = false;
  els.languageToggle.setAttribute("aria-expanded", "true");
  els.languageOptions.forEach((option) => {
    option.setAttribute("aria-checked", String(option.dataset.language === language));
  });
  window.requestAnimationFrame(() => {
    els.languageOptions.find((option) => option.dataset.language === language)?.focus();
  });
}

function toggleLanguageMenu() {
  if (els.languageMenu.hidden) openLanguageMenu();
  else closeLanguageMenu({ restoreFocus: true });
}

function chooseLanguage(nextLanguage) {
  if (!["pl", "de", "en"].includes(nextLanguage)) return;
  const changed = nextLanguage !== language;
  closeLanguageMenu({ restoreFocus: true });
  if (!changed) return;
  language = nextLanguage;
  safeSet(LANGUAGE_KEY, language);
  updateUI();
  setSyncState(syncCode ? "waiting" : "local");
  updateAccountUI();
  renderGoogleButton();
  showToast(localized("Język polski jest aktywny 🇵🇱", "Deutsch ist aktiv 🇩🇪", "English is active 🇬🇧"));
}

function safeCount(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.trunc(number)) : 0;
}

function emptyActivity() {
  return { xp: 0, correct: 0, wrong: 0, missions: 0, questions: 0 };
}

function normalizeHistory(source = {}) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return {};
  const dates = Object.keys(source)
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort()
    .slice(-HISTORY_DAYS_LIMIT);
  return Object.fromEntries(dates.map((date) => {
    const categories = {};
    SUBJECT_KEYS.forEach((subject) => {
      const entry = source[date]?.[subject];
      if (!entry) return;
      categories[subject] = {
        xp: safeCount(entry.xp),
        correct: safeCount(entry.correct),
        wrong: safeCount(entry.wrong),
        missions: safeCount(entry.missions),
        questions: safeCount(entry.questions)
      };
    });
    return [date, categories];
  }));
}

function mergeHistory(left = {}, right = {}) {
  const result = {};
  const dates = [...new Set([...Object.keys(left || {}), ...Object.keys(right || {})])]
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort()
    .slice(-HISTORY_DAYS_LIMIT);

  dates.forEach((date) => {
    const categories = {};
    SUBJECT_KEYS.forEach((subject) => {
      const local = left?.[date]?.[subject] || emptyActivity();
      const remote = right?.[date]?.[subject] || emptyActivity();
      const merged = {
        xp: Math.max(safeCount(local.xp), safeCount(remote.xp)),
        correct: Math.max(safeCount(local.correct), safeCount(remote.correct)),
        wrong: Math.max(safeCount(local.wrong), safeCount(remote.wrong)),
        missions: Math.max(safeCount(local.missions), safeCount(remote.missions)),
        questions: Math.max(safeCount(local.questions), safeCount(remote.questions))
      };
      if (Object.values(merged).some(Boolean)) categories[subject] = merged;
    });
    if (Object.keys(categories).length) result[date] = categories;
  });
  return result;
}

function getActivity(levelProgress, date, subject) {
  return levelProgress.history?.[date]?.[subject] || emptyActivity();
}

function recordActivity(levelProgress, subject, activity) {
  const date = localDate();
  levelProgress.history ||= {};
  levelProgress.history[date] ||= {};
  const current = levelProgress.history[date][subject] || emptyActivity();
  levelProgress.history[date][subject] = {
    xp: current.xp + safeCount(activity.xp),
    correct: current.correct + safeCount(activity.correct),
    wrong: current.wrong + safeCount(activity.wrong),
    missions: current.missions + safeCount(activity.missions),
    questions: current.questions + safeCount(activity.questions)
  };
  levelProgress.history = normalizeHistory(levelProgress.history);
}

function normalizeAgeProgress(source = {}) {
  const normalized = { ...emptyProgress(), ...source, categories: emptyCategories(), history: normalizeHistory(source.history) };
  SUBJECT_KEYS.forEach((subject) => {
    const category = source.categories?.[subject] || {};
    normalized.categories[subject] = {
      xp: safeCount(category.xp),
      correct: safeCount(category.correct),
      wrong: safeCount(category.wrong),
      completed: safeCount(category.completed)
    };
  });
  return normalized;
}

function loadProgress(storageKey = STORAGE_KEY) {
  let saved = {};
  try { saved = JSON.parse(safeGet(storageKey) || "{}"); } catch { saved = {}; }

  const result = {
    8: normalizeAgeProgress(saved[8] || {}),
    9: normalizeAgeProgress(saved[9] || {})
  };

  [8, 9].forEach((level) => {
    if (!result[level].today || result[level].today.date !== localDate()) {
      result[level].today = { date: localDate(), count: 0 };
    }
  });
  return result;
}

function progressStorageKey(owner = activeProgressOwner) {
  return owner === "guest" ? STORAGE_KEY : `${STORAGE_KEY}:user:${owner}`;
}

function saveProgress({ cloud = true } = {}) {
  safeSet(progressStorageKey(), JSON.stringify(progress));
  if (cloud && (authToken || syncCode)) scheduleCloudSave();
}

function activateUserProgress(user) {
  const owner = String(user?.id || "");
  if (!owner || activeProgressOwner === owner) return;

  safeSet(progressStorageKey(), JSON.stringify(progress));
  const userStorageKey = progressStorageKey(owner);
  const savedUserProgress = safeGet(userStorageKey);

  if (savedUserProgress) {
    progress = loadProgress(userStorageKey);
  } else if (user.role !== "admin" && !safeGet(PROGRESS_MIGRATION_OWNER_KEY)) {
    safeSet(PROGRESS_MIGRATION_OWNER_KEY, owner);
    safeSet(userStorageKey, JSON.stringify(progress));
  } else {
    progress = { 8: emptyProgress(), 9: emptyProgress() };
  }

  activeProgressOwner = owner;
  updateUI();
}

function activateGuestProgress() {
  if (activeProgressOwner === "guest") return;
  safeSet(progressStorageKey(), JSON.stringify(progress));
  activeProgressOwner = "guest";
  progress = loadProgress(STORAGE_KEY);
  updateUI();
}

function normalizeSyncCode(value) {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function setSyncState(state) {
  const germanStates = {
    local: { icon: "☁", label: "Cloud-Speicherung aktivieren", detail: "Ergebnisse sind auf diesem Gerät gespeichert" },
    waiting: { icon: "☁", label: "Cloud-Speicherung aktiv", detail: "Warten auf die Synchronisierung" },
    syncing: { icon: "↻", label: "Ergebnisse werden synchronisiert…", detail: "Verbindung zur sicheren Datenbank" },
    synced: { icon: "✓", label: "Ergebnisse sind in der Cloud", detail: "Die Synchronisierung läuft automatisch" },
    error: { icon: "!", label: "Synchronisierung fehlgeschlagen", detail: "Die Ergebnisse sind weiterhin auf diesem Gerät sicher" }
  };
  const englishStates = {
    local: { icon: "☁", label: "Enable cloud saves", detail: "Results are saved on this device" },
    waiting: { icon: "☁", label: "Cloud saves enabled", detail: "Waiting to synchronise" },
    syncing: { icon: "↻", label: "Synchronising results…", detail: "Connecting to the secure database" },
    synced: { icon: "✓", label: "Results are in the cloud", detail: "Synchronisation works automatically" },
    error: { icon: "!", label: "Synchronisation failed", detail: "Results are still safe on this device" }
  };
  const polishStates = {
    local: { icon: "☁", label: "Włącz zapis w chmurze", detail: "Wyniki są zapisane na tym urządzeniu" },
    waiting: { icon: "☁", label: "Zapis w chmurze włączony", detail: "Oczekiwanie na synchronizację" },
    syncing: { icon: "↻", label: "Synchronizuję wyniki…", detail: "Łączę się z bezpieczną bazą" },
    synced: { icon: "✓", label: "Wyniki są w chmurze", detail: "Synchronizacja działa automatycznie" },
    error: { icon: "!", label: "Nie udało się zsynchronizować", detail: "Wyniki nadal są bezpieczne na tym urządzeniu" }
  };
  const states = language === "de" ? germanStates : language === "en" ? englishStates : polishStates;
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
    const categories = emptyCategories();

    SUBJECT_KEYS.forEach((subject) => {
      const localCategory = local.categories?.[subject] || emptyCategoryProgress();
      const remoteCategory = remote.categories?.[subject] || emptyCategoryProgress();
      categories[subject] = {
        xp: Math.max(safeCount(localCategory.xp), safeCount(remoteCategory.xp)),
        correct: Math.max(safeCount(localCategory.correct), safeCount(remoteCategory.correct)),
        wrong: Math.max(safeCount(localCategory.wrong), safeCount(remoteCategory.wrong)),
        completed: Math.max(safeCount(localCategory.completed), safeCount(remoteCategory.completed))
      };
    });

    merged[level] = {
      xp: Math.max(Number(local.xp) || 0, Number(remote.xp) || 0),
      streak: Math.max(Number(local.streak) || 0, Number(remote.streak) || 0),
      completed: Math.max(Number(local.completed) || 0, Number(remote.completed) || 0),
      correct: Math.max(Number(local.correct) || 0, Number(remote.correct) || 0),
      today: { date: today, count: Math.max(localToday, remoteToday) },
      categories,
      history: mergeHistory(local.history, remote.history)
    };
  });

  return merged;
}

async function cloudRequest(method, body) {
  const credential = authToken || syncCode;
  const response = await fetch(`${apiBaseUrl}/api/progress`, {
    method,
    headers: {
      authorization: `Bearer ${credential}`,
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

async function apiRequest(path, { method = "GET", body, token = authToken, baseUrl = apiBaseUrl } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(body ? { "content-type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store"
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Nie udało się połączyć z serwerem.");
    error.status = response.status;
    error.payload = payload;
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
  if (!authToken && !syncCode) return;
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
    if (error.status === 401 || error.status === 403) {
      if (authToken) {
        authToken = "";
        currentUser = null;
        safeRemove(AUTH_TOKEN_KEY);
        updateAccountUI();
      } else {
        syncCode = "";
        safeRemove(SYNC_CODE_KEY);
      }
      setSyncState("local");
      if (showMessage) showToast(error.status === 403 ? "Konto nie ma dostępu do chmury" : "Dane logowania są nieprawidłowe");
      return;
    }
    setSyncState("error");
    if (showMessage) showToast("Brak połączenia z chmurą — spróbujemy później");
  }
}

async function connectCloudSync() {
  if (authToken || syncCode) {
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
  if (language === "de") return `${count} ${count === 1 ? "Frage" : "Fragen"}`;
  if (language === "en") return `${count} ${count === 1 ? "question" : "questions"}`;
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
  els.questionCountTitle.textContent = localized(`Pytania dla ${age} lat`, `Fragen für ${age} Jahre`, `Questions for age ${age}`);

  els.subjectCards.forEach((card) => {
    const count = QUESTION_BANK[age][card.dataset.subject].length;
    card.querySelector(".subject-question-count").textContent = `${formatQuestionCount(count)} ${localized("łącznie", "insgesamt", "in total")}`;
  });

  els.questionCountList.innerHTML = entries.map(([subject, questions]) => {
    const meta = SUBJECTS[subject];
    return `
      <div class="question-count-row">
        <span class="question-count-subject-icon" style="--subject-color: ${meta.color}" aria-hidden="true">${meta.icon}</span>
        <span><strong>${subjectName(subject)}</strong><small>${localized(`pełna pula dla poziomu ${age} lat`, `vollständiger Pool für ${age} Jahre`, `complete pool for age ${age}`)}</small></span>
        <b>${formatQuestionCount(questions.length)}</b>
      </div>`;
  }).join("");
}

function levelForXp(xp) {
  let level = 1;
  LEVEL_THRESHOLDS.forEach((threshold, index) => {
    if (xp >= threshold) level = index + 1;
  });
  return level;
}

function updateCategoryProgress() {
  const categories = progress[age].categories;
  els.levelsCopy.textContent = localized(
    `Wyniki dla poziomu ${age} lat. Każda kategoria zdobywa własny XP, a 15. poziom wymaga regularnego treningu.`,
    `Ergebnisse für ${age} Jahre. Jede Kategorie sammelt eigene XP; Stufe 15 erfordert regelmäßiges Training.`,
    `Results for age ${age}. Each category earns its own XP, and level 15 requires regular training.`
  );

  els.categoryProgressList.innerHTML = SUBJECT_KEYS.map((subject) => {
    const meta = SUBJECTS[subject];
    const stats = categories[subject] || emptyCategoryProgress();
    const xp = safeCount(stats.xp);
    const level = levelForXp(xp);
    const currentThreshold = LEVEL_THRESHOLDS[level - 1];
    const nextThreshold = LEVEL_THRESHOLDS[level] ?? currentThreshold;
    const progressPercent = level === 15
      ? 100
      : Math.min(100, Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100));
    const answers = safeCount(stats.correct) + safeCount(stats.wrong);
    const correctPercent = answers ? Math.round((safeCount(stats.correct) / answers) * 100) : 0;
    const wrongPercent = answers ? 100 - correctPercent : 0;
    const xpTarget = level === 15 ? "MAX" : `${xp.toLocaleString(currentLocale())} / ${nextThreshold.toLocaleString(currentLocale())} XP`;

    return `
      <article class="category-progress-card" style="--subject-color: ${meta.color}">
        <div class="category-progress-heading">
          <span class="category-progress-icon" aria-hidden="true">${meta.icon}</span>
          <span><strong>${subjectName(subject)}</strong><small>${xp.toLocaleString(currentLocale())} XP ${localized("w kategorii", "in dieser Kategorie", "in this category")}</small></span>
          <b>${localized("POZIOM", "STUFE", "LEVEL")} ${level}</b>
        </div>
        <div class="category-level-track" aria-label="${localized("Postęp do następnego poziomu", "Fortschritt zur nächsten Stufe", "Progress to the next level")}"><span style="width: ${progressPercent}%"></span></div>
        <div class="category-level-meta"><span>${xpTarget}</span><span>${progressPercent}% ${localized("drogi", "des Weges", "complete")}</span></div>
        <div class="answer-stat-grid">
          <span class="answer-stat-good"><strong>${safeCount(stats.correct)} · ${correctPercent}%</strong><small>${localized("dobre odpowiedzi", "richtige Antworten", "correct answers")}</small></span>
          <span class="answer-stat-wrong"><strong>${safeCount(stats.wrong)} · ${wrongPercent}%</strong><small>${localized("złe odpowiedzi", "falsche Antworten", "wrong answers")}</small></span>
        </div>
      </article>`;
  }).join("");

  els.levelThresholdGrid.innerHTML = LEVEL_THRESHOLDS.map((threshold, index) => `
    <div class="level-threshold-item${index === 14 ? " final" : ""}">
      <span>${localized("Poziom", "Stufe", "Level")} ${index + 1}</span>
      <strong>${threshold.toLocaleString(currentLocale())} XP</strong>
    </div>`).join("");
}

function updateDailyGoals() {
  const current = progress[age];
  const today = localDate();
  els.subjectCards.forEach((card) => {
    const activity = getActivity(current, today, card.dataset.subject);
    const percent = Math.min(100, Math.round((activity.xp / DAILY_CATEGORY_GOAL) * 100));
    card.querySelector("[data-daily-xp]").textContent = `${activity.xp} / ${DAILY_CATEGORY_GOAL} XP`;
    card.querySelector("[data-daily-bar]").style.width = `${percent}%`;
    card.classList.toggle("daily-goal-done", activity.xp >= DAILY_CATEGORY_GOAL);
  });
}

function formatHistoryDate(date) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(currentLocale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(parsed);
}

function updateHistoryView() {
  const history = progress[age].history || {};
  const dates = Object.keys(history).sort().reverse();
  const totals = dates.reduce((sum, date) => {
    Object.values(history[date] || {}).forEach((entry) => {
      sum.xp += safeCount(entry.xp);
      sum.missions += safeCount(entry.missions);
      sum.questions += safeCount(entry.questions);
    });
    return sum;
  }, { xp: 0, missions: 0, questions: 0 });

  els.historyCopy.textContent = localized(
    `Historia dla poziomu ${age} lat · dzienny cel każdej kategorii to ${DAILY_CATEGORY_GOAL} XP.`,
    `Verlauf für ${age} Jahre · das Tagesziel jeder Kategorie beträgt ${DAILY_CATEGORY_GOAL} XP.`,
    `History for age ${age} · the daily goal for each category is ${DAILY_CATEGORY_GOAL} XP.`
  );
  els.historySummary.innerHTML = `
    <span><strong>${dates.length}</strong><small>${localized("aktywnych dni", "aktive Tage", "active days")}</small></span>
    <span><strong>${totals.missions}</strong><small>${localized("misji", "Missionen", "missions")}</small></span>
    <span><strong>${totals.questions}</strong><small>${localized("odpowiedzi", "Antworten", "answers")}</small></span>
    <span><strong>${totals.xp}</strong><small>${localized("XP kategorii", "Kategorie-XP", "category XP")}</small></span>`;

  if (!dates.length) {
    els.historyList.innerHTML = localized(
      `<div class="history-empty"><span>📭</span><strong>Historia jest jeszcze pusta</strong><p>Ukończ pierwszą misję, a pojawi się tutaj jej data, XP i liczba odpowiedzi.</p></div>`,
      `<div class="history-empty"><span>📭</span><strong>Der Verlauf ist noch leer</strong><p>Beende deine erste Mission. Danach siehst du hier Datum, XP und Anzahl der Antworten.</p></div>`,
      `<div class="history-empty"><span>📭</span><strong>The history is still empty</strong><p>Finish your first mission to see its date, XP and number of answers here.</p></div>`
    );
    return;
  }

  els.historyList.innerHTML = dates.map((date) => {
    const categories = history[date];
    const entries = SUBJECT_KEYS.filter((subject) => categories[subject]).map((subject) => {
      const meta = SUBJECTS[subject];
      const entry = categories[subject];
      const goalPercent = Math.min(100, Math.round((entry.xp / DAILY_CATEGORY_GOAL) * 100));
      return `
        <div class="history-category-row" style="--subject-color: ${meta.color}">
          <span class="history-category-icon" aria-hidden="true">${meta.icon}</span>
          <span class="history-category-copy"><strong>${subjectName(subject)}</strong><small>${localized(`${entry.missions} misji · ${entry.questions} odpowiedzi · ${entry.correct} dobrych · ${entry.wrong} złych`, `${entry.missions} Missionen · ${entry.questions} Antworten · ${entry.correct} richtig · ${entry.wrong} falsch`, `${entry.missions} missions · ${entry.questions} answers · ${entry.correct} correct · ${entry.wrong} wrong`)}</small></span>
          <span class="history-category-xp"><strong>+${entry.xp} XP</strong><small>${goalPercent}% ${localized("celu", "des Ziels", "of goal")}</small></span>
        </div>`;
    }).join("");
    return `<article class="history-day"><div class="history-day-heading"><strong>${formatHistoryDate(date)}</strong><span>${date}</span></div>${entries}</article>`;
  }).join("");
}

function updateModalLock() {
  const anyModalOpen = !els.ageModal.hidden
    || !els.syncModal.hidden
    || !els.questionCountModal.hidden
    || !els.levelsModal.hidden
    || !els.historyModal.hidden
    || !els.authModal.hidden
    || !els.accountModal.hidden
    || !els.adminModal.hidden
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

function openLevelsDialog() {
  updateCategoryProgress();
  els.levelsModal.hidden = false;
  els.levelsToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");
  window.setTimeout(() => els.levelsClose.focus(), 30);
}

function closeLevelsDialog() {
  els.levelsModal.hidden = true;
  els.levelsToggle.setAttribute("aria-expanded", "false");
  updateModalLock();
  els.levelsToggle.focus();
}

function openHistoryDialog() {
  updateHistoryView();
  els.historyModal.hidden = false;
  els.historyToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");
  window.setTimeout(() => els.historyClose.focus(), 30);
}

function closeHistoryDialog() {
  els.historyModal.hidden = true;
  els.historyToggle.setAttribute("aria-expanded", "false");
  updateModalLock();
  els.historyToggle.focus();
}

function updateUI() {
  const current = progress[age];
  applyLanguageShell();
  els.topAge.textContent = localized(`${age} lat`, `${age} Jahre`, `${age} years`);
  els.xpCount.textContent = `${current.xp} XP`;
  els.heroStreak.textContent = `${current.streak} 🔥`;
  els.todayCount.textContent = `${Math.min(current.today.count, 3)}/3 ${localized("misje", "Missionen", "missions")}`;
  els.levelCopy.textContent = localized(
    age === 8 ? "Poziom dla 8 lat · zadania krótkie i konkretne" : "Poziom dla 9 lat · trochę więcej kombinowania",
    age === 8 ? "Stufe für 8 Jahre · kurze und klare Aufgaben" : "Stufe für 9 Jahre · etwas kniffligere Aufgaben",
    age === 8 ? "Level for age 8 · short and focused tasks" : "Level for age 9 · a little more problem-solving"
  );

  const descriptionsDe = {
    math: age === 8 ? "Addieren, multiplizieren und clevere Rätsel" : "Rechnen, Umfänge und Rechenregeln",
    polish: age === 8 ? "Polnische Rechtschreibung, Silben und Wortspiele" : "Wortarten, Rechtschreibung und Satzbau",
    english: age === 8 ? "Wörter, Farben und tägliche Wendungen" : "Sätze, Uhrzeit, Fragen und Mehrzahl",
    world: age === 8 ? "Natur, Polen, Weltraum und Zeit" : "Geografie, Weltraum und Veränderungen in der Natur",
    logic: age === 8 ? "Muster, Reihenfolgen und clevere Schlüsse" : "Codes, Bedingungen und schwierigere Deduktionen",
    reading: age === 8 ? "Kurze Texte und wichtige Informationen finden" : "Texte, Ursachen, Zeit und Schlussfolgerungen",
    coding: age === 8 ? "Algorithmen, Schleifen und erste Befehle" : "Variablen, Bedingungen, Schleifen und Debugging"
  };
  const descriptionsEn = {
    math: age === 8 ? "Addition, multiplication and clever puzzles" : "Calculations, perimeters and order of operations",
    polish: age === 8 ? "Polish spelling, syllables and word games" : "Parts of speech, spelling and sentence building",
    english: age === 8 ? "Words, colours and everyday phrases" : "Sentences, time, questions and plurals",
    world: age === 8 ? "Nature, Poland, space and time" : "Geography, space and scientific changes",
    logic: age === 8 ? "Patterns, sequences and clever conclusions" : "Codes, conditions and harder deductions",
    reading: age === 8 ? "Short texts and finding key information" : "Texts, causes, time and drawing conclusions",
    coding: age === 8 ? "Algorithms, loops and first commands" : "Variables, conditions, loops and debugging"
  };
  const descriptionsPl = {
    math: age === 8 ? "Dodawanie, mnożenie i sprytne zagadki" : "Działania, obwody i kolejność obliczeń",
    polish: age === 8 ? "Ortografia, sylaby i słowne wygibasy" : "Części mowy, pisownia i budowa zdań",
    english: age === 8 ? "Słówka, kolory i codzienne zwroty" : "Zdania, czas, pytania i liczba mnoga",
    world: age === 8 ? "Przyroda, Polska, kosmos i czas" : "Geografia, kosmos i naukowe przemiany",
    logic: age === 8 ? "Wzory, kolejność i sprytne wnioski" : "Szyfry, warunki i trudniejsze dedukcje",
    reading: age === 8 ? "Krótkie teksty i tropienie informacji" : "Teksty, przyczyny, czas i wyciąganie wniosków",
    coding: age === 8 ? "Algorytmy, pętle i pierwsze komendy" : "Zmienne, warunki, pętle i debugowanie"
  };
  const descriptions = language === "de" ? descriptionsDe : language === "en" ? descriptionsEn : descriptionsPl;
  Object.entries(descriptions).forEach(([subject, description]) => {
    document.querySelector(`#${subject}-desc`).textContent = description;
  });

  updateQuestionCounts();
  updateCategoryProgress();
  updateDailyGoals();
  els.motivationTitle.textContent = window.TYMO_CONTENT.dailyMotivation(new Date(), language);

  els.ageOptions.forEach((option) => option.classList.toggle("selected", Number(option.dataset.age) === age));
  els.soundToggle.setAttribute("aria-pressed", String(soundOn));
  els.soundToggle.setAttribute("aria-label", localized(
    soundOn ? "Wyłącz dźwięki" : "Włącz dźwięki",
    soundOn ? "Töne ausschalten" : "Töne einschalten",
    soundOn ? "Turn sounds off" : "Turn sounds on"
  ));
  els.soundIcon.textContent = soundOn ? "♪" : "×";
}

function chooseAge(nextAge) {
  age = Number(nextAge);
  safeSet(AGE_KEY, String(age));
  updateUI();
  closeAgeDialog();
  beep("select");
  showToast(localized(`Poziom ${age} lat aktywowany. Turbo! ⚡`, `Stufe ${age} Jahre aktiviert. Turbo! ⚡`, `Age ${age} level activated. Turbo! ⚡`));
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
  return shuffle(subjects.map((subject) => ({ ...shuffle(QUESTION_BANK[age][subject])[0], subject })));
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
    isMix,
    categoryResults: {}
  };

  const meta = SUBJECTS[subject];
  els.quizIcon.textContent = meta.icon;
  els.quizIcon.style.background = meta.color;
  els.quizKicker.textContent = isMix
    ? localized("MISJA SPECJALNA", "SPEZIALMISSION", "SPECIAL MISSION")
    : localized("MISJA", "MISSION", "MISSION");
  els.quizKicker.style.color = meta.color;
  els.quizSubject.textContent = subjectName(subject);
  els.quizEarned.textContent = "0 XP";
  els.levelBadge.textContent = localized(`POZIOM ${age} LAT`, `STUFE ${age} JAHRE`, `AGE ${age} LEVEL`);
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
  els.questionNumber.textContent = localized(
    `PYTANIE ${quiz.index + 1} Z ${quiz.questions.length}`,
    `FRAGE ${quiz.index + 1} VON ${quiz.questions.length}`,
    `QUESTION ${quiz.index + 1} OF ${quiz.questions.length}`
  );
  els.quizEarned.textContent = `${quiz.earned} XP`;
  els.questionCard.innerHTML = `
    <div class="question-mascot" aria-hidden="true">${itemMeta.mascot}</div>
    <p class="question-prompt">${item.prompt}</p>
    ${item.passage ? `<div class="reading-passage"><span>${localized("TEKST DO PRZECZYTANIA", "TEXT ZUM LESEN", "TEXT TO READ")}</span><p>${item.passage}</p></div>` : ""}
    <h2 id="question-title">${item.question}</h2>
    <div class="answers-grid" id="answers"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="next-button" id="next-question" type="button" hidden>
      ${localized("Następne pytanie", "Nächste Frage", "Next question")} <span aria-hidden="true">→</span>
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
  const categoryResult = quiz.categoryResults[item.subject] || { correct: 0, wrong: 0, xp: 0 };
  quiz.categoryResults[item.subject] = categoryResult;

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === item.answer) button.classList.add("correct");
  });

  if (isCorrect) {
    selectedButton.classList.add("correct");
    quiz.correct += 1;
    quiz.earned += 10;
    categoryResult.correct += 1;
    categoryResult.xp += 12;
    feedback.className = "feedback good";
    feedback.textContent = `Turbo! +10 XP · ${item.fact}`;
    beep("correct");
    burstConfetti(16);
  } else {
    selectedButton.classList.add("wrong");
    categoryResult.wrong += 1;
    categoryResult.xp += 2;
    feedback.className = "feedback bad";
    feedback.textContent = `${localized("Prawie!", "Fast!", "Almost!")} ${item.fact}`;
    beep("wrong");
  }

  els.quizEarned.textContent = `${quiz.earned} XP`;
  next.hidden = false;
  next.textContent = quiz.index === quiz.questions.length - 1
    ? localized("Pokaż wynik →", "Ergebnis zeigen →", "Show result →")
    : localized("Następne pytanie →", "Nächste Frage →", "Next question →");
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
  let categoryXpEarned = 0;
  Object.entries(quiz.categoryResults).forEach(([subject, result]) => {
    const stats = current.categories[subject];
    const missionBonus = quiz.isMix ? 5 : subject === quiz.subject ? 15 : 0;
    const earned = result.xp + missionBonus;
    stats.xp += earned;
    stats.correct += result.correct;
    stats.wrong += result.wrong;
    if (!quiz.isMix && subject === quiz.subject) stats.completed += 1;
    recordActivity(current, subject, {
      xp: earned,
      correct: result.correct,
      wrong: result.wrong,
      missions: 1,
      questions: result.correct + result.wrong
    });
    categoryXpEarned += earned;
  });
  current.xp += quiz.earned;
  current.correct += quiz.correct;
  current.completed += 1;
  current.streak += 1;
  current.today.count += 1;
  saveProgress();
  updateUI();

  const perfect = quiz.correct === quiz.questions.length;
  const passed = quiz.correct >= Math.ceil(quiz.questions.length * 0.6);
  const headline = localized(
    perfect ? "Mózg odleciał!" : passed ? "Misja zaliczona!" : "Trening zrobiony!",
    perfect ? "Dein Gehirn fliegt!" : passed ? "Mission geschafft!" : "Training beendet!",
    perfect ? "Your brain took off!" : passed ? "Mission complete!" : "Training complete!"
  );
  const icon = perfect ? "🏆" : passed ? "⚡" : "🧠";

  els.questionNumber.textContent = localized("KONIEC MISJI", "MISSION BEENDET", "MISSION COMPLETE");
  els.questionCard.innerHTML = `
    <div class="summary-view">
      <div>
        <div class="summary-icon" aria-hidden="true">${icon}</div>
        <h2 id="question-title">${headline}</h2>
        <p>${localized(perfect ? "Komplet odpowiedzi. Kapibara nie dowierza." : "Każda misja wzmacnia TurboMózg.", perfect ? "Alles richtig. Professor Capybara staunt!" : "Jede Mission stärkt dein Turbohirn.", perfect ? "Every answer is correct. Professor Capybara is amazed!" : "Every mission makes your Turbo Brain stronger.")}</p>
        <div class="summary-stats">
          <div class="summary-stat"><strong>${quiz.correct}/${quiz.questions.length}</strong><small>${localized("poprawne", "richtig", "correct")}</small></div>
          <div class="summary-stat"><strong>+${quiz.earned}</strong><small>${localized("zdobyte XP", "gesammelte XP", "XP earned")}</small></div>
          <div class="summary-stat"><strong>+${categoryXpEarned}</strong><small>${localized("XP kategorii", "Kategorie-XP", "category XP")}</small></div>
          <div class="summary-stat"><strong>${current.streak} 🔥</strong><small>${localized("seria misji", "Missionsserie", "mission streak")}</small></div>
        </div>
        <button class="next-button" id="finish-button" type="button">${localized("Wracam do misji", "Zurück zu den Missionen", "Back to missions")} <span aria-hidden="true">→</span></button>
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

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showAuthMessage(message, kind = "info") {
  els.authMessage.hidden = !message;
  els.authMessage.className = `auth-message ${kind}`;
  els.authMessage.textContent = message;
}

function updateAccountUI() {
  if (!currentUser) {
    els.accountAvatar.textContent = "G";
    els.accountName.textContent = localized("Zaloguj się", "Anmelden", "Sign in");
    els.accountStatus.textContent = authConfig?.googleClientId
      ? localized("Konto Google", "Google-Konto", "Google account")
      : localized("Google do konfiguracji", "Google einrichten", "Set up Google");
    els.adminToggle.hidden = true;
    return;
  }

  const initial = (currentUser.name || currentUser.email || "G").trim().charAt(0).toUpperCase();
  els.accountAvatar.textContent = initial;
  els.accountName.textContent = currentUser.name || currentUser.email;
  els.accountStatus.textContent = currentUser.role === "admin"
    ? "Administrator"
    : currentUser.status === "approved"
      ? localized("Konto aktywne", "Konto aktiv", "Account active")
      : localized("Czeka na akceptację", "Wartet auf Freigabe", "Waiting for approval");
  els.accountProfileAvatar.textContent = initial;
  els.accountTitle.textContent = currentUser.name || localized("Konto Google", "Google-Konto", "Google account");
  els.accountEmail.textContent = currentUser.email;
  els.accountState.className = `account-state ${currentUser.status}`;
  els.accountState.textContent = localized(
    currentUser.role === "admin"
      ? "Masz dostęp do panelu administratora i zarządzania kontami."
      : currentUser.status === "approved"
        ? "Konto zaakceptowane. Wyniki zapisują się w Twojej chmurze."
        : "Konto czeka na akceptację administratora.",
    currentUser.role === "admin"
      ? "Du hast Zugriff auf den Administratorbereich und die Kontoverwaltung."
      : currentUser.status === "approved"
        ? "Konto freigegeben. Die Ergebnisse werden in deiner Cloud gespeichert."
        : "Das Konto wartet auf die Freigabe durch den Administrator.",
    currentUser.role === "admin"
      ? "You can access the administrator panel and manage accounts."
      : currentUser.status === "approved"
        ? "Account approved. Results are saved in your cloud."
        : "The account is waiting for administrator approval."
  );
  els.adminToggle.hidden = currentUser.role !== "admin";
}

function openAuthDialog() {
  els.authModal.hidden = false;
  els.accountToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");
  if (!authConfig?.googleClientId) {
    showAuthMessage("Logowanie Google jest przygotowane, ale wymaga jeszcze identyfikatora OAuth Client ID z Google Cloud.", "warning");
  }
}

function closeAuthDialog() {
  if (authConfig?.authEnabled && !(currentUser?.status === "approved" || currentUser?.role === "admin")) return;
  els.authModal.hidden = true;
  els.accountToggle.setAttribute("aria-expanded", "false");
  updateModalLock();
  els.accountToggle.focus();
}

function enforceAuthAccess() {
  const approved = currentUser?.status === "approved" || currentUser?.role === "admin";
  const required = Boolean(authConfig?.authEnabled && !approved);
  els.authClose.hidden = required;
  document.body.classList.toggle("auth-required", required);

  if (!required) return;
  openAuthDialog();
  if (currentUser?.status === "pending") {
    showAuthMessage("Konto czeka na akceptację administratora. Po akceptacji kliknij przycisk poniżej.", "warning");
    els.authRefresh.hidden = false;
  } else {
    els.authRefresh.hidden = true;
    showAuthMessage("Aby korzystać z TymoMocy, zaloguj się zaakceptowanym kontem Google.", "info");
  }
}

function openAccountDialog() {
  updateAccountUI();
  els.accountModal.hidden = false;
  els.accountToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");
  window.setTimeout(() => els.accountClose.focus(), 30);
}

function closeAccountDialog() {
  els.accountModal.hidden = true;
  els.accountToggle.setAttribute("aria-expanded", "false");
  updateModalLock();
  els.accountToggle.focus();
}

function renderGoogleButton() {
  if (!authConfig?.googleClientId) return;
  window.clearTimeout(googleReadyTimer);
  let attempts = 0;
  const tryRender = () => {
    attempts += 1;
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: authConfig.googleClientId,
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      els.googleSignin.innerHTML = "";
      window.google.accounts.id.renderButton(els.googleSignin, {
        type: "standard",
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: Math.min(360, Math.max(240, els.googleSignin.clientWidth || 320)),
        locale: language
      });
      return;
    }
    if (attempts < 50) googleReadyTimer = window.setTimeout(tryRender, 120);
    else showAuthMessage("Nie udało się załadować przycisku Google. Sprawdź połączenie i odśwież stronę.", "error");
  };
  tryRender();
}

async function handleGoogleCredential(response) {
  if (!response?.credential) return;
  showAuthMessage("Sprawdzam konto Google…", "info");
  try {
    const payload = await apiRequest("/api/auth/google", {
      method: "POST",
      body: { credential: response.credential },
      token: ""
    });
    authToken = payload.token;
    currentUser = payload.user;
    safeSet(AUTH_TOKEN_KEY, authToken);
    updateAccountUI();
    if (currentUser.status === "approved" || currentUser.role === "admin") {
      activateUserProgress(currentUser);
      showAuthMessage("Konto aktywne. Ładuję wyniki…", "success");
      await syncFromCloud(false);
      closeAuthDialog();
      showToast(`Witaj, ${currentUser.name || currentUser.email}!`);
    } else {
      showAuthMessage("Konto utworzone. Administrator musi je teraz zaakceptować.", "warning");
      els.authRefresh.hidden = false;
      enforceAuthAccess();
    }
  } catch (error) {
    showAuthMessage(error.message, "error");
  }
}

async function refreshSession({ quiet = false } = {}) {
  if (!authToken) return false;
  try {
    const payload = await apiRequest("/api/session");
    currentUser = payload.user;
    updateAccountUI();
    if (currentUser.status === "approved" || currentUser.role === "admin") {
      activateUserProgress(currentUser);
      els.authRefresh.hidden = true;
      if (!quiet) {
        await syncFromCloud(false);
        closeAuthDialog();
        showToast("Konto zostało zaakceptowane ✓");
      }
      return true;
    }
    if (!quiet) showAuthMessage("Konto nadal czeka na akceptację administratora.", "warning");
    return false;
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      authToken = "";
      currentUser = null;
      safeRemove(AUTH_TOKEN_KEY);
      updateAccountUI();
    }
    enforceAuthAccess();
    if (!quiet) showAuthMessage(error.message, "error");
    return false;
  }
}

async function initializeAuth() {
  try {
    const sameOriginConfig = await apiRequest("/api/config", { token: "", baseUrl: window.location.origin });
    if (typeof sameOriginConfig.authEnabled !== "boolean") throw new Error("Brak API pod tym adresem.");
    apiBaseUrl = window.location.origin;
    authConfig = sameOriginConfig;
  } catch {
    try {
      authConfig = await apiRequest("/api/config", { token: "", baseUrl: FALLBACK_API_BASE_URL });
      apiBaseUrl = FALLBACK_API_BASE_URL;
    } catch {
      authConfig = { googleClientId: "", authEnabled: false };
    }
  }
  updateAccountUI();
  renderGoogleButton();
  if (authToken) {
    const active = await refreshSession({ quiet: true });
    if (active) await syncFromCloud(false);
  }
  enforceAuthAccess();
}

async function logout() {
  try { if (authToken) await apiRequest("/api/logout", { method: "POST" }); } catch { /* Sesja i tak zostanie usunięta lokalnie. */ }
  authToken = "";
  currentUser = null;
  safeRemove(AUTH_TOKEN_KEY);
  activateGuestProgress();
  updateAccountUI();
  closeAccountDialog();
  setSyncState(syncCode ? "waiting" : "local");
  enforceAuthAccess();
  showToast("Wylogowano z konta Google");
}

function renderAdminUsers(users = []) {
  const counts = users.reduce((result, user) => {
    result[user.status] = (result[user.status] || 0) + 1;
    return result;
  }, {});
  els.adminSummary.innerHTML = `
    <span><strong>${users.length}</strong><small>wszystkich kont</small></span>
    <span><strong>${counts.pending || 0}</strong><small>czeka na zgodę</small></span>
    <span><strong>${counts.approved || 0}</strong><small>aktywnych</small></span>
    <span><strong>${counts.banned || 0}</strong><small>zablokowanych</small></span>`;

  els.adminUsers.innerHTML = users.length ? users.map((user) => {
    const self = user.email?.toLowerCase() === currentUser?.email?.toLowerCase();
    const statusLabel = { pending: "Oczekuje", approved: "Aktywne", banned: "Zablokowane" }[user.status] || user.status;
    return `
      <article class="admin-user-card" data-user-id="${user.id}">
        <span class="admin-user-avatar">${escapeHTML((user.name || user.email || "U").charAt(0).toUpperCase())}</span>
        <span class="admin-user-copy"><strong>${escapeHTML(user.name || "Użytkownik Google")}</strong><small>${escapeHTML(user.email)}</small><em>Utworzone: ${escapeHTML(user.createdAt || "—")} · ostatnie logowanie: ${escapeHTML(user.lastLoginAt || "—")}</em></span>
        <span class="admin-user-status ${escapeHTML(user.status)}">${escapeHTML(statusLabel)}</span>
        <span class="admin-user-actions">
          ${user.status !== "approved" && !self ? `<button type="button" data-admin-action="approve">${user.status === "banned" ? "Odblokuj" : "Akceptuj"}</button>` : ""}
          ${user.status !== "banned" && !self ? `<button class="danger" type="button" data-admin-action="ban">Zablokuj i wyloguj</button>` : ""}
        </span>
      </article>`;
  }).join("") : `<div class="history-empty"><span>👥</span><strong>Brak użytkowników</strong></div>`;
}

async function loadAdminUsers() {
  els.adminUsers.innerHTML = `<div class="admin-loading">Ładuję konta…</div>`;
  try {
    const payload = await apiRequest("/api/admin/users");
    renderAdminUsers(payload.users);
  } catch (error) {
    els.adminUsers.innerHTML = `<div class="auth-message error">${escapeHTML(error.message)}</div>`;
  }
}

async function openAdminDialog() {
  if (currentUser?.role !== "admin") return;
  els.adminModal.hidden = false;
  els.adminToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");
  await loadAdminUsers();
}

function closeAdminDialog() {
  els.adminModal.hidden = true;
  els.adminToggle.setAttribute("aria-expanded", "false");
  updateModalLock();
  els.adminToggle.focus();
}

async function handleAdminAction(event) {
  const button = event.target.closest("[data-admin-action]");
  if (!button) return;
  const card = button.closest("[data-user-id]");
  const action = button.dataset.adminAction;
  const userId = Number(card.dataset.userId);
  if (action === "ban" && !window.confirm("Zablokować to konto i natychmiast wylogować użytkownika?")) return;
  button.disabled = true;
  try {
    await apiRequest(`/api/admin/users/${userId}/status`, { method: "PUT", body: { action } });
    await loadAdminUsers();
    showToast(action === "approve" ? "Konto zaakceptowane ✓" : "Konto zablokowane");
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
  }
}

els.ageOptions.forEach((option) => option.addEventListener("click", () => chooseAge(option.dataset.age)));
els.languageToggle.addEventListener("click", toggleLanguageMenu);
els.languageOptions.forEach((option) => option.addEventListener("click", () => chooseLanguage(option.dataset.language)));
els.languageMenu.addEventListener("keydown", (event) => {
  const currentIndex = els.languageOptions.indexOf(document.activeElement);
  let nextIndex = currentIndex;
  if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % els.languageOptions.length;
  else if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + els.languageOptions.length) % els.languageOptions.length;
  else if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = els.languageOptions.length - 1;
  else return;
  event.preventDefault();
  els.languageOptions[nextIndex].focus();
});
document.addEventListener("click", (event) => {
  if (!els.languagePicker.contains(event.target)) closeLanguageMenu();
});
els.ageSwitch.addEventListener("click", openAgeDialog);
els.ageClose.addEventListener("click", () => {
  if (!safeGet(AGE_KEY)) safeSet(AGE_KEY, String(age));
  closeAgeDialog();
});

els.subjectCards.forEach((card) => card.addEventListener("click", () => startQuiz(card.dataset.subject)));
els.questionCountToggle.addEventListener("click", openQuestionCountDialog);
els.questionCountClose.addEventListener("click", closeQuestionCountDialog);
els.levelsToggle.addEventListener("click", openLevelsDialog);
els.levelsClose.addEventListener("click", closeLevelsDialog);
els.historyToggle.addEventListener("click", openHistoryDialog);
els.historyClose.addEventListener("click", closeHistoryDialog);
els.accountToggle.addEventListener("click", () => currentUser ? openAccountDialog() : openAuthDialog());
els.authClose.addEventListener("click", closeAuthDialog);
els.authRefresh.addEventListener("click", () => refreshSession());
els.accountClose.addEventListener("click", closeAccountDialog);
els.logoutButton.addEventListener("click", logout);
els.adminToggle.addEventListener("click", openAdminDialog);
els.adminClose.addEventListener("click", closeAdminDialog);
els.adminUsers.addEventListener("click", handleAdminAction);
els.randomMission.addEventListener("click", () => {
  const subjects = Object.keys(QUESTION_BANK[age]);
  const random = subjects[Math.floor(Math.random() * subjects.length)];
  showToast(`${localized("Losowanie…", "Auslosung…", "Picking…")} ${subjectName(random)}! 🎲`);
  window.setTimeout(() => startQuiz(random), 350);
});
els.mixMission.addEventListener("click", () => startQuiz("mix", mixQuestions()));
els.quizClose.addEventListener("click", closeQuiz);

els.soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  safeSet(SOUND_KEY, soundOn ? "on" : "off");
  updateUI();
  if (soundOn) beep("select");
  showToast(localized(
    soundOn ? "Dźwięki włączone ♪" : "Dźwięki wyłączone",
    soundOn ? "Töne eingeschaltet ♪" : "Töne ausgeschaltet",
    soundOn ? "Sounds on ♪" : "Sounds off"
  ));
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
  if (!els.languageMenu.hidden) closeLanguageMenu({ restoreFocus: true });
  else if (!els.quizOverlay.hidden) closeQuiz();
  else if (!els.syncModal.hidden) closeSyncDialog();
  else if (!els.adminModal.hidden) closeAdminDialog();
  else if (!els.accountModal.hidden) closeAccountDialog();
  else if (!els.authModal.hidden) closeAuthDialog();
  else if (!els.historyModal.hidden) closeHistoryDialog();
  else if (!els.levelsModal.hidden) closeLevelsDialog();
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
void initializeAuth();
