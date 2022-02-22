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
        this.placeShip = this.placeShip.bind(this)
        this.markCell = this.markCell.bind(this);
        this.isPlayerClickedOwnCell = this.isPlayerClickedOwnCell.bind(this);
        this.isCombatGoing = this.isCombatGoing.bind(this);
        this.isCellAttacked = this.isCellAttacked.bind(this);
    }

    private clone() {
        return new GameController(this.player, this.stage);
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

    placeShip(playerNum: PlayerNum, x: number, y: number) {
        return (state: AppState) => {
            if (this.player.name !== playerNum)
                return {players: state.players}

            const player = state.players[playerNum];
            const updatedPlayer = player.placeShip(x, y);

            return {
                players: {...state.players, [playerNum]: updatedPlayer}
            }
        }
    }

    getEnemyPlayerName(): PlayerNum {
        return this.player.name === PlayerNum.ONE ? PlayerNum.TWO : PlayerNum.ONE
    }

    markCell(playerNum: PlayerNum, x: number, y: number) {
        const updatedGameController = this.clone();
        updatedGameController.attackedCell = isEquals(this.attackedCell, emptyTargetCell)
            ? [x, y]
            : emptyTargetCell;
        return () => ({
            gameController: updatedGameController
        })
    }

    getPlayerState(): string {
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                return `Осталось поставить кораблей: ${this.player.shipsRemainingForBuild()}`
            default:
                return ''
        }
    }

    isPlayerClickedOwnCell(playerNum: PlayerNum) {
        return playerNum === this.player.name
    }

    isCellAttacked(x: number, y: number) {
        return isEquals(this.attackedCell, [x, y])
    }

    isCombatGoing() {
        const combatGameStages = [
            GameStage.GAMEPLAY,
            GameStage.MOVE_FINISHED
        ]
        return combatGameStages.includes(this.stage)
    }
}

export default GameController