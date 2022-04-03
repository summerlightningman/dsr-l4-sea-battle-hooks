import {FC, useMemo} from "react";

import {ActionButtonProps} from "../types/action-button";
import GameController from "../classes/game-controller";

const ActionButton: FC<ActionButtonProps> = ({isReadyForNextStage, onNextStage, gameStage}) => {
    const name = useMemo(() => GameController.getActionButtonName(gameStage), [gameStage]);

    return <button className="btn" onClick={onNextStage} disabled={!isReadyForNextStage}>
        {name}
    </button>
}

export default ActionButton
