const gameBoard = (function() {
    let gameBoardBoxes = [];

    for (let i = 0; i < 9; i++) {
        gameBoardBoxes.push(createTicTacToeBox(i));
    }

    const getBox = (boxPositionNumber) => {
        return gameBoardBoxes.find(({ positionNumber }) => {
            return boxPositionNumber === positionNumber;
        });
    }
    const changeBoxSymbol = (boxPositionNumber, newSymbol) => {
        const box = getBox(boxPositionNumber);

        box.changeSymbol(newSymbol);
    }
    const checkRowWin = () => {
        const boxesPerRow = Math.sqrt(gameBoardBoxes.length);
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
                return winningIndexes;
            }
            winningIndexes = [];
            countRowsLeft--;
        }
        return false;
    }
    const checkColumnWin = () => {
        const boxesPerColumn = Math.sqrt(gameBoardBoxes.length);
        let countColumnsLeft = boxesPerColumn;
        let currentColumnFirstIndex = 0;
 
        while (countColumnsLeft > 0) {
            let symbolsMatched = 0;

            for (let i = currentColumnFirstIndex; i < (boxesPerColumn * (boxesPerColumn - 1) + currentColumnFirstIndex); i += boxesPerColumn) {
                if (gameBoardBoxes[i].getSymbol() === null || gameBoardBoxes[i + boxesPerColumn].getSymbol() === null) {
                    currentColumnFirstIndex++;
                    break;
                }
                else if (gameBoardBoxes[i].getSymbol() !== gameBoardBoxes[i + boxesPerColumn].getSymbol()) {
                    currentColumnFirstIndex++;
                    break;
                } else {
                    symbolsMatched++;
                }
            }
            if (symbolsMatched === (boxesPerColumn - 1)) {
                return true;
            }
            countColumnsLeft--;
        }
        return false;
    }

    const getGameBoard = () => gameBoardBoxes;

    return { changeBoxSymbol, getGameBoard, checkRowWin, checkColumnWin } 
})();

function createPlayer(name, symbol) {
    let wins = 0;

    const getName = () => name;
    const getSymbol = () => symbol;
    const getWins = () => wins;
    const changeName = (newName) => name = newName;
    const changeSymbol = (newSymbol) => symbol = newSymbol;
    const addWin = () => wins++;

    return { getName, getSymbol, getWins, changeName, changeSymbol, addWin }
}

function createTicTacToeBox(positionNumber) {
    let symbol = null;

    const getPositionNumber = () => positionNumber;
    const changeSymbol = (newSymbol) => {
        symbol = newSymbol;
    }
    const getSymbol = () => symbol;

    return { getPositionNumber, changeSymbol, getSymbol }
};



