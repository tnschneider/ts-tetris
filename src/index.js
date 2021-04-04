import Game from './Game.js';
import Renderer from './Renderer.js';
import GameLoop from './GameLoop.js';
import InputQueue from './InputQueue.js';
import { Inputs } from './Enums.js';

let game = new Game();
let renderer = new Renderer();

let gameLoop = new GameLoop({
    update: (input) => {
        return game.update(input);
    },
    draw: () => {
        renderer.draw(game);
    },
    inputQueue: new InputQueue({
        onKeyDown: (e) => {
            switch (e.key) {
                case "ArrowUp":
                    return Inputs.Rotate;
                case "ArrowLeft":
                    return Inputs.Left;
                case "ArrowRight":
                    return Inputs.Right;
                case "ArrowDown":
                    return Inputs.Down;
                case " ":
                    return Inputs.Drop;
                default: 
                    return null;
            }
        }
    })
});

renderer.init();
gameLoop.start();