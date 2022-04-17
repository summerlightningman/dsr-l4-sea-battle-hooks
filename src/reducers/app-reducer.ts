import {AppAction, AppActionType, AppState} from "../types/app";
import AppInitialState from "../classes/app-initial-state";

const appReducer = (state: AppState = new AppInitialState(), action: AppAction): AppState => {
    switch (action.type) {
        case AppActionType.SET_GAME_STATE:
            return {...state, gameState: {...state.gameState, ...action.payload}}
        case AppActionType.RESET_ALL:
            return new AppInitialState()
        case AppActionType.SET_ARENA:
            return {...state, arenas: {...state.arenas, ...action.payload}}
    }
    return state
};

export default appReducer