// CMI 2026 GAME
// A plain JavaScript arcade learning platform for CS and math practice.

const STORAGE_KEY = "cmi2026Progress";
const MIXED_TOPIC = "mixed";

// Topic cards shown on the topic selection screen.
const topics = [
  {
    id: "Logic",
    name: "Logic",
    description: "Practice implications, truth conditions, and clean reasoning.",
    difficulty: "Starter to Medium"
  },
  {
    id: "Binary Numbers",
    name: "Binary Numbers",
    description: "Convert, compare, and reason with base-2 numbers.",
    difficulty: "Starter"
  },
  {
    id: "Algorithms",
    name: "Algorithms",
    description: "Build intuition for search, sorting, and complexity.",
    difficulty: "Medium"
  },
  {
    id: "Counting & Combinatorics",
    name: "Counting & Combinatorics",
    description: "Count arrangements, choices, subsets, and small cases.",
    difficulty: "Medium"
  },
  {
    id: "Graph Theory Basics",
    name: "Graph Theory Basics",
    description: "Work with trees, degrees, paths, and simple graph facts.",
    difficulty: "Medium"
  },
  {
    id: "Pattern Recognition",
    name: "Pattern Recognition",
    description: "Spot number patterns and explain the hidden rule.",
    difficulty: "Starter to Hard"
  },
  {
    id: MIXED_TOPIC,
    name: "Mixed Challenge",
    description: "Shuffle every topic into one arcade exam-style round.",
    difficulty: "Adaptive"
  }
];

// Mini lessons shown before practice. Mixed Challenge gets its own strategy lesson.
const lessons = {
  Logic: {
    title: "Logic",
    explanation: "Logic questions ask you to follow rules exactly. Do not guess from vibes; translate the statement and test what must be true.",
    points: [
      "For 'if P then Q', P is the condition and Q is the result.",
      "The contrapositive 'if not Q then not P' is logically equivalent.",
      "XOR means exactly one statement is true.",
      "A counterexample is enough to disprove a universal claim."
    ],
    example: "If every coder is careful, and Anya is a coder, then Anya must be careful."
  },
  "Binary Numbers": {
    title: "Binary Numbers",
    explanation: "Binary uses powers of two. Read each digit by its place value, then add the powers where the digit is 1.",
    points: [
      "Rightmost bit has value 1.",
      "Moving left doubles the place value: 1, 2, 4, 8, 16.",
      "Binary AND keeps a 1 only when both bits are 1.",
      "Binary OR keeps a 1 when at least one bit is 1."
    ],
    example: "1011 = 8 + 0 + 2 + 1 = 11."
  },
  Algorithms: {
    title: "Algorithms",
    explanation: "Algorithm questions test how a method behaves as input grows. Look for repeated halving, repeated scanning, or nested loops.",
    points: [
      "Binary search halves the remaining search space.",
      "One full pass through n items is usually O(n).",
      "Nested loops over the same list often suggest O(n^2).",
      "Sorting algorithms differ by their repeated operation."
    ],
    example: "Searching a sorted list by repeatedly checking the middle is binary search, which is O(log n)."
  },
  "Counting & Combinatorics": {
    title: "Counting & Combinatorics",
    explanation: "Counting questions reward careful casework. Decide whether order matters and whether repetition is allowed.",
    points: [
      "Arrangements usually care about order.",
      "Choices usually do not care about order.",
      "A set with n elements has 2^n subsets.",
      "Break hard counts into smaller cases."
    ],
    example: "Choosing 2 students from 5 gives 10 pairs, because AB and BA are the same team."
  },
  "Graph Theory Basics": {
    title: "Graph Theory Basics",
    explanation: "Graph theory studies vertices and edges. Many starter problems use a few powerful facts about trees and degrees.",
    points: [
      "A tree is connected and has no cycles.",
      "A tree with n vertices has n - 1 edges.",
      "The sum of degrees in an undirected graph is twice the number of edges.",
      "A complete graph connects every pair of vertices."
    ],
    example: "A tree with 8 vertices has 7 edges."
  },
  "Pattern Recognition": {
    title: "Pattern Recognition",
    explanation: "Pattern questions are about testing possible rules. Check differences, ratios, squares, and alternating behavior.",
    points: [
      "Start with differences between neighboring terms.",
      "If differences grow steadily, check second differences.",
      "Look for powers, squares, primes, or Fibonacci-style sums.",
      "Make sure the rule explains every shown term."
    ],
    example: "1, 4, 9, 16 continues with 25 because these are square numbers."
  },
  [MIXED_TOPIC]: {
    title: "Mixed Challenge",
    explanation: "Mixed mode simulates a fast practice round. Switch strategies quickly and use the category label as your clue.",
    points: [
      "Read the category first.",
      "For logic, identify what must be true.",
      "For counting, decide whether order matters.",
      "For algorithms, ask how many steps grow with input size.",
      "For patterns, test a simple rule before choosing."
    ],
    example: "A mixed round might jump from binary conversion to graph degrees, so reset your strategy each question."
  }
};

