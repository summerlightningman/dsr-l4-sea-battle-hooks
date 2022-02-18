import {GameStage, PlayerNum} from "../types/common";
import Player from "./player";
import {CellCoords} from "../types/game-state";
import {isEquals} from "../functions";
import {emptyTargetCell} from "../config";

class GameState {
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
        this.toggleTarget = this.toggleTarget.bind(this);
        this.isTargetEmpty = this.isTargetEmpty.bind(this);
        this.getActionButtonName = this.getActionButtonName.bind(this);
    }

    private clone(){
        return new GameState(this.player, this.stage);
    }

    toggleTarget(x: number, y: number) {
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
            default:
                return false
        }
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
}

export default GameState