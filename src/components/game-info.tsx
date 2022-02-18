import {Component} from 'react';

import {GameInfoProps} from "../types/game-info";
import '../styles/game-info.css';
import {gameTitle} from "../config";
import gameState from "../classes/game-state";
import {GameStage} from "../types/common";

class GameInfo extends Component<GameInfoProps> {
    gameState: gameState;

    constructor(props: GameInfoProps) {
        super(props);

        this.gameState = this.props.currState;
    }

    render() {
        const isConfirmBtnAvailable = this.gameState.player.shipsRemainingForBuild() === 0
            && this.gameState.stage === GameStage.SHIP_PLACEMENT;

        return <div className="game-state">
            <h1 className="game-state__header">{gameTitle}</h1>
            <div className="control-panel">
                <span className="control-panel__text control-panel__text_curr-stage">
                    Стадия {this.props.currState.toString()}
                    {isConfirmBtnAvailable && <button onClick={this.props.goToNextState}>Подтвердить</button>}
                </span>
                <button className="control-panel__btn" onClick={this.props.resetAll}>Начать сначала</button>
            </div>
        </div>
    }
}

export default GameInfo