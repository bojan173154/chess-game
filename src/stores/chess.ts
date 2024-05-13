import { ref } from 'vue';
import { defineStore } from 'pinia';

import usePawn from '../composables/usePawn';
import useKnight from '../composables/useKnight';

import type { ChessFile } from '../interfaces/chessInterface';

export const useChessStore = defineStore('chess', () => {
    const chessBoard = ref<ChessFile[][]>([]);
    const turnToMove = ref<'black' | 'white'>('white');
    const selectedPiece = ref<ChessFile | null>(null);

    const initializeChessBoard = async (): Promise<void> => {
        try {
            const response = await fetch('../../data.json');
            const data: ChessFile[][] = await response.json();
            chessBoard.value = data;
        } catch (e) {
            console.error(e);
        }
    };

    const movePiece = (file: ChessFile): void => {
        if (selectedPiece.value) {
            const updatedPiece = chessBoard
                .value
                .flat()
                .find((pieceToUpdate) => pieceToUpdate.position === file.position);

            if (updatedPiece) {
                updatedPiece.piece = selectedPiece.value.piece;
                updatedPiece.pieceColor = selectedPiece.value.pieceColor;
                updatedPiece.hasMoved = true;
            }

            const movedPiece = chessBoard
                .value
                .flat()
                .find((pieceToMove) => pieceToMove.position === selectedPiece.value?.position);

            if (movedPiece) {
                movedPiece.piece = null;
            }

            selectedPiece.value = null;

            turnToMove.value = turnToMove.value === 'white' ? 'black' : 'white';
        }
    };

    const handleFileClick = (file: ChessFile): void => {
        if (!selectedPiece.value && turnToMove.value === file.pieceColor) {
            selectedPiece.value = file;
            return;
        }

        if (selectedPiece.value) {
            switch (selectedPiece.value.piece) {
            case 'pawn':
                usePawn(file);
                break;

            case 'knight':
                useKnight(file);
                break;

            default:
                break;
            }
        }

        selectedPiece.value = null;
    };

    return {
        chessBoard,
        initializeChessBoard,
        turnToMove,
        handleFileClick,
        selectedPiece,
        movePiece
    };
});
