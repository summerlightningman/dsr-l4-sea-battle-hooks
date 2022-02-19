import {PlayerNum} from "../types/common";
import Player from "./player";
import {AppState} from "../types/app";
import GameController from "./game-controller";

class AppInitialState implements AppState {
    gameController: GameController;
    players: Record<PlayerNum, Player>;

    constructor() {
        this.players = {
            [PlayerNum.ONE]: new Player(PlayerNum.ONE, true),
            [PlayerNum.TWO]: new Player(PlayerNum.TWO)
        }
        this.gameController = new GameController(this.players[PlayerNum.ONE]);
    }
}

export default AppInitialState