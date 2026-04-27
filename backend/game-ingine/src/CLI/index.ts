import Game from "../objects/Game.js";
import Ship from "../objects/Ship.js";
import Player from "../objects/Player.js";

enum GameStatus {
    "placing",
    "in_progress",
    "over"
}

const player1 = new Player();
const player2 = new Player("human");

const game = new Game(player1, player2);

game.player1.board.placeShip(ship1, { x: 0, y: 0 }, true);
game.player2.board.placeShip(ship2, { x: 0, y: 1 }, true);
game.status = GameStatus.in_progress;



console.log(game.player2.board);