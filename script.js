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
        const numOfRows = Math.sqrt(gameBoardBoxes.length);
        let countRowsLeft = numOfRows;
        let currentRowFirstIndex = 0;
 
        while (countRowsLeft > 0) {
            for (let i = currentRowFirstIndex; i < numOfRows - 1; i++) {
                if (gameBoardBoxes[i].getSymbol() === null || gameBoardBoxes[i + 1].getSymbol() === null) {
                    currentRowFirstIndex += numOfRows;
                    break;
                }
                else if (gameBoardBoxes[i].getSymbol() !== gameBoardBoxes[i + 1].getSymbol()) {
                    currentRowFirstIndex += numOfRows;
                    break;
                } else {
                    return true;
                }
            }

            countRowsLeft--;
        }

        return false;
    }

    const getGameBoard = () => gameBoardBoxes;

    return { changeBoxSymbol, getGameBoard, checkRowWin } 
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



