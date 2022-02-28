import Player from "./player";
import {CellCoords, GameStage} from "../types/game-controller";
import {PlayerList, PlayerNum} from "../types/player";
import {CellType} from "../types/cell";
import {AppState} from "../types/app";

import {emptyTargetCell} from "../config";

import {isEquals} from "../functions";
import GameState from "./game-state";

class GameController {
    gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;

        this.toString = this.toString.bind(this);
        this.isTargetEmpty = this.isTargetEmpty.bind(this);
        this.isReadyForNextStage = this.isReadyForNextStage.bind(this,);
        this.getEnemyPlayerName = this.getEnemyPlayerName.bind(this);
        this.goToNextStage = this.goToNextStage.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.markCell = this.markCell.bind(this);
        this.getPlayerState = this.getPlayerState.bind(this);
        this.isPlayerClickedOwnCell = this.isPlayerClickedOwnCell.bind(this);
        this.isCombatGoing = this.isCombatGoing.bind(this);
        this.isTargetCell = this.isTargetCell.bind(this);
        this.isShipPlacementNow = this.isShipPlacementNow.bind(this);
    }


    isTargetEmpty() {
        return isEquals(this.gameState.targetCell, emptyTargetCell)
    }

    getEnemyPlayerName(): PlayerNum {
        return this.gameState.currPlayer.name === PlayerNum.ONE ? PlayerNum.TWO : PlayerNum.ONE
    }

    isReadyForNextStage(): boolean {
        const {currStage, currPlayer} = this.gameState;
        switch (currStage) {
            case GameStage.SHIP_PLACEMENT:
                if (currPlayer.name === PlayerNum.ONE && !currPlayer.shipsRemainingForBuild())
                    return true
                return currPlayer.name === PlayerNum.TWO && !currPlayer.shipsRemainingForBuild();
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

    areAllShipsWerePlaced(players: PlayerList) {
        return !players[PlayerNum.ONE].shipsRemainingForBuild() && !players[PlayerNum.TWO].shipsRemainingForBuild()
    }

    goToNextStage(state: AppState): Pick<AppState, 'players' | 'gameState'> {
        let {players, gameState} = state;
        const enemy: Player = players[this.getEnemyPlayerName()];

        switch (state.gameState.currStage) {
            case GameStage.SHIP_PLACEMENT:
                gameState = this.areAllShipsWerePlaced(players)
                    ? new GameState(players[PlayerNum.ONE], GameStage.MOVE_CONFIRMATION)
                    : new GameState(players[PlayerNum.TWO], GameStage.SHIP_PLACEMENT);
                break;

            case GameStage.MOVE_CONFIRMATION:
                gameState = new GameState(gameState.currPlayer, GameStage.GAMEPLAY)
                break;

            case GameStage.GAMEPLAY:
                const [x, y] = gameState.targetCell;
                const enemyName = this.getEnemyPlayerName();
                const updatedEnemy = enemy.attack(gameState.targetCell);

                if (updatedEnemy.cells[x][y] === CellType.KILLED) {
                    alert('Убил');
                    if (updatedEnemy.isLost()) {
                        alert(`Победил игрок ${gameState.currPlayer.name}. Поздравляем! 🥳🎉`);
                        gameState = new GameState(gameState.currPlayer, GameStage.ENDGAME);
                    } else {
                        gameState = new GameState(gameState.currPlayer, GameStage.GAMEPLAY)
                    }
                    players = {...players, [enemyName]: updatedEnemy}
                }

                alert('Промах');
                gameState = new GameState(this.gameState.currPlayer, GameStage.MOVE_FINISHED);
                break;

            case GameStage.MOVE_FINISHED:
                gameState = new GameState(enemy, GameStage.MOVE_CONFIRMATION);
                break;
            default:
                break;
        }
        return {players, gameState}
    }

    placeShip(playerNum: PlayerNum, coords: CellCoords) {
        return (state: AppState) => {
            if (this.gameState.currPlayer.name !== playerNum)
                return {players: state.players}

            const player = state.players[playerNum];
            const updatedPlayer = player.placeShip(coords);

            return {
                players: {...state.players, [playerNum]: updatedPlayer}
            }
        }
    }

    markCell(playerNum: PlayerNum, coords: CellCoords) {
        const updatedGameState = new GameState(this.gameState.currPlayer, this.gameState.currStage);
        updatedGameState.targetCell = isEquals(this.gameState.targetCell, emptyTargetCell)
            ? coords
            : emptyTargetCell;
        return () => ({
            gameState: updatedGameState
        })
    }

    getPlayerState(): string {
        switch (this.gameState.currStage) {
            case GameStage.SHIP_PLACEMENT:
                return `Осталось поставить кораблей: ${this.gameState.currPlayer.shipsRemainingForBuild()}`
            default:
                return ''
        }
    }

    isPlayerClickedOwnCell(playerNum: PlayerNum) {
        return playerNum === this.gameState.currPlayer.name
    }

    isCombatGoing() {
        const combatGameStages = [
            GameStage.GAMEPLAY,
            GameStage.MOVE_FINISHED
        ];
        return combatGameStages.includes(this.gameState.currStage)
    }

    isTargetCell(coords: CellCoords) {
        return isEquals(this.gameState.targetCell, coords)
    }

    isShipPlacementNow() {
        return this.gameState.currStage === GameStage.SHIP_PLACEMENT
    }

    isMoveConfirmationNow() {
        return this.gameState.currStage === GameStage.MOVE_CONFIRMATION
    }
}

export default GameController