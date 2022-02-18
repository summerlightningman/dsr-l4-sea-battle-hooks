import {GameStage} from "../types/common";
import Player from "./player";

class GameState {
    stage: GameStage;
    player: Player;

    constructor(player: Player, stage = GameStage.SHIP_PLACEMENT) {
        this.player = player;
        this.stage = stage;

        this.clone = this.clone.bind(this);
        this.toString = this.toString.bind(this);
    }

    clone() {
        const gameState = new GameState(this.player);
        gameState.stage = GameStage.SHIP_PLACEMENT;
        return gameState
    }

    toString() {
        const {name, shipsRemainingForBuild} = this.player;
        switch (this.stage) {
            case GameStage.SHIP_PLACEMENT:
                return `расстановки кораблей для игрока ${name} (осталось: ${shipsRemainingForBuild()})`
            case GameStage.GAMEPLAY:
                return `сражения между игроками. Очередь игрока ${name}`
        }
    }
}

export default GameState