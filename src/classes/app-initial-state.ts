import {PlayerNum} from "../types/common";
import Player from "./player";
import {AppState} from "../types/app";
import GameState from "./game-state";

export class AppInitialState implements AppState {
    gameState: GameState;
    players: Record<PlayerNum, Player>;

    constructor() {
        this.players = {
            [PlayerNum.ONE]: new Player(PlayerNum.ONE, true),
            [PlayerNum.TWO]: new Player(PlayerNum.TWO)
        }
        this.gameState = new GameState(this.players[PlayerNum.ONE]);
    }
}