// Original CMI/Tessellate-inspired practice questions. Do not copy real exams.
const questions = [
  q("Logic", "If every puzzle-solver is patient and Tara is a puzzle-solver, what must be true?", ["Tara is patient", "Tara is not patient", "Every patient person solves puzzles", "No patient person solves puzzles"], 0, 1, "The rule says all puzzle-solvers are patient. Tara is in that group."),
  q("Logic", "The contrapositive of 'If P then Q' is:", ["If Q then P", "If not P then not Q", "If not Q then not P", "P and Q"], 2, 2, "The contrapositive reverses and negates both parts."),
  q("Logic", "Exactly one of A and B is true. Which operation describes this?", ["AND", "OR", "XOR", "NOT"], 2, 2, "XOR is true when exactly one input is true."),
  q("Logic", "A statement says: all red tokens are heavy. Which observation disproves it?", ["A heavy red token", "A light blue token", "A light red token", "A heavy blue token"], 2, 3, "One red token that is not heavy is a counterexample."),
  q("Logic", "If 'some robots are artists' is true, which must also be true?", ["All robots are artists", "At least one robot is an artist", "No robots are artists", "All artists are robots"], 1, 1, "Some means at least one."),

  q("Binary Numbers", "What is 1010 in decimal?", ["8", "9", "10", "12"], 2, 1, "1010 = 8 + 2 = 10."),
  q("Binary Numbers", "What is 1111 in decimal?", ["12", "14", "15", "16"], 2, 1, "1111 = 8 + 4 + 2 + 1 = 15."),
  q("Binary Numbers", "What is 100000 in decimal?", ["16", "24", "32", "64"], 2, 2, "The 1 is in the 32 place."),
  q("Binary Numbers", "What is 1101 AND 1011?", ["1001", "1011", "1101", "1111"], 0, 3, "AND keeps 1 only where both inputs have 1."),
  q("Binary Numbers", "Which binary number equals decimal 6?", ["101", "110", "111", "1001"], 1, 1, "6 = 4 + 2, so the binary form is 110."),

  q("Algorithms", "Binary search on a sorted list runs in:", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 1, 2, "Binary search halves the search space each step."),
  q("Algorithms", "Which method repeatedly chooses the smallest remaining item?", ["Merge sort", "Selection sort", "Quick sort", "Insertion sort"], 1, 2, "Selection sort selects the next smallest item each pass."),
  q("Algorithms", "A loop that checks every item in a list of length n is usually:", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 2, 1, "One pass over n items grows linearly."),
  q("Algorithms", "Two nested loops, each running n times, usually suggest:", ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"], 3, 3, "n work repeated n times gives n squared work."),
  q("Algorithms", "Which data structure is best for undo history?", ["Queue", "Stack", "Graph", "Set"], 1, 1, "Undo uses last-in, first-out behavior, which is a stack."),

  q("Counting & Combinatorics", "How many ways can 3 different medals be arranged in a row?", ["3", "6", "9", "12"], 1, 1, "3! = 3 x 2 x 1 = 6."),
  q("Counting & Combinatorics", "How many subsets does a set with 4 elements have?", ["4", "8", "12", "16"], 3, 2, "A set with n elements has 2^n subsets."),
  q("Counting & Combinatorics", "How many teams of 2 can be chosen from 5 students?", ["5", "10", "20", "25"], 1, 2, "There are 5 choose 2 = 10 unordered pairs."),
  q("Counting & Combinatorics", "A 2-digit code uses digits 0-9 and repetition is allowed. How many codes exist?", ["20", "90", "100", "200"], 2, 1, "There are 10 choices for each position: 10 x 10 = 100."),
  q("Counting & Combinatorics", "How many paths spell RRUU using exactly two R moves and two U moves?", ["4", "5", "6", "8"], 2, 3, "Choose the 2 positions for R among 4 total moves: 6."),

  q("Graph Theory Basics", "A tree with 6 vertices has how many edges?", ["4", "5", "6", "12"], 1, 1, "A tree with n vertices has n - 1 edges."),
  q("Graph Theory Basics", "The sum of degrees in an undirected graph equals:", ["Number of vertices", "Number of edges", "Twice the number of edges", "Always 10"], 2, 2, "Each edge contributes 2 to the total degree count."),
  q("Graph Theory Basics", "A connected graph with no cycles is called a:", ["Clique", "Tree", "Path only", "Complete graph"], 1, 1, "That is the definition of a tree."),
  q("Graph Theory Basics", "How many edges does a complete graph on 5 vertices have?", ["5", "8", "10", "20"], 2, 3, "Every pair of vertices is connected: 5 choose 2 = 10."),
  q("Graph Theory Basics", "If a graph has 4 edges, what is the sum of all degrees?", ["4", "6", "8", "16"], 2, 2, "Degree sum is twice the edge count, so 8."),

  q("Pattern Recognition", "Complete the pattern: 2, 4, 8, 16, ?", ["20", "24", "30", "32"], 3, 1, "Each term doubles."),
  q("Pattern Recognition", "Complete the pattern: 1, 1, 2, 3, 5, 8, ?", ["10", "11", "13", "15"], 2, 2, "Each term is the sum of the previous two."),
  q("Pattern Recognition", "Complete the pattern: 3, 6, 11, 18, 27, ?", ["34", "36", "38", "40"], 2, 3, "Differences are 3, 5, 7, 9, so next difference is 11."),
  q("Pattern Recognition", "Which comes next: 1, 4, 9, 16, 25, ?", ["30", "32", "36", "49"], 2, 1, "These are square numbers: 1^2 through 6^2."),
  q("Pattern Recognition", "Complete the pattern: 5, 10, 20, 40, ?", ["45", "50", "60", "80"], 3, 1, "Each term doubles.")
];

function q(category, question, options, answer, difficulty, explanation) {
  return { category, question, options, answer, difficulty, explanation };
}

// DOM references.
const screens = {
  home: document.querySelector("#home-screen"),
  how: document.querySelector("#how-screen"),
  topics: document.querySelector("#topic-screen"),
  lesson: document.querySelector("#lesson-screen"),
  game: document.querySelector("#game-screen"),
  results: document.querySelector("#results-screen")
};

const topicGrid = document.querySelector("#topic-grid");
const startLearningButton = document.querySelector("#start-learning-button");
const practiceArcadeButton = document.querySelector("#practice-arcade-button");
const howItWorksButton = document.querySelector("#how-it-works-button");
const startPracticeButton = document.querySelector("#start-practice-button");
const retryTopicButton = document.querySelector("#retry-topic-button");
const chooseNewTopicButton = document.querySelector("#choose-new-topic-button");
const backHomeButton = document.querySelector("#back-home-button");

const scoreEl = document.querySelector("#score");
const livesEl = document.querySelector("#lives");
const levelEl = document.querySelector("#level");
const timerEl = document.querySelector("#timer");
const progressEl = document.querySelector("#progress");
const categoryEl = document.querySelector("#category");
const difficultyEl = document.querySelector("#difficulty");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");

const lessonKickerEl = document.querySelector("#lesson-kicker");
const lessonTitleEl = document.querySelector("#lesson-title");
const lessonExplanationEl = document.querySelector("#lesson-explanation");
const lessonPointsEl = document.querySelector("#lesson-points");
const lessonExampleEl = document.querySelector("#lesson-example");

const finalScoreEl = document.querySelector("#final-score");
const questionsAttemptedEl = document.querySelector("#questions-attempted");
const correctAnswersEl = document.querySelector("#correct-answers");
const wrongAnswersEl = document.querySelector("#wrong-answers");
const accuracyEl = document.querySelector("#accuracy");
const highestLevelEl = document.querySelector("#highest-level");
const weakestTopicEl = document.querySelector("#weakest-topic");
const resultTitleEl = document.querySelector("#result-title");
const resultMessageEl = document.querySelector("#result-message");
const reviseListEl = document.querySelector("#revise-list");
const revisionTipsEl = document.querySelector("#revision-tips");

const homeBestScoreEl = document.querySelector("#home-best-score");
const homeGamesPlayedEl = document.querySelector("#home-games-played");
const homeBestAccuracyEl = document.querySelector("#home-best-accuracy");
const homeLastTopicEl = document.querySelector("#home-last-topic");

// Game state.
let selectedTopic = MIXED_TOPIC;
let activeQuestions = [];
let currentQuestion = 0;
let score = 0;
let lives = 3;
let level = 1;
let highestLevel = 1;
let timeLeft = 20;
let timerId = null;
let locked = false;
let correctCount = 0;
let wrongCount = 0;
let missedByCategory = {};

function showScreen(name) {
  clearInterval(timerId);
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");

  if (name === "home") {
    updateHomeProgress();
  }
}

function getProgress() {
  let saved = null;

  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return { bestScore: 0, gamesPlayed: 0, bestAccuracy: 0, lastTopic: "None" };
  }

  if (!saved) {
    return { bestScore: 0, gamesPlayed: 0, bestAccuracy: 0, lastTopic: "None" };
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return { bestScore: 0, gamesPlayed: 0, bestAccuracy: 0, lastTopic: "None" };
  }
}

