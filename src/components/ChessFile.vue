<script setup lang="ts">
import { computed } from 'vue';

import type { ChessFile } from '../interfaces/chessInterface';

import { generatePiece } from '../services/componentGenerator';

const props = defineProps<{
    chessFile: ChessFile;
}>();

const computedFileColor = computed((): string => {
    return props.chessFile.color === 'black' ? '#b58863' : '#f0d9b5';
});

const computedLetterColor = computed(() => {
    return props.chessFile.color === 'white' ? '#b58863' : '#f0d9b5';
});

const computedFileLetter = computed(() => {
    if (['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'].includes(props.chessFile.position)) {
        return {
            showLetter: true,
            color: computedLetterColor.value,
            letter: props.chessFile.position[0].toLowerCase()
        };
    }
    return {
        showLetter: false
    };
});

const computedFileNumber = computed(() => {
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'].includes(props.chessFile.position)) {
        return {
            showNumber: true,
            color: computedLetterColor.value,
            number: props.chessFile.position[1]
        };
    }
    return {
        showNumber: false
    };
});
</script>

<template>
    <div class="chess-file">
        <span v-if="computedFileLetter.showLetter" class="file-letter">
            {{ computedFileLetter.letter }}
        </span>
        <span v-if="computedFileNumber.showNumber" class="file-number">
            {{ computedFileNumber.number }}
        </span>

        <component :is="generatePiece({ piece: chessFile.piece, color: chessFile.pieceColor })"/>
    </div>
</template>

<style scoped>
.chess-file {
    width: 70px;
    height: 70px;
    background-color: v-bind('computedFileColor');
    border: 1px solid white;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center
}

.file-letter {
    position: absolute;
    bottom: 0;
    left: 2px;
    color: v-bind('computedFileLetter.color');
    font-weight: 600;
}

.file-number {
    position: absolute;
    top: 0;
    right: 2px;
    color: v-bind('computedFileNumber.color');
    font-weight: 600;
}
</style>
