import Player from "../classes/player";
import {CellType} from "../types/cell";

test('player has 5 ships', () => {
    const player = new Player('Dima');

    Array(5).fill(0).forEach((_, idx) => {
        player.arena[idx][0] = CellType.HAS_SHIP;
    });

    expect(player.aliveShipsCount()).toBe(5);
})