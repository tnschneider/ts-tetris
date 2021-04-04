export default class GameLoop {
    constructor(props) {
        this.update = props.update;
        this.draw = props.draw;
        this.inputQueue = props.inputQueue;
    }
    
    loop() {
        var input = this.inputQueue.getNext();
    
        let stop = this.update(input);
        this.draw();

        if (stop) return;
    
        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
    
    start() {
        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
}

