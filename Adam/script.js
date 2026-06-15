const QUIZ_LENGTH = 10;
const BEST_SCORE_KEY = "adam-country-quiz-best-score";

const questionBank = [
  {
    category: "Hoofdstad",
    prompt: "Welke hoofdstad hoort bij Canada?",
    options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    answer: "Ottawa",
    explanation: "Ottawa is de hoofdstad van Canada."
  },
  {
    category: "Continent",
    prompt: "In welk continent ligt Brazilië?",
    options: ["Afrika", "Europa", "Zuid-Amerika", "Azië"],
    answer: "Zuid-Amerika",
    explanation: "Brazilië ligt in Zuid-Amerika."
  },
  {
    category: "Geografie",
    prompt: "Welk land heeft geen kustlijn?",
    options: ["Spanje", "Zweden", "Zwitserland", "Griekenland"],
    answer: "Zwitserland",
    explanation: "Zwitserland ligt helemaal landinwaarts."
  },
  {
    category: "Hoofdstad",
    prompt: "Welke hoofdstad hoort bij Australië?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    explanation: "Canberra is de hoofdstad van Australie."
  },
  {
    category: "Wereldkaart",
    prompt: "Welk land ligt op twee continenten?",
    options: ["Turkije", "IJsland", "Portugal", "Kenya"],
    answer: "Turkije",
    explanation: "Turkije ligt deels in Europa en deels in Azie."
  },
  {
    category: "Taal",
    prompt: "Welke taal is officieel in Brazilië?",
    options: ["Spaans", "Portugees", "Frans", "Engels"],
    answer: "Portugees",
    explanation: "In Brazilië is Portugees de officiële taal."
  },
  {
    category: "Hoofdstad",
    prompt: "Welke hoofdstad hoort bij Japan?",
    options: ["Seoul", "Tokio", "Beijing", "Bangkok"],
    answer: "Tokio",
    explanation: "Tokio is de hoofdstad van Japan."
  },
  {
    category: "Wereldfeit",
    prompt: "Welk land is het grootste ter wereld qua oppervlakte?",
    options: ["Canada", "China", "Rusland", "Verenigde Staten"],
    answer: "Rusland",
    explanation: "Rusland is het grootste land ter wereld."
  },
  {
    category: "Hoofdstad",
    prompt: "Welke hoofdstad hoort bij Nieuw-Zeeland?",
    options: ["Auckland", "Wellington", "Christchurch", "Hamilton"],
    answer: "Wellington",
    explanation: "Wellington is de hoofdstad van Nieuw-Zeeland."
  },
  {
    category: "Valuta",
    prompt: "Welk land gebruikt de yen?",
    options: ["Japan", "Zuid-Korea", "Thailand", "Vietnam"],
    answer: "Japan",
    explanation: "De yen is de munteenheid van Japan."
  },
  {
    category: "Regio",
    prompt: "Welk land hoort bij Scandinavië?",
    options: ["Noorwegen", "Duitsland", "Polen", "Oostenrijk"],
    answer: "Noorwegen",
    explanation: "Noorwegen is een van de Scandinavische landen."
  },
  {
    category: "Hoofdstad",
    prompt: "Welke hoofdstad hoort bij Egypte?",
    options: ["Casablanca", "Tunis", "Caïro", "Algiers"],
    answer: "Caïro",
    explanation: "Caïro is de hoofdstad van Egypte."
  }
];

const elements = {
  score: document.getElementById("score"),
  questionCount: document.getElementById("questionCount"),
  streakCount: document.getElementById("streakCount"),
  bestScore: document.getElementById("bestScore"),
  category: document.getElementById("category"),
  questionStep: document.getElementById("questionStep"),
  questionText: document.getElementById("questionText"),
  progressFill: document.getElementById("progressFill"),
  answers: document.getElementById("answers"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("nextBtn"),
  restartBtn: document.getElementById("restartBtn"),
  playAgainBtn: document.getElementById("playAgainBtn"),
  quizView: document.getElementById("quizView"),
  resultView: document.getElementById("resultView"),
  resultTitle: document.getElementById("resultTitle"),
  resultSummary: document.getElementById("resultSummary"),
  finalScore: document.getElementById("finalScore"),
  finalLabel: document.getElementById("finalLabel"),
  reviewList: document.getElementById("reviewList")
};

let deck = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let canAnswer = true;
let bestScore = 0;
let missedQuestions = [];

function shuffle(items) {
  const list = [...items];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  }
  return list;
}

function loadBestScore() {
  try {
    const stored = Number(window.localStorage.getItem(BEST_SCORE_KEY));
    bestScore = Number.isFinite(stored) ? stored : 0;
  } catch {
    bestScore = 0;
  }
  elements.bestScore.textContent = String(bestScore);
}

function saveBestScore(value) {
  bestScore = Math.max(bestScore, value);
  elements.bestScore.textContent = String(bestScore);

  try {
    window.localStorage.setItem(BEST_SCORE_KEY, String(bestScore));
  } catch {
    // Local storage kan geblokkeerd zijn; de quiz blijft gewoon werken.
  }
}

function buildDeck() {
  deck = shuffle(questionBank)
    .slice(0, QUIZ_LENGTH)
    .map((question) => ({
      ...question,
      options: shuffle(question.options)
    }));
}