function saveProgress(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    // Progress tracking is helpful, but the game should still work if storage is blocked.
  }
}

function updateHomeProgress() {
  const progress = getProgress();
  homeBestScoreEl.textContent = progress.bestScore;
  homeGamesPlayedEl.textContent = progress.gamesPlayed;
  homeBestAccuracyEl.textContent = `${progress.bestAccuracy}%`;
  homeLastTopicEl.textContent = progress.lastTopic;
}

function renderTopicCards() {
  topicGrid.innerHTML = "";

  topics.forEach((topic) => {
    const card = document.createElement("article");
    card.className = "topic-card";
    card.innerHTML = `
      <span>${topic.difficulty}</span>
      <h3>${topic.name}</h3>
      <p>${topic.description}</p>
      <button class="primary-button small-button" type="button">Start Lesson</button>
    `;

    card.querySelector("button").addEventListener("click", () => chooseTopic(topic.id));
    topicGrid.appendChild(card);
  });
}

function chooseTopic(topicId) {
  selectedTopic = topicId;
  renderLesson(topicId);
  showScreen("lesson");
}

function renderLesson(topicId) {
  const lesson = lessons[topicId];
  lessonKickerEl.textContent = topicId === MIXED_TOPIC ? "Strategy Lesson" : "Topic Lesson";
  lessonTitleEl.textContent = lesson.title;
  lessonExplanationEl.textContent = lesson.explanation;
  lessonExampleEl.textContent = lesson.example;
  lessonPointsEl.innerHTML = "";

  lesson.points.forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    lessonPointsEl.appendChild(item);
  });
}

