import useBishop from './useBishop';
import useRook from './useRook';

import type { ChessFile } from '../interfaces/chessInterface';

export default (file: ChessFile) => {
    useBishop(file, true);
    useRook(file, true);
};
