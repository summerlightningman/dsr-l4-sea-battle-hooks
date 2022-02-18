import {Component} from "react";
import {ConfirmationScreenProps, ConfirmationScreenState} from "../types/confirmation-screen";

import {PlayerNum} from "../types/common";

import '../styles/confirmation-screen.css';

class ConfirmationScreen extends Component<ConfirmationScreenProps, ConfirmationScreenState> {
    playerName: PlayerNum;
    onClick: () => void;

    constructor(props: ConfirmationScreenProps) {
        super(props);

        this.playerName = props.playerName;
        this.onClick = props.onClick;
    }

    render() {
        return <div className="confirmation-screen">
            <h1>{this.props.playerName}</h1>
            <button onClick={this.props.onClick}>Начать ход</button>
        </div>
    }
}

export default ConfirmationScreen