import {Component} from "react";

import {ConfirmationScreenProps} from "../types/confirmation-screen";

import {PlayerName} from "../types/player";
import {GameStage} from "../types/game-state";

import ActionButton from "./action-button";

import '../styles/confirmation-screen.css';


class ConfirmationScreen extends Component<ConfirmationScreenProps> {
    playerName: PlayerName;
    currStage: GameStage;
    onNextStage: () => void;

    constructor(props: ConfirmationScreenProps) {
        super(props);

        this.playerName = props.gameState.currPlayer;
        this.currStage = props.gameState.currStage;
        this.onNextStage = props.onNextStage;
    }

    render() {
        return <div className="confirmation-screen">
            <p className="confirmation-screen__text">Игрок {this.playerName}, подтвердите передачу хода</p>
            <ActionButton
                onNextStage={this.onNextStage}
                gameStage={this.currStage}
                isReadyForNextStage={true}
            />
        </div>
    }
}

export default ConfirmationScreen