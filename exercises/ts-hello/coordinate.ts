export class Coordinate {
    
    constructor(private _x?: number, private _y?: number) {}

    get y() {
        return this._y;
    }

    set y(value) {
        if (value < 0) {
            throw new Error('\'y\' cannot be less than 0');
        } else {
            this._y = value;
        }
    }

}