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

function createTicTacToeBox() {
    let symbol;

    const changeStatus = (newSymbol) => {
        symbol = newSymbol;
    }
    const getSymbol = () => symbol;

    return { changeStatus, getSymbol }
};



