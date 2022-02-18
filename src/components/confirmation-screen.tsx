import {Component} from "react";
import {ConfirmationScreenProps, ConfirmationScreenState} from "../types/confirmation-screen";

import '../styles/confirmation-screen.css';

class ConfirmationScreen extends Component<ConfirmationScreenProps, ConfirmationScreenState> {
    render() {
        return <div className="confirmation-screen">
            <h1>{this.props.playerName}</h1>
            <button>Начать ход</button>
        </div>
    }
}

export default ConfirmationScreen