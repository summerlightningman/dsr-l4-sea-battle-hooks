import React, {FC, useState} from 'react'
import Board from './board';
import Footer from "./footer";
import ConfirmationScreen from "./confirmation-screen";
import PlayerController from "../classes/player-controller";
import GameController from "../classes/game-controller";
import {GameStage} from "../types/game-state";
import {PlayerName, PlayersArena} from '../types/player';
import {CellCoords, CellType} from "../types/cell";

import {boardHeight, boardWidth, emptyTargetCell} from "../config";

import '../styles/app.css';
import {generateArena} from "../functions";
import Header from "./header";


const App: FC = () => {

    const [currStage, setCurrStage] = useState<GameStage>(GameStage.SHIP_PLACEMENT);
    const [currPlayer, setCurrPlayer] = useState<PlayerName>(PlayerName.ONE);
    const [targetCell, setTargetCell] = useState<CellCoords>(emptyTargetCell);
    const [arenas, setArenas] = useState<PlayersArena>({
        [PlayerName.ONE]: generateArena(boardWidth, boardHeight),
        [PlayerName.TWO]: generateArena(boardWidth, boardHeight)
    });

    const setInitialState = () => {
        setCurrStage(GameStage.SHIP_PLACEMENT);
        setCurrPlayer(PlayerName.ONE);
        setTargetCell(emptyTargetCell);
        setArenas({
            [PlayerName.ONE]: generateArena(boardWidth, boardHeight),
            [PlayerName.TWO]: generateArena(boardWidth, boardHeight)
        });
    };

    const goToNextStage = () => {
        switch (currStage) {
            case GameStage.SHIP_PLACEMENT:
                if (currPlayer === PlayerName.ONE)
                    return setCurrPlayer(PlayerName.TWO)

                setCurrPlayer(PlayerName.ONE)
                setCurrStage(GameStage.MOVE_CONFIRMATION);
                return
            case GameStage.MOVE_CONFIRMATION:
                return setCurrStage(GameStage.GAMEPLAY)
            case GameStage.GAMEPLAY:
                const [x, y] = targetCell;
                const enemyPlayerName = PlayerController.getEnemyPlayerName(currPlayer);
                const updatedArena = PlayerController.attack(arenas[enemyPlayerName], targetCell);
                if (updatedArena[x][y] === CellType.KILLED) {
                    alert('Убил');
                    setArenas({...arenas, [enemyPlayerName]: updatedArena});
                    if (PlayerController.isLost(updatedArena)) {
                        alert(`Победил игрок ${currPlayer}. Поздравляем! 🥳🎉`);
                        setCurrStage(GameStage.ENDGAME);

                        return
                    } else {
                        setTargetCell(emptyTargetCell);
                        return
                    }
                } else {
                    alert('Промах');
                    setTargetCell(emptyTargetCell);
                    setCurrStage(GameStage.MOVE_FINISHED);
                    setArenas({...arenas, [enemyPlayerName]: updatedArena})
                    return
                }
            case GameStage.MOVE_FINISHED:
                setCurrStage(GameStage.MOVE_CONFIRMATION);
                setCurrPlayer(PlayerController.getEnemyPlayerName(currPlayer));
                return
        }
    };

    const setTarget = (coords: CellCoords) => {
        const target = GameController.isTargetCell(targetCell, coords) ? emptyTargetCell : coords
        return () => setTargetCell(target);
    }

    const placeShip = (coords: CellCoords) => {
        return () => {
            if (!PlayerController.isCanBuild(arenas[currPlayer]))
                return

            const [x, y] = coords;
            const updatedArenas = JSON.parse(JSON.stringify(arenas));

            updatedArenas[currPlayer][x][y] = updatedArenas[currPlayer][x][y] === CellType.EMPTY
                ? CellType.HAS_SHIP
                : CellType.EMPTY;
            return setArenas(updatedArenas)
        }
    }

    const getOnCellClick = () => {
        switch (currStage) {
            case GameStage.SHIP_PLACEMENT:
                return placeShip
            case GameStage.GAMEPLAY:
                return setTarget
            default:
                return (_: CellCoords) => () => {
                }
        }
    }


    const onCellClick = getOnCellClick();
    const playerNameList = [PlayerName.ONE, PlayerName.TWO];

    const confirmationScreen = <ConfirmationScreen
        currPlayer={currPlayer}
        currStage={currStage}
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
                            currStage={currStage}
                            currPlayer={currPlayer}
                            targetCell={targetCell}
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
                    currStage === GameStage.MOVE_CONFIRMATION
                        ? confirmationScreen
                        : gameBoards
                }
            </main>
            <Footer/>
        </div>
    )
}


export default App