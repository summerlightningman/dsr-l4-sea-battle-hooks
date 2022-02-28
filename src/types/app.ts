import {PlayerList, PlayerNum} from "./player";
import GameState from "../classes/game-state";
import {CellCoords} from "./game-controller";

export type AppProps = object;

export interface AppState {
    gameState: GameState;
    players: PlayerList
}

export type CellClickHandler = (playerNum: PlayerNum) => (coords: CellCoords) => () => void;