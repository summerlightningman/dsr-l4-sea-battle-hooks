import {Arena} from "../types/common";
import {CellCoords, CellType} from "../types/cell";
import {PlayerName} from "../types/player";

import {shipCount} from "../config";


class PlayerController {
    static aliveShipsCount(cells: Arena) {
        return cells.reduce((acc, val) =>
            acc + val.reduce((acc_, val_) => val_ === CellType.HAS_SHIP ? acc_ + 1 : acc_, 0), 0);
    }

    static isPlayerActive(currPlayer: PlayerName, playerName: PlayerName) {
        return playerName === currPlayer
    }

    static getEnemyPlayerName(playerName: PlayerName): PlayerName {
        return playerName === PlayerName.ONE ? PlayerName.TWO : PlayerName.ONE
    }

    static shipsRemainingForBuild(cells: Arena) {
        return shipCount - this.aliveShipsCount(cells)
    }

    static isCanBuild(cells: Arena) {
        return shipCount - this.aliveShipsCount(cells) > 0
    }

    static isLost(cells: Arena) {
        return this.aliveShipsCount(cells) === 0
    }

    static attack(arena: Arena, target: CellCoords) {
        const [x, y] = target;
        const updatedArena = JSON.parse(JSON.stringify(arena));
        updatedArena[x][y] = updatedArena[x][y] === CellType.HAS_SHIP ? CellType.KILLED : CellType.MISSED;
        return updatedArena
    }
}

export default PlayerController