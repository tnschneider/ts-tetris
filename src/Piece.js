import Space from './Space.js';
import { Inputs, Types, Orientations } from './Enums.js';

export default class Piece {
    constructor(type, orientation) {
        this.type = type;
        this.orientation = orientation;

        this.spaces = this._getInitialSpaces();
    }

    copy() {
        let piece = Piece.create(this.type, this.orientation);
        piece.spaces = [];
        for (let space of this.spaces) {
            piece.spaces.push(new Space(space.x, space.y, space.type));
        }
        return piece;
    }

    move(input) {
        switch (input) {
            case Inputs.Left:
                for (let space of this.spaces) {
                    space.y--;
                }
                return;
            case Inputs.Right:
                for (let space of this.spaces) {
                    space.y++;
                }
                return;
            case Inputs.Down:
                for (let space of this.spaces) {
                    space.x++;
                }
                return;
            case Inputs.Rotate:
                this._applyRotate();
                this.orientation = Orientations.next(this.orientation);
                return;
        }
    }

    static create(type, orientation) {
        orientation ||= Orientations.A;

        switch (type) {
            case Types.I:
                return new PieceI(type, orientation);
            case Types.O:
                return new PieceO(type, orientation);
            case Types.T:
                return new PieceT(type, orientation);
            case Types.S:
                return new PieceS(type, orientation);
            case Types.Z:
                return new PieceZ(type, orientation);
            case Types.J:
                return new PieceJ(type, orientation);
            case Types.L:
                return new PieceL(type, orientation);
        }
    }

    static generate() {
        let keys = Object.keys(Types);
        let type = keys[Math.floor(Math.random() * keys.length)];
        
        return Piece.create(type);
    }
}

class PieceI extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 5, this.type),
            new Space(1, 5, this.type),
            new Space(2, 5, this.type),
            new Space(3, 5, this.type)
        ];
    }
    
    _applyRotate() {
        switch (this.orientation) {
            case Orientations.A:
                this.spaces[0].y--; this.spaces[0].x++;
                this.spaces[2].y++; this.spaces[2].x--;
                this.spaces[3].y+=2; this.spaces[3].x-=2;
                return;
            case Orientations.B:
                this.spaces[0].y++; this.spaces[0].x--;
                this.spaces[2].y--; this.spaces[2].x++;
                this.spaces[3].y-=2; this.spaces[3].x+=2;
                return;
            case Orientations.C:
                this.spaces[0].y--; this.spaces[0].x++;
                this.spaces[2].y++; this.spaces[2].x--;
                this.spaces[3].y+=2; this.spaces[3].x-=2;
                return;
            case Orientations.D:
                this.spaces[0].y++; this.spaces[0].x--;
                this.spaces[2].y--; this.spaces[2].x++;
                this.spaces[3].y-=2; this.spaces[3].x+=2;
                return;
        }
    }
}

class PieceO extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 5, this.type),
            new Space(0, 6, this.type),
            new Space(1, 5, this.type),
            new Space(1, 6, this.type)
        ];
    }

    _applyRotate() { }
}

class PieceT extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 4, this.type),
            new Space(0, 5, this.type),
            new Space(0, 6, this.type),
            new Space(1, 5, this.type)
        ];
    }

    _applyRotate() {
        switch (this.orientation) {
            case Orientations.A:
                this.spaces[0].y++; this.spaces[0].x--;
                this.spaces[2].y--; this.spaces[2].x++;
                this.spaces[3].y--; this.spaces[3].x--;
                return;
            case Orientations.B:
                this.spaces[0].y++; this.spaces[0].x++;
                this.spaces[2].y--; this.spaces[2].x--;
                this.spaces[3].y++; this.spaces[3].x--;
                return;
            case Orientations.C:
                this.spaces[0].y--; this.spaces[0].x++;
                this.spaces[2].y++; this.spaces[2].x--;
                this.spaces[3].y++; this.spaces[3].x++;
                return;
            case Orientations.D:
                this.spaces[0].y--; this.spaces[0].x--;
                this.spaces[2].y++; this.spaces[2].x++;
                this.spaces[3].y--; this.spaces[3].x++;
                return;
        }
    }
}

