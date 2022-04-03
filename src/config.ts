import {ShipCount} from "./types/common";
import {CellSize, CellCoords, CellType} from "./types/cell";
import {BoardHeight, BoardWidth} from "./types/board";

export const gameTitle = 'Игра "Морской бой"';
export const boardWidth: BoardWidth = 5;
export const boardHeight: BoardHeight = 5;
export const shipCount: ShipCount = 3; // Значение выставлено для тестирования. Для контрольной проверки поставить нужное (8)
export const cellSize: CellSize = '50px';
export const emptyTargetCell: CellCoords = [-1, -1];

export const cellDescriptions: [CellType, string][] = [
    [CellType.EMPTY, 'Пусто'],
    [CellType.HAS_SHIP, 'Корабль'],
    [CellType.ATTACKED, 'Цель атаки'],
    [CellType.MISSED, 'Промах'],
    [CellType.KILLED, 'Убитый корабль']
]