<script setup lang="ts">
import { generatePiece } from '../services/componentGenerator';
import type { Piece, PromotedPiece } from '../interfaces/chessInterface';

defineProps<{
    color: 'white' | 'black';
}>();

const emit = defineEmits<{
    promotePiece: [PromotedPiece]
}>();

const pieces: Piece[] = ['rook', 'knight', 'bishop', 'queen'];
</script>

<template>
    <div
        v-for="(piece, index) in pieces"
        :key="index"
        class="promoted-squares"
        @click="emit('promotePiece', { piece, color })"
    >
        <component :is="generatePiece({ piece, color })" />
    </div>
</template>

<style scoped>
.promoted-squares {
    height: 30px;
    width: 40px;
    background-color: #ffffff;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
