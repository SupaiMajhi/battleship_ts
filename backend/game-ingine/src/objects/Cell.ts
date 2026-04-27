import Ship from "./Ship.js";

import type { Coordinates } from "../types.js";

class Cell {
    value: Ship | null;
    isAttacked: boolean;

    constructor(value = null){
       this.value = value; 
       this.isAttacked = false;
    }
}

export default Cell;