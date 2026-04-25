import Ship from "../src/objects/Ship";

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