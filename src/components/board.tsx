import React, {FC} from 'react';

import Cell from "./cell";
import ActionButton from "./action-button";

import type {BoardProps} from '../types/board';
import {GameStage} from "../types/game-state";

import {boardHeight, boardWidth, cellSize} from "../config";

import {generateCoordinatePairs} from "../functions";
import GameController from "../classes/game-controller";
import PlayerController from "../classes/player-controller";

import '../styles/board.css';

const Board: FC<BoardProps> = ({playerName, arena, gameState, onNextStage, onCellClick}) => {
    const {currStage, currPlayer, targetCell} = gameState;

    if (!GameController.isBoardVisible({currStage, currPlayer}, playerName))
        return <></>


    const getCellType = GameController.getCellType(playerName, gameState);


    const isReadyForNextStage = () => {
        switch (currStage) {
            case GameStage.SHIP_PLACEMENT:
                return !PlayerController.isCanBuild(arena)
            case GameStage.GAMEPLAY:
                return !GameController.isTargetEmpty(targetCell)
                    && !PlayerController.isPlayerActive(currPlayer, playerName)
            case GameStage.MOVE_FINISHED:
                return !PlayerController.isPlayerActive(currPlayer, playerName)
        }
        return false
    }

    const getMessage = () => {
        switch (currStage) {
            case GameStage.SHIP_PLACEMENT:
                return `Осталось расположить кораблей: ${PlayerController.shipsRemainingForBuild(arena)}`
            case GameStage.MOVE_FINISHED:
                if (PlayerController.isPlayerActive(currPlayer, playerName))
                    return 'Ход завершён'
                else {
                    const shipCount = PlayerController.aliveShipsCount(arena);
                    return 'Осталось ' + GameController.getShipCountInText(shipCount);
                }
            case GameStage.GAMEPLAY:
                if (PlayerController.isPlayerActive(currPlayer, playerName))
                    return 'Ваш ход'
                else {
                    const shipCount = PlayerController.aliveShipsCount(arena);
                    return 'Осталось ' + GameController.getShipCountInText(shipCount);
                }
            case GameStage.ENDGAME:
                if (PlayerController.isPlayerActive(currPlayer, playerName))
                    return 'Победа!'
                else
                    return 'Повезёт в другой раз ;)'
        }
    }

    const cellList = generateCoordinatePairs(boardWidth, boardHeight).map(
        coords => {
            const [x, y] = coords;
            const cellType = getCellType(arena[x][y], coords);

            return <Cell
                key={`${x}${y}`}
                cellType={cellType}
                onCellClick={onCellClick(coords)}
            />
        }
    );

    return <div className="board">
        <span className="board__player-name">{playerName}</span>
        <span className="board__msg">{getMessage()}</span>
        <ActionButton
            onNextStage={onNextStage}
            gameStage={currStage}
            isReadyForNextStage={isReadyForNextStage()}
        />
        <div className="cell-list"
             style={
                 {
                     width: `calc(${boardWidth} * ${cellSize})`,
                     height: `calc(${boardHeight} * ${cellSize})`
                 }
             }>
            {cellList}
        </div>
    </div>;
}


export default Board