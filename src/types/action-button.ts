import {GameStage} from "./common";

export interface ActionButtonProps {
    onNextStage: () => void;
    onConfirmAttack: () => void;
    gameStage: GameStage;
    isReadyForNextStage: boolean;
}