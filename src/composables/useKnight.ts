import { useChessStore } from '../stores/chess';

import { getNextLetter } from '../services/utilities';

import type { ChessFile } from '../interfaces/chessInterface';

export default (file: ChessFile) => {
    const chessStore = useChessStore();

    if (chessStore.selectedPiece) {
        const possibleKnightMoves: string[] = [
            `${getNextLetter(chessStore.selectedPiece.position[0], -1)}${+chessStore.selectedPiece.position[1] + 2}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], 1)}${+chessStore.selectedPiece.position[1] + 2}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], -2)}${+chessStore.selectedPiece.position[1] + 1}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], 2)}${+chessStore.selectedPiece.position[1] + 1}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], -2)}${+chessStore.selectedPiece.position[1] - 1}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], 2)}${+chessStore.selectedPiece.position[1] - 1}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], -1)}${+chessStore.selectedPiece.position[1] - 2}`,
            `${getNextLetter(chessStore.selectedPiece.position[0], 1)}${+chessStore.selectedPiece.position[1] - 2}`
        ];

        if (possibleKnightMoves.includes(file.position)) {
            const findPiece = chessStore
                .chessBoard
                .flat()
                .find((piece) => piece.position === file.position);

            if (
                findPiece &&
                findPiece.piece &&
                findPiece.pieceColor === file.pieceColor
            ) {
                return;
            }
            chessStore.movePiece(file);
        }
    }
};
