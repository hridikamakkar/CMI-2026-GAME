// CMI 2026 GAME
// Plain JavaScript arcade learning platform for CS and math practice.

const STORAGE_KEY = "cmi2026Progress";
const MIXED_TOPIC = "mixed";

const defaultProgress = {
  bestScore: 0,
  gamesPlayed: 0,
  bestAccuracy: 0,
  lastTopic: "None",
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  topicAttempts: {},
  topicCorrect: {}
};

// Topic cards shown on the topic selection screen.
const topics = [
  { id: "Logic", name: "Logic", description: "Practice implications, truth conditions, and clean reasoning.", difficulty: "Starter to Medium" },
  { id: "Binary Numbers", name: "Binary Numbers", description: "Convert, compare, and reason with base-2 numbers.", difficulty: "Starter" },
  { id: "Algorithms", name: "Algorithms", description: "Build intuition for search, sorting, and complexity.", difficulty: "Medium" },
  { id: "Counting & Combinatorics", name: "Counting & Combinatorics", description: "Count arrangements, choices, subsets, and small cases.", difficulty: "Medium" },
  { id: "Graph Theory Basics", name: "Graph Theory Basics", description: "Work with trees, degrees, paths, and simple graph facts.", difficulty: "Medium" },
  { id: "Pattern Recognition", name: "Pattern Recognition", description: "Spot number patterns and explain the hidden rule.", difficulty: "Starter to Hard" },
  { id: MIXED_TOPIC, name: "Mixed Challenge", description: "Shuffle every topic into one arcade exam-style round.", difficulty: "Adaptive" }
];

