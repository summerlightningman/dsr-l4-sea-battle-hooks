import Player from "./player";
import {CellCoords, GameStage} from "../types/game-controller";
import {PlayerList, PlayerNum} from "../types/player";
import {CellType} from "../types/cell";
import {AppState} from "../types/app";

import {emptyTargetCell} from "../config";

import {isEquals} from "../functions";

class GameController {
    stage: GameStage;
    player: Player;
    attackedCell: CellCoords;

    constructor(player: Player, stage: GameStage = GameStage.SHIP_PLACEMENT) {
        this.player = player;
        this.stage = stage;
        this.attackedCell = emptyTargetCell;


        this.toString = this.toString.bind(this);
        this.isReadyForNextStage = this.isReadyForNextStage.bind(this);
        this.clone = this.clone.bind(this);
        this.isTargetEmpty = this.isTargetEmpty.bind(this);
        this.getEnemyPlayerName = this.getEnemyPlayerName.bind(this);
        this.goToNextStage = this.goToNextStage.bind(this);
        this.getStateForShipPlacement = this.getStateForShipPlacement.bind(this)
        this.getStateForCellMark = this.getStateForCellMark.bind(this);
    }

    private clone() {
        return new GameController(this.player, this.stage);
    }

    getStateForCellMark(players: PlayerList, playerNum: PlayerNum, x: number, y: number) {
        const updatedGameController = this.clone();
        if (isEquals(this.attackedCell, emptyTargetCell))
            updatedGameController.attackedCell = [x, y];
        else
            updatedGameController.attackedCell = emptyTargetCell;
        return {
            gameController: updatedGameController
        }
    }

    isTargetEmpty() {
        return isEquals(this.attackedCell, emptyTargetCell)
    }

    isReadyForNextStage(): boolean {
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                if (this.player.name === PlayerNum.ONE && !this.player.shipsRemainingForBuild())
                    return true
                return this.player.name === PlayerNum.TWO && !this.player.shipsRemainingForBuild();
            case GameStage.MOVE_CONFIRMATION:
                return true
            case GameStage.GAMEPLAY:
                return !this.isTargetEmpty()
            case GameStage.MOVE_FINISHED:
                return true
            default:
                return false
        }
    }

    allShipsWasPlaced(players: PlayerList) {
        return !players[PlayerNum.ONE].shipsRemainingForBuild() && !players[PlayerNum.TWO].shipsRemainingForBuild()
    }

    goToNextStage(state: AppState): Pick<AppState, 'players' | 'gameController'> {
        let {players, gameController} = state;
        const enemy: Player = players[this.getEnemyPlayerName()];

        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                gameController = this.allShipsWasPlaced(players)
                    ? new GameController(players[PlayerNum.ONE], GameStage.MOVE_CONFIRMATION)
                    : new GameController(players[PlayerNum.TWO], GameStage.SHIP_PLACEMENT)
                break;

            case GameStage.MOVE_CONFIRMATION:
                gameController = new GameController(this.player, GameStage.GAMEPLAY)
                break;

            case GameStage.GAMEPLAY:
                const [x, y] = this.attackedCell;
                const enemyName = this.getEnemyPlayerName();
                const updatedEnemy = enemy.attack(x, y);

                if (updatedEnemy.cells[x][y] === CellType.KILLED) {
                    alert('Убил');
                    if (updatedEnemy.isLost()) {
                        alert(`Победил игрок ${this.player.name}. Поздравляем! 🥳🎉`);
                        gameController = new GameController(this.player, GameStage.ENDGAME);
                    } else {
                        gameController = new GameController(this.player, GameStage.GAMEPLAY)
                    }
                    players = {...players, [enemyName]: updatedEnemy}
                }

                alert('Промах');
                gameController = new GameController(this.player, GameStage.MOVE_FINISHED)
                break;

            case GameStage.MOVE_FINISHED:
                gameController = new GameController(enemy, GameStage.MOVE_CONFIRMATION)
                break;
            default:
                break;
        }
        return {players, gameController}
    }

    getStateForShipPlacement(players: PlayerList, playerNum: PlayerNum, x: number, y: number): Partial<AppState> {
        if (this.player.name !== playerNum)
            return {}

        const player = players[playerNum];

        return {
            players: {...players, [playerNum]: player.placeShip(x, y)}
        }
    }

    getEnemyPlayerName(): PlayerNum {
        return this.player.name === PlayerNum.ONE ? PlayerNum.TWO : PlayerNum.ONE
    }


    getPlayerState(): string {
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                return `Осталось поставить кораблей: ${this.player.shipsRemainingForBuild()}`
            default:
                return ''
        }
    }
}

export default GameController