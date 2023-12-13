let singlePlayerMode = true;

let currentPlayer = "X";
const iconX =
  '<i class="fa-solid fa-xmark fa-beat fa-2xl" style="color: #ffffff;"></i>';
const iconO =
  '<i class="fa-solid fa-o fa-beat fa-2xl" style="color: #ffffff;"></i>';
const playerDisplay = document.querySelector("#turnDisplay");
let gamePlay = true;
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll("td");

function doClick(event) {
  if (!gamePlay) {
    return;
  }

  const clickedCell = event.target;
  const rowIndex = clickedCell.parentElement.rowIndex;
  const colIndex = clickedCell.cellIndex;

  if (gameStatus[rowIndex * 3 + colIndex] !== "") {
    return;
  }

  // Update the corresponding element in the `cells` array
  cells[rowIndex * 3 + colIndex].textContent = currentPlayer;

  // Update the corresponding element in the `cells` array
  cells[rowIndex * 3 + colIndex].innerHTML =
    currentPlayer === "X" ? iconX : iconO;

  // Get background color based on whos turn it is
  clickedCell.style.background = "linear-gradient(to bottom, #333, #000);";

  // Save the last player who made a move
  const lastPlayer = clickedCell.textContent;

  // Update the gameStatus array
  gameStatus[rowIndex * 3 + colIndex] = currentPlayer;

  // Remove the click event listener from the clicked cell
  clickedCell.removeEventListener("click", doClick);

  // Toggle the current player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Update the player display
  playerDisplay.textContent = `Current Player: ${currentPlayer}`;

  // Check for a win
  checkWin(lastPlayer);

  // If playing in single-player mode, let the AI make a move
  if (singlePlayerMode && gamePlay && currentPlayer === "O") {
    setTimeout(makeAIMove, 500); // Add a delay for better user experience
  }
}
function makeAIMove() {
  if (!gamePlay) {
    return;
  }

  // Find empty cells
  const emptyCells = [];
  for (let i = 0; i < gameStatus.length; i++) {
    if (gameStatus[i] === "") {
      emptyCells.push(i);
    }
  }

  // Check if there are empty cells to make a move
  if (emptyCells.length > 0) {
    // Check for a winning move first
    const winningMove = findWinningMove("O");
    if (winningMove !== -1) {
      cells[winningMove].click();
      return;
    }

    // Check for a blocking move if the player is close to winning
    const blockingMove = findWinningMove("X");
    if (blockingMove !== -1) {
      cells[blockingMove].click();
      return;
    }

    // Choose a random move if no winning or blocking move is found
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCellIndex = emptyCells[randomIndex];

    // Simulate a click on the randomly chosen cell
    cells[randomCellIndex].click();
  }
}

function findWinningMove(player) {
  // Check for a winning move in each possible combination
  for (let i = 0; i < winningCombos.length; i++) {
    const winCombos = winningCombos[i];
    let a = gameStatus[winCombos[0]];
    let b = gameStatus[winCombos[1]];
    let c = gameStatus[winCombos[2]];

    // Check for two in a row with an empty cell to potentially win
    if ((a === player && b === player && c === "") ||
        (a === player && b === "" && c === player) ||
        (a === "" && b === player && c === player)) {
      // Return the index of the empty cell to make the winning move
      if (a === "") return winCombos[0];
      if (b === "") return winCombos[1];
      if (c === "") return winCombos[2];
    }
  }

  return -1; // Return -1 if no winning move is found
}

cells.forEach((cell) => cell.addEventListener("click", doClick));

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function checkWin(lastPlayer) {
  let playerWin = false;
  let roundDraw = !gameStatus.includes("");

  for (let i = 0; i < winningCombos.length; i++) {
    const winCombos = winningCombos[i];
    let a = gameStatus[winCombos[0]];
    let b = gameStatus[winCombos[1]];
    let c = gameStatus[winCombos[2]];
    if (a === b && b === c && a !== "") {
      playerWin = true;
      break;
    }
  }
  if (playerWin) {
    playerDisplay.textContent = `${lastPlayer} Winner!`;
    gamePlay = false;
    cells.forEach((cell) => cell.removeEventListener("click", doClick));
  }

  else if (roundDraw) {
    playerDisplay.textContent = "It's a Draw!";
    gamePlay = false;
  }
}
