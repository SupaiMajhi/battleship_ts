import Ship from "./Ship.js";

import type { Coordinates } from "../types.js";

class Cell {
    value: Ship | null;
    coordinates: Coordinates;
    state: string;

    constructor(value = null, coordinates: Coordinates){
       this.value = value; 
       this.coordinates = coordinates;
       this.state = '';
    }
}

export default Cell;