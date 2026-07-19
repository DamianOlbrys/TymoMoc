"use strict";

(() => {
  const TARGET_PER_SUBJECT = 500;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const rotate = (items, offset) => items.map((_, index) => items[(index + offset) % items.length]);
  const unique = (items) => [...new Set(items.map(String))];
  const deterministicShuffle = (items, seed) => {
    const copy = [...items];
    let state = (seed + 1) * 2654435761;
    for (let index = copy.length - 1; index > 0; index -= 1) {
      state = (state * 1664525 + 1013904223) >>> 0;
      const target = state % (index + 1);
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  };

  function makeQuestion({ prompt, passage, question, answer, distractors, fact }, seed) {
    const answers = unique([answer, ...distractors]);
    while (answers.length < 4) answers.push(`inna odpowiedź ${answers.length}`);
    return {
      prompt,
      ...(passage ? { passage } : {}),
      question,
      answers: deterministicShuffle(answers.slice(0, 4), seed),
      answer: String(answer),
      fact
    };
  }

  function numericQuestion(value, candidates, suffix, data, seed) {
    const clean = unique(candidates.map((item) => clamp(Math.trunc(item), 0, 100000)))
      .filter((item) => item !== value);
    let delta = 1;
    while (clean.length < 3) {
      const next = value + delta;
      if (next !== value && !clean.includes(next)) clean.push(next);
      delta += 1;
    }
    const format = (number) => `${number}${suffix}`;
    return makeQuestion({
      ...data,
      answer: format(value),
      distractors: clean.slice(0, 3).map(format)
    }, seed);
  }

  function mathQuestion(index, age) {
    const type = index % 10;
    const round = Math.floor(index / 10);
    const harder = age === 9;
    const a = harder ? 125 + ((round * 47 + type * 19) % 760) : 18 + ((round * 23 + type * 7) % 180);
    const b = harder ? 34 + ((round * 31 + type * 13) % 390) : 9 + ((round * 17 + type * 5) % 90);
    const tag = `${harder ? "Mistrzowski" : "Sprytny"} etap ${round + 1}`;

    if (type === 0) {
      const value = a + b;
      return numericQuestion(value, [value - 10, value + 10, a + b + 1], "", {
        prompt: tag,
        question: `Ile to jest ${a} + ${b}?`,
        fact: `${a} + ${b} = ${value}. Najłatwiej dodać osobno setki, dziesiątki i jedności.`
      }, index);
    }
    if (type === 1) {
      const top = a + b + (harder ? 120 : 35);
      const value = top - b;
      return numericQuestion(value, [value - 10, value + 10, value + 1], "", {
        prompt: `Laser odejmowania · etap ${round + 1}`,
        question: `Ile to jest ${top} − ${b}?`,
        fact: `${top} − ${b} = ${value}. Wynik można sprawdzić dodawaniem.`
      }, index);
    }
    if (type === 2) {
      const left = 3 + (round % (harder ? 10 : 8));
      const right = 4 + ((round * 3) % (harder ? 9 : 7));
      const value = left * right;
      return numericQuestion(value, [value - left, value + right, left + right], "", {
        prompt: `Tabliczkowy turboatak · seria ${round + 1}`,
        question: `Ile to jest ${left} × ${right}?`,
        fact: `${left} grup po ${right} daje ${value}.`
      }, index);
    }
    if (type === 3) {
      const divisor = 3 + (round % 9);
      const result = 4 + ((round * 5) % 12);
      const dividend = divisor * result;
      return numericQuestion(result, [result - 1, result + 1, divisor], "", {
        prompt: `Dzielenie kryształów · tura ${round + 1}`,
        question: `${dividend} kryształów rozdzielono po równo między ${divisor} robotów. Ile dostał każdy?`,
        fact: `${dividend} ÷ ${divisor} = ${result}, bo ${divisor} × ${result} = ${dividend}.`
      }, index);
    }
    if (type === 4) {
      const first = 2 + (round % 8);
      const second = 3 + ((round * 2) % 9);
      const extra = harder ? 7 + (round % 20) : 2 + (round % 10);
      const value = extra + first * second;
      return numericQuestion(value, [((extra + first) * second), value - extra, value + first], "", {
        prompt: `Kolejność działań · poziom ${round + 1}`,
        question: `Ile to jest ${extra} + ${first} × ${second}?`,
        fact: `Najpierw mnożenie: ${first} × ${second} = ${first * second}, potem + ${extra}, czyli ${value}.`
      }, index);
    }
    if (type === 5) {
      const width = 3 + (round % 12);
      const height = 4 + ((round * 3) % 11);
      const value = 2 * (width + height);
      return numericQuestion(value, [width + height, width * height, value + 2], " cm", {
        prompt: `Geometryczny boss · plansza ${round + 1}`,
        question: `Prostokąt ma boki ${width} cm i ${height} cm. Jaki jest jego obwód?`,
        fact: `Obwód to ${width} + ${height} + ${width} + ${height} = ${value} cm.`
      }, index);
    }
    if (type === 6) {
      const step = 2 + (round % 9);
      const start = 1 + ((round * 3) % 25);
      const fourth = start + step * 3;
      const value = fourth + step;
      return numericQuestion(value, [value - 1, value + step, fourth], "", {
        prompt: `Sekwencja z kosmosu · kod ${round + 1}`,
        question: `Co będzie dalej: ${start}, ${start + step}, ${start + step * 2}, ${fourth}, …?`,
        fact: `Za każdym razem dodajemy ${step}, więc następna liczba to ${value}.`
      }, index);
    }
    if (type === 7) {
      const denominator = harder ? [3, 4, 5][round % 3] : [2, 4][round % 2];
      const part = 2 + ((round * 3) % 15);
      const whole = part * denominator;
      return numericQuestion(part, [part + denominator, whole - part, Math.max(1, part - 1)], "", {
        prompt: `Ułamkowy portal · komnata ${round + 1}`,
        question: `Ile wynosi 1/${denominator} liczby ${whole}?`,
        fact: `${whole} ÷ ${denominator} = ${part}.`
      }, index);
    }
    if (type === 8) {
      const hour = 7 + (round % 10);
      const minutes = harder ? [25, 35, 45, 55][round % 4] : [15, 20, 30, 40][round % 4];
      const total = hour * 60 + minutes + (harder ? 50 : 30);
      const endHour = Math.floor(total / 60) % 24;
      const endMinutes = total % 60;
      const answer = `${String(endHour).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
      const wrong = [`${String(hour).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`, `${String((endHour + 1) % 24).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`, `${String(endHour).padStart(2, "0")}:${String((endMinutes + 10) % 60).padStart(2, "0")}`];
      return makeQuestion({
        prompt: `Zegarowa misja · dzień ${round + 1}`,
        question: `Trening zaczął się o ${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")} i trwał ${harder ? 50 : 30} minut. O której się skończył?`,
        answer,
        distractors: wrong,
        fact: `Po dodaniu czasu otrzymujemy ${answer}.`
      }, index);
    }
    const price = harder ? 7 + (round % 18) : 3 + (round % 10);
    const count = 2 + ((round * 5) % 8);
    const paid = price * count + (harder ? 20 : 10);
    const value = paid - price * count;
    return numericQuestion(value, [paid - price, value + price, count * price], " zł", {
      prompt: `Sklep Tostobota · zakup ${round + 1}`,
      question: `${count} notesów kosztuje po ${price} zł. Zapłacono ${paid} zł. Ile wynosi reszta?`,
      fact: `Zakupy kosztują ${count * price} zł, więc reszta to ${paid} − ${count * price} = ${value} zł.`
    }, index);
  }

  const POLISH_WORDS = [
    ["królik", "krulik", "ó"], ["góra", "gura", "ó"], ["wróbel", "wrubel", "ó"], ["żółw", "rzółw", "ż"],
    ["rzeka", "żeka", "rz"], ["drzewo", "dżewo", "rz"], ["chmura", "hmura", "ch"], ["hałas", "chałas", "h"],
    ["pszczoła", "pczoła", "szcz"], ["książka", "ksiąrzka", "ż"], ["wiewiórka", "wiewiurka", "ó"],
    ["bohater", "bochater", "h"], ["marzenie", "mażenie", "rz"], ["podróż", "podrórz", "ż"],
    ["ogórek", "ogurek", "ó"], ["burza", "buża", "rz"], ["schody", "shody", "sch"],
    ["przyjaciel", "pszyjaciel", "rz"], ["kałuża", "kałurza", "ż"], ["hulajnoga", "chulajnoga", "h"]
  ];
  const PARTS = [
    ["rower", "rzeczownikiem"], ["przygoda", "rzeczownikiem"], ["biegnie", "czasownikiem"], ["odkrywa", "czasownikiem"],
    ["zielony", "przymiotnikiem"], ["odważna", "przymiotnikiem"], ["szybko", "przysłówkiem"], ["wczoraj", "przysłówkiem"]
  ];
  const OPPOSITES = [["wysoki", "niski"], ["głośny", "cichy"], ["szeroki", "wąski"], ["jasny", "ciemny"], ["szybki", "wolny"], ["mokry", "suchy"], ["ciężki", "lekki"], ["początek", "koniec"]];
  const PLURALS = [["dziecko", "dzieci"], ["człowiek", "ludzie"], ["kot", "koty"], ["okno", "okna"], ["książka", "książki"], ["przyjaciel", "przyjaciele"], ["liść", "liście"], ["ucho", "uszy"]];

  function polishQuestion(index, age) {
    const type = index % 7;
    const round = Math.floor(index / 7);
    const names = ["Tymon", "Maja", "Olek", "Nela", "Kuba", "Zosia", "Filip", "Ania"];
    const name = names[round % names.length];
    if (type <= 1) {
      const [correct, wrong, rule] = POLISH_WORDS[(round * 2 + type) % POLISH_WORDS.length];
      return makeQuestion({
        prompt: `Ortograficzny radar · runda ${round + 1}`,
        question: `${name} zapisuje hasło do kroniki. Która wersja wyrazu jest poprawna?`,
        answer: correct,
        distractors: [wrong, `${correct}j`, correct.replace(/[óu]/, "o")],
        fact: `Poprawny zapis to „${correct}”. W tym miejscu piszemy ${rule}.`
      }, index);
    }
    if (type === 2) {
      const [word, part] = PARTS[round % PARTS.length];
      const other = ["rzeczownikiem", "czasownikiem", "przymiotnikiem", "przysłówkiem"].filter((item) => item !== part);
      return makeQuestion({
        prompt: `Części mowy · zdanie ${round + 1}`,
        question: `W zdaniu „${name} używa słowa: ${word}” wyraz „${word}” jest…`,
        answer: part,
        distractors: other,
        fact: `Wyraz „${word}” jest ${part}.`
      }, index);
    }
    if (type === 3) {
      const [word, opposite] = OPPOSITES[round % OPPOSITES.length];
      const distractors = rotate(OPPOSITES.map((pair) => pair[1]), round + 1).filter((item) => item !== opposite).slice(0, 3);
      return makeQuestion({
        prompt: `Słowny pojedynek · etap ${round + 1}`,
        question: `Który wyraz ma znaczenie przeciwne do słowa „${word}”?`,
        answer: opposite,
        distractors,
        fact: `„${word}” i „${opposite}” to antonimy, czyli wyrazy o przeciwnych znaczeniach.`
      }, index);
    }
    if (type === 4) {
      const [single, plural] = PLURALS[round % PLURALS.length];
      return makeQuestion({
        prompt: `Więcej niż jedno · zestaw ${round + 1}`,
        question: `Jaka jest poprawna liczba mnoga wyrazu „${single}”?`,
        answer: plural,
        distractors: [`${single}y`, `${single}owie`, `${plural}y`],
        fact: `Jedno: ${single}. Wiele: ${plural}.`
      }, index);
    }
    if (type === 5) {
      const starts = ["Gdzie schowałeś mapę", "Czy widziałeś kometę", "Kiedy zaczyna się trening", "Dlaczego robot stanął"];
      const sentence = starts[round % starts.length];
      return makeQuestion({
        prompt: `Znakowy boss · pytanie ${round + 1}`,
        question: `Jakim znakiem należy zakończyć zdanie „${sentence}”?`,
        answer: "?",
        distractors: [".", "!", ","],
        fact: "Zdanie zawiera pytanie, dlatego kończymy je znakiem zapytania."
      }, index);
    }
    const clauses = age === 9
      ? [["Gdy przestało padać", "wyszliśmy na boisko"], ["Ponieważ autobus się spóźnił", "dotarliśmy później"], ["Kiedy zapaliło się światło", "robot ruszył"]]
      : [["Tymon otworzył książkę", "zaczął czytać"], ["Maja założyła kask", "wsiadła na rower"], ["Zosia nalała wody", "podlała kwiat"]];
    const [first, second] = clauses[round % clauses.length];
    return makeQuestion({
      prompt: `Zdaniowy konstruktor · próba ${round + 1}`,
      question: `Który zapis poprawnie łączy części: „${first}” oraz „${second}”?`,
      answer: `${first}, ${second}.`,
      distractors: [`${first}. ,${second}`, `${first}? ${second}!`, `${first} ${second},`],
      fact: `Poprawne zdanie brzmi: „${first}, ${second}.”`
    }, index);
  }

  const ENGLISH_WORDS = [
    ["cat", "kot"], ["dog", "pies"], ["bird", "ptak"], ["horse", "koń"], ["book", "książka"],
    ["school", "szkoła"], ["window", "okno"], ["garden", "ogród"], ["breakfast", "śniadanie"], ["water", "woda"],
    ["friend", "przyjaciel"], ["family", "rodzina"], ["happy", "szczęśliwy"], ["hungry", "głodny"], ["cloud", "chmura"],
    ["river", "rzeka"], ["mountain", "góra"], ["teacher", "nauczyciel"], ["pencil", "ołówek"], ["library", "biblioteka"],
    ["morning", "rano"], ["evening", "wieczór"], ["kitchen", "kuchnia"], ["bicycle", "rower"], ["question", "pytanie"]
  ];
  const ENGLISH_VERBS = [["read", "czytać"], ["write", "pisać"], ["swim", "pływać"], ["run", "biegać"], ["draw", "rysować"], ["help", "pomagać"], ["build", "budować"], ["learn", "uczyć się"]];

  function englishQuestion(index, age) {
    const type = index % 7;
    const round = Math.floor(index / 7);
    const [word, polish] = ENGLISH_WORDS[round % ENGLISH_WORDS.length];
    const otherTranslations = rotate(ENGLISH_WORDS.map((item) => item[1]), round + 3).filter((item) => item !== polish).slice(0, 3);
    if (type === 0) return makeQuestion({ prompt: `Translator · zestaw ${round + 1}`, question: `Co znaczy angielskie słowo „${word}”?`, answer: polish, distractors: otherTranslations, fact: `„${word}” znaczy „${polish}”.` }, index);
    if (type === 1) {
      const [verb, meaning] = ENGLISH_VERBS[round % ENGLISH_VERBS.length];
      return makeQuestion({ prompt: `Can power · etap ${round + 1}`, question: `Uzupełnij: I can ___ very well. Chodzi o czynność „${meaning}”.`, answer: verb, distractors: rotate(ENGLISH_VERBS.map((item) => item[0]), round + 1).filter((item) => item !== verb).slice(0, 3), fact: `„I can ${verb}” znaczy „Potrafię ${meaning}”.` }, index);
    }
    if (type === 2) {
      const subject = ["She", "He"][round % 2];
      return makeQuestion({ prompt: `Grammar level up · runda ${round + 1}`, question: `Wybierz poprawne zdanie z czasownikiem „have” dla osoby ${subject}.`, answer: `${subject} has a book.`, distractors: [`${subject} have a book.`, `${subject} having a book.`, `${subject} is have a book.`], fact: `Dla he lub she używamy formy „has”.` }, index);
    }
    if (type === 3) {
      const number = 2 + (round % 18);
      const names = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
      const answer = names[number - 2];
      return makeQuestion({ prompt: `Number code · poziom ${round + 1}`, question: `Jak zapisujemy po angielsku liczbę ${number}?`, answer, distractors: rotate(names, number + 2).filter((item) => item !== answer).slice(0, 3), fact: `${number} po angielsku to „${answer}”.` }, index);
    }
    if (type === 4) {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const current = round % 7;
      const answer = days[(current + 1) % 7];
      return makeQuestion({ prompt: `Calendar mission · tydzień ${round + 1}`, question: `Which day comes after ${days[current]}?`, answer, distractors: rotate(days, current + 2).filter((item) => item !== answer).slice(0, 3), fact: `After ${days[current]} comes ${answer}.` }, index);
    }
    if (type === 5) {
      const nouns = age === 9 ? [["child", "children"], ["mouse", "mice"], ["person", "people"], ["tooth", "teeth"]] : [["book", "books"], ["cat", "cats"], ["apple", "apples"], ["car", "cars"]];
      const [single, plural] = nouns[round % nouns.length];
      return makeQuestion({ prompt: `Plural boss · próba ${round + 1}`, question: `What is the plural form of „${single}”?`, answer: plural, distractors: [`${single}s`, `${single}es`, `${plural}s`].filter((item) => item !== plural), fact: `One ${single}, many ${plural}.` }, index);
    }
    const hours = 1 + (round % 12);
    return makeQuestion({ prompt: `Clock mission · zegar ${round + 1}`, question: `Co znaczy zdanie „It is ${["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"][hours - 1]} o’clock”?`, answer: `Jest ${hours}:00.`, distractors: [`Jest ${hours}:30.`, `Jest ${((hours + 1) % 12) || 12}:00.`, `Jest ${hours}:15.`], fact: `„O’clock” oznacza pełną godzinę: ${hours}:00.` }, index);
  }

  const WORLD_FACTS = [
    ["Na jakiej planecie mieszkamy?", "Ziemia", ["Mars", "Wenus", "Jowisz"], "Ziemia jest trzecią planetą od Słońca."],
    ["Która planeta jest najbliżej Słońca?", "Merkury", ["Ziemia", "Mars", "Saturn"], "Merkury krąży najbliżej Słońca."],
    ["Jak nazywa się naturalny satelita Ziemi?", "Księżyc", ["Słońce", "Mars", "Wenus"], "Księżyc jest naturalnym satelitą Ziemi."],
    ["Jaki gaz jest potrzebny ludziom do oddychania?", "tlen", ["hel", "azot", "dwutlenek węgla"], "Organizm wykorzystuje tlen podczas oddychania."],
    ["Która część rośliny pobiera wodę z podłoża?", "korzeń", ["kwiat", "owoc", "liść"], "Korzenie pobierają wodę i sole mineralne."],
    ["Jak nazywa się zmiana lodu w wodę?", "topnienie", ["parowanie", "zamarzanie", "skraplanie"], "Lód pod wpływem ciepła topnieje."],
    ["Jak nazywa się stolica Polski?", "Warszawa", ["Kraków", "Gdańsk", "Wrocław"], "Warszawa jest stolicą Polski."],
    ["Na jakim kontynencie leży Polska?", "Europa", ["Azja", "Afryka", "Australia"], "Polska znajduje się w Europie."],
    ["Która rzeka jest najdłuższa w Polsce?", "Wisła", ["Odra", "Warta", "Bug"], "Wisła jest najdłuższą rzeką Polski."],
    ["Po której stronie świata wschodzi Słońce?", "na wschodzie", ["na zachodzie", "na północy", "na południu"], "Słońce pozornie wschodzi na wschodzie."],
    ["Które zwierzę jest ssakiem?", "delfin", ["rekin", "pstrąg", "ośmiornica"], "Delfin oddycha płucami i karmi młode mlekiem."],
    ["Ile minut ma godzina?", "60", ["30", "45", "100"], "Jedna godzina ma 60 minut."],
    ["Który organ pompuje krew?", "serce", ["płuca", "żołądek", "mózg"], "Serce tłoczy krew do całego ciała."],
    ["Który ocean jest największy?", "Ocean Spokojny", ["Ocean Atlantycki", "Ocean Indyjski", "Ocean Arktyczny"], "Ocean Spokojny zajmuje największą powierzchnię."],
    ["Jak nazywa się przyrząd do mierzenia temperatury?", "termometr", ["kompas", "mikroskop", "stoper"], "Temperaturę mierzymy termometrem."],
    ["Co chroni mózg człowieka?", "czaszka", ["żebra", "miednica", "łopatka"], "Mózg znajduje się wewnątrz czaszki."],
    ["Która pora roku następuje po lecie?", "jesień", ["zima", "wiosna", "lato"], "Po lecie przychodzi jesień."],
    ["Jak nazywa się młode żaby?", "kijanka", ["pisklę", "larwa motyla", "źrebię"], "Młoda żaba przechodzi etap kijanki."],
    ["Co wskazuje igła kompasu?", "kierunek północny", ["temperaturę", "wysokość", "godzinę"], "Igła kompasu ustawia się w osi północ–południe."],
    ["Jak nazywa się proces, w którym roślina wytwarza pokarm dzięki światłu?", "fotosynteza", ["parowanie", "oddychanie", "kiełkowanie"], "Fotosynteza wykorzystuje energię światła."]
  ];

  function worldQuestion(index, age) {
    const factIndex = (index * 7 + (age === 9 ? 3 : 0)) % WORLD_FACTS.length;
    const variant = Math.floor(index / WORLD_FACTS.length);
    const [question, answer, distractors, fact] = WORLD_FACTS[factIndex];
    const prompts = ["Laboratorium wiedzy", "Kosmiczny skaner", "Mapa odkrywcy", "Przyrodniczy patrol", "Eksperyment Tostobota"];
    return makeQuestion({
      prompt: `${prompts[variant % prompts.length]} · raport ${variant + 1}`,
      question: `${question}${variant ? ` (misja ${variant + 1})` : ""}`,
      answer,
      distractors,
      fact
    }, index);
  }

  function logicQuestion(index, age) {
    const type = index % 8;
    const round = Math.floor(index / 8);
    if (type <= 1) {
      const step = 2 + ((round + type) % (age === 9 ? 12 : 8));
      const start = 1 + ((round * 5) % 30);
      const answer = start + step * 4;
      return numericQuestion(answer, [answer - step, answer + step, answer + 1], "", { prompt: `Liczbowy trop · szyfr ${round + 1}`, question: `Jaka liczba będzie następna: ${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, …?`, fact: `Regułą jest dodawanie ${step}, więc otrzymujemy ${answer}.` }, index);
    }
    if (type === 2) {
      const directions = ["północ", "wschód", "południe", "zachód"];
      const start = round % 4;
      const turns = 1 + (round % 3);
      const answer = directions[(start + turns) % 4];
      return makeQuestion({ prompt: `Robot na zakręcie · trasa ${round + 1}`, question: `Robot patrzy na ${directions[start]} i ${turns} ${turns === 1 ? "raz" : "razy"} skręca w prawo. Dokąd teraz patrzy?`, answer, distractors: directions.filter((item) => item !== answer), fact: `Każdy skręt w prawo przesuwa kierunek o ćwierć obrotu.` }, index);
    }
    if (type === 3) {
      const values = [3 + round % 20, 8 + (round * 3) % 25, 15 + (round * 5) % 30].sort((a, b) => a - b);
      return makeQuestion({ prompt: `Porządkowanie mocy · zestaw ${round + 1}`, question: `Niebieski kryształ ma moc ${values[1]}, zielony ${values[0]}, a czerwony ${values[2]}. Który jest najsilniejszy?`, answer: "czerwony", distractors: ["niebieski", "zielony", "wszystkie są równe"], fact: `${values[2]} jest największą z podanych liczb.` }, index);
    }
    if (type === 4) {
      const base = 2 + (round % 9);
      const odd = base * 2 + 1;
      const evens = [base * 2, base * 2 + 2, base * 2 + 4];
      return makeQuestion({ prompt: `Intruz w szeregu · alarm ${round + 1}`, question: `Która liczba nie pasuje do pozostałych?`, answer: String(odd), distractors: evens.map(String), fact: `${odd} jest nieparzyste, a pozostałe liczby są parzyste.` }, index);
    }
    if (type === 5) {
      const names = rotate(["Olek", "Maja", "Tymon", "Zosia"], round);
      return makeQuestion({ prompt: `Kolejka do rakiety · start ${round + 1}`, question: `${names[0]} stoi przed ${names[1]}, ${names[1]} przed ${names[2]}, a ${names[2]} przed ${names[3]}. Kto stoi pierwszy?`, answer: names[0], distractors: names.slice(1), fact: `${names[0]} stoi przed wszystkimi pozostałymi.` }, index);
    }
    if (type === 6) {
      const animal = ["kot", "pies", "delfin", "koń"][round % 4];
      return makeQuestion({ prompt: `Kod prawdy · dowód ${round + 1}`, question: `Wszystkie ${animal}y oddychają. Luna jest zwierzęciem typu „${animal}”. Co z tego wynika?`, answer: "Luna oddycha", distractors: ["Luna jest rośliną", "Luna nie potrzebuje powietrza", "nie da się wyciągnąć żadnego wniosku"], fact: `Jeśli cecha dotyczy całej grupy, dotyczy też każdego jej elementu.` }, index);
    }
    const first = 2 + round % 7;
    const second = first * 2;
    const third = second + 3;
    const answer = third * 2;
    return numericQuestion(answer, [third + 2, answer + 3, second * 2], "", { prompt: `Podwójny szyfr · poziom ${round + 1}`, question: `Reguła to na zmianę „×2, +3”. Co będzie dalej: ${first}, ${second}, ${third}, …?`, fact: `Po dodaniu 3 kolejny krok to mnożenie przez 2: ${third} × 2 = ${answer}.` }, index);
  }

  const STORY_NAMES = ["Tymon", "Maja", "Olek", "Nela", "Kuba", "Zosia", "Filip", "Ania", "Bartek", "Lena"];
  const STORY_PLACES = ["biblioteki", "parku", "lasu", "muzeum", "ogrodu", "planetarium", "szkolnego boiska", "pracowni robotyki", "schroniska", "basenu"];
  const STORY_OBJECTS = [
    ["czerwoną mapę", "czerwoną mapę"], ["mały teleskop", "mały teleskop"], ["zielony notes", "zielony notes"],
    ["pudełko nasion", "pudełko nasion"], ["niebieski plecak", "niebieski plecak"], ["model rakiety", "model rakiety"],
    ["książkę o zwierzętach", "książkę o zwierzętach"], ["aparat fotograficzny", "aparat fotograficzny"],
    ["zestaw klocków", "zestaw klocków"], ["butelkę wody", "butelkę wody"]
  ];
  const STORY_REASONS = [
    ["zaczął padać deszcz", "zaczęło padać"], ["zrobiło się późno", "zbliżał się wieczór"],
    ["opiekun ogłosił koniec zajęć", "zajęcia dobiegły końca"], ["zadanie zostało wykonane", "ukończono plan"],
    ["nadciągnęła burza", "pogoda stała się niebezpieczna"]
  ];

  function readingQuestion(index, age) {
    const name = STORY_NAMES[index % STORY_NAMES.length];
    const place = STORY_PLACES[Math.floor(index / 3) % STORY_PLACES.length];
    const [object] = STORY_OBJECTS[Math.floor(index / 7) % STORY_OBJECTS.length];
    const [reason, paraphrase] = STORY_REASONS[Math.floor(index / 11) % STORY_REASONS.length];
    const day = ["poniedziałek", "wtorek", "środę", "czwartek", "piątek", "sobotę"][Math.floor(index / 13) % 6];
    const action = age === 9 ? "zanotował trzy najważniejsze obserwacje" : "narysował to, co zobaczył";
    const passage = `W ${day} ${name} wybrał się do ${place}. Zabrał ${object}, a podczas wizyty ${action}. Wrócił wcześniej, ponieważ ${reason}.`;
    const type = index % 5;
    if (type === 0) return makeQuestion({ prompt: `Czytelniczy detektyw · tekst ${index + 1}`, passage, question: `Co zabrał ze sobą ${name}?`, answer: object, distractors: rotate(STORY_OBJECTS.map((item) => item[0]), index + 1).filter((item) => item !== object).slice(0, 3), fact: `Informacja o przedmiocie znajduje się w drugim zdaniu.` }, index);
    if (type === 1) return makeQuestion({ prompt: `Tropienie przyczyny · tekst ${index + 1}`, passage, question: `Dlaczego ${name} wrócił wcześniej?`, answer: reason, distractors: rotate(STORY_REASONS.map((item) => item[0]), index + 2).filter((item) => item !== reason).slice(0, 3), fact: `Ostatnie zdanie podaje przyczynę: ${paraphrase}.` }, index);
    if (type === 2) return makeQuestion({ prompt: `Kalendarz czytelnika · tekst ${index + 1}`, passage, question: `W jaki dzień odbyła się wyprawa?`, answer: day, distractors: rotate(["poniedziałek", "wtorek", "środę", "czwartek", "piątek", "sobotę"], index + 1).filter((item) => item !== day).slice(0, 3), fact: `Dzień został podany na początku tekstu.` }, index);
    if (type === 3) return makeQuestion({ prompt: `Miejsce akcji · tekst ${index + 1}`, passage, question: `Dokąd wybrał się ${name}?`, answer: `do ${place}`, distractors: rotate(STORY_PLACES.map((item) => `do ${item}`), index + 3).filter((item) => item !== `do ${place}`).slice(0, 3), fact: `Miejsce wyprawy pojawia się w pierwszym zdaniu.` }, index);
    return makeQuestion({ prompt: `Wniosek z tekstu · tekst ${index + 1}`, passage, question: `Które zdanie najlepiej podsumowuje wyprawę?`, answer: `${name} odwiedził ciekawe miejsce i wykonał zadanie.`, distractors: [`${name} cały dzień został w domu.`, `${name} zgubił wszystkie rzeczy.`, `Wyprawa nie doszła do skutku.`], fact: `Tekst opisuje odbytą wizytę, wykonane zadanie i wcześniejszy powrót.` }, index);
  }

  function codingQuestion(index, age) {
    const type = index % 8;
    const round = Math.floor(index / 8);
    if (type === 0) {
      const start = 1 + round % 20;
      const add = 2 + (round * 3) % 15;
      const answer = start + add;
      return numericQuestion(answer, [start, add, answer + 1], "", { prompt: `Zmienna przechowuje moc · kod ${round + 1}`, question: `Zmienna punkty ma wartość ${start}. Program wykonuje „punkty = punkty + ${add}”. Jaka jest nowa wartość?`, fact: `Do starej wartości ${start} dodajemy ${add}, więc zmienna ma wartość ${answer}.` }, index);
    }
    if (type === 1) {
      const repeats = 2 + round % 10;
      const actions = age === 9 ? 2 + round % 4 : 1 + round % 3;
      const answer = repeats * actions;
      return numericQuestion(answer, [repeats, actions, answer + repeats], "", { prompt: `Pętla w akcji · program ${round + 1}`, question: `Pętla działa ${repeats} razy i w każdym obrocie wykonuje ${actions} kroki. Ile kroków wykona łącznie?`, fact: `${repeats} × ${actions} = ${answer} kroków.` }, index);
    }
    if (type === 2) {
      const threshold = 5 + round % 30;
      const value = threshold + (round % 2 ? 2 : -2);
      const answer = value > threshold ? "pokaże medal" : "nie pokaże medalu";
      return makeQuestion({ prompt: `Warunek logiczny · test ${round + 1}`, question: `JEŚLI punkty > ${threshold}, pokaż medal. Punkty wynoszą ${value}. Co zrobi program?`, answer, distractors: [answer === "pokaże medal" ? "nie pokaże medalu" : "pokaże medal", "wyłączy komputer", "usunie wszystkie punkty"], fact: `Porównujemy ${value} z ${threshold}; warunek jest ${value > threshold ? "prawdziwy" : "fałszywy"}.` }, index);
    }
    if (type === 3) return makeQuestion({ prompt: `Łowca błędów · zgłoszenie ${round + 1}`, question: `Program miał dodać dwie liczby, ale je odejmuje. Co należy zrobić?`, answer: "znaleźć i poprawić błąd", distractors: ["wyłączyć monitor", "usunąć cały projekt", "zmienić nazwę programu"], fact: "Znajdowanie i poprawianie błędów to debugowanie." }, index);
    if (type === 4) {
      const side = 5 + round % 20;
      return makeQuestion({ prompt: `Algorytm rysownika · figura ${round + 1}`, question: `Która instrukcja narysuje kwadrat o boku ${side} kroków?`, answer: `powtórz 4 razy: idź ${side} kroków i skręć 90°`, distractors: [`powtórz 3 razy: idź ${side} kroków i skręć 90°`, `idź ${side * 4} kroków bez skręcania`, `powtórz 4 razy: skręć 45°`], fact: "Kwadrat ma cztery boki i cztery kąty proste." }, index);
    }
    if (type === 5) {
      const list = [3 + round % 8, 8 + round % 9, 15 + round % 10];
      return makeQuestion({ prompt: `Lista danych · indeks ${round + 1}`, question: `Lista ma elementy [${list.join(", ")}]. Który element jest drugi?`, answer: String(list[1]), distractors: [String(list[0]), String(list[2]), String(list.length)], fact: `Drugi element listy to ${list[1]}.` }, index);
    }
    if (type === 6) {
      const x = 2 + round % 12;
      const y = 3 + (round * 2) % 12;
      return makeQuestion({ prompt: `Operator porównania · próba ${round + 1}`, question: `Które zdanie logiczne jest prawdziwe dla x = ${x} i y = ${y}?`, answer: x < y ? "x < y" : x > y ? "x > y" : "x = y", distractors: ["x = 0", "y = 0", x < y ? "x > y" : "x < y"], fact: `Porównujemy wartości ${x} i ${y}.` }, index);
    }
    const steps = ["włącz robota", "sprawdź czujnik", "wykonaj ruch", "zapisz wynik"];
    return makeQuestion({ prompt: `Algorytm misji · plan ${round + 1}`, question: `Która kolejność jest najbardziej logiczna?`, answer: steps.join(" → "), distractors: [rotate(steps, 1).join(" → "), [...steps].reverse().join(" → "), [steps[2], steps[0], steps[3], steps[1]].join(" → ")], fact: "Najpierw uruchamiamy urządzenie, potem sprawdzamy dane, działamy i zapisujemy wynik." }, index);
  }

  const GENERATORS = { math: mathQuestion, polish: polishQuestion, english: englishQuestion, world: worldQuestion, logic: logicQuestion, reading: readingQuestion, coding: codingQuestion };

  function buildQuestionBank(seedBank) {
    const result = { 8: {}, 9: {} };
    [8, 9].forEach((age) => {
      Object.keys(GENERATORS).forEach((subject) => {
        const seeds = (seedBank?.[age]?.[subject] || []).map((item) => ({ ...item }));
        const pool = [...seeds];
        const seen = new Set(pool.map((item) => `${item.prompt}|${item.passage || ""}|${item.question}`));
        let generatedIndex = 0;
        while (pool.length < TARGET_PER_SUBJECT) {
          const item = GENERATORS[subject](generatedIndex, age);
          generatedIndex += 1;
          const key = `${item.prompt}|${item.passage || ""}|${item.question}`;
          if (seen.has(key) || item.answers.length !== 4 || !item.answers.includes(item.answer)) continue;
          seen.add(key);
          pool.push(item);
        }
        result[age][subject] = pool.slice(0, TARGET_PER_SUBJECT).map((item, index) => ({ ...item, id: `${age}-${subject}-${index + 1}` }));
      });
    });
    return result;
  }

  const MOTIVATION_STARTS = [
    "Dziś każdy mały krok", "Twoja ciekawość", "Jedna odważna próba", "Spokojne skupienie", "Każde dobre pytanie",
    "Twój wysiłek", "Nowa rzecz poznana dzisiaj", "Pięć minut treningu", "Błąd, który poprawisz", "Pomysł, który sprawdzisz",
    "Wytrwałość w trudnym zadaniu", "Mądra przerwa", "Radość z odkrywania", "Odwaga do pytania", "Dokończona misja",
    "Każda przeczytana strona", "Każde rozwiązane działanie", "Sprytny plan", "Uważne czytanie", "Dzisiejsza praktyka",
    "Twoje własne tempo", "Małe zwycięstwo", "Chwila pełnego skupienia", "Kolejna próba", "Wiedza zdobyta z uśmiechem"
  ];
  const MOTIVATION_ENDS = [
    "buduje Twoją wielką moc.", "przybliża Cię do mistrzostwa.", "sprawia, że jutro umiesz więcej.", "jest paliwem dla TurboMózgu.",
    "zamienia trudność w nową umiejętność.", "pokazuje, jak dużo potrafisz.", "otwiera drzwi do kolejnego odkrycia.", "rośnie razem z Tobą.",
    "jest ważniejsze niż idealny wynik.", "uczy mózg nowych sztuczek.", "prowadzi prosto do celu.", "daje Ci przewagę nad wczorajszym sobą.",
    "zasługuje na małe świętowanie.", "dodaje odwagi do następnego zadania.", "robi różnicę, nawet jeśli jeszcze jej nie widać.",
    "jest dowodem prawdziwej wytrwałości.", "pomaga zamienić „nie umiem” w „jeszcze się uczę”.", "wzmacnia pamięć i pewność siebie.",
    "tworzy świetny dzień do nauki.", "może być początkiem czegoś wielkiego."
  ];
  const MOTIVATIONS = MOTIVATION_STARTS.flatMap((start) => MOTIVATION_ENDS.map((end) => `${start} ${end}`));

  const MOTIVATION_STARTS_DE = [
    "Heute baut jeder kleine Schritt", "Deine Neugier", "Ein mutiger Versuch", "Ruhige Konzentration", "Jede gute Frage",
    "Deine Anstrengung", "Etwas Neues, das du heute lernst", "Fünf Minuten Training", "Ein Fehler, den du verbesserst", "Eine Idee, die du ausprobierst",
    "Ausdauer bei einer schwierigen Aufgabe", "Eine kluge Pause", "Freude am Entdecken", "Der Mut zu fragen", "Eine beendete Mission",
    "Jede gelesene Seite", "Jede gelöste Rechnung", "Ein cleverer Plan", "Aufmerksames Lesen", "Die heutige Übung",
    "Dein eigenes Tempo", "Ein kleiner Sieg", "Ein Moment voller Konzentration", "Der nächste Versuch", "Wissen mit einem Lächeln"
  ];
  const MOTIVATION_ENDS_DE = [
    "deine große Stärke auf.", "bringt dich der Meisterschaft näher.", "sorgt dafür, dass du morgen mehr kannst.", "ist Treibstoff für dein Turbohirn.",
    "verwandelt Schwieriges in eine neue Fähigkeit.", "zeigt dir, wie viel du kannst.", "öffnet die Tür zur nächsten Entdeckung.", "wächst gemeinsam mit dir.",
    "ist wichtiger als ein perfektes Ergebnis.", "bringt deinem Gehirn neue Tricks bei.", "führt dich direkt zum Ziel.", "macht dich stärker als gestern.",
    "verdient eine kleine Feier.", "gibt dir Mut für die nächste Aufgabe.", "macht einen Unterschied, auch wenn du ihn noch nicht siehst.",
    "ist ein Zeichen echter Ausdauer.", "verwandelt ‚Ich kann das nicht‘ in ‚Ich lerne es noch‘.", "stärkt Gedächtnis und Selbstvertrauen.",
    "macht diesen Tag zu einem guten Lerntag.", "kann der Anfang von etwas Großem sein."
  ];
  const MOTIVATIONS_DE = MOTIVATION_STARTS_DE.flatMap((start) => MOTIVATION_ENDS_DE.map((end) => `${start} ${end}`));

  const MOTIVATION_STARTS_EN = [
    "Today, every small step", "Your curiosity", "One brave attempt", "Calm concentration", "Every good question",
    "Your effort", "Something new you learn today", "Five minutes of practice", "A mistake you improve", "An idea you test",
    "Sticking with a hard task", "A smart break", "The joy of discovery", "The courage to ask", "A finished mission",
    "Every page you read", "Every calculation you solve", "A clever plan", "Careful reading", "Today's practice",
    "Your own pace", "A small victory", "A moment of full focus", "The next attempt", "Knowledge gained with a smile"
  ];
  const MOTIVATION_ENDS_EN = [
    "builds your great power.", "brings you closer to mastery.", "helps you know more tomorrow.", "is fuel for your Turbo Brain.",
    "turns a challenge into a new skill.", "shows how much you can do.", "opens the door to another discovery.", "grows together with you.",
    "matters more than a perfect score.", "teaches your brain new tricks.", "leads you straight towards your goal.", "makes you stronger than yesterday.",
    "deserves a little celebration.", "gives you courage for the next task.", "makes a difference, even when you cannot see it yet.",
    "is proof of real perseverance.", "turns ‘I cannot do it’ into ‘I am still learning’.", "strengthens memory and confidence.",
    "makes today a great day to learn.", "can be the start of something big."
  ];
  const MOTIVATIONS_EN = MOTIVATION_STARTS_EN.flatMap((start) => MOTIVATION_ENDS_EN.map((end) => `${start} ${end}`));

  function dailyMotivation(date = new Date(), language = "pl") {
    const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
    const pool = language === "de" ? MOTIVATIONS_DE : language === "en" ? MOTIVATIONS_EN : MOTIVATIONS;
    return pool[Math.abs(dayNumber) % pool.length];
  }

  window.TYMO_CONTENT = {
    TARGET_PER_SUBJECT,
    MOTIVATIONS,
    MOTIVATIONS_DE,
    MOTIVATIONS_EN,
    buildQuestionBank,
    dailyMotivation
  };
})();
