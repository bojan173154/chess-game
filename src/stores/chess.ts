import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { ChessBoard } from '../interfaces/chessInterface';

export const useChessStore = defineStore('chess', () => {
    const chessBoard = ref<ChessBoard[][]>([]);

    const initializeChessBoard = async (): Promise<void> => {
        try {
            const response = await fetch('../../data.json');
            const data: ChessBoard[][] = await response.json();
            chessBoard.value = data;
        } catch (e) {
            console.error(e);
        }
    };

    return { chessBoard, initializeChessBoard };
});
