import {GameStage, PlayerNum} from "../types/common";
import Player from "./player";

class GameState {
    stage: GameStage;
    player: Player;

    constructor(player: Player, stage: GameStage = GameStage.SHIP_PLACEMENT) {
        this.player = player;
        this.stage = stage;


        this.toString = this.toString.bind(this);
        this.isReadyForNextStage = this.isReadyForNextStage.bind(this);
    }


    isReadyForNextStage() {
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                if (this.player.name === PlayerNum.ONE && !this.player.shipsRemainingForBuild())
                    return true
                return this.player.name === PlayerNum.TWO && !this.player.shipsRemainingForBuild();
            case GameStage.MOVE_CONFIRMATION:
                return false
            case GameStage.GAMEPLAY:
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
}

export default GameState