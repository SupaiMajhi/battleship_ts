import Board from "./Board.js";

import type { Coordinates } from "../types.js"; 

enum PlayerType {
    "computer",
    "human"
}

class Player {
    type: PlayerType;
    board: Board;
    prevAttack: Set<string>;

    constructor(type: PlayerType = PlayerType.computer){
        this.type = type;
        this.board = new Board(10);
        this.prevAttack = new Set<string>();
    }

    attack(board: Board, coordinates: Coordinates){
        board.receiveAttack(coordinates);
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
}

export default Player;
