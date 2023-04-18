let currentPlayer = 'X';
const iconX = '<i class="fa-solid fa-xmark fa-beat fa-2xl" style="color: #ffffff;"></i>';
const iconO = '<i class="fa-solid fa-o fa-beat fa-2xl" style="color: #ffffff;"></i>';
const playerDisplay = document.querySelector('#turnDisplay');
let gamePlay = true
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll('td');

function doClick(event) {
    const clickedCell = event.target;
    const rowIndex = clickedCell.parentElement.rowIndex;
    const colIndex = clickedCell.cellIndex;
  
    // Update the corresponding element in the `cells` array
    cells[rowIndex * 3 + colIndex].textContent = currentPlayer;

       // Update the corresponding element in the `cells` array
       cells[rowIndex * 3 + colIndex].innerHTML = currentPlayer === 'X' ? iconX : iconO;

    // Get background color based on whos turn it is
    if (currentPlayer == 'X') {
      clickedCell.style.background="linear-gradient(to bottom, #333, #000);";
    }
    else {
      clickedCell.style.background="linear-gradient(to bottom, #333, #000);"
    }
    // Save the last player who made a move
  const lastPlayer = clickedCell.textContent;
  
    // Update the gameStatus array
    gameStatus[rowIndex * 3 + colIndex] = currentPlayer;

    // Remove the click event listener from the clicked cell
  clickedCell.removeEventListener("click", doClick);

  
    // Toggle the current player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
    // Update the player display
    playerDisplay.textContent = `Current Player: ${currentPlayer}`;
  
    // Check for a win
    checkWin(lastPlayer);
    
  }
  
  cells.forEach(cell => cell.addEventListener('click', doClick));

  

const winningCombos = [  
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]        
];
function checkWin(lastPlayer) {
    let playerWin = false;
    for (let i = 0; i < winningCombos.length; i++) {
      const winCombos = winningCombos[i];
      let a = gameStatus[winCombos[0]];
      let b = gameStatus[winCombos[1]];
      let c = gameStatus[winCombos[2]];
      if (a === b && b === c && a !== '') {
        playerWin = true;
        break;
      }
    }
    if (playerWin) {
      playerDisplay.textContent = `${lastPlayer} Winner!`;
      gamePlay = false;
      cells.forEach(cell => cell.removeEventListener('click', doClick));

    }

    let roundDraw = !gameStatus.includes("");
    if (roundDraw) {
      playerDisplay.textContent = "It's a Draw!"
      gamePlay = false;
    }
  }
  