class PieceS extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 5, this.type),
            new Space(0, 6, this.type),
            new Space(1, 4, this.type),
            new Space(1, 5, this.type)
        ];
    }

    _applyRotate() {
        switch (this.orientation) {
            case Orientations.A:
                this.spaces[0].x++;    
                this.spaces[1].y--; this.spaces[1].x+=2;
                this.spaces[2].x--;
                this.spaces[3].y--;
                return;
            case Orientations.B:
                this.spaces[0].x--;    
                this.spaces[1].y++; this.spaces[1].x-=2;
                this.spaces[2].x++;
                this.spaces[3].y++;
                return;
            case Orientations.C:
                this.spaces[0].x++;    
                this.spaces[1].y--; this.spaces[1].x+=2;
                this.spaces[2].x--;
                this.spaces[3].y--;
                return;
            case Orientations.D:
                this.spaces[0].x--;    
                this.spaces[1].y++; this.spaces[1].x-=2;
                this.spaces[2].x++;
                this.spaces[3].y++;
                return;
        }
    }
}

class PieceZ extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 4, this.type),
            new Space(0, 5, this.type),
            new Space(1, 5, this.type),
            new Space(1, 6, this.type)
        ];
    }

    _applyRotate() {
        switch (this.orientation) {
            case Orientations.A:
                this.spaces[0].y++;    
                this.spaces[1].x++;
                this.spaces[2].y--; 
                this.spaces[3].y-=2; this.spaces[3].x++;
                return;
            case Orientations.B:
                this.spaces[0].y--;    
                this.spaces[1].x--;
                this.spaces[2].y++; 
                this.spaces[3].y+=2; this.spaces[3].x--;
                return;
            case Orientations.C:
                this.spaces[0].y++;    
                this.spaces[1].x++;
                this.spaces[2].y--; 
                this.spaces[3].y-=2; this.spaces[3].x++;
                return;
            case Orientations.D:
                this.spaces[0].y--;    
                this.spaces[1].x--;
                this.spaces[2].y++; 
                this.spaces[3].y+=2; this.spaces[3].x--;
                return;
        }
    }
}

class PieceJ extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 5, this.type),
            new Space(1, 5, this.type),
            new Space(2, 4, this.type),
            new Space(2, 5, this.type)
        ];
    }

    _applyRotate() {
        switch (this.orientation) {
            case Orientations.A:
                this.spaces[0].y++; this.spaces[0].x++;
                this.spaces[2].x-=2; 
                this.spaces[3].y--; this.spaces[3].x--;
                return;
            case Orientations.B:
                this.spaces[0].y--; this.spaces[0].x++;
                this.spaces[2].y+=2; 
                this.spaces[3].y++; this.spaces[3].x--;
                return;
            case Orientations.C:
                this.spaces[0].y--; this.spaces[0].x--;
                this.spaces[2].x+=2; 
                this.spaces[3].y++; this.spaces[3].x++;
                return;
            case Orientations.D:
                this.spaces[0].y++; this.spaces[0].x--;
                this.spaces[2].y-=2; 
                this.spaces[3].y--; this.spaces[3].x++;
                return;
        }
    }
}

class PieceL extends Piece {
    _getInitialSpaces() {
        return [
            new Space(0, 5, this.type),
            new Space(1, 5, this.type),
            new Space(2, 5, this.type),
            new Space(2, 6, this.type)
        ];
    }

    _applyRotate() {
        switch (this.orientation) {
            case Orientations.A:
                this.spaces[0].y++; this.spaces[0].x++;
                this.spaces[2].y--; this.spaces[2].x--;
                this.spaces[3].y-=2; 
                return;
            case Orientations.B:
                this.spaces[0].y--; this.spaces[0].x++;
                this.spaces[2].y++; this.spaces[2].x--;
                this.spaces[3].x-=2; 
                return;
            case Orientations.C:
                this.spaces[0].y--; this.spaces[0].x--;
                this.spaces[2].y++; this.spaces[2].x++;
                this.spaces[3].y+=2; 
                return;
            case Orientations.D:
                this.spaces[0].y++; this.spaces[0].x--;
                this.spaces[2].y--; this.spaces[2].x++;
                this.spaces[3].x+=2; 
                return;
        }
    }
}

