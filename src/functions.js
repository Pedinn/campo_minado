const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {    // _ = ignorar o atributo (que no caso é o proprio elemento, um monte de 0) // row = indice da linha atual que esta executando
        return Array(columns).fill(0).map((_, column) => {  // _ = ignorar o atributo (que no caso é o proprio elemento, um monte de 0) // colum = indice da coluna atual que esta executando
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

const spreadMines = (board, minesAmount) => {   // espalhar as minas dentro do campo, recebe o board(tabuleiro) e a minesAmount(quantidade de minas espalhadas no tabuleiro)
    const rows = board.length   // pegar a quantidade de linhas
    const columns = board[0].length // pegar quantidade de colunas
    let minesPlanted = 0    // minas plantadas
    
    while (minesPlanted < minesAmount) {    // se a quantidade de minhas plantada
        const rowSel = parseInt(Math.random() * rows, 10)   // pegar a quantidade de linhas, para selecionar uma linha de forma aleatoria usando a base decimal(10)
        const columnSel = parseInt(Math.random() * columns, 10) // pegar a quantidade de colunas, para selecionar uma coluna de forma aleatoria usando a base decimal(10)

        if (!board[rowSel][columnSel].mined) {  // se o board usando a rowSel e a columnSel não estiver minada...
            board[rowSel][columnSel].mined = true   // ... significa que vai plantar mais uma bomba
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {  // cria o tabuleiro ja com as minas plantadas
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board    // retorna ja com  as minas plantadas
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (different && validRow && validColumn) { // Se for difernte e tem uma linha valida e uma coluna valida, significa que pode adicionar esse vizinho na lista dos vizinhos neighbours = []
                neighbors.push(board[r][c]) // adicionado o elemento que percorreu dentro do forEach duplo
            }
        })
    })
    return neighbors // retorna os vizinhos para ser os vizinhos dentro do no que foi passado dentro do board
}

const safeNeighbors = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined // função usando reduce
    return getNeighbors(board, row, column).reduce(safes, true) // o resultado dessa função ira dizer se a vizinhança de um determinado nó dentro do tabuleiro é uma vizinhança segura
}

const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) { // nao estiver aberto
        field.opened = true // ceta o aberto para verdadeiro
        if (field.mined) { // se estiver minado
            field.exploded = true // ceta o explodido para verdadeiro
        } else if (safeNeighbors(board, row, column)) { // se a vizinhança for segura 
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column)) // vai chamando de forma recursiva o abrir compo para outros campos ao redor
        } else { // caso a vizinhança nao for segura
            const neighbors = getNeighbors(board, row, column) // ele pega a vizinhança  
            field.nearMines = neighbors.filter(n => n.mined).length // e calcula a quantidade de minas ao redor
        }
    }
}

const fields = board => [].concat(...board) 
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0 // usado para saber se o jogo terminou ou nao
const pendding = field => (field.mined && !field.flagged) // se o campo estiver minado e nao estiver marcado com a bandeira, significa que ele esta pendente 
    || (!field.mined && !field.opened) // ou então se o campo nao estiver minado e nao estiver aberto, significa que esta pendente
const wonGame = board => fields(board).filter(pendding).length === 0 // se o tamanho desse array gerado for igual a 0, significa que nao existe nenhum campo pendente, ou seja, todos os campos resolvidos
const showMines = board => fields(board).filter(field => field.mined) // pegando todos os campos minados
    .forEach(field => field.opened = true) // abrir todos os campos

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length 


export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}