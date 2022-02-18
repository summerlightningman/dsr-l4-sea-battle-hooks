import {PlayerNum} from "./common";
import Player from "../classes/player";
import GameState from "../classes/game-state";

export type AppProps = object;

export interface AppState {
    gameState: GameState,
    players: Record<PlayerNum, Player>
}