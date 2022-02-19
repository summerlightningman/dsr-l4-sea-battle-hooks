import {PlayerNum} from "./common";
import Player from "../classes/player";
import GameController from "../classes/game-controller";

export type AppProps = object;

export interface AppState {
    gameController: GameController,
    players: Record<PlayerNum, Player>
}