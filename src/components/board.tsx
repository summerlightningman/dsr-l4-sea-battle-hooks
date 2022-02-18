import {Component} from 'react';

import {BoardProps} from '../types/board';
import {generateCells, isEquals} from "../functions";
import {boardHeight, boardWidth, cellSize} from "../config";
import {GameStage} from "../types/common";
import Cell from "./cell";
import {CellType} from "../types/cell";

import '../styles/board.css';

class Board extends Component<BoardProps> {

    render() {
        const isHidden = this.props.currState.player.name !== this.props.player.name
            && this.props.currState.stage === GameStage.SHIP_PLACEMENT

        if (isHidden)
            return <></>

        const cellList = generateCells(boardWidth, boardHeight).map(
            ([x, y]) => {
                if (isEquals(this.props.currState.attackedCell, [x, y]))
                    return <Cell
                        key={`${x}${y}`}
                        cellState={CellType.ATTACKED}
                        // @ts-ignore
                        onCellClick={this.props.onCellClick(x, y)}
                    />
                if (this.props.currState.stage === GameStage.GAMEPLAY && this.props.player.cells[x][y] === CellType.HAS_SHIP) {
                    const cellState = this.props.player.name !== this.props.currState.player.name ? CellType.EMPTY : CellType.HAS_SHIP;
                    return <Cell
                        key={`${x}${y}`}
                        cellState={cellState}
                        // @ts-ignore
                        onCellClick={this.props.onCellClick(x, y)}
                    />
                } else {
                    return <Cell
                        key={`${x}${y}`}
                        cellState={this.props.player.cells[x][y]}
                        // @ts-ignore
                        onCellClick={this.props.onCellClick(x, y)}
                    />

                }
            }
        );

        return <div className="board">
            Игрок {this.props.player.name}
            <div className="cell-list"
                 style={
                     {
                         width: `calc(${boardWidth} * ${cellSize})`,
                         height: `calc(${boardHeight} * ${cellSize})`
                     }
                 }>
                {cellList}
            </div>
            {this.props.currState.isReadyForNextStage() && this.props.children}
        </div>;
    }
}

export default Board