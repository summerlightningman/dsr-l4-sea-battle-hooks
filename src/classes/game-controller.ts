import {GameStage, GameState} from "../types/game-state";
import {PlayerName} from "../types/player";
import {CellType, CellCoords} from "../types/cell";

import {emptyTargetCell} from "../config";

import {areEqual} from "../functions";


class GameController {
    static isTargetEmpty(coords: CellCoords) {
        return areEqual(coords, emptyTargetCell)
    }

    static isBoardVisible({currStage, currPlayer}: GameState, playerName: PlayerName){
        if (currStage === GameStage.SHIP_PLACEMENT)
            return currPlayer === playerName
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