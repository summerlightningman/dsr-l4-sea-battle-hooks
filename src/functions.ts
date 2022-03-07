import {CellType} from "./types/cell";
import {Arena} from "./types/common";
import {BoardHeight, BoardWidth} from "./types/board";
import {CellCoords} from "./types/cell";

export const generateCoordinatePairs = (left: number, right: number): CellCoords[] => {
    const arr: CellCoords[] = [];
    for (let i = 0; i < left; i++)
        for (let j = 0; j < right; j++)
            arr.push([i, j]);

    return arr
}

export const generateArena = (width: BoardWidth, height: BoardHeight): Arena =>
    Array(height).fill(null).map(_ => Array(width).fill(null).map(_ => CellType.EMPTY));

export const areEqual = <A>(left: A[], right: A[]): boolean =>
    left.length === right.length && left.map((el, idx) => el === right[idx]).every(_ => _);
