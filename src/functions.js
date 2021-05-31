const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => { // _ = ignorar o atributo (que no caso é o proprio elemento, um monte de 0) // row = indice da linha atual que esta executando
        return Array(columns).fill(0).map((_, column) => { // _ = ignorar o atributo (que no caso é o proprio elemento, um monte de 0) // colum = indice da coluna atual que esta executando
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => { // espalhar as minas dentro do campo, recebe o board(tabuleiro) e a minesAmount(quantidade de minas espalhadas no tabuleiro)
    const rows = board.lenght // pegar a quantidade de linhas
    const columns = board[0].lenght // pegar quantidade de colunas
    let minesPlanted = 0 // minas plantadas

    while (minesPlanted < minesAmount) { // se a quantidade de minhas plantada for menor que as minas espalhadas, continua no While. So sai do while quando a quantidade de minas plantadas for igual o maior que a quantidade de minas espalhadas 
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)
    }

    if (!board[rowSel][columnSel].mined) { // se o board usando a rowSel e a columnSel não estiver minada...
        board[rowSel][columnSel].mined = true // ... significa que vai plantar mais uma bomba
        minesPlanted++
    }
}

const createMinedBoard = (rows, columns, minesAmount) => { // tabuleiro ja com as minas plantadas
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board // retorna ja com  as minas plantadas
}

export { createMinedBoard }