function startPractice(topicId = selectedTopic) {
  selectedTopic = topicId;
  const pool = topicId === MIXED_TOPIC ? questions : questions.filter((question) => question.category === topicId);
  activeQuestions = shuffle(pool).slice(0, topicId === MIXED_TOPIC ? 18 : pool.length);

  score = 0;
  lives = 3;
  level = 1;
  highestLevel = 1;
  currentQuestion = 0;
  timeLeft = 20;
  locked = false;
  correctCount = 0;
  wrongCount = 0;
  missedByCategory = {};

  showScreen("game");
  loadQuestion();
}

function shuffle(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((entry) => entry.item);
}

function updateLevel() {
  level = Math.floor(currentQuestion / 5) + 1;
  highestLevel = Math.max(highestLevel, level);
}

function getQuestionTime() {
  return Math.max(8, 22 - (level - 1) * 3);
}

function loadQuestion() {
  clearInterval(timerId);

  if (currentQuestion >= activeQuestions.length) {
    endGame(true);
    return;
  }

  updateLevel();
  locked = false;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "Choose your answer.";
  feedbackEl.className = "feedback";
  timerEl.classList.remove("urgent");

  const question = activeQuestions[currentQuestion];
  categoryEl.textContent = question.category;
  difficultyEl.textContent = `Difficulty ${question.difficulty}`;
  questionEl.textContent = question.question;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    answersEl.appendChild(button);
  });

  timeLeft = getQuestionTime();
  updateHud();
  timerId = setInterval(tickTimer, 1000);
}

