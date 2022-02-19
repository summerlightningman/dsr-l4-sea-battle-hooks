import {GameStage} from "./game-controller";

export interface ActionButtonProps {
    onNextStage: () => void;
    gameStage: GameStage;
    isReadyForNextStage: boolean;
}