import {Component} from "react";

import {ActionButtonProps} from "../types/action-button";
import {GameStage} from "../types/game-controller";

class ActionButton extends Component<ActionButtonProps> {
    constructor(props: ActionButtonProps) {
        super(props);

        this.getBtnNameByGameState = this.getBtnNameByGameState.bind(this);
    }

    getBtnNameByGameState() {
        switch (this.props.gameStage) {
            case GameStage.SHIP_PLACEMENT:
                return 'Подтвердить'
            case GameStage.MOVE_CONFIRMATION:
                return 'Начать ход'
            case GameStage.MOVE_FINISHED:
                return 'Завершить ход'
            case GameStage.GAMEPLAY:
                return 'Атаковать'
            default:
                return 'Подтвердить'
        }
    }


    render() {
        const {isReadyForNextStage} = this.props;
        const name = this.getBtnNameByGameState();

        return <button onClick={this.props.onNextStage} disabled={!isReadyForNextStage}>{name}</button>
    }
}

export default ActionButton
