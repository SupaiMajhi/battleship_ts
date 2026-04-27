import Ship from "./Ship.js";
import type { Coordinates } from "../types.js";
declare class Cell {
    value: Ship | null;
    coordinates: Coordinates;
    isHit: boolean;
    constructor(value: null | undefined, coordinates: Coordinates);
}
export default Cell;
//# sourceMappingURL=Cell.d.ts.map