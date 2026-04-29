const cells = [...document.querySelectorAll(".cell")];
const statusText = document.querySelector("#status");
const newRoundButton = document.querySelector("#new-round");
const resetScoreButton = document.querySelector("#reset-score");
const scoreO = document.querySelector("#score-o");
const scoreX = document.querySelector("#score-x");
const scoreDraw = document.querySelector("#score-draw");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill("");
let currentPlayer = "O";
let gameOver = false;
let scores = { O: 0, X: 0, draw: 0 };

function render() {
  cells.forEach((cell, index) => {
    const value = board[index];
    cell.textContent = value;
    cell.className = `cell${value ? ` ${value.toLowerCase()}` : ""}`;
    cell.disabled = gameOver || Boolean(value);
    cell.setAttribute("aria-label", value ? `第 ${index + 1} 格，玩家 ${value}` : `第 ${index + 1} 格`);
  });

  scoreO.textContent = scores.O;
  scoreX.textContent = scores.X;
  scoreDraw.textContent = scores.draw;
}

function findWinner() {
  return winningLines.find(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function playTurn(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  const winningLine = findWinner();

  if (winningLine) {
    gameOver = true;
    scores[currentPlayer] += 1;
    statusText.textContent = `玩家 ${currentPlayer} 獲勝`;
    winningLine.forEach((cellIndex) => cells[cellIndex].classList.add("win"));
  } else if (board.every(Boolean)) {
    gameOver = true;
    scores.draw += 1;
    statusText.textContent = "這局平手";
  } else {
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    statusText.textContent = `輪到玩家 ${currentPlayer}`;
  }

  render();

  if (winningLine) {
    winningLine.forEach((cellIndex) => cells[cellIndex].classList.add("win"));
  }
}

function startNewRound() {
  board = Array(9).fill("");
  currentPlayer = "O";
  gameOver = false;
  statusText.textContent = "輪到玩家 O";
  render();
}

function resetScores() {
  scores = { O: 0, X: 0, draw: 0 };
  startNewRound();
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => playTurn(index));
});

newRoundButton.addEventListener("click", startNewRound);
resetScoreButton.addEventListener("click", resetScores);

render();
