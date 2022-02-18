export interface CellProps {
    cellState: CellType,
    onCellClick: () => void
}

export const enum CellType {
    EMPTY,
    HAS_SHIP,
    ATTACKED,
    MISSED,
    KILLED
}