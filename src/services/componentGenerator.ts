import type { Piece } from '../interfaces/chessInterface';

import BlackBishop from '../components/chessPieces/BlackBishop.vue';
import BlackKing from '../components/chessPieces/BlackKing.vue';
import BlackKnight from '../components/chessPieces/BlackKnight.vue';
import BlackPawn from '../components/chessPieces/BlackPawn.vue';
import BlackQueen from '../components/chessPieces/BlackQueen.vue';
import BlackRook from '../components/chessPieces/BlackRook.vue';
import WhiteBishop from '../components/chessPieces/WhiteBishop.vue';
import WhiteKing from '../components/chessPieces/WhiteKing.vue';
import WhiteKnight from '../components/chessPieces/WhiteKnight.vue';
import WhitePawn from '../components/chessPieces/WhitePawn.vue';
import WhiteQueen from '../components/chessPieces/WhiteQueen.vue';
import WhiteRook from '../components/chessPieces/WhiteRook.vue';

export const generatePiece = ({ piece, color }: { piece: Piece, color: 'white' | 'black'| null }) => {
    switch (piece) {
    case 'bishop':
        return color === 'black' ? BlackBishop : WhiteBishop;

    case 'king':
        return color === 'black' ? BlackKing : WhiteKing;

    case 'knight':
        return color === 'black' ? BlackKnight : WhiteKnight;

    case 'pawn':
        return color === 'black' ? BlackPawn : WhitePawn;

    case 'queen':
        return color === 'black' ? BlackQueen : WhiteQueen;

    case 'rook':
        return color === 'black' ? BlackRook : WhiteRook;

    default:
        return null;
    }
};
