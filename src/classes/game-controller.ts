import {CellCoords, GameStage} from "../types/game-controller";
import {PlayerName} from "../types/player";

import {emptyTargetCell} from "../config";

import {areEqual} from "../functions";
import GameState from "./game-state";
import {CellType} from "../types/cell";

class GameController {

    static isTargetEmpty(coords: CellCoords) {
        return areEqual(coords, emptyTargetCell)
    }

    static getEnemyPlayerName(playerName: PlayerName): PlayerName {
        return playerName === PlayerName.ONE ? PlayerName.TWO : PlayerName.ONE
    }

    static isPlayerActive(currPlayer: PlayerName, playerName: PlayerName) {
        return playerName === currPlayer
    }

    static isBoardVisible(gameState: GameState, playerName: PlayerName){
        if (gameState.currStage === GameStage.SHIP_PLACEMENT)
            return gameState.currPlayer === playerName
        return true
    }

    static isTargetCell(target: CellCoords, coords: CellCoords) {
        return areEqual(target, coords)
    }

    static getCellType(player: PlayerName, gameState: GameState): (cell: CellType, coords: CellCoords) => CellType {
        return (cell: CellType, coords: CellCoords): CellType => {
            switch (gameState.currStage) {
                case GameStage.GAMEPLAY:
                    if (gameState.currPlayer === player)
                        return cell
                    if (this.isTargetCell(gameState.targetCell, coords))
                        return CellType.ATTACKED
                    if (cell === CellType.HAS_SHIP)
                        return CellType.EMPTY
                    return cell
                default:
                    return cell
            }
        }
    }

    static getActionButtonName(gameStage: GameStage) {
        switch (gameStage) {
            case GameStage.SHIP_PLACEMENT:
                return 'Подтвердить'
            case GameStage.MOVE_CONFIRMATION:
                return 'Начать ход'
            case GameStage.MOVE_FINISHED:
                return 'Завершить ход'
            case GameStage.GAMEPLAY:
                return 'Атаковать'
            default:
                return 'Подтвердить'
        }
    }
}

export default GameController