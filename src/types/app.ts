import GameController from "../classes/game-controller";
import {PlayerList} from "./player";

export type AppProps = object;

export interface AppState {
    gameController: GameController,
    players: PlayerList
}