import {Component} from 'react';

import Cell from "./cell";

import {BoardProps} from '../types/board';
import {GameStage} from "../types/game-controller";
import {CellType} from "../types/cell";

import {boardHeight, boardWidth, cellSize} from "../config";

import {generateCells, isEquals} from "../functions";

import '../styles/board.css';

class Board extends Component<BoardProps> {

    render() {
        const isHidden = this.props.currState.player.name !== this.props.player.name
            && this.props.currState.stage === GameStage.SHIP_PLACEMENT

        if (isHidden)
            return <></>

        const cellList = generateCells(boardWidth, boardHeight).map(
            ([x, y]) => {
                if (this.props.player.name !== this.props.currState.player.name && isEquals(this.props.currState.attackedCell, [x, y]))
                    return <Cell
                        key={`${x}${y}`}
                        cellState={CellType.ATTACKED}
                        // @ts-ignore
                        onCellClick={this.props.onCellClick(x, y)}
                    />
                if ([GameStage.GAMEPLAY, GameStage.MOVE_FINISHED].includes(this.props.currState.stage)
                    && this.props.player.cells[x][y] === CellType.HAS_SHIP) {
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
            {this.props.player.name === this.props.currState.player.name && this.props.children}
        </div>;
    }
}

export default Board