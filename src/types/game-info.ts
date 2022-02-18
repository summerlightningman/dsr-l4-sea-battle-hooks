import GameState from "../classes/game-state";

export interface GameInfoProps {
    currState: GameState,
    resetAll: () => void,
}