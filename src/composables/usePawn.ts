import { ref } from 'vue';
import { useChessStore } from '../stores/chess';

import { getNextLetter } from '../services/utilities';

import type { ChessFile } from '../interfaces/chessInterface';

export default (file: ChessFile) => {
    const chessStore = useChessStore();

    if (chessStore.selectedPiece) {
        const numOfFilesToMove = ref<1 | 2>(chessStore.selectedPiece?.hasMoved ? 1 : 2);

        const positionToMove = chessStore.selectedPiece.pieceColor === 'white'
            ? +chessStore.selectedPiece.position[1] + 1
            : +chessStore.selectedPiece.position[1] - 1;

        if (file.position === chessStore.selectedPiece.position) return;

        if (file.position[0] === chessStore.selectedPiece.position[0]) {
            if (
                chessStore.selectedPiece.pieceColor === 'white' &&
                +file.position[1] - +chessStore.selectedPiece.position[1] <= numOfFilesToMove.value
            ) {
                const nextFile = chessStore
                    .chessBoard
                    .flat()
                    .find((pieceToUpdate) => pieceToUpdate.position === `${file.position[0]}${positionToMove}`);

                if (!nextFile?.piece) {
                    chessStore.movePiece(file);
                }
                return;
            }

            if (
                chessStore.selectedPiece.pieceColor === 'black' &&
                +chessStore.selectedPiece.position[1] - +file.position[1] <= numOfFilesToMove.value
            ) {
                const previousFile = chessStore
                    .chessBoard
                    .flat()
                    .find((pieceToUpdate) => pieceToUpdate.position === `${file.position[0]}${positionToMove}`);

                if (!previousFile?.piece) {
                    chessStore.movePiece(file);
                }
                return;
            }
        }

        const firstDiagonalPosition: string | null = getNextLetter(chessStore.selectedPiece.position[0], 1)
            ? `${getNextLetter(chessStore.selectedPiece.position[0], 1)}${positionToMove}`
            : null;

        const secondDiagonalPosition: string | null = getNextLetter(chessStore.selectedPiece.position[0], -1)
            ? `${getNextLetter(chessStore.selectedPiece.position[0], -1)}${positionToMove}`
            : null;

        if (firstDiagonalPosition) {
            const firstDiagonalFile = chessStore
                .chessBoard
                .flat()
                .find((pieceToUpdate) => pieceToUpdate.position === firstDiagonalPosition);

            if (
                firstDiagonalFile &&
                firstDiagonalFile.piece &&
                firstDiagonalFile.piece !== 'king' &&
                firstDiagonalFile.pieceColor !== chessStore.selectedPiece.pieceColor &&
                file.position === firstDiagonalPosition
            ) {
                chessStore.movePiece({
                    ...firstDiagonalFile,
                    piece: file.piece,
                    pieceColor: file.pieceColor
                });
                return;
            }
        }

        if (secondDiagonalPosition) {
            const secondDiagonalFile = chessStore
                .chessBoard
                .flat()
                .find((pieceToUpdate) => pieceToUpdate.position === secondDiagonalPosition);

            if (
                secondDiagonalFile &&
                secondDiagonalFile.piece &&
                secondDiagonalFile.piece !== 'king' &&
                secondDiagonalFile.pieceColor !== chessStore.selectedPiece.pieceColor &&
                file.position === secondDiagonalPosition
            ) {
                chessStore.movePiece({
                    ...secondDiagonalFile,
                    piece: file.piece,
                    pieceColor: file.pieceColor
                });
            }
        }
    }

};
