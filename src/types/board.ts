import {PlayerName} from "./player";
import {Arena} from "./common";
import {GameState} from "./game-state";
import {CellCoords} from "./cell";

export interface BoardProps {
    playerName: PlayerName,
    arena: Arena,
    gameState: GameState,
    onNextStage: () => void,
    onCellClick: (coords: CellCoords) => () => void
}


export type BoardWidth = number;
export type BoardHeight = number;

