import Player from "./Player.js";

import type { Coordinates } from "../types.js";


enum GameStatus {
    placing = "PLACING",
    in_progress = "IN_PROGRESS",
    over = "OVER"
}

class Game {
    player1: Player;
    player2: Player;
    currentPlayer: Player;
    status: GameStatus;
    winner: Player | null = null;
    
    constructor(player1: Player, player2: Player){
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
        this.status = GameStatus.placing;
    }

    init_game(){
        if(this.player1.areAllShipsHaveBeenPlaced() && this.player2.areAllShipsHaveBeenPlaced()){
            if(this.status === GameStatus.placing){
                this.status = GameStatus.in_progress;
                return "game started";
            }else {
                "place all your ships first";
            }
        }else {
            return "place all your ships first";
        }
    }

    private switchTurn(){
        if(this.currentPlayer === this.player1){
            this.currentPlayer = this.player2;
        }else {
            this.currentPlayer = this.player1;
        }
    }

    private getOpponent() :Player{
        return this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    playTurn(coordinates: Coordinates) :string{
        if(this.status !== GameStatus.in_progress){
            return "Game is not in progress";
        }
        const opponent: Player = this.getOpponent(); 
        const result = this.currentPlayer.attack(opponent.board, coordinates);
        if(result === "hit"){
            if(opponent.board.areAllShipsSunk()){
                this.winner = this.currentPlayer;
                this.status = GameStatus.over;
                return "game over";
            }
        }
        this.switchTurn();
        return result;
    }
}

export default Game;