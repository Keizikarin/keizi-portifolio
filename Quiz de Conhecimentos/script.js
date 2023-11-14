const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "São Componentes físicos de um Computador.",
    answers: [
      { text: "Mouse, Teclado, Gabinete, Mesa.", correct: false },
      { text: "Mouse, Teclado, Monitor, Cadeira", correct: false },
      { text: "Mouse, Teclado, Monitor, Gabinete", correct: true },
      { text: "Mouse, Teclado, Impressora, Excel", correct: false }
    ]
  },
  {
    question: "É um dispositivo cheio de Teclas e Números.",
    answers: [
      { text: "Teclado", correct: true },
      { text: "Mouse", correct: false },
      { text: "Monitor", correct: false },
      { text: "Impressora", correct: false }
    ]
  },
  {
    question: 'A área de trabalho também é conhecido como:',
    answers: [
      { text: 'Desktop', correct: true },
      { text: 'Documentos', correct: false },
      { text: 'Word', correct: false },
      { text: "Internet", correct: false }
    ]
  },
  {
    question: 'Qual dessas peças é responsável pelo armazenamento de dados da máquina?',
    answers: [
      { text: "Placa-Mãe (MB)", correct: false },
      { text: "Hard Disk (HD)", correct: true },
      { text: "Processador (CPU)", correct: false },
      { text: "O gabinete", correct: false }
    ]
  },
  {
    question: 'Os hardwares, podem ser divididos em 4 categorias, sendo eles:',
    answers: [
      { text: 'Dispositivos de entrada, Dispositivos de saída, Dispositivos de captura, Dispositivos de imagem;', correct: false },
      { text: 'Dispositivos de armazenamento secundário, Componentes internos, Dispositivos de saída, Dispositivos de entrada;', correct: true },
      { text: 'Dispositivos de som, Dispositivos de imagem, Dispositivos internos, Dispositivos de saída;', correct: false },
      { text: 'Dispositivos de som, Dispositivos de texto, Dispositivos de imagem, Dispositivos de movimento;', correct: false }
    ]
  },
  {
    question: 'Qual desses Sistemas Operacionais é pertencente á Microsoft?',
    answers: [
      { text: 'Mac', correct: false },
      { text: 'Windows', correct: true },
      { text: 'Linux', correct: false },
      { text: 'Android', correct: false }
    ]
  },
]