function updateHud() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
  progressEl.textContent = `${Math.min(currentQuestion + 1, activeQuestions.length)}/${activeQuestions.length}`;
  timerEl.textContent = timeLeft;
}

function tickTimer() {
  timeLeft -= 1;
  updateHud();

  if (timeLeft <= 5) {
    timerEl.classList.add("urgent");
  }

  if (timeLeft <= 0) {
    markWrong("Time's up!");
  }
}

function chooseAnswer(selectedIndex) {
  if (locked) {
    return;
  }

  const question = activeQuestions[currentQuestion];

  if (selectedIndex === question.answer) {
    markCorrect(selectedIndex, question);
    return;
  }

  markWrong("Wrong answer!", selectedIndex);
}

function markCorrect(selectedIndex, question) {
  locked = true;
  clearInterval(timerId);
  disableAnswers();

  const points = 10 + (level - 1) * 5 + question.difficulty * 2 + Math.max(0, timeLeft);
  score += points;
  correctCount += 1;

  answersEl.children[selectedIndex].classList.add("correct", "flash-correct");
  feedbackEl.textContent = `Correct! +${points}. ${question.explanation}`;
  feedbackEl.className = "feedback good pop";

  updateHud();
  moveNextSoon();
}

function markWrong(message, selectedIndex = null) {
  if (locked) {
    return;
  }

  locked = true;
  clearInterval(timerId);
  lives -= 1;
  wrongCount += 1;
  disableAnswers();

  const question = activeQuestions[currentQuestion];
  missedByCategory[question.category] = (missedByCategory[question.category] || 0) + 1;

  if (selectedIndex !== null && answersEl.children[selectedIndex]) {
    answersEl.children[selectedIndex].classList.add("wrong", "flash-wrong");
  }

  answersEl.children[question.answer].classList.add("correct");
  feedbackEl.textContent = `${message} ${question.explanation}`;
  feedbackEl.className = "feedback bad pop";
  updateHud();

  if (lives <= 0) {
    setTimeout(() => endGame(false), 1600);
    return;
  }

  moveNextSoon();
}

function disableAnswers() {
  answersEl.querySelectorAll(".answer-button").forEach((button) => {
    button.disabled = true;
  });
}

