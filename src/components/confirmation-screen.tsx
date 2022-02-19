import {Component} from "react";

import {ConfirmationScreenProps} from "../types/confirmation-screen";

import {PlayerNum} from "../types/player";

import '../styles/confirmation-screen.css';


class ConfirmationScreen extends Component<ConfirmationScreenProps> {
    playerName: PlayerNum;

    constructor(props: ConfirmationScreenProps) {
        super(props);

        this.playerName = props.playerName;
    }

    render() {
        return <div className="confirmation-screen">
            <p className="confirmation-screen__text">Игрок {this.playerName}, подтвердите передачу хода</p>
        </div>
    }
}

export default ConfirmationScreen