var Point = /** @class */ (function () {
    function Point(x, y, z) {
        this.z = 10;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Point.prototype.draw = function () {
        // do this...
        console.log('draw x: ' + this.x);
        console.log('draw y: ' + this.y);
        console.log('draw z: ' + this.z);
    };
    return Point;
}());
var point1 = new Point(1, 1);
point1.draw();
var point2 = new Point(1, 1, 1);
point2.draw();
point1.z = 3; // compile err, 'z' is private
var Coordinate = /** @class */ (function () {
    function Coordinate(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Coordinate.prototype, "y", {
        // TypeScript offers us a shorthand for defining our fields and setting them in the typical way (this.x = x;)
        // constructor(public x?: number, public y?: number) {}
        // In order to get this shortcut from TypeScript, we need to specify the access modifier
        // therefore, we need to explicitly say 'public' in this instance
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (value < 0) {
                throw new Error('\'y\' cannot be less than 0');
            }
            else {
                this._y = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Coordinate;
}());
var coord = new Coordinate(1);
coord.y = 1;
console.log('coord: ' + coord);
