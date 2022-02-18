import {Component} from 'react';

import {gameTitle} from "../config";
import {GameInfoProps} from "../types/game-info";
import gameState from "../classes/game-state";

import '../styles/game-info.css';
import {GameStage} from "../types/common";

class GameInfo extends Component<GameInfoProps> {
    currState: gameState;

    constructor(props: GameInfoProps) {
        super(props);

        this.currState = this.props.currState;
    }

    render() {
        const isConfirmation = this.props.currState.stage === GameStage.MOVE_CONFIRMATION;

        return <div className="game-state">
            <h1 className="game-state__header">{gameTitle}</h1>
            <div className="control-panel">
                {!isConfirmation && this.props.children}
                <button className="control-panel__btn" onClick={this.props.resetAll}>Начать сначала</button>
            </div>

        </div>
    }
}

export default GameInfo