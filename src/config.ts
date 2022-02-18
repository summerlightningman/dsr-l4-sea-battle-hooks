import {BoardHeight, BoardWidth, CellSize, ShipCount} from "./types/common";
import {CellCoords} from "./types/game-state";

export const gameTitle = 'Игра "Морской бой"';
export const boardWidth: BoardWidth = 5;
export const boardHeight: BoardHeight = 5;
export const shipCount: ShipCount = 1;
export const cellSize: CellSize = '100px';
export const emptyTargetCell: CellCoords = [-1, -1];