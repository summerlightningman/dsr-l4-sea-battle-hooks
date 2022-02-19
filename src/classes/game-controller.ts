import {PlayerList, PlayerNum} from "../types/player";
import Player from "./player";
import {CellCoords, GameStage} from "../types/game-controller";
import {isEquals} from "../functions";
import {emptyTargetCell} from "../config";
import {CellType} from "../types/cell";
import {AppState} from "../types/app";

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
        this.setTargetCell = this.setTargetCell.bind(this);
        this.isTargetEmpty = this.isTargetEmpty.bind(this);
        this.getActionButtonName = this.getActionButtonName.bind(this);
        this.getEnemyPlayerName = this.getEnemyPlayerName.bind(this);
        this.getStateForNextStage = this.getStateForNextStage.bind(this);
    }

    private clone() {
        return new GameController(this.player, this.stage);
    }

    setTargetCell(x: number, y: number) {
        const gameState = this.clone();
        if (isEquals(this.attackedCell, emptyTargetCell))
            gameState.attackedCell = [x, y];
        else
            gameState.attackedCell = emptyTargetCell;
        return gameState
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

    getStateForNextStage(players: PlayerList): Partial<AppState> {
        const enemy: Player = players[this.getEnemyPlayerName()];

        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                if (!players[PlayerNum.ONE].shipsRemainingForBuild() && !players[PlayerNum.TWO].shipsRemainingForBuild())
                    return {
                        gameController: new GameController(players[PlayerNum.ONE], GameStage.MOVE_CONFIRMATION)
                    }

                return {
                    gameController: new GameController(players[PlayerNum.TWO], GameStage.SHIP_PLACEMENT)
                }

            case GameStage.MOVE_CONFIRMATION:
                return {
                    gameController: new GameController(this.player, GameStage.GAMEPLAY)
                }

            case GameStage.GAMEPLAY:
                const [x, y] = this.attackedCell;
                const enemyName = this.getEnemyPlayerName();
                const updatedEnemy = enemy.attack(x, y);

                if (updatedEnemy.cells[x][y] === CellType.KILLED) {
                    alert('Убил');
                    if (updatedEnemy.isLost()) {
                        alert(`Победил игрок ${this.player.name}. Поздравляем! 🥳🎉`)
                        return {
                            gameController: new GameController(this.player, GameStage.ENDGAME),
                            players: {...players, [enemyName]: updatedEnemy}
                        }
                    }

                    return {
                        gameController: new GameController(this.player, GameStage.GAMEPLAY),
                        players: {...players, [enemyName]: updatedEnemy}
                    }
                }

                alert('Промах');
                return {
                    gameController: new GameController(this.player, GameStage.MOVE_FINISHED)
                }

            case GameStage.MOVE_FINISHED:
                return {
                    gameController: new GameController(enemy, GameStage.MOVE_CONFIRMATION)
                }
            default:
                return {}
        }
    }

    placeShip(playerNum: PlayerNum, x: number, y: number): Partial<AppState> {
        if (this.player.name === playerNum)
            return {}

        return {
            gameController: this.setTargetCell(x, y)
        }
    }

    getEnemyPlayerName(): PlayerNum {
        return this.player.name === PlayerNum.ONE ? PlayerNum.TWO : PlayerNum.ONE
    }

    toString() {
        const {name, shipsRemainingForBuild} = this.player;
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                return `расстановки кораблей для игрока ${name} (осталось: ${shipsRemainingForBuild()})`
            case GameStage.MOVE_CONFIRMATION:
                return `подтверждения хода для игрока ${name}`
            case GameStage.GAMEPLAY:
                return `сражения между игроками. Очередь игрока ${name}`
        }
    }

    getActionButtonName(): string {
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                return 'Подтвердить'
            case GameStage.MOVE_CONFIRMATION:
                return 'Начать ход'
            case GameStage.GAMEPLAY:
                return 'Атаковать'
            default:
                return ''
        }
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