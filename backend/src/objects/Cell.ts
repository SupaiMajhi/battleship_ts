import type { Coordinates } from "../types.js";

class Cell {
    hasShip: boolean;
    isHit: boolean;
    coordinates: Coordinates;

    constructor(coordinates: Coordinates){
        this.coordinates = coordinates;
        this.hasShip = false;
        this.isHit = false;
    }
}

export default Cell;