import Board from "./Board.js";
import Ship from "./Ship.js";

import type { Coordinates } from "../types.js";

class Player {
    type: string; 
    board: Board;
    prevAttack: Set<string>;
    fleet: Set<Ship>;

    constructor(type: string = "computer"){
        this.type = type;
        this.board = new Board(10);
        this.prevAttack = new Set<string>();
        this.fleet = this.generateFleet();
    }

    generateFleet(){
        let fleet: Set<Ship> = new Set();
        for(let n of [5, 4, 3, 3, 2]){
            let ship = new Ship(n);
            fleet.add(ship);
        }
        return fleet;
    }

    attack(board: Board, coordinates: Coordinates){
        if(board === this.board){
            return "Can't attack your own board";
        }
        const result = board.receiveAttack(coordinates);
        return result;
    }

    generateRandomAttack() :Coordinates{
        let x: number, y: number, key: string;

        do{
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            key = `${x},${y}`;
        }while(this.prevAttack.has(key));

        this.prevAttack.add(key);
        return { x, y };
    }

    areAllShipsHaveBeenPlaced(){
        if(this.fleet.size === 0){
            return true;
        }
        else {
            return false;
        }
    }

    placeShip(ship: Ship, coordinates: Coordinates, horizontal: boolean = true){
        if(this.board.isValidShipPlacement(ship, coordinates, horizontal)){
            this.fleet.delete(ship);
            return "valid ship placement";
        }else {
            return "invalid ship placement";
        }
    }
}

export default Player;
