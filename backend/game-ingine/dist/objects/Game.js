import Player from "./Player.js";
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["placing"] = 0] = "placing";
    GameStatus[GameStatus["in_progress"] = 1] = "in_progress";
    GameStatus[GameStatus["over"] = 2] = "over";
})(GameStatus || (GameStatus = {}));
class Game {
    player2;
    player1;
    currentPlayer;
    status;
    constructor(type) {
        this.player1 = new Player(type);
        this.player2 = new Player();
        this.currentPlayer = this.player1;
        this.status = GameStatus.placing;
    }
    switchTurn() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        }
        else {
            this.currentPlayer = this.player1;
        }
    }
    handleAttack(coordinates) {
        if (this.status != GameStatus.in_progress) {
            return;
        }
        const opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        this.currentPlayer.attack(opponent.board, coordinates);
        if (opponent.board.areAllShipsSunk()) {
            return this.status = GameStatus.over;
        }
        this.switchTurn();
    }
}
export default Game;
//# sourceMappingURL=Game.js.map