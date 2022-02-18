import Player from "../classes/player";
import GameState from "../classes/game-state";

export interface BoardProps {
    player: Player,
    currState: GameState
    onCellClick: (x: number, y: number) => void
}

