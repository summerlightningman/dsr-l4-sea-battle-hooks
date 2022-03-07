import {ShipCount} from "./types/common";
import {CellSize, CellCoords} from "./types/cell";
import {BoardHeight, BoardWidth} from "./types/board";

export const gameTitle = 'Игра "Морской бой"';
export const boardWidth: BoardWidth = 5;
export const boardHeight: BoardHeight = 5;
export const shipCount: ShipCount = 3; // Значение выставлено для тестирования. Для контрольной проверки поставить нужное (8)
export const cellSize: CellSize = '50px';
export const emptyTargetCell: CellCoords = [-1, -1];