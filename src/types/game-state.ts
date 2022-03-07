import {PlayerName} from "./player";
import {CellCoords} from "./cell";

export interface GameState {
    currStage: GameStage;
    currPlayer: PlayerName;
    targetCell: CellCoords;
}

export const enum GameStage {
    SHIP_PLACEMENT,
    MOVE_CONFIRMATION,
    GAMEPLAY,
    MOVE_FINISHED,
    ENDGAME
}