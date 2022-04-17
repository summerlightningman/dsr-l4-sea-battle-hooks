import {Arena} from "./common";

export const enum PlayerName {
    ONE = 'Foo',
    TWO = 'Bar'
}

export type PlayersArena = Record<PlayerName, Arena>;