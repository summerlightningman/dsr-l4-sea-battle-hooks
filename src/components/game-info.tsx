import {Component} from 'react';

import {GameInfoProps} from "../types/game-info";
import '../styles/game-info.css';
import {gameTitle} from "../config";
import gameState from "../classes/game-state";

class GameInfo extends Component<GameInfoProps> {
    gameState: gameState;

    constructor(props: GameInfoProps) {
        super(props);

        this.gameState = this.props.currState;
    }

    render() {
        return <div className="game-state">
            <h1 className="game-state__header">{gameTitle}</h1>
            <div className="control-panel">
                <span className="control-panel__text control-panel__text_curr-stage">
                    Стадия {this.props.currState.toString()}
                </span>
                <button className="control-panel__btn" onClick={this.props.resetAll}>Начать сначала</button>
            </div>
        </div>
    }
}

export default GameInfo