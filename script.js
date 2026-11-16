
// Menú adaptable a celulares
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Pestañas de materias conciliables
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".case-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    panels.forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Cuestionario educativo
const questions = [
  {
    question: "¿Quién decide el acuerdo conciliatorio?",
    answers: [
      "El juez",
      "El conciliador",
      "Las partes involucradas"
    ],
    correct: 2,
    explanation: "¡Correcto! El acuerdo nace de la voluntad de las partes."
  },
  {
    question: "¿La conciliación constituye un acto jurisdiccional?",
    answers: ["Sí", "No"],
    correct: 1,
    explanation: "¡Exacto! La conciliación no constituye acto jurisdiccional."
  },
  {
    question: "¿Cuál es una función del conciliador?",
    answers: [
      "Imponer una sentencia",
      "Facilitar el diálogo",
      "Obligar a aceptar un acuerdo"
    ],
    correct: 1,
    explanation: "El conciliador facilita la comunicación y la búsqueda de soluciones."
  },
  {
    question: "¿Qué principio protege la información de las sesiones?",
    answers: [
      "Celeridad",
      "Confidencialidad",
      "Economía"
    ],
    correct: 1,
    explanation: "La confidencialidad protege la información conocida durante las sesiones."
  },
  {
    question: "¿Qué documento registra el acuerdo conciliatorio?",
    answers: [
      "Acta de Conciliación",
      "Sentencia judicial",
      "Demanda"
    ],
    correct: 0,
    explanation: "El acuerdo se registra en el Acta de Conciliación, conforme a la ley."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

function showQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  questionElement.textContent = q.question;
  answersElement.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.disabled = true;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => selectAnswer(index));

    answersElement.appendChild(button);
  });

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Ver resultados →"
      : "Siguiente pregunta →";
}

function selectAnswer(index) {
  if (answered) return;

  answered = true;
  const q = questions[currentQuestion];
  const buttons = answersElement.querySelectorAll("button");

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.correct) {
      button.classList.add("correct");
    }
  });

  if (index === q.correct) {
    score++;
    feedbackElement.textContent = "✓ " + q.explanation;
    feedbackElement.style.color = "#168b64";
  } else {
    buttons[index].classList.add("wrong");
    feedbackElement.textContent = "✗ Respuesta incorrecta. " + q.explanation;
    feedbackElement.style.color = "#d85b4e";
  }

  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    quizContent.hidden = true;
    quizResult.hidden = false;
    document.getElementById("score").textContent =
      `Obtuviste ${score} de ${questions.length} respuestas correctas. ` +
      (score === questions.length
        ? "¡Excelente! Dominas los conceptos básicos. 🎉"
        : "¡Sigue aprendiendo y vuelve a intentarlo! 💪");
  }
});

document.getElementById("restartQuiz").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizContent.hidden = false;
  quizResult.hidden = true;
  showQuestion();
});

showQuestion();

