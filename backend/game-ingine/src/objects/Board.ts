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
                row[j] = new Cell(null);
            }
            grid[i] = row; 
        }
        return grid;
    }

    private checkBound(ship: Ship, coordinates: Coordinates, horizontal: boolean){
        const { x, y } = coordinates;
        if(horizontal){
            if(x >= 0 && x < 9 && y >= 0 && y + ship.length - 1 < 9){
                return true;
            }else {
                return false;
            }
        }else {
            if(x >= 0 && x + ship.length - 1 < 9 && y >= 0 && y < 9){
                return true;
            }else {
                return false;
            }
        }
    }

    private isOverlap(ship: Ship, coordinates: Coordinates, horizontal: boolean){
        const { x, y } = coordinates;
        for(let i=0; i < ship.length; i++){
            let row = horizontal ? x : x + i;
            let col = horizontal ? y + i : y;
            
            const cell = this.grid[row]?.[col];
            if(cell === undefined){
                throw new Error("Invalid board access");
            }

            if(cell.value instanceof Ship){
                return true;
            }
        }
        return false;
    }

    isValidShipPlacement(ship: Ship, coordinates: Coordinates, horizontal: boolean){
        if(this.checkBound(ship, coordinates, horizontal)){
            if(!this.isOverlap(ship, coordinates, horizontal)){
                const { x, y } = coordinates;
                for(let i=0; i < ship.length; i++){
                    let row = horizontal ? x : x + i;
                    let col = horizontal ? y + i : y;

                    let cell = this.grid[row]?.[col];
                    if(cell === undefined){
                        console.log("Invalid board access");
                        return false;
                    }

                    cell.value = ship;
                }
                this.ships.push(ship);
                return true;
            }else {
                console.log("Overlapping");
                return false;
            }
        }else {
            console.log("Out of bounds");
            return false;
        }
    }
    

    receiveAttack(coordinates: Coordinates){
        const { x, y } = coordinates;
        const cell = this.grid[x]?.[y];

        if(cell === undefined){
            return "Invalid board access";
        }
        
        if(cell.isAttacked){
            return "Tap on unattacked coordinate";
        }

        if(cell.value instanceof Ship){
            cell.value.hit();
            cell.isAttacked = true;
            return 'hit';
        }else{
            cell.isAttacked = true;
            this.missed.add(`${x},${y}`);
            return 'miss';
        }
    }

    areAllShipsSunk(){
        for(let ship of this.ships){
            if(ship.sunk === false){
                return false;
            }
        }
        return true;
    }
}

export default Board;