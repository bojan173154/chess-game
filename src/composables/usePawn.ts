import { ref } from 'vue';
import { useChessStore } from '../stores/chess';

import { getNextLetter, getLetterNumber } from '../services/utilities';

import type { ChessFile, LastMove } from '../interfaces/chessInterface';

export default (file: ChessFile, lastMove: LastMove | null) => {
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

        const additionalChecksForEnPassant = () => {
            if (
                chessStore.selectedPiece &&
                chessStore.selectedPiece.pieceColor === 'white' &&
                lastMove &&
                (+file.position[1] - +lastMove.to[1] === 1) &&
                file.position[0] === lastMove.to[0]
            ) {
                return true;
            }

            if (
                chessStore.selectedPiece &&
                chessStore.selectedPiece.pieceColor === 'black' &&
                lastMove &&
                (+lastMove.to[1] - +file.position[1] === 1) &&
                file.position[0] === lastMove.to[0]
            ) {
                return true;
            }

            return false;
        };

        if (
            lastMove?.piece === 'pawn' &&
            lastMove?.to[1] === chessStore.selectedPiece.position[1] &&
            (Math.abs(getLetterNumber(lastMove?.to[0]) - getLetterNumber(chessStore.selectedPiece.position[0])) === 1) &&
            (Math.abs(+lastMove?.to[1] - +lastMove?.from[1]) === 2) &&
            additionalChecksForEnPassant()
        ) {
            const oldPawn = chessStore
                .chessBoard
                .flat()
                .find((oldPiece) => oldPiece.position === lastMove.to);

            if (oldPawn) oldPawn.piece = null;

            const newPawn = chessStore
                .chessBoard
                .flat()
                .find((newPiece) => newPiece.position === file.position);

            if (newPawn) {
                chessStore.movePiece({
                    ...newPawn,
                    piece: 'pawn',
                    pieceColor: file.pieceColor
                });
            }
        }
    }
};
