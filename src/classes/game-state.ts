import {CellCoords, GameStage} from "../types/game-controller";
import Player from "./player";
import {emptyTargetCell} from "../config";

class GameState {
    currStage: GameStage;
    currPlayer: Player;
    targetCell: CellCoords;

    constructor(player: Player, stage: GameStage = GameStage.SHIP_PLACEMENT) {
        this.currStage = stage;
        this.currPlayer = player;
        this.targetCell = emptyTargetCell;
    }
}

export default GameState