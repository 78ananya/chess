import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChessState {
    board: string[];
    eliminatedPieces: string[];
}

const initialState: ChessState = {
    board: [
        '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
        '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
        '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
    ],
    eliminatedPieces: []
};

const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        movePiece: (state, action: PayloadAction<{ from: number, to: number }>) => {
            const { from, to } = action.payload;
            const piece = state.board[from];
            if (state.board[to]) {
                state.eliminatedPieces.push(state.board[to]);
            }
            state.board[to] = piece;
            state.board[from] = '';
        },
        resetBoard: (state) => {
            state.board = [
                '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
                '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
                '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '',
                '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
                '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
            ];
            state.eliminatedPieces = [];
        }
    }
});

export const { movePiece, resetBoard } = chessSlice.actions;
export default chessSlice.reducer;
