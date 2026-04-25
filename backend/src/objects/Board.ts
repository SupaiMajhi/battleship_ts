import Ship from "./Ship.js";
import Cell from "./Cell.js";

import type { Position } from "../types.js";

interface Coordinate {
    start: { x: number, y: number },
    end: { x: number, y: number },
}

class Board {
    grid: Cell[][];
    ships: Ship[];
    missed: number[];

    constructor(size: number){
        this.grid = this.createBoard(size);
        this.ships = [];
        this.missed = [];
    }

    private createBoard(size:number = 10): Cell[][]{
        const grid: Cell[][] = [];

        for(let i=0; i < size; i++){
            const row: Cell[] = [];
            for(let j=0; j < size; j++){
                row[i] = new Cell({ x: i, y: j });
            }
            grid[i] = row;
        }
        return grid;
    } 

    private isValidCell(x: number, y: number){
        if(x >= 0 && x < 10 && y >= 0 && y < 10){
            return true;
        }else {
            return false;
        }
    }

    placeShip(ship: Ship, position: Position){
        const { start, end } = position;

        if(!this.isValidCell(start.x, start.y) || !this.isValidCell(end.x, end.y)){
            throw new Error("Out of bounds");
        }

        for(let i = start.x; i <= end.x; i++){
            for(let j = start.y; j <= end.y; j++){
                const cell = this.grid[i]?.[j];

                if(cell === undefined){
                    throw new Error("Invalid board access");
                }

                if(cell.hasShip === true){
                    throw new Error("Overlapping ships");
                }
            }
        }

        this.ships.push(ship);
    }
}

export default Board;