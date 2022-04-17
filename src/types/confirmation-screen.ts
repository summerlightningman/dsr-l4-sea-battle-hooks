import {GameState} from "./game-state";

export interface ConfirmationScreenProps {
    gameState: GameState,
    onNextStage: () => void
}