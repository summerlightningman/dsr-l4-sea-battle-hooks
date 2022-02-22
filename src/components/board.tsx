import {Component} from 'react';

import Cell from "./cell";

import {BoardProps} from '../types/board';
import {GameStage} from "../types/game-controller";
import {CellType} from "../types/cell";

import {boardHeight, boardWidth, cellSize} from "../config";

import {generateCoordinatePairs} from "../functions";

import '../styles/board.css';
import GameController from "../classes/game-controller";
import Player from "../classes/player";

class Board extends Component<BoardProps> {
    gameController: GameController;
    player: Player;

    constructor(props: BoardProps) {
        super(props);

        this.gameController = props.gameController;
        this.player = props.player;
    }

    render() {
        const isHidden = this.props.gameController.player.name !== this.props.player.name
            && this.props.gameController.stage === GameStage.SHIP_PLACEMENT

        if (isHidden)
            return <></>

        const cellList = generateCoordinatePairs(boardWidth, boardHeight).map(
            ([x, y]) => {
                let cellType = this.props.player.cells[x][y];
                if (!this.gameController.isPlayerClickedOwnCell(this.player.name) && this.gameController.isCellAttacked(x, y))
                    cellType = CellType.ATTACKED;

                else if (this.gameController.isCombatGoing()
                    && this.props.player.cells[x][y] === CellType.HAS_SHIP)
                    cellType = this.gameController.isPlayerClickedOwnCell(this.player.name) ? CellType.EMPTY : CellType.HAS_SHIP;

                return <Cell
                    key={`${x}${y}`}
                    cellType={cellType}
                    onCellClick={this.props.onCellClick(x, y)}
                />
            }
        );

        return <div className="board">
            <span className="board__player-name">{this.props.player.name}</span>
            <span className="board__player-state">{this.props.gameController.getPlayerState()}</span>
            <div className="cell-list"
                 style={
                     {
                         width: `calc(${boardWidth} * ${cellSize})`,
                         height: `calc(${boardHeight} * ${cellSize})`
                     }
                 }>
                {cellList}
            </div>
            {this.props.player.name === this.props.gameController.player.name && this.props.children}
        </div>;
    }
}

export default Board