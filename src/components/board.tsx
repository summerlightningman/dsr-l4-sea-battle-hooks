import {Component} from 'react';

import Cell from "./cell";

import {BoardProps} from '../types/board';
import {CellCoords} from "../types/game-controller";
import {CellType} from "../types/cell";

import {boardHeight, boardWidth, cellSize} from "../config";

import {generateCoordinatePairs} from "../functions";

import GameController from "../classes/game-controller";
import Player from "../classes/player";

import '../styles/board.css';

class Board extends Component<BoardProps> {
    gameController: GameController;
    player: Player;

    constructor(props: BoardProps) {
        super(props);

        this.gameController = props.gameController;
        this.player = props.player;

        this.isTargetCell = this.isTargetCell.bind(this);
        this.isBoardHidden = this.isBoardHidden.bind(this);
    }

    isTargetCell(coords: CellCoords) {
        return !this.gameController.isPlayerClickedOwnCell(this.player.name) && this.gameController.isTargetCell(coords)
    }

    isBoardHidden() {
        return this.gameController.gameState.currPlayer.name !== this.player.name
            && this.gameController.isShipPlacementNow()
    }

    render() {
        if (this.isBoardHidden())
            return <></>

        const cellList = generateCoordinatePairs(boardWidth, boardHeight).map(
            ([x, y]) => {
                let cellType = this.player.cells[x][y];
                if (this.isTargetCell([x, y]))
                    cellType = CellType.ATTACKED;
                else if (this.gameController.isCombatGoing() && this.player.hasShipOn(x, y))
                    cellType = this.gameController.isPlayerClickedOwnCell(this.player.name) ? CellType.EMPTY : CellType.HAS_SHIP;

                return <Cell
                    key={`${x}${y}`}
                    cellType={cellType}
                    onCellClick={this.props.onCellClick(x, y)}
                />
            }
        );

        return <div className="board">
            <span className="board__player-name">{this.player.name}</span>
            <span className="board__player-state">{this.gameController.getPlayerState()}</span>
            <div className="cell-list"
                 style={
                     {
                         width: `calc(${boardWidth} * ${cellSize})`,
                         height: `calc(${boardHeight} * ${cellSize})`
                     }
                 }>
                {cellList}
            </div>
        </div>;
    }
}

export default Board