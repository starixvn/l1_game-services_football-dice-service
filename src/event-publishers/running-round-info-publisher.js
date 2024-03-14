import { Core } from "sc-game-base";

export class RunningRoundInfoPublisher extends Core.BaseEventPublishers.RunningRoundInfoPublisher {
    publish() {
        super.publish();

        this.publishBetPercentage();
    }

    publishBetPercentage() {
        const { betCount } = this.gameData;
        const choices = Object.keys(betCount);

        if (choices.length) {
            const userBetPercentage = this.calculateBetPercentage(betCount);
            this.publishToAllUsers({ userBetPercentage });
        }
    }

    calculateBetPercentage(betCount) {
        const totalBetCount = Object.values(betCount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const home = parseInt(((betCount.home ?? 0) * 100) / totalBetCount);
        const draw = parseInt(((betCount.draw ?? 0) * 100) / totalBetCount);
        const away = 100 - home - draw;

        return { home, draw, away };
    }
}
