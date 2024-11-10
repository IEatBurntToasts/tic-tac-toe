const displayController = (function() {
    const gameBoard = document.querySelector('.gameboard-grid');
    const continueButton = document.querySelector('button.continue');
    const gameWinModal = document.querySelector('.modal.game-win');

    const updateName = (player, name) => {
        const playerElement = document.querySelector(`.${player} p`);

        playerElement.textContent = name;
    }
    const updateBoxSymbol = (boxPositionNumber, symbol) => {
        const box = document.querySelector(`[data-pos='${boxPositionNumber}'] span`);

        box.textContent = symbol;
        box.classList.add('active');
    }
    const restartGameBoard = () => {
        const gridBoxElements = document.querySelectorAll('.grid-boxes');

        gridBoxElements.forEach((box) => {
            const boxSpan = box.querySelector('span');

            boxSpan.classList.remove('active');
            boxSpan.classList.remove('highlight');
            boxSpan.textContent = '';
        });

        gameBoard.classList.remove('disabled');
        continueButton.classList.add('disabled');
        gameWinModal.classList.remove('active');
    }
    const resetScore = () => {
        const p1Score = document.querySelector('.score.p1');
        const p2Score = document.querySelector('.score.p2');

        p1Score.textContent = 0;
        p2Score.textContent = 0;
    }
    const addScore = (winner) => {
        const scoreElement = document.querySelector(`.player.${winner} span`);

        scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
    }
    const displayWin = (winningIndexes, winner) => {
        const arrWinIndexes = Array.from(winningIndexes);

        for (const index of arrWinIndexes) {
            const boxSpanElement = document.querySelector(`[data-pos='${index}'] span`);

            boxSpanElement.classList.add('highlight');
        }

        addScore(winner);
        gameBoard.classList.add('disabled');
        continueButton.classList.remove('disabled');
    }
    const displayTie = () => {
        continueButton.classList.remove('disabled');
    }
    const displayGameWin = (winner) => {
        const p1ElementName = document.querySelector('.player.p1 p').textContent;
        const p2ElementName = document.querySelector('.player.p2 p').textContent;
        const p1Score = document.querySelector('.score.p1').textContent;
        const p2Score = document.querySelector('.score.p2').textContent;
        const winnerName = (winner === 'p1') ? p1ElementName : p2ElementName;
        const winnerTextElement = gameWinModal.querySelector('.winner-text');
        const winDetailsElement = gameWinModal.querySelector('.win-details');

        winnerTextElement.textContent = `${winnerName} wins!`;
        winDetailsElement.textContent = `${p1ElementName} ${p1Score} — ${p2Score} ${p2ElementName}`;

        gameWinModal.classList.add('active');
        continueButton.classList.add('disabled');
    }
    const switchPlayerTurn = (currentPlayerTurn) => {
        const newPlayerTurn = (currentPlayerTurn === 'p1') ? 'p2' : 'p1';

        document.querySelector(`.player.${currentPlayerTurn} p`).classList.remove('turn');
        document.querySelector(`.player.${newPlayerTurn} p`).classList.add('turn');
    }
    const resetPlayerTurn = () => {
        document.querySelector('.player.p1 p').classList.add('turn');
        document.querySelector('.player.p2 p').classList.remove('turn');
    }

    return { updateName, updateBoxSymbol, restartGameBoard, resetScore, displayWin, displayTie, displayGameWin, switchPlayerTurn, resetPlayerTurn }
})();

