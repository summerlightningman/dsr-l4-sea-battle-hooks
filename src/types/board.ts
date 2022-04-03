import {PlayerName} from "./player";
import {Arena} from "./common";
import {GameStage} from "./game-state";
import {CellCoords} from "./cell";

export interface BoardProps {
    playerName: PlayerName,
    arena: Arena,
    currStage: GameStage,
    currPlayer: PlayerName,
    targetCell: CellCoords,
    onNextStage: () => void,
    onCellClick: (coords: CellCoords) => () => void
}


export type BoardWidth = number;
export type BoardHeight = number;

