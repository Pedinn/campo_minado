import { Dimensions } from 'react-native'

const params = {
    blockSize: 30,
    borderSize: 5, 
    fontSize: 15,
    headerRatio: 0.15, // Proporção do painel superior na tela
    difficultLevel: 0.1,
    getColumnsAmount() {
        const width = Dimensions.get('window') .width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height // totalHeight = altura total 
        const borderHeight = totalHeight * (1 - this.headerRatio) // 85% da altura total do dispositivo         borderHeight = altura do tabuleiro
        return Math.floor(borderHeight / this.blockSize) // AlturaDoTabuleiro / TamanhoDoBloco
    }
}

export default params