const gameManager = (function() {
    const restartButtons = document.querySelectorAll('.restart');
    const settingsButton = document.querySelector('.settings');
    const continueButton = document.querySelector('.continue');
    const themeButton = document.querySelector('.theme-mode');
    const modal = document.querySelector('.modal.form');
    const overlay = document.querySelector('.overlay');
    const form = document.querySelector('form');
    const p1 = createPlayer('Player 1', 'X');
    const p2 = createPlayer('Player 2', 'O');
    let matchPlayerTurn = 'p1';
    let playerTurn = 'p1';
    let pointsToWin = 0;

    window.onload = () => {
        modal.classList.add('active');
    }
    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    settingsButton.addEventListener('click', () => {
        modal.classList.add('active');
    });
    restartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            resetPlayerTurn();
            resetScore();
            gameBoardManager.restartGameBoard();
        });
    });
    continueButton.addEventListener(('click'), () => {
        advancePlayerTurn();
        gameBoardManager.restartGameBoard();
    });
    form.addEventListener('submit', (event) => {
        const p1Name = document.getElementById('p1-name').value;
        const p2Name = document.getElementById('p2-name').value;
        const pointsToWin = document.getElementById('win-count').value;
        const botSelect = document.getElementById('ai-enable').checked;
        const botDifficulty = document.getElementById('ai-difficulty').value;

        processFormSubmit(p1Name, p2Name, pointsToWin, botSelect, botDifficulty);
        modal.classList.remove('active');
        event.preventDefault();
    });

    const getPlayerTurn = () => playerTurn;
    const switchPlayerTurn = () => {
        displayController.switchPlayerTurn(playerTurn);
        playerTurn = (playerTurn === 'p1') ? 'p2' : 'p1';
    } 
    const processFormSubmit = (p1Name, p2Name, pointsToWin, botSelect, botDifficulty) => {
        updateName('p1', p1Name);
        updateName('p2', p2Name);
        updatePointsToWin(pointsToWin);
    }
    const updateName = (player, name) => {
        const playerObj = (player === 'p1') ? p1 : p2;

        if (name !== '') {
            playerObj.changeName(name);
            displayController.updateName(player, name);
        }
    }
    const updatePointsToWin = (newPointsToWin) => {
        const intPointsToWin = parseInt(newPointsToWin);

        if (intPointsToWin !== pointsToWin) {
            pointsToWin = intPointsToWin;

            if (p1.getScore() >= intPointsToWin || p2.getScore() >= intPointsToWin) {
                resetScore();
            }
        }
    }
    const resetScore = () => {
        p1.resetScore();
        p2.resetScore();
        displayController.resetScore();
    }
    const resetPlayerTurn = () => {
        playerTurn = 'p1';
        displayController.resetPlayerTurn();
    }
    const advancePlayerTurn = () => {
        displayController.switchPlayerTurn((playerTurn === 'p1') ? 'p2' : 'p1');
        playerTurn = (matchPlayerTurn === 'p1') ? 'p2' : 'p1';
        matchPlayerTurn = playerTurn;
    }
    const processWin = (winIndexes, winSymbol) => {
        const winner = (winSymbol === 'X') ? p1 : p2;
        const winnerStr = (winner === p1) ? 'p1' : 'p2';

        winner.addScore();
        displayController.displayWin(winIndexes, winnerStr);

        if (winner.getScore() >= pointsToWin && pointsToWin > 0) {
            displayController.displayGameWin(winnerStr);
        }
    }

    return { getPlayerTurn, switchPlayerTurn, processWin }
})();

const gameBoardManager = (function() {
    const gameBoardBoxes = document.querySelectorAll('.grid-boxes');

    gameBoardBoxes.forEach((box) => {
        box.addEventListener('click', () => {
            const playerTurnSymbol = (gameManager.getPlayerTurn() === 'p1') ? 'X' : 'O';
            
            processBoxInput(box.getAttribute('data-pos'), playerTurnSymbol);
            checkWin();
        });
    });

    const processBoxInput = (boxPositionNumber, symbol) => {
        if (gameBoard.checkBoxAvailable(boxPositionNumber)) {
            gameBoard.changeBoxSymbol(boxPositionNumber, symbol);
            displayController.updateBoxSymbol(boxPositionNumber, symbol);
            gameManager.switchPlayerTurn();
        }
    }
    const restartGameBoard = () => {
        gameBoard.restartGameBoard();
        displayController.restartGameBoard();
    }
    const checkWin = () => {
        const check = gameBoard.checkWin();
        const winIndexes = new Set();
        let winSymbol;

        for (const winObj in check) {
            if (check[winObj]) {
                for (const index of check[winObj].winningIndexes) {
                    winIndexes.add(index);
                }

                winSymbol = check[winObj].winningSymbol;
            }
        }

        if (winSymbol !== undefined) {
            gameManager.processWin(winIndexes, winSymbol);
        }

        if (gameBoard.checkTie()) {
            displayController.displayTie();
        }
    }

    return { restartGameBoard }
})();

const aiBot = (function() {
    ;
})();

