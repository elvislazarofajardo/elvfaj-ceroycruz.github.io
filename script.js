const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Función para verificar si hay un ganador
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Jugador ${currentPlayer} ha ganado!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Es el turno del jugador ${currentPlayer}`;
}

// Función para manejar el juego en cada celda
function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

// Manejador para los clics o toques en las celdas
function handleCellInteraction(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    checkWinner();
}

// Función para reiniciar el juego
function handleRestartGame() {
    board.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerText = `Es el turno del jugador ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => (cell.innerText = ''));
}

// Agregar listeners tanto para clic como para toques táctiles
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellInteraction);
    cell.addEventListener('touchstart', handleCellInteraction);
});

document.getElementById('restartButton').addEventListener('click', handleRestartGame);
