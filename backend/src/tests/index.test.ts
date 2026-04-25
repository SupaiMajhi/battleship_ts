import Ship from "../objects/Ship.js";
import Board from "../objects/Board.js";

describe.skip("Ship class test", () => {
    const ship = new Ship(5);
    test("length should be equal to 5", () => {
        expect(ship.length).toBe(5);
    });

    test("default ship hitCount is equal to 0", () => {
        expect(ship.hitCount).toBe(0);
    });

    test("should increase hit count", () => {
        ship.hit();
        expect(ship.hitCount).toBe(1);
    });

    test("hitCount should be equal to 3", () => {
        ship.hit();
        ship.hit();
        expect(ship.hitCount).toBe(3);
    });

    test("ship is not sunk yet", () => {
        expect(ship.sunk).toBeFalsy();
    });

    test("ship is not sunk yet", () => {
        expect(ship.isSunk()).toBeFalsy();
    });

    test("ship is sunk", () => {
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy();
    });
});

describe("Board tests", () => {
    const ship = new Ship(2);
    const ship2 = new Ship(4);
    const board = new Board(10);

    test.skip("throw an error of out of bounds", () => {
        expect(() => {
            board.placeShip(ship, { start: { x: 0, y: 9 }, end: { x: 0, y: 10 }})
        }).toThrow("Out of bound");
    });

    test.skip("throw an error for overlapping", () => {
        board.placeShip(ship, { start: { x: 0, y: 0 }, end: { x: 0, y: 1 }});

        expect(() => {
            board.placeShip(ship2, { start: { x: 0, y: 1 }, end: { x: 0, y: 4 }})
        }).toThrow("Overlapping ship");
    });

    test.skip("successfully place a ship", () => {
        board.placeShip(ship2, { start: { x: 0, y: 3 }, end: { x: 0, y: 6 }})
        expect(board.ships.size).toBe(6);
    });

    test("successfully hit the ship", () => {
        board.placeShip(ship, { start: { x: 0, y: 0 }, end: { x: 0, y: 1 }});
        board.placeShip(ship2, { start: { x: 1, y: 0 }, end: { x: 1, y: 3 }});

        board.receiveAttack({ x: 0, y: 0 });

        expect(ship.hitCount).toBe(1);
        expect(ship2.hitCount).toBe(0);
    });

    test("miss a hit", () => {
        board.receiveAttack({ x: 0, y: 2});
        expect(board.missed.length).toBe(1);

        board.receiveAttack({ x: 0, y: 1 });
        expect(board.missed.length).toBe(1);
    });

    test("successfully hit ship2", () => {
        board.receiveAttack({ x: 1, y: 0 });
        expect(ship.hitCount).toBe(2);
        expect(ship2.hitCount).toBe(1);
    });
});