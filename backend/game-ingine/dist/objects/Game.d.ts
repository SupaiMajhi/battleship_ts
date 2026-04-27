import Player from "./Player.js";
import type { Coordinates } from "../types.js";
declare enum GameStatus {
    "placing" = 0,
    "in_progress" = 1,
    "over" = 2
}
declare class Game {
    player2: Player;
    player1: Player;
    currentPlayer: Player;
    status: GameStatus;
    constructor(type: string);
    private switchTurn;
    handleAttack(coordinates: Coordinates): GameStatus.over | undefined;
}
export default Game;
//# sourceMappingURL=Game.d.ts.map