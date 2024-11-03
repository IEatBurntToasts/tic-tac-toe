const gameBoard = (function() {
    let gameBoardBoxes = 
})();

function createPlayer(name, symbol) {
    let name = name;
    let symbol = symbol;
    let wins = 0;

    const getName = () => name;
    const getSymbol = () => symbol;
    const getWins = () => wins;
    const changeName = (newName) => name = newName;
    const changeMark = (newSymbol) => symbol = newSymbol;
    const addWin = () => wins++;

    return { getName, getSymbol, getWins, changeName, changeMark, addWin }
}

function createTicTacToeBox(positionNumber) {
    let symbol;
    const positionNumber = positionNumber;

    const getPositionNumber = () => positionNumber;
    const changeSymbol = (newSymbol) => {
        symbol = newSymbol;
    }
    const getSymbol = () => symbol;

    return { getPositionNumber, changeSymbol, getSymbol }
};



