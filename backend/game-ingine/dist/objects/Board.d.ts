import Cell from "./Cell.js";
import Ship from "./Ship.js";
import type { Coordinates } from "../types.js";
declare class Board {
    grid: Cell[][];
    ships: Ship[];
    missed: Set<string>;
    constructor(size?: number);
    createBoard(size: number): Cell[][];
    private checkBound;
    private isOverlap;
    placeShip(ship: Ship, coordinates: Coordinates, horizontal?: boolean): void;
    receiveAttack(coordinates: Coordinates): "hit" | "miss";
    areAllShipsSunk(): boolean;
}
export default Board;
//# sourceMappingURL=Board.d.ts.map