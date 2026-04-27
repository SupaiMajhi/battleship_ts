import Game from "../objects/Game.js";
import Ship from "../objects/Ship.js";
const game = new Game("human");
const ship1 = new Ship(4);
const ship2 = new Ship(4);
game.player1.board.placeShip(ship1, { x: 0, y: 0 }, true);
game.player2.board.placeShip(ship2, { x: 0, y: 1 }, true);
game.player1.attack(game.player2.board, { x: 0, y: 0 });
console.log(game.player2.board);
//# sourceMappingURL=index.js.map