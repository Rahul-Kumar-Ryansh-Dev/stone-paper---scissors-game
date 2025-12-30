// Game state
let userScore = 0
let compScore = 0
const choices = ["rock", "paper", "scissors"]
const icons = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
}

// DOM Elements
const choiceButtons = document.querySelectorAll(".choice-btn")
const userScoreDisplay = document.getElementById("user-score")
const compScoreDisplay = document.getElementById("computer-score")
const resultMessage = document.getElementById("result-message")
const playerDisplay = document.getElementById("player-display")
const computerDisplay = document.getElementById("computer-display")
const resetBtn = document.getElementById("reset-btn")

// Generate computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length)
  return choices[randomIndex]
}

// Determine winner
function determineWinner(userChoice, compChoice) {
  if (userChoice === compChoice) {
    return "draw"
  }

  if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    return "win"
  }

  return "lose"
}

// Display player choice
function displayPlayerChoice(choice) {
  const html = `
    <div class="player-display-item">
      <span class="player-display-icon">${icons[choice]}</span>
      <p class="player-display-text">${choice}</p>
    </div>
  `
  playerDisplay.innerHTML = html
}

// Display computer choice
function displayComputerChoice(choice) {
  const html = `
    <div class="computer-display-item">
      <span class="computer-display-icon">${icons[choice]}</span>
      <p class="computer-display-text">${choice}</p>
    </div>
  `
  computerDisplay.innerHTML = html
}

// Update result message
function updateResult(result, userChoice, compChoice) {
  let message = ""
  resultMessage.className = "result-message"

  if (result === "win") {
    message = `✨ You Win! ${icons[userChoice]} beats ${icons[compChoice]}`
    resultMessage.classList.add("win")
    userScore++
    // Trigger confetti-like effect
    triggerWinAnimation()
  } else if (result === "lose") {
    message = `😢 You Lose! ${icons[compChoice]} beats ${icons[userChoice]}`
    resultMessage.classList.add("lose")
    compScore++
  } else {
    message = `🤝 It's a Draw! Both chose ${icons[userChoice]}`
    resultMessage.classList.add("draw")
  }

  resultMessage.textContent = message
  userScoreDisplay.textContent = userScore
  compScoreDisplay.textContent = compScore
}

function triggerWinAnimation() {
  const scoreValue = userScoreDisplay
  scoreValue.style.animation = "none"
  setTimeout(() => {
    scoreValue.style.animation = "scorePopIn 0.5s ease-out"
  }, 10)
}

// Play game
function playGame(userChoice) {
  // Remove selected class from all buttons
  choiceButtons.forEach((btn) => btn.classList.remove("selected"))

  // Add selected class to clicked button
  document.getElementById(userChoice).classList.add("selected")

  // Get computer choice
  const compChoice = getComputerChoice()

  // Display both choices
  displayPlayerChoice(userChoice)
  displayComputerChoice(compChoice)

  // Determine winner and update UI
  const result = determineWinner(userChoice, compChoice)
  updateResult(result, userChoice, compChoice)
}

// Reset game
function resetGame() {
  userScore = 0
  compScore = 0
  userScoreDisplay.textContent = "0"
  compScoreDisplay.textContent = "0"
  playerDisplay.innerHTML = ""
  computerDisplay.innerHTML = '<div class="choice-placeholder">Waiting...</div>'
  resultMessage.className = "result-message"
  resultMessage.textContent = "Make your move to start playing!"
  choiceButtons.forEach((btn) => btn.classList.remove("selected"))
}

// Event listeners
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = button.getAttribute("data-choice")
    playGame(userChoice)
  })
})

resetBtn.addEventListener("click", resetGame)