function moveNextSoon() {
  currentQuestion += 1;
  setTimeout(loadQuestion, 1700);
}

function endGame(completedAllQuestions) {
  clearInterval(timerId);
  const attempted = correctCount + wrongCount;
  const accuracy = attempted === 0 ? 0 : Math.round((correctCount / attempted) * 100);
  const weakestTopic = getWeakestTopic();

  resultTitleEl.textContent = completedAllQuestions ? "Lesson Run Complete" : "Game Over";
  finalScoreEl.textContent = score;
  questionsAttemptedEl.textContent = `${attempted}/${activeQuestions.length}`;
  correctAnswersEl.textContent = correctCount;
  wrongAnswersEl.textContent = wrongCount;
  accuracyEl.textContent = `${accuracy}%`;
  highestLevelEl.textContent = highestLevel;
  weakestTopicEl.textContent = weakestTopic;
  resultMessageEl.textContent = getPerformanceMessage(accuracy);

  renderRevision(weakestTopic);
  updateStoredProgress(accuracy);
  showScreen("results");
}

function getWeakestTopic() {
  const entries = Object.entries(missedByCategory);

  if (entries.length === 0) {
    return "None";
  }

  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function getPerformanceMessage(accuracy) {
  if (accuracy >= 80) {
    return "CMI finalist mode activated!";
  }

  if (accuracy >= 50) {
    return "Strong attempt — your logic is warming up!";
  }

  return "Keep training, future finalist!";
}

function renderRevision(weakestTopic) {
  reviseListEl.innerHTML = "";
  revisionTipsEl.innerHTML = "";

  const missedTopics = Object.keys(missedByCategory);

  if (missedTopics.length === 0) {
    reviseListEl.innerHTML = "<p>No weak topic detected. Try a harder mixed challenge next.</p>";
    addTip("Review explanations anyway; perfect rounds are how speed improves.");
    addTip("Try Mixed Challenge to test topic-switching under time pressure.");
    return;
  }

  missedTopics.forEach((topic) => {
    const badge = document.createElement("span");
    badge.textContent = `Revise: ${topic}`;
    reviseListEl.appendChild(badge);
  });

  const lesson = lessons[weakestTopic] || lessons[MIXED_TOPIC];
  addTip(`Reread the ${lesson.title} lesson before retrying.`);
  addTip(lesson.points[0]);
  addTip("Slow down on the category label; it tells you which strategy to use.");
}

function addTip(text) {
  const item = document.createElement("li");
  item.textContent = text;
  revisionTipsEl.appendChild(item);
}

function updateStoredProgress(accuracy) {
  const progress = getProgress();
  const topicName = topics.find((topic) => topic.id === selectedTopic)?.name || "Mixed Challenge";
  const nextProgress = {
    bestScore: Math.max(progress.bestScore, score),
    gamesPlayed: progress.gamesPlayed + 1,
    bestAccuracy: Math.max(progress.bestAccuracy, accuracy),
    lastTopic: topicName
  };

  saveProgress(nextProgress);
}

function addClick(element, handler) {
  if (element) {
    element.addEventListener("click", handler);
  }
}

// Event wiring.
addClick(startLearningButton, () => showScreen("topics"));
addClick(practiceArcadeButton, () => chooseTopic(MIXED_TOPIC));
addClick(howItWorksButton, () => showScreen("how"));
addClick(startPracticeButton, () => startPractice());
addClick(retryTopicButton, () => startPractice(selectedTopic));
addClick(chooseNewTopicButton, () => showScreen("topics"));
addClick(backHomeButton, () => showScreen("home"));

document.querySelectorAll("[data-go-home]").forEach((button) => {
  button.addEventListener("click", () => showScreen("home"));
});

document.querySelectorAll("[data-go-topics]").forEach((button) => {
  button.addEventListener("click", () => showScreen("topics"));
});

renderTopicCards();
updateHomeProgress();
