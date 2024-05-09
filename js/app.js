let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const userScoreP = document.querySelector("#user-score");
const compScoreP = document.querySelector("#computer-score");
const msgB = document.querySelector(".msg");

const genComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randoIdx = Math.floor(Math.random() * 3);
  return options[randoIdx];
};
const showWinner = (userWin, compChoice, userChoice) => {
  if (userWin) {
    userScore++;
    userScoreP.innerText = userScore;
    msgB.innerText = `you win ${userChoice} beats ${compChoice}`;
    msgB.style.backgroundColor = "#588157";
  } else {
    compScore++;
    compScoreP.innerText = compScore;
    msgB.innerText = `you win ${compChoice} beats ${userChoice}`;
    msgB.style.backgroundColor = "#d90429";
  }
};
const drawgame = () => {
  msgB.innerText = "Game was draw Play Again!";

  msgB.style.backgroundColor = "#03045e";
};
const playGame = (userChoice) => {
  const compChoice = genComputerChoice();

  if (userChoice === compChoice) {
    drawgame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === " paper " ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissor" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, compChoice, userChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
