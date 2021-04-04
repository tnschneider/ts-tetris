import Space from './Space.js';
import { Inputs, CollisionType } from './Enums.js';
import Constants from './Constants.js';

export default class Board {
    constructor() {
        this.spaces = [];
    }

    addPiece(piece) {
        for (let sp of piece.spaces) {
            this.spaces.push(new Space(sp.x, sp.y, sp.type));
        }
    }

    getCollisionType(piece, input) {
        if (piece.spaces.some(x => x.y < 0 || x.y > Constants.BoardWidth - 1)) {
            return CollisionType.Other;
        }
            
        if (piece.spaces.some(x => x.x > Constants.BoardHeight - 1)) {
            return CollisionType.Bottom;
        }
            
        if (piece.spaces.some(p => this.spaces.some(b => p.x == b.x && p.y == b.y))) {
            if (input == Inputs.Down) {
                return CollisionType.Bottom;
            } 
            return CollisionType.Other;
        }

        return CollisionType.None;
    }

    clearFilledLines() {
        for (let i = 0; i <= Constants.BoardHeight - 1; i++) {
            if (this.spaces.filter(x => x.x == i).length == Constants.BoardWidth) {
                this.spaces = this.spaces.filter(x => x.x != i);
                for (let space of this.spaces.filter(x => x.x < i)) {
                    space.x++;
                }
            }
        }
    }

    hasAnyInvalidSpaces() {
        return this.spaces.some(x => x.x < 0);
    }
}

