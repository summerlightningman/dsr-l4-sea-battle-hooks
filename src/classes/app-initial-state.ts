import {PlayerName} from "../types/player";
import type {PlayersArena} from '../types/player';
import {AppState} from "../types/app";

import {generateArena} from "../functions";
import {boardHeight, boardWidth, emptyTargetCell} from "../config";
import {GameStage, GameState} from "../types/game-state";

class AppInitialState implements AppState {
    gameState: GameState;
    arenas: PlayersArena;

    constructor() {
        this.gameState = {
            currStage: GameStage.SHIP_PLACEMENT,
            currPlayer: PlayerName.ONE,
            targetCell: emptyTargetCell,
        };
        this.arenas = {
            [PlayerName.ONE]: generateArena(boardWidth, boardHeight),
            [PlayerName.TWO]: generateArena(boardWidth, boardHeight)
        }
    }
}

export default AppInitialState