// Mini lessons shown after the survey.
const lessons = {
  Logic: {
    title: "Logic",
    explanation: "Logic questions ask you to follow rules exactly. Translate the statement, then test what must be true.",
    points: [
      "For 'if P then Q', P is the condition and Q is the result.",
      "The contrapositive 'if not Q then not P' is logically equivalent.",
      "XOR means exactly one statement is true.",
      "A counterexample disproves a universal claim."
    ],
    commonMistakes: [
      "Reversing an implication and assuming it still means the same thing.",
      "Treating 'some' as 'all'.",
      "Ignoring a single counterexample."
    ],
    examTips: [
      "Underline words like all, some, none, exactly one, and must.",
      "Try a tiny example before choosing.",
      "Ask: is this always true, or just sometimes true?"
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
    commonMistakes: [
      "Reading binary as if it were decimal.",
      "Forgetting the rightmost place is 1, not 0.",
      "Mixing up AND and OR."
    ],
    examTips: [
      "Write place values above the bits.",
      "For bit operations, compare one column at a time.",
      "Check whether the answer should be larger or smaller than nearby powers of two."
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
    commonMistakes: [
      "Forgetting that binary search requires sorted data.",
      "Calling every loop O(n), even when loops are nested.",
      "Memorizing names without understanding the repeated action."
    ],
    examTips: [
      "Ask how many times the main operation repeats.",
      "Look for words like sorted, repeatedly, each, and pair.",
      "When stuck, compare the input size doubling."
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
    commonMistakes: [
      "Counting AB and BA separately when order does not matter.",
      "Forgetting whether repetition is allowed.",
      "Rushing into a formula before reading the wording."
    ],
    examTips: [
      "Write 'order matters?' and 'repeat allowed?' before solving.",
      "Test with a smaller version of the problem.",
      "List a few examples to see the pattern."
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
    commonMistakes: [
      "Confusing vertices with edges.",
      "Forgetting that degree sum counts each edge twice.",
      "Calling any connected graph a tree, even if it has a cycle."
    ],
    examTips: [
      "Draw a tiny graph when possible.",
      "For trees, immediately check n - 1 edges.",
      "For complete graphs, count pairs of vertices."
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
    commonMistakes: [
      "Choosing a rule that only fits the last two terms.",
      "Ignoring alternating patterns.",
      "Stopping before checking the whole sequence."
    ],
    examTips: [
      "Write the differences below the sequence.",
      "Check squares and powers when numbers grow quickly.",
      "Verify the rule against every term shown."
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
    commonMistakes: [
      "Using the previous question's strategy on the next question.",
      "Rushing without reading the category.",
      "Chasing speed before accuracy."
    ],
    examTips: [
      "Reset your approach on every question.",
      "Use the category label as a strategy switch.",
      "If unsure, eliminate answers that break the basic rule."
    ],
    example: "A mixed round might jump from binary conversion to graph degrees, so reset your strategy each question."
  }
};

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

const screens = {
  home: document.querySelector("#home-screen"),
  how: document.querySelector("#how-screen"),
  topics: document.querySelector("#topic-screen"),
  survey: document.querySelector("#survey-screen"),
  lesson: document.querySelector("#lesson-screen"),
  game: document.querySelector("#game-screen"),
  results: document.querySelector("#results-screen"),
  revision: document.querySelector("#revision-screen")
};

const topicGrid = document.querySelector("#topic-grid");
const startLearningButton = document.querySelector("#start-learning-button");
const practiceArcadeButton = document.querySelector("#practice-arcade-button");
const howItWorksButton = document.querySelector("#how-it-works-button");
const surveyForm = document.querySelector("#survey-form");
const surveyTitleEl = document.querySelector("#survey-title");
const startPracticeButton = document.querySelector("#start-practice-button");
const retryTopicButton = document.querySelector("#retry-topic-button");
const reviseWeakAreasButton = document.querySelector("#revise-weak-areas-button");
const practiceWeakTopicsButton = document.querySelector("#practice-weak-topics-button");
const revisionPracticeWeakButton = document.querySelector("#revision-practice-weak-button");
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
const lessonMistakesEl = document.querySelector("#lesson-mistakes");
const lessonExamTipsEl = document.querySelector("#lesson-exam-tips");
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
const answerReviewListEl = document.querySelector("#answer-review-list");

const revisionSummaryEl = document.querySelector("#revision-summary");
const revisionWeakestHeadingEl = document.querySelector("#revision-weakest-heading");
const smartRevisionTipsEl = document.querySelector("#smart-revision-tips");
const wrongExplanationListEl = document.querySelector("#wrong-explanation-list");

const homeBestScoreEl = document.querySelector("#home-best-score");
const homeGamesPlayedEl = document.querySelector("#home-games-played");
const homeBestAccuracyEl = document.querySelector("#home-best-accuracy");
const homeLastTopicEl = document.querySelector("#home-last-topic");
const homeStrongestTopicEl = document.querySelector("#home-strongest-topic");
const homeWeakestTopicEl = document.querySelector("#home-weakest-topic");

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
let answerHistory = [];
let weakCategories = [];
let usingWeakTopicMode = false;
let surveyChoices = {
  confidence: "New to this",
  focus: "Understanding concepts",
  length: "5"
};

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
    return { ...defaultProgress };
  }

  if (!saved) {
    return { ...defaultProgress };
  }

  try {
    return { ...defaultProgress, ...JSON.parse(saved) };
  } catch (error) {
    return { ...defaultProgress };
  }
}

function saveProgress(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    // The app still works if a browser blocks localStorage.
  }
}

function getTopicAccuracy(topic, progress) {
  const attempts = progress.topicAttempts[topic] || 0;

  if (attempts === 0) {
    return null;
  }

  return Math.round(((progress.topicCorrect[topic] || 0) / attempts) * 100);
}

function getStrongestTopic(progress) {
  const scored = Object.keys(progress.topicAttempts)
    .map((topic) => ({ topic, accuracy: getTopicAccuracy(topic, progress), attempts: progress.topicAttempts[topic] }))
    .filter((entry) => entry.attempts > 0);

  if (scored.length === 0) {
    return "None";
  }

  scored.sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts);
  return `${scored[0].topic} (${scored[0].accuracy}%)`;
}

function getWeakestTopicFromProgress(progress) {
  const scored = Object.keys(progress.topicAttempts)
    .map((topic) => ({ topic, accuracy: getTopicAccuracy(topic, progress), attempts: progress.topicAttempts[topic] }))
    .filter((entry) => entry.attempts > 0);

  if (scored.length === 0) {
    return "None";
  }

  scored.sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
  return `${scored[0].topic} (${scored[0].accuracy}%)`;
}

function updateHomeProgress() {
  const progress = getProgress();
  homeBestScoreEl.textContent = progress.bestScore;
  homeGamesPlayedEl.textContent = progress.gamesPlayed;
  homeBestAccuracyEl.textContent = `${progress.bestAccuracy}%`;
  homeLastTopicEl.textContent = progress.lastTopic;
  homeStrongestTopicEl.textContent = getStrongestTopic(progress);
  homeWeakestTopicEl.textContent = getWeakestTopicFromProgress(progress);
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
  usingWeakTopicMode = false;
  const topicName = topics.find((topic) => topic.id === topicId)?.name || "Mixed Challenge";
  surveyTitleEl.textContent = `Set Your Practice Mode: ${topicName}`;
  showScreen("survey");
}

function readSurvey() {
  const data = new FormData(surveyForm);
  surveyChoices = {
    confidence: data.get("confidence"),
    focus: data.get("focus"),
    length: data.get("length")
  };
}

function submitSurvey(event) {
  event.preventDefault();
  readSurvey();
  renderLesson(selectedTopic);
  showScreen("lesson");
}

function renderLesson(topicId) {
  const lesson = lessons[topicId];
  lessonKickerEl.textContent = topicId === MIXED_TOPIC ? "Strategy Lesson" : "Topic Lesson";
  lessonTitleEl.textContent = lesson.title;
  lessonExplanationEl.textContent = lesson.explanation;
  lessonExampleEl.textContent = lesson.example;
  fillList(lessonPointsEl, lesson.points);
  fillList(lessonMistakesEl, lesson.commonMistakes);
  fillList(lessonExamTipsEl, lesson.examTips);
}

function fillList(list, items) {
  list.innerHTML = "";

  items.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });
}

