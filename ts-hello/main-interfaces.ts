
interface Point {
    x: number,
    y: number,
    // draw: () => void // can only define members not implement them
}

let drawPoint = (point: Point) => {
    // implementation...
    console.log(point);
}

drawPoint({x: 1, y: 1});