import GameController from "../classes/game-controller";

export interface GameInfoProps {
    currState: GameController,
    resetAll: () => void,
}
