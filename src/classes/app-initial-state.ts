import Player from "./player";
import GameController from "./game-controller";

import {PlayerList, PlayerNum} from "../types/player";
import {AppState} from "../types/app";

class AppInitialState implements AppState {
    gameController: GameController;
    players: PlayerList;

    constructor() {
        this.players = {
            [PlayerNum.ONE]: new Player(PlayerNum.ONE, true),
            [PlayerNum.TWO]: new Player(PlayerNum.TWO)
        }
        this.gameController = new GameController(this.players[PlayerNum.ONE]);
    }
}

export default AppInitialState