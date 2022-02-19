import {ShipCount} from "./types/common";
import {CellCoords} from "./types/game-controller";
import {CellSize} from "./types/cell";
import {BoardHeight, BoardWidth} from "./types/board";

export const gameTitle = 'Игра "Морской бой"';
export const boardWidth: BoardWidth = 5;
export const boardHeight: BoardHeight = 5;
export const shipCount: ShipCount = 8;
export const cellSize: CellSize = '100px';
export const emptyTargetCell: CellCoords = [-1, -1];