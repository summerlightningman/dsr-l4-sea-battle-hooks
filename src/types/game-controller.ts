export type CellCoords = [number, number];

export const enum GameStage {
    SHIP_PLACEMENT,
    MOVE_CONFIRMATION,
    GAMEPLAY,
    ENDGAME
}