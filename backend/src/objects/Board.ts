import Ship from "./Ship.js";
import Cell from "./Cell.js";

import type { Position, Coordinates } from "../types.js";

class Board {
    grid: Cell[][];
    ships: Map<string, Ship>;
    missed: Coordinates[];

    constructor(size: number){
        this.grid = this.createBoard(size);
        this.ships = new Map();
        this.missed = [];
    }

    private createBoard(size:number = 10): Cell[][]{
        const grid: Cell[][] = [];

        for(let i=0; i < size; i++){
            const row: Cell[] = [];
            for(let j=0; j < size; j++){
                row[j] = new Cell({ x: i, y: j });
            }
            grid[i] = row;
        }
        return grid;
    } 

    private checkBound(position: Position){
        if(position.start.x >= 0 && position.start.y < 10 && position.end.x >= 0 && position.end.y < 10){
            return true;
        }else{
            throw new Error("Out of bounds");
        }
    }

    private isValidCell(position: Position){
        for(let i = position.start.x; i <= position.end.x; i++){
            for(let j = position.start.y; j <= position.end.y; j++){
                const cell = this.grid[i]?.[j];

                if(cell === undefined){
                    throw new Error("Invalid board access");
                }

                if(cell.hasShip === true){
                    throw new Error("Overlapping ship");
                }
            }
        }
        return true;
    }

    placeShip(ship: Ship, position: Position){
        const { start, end } = position;

        if(this.checkBound(position)){
            if(this.isValidCell(position)){
                for(let i = start.x; i <= end.x; i++){
                    for(let j = start.y; j <= end.y; j++){
                        const cell = this.grid[i]?.[j];

                        if(cell === undefined){
                            throw new Error("Invalid board access");
                        }

                        cell.hasShip = true;
                        this.ships.set(`${i},${j}`, ship);
                    }
                };
            }else {
                throw new Error("Invalid ship placement");
            }
        }else {
            throw new Error("Invalid ship placement");
        }
    }

    receiveAttack(coordinates: Coordinates){
        const ship: Ship | undefined = this.ships.get(`${coordinates.x},${coordinates.y}`);

        if(!ship){
            this.missed.push(coordinates);
        }

        ship?.hit(); 
    }        
}

export default Board;