import Player from "../classes/player";
import GameController from "../classes/game-controller";

export interface BoardProps {
    player: Player,
    currState: GameController
    onCellClick: (x: number, y: number) => () => void
}

export type BoardWidth = number;
export type BoardHeight = number;

