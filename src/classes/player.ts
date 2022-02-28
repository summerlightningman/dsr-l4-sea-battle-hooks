import {Arena} from "../types/common";
import {PlayerNum} from "../types/player";
import {generateArena} from "../functions";
import {boardHeight, boardWidth, shipCount} from "../config";
import {CellType} from "../types/cell";
import {CellCoords} from "../types/game-controller";


class Player {
    cells: Arena;
    name: PlayerNum;

    constructor(name: PlayerNum) {
        this.name = name;
        this.cells = generateArena(boardWidth, boardHeight);

        this.aliveShipsCount = this.aliveShipsCount.bind(this);
        this.shipsRemainingForBuild = this.shipsRemainingForBuild.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.attack = this.attack.bind(this);
        this.clonePlayer = this.clonePlayer.bind(this);
        this.setCellType = this.setCellType.bind(this);

    }

    private setCellType(coords: CellCoords, type: CellType) {
        const [x, y] = coords;
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

    isLost() {
        return this.aliveShipsCount() === 0
    }

    private clonePlayer(): Player {
        const player = new Player(this.name);
        player.cells = this.cells;
        return player
    }

    placeShip(coords: CellCoords): Player {
        const [x, y] = coords;
        if (this.cells[x][y] === CellType.HAS_SHIP) {
            return this.setCellType(coords, CellType.EMPTY)
        } else {
            if (this.aliveShipsCount() >= shipCount)
                return this
            return this.setCellType(coords, CellType.HAS_SHIP)
        }
    }

    attack(coords: CellCoords): Player {
        const [x, y] = coords;
        const cellState = this.cells[x][y];
        if (cellState === CellType.EMPTY)
            return this.setCellType(coords, CellType.MISSED)
        if (cellState === CellType.HAS_SHIP)
            return this.setCellType(coords, CellType.KILLED)
        return this
    }

    hasShipOn(coords: CellCoords): boolean {
        const [x, y] = coords;
        return this.cells[x][y] === CellType.HAS_SHIP
    }
}

export default Player