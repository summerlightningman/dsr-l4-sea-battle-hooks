import {CellCoords, GameStage} from "../types/game-controller";
import {emptyTargetCell} from "../config";
import {PlayerName} from "../types/player";

class GameState {
    currStage: GameStage;
    currPlayer: PlayerName;
    targetCell: CellCoords;

    constructor(player: PlayerName, stage: GameStage = GameStage.SHIP_PLACEMENT) {
        this.currStage = stage;
        this.currPlayer = player;
        this.targetCell = emptyTargetCell;
    }
}

export default GameState