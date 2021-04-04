import Piece from './Piece.js';
import Board from './Board.js';
import Clock from './Clock.js';
import { Inputs, CollisionType } from './Enums.js';

export default class Game {
    constructor() {
        this.piece = Piece.generate();
        this.board = new Board();
        this.clock = new Clock();
        this.gameOver = false;
    }

    update(input) {
        if (this.gameOver) return;

        let stopped = false;
        if (input == Inputs.Drop) {
            while (!stopped) {
                stopped = this._applyMove(Inputs.Down);
            }
        } else {
            stopped = this._applyMove(input);
        }

        if (!stopped && this.clock.timeToDrop()) {
            this._applyMove(Inputs.Down);
        }
        
        this.board.clearFilledLines();

        if (this.board.getCollisionType(this.piece) != CollisionType.None
            || this.board.hasAnyInvalidSpaces()) {
            this.gameOver = true;
            return true;
        }

        return false;
    }

    _applyMove(input) {
        let p = this.piece.copy();
        p.move(input);
        
        let collType = this.board.getCollisionType(p, input);
        
        if (collType == CollisionType.Bottom) {
            this.board.addPiece(this.piece);
            this.piece = Piece.generate();
            return true;
        } else if (collType != CollisionType.Other) {
            this.piece = p;
            return false;
        } else {
            return false;
        }
    }
}