import Ship from "./Ship.js";
class Cell {
    value;
    coordinates;
    isHit;
    constructor(value = null, coordinates) {
        this.value = value;
        this.coordinates = coordinates;
        this.isHit = false;
    }
}
export default Cell;
//# sourceMappingURL=Cell.js.map