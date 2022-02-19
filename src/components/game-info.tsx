import {Component} from 'react';

import {GameInfoProps} from "../types/game-info";
import {GameStage} from "../types/game-controller";
import gameState from "../classes/game-controller";

import {gameTitle} from "../config";

import '../styles/game-info.css';

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