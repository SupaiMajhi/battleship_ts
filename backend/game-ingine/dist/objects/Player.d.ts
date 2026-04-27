import Board from "./Board.js";
import Ship from "./Ship.js";
import type { Coordinates } from "../types.js";
declare class Player {
    type: string;
    board: Board;
    prevAttack: Set<string>;
    fleet: Ship[];
    constructor(type?: string);
    generateFleet(): Ship[];
    attack(board: Board, coordinates: Coordinates): void;
    generateRandomAttack(): Coordinates;
}
export default Player;
//# sourceMappingURL=Player.d.ts.map