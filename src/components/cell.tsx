import {Component} from "react";

import {CellProps, CellType} from "../types/cell";
import {cellSize} from "../config";

import "../styles/cell.css";

class Cell extends Component<CellProps> {
    constructor(props: CellProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onCellClick();
    }

    render() {
        const style: Record<CellType, string> = {
            [CellType.EMPTY]: '',
            [CellType.HAS_SHIP]: ' cell_has-ship',
            [CellType.MISSED]: ' cell_missed',
            [CellType.KILLED]: ' cell_killed',
            [CellType.ATTACKED]: ' cell_attacked'
        };

        const className = 'cell' +  style[this.props.cellType];
        return <div className={className} style={{width: cellSize, height: cellSize}} onClick={this.handleClick}>

        </div>
    }
}

export default Cell