import React, {Component} from 'react'

import {AppProps, AppState} from '../types/app';

import {GameStage, PlayerNum} from "../types/common";
import {AppInitialState} from "../classes/app-initial-state";
import GameState from "../classes/game-state";

import GameInfo from './game-info';
import Board from './board';

import '../styles/app.css';

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = new AppInitialState();

        this.setInitialState = this.setInitialState.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.goToNextState = this.goToNextState.bind(this);
        this.attack = this.attack.bind(this);
    }

    setInitialState() {
        this.setState(new AppInitialState());
    }

    placeShip(playerNum: PlayerNum) {
        return (x: number, y: number) => () => {
            if (this.state.gameState.player.name !== playerNum)
                return

            const player = this.state.players[playerNum];

            this.setState({
                players: {...this.state.players, [playerNum]: player.placeShip(x, y)}
            });
        };
    }

    attack(playerNum: PlayerNum) {
        return (x: number, y: number) => () => {
            if (this.state.gameState.player.name === playerNum)
                return

            const player = this.state.players[playerNum];

            this.setState({
                players: {...this.state.players, [playerNum]: player.attack(x, y)}
            })
        }
    }

    goToNextState() {
        const {players, gameState} = this.state;
        if (players[PlayerNum.ONE].shipsRemainingForBuild() === 0 && gameState.stage === GameStage.SHIP_PLACEMENT)
            this.setState({
                gameState: new GameState(players[PlayerNum.TWO], GameStage.SHIP_PLACEMENT)
            });

        if (players[PlayerNum.ONE].shipsRemainingForBuild() === 0
            && players[PlayerNum.TWO].shipsRemainingForBuild() === 0
            && gameState.stage === GameStage.SHIP_PLACEMENT)
            this.setState({
                gameState: new GameState(players[PlayerNum.ONE], GameStage.GAMEPLAY)
            })

    }

    render() {
        const handleCellClick = this.state.gameState.stage === GameStage.SHIP_PLACEMENT
            ? this.placeShip
            : this.attack

        return <main>
            <GameInfo
                currState={this.state.gameState}
                resetAll={this.setInitialState}
                goToNextState={this.goToNextState}
            />
            <div className="game-boards">
                {Object.values(this.state.players).map(
                    (player) =>
                        <Board
                            player={player}
                            key={player.name}
                            currState={this.state.gameState}
                            onCellClick={handleCellClick(player.name)}
                        />
                )
                }
            </div>
        </main>
    }
}

export default App