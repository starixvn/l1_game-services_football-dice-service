import { Table } from "sc-game-base";
import Chance from "chance";

export default class Bot extends Table.Crons.TableGameBot {
    constructor(definition, gameData, publisher, gameManagementApiClientFactory, tempBetsRepository, provablyFairConsumer) {
        super(definition, gameData, publisher, gameManagementApiClientFactory, tempBetsRepository, provablyFairConsumer);

        this.betStrategy = [
            { weight: 45, choice: "home" },
            { weight: 45, choice: "away" },
            { weight: 10, choice: "draw" },
        ];

        this.maxBetStrategy = [
            { weight: 40, getMaxBet: (minBet, maxBet) => Math.min(minBet * 50, 0.3 * maxBet) },
            { weight: 30, getMaxBet: (minBet, maxBet) => Math.min(minBet * 10, 0.3 * maxBet) },
            { weight: 30, getMaxBet: (minBet, maxBet) => maxBet },
        ];

        this.mainChoice = ["home", "away"];
        this.chance = new Chance();
    }

    getBetChoice(bot) {
        const weights = this.betStrategy.map((setting) => setting.weight);
        const choices = this.betStrategy.map((setting) => setting.choice);
        const randomChoice = this.chance.weighted(choices, weights);
        const botMainChoice = bot.choices.find((choice) => this.mainChoice.includes(choice));

        if (this.mainChoice.includes(randomChoice) && botMainChoice) {
            return botMainChoice;
        }

        return randomChoice;
    }

    getMaxBet(bot, choice) {
        const gameConfigs = this.gameData.gameConfigs;
        const minBet = this.getMinBet();
        const maxBetPerChoice = gameConfigs.choices_maxbet[choice];
        const botMaxBet = gameConfigs.bot_maxbet;
        const maxBet = Math.min(maxBetPerChoice, botMaxBet);
        const weights = this.maxBetStrategy.map((setting) => setting.weight);

        return this.chance.weighted(this.maxBetStrategy, weights).getMaxBet(minBet, maxBet);
    }
}
