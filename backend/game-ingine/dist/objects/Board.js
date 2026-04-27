import Cell from "./Cell.js";
import Ship from "./Ship.js";
class Board {
    grid;
    ships;
    missed;
    constructor(size = 10) {
        this.grid = this.createBoard(size);
        this.ships = [];
        this.missed = new Set();
    }
    createBoard(size) {
        const grid = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row[j] = new Cell(null, { x: i, y: j });
            }
            grid[i] = row;
        }
        return grid;
    }
    checkBound(ship, coordinates, horizontal) {
        const { x, y } = coordinates;
        if (horizontal) {
            if (x >= 0 && x < 9 && y >= 0 && y + ship.length - 1 < 9) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (x >= 0 && x + ship.length - 1 < 9 && y >= 0 && y < 9) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    isOverlap(ship, coordinates, horizontal) {
        const { x, y } = coordinates;
        for (let i = 0; i < ship.length; i++) {
            let row = horizontal ? x : x + i;
            let col = horizontal ? y + i : y;
            const cell = this.grid[row]?.[col];
            if (cell === undefined) {
                throw new Error("Invalid board access");
            }
            if (cell.value instanceof Ship) {
                return true;
            }
        }
        return false;
    }
    placeShip(ship, coordinates, horizontal = true) {
        if (this.checkBound(ship, coordinates, horizontal)) {
            if (!this.isOverlap(ship, coordinates, horizontal)) {
                const { x, y } = coordinates;
                for (let i = 0; i < ship.length; i++) {
                    let row = horizontal ? x : x + i;
                    let col = horizontal ? y + i : y;
                    let cell = this.grid[row]?.[col];
                    if (cell === undefined) {
                        throw new Error("Invalid board access");
                    }
                    cell.value = ship;
                }
                this.ships.push(ship);
            }
            else {
                throw new Error("Overlapping");
            }
        }
        else {
            throw new Error("Out of bounds");
        }
    }
    receiveAttack(coordinates) {
        const { x, y } = coordinates;
        const cell = this.grid[x]?.[y];
        if (cell === undefined) {
            throw new Error("Invalid board access");
        }
        if (cell.isHit) {
            throw new Error("Tap on unattacked coordinate");
        }
        if (cell.value instanceof Ship) {
            cell.value.hit();
            cell.isHit = true;
            return 'hit';
        }
        else {
            cell.isHit = true;
            this.missed.add(`${x},${y}`);
            return 'miss';
        }
    }
    areAllShipsSunk() {
        for (let ship of this.ships) {
            if (ship.sunk === false) {
                return false;
            }
        }
        return true;
    }
}
export default Board;
//# sourceMappingURL=Board.js.map