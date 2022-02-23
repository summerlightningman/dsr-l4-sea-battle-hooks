import {generateArena, generateCoordinatePairs, isEquals} from "../functions";
import {CellType} from "../types/cell";


describe('generate arena works', () => {
    let arena = generateArena(5, 5);

    beforeEach(() => {
        arena = generateArena(5, 5);
    });

    test('created arena with args [5, 5] has shape [5, 5]', () => {
        expect(arena.length).toBe(5);
        arena.forEach(row => expect(row.length).toBe(5));
    });

    test(`every cell has value = CellType.EMPTY (${CellType.EMPTY})`, () => {
        arena.forEach(row => expect(row.every(cell => cell === CellType.EMPTY)).toBe(true));
    });

    test('created arena with args [5, 6] has shape [5, 6]', () => {
        arena = generateArena(5, 6);
        expect(arena.length).toBe(6);
        arena.forEach(row => expect(row.length).toBe(5));
    });

    test('created arena with args [3, 5] has shape [3, 5]', () => {
        arena = generateArena(3, 5);
        expect(arena.length).toBe(5);
        arena.forEach(row => expect(row.length).toBe(3));
    });
});

describe('isEquals works', () => {
    test('non-equal length arrays are not equal', () => {
        const a = [1, 2, 3];
        const b = [1, 2, 3, 4, 5];
        expect(isEquals(a, b)).toBe(false);
        expect(isEquals(b, a)).toBe(false);
    });

    test('two same arrays are equal', () => {
        const a = [1, 2, 3, 4, 5];
        const b = [1, 2, 3, 4, 5];
        expect(isEquals(a, b)).toBe(true);
        expect(isEquals(b, a)).toBe(true);
    });
});

describe('generateCoordinatePairs works', () => {
    test('result is array of numbers', () => {
       const result = generateCoordinatePairs(5, 5);
       expect(result).toBeInstanceOf(Array);
    });

    test('first coordinate pair is [0, 0]', () => {
        const result = generateCoordinatePairs(5, 5)[0];
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(0);
    });

    test('last coordinate pair has values on 1 less than args', () => {
        let result = generateCoordinatePairs(5, 5);
        let [x, y] = result[result.length - 1];
        expect(x).toBe(4);
        expect(y).toBe(4);

        result = generateCoordinatePairs(3, 6);
        [x, y] = result[result.length - 1];
        expect(x).toBe(2);
        expect(y).toBe(5);
    });

    test('func with negative args will return empty arr', () => {
        expect(generateCoordinatePairs(-1, 5).length).toBe(0);
        expect(generateCoordinatePairs(5, -1).length).toBe(0);
    });
});