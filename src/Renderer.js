import { Types } from './Enums.js';
import Constants from './Constants.js';

export default class Renderer {
    constructor() {
        this.els = [];
    }

    init() {
        this._drawContainer();
    }

    draw(game) {
        this._drawGame(game);
    }

    _drawContainer() {
        let container = document.createElement("div");

        container.style.position = 'absolute';
        container.style.width = Constants.SquarePx * Constants.BoardWidth + 'px';
        container.style.height = Constants.SquarePx * Constants.BoardHeight + 'px';
        container.style.backgroundColor = 'lightgray';
        
        document.getElementById("board").appendChild(container);

        for (let i = 0; i < Constants.BoardHeight; i++) {
            for (let j = 0; j < Constants.BoardWidth; j++) {
                let sq = document.createElement("div");
                sq.style.position = 'absolute';
                sq.style.border = '0.5px solid darkgray';
                sq.style.height = (Constants.SquarePx - 1) + 'px';
                sq.style.width = (Constants.SquarePx - 1) + 'px';

                sq.style.top = i * Constants.SquarePx + 'px';
                sq.style.left = j * Constants.SquarePx + 'px';

                document.getElementById("board").appendChild(sq);
            }
        }
    }

    _drawGame(game) {
        for (let el of this.els) {
            el.parentNode.removeChild(el);
        }
        this.els = [];

        for (let space of game.board.spaces) {
            this._drawSpace(space);
        }

        for (let space of game.piece.spaces) {
            this._drawSpace(space);
        }

        if (game.gameOver) {
            this._drawGameOver();
        }
    }

    _drawGameOver() {
        let go = document.createElement("div");

        go.innerText = "GAME OVER";
        go.style.position = 'absolute';
        go.style.color = '#3a3b3c';
        go.style.fontFamily = 'Helvetica';
        go.style.fontWeight = 'bold';
        go.style.fontSize = '50px';
        go.style.textAlign = 'center';
        go.style.verticalAlign = 'middle';
        go.style.lineHeight = Constants.SquarePx * Constants.BoardHeight + 'px';
        go.style.width = Constants.SquarePx * Constants.BoardWidth + 'px';
        go.style.height = Constants.SquarePx * Constants.BoardHeight + 'px';

        this.els.push(go);
        document.body.appendChild(go);
    }

    _drawSpace(space) {
        let sp = document.createElement("div");

        sp.style.position = 'absolute';
        sp.style.border = '0.5px solid darkgray';
        sp.style.width = (Constants.SquarePx - 1) + 'px';
        sp.style.height = (Constants.SquarePx - 1) + 'px';
        sp.style.backgroundColor = this._getTypeColor(space.type);
        sp.style.top = space.x * Constants.SquarePx + 'px';
        sp.style.left = space.y * Constants.SquarePx + 'px';

        this.els.push(sp);
        document.getElementById("board").appendChild(sp);
    }

    _getTypeColor(type) {
        switch(type) {
            case Types.I:
                return 'cyan';
            case Types.J:
                return 'blue';
            case Types.L:
                return 'orange';
            case Types.O:
                return 'yellow';
            case Types.S:
                return 'green';
            case Types.T:
                return 'magenta';
            case Types.Z:
                return 'red';
        }
    }
}