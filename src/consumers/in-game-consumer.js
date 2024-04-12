import { Table } from "sc-game-base";
import { calculateBetPercentage } from "../helpers/bet-percentage";

export default class InGameConsumer extends Table.EventConsumers.TableInGameConsumer {
    async buildPayload(realPlayer) {
        const payload = await super.buildPayload(realPlayer);
        const { betCount } = this.gameData;

        return {
            ...payload,
            userBetPercentage: calculateBetPercentage(betCount),
        };
    }
}
