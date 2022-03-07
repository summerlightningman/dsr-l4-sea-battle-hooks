import {Component} from "react";

import {ActionButtonProps} from "../types/action-button";
import GameController from "../classes/game-controller";

class ActionButton extends Component<ActionButtonProps> {
    render() {
        const {isReadyForNextStage, onNextStage, gameStage} = this.props;
        const name = GameController.getActionButtonName(gameStage);

        return <button className="btn" onClick={onNextStage} disabled={!isReadyForNextStage}>
            {name}
        </button>
    }
}

export default ActionButton
