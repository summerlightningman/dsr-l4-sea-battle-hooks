import {Arena, PlayerNum} from "../types/common";
import {generateArena} from "../functions";
import {boardHeight, boardWidth, shipCount} from "../config";
import {CellType} from "../types/cell";


class Player {
    cells: Arena;
    name: PlayerNum;
    isVisible: boolean;

    constructor(name: PlayerNum, isVisible = true) {
        this.name = name;
        this.cells = generateArena(boardWidth, boardHeight);
        this.isVisible = isVisible;

        this.aliveShipsCount = this.aliveShipsCount.bind(this);
        this.shipsRemainingForBuild = this.shipsRemainingForBuild.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.attack = this.attack.bind(this);
        this.clonePlayer = this.clonePlayer.bind(this);
        this.setCellType = this.setCellType.bind(this);
    }

    private setCellType(x: number, y: number, type: CellType) {
        const updatedPlayer = this.clonePlayer();
        updatedPlayer.cells[x][y] = type;
        return updatedPlayer
    }

    aliveShipsCount() {
        return this.cells.reduce((acc, val) =>
            acc + val.reduce((acc_, val_) => val_ === CellType.HAS_SHIP ? acc_ + 1 : acc_, 0), 0);
    }

    shipsRemainingForBuild() {
        return shipCount - this.aliveShipsCount()
    }

    private clonePlayer(): Player {
        const player = new Player(this.name);
        player.cells = this.cells;
        return player
    }

    placeShip(x: number, y: number): Player {
        if (this.cells[x][y] === CellType.HAS_SHIP) {
            return this.setCellType(x, y, CellType.EMPTY)
        } else {
            if (this.aliveShipsCount() >= shipCount)
                return this
            return this.setCellType(x, y, CellType.HAS_SHIP)
        }
    }

    attack(x: number, y: number): Player {
        const cellState = this.cells[x][y];
        if (cellState === CellType.EMPTY)
            return this.setCellType(x, y, CellType.MISSED)
        if (cellState === CellType.HAS_SHIP)
            return this.setCellType(x, y, CellType.KILLED)
        return this
    }
}

export default Player