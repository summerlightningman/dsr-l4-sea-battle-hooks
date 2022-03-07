import PlayerController from "../classes/player-controller";
import {Arena} from "./common";

export const enum PlayerName {
    ONE = 'Foo',
    TWO = 'Bar'
}

export interface Player {
    name: PlayerName,
    cells: Arena
}

export type PlayerList = Record<PlayerName, PlayerController>;
export type PlayersArena = Record<PlayerName, Arena>;