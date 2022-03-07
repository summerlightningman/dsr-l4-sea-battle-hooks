import {GameStage} from "./game-state";

export interface ActionButtonProps {
    onNextStage: () => void;
    isReadyForNextStage: boolean;
    gameStage: GameStage
}