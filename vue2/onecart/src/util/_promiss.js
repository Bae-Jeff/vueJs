const FULFILED = 'fulfiled';

class MyPromiss {
    #state = 'pending' // #xxx hide in outside
    #result = undefined;
    constructor(executor) {
        // this._state = 'pending'; //_xxx blok use in outside
        // this._result = undefined;
        const resolve = (data) => {
            this.#state = 'rejected';
            this.#result = data

        };
        const reject = (reson) => { };
        executor(resolve, reject)
    }
    #changeState(state, result) {
        if (this.#state !== 'pending') {

        }
    }
}