const gameBoard = (function() {
    let gameBoardBoxes = [];

    for (let i = 0; i < 9; i++) {
        gameBoardBoxes.push(createTicTacToeBox(i));
    }

    const getBox = (boxPositionNumber) => {
        const intBoxPositionNumber = parseInt(boxPositionNumber);

        return gameBoardBoxes.find((box) => {
            return intBoxPositionNumber === box.getPositionNumber();
        });
    }
    const changeBoxSymbol = (boxPositionNumber, newSymbol) => {
        const box = getBox(boxPositionNumber);

        box.changeSymbol(newSymbol);
    }
    const getBoxSymbol = (boxPositionNumber) => gameBoardBoxes[boxPositionNumber].getSymbol();
    const checkBoxAvailable = (boxPositionNumber) => getBoxSymbol(boxPositionNumber) === null;
    const checkRowWin = () => {
        const boxesPerRow = Math.sqrt(gameBoardBoxes.length);
        let winningSymbol;
        let winningIndexes = [];
        let countRowsLeft = boxesPerRow;
        let currentRowFirstIndex = 0;
 
        while (countRowsLeft > 0) {
            let symbolsMatched = 0;

            winningIndexes.push(currentRowFirstIndex);

            for (let i = currentRowFirstIndex; i < (boxesPerRow + currentRowFirstIndex - 1); i++) {
                if (gameBoardBoxes[i].getSymbol() === null || gameBoardBoxes[i + 1].getSymbol() === null) {
                    currentRowFirstIndex += boxesPerRow;
                    break;
                }
                else if (gameBoardBoxes[i].getSymbol() !== gameBoardBoxes[i + 1].getSymbol()) {
                    currentRowFirstIndex += boxesPerRow;
                    break;
                } else {
                    winningIndexes.push(i + 1);
                    symbolsMatched++;
                }
            }
            if (symbolsMatched === (boxesPerRow - 1)) {
                winningSymbol = gameBoardBoxes[currentRowFirstIndex].getSymbol();
                return { winningSymbol, winningIndexes }
            }
            winningIndexes = [];
            countRowsLeft--;
        }
        return false;
    }
    const checkColumnWin = () => {
        const boxesPerColumn = Math.sqrt(gameBoardBoxes.length);
        let winningIndexes = [];
        let winningSymbol;
        let countColumnsLeft = boxesPerColumn;
        let currentColumnFirstIndex = 0;
 
        while (countColumnsLeft > 0) {
            let symbolsMatched = 0;

            winningIndexes.push(currentColumnFirstIndex);

            for (let i = currentColumnFirstIndex; i < (boxesPerColumn * (boxesPerColumn - 1) + currentColumnFirstIndex); i += boxesPerColumn) {
                if (gameBoardBoxes[i].getSymbol() === null || gameBoardBoxes[i + boxesPerColumn].getSymbol() === null) {
                    currentColumnFirstIndex++;
                    break;
                }
                else if (gameBoardBoxes[i].getSymbol() !== gameBoardBoxes[i + boxesPerColumn].getSymbol()) {
                    currentColumnFirstIndex++;
                    break;
                } else {
                    winningIndexes.push(i + boxesPerColumn);
                    symbolsMatched++;
                }
            }
            if (symbolsMatched === (boxesPerColumn - 1)) {
                winningSymbol = gameBoardBoxes[currentColumnFirstIndex].getSymbol();
                return { winningSymbol, winningIndexes }
            }
            winningIndexes = [];
            countColumnsLeft--;
        }
        return false;
    }
    const checkDiagWin = () => {
        if (gameBoardBoxes[0].getSymbol() !== null && gameBoardBoxes[4].getSymbol() !== null && gameBoardBoxes[8].getSymbol() !== null) {
            if (gameBoardBoxes[0].getSymbol() === gameBoardBoxes[4].getSymbol() && gameBoardBoxes[4].getSymbol() === gameBoardBoxes[8].getSymbol()) {
                const winningSymbol = gameBoardBoxes[0].getSymbol();
                const winningIndexes = [0,4,8];
                return { winningSymbol, winningIndexes }
            }
        }  
        if (gameBoardBoxes[2].getSymbol() !== null && gameBoardBoxes[4].getSymbol() !== null && gameBoardBoxes[6].getSymbol() !== null) {
            if (gameBoardBoxes[2].getSymbol() === gameBoardBoxes[4].getSymbol() && gameBoardBoxes[4].getSymbol() === gameBoardBoxes[6].getSymbol()) {
                const winningSymbol = gameBoardBoxes[2].getSymbol();
                const winningIndexes = [2,4,6];
                return { winningSymbol, winningIndexes }
            }
        }
        return false;
    }
    const checkTie = () => {
        for (const box of gameBoardBoxes) {
            if (box.getSymbol() === null) {
                return false;
            }
        }

        return true;
    }
    const checkWin = () => {
        const rowWin = checkRowWin();
        const colWin = checkColumnWin();
        const diagWin = checkDiagWin();
        return { rowWin, colWin, diagWin };
    }
    const restartGameBoard = () => {
        gameBoardBoxes.forEach((box) => {
            box.changeSymbol(null);
        });
    }

    const getGameBoard = () => gameBoardBoxes;

    return { checkBoxAvailable, changeBoxSymbol, getBoxSymbol, checkWin, checkTie, restartGameBoard, getGameBoard } 
})();

function createPlayer(name, symbol) {
    let score = 0;

    const getName = () => name;
    const getSymbol = () => symbol;
    const getScore = () => score;
    const changeName = (newName) => name = newName;
    const changeSymbol = (newSymbol) => symbol = newSymbol;
    const addScore = () => score++;
    const resetScore = () => score = 0;

    return { getName, getSymbol, getScore, changeName, changeSymbol, addScore, resetScore }
}

function createTicTacToeBox(positionNumber) {
    let symbol = null;

    const getPositionNumber = () => positionNumber;
    const changeSymbol = (newSymbol) => {
        symbol = newSymbol;
    }
    const getSymbol = () => symbol;

    return { getPositionNumber, changeSymbol, getSymbol }
}



