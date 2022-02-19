import Player from "../classes/player";

export const enum PlayerNum {
    ONE = 'Foo',
    TWO = 'Bar'
}

export type PlayerList = Record<PlayerNum, Player>