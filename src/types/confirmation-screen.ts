import {GameStage} from "./game-state";
import {PlayerName} from "./player";

export interface ConfirmationScreenProps {
    currStage: GameStage,
    currPlayer: PlayerName,
    onNextStage: () => void
}