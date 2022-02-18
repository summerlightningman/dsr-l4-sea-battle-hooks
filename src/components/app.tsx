import React, {Component} from 'react'

import {AppProps, AppState} from '../types/app';

import {GameStage, PlayerNum} from '../types/common';
import {AppInitialState} from '../classes/app-initial-state';
import GameState from '../classes/game-state';

import GameInfo from './game-info';
import Board from './board';

import '../styles/app.css';
import ConfirmationScreen from "./confirmation-screen";
import ActionButton from "./action-button";
import {CellType} from "../types/cell";


class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = new AppInitialState();

        this.setInitialState = this.setInitialState.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.goToNextState = this.goToNextState.bind(this);
        this.attack = this.attack.bind(this);
        this.confirmAttack = this.confirmAttack.bind(this);
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

            this.setState(state => ({
                gameState: state.gameState.toggleTarget(x, y)
            }));
        }
    }

    goToNextState() {
        const {players, gameState} = this.state;
        switch (gameState.stage) {
            case GameStage.SHIP_PLACEMENT:
                if (!players[PlayerNum.ONE].shipsRemainingForBuild() && !players[PlayerNum.TWO].shipsRemainingForBuild())
                    return this.setState({
                        gameState: new GameState(players[PlayerNum.ONE], GameStage.MOVE_CONFIRMATION)
                    });

                return this.setState({
                    gameState: new GameState(players[PlayerNum.TWO], GameStage.SHIP_PLACEMENT)
                });

            case GameStage.MOVE_CONFIRMATION:
                return this.setState({
                    gameState: new GameState(gameState.player, GameStage.GAMEPLAY)
                })

            case GameStage.GAMEPLAY:
                const enemy = players[gameState.getEnemyPlayerName()];
                const [x, y] = gameState.attackedCell;
                if (enemy.cells[x][y] === CellType.KILLED)
                    return this.setState({
                        gameState: new GameState(gameState.player, GameStage.GAMEPLAY)
                    })

                return this.setState({
                    gameState: new GameState(enemy, GameStage.MOVE_CONFIRMATION)
                })
        }
    }

    confirmAttack() {
        const {gameState, players} = this.state;
        const [x, y] = gameState.attackedCell;
        const enemyName = gameState.getEnemyPlayerName()
        const updatedPlayer = players[enemyName].attack(x, y);

        this.setState(state => ({
            players: {...state.players, [enemyName]: updatedPlayer}
        }));
        return this.goToNextState()
    }

    render() {
        const actionButton = <ActionButton
            onNextStage={this.goToNextState}
            onConfirmAttack={this.confirmAttack}
            gameStage={this.state.gameState.stage}
            isReadyForNextStage={this.state.gameState.isReadyForNextStage()}
        />;
        const onCellClick = this.state.gameState.stage === GameStage.SHIP_PLACEMENT
            ? this.placeShip
            : this.attack;

        const confirmationScreen = (
            <ConfirmationScreen playerName={this.state.gameState.player.name}>
                {actionButton}
            </ConfirmationScreen>
        );

        const gameBoards = (
            <div className="game-boards">
                {
                    Object.values(this.state.players).map(
                        (player) =>
                            <Board
                                player={player}
                                key={player.name}
                                currState={this.state.gameState}
                                onCellClick={onCellClick(player.name)}
                            />
                    )
                }
            </div>
        );

        return (
            <main>
                <GameInfo
                    currState={this.state.gameState}
                    resetAll={this.setInitialState}
                >
                    {actionButton}
                </GameInfo>

                {
                    this.state.gameState.stage === GameStage.MOVE_CONFIRMATION
                        ? confirmationScreen
                        : gameBoards
                }
            </main>
        )
    }
}

export default App