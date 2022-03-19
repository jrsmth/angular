
class Point {
    x: number;
    y: number;
    private z = 10;

    constructor(x: number, y: number, z?: number){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    draw() {
        // do this...
        console.log('draw x: ' + this.x);
        console.log('draw y: ' + this.y);
        console.log('draw z: ' + this.z);
    }
}

let point1 = new Point(1, 1);
point1.draw();

let point2 = new Point(1, 1, 1);
point2.draw();

point1.z = 3; // compile err, 'z' is private



class Coordinate {
    constructor(private _x?: number, private _y?: number) {}
    // TypeScript offers us a shorthand for defining our fields and setting them in the typical way (this.x = x;)

    // constructor(public x?: number, public y?: number) {}
    // In order to get this shortcut from TypeScript, we need to specify the access modifier
        // therefore, we need to explicitly say 'public' in this instance

    get y() { // _varName is used in the constructor to free up varName for use in the Property
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

let coord = new Coordinate(1);
coord.y = 1;
console.log('coord: ' + coord);