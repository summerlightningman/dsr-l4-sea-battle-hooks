import Player from "../classes/player";
import GameController from "../classes/game-controller";
import {CellCoords} from "./game-controller";

export interface BoardProps {
    player: Player,
    gameController: GameController
    onCellClick: (coords: CellCoords) => () => void
}

export type BoardWidth = number;
export type BoardHeight = number;

