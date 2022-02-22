import React, {Component} from 'react'

import Header from './header';
import Board from './board';
import Footer from "./footer";
import ConfirmationScreen from "./confirmation-screen";
import ActionButton from "./action-button";

import {AppProps, AppState} from '../types/app';
import {PlayerNum} from '../types/player';
import {GameStage} from "../types/game-controller";

import AppInitialState from '../classes/app-initial-state';

import '../styles/app.css';


class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = new AppInitialState();

        this.setInitialState = this.setInitialState.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.goToNextState = this.goToNextState.bind(this);
        this.setTargetCell = this.setTargetCell.bind(this);

    }

    setInitialState() {
        this.setState(new AppInitialState());
    }

    placeShip(playerNum: PlayerNum) {
        return (x: number, y: number) =>
            () => this.setState(this.state.gameController.placeShip(playerNum, x, y));
    }

    setTargetCell(playerNum: PlayerNum) {
        return (x: number, y: number) =>
            () => this.setState(this.state.gameController.markCell(playerNum, x, y));
    }

    goToNextState() {
        return this.setState(this.state.gameController.goToNextStage);
    }


    render() {
        const actionButton = <ActionButton
            onNextStage={this.goToNextState}
            gameStage={this.state.gameController.stage}
            isReadyForNextStage={this.state.gameController.isReadyForNextStage()}
        />;
        const onCellClick = this.state.gameController.stage === GameStage.SHIP_PLACEMENT
            ? this.placeShip
            : this.setTargetCell;

        const confirmationScreen = <ConfirmationScreen playerName={this.state.gameController.player.name}/>;

        const gameBoards = (
            <div className="game-boards">
                {
                    Object.values(this.state.players).map(
                        player =>
                            <Board
                                player={player}
                                key={player.name}
                                gameController={this.state.gameController}
                                onCellClick={onCellClick(player.name)}
                            />
                    )
                }
            </div>
        );

        return (
            <div className="content">
                <Header
                    resetAll={this.setInitialState}
                />
                <main className="main">
                    {
                        this.state.gameController.stage === GameStage.MOVE_CONFIRMATION
                            ? confirmationScreen
                            : gameBoards
                    }
                </main>
                <div className="controls">
                    {actionButton}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default App