function getQuestionPool(topicId) {
  if (topicId === MIXED_TOPIC) {
    return questions;
  }

  return questions.filter((question) => question.category === topicId);
}

function getRoundLength(pool) {
  if (surveyChoices.length === "all") {
    return pool.length;
  }

  return Math.min(Number(surveyChoices.length), pool.length);
}

function startPractice(topicId = selectedTopic, forcedPool = null) {
  selectedTopic = topicId;
  const pool = forcedPool || getQuestionPool(topicId);
  activeQuestions = shuffle(pool).slice(0, getRoundLength(pool));

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
  answerHistory = [];

  showScreen("game");
  loadQuestion();
}

function startWeakTopicPractice() {
  const categories = weakCategories.length > 0 ? weakCategories : [MIXED_TOPIC];
  const pool = categories.includes(MIXED_TOPIC)
    ? questions
    : questions.filter((question) => categories.includes(question.category));

  usingWeakTopicMode = weakCategories.length > 0;
  startPractice(weakCategories.length > 0 ? MIXED_TOPIC : MIXED_TOPIC, pool);
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
  const focusBonus = surveyChoices.focus === "Speed" ? -2 : 0;
  const confidenceBonus = surveyChoices.confidence === "New to this" ? 3 : 0;
  return Math.max(8, 22 - (level - 1) * 3 + focusBonus + confidenceBonus);
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
  recordAnswer(question, selectedIndex, true);

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
  recordAnswer(question, selectedIndex, false);

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

function recordAnswer(question, selectedIndex, isCorrect) {
  answerHistory.push({
    question: question.question,
    selectedAnswer: selectedIndex === null ? "No answer - time expired" : question.options[selectedIndex],
    correctAnswer: question.options[question.answer],
    isCorrect,
    category: question.category,
    explanation: question.explanation
  });
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
  weakCategories = Object.keys(missedByCategory);

  resultTitleEl.textContent = completedAllQuestions ? "Lesson Run Complete" : "Game Over";
  finalScoreEl.textContent = score;
  questionsAttemptedEl.textContent = `${attempted}/${activeQuestions.length}`;
  correctAnswersEl.textContent = correctCount;
  wrongAnswersEl.textContent = wrongCount;
  accuracyEl.textContent = `${accuracy}%`;
  highestLevelEl.textContent = highestLevel;
  weakestTopicEl.textContent = weakestTopic;
  resultMessageEl.textContent = getPerformanceMessage(accuracy);

  renderRevisionSummary(weakestTopic);
  renderAnswerReview();
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
    return "Strong attempt - your logic is warming up!";
  }

  return "Keep training, future finalist!";
}

function renderRevisionSummary(weakestTopic) {
  reviseListEl.innerHTML = "";
  revisionTipsEl.innerHTML = "";

  if (weakCategories.length === 0) {
    reviseListEl.innerHTML = "<p>No weak topic detected. Try Mixed Challenge or a longer round next.</p>";
    addTip(revisionTipsEl, "Review explanations anyway; perfect rounds are how speed improves.");
    addTip(revisionTipsEl, "Try a Full round with Speed focus.");
    return;
  }

  weakCategories.forEach((topic) => {
    const badge = document.createElement("span");
    badge.textContent = `Revise: ${topic}`;
    reviseListEl.appendChild(badge);
  });

  const lesson = lessons[weakestTopic] || lessons[MIXED_TOPIC];
  addTip(revisionTipsEl, `Reread the ${lesson.title} lesson before retrying.`);
  addTip(revisionTipsEl, lesson.commonMistakes[0]);
  addTip(revisionTipsEl, "Slow down on the category label; it tells you which strategy to use.");
}

function renderAnswerReview() {
  answerReviewListEl.innerHTML = "";

  answerHistory.forEach((entry, index) => {
    const details = document.createElement("details");
    details.className = `review-card ${entry.isCorrect ? "review-correct" : "review-wrong"}`;
    details.innerHTML = `
      <summary>${entry.isCorrect ? "Correct" : "Wrong"} - Question ${index + 1}: ${entry.category}</summary>
      <p><strong>Question:</strong> ${entry.question}</p>
      <p><strong>Your answer:</strong> ${entry.selectedAnswer}</p>
      <p><strong>Correct answer:</strong> ${entry.correctAnswer}</p>
      <p><strong>Explanation:</strong> ${entry.explanation}</p>
    `;
    answerReviewListEl.appendChild(details);
  });
}

