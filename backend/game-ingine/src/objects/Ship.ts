class Ship {
    length: number;
    hitCount: number;
    sunk: boolean;

    constructor(length: number){
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
    }

    hit(){
        this.hitCount++;
    }

    isSunk(){
        if(this.hitCount >= this.length){
            this.sunk = true;
            return true;
        }else {
            return false;
        }
    }
}

export default Ship;