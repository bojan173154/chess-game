import { ref } from 'vue';

import { useChessStore } from '../stores/chess';

import { getNextLetter } from '../services/utilities';

import type { ChessFile } from '../interfaces/chessInterface';

export default (file: ChessFile) => {
    const chessStore = useChessStore();
    const possibleBishopMoves: string[] = [];
    const diagonal = ref<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>('bottomRight');

    if (chessStore.selectedPiece) {
        if (file.position[0] < chessStore.selectedPiece.position[0] && +file.position[1] > +chessStore.selectedPiece.position[1]) {
            diagonal.value = 'topLeft';
        }
        if (file.position[0] < chessStore.selectedPiece.position[0] && +file.position[1] < +chessStore.selectedPiece.position[1]) {
            diagonal.value = 'bottomLeft';
        }
        if (file.position[0] > chessStore.selectedPiece.position[0] && +file.position[1] > +chessStore.selectedPiece.position[1]) {
            diagonal.value = 'topRight';
        }

        const maxMoves = Math.abs(+file.position[1] - +chessStore.selectedPiece.position[1]);

        const getNewPosition = (move: number) => {
            if (!chessStore.selectedPiece) return;

            switch (diagonal.value) {
            case 'topLeft':
                return `${getNextLetter(chessStore.selectedPiece.position[0], -move)}${+chessStore.selectedPiece.position[1] + move}`;

            case 'topRight':
                return `${getNextLetter(chessStore.selectedPiece.position[0], move)}${+chessStore.selectedPiece.position[1] + move}`;

            case 'bottomLeft':
                return `${getNextLetter(chessStore.selectedPiece.position[0], -move)}${+chessStore.selectedPiece.position[1] - move}`;

            case 'bottomRight':
                return `${getNextLetter(chessStore.selectedPiece.position[0], move)}${+chessStore.selectedPiece.position[1] - move}`;
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
                        possibleBishopMoves.push(newPosition);
                        if (possibleBishopMoves.includes(file.position)) {
                            chessStore.movePiece(file);
                            return;
                        }
                    }
                    break;
                }

                possibleBishopMoves.push(newPosition);

                if (possibleBishopMoves.includes(file.position)) {
                    chessStore.movePiece(file);
                    return;
                }
            }
        }
    }
};
