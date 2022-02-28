import {PlayerList} from "./player";
import GameState from "../classes/game-state";

export type AppProps = object;

export interface AppState {
    gameState: GameState;
    players: PlayerList
}