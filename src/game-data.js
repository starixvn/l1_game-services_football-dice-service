import { Table } from "sc-game-base";

export default class GameData extends Table.TableGameData {
    constructor(remainingTime) {
        super(remainingTime);
        this.betCount = {
            home: 0,
            away: 0,
            draw: 0,
        };
    }
}
