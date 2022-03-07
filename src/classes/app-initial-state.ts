import {PlayerName} from "../types/player";
import type {PlayersArena} from '../types/player';
import {AppState} from "../types/app";
import GameState from "./game-state";
import {generateArena} from "../functions";
import {boardHeight, boardWidth} from "../config";

class AppInitialState implements AppState {
    gameState: GameState;
    arenas: PlayersArena;

    constructor() {
        this.gameState = new GameState(PlayerName.ONE);
        this.arenas = {
            [PlayerName.ONE]: generateArena(boardWidth, boardHeight),
            [PlayerName.TWO]: generateArena(boardWidth, boardHeight)
        }
    }
}

export default AppInitialState