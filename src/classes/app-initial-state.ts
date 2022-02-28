import Player from "./player";

import {PlayerList, PlayerNum} from "../types/player";
import {AppState} from "../types/app";
import GameState from "./game-state";

class AppInitialState implements AppState {
    gameState: GameState;
    players: PlayerList;

    constructor() {
        this.players = {
            [PlayerNum.ONE]: new Player(PlayerNum.ONE),
            [PlayerNum.TWO]: new Player(PlayerNum.TWO)
        }
        this.gameState = new GameState(this.players[PlayerNum.ONE]);
    }
}

export default AppInitialState