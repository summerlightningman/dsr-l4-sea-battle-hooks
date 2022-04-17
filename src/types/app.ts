import type {PlayersArena} from "./player";
import {GameState} from "./game-state";

export interface AppState {
    gameState: GameState,
    arenas: PlayersArena
}

export enum AppActionType {
    SET_GAME_STATE = 'SET_GAME_STATE',
    RESET_ALL = 'RESET_ALL',
    SET_ARENA = 'SET_ARENA'
}

export interface ResetAllAction {
    type: AppActionType,
    payload?: null
}

export type SetGameStatePayload = Partial<GameState>;
export interface SetGameStateAction {
    type: AppActionType.SET_GAME_STATE,
    payload: SetGameStatePayload
}

export type SetArenaPayload = Partial<PlayersArena>
export interface SetArenaAction {
    type: AppActionType.SET_ARENA,
    payload: SetArenaPayload
}


export type AppAction = SetGameStateAction | ResetAllAction | SetArenaAction