import {Component} from "react";

import {ConfirmationScreenProps, ConfirmationScreenState} from "../types/confirmation-screen";

import {PlayerNum} from "../types/common";

import '../styles/confirmation-screen.css';


class ConfirmationScreen extends Component<ConfirmationScreenProps, ConfirmationScreenState> {
    playerName: PlayerNum;

    constructor(props: ConfirmationScreenProps) {
        super(props);

        this.playerName = props.playerName;

    }

    render() {
        return <div className="confirmation-screen">
            <h1>Игрок {this.playerName}, подтвердите передачу хода</h1>
        </div>
    }
}

export default ConfirmationScreen