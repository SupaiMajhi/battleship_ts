import Board from "./Board.js";
import Ship from "./Ship.js";
class Player {
    type;
    board;
    prevAttack;
    fleet;
    constructor(type = "computer") {
        this.type = type;
        this.board = new Board(10);
        this.prevAttack = new Set();
        this.fleet = this.generateFleet();
    }
    generateFleet() {
        let fleet = [];
        for (let n of [5, 4, 3, 3, 2]) {
            let ship = new Ship(n);
            fleet.push(ship);
        }
        return fleet;
    }
    attack(board, coordinates) {
        board.receiveAttack(coordinates);
    }
    generateRandomAttack() {
        let x, y, key;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            key = `${x},${y}`;
        } while (this.prevAttack.has(key));
        this.prevAttack.add(key);
        return { x, y };
    }
}
export default Player;
//# sourceMappingURL=Player.js.map