import {FC, useMemo} from "react";

import {CellProps, CellType} from "../types/cell";
import {cellSize} from "../config";

import "../styles/cell.css";

const Cell: FC<CellProps> = ({cellType, onCellClick}) => {

    const typeClass = useMemo(() => {
        switch (cellType) {
            case CellType.EMPTY:
                return ''
            case CellType.HAS_SHIP:
                return 'cell_has-ship'
            case CellType.MISSED:
                return 'cell_missed'
            case CellType.ATTACKED:
                return 'cell_attacked'
            case CellType.KILLED:
                return 'cell_killed'
        }
    }, [cellType]);

    const handleCellClick = onCellClick || (() => {
    });

    const className = 'cell ' + typeClass;
    return <div className={className} style={{width: cellSize, height: cellSize}} onClick={handleCellClick}>

    </div>

}

export default Cell