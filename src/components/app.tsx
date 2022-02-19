import React, {Component} from 'react'

import {AppProps, AppState} from '../types/app';

import {PlayerNum} from '../types/common';
import {AppInitialState} from '../classes/app-initial-state';
import GameController from '../classes/game-controller';

import GameInfo from './game-info';
import Board from './board';


import ConfirmationScreen from "./confirmation-screen";
import ActionButton from "./action-button";
import {CellType} from "../types/cell";
import {GameStage} from "../types/game-controller";
import Player from "../classes/player";

import '../styles/app.css';


class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = new AppInitialState();

        this.setInitialState = this.setInitialState.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.goToNextState = this.goToNextState.bind(this);
        this.setTargetCell = this.setTargetCell.bind(this);
        this.confirmAttack = this.confirmAttack.bind(this);
    }

    setInitialState() {
        this.setState(new AppInitialState());
    }

    placeShip(playerNum: PlayerNum) {
        return (x: number, y: number) => () => {
            if (this.state.gameController.player.name !== playerNum)
                return

            const player = this.state.players[playerNum];

            this.setState({
                players: {...this.state.players, [playerNum]: player.placeShip(x, y)}
            });
        };
    }

    setTargetCell(playerNum: PlayerNum) {
        return (x: number, y: number) => () => {
            if (this.state.gameController.player.name === playerNum)
                return

            this.setState(state => ({
                gameController: state.gameController.setTargetCell(x, y)
            }));
        }
    }

    goToNextState() {
        const {players, gameController} = this.state;
        const enemy: Player = players[gameController.getEnemyPlayerName()];

        switch (gameController.stage) {
            case GameStage.SHIP_PLACEMENT:
                if (!players[PlayerNum.ONE].shipsRemainingForBuild() && !players[PlayerNum.TWO].shipsRemainingForBuild())
                    return this.setState({
                        gameController: new GameController(players[PlayerNum.ONE], GameStage.MOVE_CONFIRMATION)
                    });

                return this.setState({
                    gameController: new GameController(players[PlayerNum.TWO], GameStage.SHIP_PLACEMENT)
                });

            case GameStage.MOVE_CONFIRMATION:
                return this.setState({
                    gameController: new GameController(gameController.player, GameStage.GAMEPLAY)
                })

            case GameStage.GAMEPLAY:

                const [x, y] = gameController.attackedCell;
                if (enemy.cells[x][y] === CellType.KILLED) {
                    alert('Убил');
                    return this.setState({
                        gameController: new GameController(gameController.player, GameStage.GAMEPLAY)
                    })
                }

                alert('Промах');
                return this.setState({
                    gameController: new GameController(gameController.player, GameStage.MOVE_FINISHED)
                })

            case GameStage.MOVE_FINISHED:
                return this.setState({
                    gameController: new GameController(enemy, GameStage.GAMEPLAY)
                })
        }
    }

    confirmAttack() {
        const {gameController, players} = this.state;
        const [x, y] = gameController.attackedCell;
        const enemyName = gameController.getEnemyPlayerName();
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
            gameStage={this.state.gameController.stage}
            isReadyForNextStage={this.state.gameController.isReadyForNextStage()}
        />;
        const onCellClick = this.state.gameController.stage === GameStage.SHIP_PLACEMENT
            ? this.placeShip
            : this.setTargetCell;

        const confirmationScreen = (
            <ConfirmationScreen playerName={this.state.gameController.player.name}>
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
                                currState={this.state.gameController}
                                onCellClick={onCellClick(player.name)}
                            />
                    )
                }
            </div>
        );

        return (
            <main>
                <GameInfo
                    currState={this.state.gameController}
                    resetAll={this.setInitialState}
                >
                    {actionButton}
                </GameInfo>

                {
                    this.state.gameController.stage === GameStage.MOVE_CONFIRMATION
                        ? confirmationScreen
                        : gameBoards
                }
            </main>
        )
    }
}

export default App