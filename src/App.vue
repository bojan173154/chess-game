<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useChessStore } from './stores/chess';

import type { PiecePosition, PromotedPiece } from './interfaces/chessInterface';

import ChessFile from './components/ChessFile.vue';

const PromotonPieces = defineAsyncComponent(() =>
    import('./components/PromotionPieces.vue')
);

const chessStore = useChessStore();
chessStore.initializeChessBoard();

const conditionalNewLine = (position: PiecePosition) => {
    if (['H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2'].includes(position)) {
        return true;
    }

    return false;
};

const handlePromotePiece = (promotedPiece: PromotedPiece): void => {
    chessStore.$patch((state) => {
        state.promotedPiece = promotedPiece;
    });

    const findPiece = chessStore
        .chessBoard
        .flat()
        .find((piece) => piece.position === chessStore.savedPosition);

    if (!findPiece || !chessStore.promotedPiece?.piece) return;

    findPiece.piece = chessStore.promotedPiece.piece;
    findPiece.pieceColor = chessStore.promotedPiece?.color;

    const findOldPawn = chessStore
        .chessBoard
        .flat()
        .find((piece) => piece.position === chessStore.selectedPiece?.position);

    if (!findOldPawn) return;

    findOldPawn.piece = null;

    chessStore.$patch((state) => {
        state.disableBoard = false;
    });
};
</script>

<template>
    <div class="chess-container">
        <div class="promoted-squares-container">
            <promoton-pieces
                v-if="chessStore.promotedPiece && chessStore.disableBoard"
                :color="chessStore.promotedPiece.color"
                @promote-piece="handlePromotePiece"
            />
        </div>

        <div v-for="(row, index) in chessStore.chessBoard" :key="index" class="chess-row">
            <div v-for="file in row" :key="file.position">
                <chess-file :chess-file="file" @click="chessStore.handleFileClick(file)"/>
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
    flex-direction: column;
    position: relative;
    width: 573px;
}

.chess-row {
    display: flex;
}

.promoted-squares-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    right: -50px;
}
</style>