function renderSmartRevision() {
  const weakestTopic = getWeakestTopic();
  smartRevisionTipsEl.innerHTML = "";
  wrongExplanationListEl.innerHTML = "";

  if (weakCategories.length === 0) {
    revisionWeakestHeadingEl.textContent = "No weak category detected";
    revisionSummaryEl.textContent = "Perfect run. Try Mixed Challenge or a harder, longer round next.";
    addTip(smartRevisionTipsEl, "Switch to Mixed Challenge to practice topic changes.");
    addTip(smartRevisionTipsEl, "Try Speed focus to make the timer tighter.");
    addTip(smartRevisionTipsEl, "Use Full round when you want exam-style stamina.");
    return;
  }

  const lesson = lessons[weakestTopic] || lessons[MIXED_TOPIC];
  revisionWeakestHeadingEl.textContent = `Weakest Category: ${weakestTopic}`;
  revisionSummaryEl.textContent = `You missed the most questions in ${weakestTopic}. Start there, then retry weak topics.`;
  addTip(smartRevisionTipsEl, lesson.examTips[0]);
  addTip(smartRevisionTipsEl, lesson.commonMistakes[0]);
  addTip(smartRevisionTipsEl, "Redo only the weak-topic categories before returning to Mixed Challenge.");

  answerHistory
    .filter((entry) => !entry.isCorrect)
    .forEach((entry) => {
      const card = document.createElement("article");
      card.className = "review-card review-wrong open-card";
      card.innerHTML = `
        <h4>${entry.category}</h4>
        <p><strong>Question:</strong> ${entry.question}</p>
        <p><strong>Your answer:</strong> ${entry.selectedAnswer}</p>
        <p><strong>Correct answer:</strong> ${entry.correctAnswer}</p>
        <p><strong>Explanation:</strong> ${entry.explanation}</p>
      `;
      wrongExplanationListEl.appendChild(card);
    });
}

function addTip(list, text) {
  const item = document.createElement("li");
  item.textContent = text;
  list.appendChild(item);
}

function updateStoredProgress(accuracy) {
  const progress = getProgress();
  const topicName = topics.find((topic) => topic.id === selectedTopic)?.name || "Mixed Challenge";
  const nextProgress = {
    ...progress,
    bestScore: Math.max(progress.bestScore, score),
    gamesPlayed: progress.gamesPlayed + 1,
    bestAccuracy: Math.max(progress.bestAccuracy, accuracy),
    lastTopic: usingWeakTopicMode ? "Weak Topic Practice" : topicName,
    totalQuestionsAnswered: progress.totalQuestionsAnswered + answerHistory.length,
    totalCorrectAnswers: progress.totalCorrectAnswers + correctCount,
    topicAttempts: { ...progress.topicAttempts },
    topicCorrect: { ...progress.topicCorrect }
  };

  answerHistory.forEach((entry) => {
    nextProgress.topicAttempts[entry.category] = (nextProgress.topicAttempts[entry.category] || 0) + 1;

    if (entry.isCorrect) {
      nextProgress.topicCorrect[entry.category] = (nextProgress.topicCorrect[entry.category] || 0) + 1;
    }
  });

  saveProgress(nextProgress);
}

function addClick(element, handler) {
  if (element) {
    element.addEventListener("click", handler);
  }
}

addClick(startLearningButton, () => showScreen("topics"));
addClick(practiceArcadeButton, () => chooseTopic(MIXED_TOPIC));
addClick(howItWorksButton, () => showScreen("how"));
addClick(startPracticeButton, () => startPractice());
addClick(retryTopicButton, () => startPractice(selectedTopic));
addClick(reviseWeakAreasButton, () => {
  renderSmartRevision();
  showScreen("revision");
});
addClick(practiceWeakTopicsButton, startWeakTopicPractice);
addClick(revisionPracticeWeakButton, startWeakTopicPractice);
addClick(chooseNewTopicButton, () => showScreen("topics"));
addClick(backHomeButton, () => showScreen("home"));
if (surveyForm) {
  surveyForm.addEventListener("submit", submitSurvey);
}

document.querySelectorAll("[data-go-home]").forEach((button) => {
  button.addEventListener("click", () => showScreen("home"));
});

document.querySelectorAll("[data-go-topics]").forEach((button) => {
  button.addEventListener("click", () => showScreen("topics"));
});

renderTopicCards();
updateHomeProgress();
