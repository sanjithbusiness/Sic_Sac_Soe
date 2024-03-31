let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winningConditions = [
 [0, 1, 2],
 [3, 4, 5],
 [6, 7, 8],
 [0, 3, 6],
 [1, 4, 7],
 [2, 5, 8],
 [0, 4, 8],
 [2, 4, 6]
];

const squares = document.querySelectorAll(".square");
const resetButton = document.querySelector("#reset");
const message = document.getElementById("message");

squares.forEach(square => {
 square.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);

function handleClick(event) {
 const square = event.target;
 const index = square.getAttribute("id");

 if (board[index] !== "" || gameOver) {
    return;
 }

 board[index] = currentPlayer;
 square.innerHTML = currentPlayer;

 checkForWinner();
 checkForTieGame();

 currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkForWinner() {
 for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
      gameOver = true;
      highlightWinnerSquares(a, b, c);
      displayWinner(board[a]);
      break;
    }
 }
}

function checkForTieGame() {
 if (!board.includes("") && !gameOver) {
    gameOver = true;
    displayTieGame();
 }
}

function highlightWinnerSquares(a, b, c) {
 document.getElementById(a).classList.add("winner");
 document.getElementById(b).classList.add("winner");
 document.getElementById(c).classList.add("winner");
}

function displayWinner(player) {
 message.innerHTML = `${player} wins!`;
 message.classList.add("end-game-message");
}

function displayTieGame() {
 message.innerHTML = "It's a tie game!";
 message.classList.add("end-game-message1");
}

function resetGame() {
 board = ["", "", "", "", "", "", "", "", ""];
 currentPlayer = "X";
 gameOver = false;

 squares.forEach(square => {
    square.classList.remove("X", "O", "winner");
    square.innerHTML = "";
 });

 message.innerHTML = "";
 message.classList.remove("end-game-message");
 message.classList.remove("end-game-message1");
}
