export default class InputQueue {
    constructor(props) {
        this.queue = [];

        if (props.onKeyDown) {
            document.addEventListener("keydown", (e) => {
                var input = props.onKeyDown(e);
                if (input) this.queue.push(input);
            }, false);
        }

        if (props.onClick) {
            document.addEventListener("click", (e) => {
                let input = props.onClick(e);
                if (input) this.queue.push(input);
            }, false);
        }
    }

    getNext() {
        if (this.queue.length > 0) {
            var el = this.queue.shift();
            return el;
        }
        return null;
    }
}