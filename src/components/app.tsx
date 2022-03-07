import React, {Component} from 'react'

import Header from './header';
import Board from './board';
import Footer from "./footer";
import ConfirmationScreen from "./confirmation-screen";

import AppInitialState from '../classes/app-initial-state';
import PlayerController from "../classes/player-controller";
import GameController from "../classes/game-controller";

import {AppProps, AppState} from '../types/app';
import {GameStage} from "../types/game-state";
import {PlayerName} from '../types/player';
import {CellCoords, CellType} from "../types/cell";

import {emptyTargetCell} from "../config";

import '../styles/app.css';


class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = new AppInitialState();

        this.setInitialState = this.setInitialState.bind(this);
        this.goToNextStage = this.goToNextStage.bind(this);
        this.setTarget = this.setTarget.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.getOnCellClick = this.getOnCellClick.bind(this);
    }

    setInitialState() {
        this.setState(new AppInitialState());
    }

    goToNextStage() {
        const {currStage, currPlayer, targetCell} = this.state.gameState;
        switch (currStage) {
            case GameStage.SHIP_PLACEMENT:
                if (currPlayer === PlayerName.ONE)
                    return this.setState(state => ({gameState: {...state.gameState, currPlayer: PlayerName.TWO}}));

                return this.setState(state => ({
                    gameState: {
                        ...state.gameState,
                        currPlayer: PlayerName.ONE,
                        currStage: GameStage.MOVE_CONFIRMATION
                    }
                }));
            case GameStage.MOVE_CONFIRMATION:
                return this.setState(state => ({gameState: {...state.gameState, currStage: GameStage.GAMEPLAY}}))
            case GameStage.GAMEPLAY:
                const [x, y] = targetCell;
                const enemyPlayerName = PlayerController.getEnemyPlayerName(currPlayer);
                const updatedArena = PlayerController.attack(this.state.arenas[enemyPlayerName], targetCell);
                if (updatedArena[x][y] === CellType.KILLED) {
                    alert('Убил');
                    if (PlayerController.isLost(updatedArena)) {
                        alert(`Победил игрок ${currPlayer}. Поздравляем! 🥳🎉`);
                        return this.setState(state => ({
                            gameState: {
                                ...state.gameState, currStage: GameStage.ENDGAME
                            },
                            arenas: {
                                ...state.arenas,
                                [enemyPlayerName]: updatedArena
                            }
                        }));
                    } else {
                        return this.setState(state => ({
                            gameState: {
                                ...state.gameState,
                                targetCell: emptyTargetCell
                            },
                            arenas: {
                                ...state.arenas,
                                [enemyPlayerName]: updatedArena
                            }
                        }))
                    }
                } else {
                    alert('Промах');
                    return this.setState(state => ({
                        gameState: {
                            ...state.gameState,
                            targetCell: emptyTargetCell,
                            currStage: GameStage.MOVE_FINISHED
                        },
                        arenas: {
                            ...state.arenas,
                            [enemyPlayerName]: updatedArena
                        }
                    }))
                }
            case GameStage.MOVE_FINISHED:
                return this.setState(state => ({
                    gameState: {
                        ...state.gameState,
                        currStage: GameStage.MOVE_CONFIRMATION,
                        currPlayer: PlayerController.getEnemyPlayerName(currPlayer)
                    }
                }));
        }
    }

    setTarget(coords: CellCoords) {
        return () => this.setState(({gameState}) => ({
            gameState: {
                ...gameState,
                targetCell: GameController.isTargetCell(gameState.targetCell, coords) ? emptyTargetCell : coords
            }
        }))
    }

    placeShip(coords: CellCoords) {
        return () => {
            const player = this.state.gameState.currPlayer;
            if (!PlayerController.isCanBuild(this.state.arenas[player]))
                return

            const [x, y] = coords;
            const updatedArenas = JSON.parse(JSON.stringify(this.state.arenas));

            updatedArenas[player][x][y] = updatedArenas[player][x][y] === CellType.EMPTY
                ? CellType.HAS_SHIP
                : CellType.EMPTY;
            return this.setState({arenas: updatedArenas});
        }
    }

    getOnCellClick() {
        switch (this.state.gameState.currStage) {
            case GameStage.SHIP_PLACEMENT:
                return this.placeShip
            case GameStage.GAMEPLAY:
                return this.setTarget
            default:
                return (_: CellCoords) => () => {
                }
        }
    }

    render() {
        const onCellClick = this.getOnCellClick();
        const playerNameList = [PlayerName.ONE, PlayerName.TWO];

        const confirmationScreen = <ConfirmationScreen
            gameState={this.state.gameState}
            onNextStage={this.goToNextStage}
        />;

        const gameBoards = (
            <div className="game-boards">
                {
                    playerNameList.map(
                        (playerName) => {
                            const arena = this.state.arenas[playerName];
                            const {gameState} = this.state;

                            return <Board
                                playerName={playerName}
                                arena={arena}
                                key={`${playerName}${+new Date()}`}
                                onNextStage={this.goToNextStage}
                                gameState={gameState}
                                onCellClick={onCellClick}
                            />
                        }
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
                        this.state.gameState.currStage === GameStage.MOVE_CONFIRMATION
                            ? confirmationScreen
                            : gameBoards
                    }
                </main>
                <Footer/>
            </div>
        )
    }
}

export default App