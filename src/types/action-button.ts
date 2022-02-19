import {GameStage} from "./game-controller";

export interface ActionButtonProps {
    onNextStage: () => void;
    onConfirmAttack: () => void;
    gameStage: GameStage;
    isReadyForNextStage: boolean;
}