function updateHud() {
  elements.score.textContent = String(score);
  elements.streakCount.textContent = String(streak);
  elements.questionCount.textContent = `${Math.min(currentIndex + 1, QUIZ_LENGTH)}/${QUIZ_LENGTH}`;
  elements.questionStep.textContent = `Vraag ${Math.min(currentIndex + 1, QUIZ_LENGTH)}`;
  elements.progressFill.style.width = `${Math.min(((currentIndex + 1) / QUIZ_LENGTH) * 100, 100)}%`;
}

function setFeedback(message, tone) {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${tone}`;
}

function renderQuestion() {
  const question = deck[currentIndex];
  canAnswer = true;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.nextBtn.hidden = true;
  elements.answers.innerHTML = "";
  elements.category.textContent = question.category;
  elements.questionText.textContent = question.prompt;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.dataset.answer = option;
    button.dataset.index = String(index);
    button.style.setProperty("--delay", `${index * 50}ms`);
    button.innerHTML = `
      <span class="answer-number">${index + 1}</span>
      <span class="answer-text">${option}</span>
    `;
    button.addEventListener("click", () => selectAnswer(button, option));
    elements.answers.appendChild(button);
  });

  updateHud();
}

function selectAnswer(button, selectedAnswer) {
  if (!canAnswer) {
    return;
  }

  canAnswer = false;
  const question = deck[currentIndex];
  const buttons = Array.from(elements.answers.querySelectorAll(".answer"));
  const isCorrect = selectedAnswer === question.answer;

  buttons.forEach((answerButton) => {
    answerButton.disabled = true;
    if (answerButton.dataset.answer === question.answer) {
      answerButton.classList.add("is-correct");
    }
  });

  if (isCorrect) {
    score += 1;
    streak += 1;
    button.classList.add("is-correct");
    setFeedback(`Goed! ${question.answer} is juist. ${question.explanation}`, "success");
  } else {
    streak = 0;
    button.classList.add("is-wrong");
    setFeedback(`Bijna. Het juiste antwoord is ${question.answer}. ${question.explanation}`, "error");
    missedQuestions.push({
      index: currentIndex + 1,
      prompt: question.prompt,
      chosen: selectedAnswer,
      answer: question.answer,
      explanation: question.explanation
    });
  }

  updateHud();
  elements.nextBtn.hidden = false;
}

function finishQuiz() {
  const percentage = Math.round((score / QUIZ_LENGTH) * 100);
  let title = "Klaar!";
  let label = `${score}/${QUIZ_LENGTH} goed`;

  if (percentage === 100) {
    title = "Perfecte score";
    label = "Wereldkenner";
  } else if (percentage >= 80) {
    title = "Sterk gespeeld";
    label = "Bijna foutloos";
  } else if (percentage >= 60) {
    title = "Goede ronde";
    label = "Stevige basis";
  } else if (percentage >= 40) {
    title = "Niet slecht";
    label = "Nog even oefenen";
  } else {
    title = "Nieuwe poging?";
    label = "Je kunt dit beter";
  }

  elements.quizView.hidden = true;
  elements.resultView.hidden = false;
  elements.resultTitle.textContent = title;
  elements.finalScore.textContent = `${score}/${QUIZ_LENGTH}`;
  elements.finalLabel.textContent = label;
  elements.resultSummary.textContent = `Je had ${score} van de ${QUIZ_LENGTH} vragen goed. ${missedQuestions.length === 0 ? "Geen enkele fout, top gedaan." : `Je miste ${missedQuestions.length} vraag${missedQuestions.length === 1 ? "" : "en"}, maar de volgende ronde pak je er nog meer.`}`;

  renderReview();
  saveBestScore(score);
}

function renderReview() {
  elements.reviewList.innerHTML = "";

  if (missedQuestions.length === 0) {
    const empty = document.createElement("div");
    empty.className = "review-empty";
    empty.textContent = "Perfect. Je hebt alle vragen goed beantwoord.";
    elements.reviewList.appendChild(empty);
    return;
  }

  missedQuestions.forEach((item) => {
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <h3>Vraag ${item.index}: ${item.prompt}</h3>
      <p><strong>Jouw antwoord:</strong> ${item.chosen}</p>
      <p><strong>Goed antwoord:</strong> ${item.answer}</p>
      <p>${item.explanation}</p>
    `;
    elements.reviewList.appendChild(card);
  });
}

function startGame() {
  buildDeck();
  currentIndex = 0;
  score = 0;
  streak = 0;
  canAnswer = true;
  missedQuestions = [];

  elements.quizView.hidden = false;
  elements.resultView.hidden = true;
  elements.nextBtn.hidden = true;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  renderQuestion();
}

function goNext() {
  if (currentIndex >= deck.length - 1) {
    finishQuiz();
    return;
  }

  currentIndex += 1;
  renderQuestion();
}

function handleKeyboard(event) {
  if (elements.resultView.hidden === false) {
    if (event.key === "Enter") {
      startGame();
    }
    return;
  }

  if (canAnswer && ["1", "2", "3", "4"].includes(event.key)) {
    const button = elements.answers.querySelector(`.answer[data-index="${Number(event.key) - 1}"]`);
    if (button) {
      button.click();
    }
  }

  if (!canAnswer && event.key === "Enter" && !elements.nextBtn.hidden) {
    goNext();
  }
}

elements.nextBtn.addEventListener("click", goNext);
elements.restartBtn.addEventListener("click", startGame);
elements.playAgainBtn.addEventListener("click", startGame);
document.addEventListener("keydown", handleKeyboard);

loadBestScore();
startGame();
