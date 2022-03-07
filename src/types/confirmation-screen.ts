import GameState from "../classes/game-state";

export interface ConfirmationScreenProps {
    gameState: GameState,
    onNextStage: () => void
}