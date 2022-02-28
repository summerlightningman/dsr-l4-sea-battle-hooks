import {PlayerList, PlayerNum} from "./player";
import GameState from "../classes/game-state";

export type AppProps = object;

export interface AppState {
    gameState: GameState;
    players: PlayerList
}

export type CellClickHandler = (playerNum: PlayerNum) => (x: number, y: number) => () => void;