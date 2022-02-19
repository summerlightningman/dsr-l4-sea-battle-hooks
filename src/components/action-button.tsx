import {Component} from "react";
import {ActionButtonProps} from "../types/action-button";
import {GameStage} from "../types/game-controller";

class ActionButton extends Component<ActionButtonProps> {
    render() {
        const {gameStage: stage, isReadyForNextStage} = this.props;

        if (!isReadyForNextStage)
            return <></>

        switch (stage) {
            case GameStage.SHIP_PLACEMENT:
                return <button onClick={this.props.onNextStage}>Подтвердить</button>
            case GameStage.MOVE_CONFIRMATION:
                return <button onClick={this.props.onNextStage}>Начать ход</button>
            case GameStage.MOVE_FINISHED:
                return <button onClick={this.props.onNextStage}>Завершить ход</button>
            case GameStage.GAMEPLAY:
                return <button onClick={this.props.onConfirmAttack}>Аттаковать</button>
            default:
                return <></>
        }
    }
}

export default ActionButton
