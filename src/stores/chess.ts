import { ref } from 'vue';
import { defineStore } from 'pinia';

import usePawn from '../composables/usePawn';
import useKnight from '../composables/useKnight';
import useBishop from '../composables/useBishop';
import useQueen from '../composables/useQueen';
import useRook from '../composables/useRook';
import useKing from '../composables/useKing';

import type {
    ChessFile,
    PromotedPiece,
    PiecePosition,
    LastMove
} from '../interfaces/chessInterface';

export const useChessStore = defineStore('chess', () => {
    const chessBoard = ref<ChessFile[][]>([]);
    const turnToMove = ref<'black' | 'white'>('white');
    const selectedPiece = ref<ChessFile | null>(null);
    const disableBoard = ref<boolean>(false);
    const promotedPiece = ref<PromotedPiece | null>(null);
    const savedPosition = ref<PiecePosition | null>(null);
    const lastMove = ref<LastMove | null>(null);

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

            lastMove.value = {
                piece: file.piece,
                color: selectedPiece.value.pieceColor,
                from: selectedPiece.value.position,
                to: file.position
            };

            selectedPiece.value = null;

            turnToMove.value = turnToMove.value === 'white' ? 'black' : 'white';
        }
    };

    const handlePromotion = (file: ChessFile): void => {
        promotedPiece.value = {
            color: selectedPiece.value?.pieceColor as 'white' | 'black'
        };

        savedPosition.value = file.position;
    };

    const handleFileClick = (file: ChessFile): void => {
        if (disableBoard.value) return;

        if (!selectedPiece.value && turnToMove.value === file.pieceColor) {
            selectedPiece.value = file;
            return;
        }

        if (
            (file.position[1] === '8' && selectedPiece.value?.pieceColor === 'white' && selectedPiece.value?.piece === 'pawn') ||
            (file.position[1] === '1' && selectedPiece.value?.pieceColor === 'black' && selectedPiece.value?.piece === 'pawn')
        ) {
            disableBoard.value = true;
            handlePromotion(file);
            return;
        }

        if (selectedPiece.value) {
            switch (selectedPiece.value.piece) {
            case 'pawn':
                usePawn(file, lastMove.value);
                break;

            case 'knight':
                useKnight(file);
                break;

            case 'bishop':
                useBishop(file);
                break;

            case 'queen':
                useQueen(file);
                break;

            case 'rook':
                useRook(file);
                break;

            case 'king':
                useKing(file);
                break;
            }
        }
    };

    return {
        chessBoard,
        initializeChessBoard,
        turnToMove,
        handleFileClick,
        selectedPiece,
        movePiece,
        promotedPiece,
        savedPosition,
        disableBoard
    };
});
