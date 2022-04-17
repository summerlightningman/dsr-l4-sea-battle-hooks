import React, {FC, useCallback, useMemo, useReducer} from 'react'
import Board from './board';
import Footer from "./footer";
import ConfirmationScreen from "./confirmation-screen";
import Header from "./header";

import PlayerController from "../classes/player-controller";
import GameController from "../classes/game-controller";
import AppInitialState from "../classes/app-initial-state";

import {GameStage} from "../types/game-state";
import {PlayerName} from '../types/player';
import {AppActionType, SetArenaPayload, SetGameStatePayload} from "../types/app";
import {CellCoords, CellType} from "../types/cell";

import {emptyTargetCell} from "../config";

import appReducer from "../reducers/app-reducer";

import '../styles/app.css';

const App: FC = () => {
    const [{arenas, gameState}, dispatch] = useReducer(appReducer, new AppInitialState());
    const patchGameState = useCallback(
        (payload: SetGameStatePayload) =>
            dispatch({type: AppActionType.SET_GAME_STATE, payload})
        , []
    );
    const setArena = useCallback(
        (payload: SetArenaPayload) =>
            dispatch({type: AppActionType.SET_ARENA, payload})
        , []
    );
    const goToNextStage = useMemo(() => {
        switch (gameState.currStage) {
            case GameStage.SHIP_PLACEMENT:
                return () => {
                    if (gameState.currPlayer === PlayerName.ONE)
                        return patchGameState({currPlayer: PlayerName.TWO})

                    return patchGameState({currPlayer: PlayerName.ONE, currStage: GameStage.MOVE_CONFIRMATION})
                }
            case GameStage.MOVE_CONFIRMATION:
                return () => patchGameState({currStage: GameStage.GAMEPLAY})
            case GameStage.GAMEPLAY:
                return () => {
                    const [x, y] = gameState.targetCell;
                    const enemyPlayerName = PlayerController.getEnemyPlayerName(gameState.currPlayer);
                    const updatedArena = PlayerController.attack(arenas[enemyPlayerName], gameState.targetCell);
                    if (updatedArena[x][y] === CellType.KILLED) {
                        alert('Убил');
                        setArena({[enemyPlayerName]: updatedArena});
                        if (PlayerController.isLost(updatedArena)) {
                            alert(`Победил игрок ${gameState.currPlayer}. Поздравляем! 🥳🎉`);
                            return dispatch({type: AppActionType.SET_GAME_STATE, payload: {currStage: GameStage.ENDGAME}})
                        } else {
                            return dispatch({type: AppActionType.SET_GAME_STATE, payload: {targetCell: emptyTargetCell}})
                        }
                    } else {
                        alert('Промах');
                        patchGameState({targetCell: emptyTargetCell, currStage: GameStage.MOVE_FINISHED});
                        setArena({[enemyPlayerName]: updatedArena});
                        return
                    }
                }
            case GameStage.MOVE_FINISHED:
                return () => patchGameState({
                    currStage: GameStage.MOVE_CONFIRMATION,
                    currPlayer: PlayerController.getEnemyPlayerName(gameState.currPlayer)
                })
            default:
                return () => {}
        }

    }, [gameState.currStage, gameState.currPlayer, gameState.targetCell]);

    const setTarget = useCallback((coords: CellCoords) => {
        const targetCell = GameController.isTargetCell(gameState.targetCell, coords) ? emptyTargetCell : coords
        return () => patchGameState({targetCell})
    }, [gameState.targetCell]);

    const placeShip = useCallback((coords: CellCoords) => {
        return () => {
            if (!PlayerController.isCanBuild(arenas[gameState.currPlayer]))
                return

            const [x, y] = coords;
            const currArena = JSON.parse(JSON.stringify(arenas[gameState.currPlayer]));
            currArena[x][y] = currArena[x][y] === CellType.EMPTY ? CellType.HAS_SHIP : CellType.EMPTY;
            return setArena({[gameState.currPlayer]: currArena})
        }
    }, [gameState.currPlayer, arenas[gameState.currPlayer]]);

    const onCellClick = useMemo(() => {
        switch (gameState.currStage) {
            case GameStage.SHIP_PLACEMENT:
                return placeShip
            case GameStage.GAMEPLAY:
                return setTarget
            default:
                return () => () => {}
        }
    },[gameState.currStage, arenas, gameState.currPlayer]);

    const setInitialState = useCallback(() => {
        dispatch({type: AppActionType.RESET_ALL})
    }, []);

    const playerNameList = [PlayerName.ONE, PlayerName.TWO];

    const confirmationScreen = <ConfirmationScreen
        gameState={gameState}
        onNextStage={goToNextStage}
    />;

    const gameBoards = (
        <div className="game-boards">
            {
                playerNameList.map(
                    (playerName) => {
                        const arena = arenas[playerName];

                        return <Board
                            playerName={playerName}
                            arena={arena}
                            key={`${playerName}${+new Date()}`}
                            onNextStage={goToNextStage}
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
                resetAll={setInitialState}
            />
            <main className="main">
                {
                    gameState.currStage === GameStage.MOVE_CONFIRMATION
                        ? confirmationScreen
                        : gameBoards
                }
            </main>
            <Footer/>
        </div>
    )
}


export default App