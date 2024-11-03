function createTicTacToeBox() {
    let symbol;

    const changeStatus = (newSymbol) => {
        symbol = newSymbol;
    }
    const getSymbol = () => symbol;

    return { changeStatus, getSymbol }
};



