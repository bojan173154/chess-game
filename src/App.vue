<script setup lang="ts">
import { useChessStore } from './stores/chess';

import type { PiecePosition } from './interfaces/chessInterface';

import ChessFile from './components/ChessFile.vue';

const chessStore = useChessStore();
chessStore.initializeChessBoard();

const conditionalNewLine = (position: PiecePosition) => {
    if (['H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2'].includes(position)) {
        return true;
    }

    return false;
};
</script>

<template>
    <div class="chess-container">
        <div v-for="(row, index) in chessStore.chessBoard" :key="index">
            <div v-for="file in row" :key="file.position">
                <chess-file :file-color="file.color" />
            </div>
            <br v-if="conditionalNewLine(row[0].position)" />
        </div>
    </div>
</template>

<style scoped>
.chess-container {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
}
</style>
