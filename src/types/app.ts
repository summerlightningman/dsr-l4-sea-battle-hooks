import type {PlayersArena} from "./player";
import {GameState} from "./game-state";

export type AppProps = object;

export interface AppState {
    gameState: GameState;
    arenas: PlayersArena
}
