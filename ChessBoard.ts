import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { movePiece, resetBoard } from './chessSlice';
import './ChessBoard.css';

const ChessBoard: React.FC = () => {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.chess.board);
    const eliminatedPieces = useSelector((state: RootState) => state.chess.eliminatedPieces);

    const handleAutomatic = () => {
        const player1Moves = [
            { from: 12, to: 28 },
            { from: 13, to: 29 }
        ];
        const player2Moves = [
            { from: 53, to: 37 },
            { from: 37, to: 29 }
        ];

        player1Moves.forEach((move, index) => {
            setTimeout(() => {
                dispatch(movePiece(move));
                setTimeout(() => {
                    dispatch(movePiece(player2Moves[index]));
                }, 500);
            }, index * 1000);
        });
    };

    return (
        <div>
            <div id="chess-board">
                {board.map((piece, index) => (
                    <div key={index} className={`square ${(index + Math.floor(index / 8)) % 2 === 0 ? 'red' : 'black'}`}>
                        {piece && <div className={`piece ${piece === '♙' ? 'white-piece' : ''}`}>{piece}</div>}
                    </div>
                ))}
            </div>
            <div id="eliminated-pieces">
                {eliminatedPieces.map((piece, index) => (
                    <div key={index} className="piece">{piece}</div>
                ))}
            </div>
            <div id="buttons-container">
                <button id="automatic" onClick={handleAutomatic}>Automatic</button>
                <button id="reset" onClick={() => dispatch(resetBoard())}>Reset</button>
            </div>
        </div>
    );
};

export default ChessBoard;
