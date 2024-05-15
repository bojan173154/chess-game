import { ref } from 'vue';

import { useChessStore } from '../stores/chess';

import { getNextLetter, getLetterNumber } from '../services/utilities';

import type { ChessFile } from '../interfaces/chessInterface';

export default (file: ChessFile, moveOneSquare = false) => {
    const chessStore = useChessStore();

    const possibleRookMoves: string[] = [];
    const directions = ref<'up' | 'down' | 'left' | 'right'>('up');

    if (chessStore.selectedPiece) {
        if (file.position[0] === chessStore.selectedPiece.position[0] && +file.position[1] < +chessStore.selectedPiece.position[1]) {
            directions.value = 'down';
        }

        if (file.position[0] > chessStore.selectedPiece.position[0] && +file.position[1] === +chessStore.selectedPiece.position[1]) {
            directions.value = 'right';
        }

        if (file.position[0] < chessStore.selectedPiece.position[0] && +file.position[1] === +chessStore.selectedPiece.position[1]) {
            directions.value = 'left';
        }

        const maxMoves = moveOneSquare
            ? 1
            : (
                Math.abs(+file.position[1] - +chessStore.selectedPiece.position[1]) ||
                Math.abs(getLetterNumber(file.position[0]) - getLetterNumber(chessStore.selectedPiece.position[0]))
            );

        const getNewPosition = (move: number) => {
            if (!chessStore.selectedPiece) return;

            switch (directions.value) {
            case 'up':
                return `${chessStore.selectedPiece.position[0]}${+chessStore.selectedPiece.position[1] + move}`;

            case 'down':
                return `${chessStore.selectedPiece.position[0]}${+chessStore.selectedPiece.position[1] - move}`;

            case 'left':
                return `${getNextLetter(chessStore.selectedPiece.position[0], -move)}${chessStore.selectedPiece.position[1]}`;

            case 'right':
                return `${getNextLetter(chessStore.selectedPiece.position[0], move)}${chessStore.selectedPiece.position[1]}`;
            }
        };

        for (let moves = 1; moves <= maxMoves; moves++) {
            const newPosition = getNewPosition(moves);
            if (newPosition) {
                const findPiece = chessStore
                    .chessBoard
                    .flat()
                    .find((piece) => piece.position === newPosition);

                if (findPiece && findPiece.piece) {
                    if (findPiece.pieceColor !== chessStore.selectedPiece.pieceColor) {
                        possibleRookMoves.push(newPosition);
                        if (possibleRookMoves.includes(file.position)) {
                            chessStore.movePiece(file);
                            return;
                        }
                    }
                    break;
                }

                possibleRookMoves.push(newPosition);

                if (possibleRookMoves.includes(file.position)) {
                    chessStore.movePiece(file);
                    return;
                }
            }
        }
    }
};
