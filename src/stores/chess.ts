import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { ChessFile } from '../interfaces/chessInterface';

export const useChessStore = defineStore('chess', () => {
    const chessBoard = ref<ChessFile[][]>([]);

    const initializeChessBoard = async (): Promise<void> => {
        try {
            const response = await fetch('../../data.json');
            const data: ChessFile[][] = await response.json();
            chessBoard.value = data;
        } catch (e) {
            console.error(e);
        }
    };

    return { chessBoard, initializeChessBoard };
});
