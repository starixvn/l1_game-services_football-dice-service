import { Core } from "sc-game-base";
import { calculateBetPercentage } from "../helpers/bet-percentage";

export class RunningRoundInfoPublisher extends Core.BaseEventPublishers.RunningRoundInfoPublisher {
    publish() {
        super.publish();

        this.publishBetPercentage();
    }

    publishBetPercentage() {
        const { betCount } = this.gameData;

        this.publishToAllUsers({ userBetPercentage: calculateBetPercentage(betCount) });
    }
}
