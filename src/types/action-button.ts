import {GameStage} from "./game-controller";

export interface ActionButtonProps {
    onNextStage: () => void;
    isReadyForNextStage: boolean;
    gameStage: GameStage
}