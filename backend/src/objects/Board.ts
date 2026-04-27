import Cell from "./Cell.js";
import Ship from "./Ship.js";

import type { Coordinates } from "../types.js";

class Board {
    grid: Cell[][];
    ships: Ship[];
    missed: Set<string>;

    constructor(size:number = 10){
        this.grid = this.createBoard(size);
        this.ships = [];
        this.missed = new Set();
    }


    createBoard(size: number): Cell[][]{
        const grid: Cell[][] = [];
        for(let i=0; i < size; i++){
            const row: Cell[] = []; 
            for(let j=0; j < size; j++){
                row[j] = new Cell(null, { x: i, y: j });
            }
            grid[i] = row; 
        }
        return grid;
    }

    placeShip(ship: Ship, coordinates: Coordinates, horizontal = true){
        const { x, y } = coordinates;
        for(let i=0; i < ship.length; i++){
            let row = horizontal ? x : x + i;
            let col = horizontal ? y + i : y;

            let cell = this.grid[row]?.[col];
            if(cell === undefined){
                throw new Error("Invalid board access");
            }

            cell.value = ship;
        }
        this.ships.push(ship);
    }
    

    receiveAttack(coordinates: Coordinates){
        const { x, y } = coordinates;
        const cell = this.grid[x]?.[y];

        if(cell === undefined){
            throw new Error("Invalid board access");
        }

        if(cell.value instanceof Ship){
            cell.value.hit();
            cell.state = 'hit';
            return 'hit';
        }else{
            cell.state = 'miss';
            this.missed.add(`${x},${y}`);
            return 'miss';
        }
    }

    areAllShipsSunck(){
        for(let ship of this.ships){
            if(ship.sunk === false){
                return false;
            }
        }
        return true;
    }
}

export default Board;