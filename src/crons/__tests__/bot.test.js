import { TableGameBot } from "sc-game-base/src/table/crons";
import GameData from "../../game-data";
import Bot from "../bot";
import Chance from "chance";

describe("Bot", () => {
    const gameManagementApiClientFactory = {
        instance: jest.fn(),
    };
    const definition = {};
    const gameData = new GameData();
    const publisher = {};

    let botInstance;

    beforeEach(() => {
        botInstance = new Bot(definition, gameData, publisher, gameManagementApiClientFactory);
    });

    describe("constructor", () => {
        it("should initialize betStrategy, maxBetStrategy, mainChoice, and chance", () => {
            // Assert
            expect(botInstance.betStrategy).toEqual([
                { weight: 45, choice: "home" },
                { weight: 45, choice: "away" },
                { weight: 10, choice: "draw" },
            ]);
            expect(botInstance.maxBetStrategy).toEqual([
                { weight: 60, getMaxBet: expect.any(Function) },
                { weight: 30, getMaxBet: expect.any(Function) },
                { weight: 20, getMaxBet: expect.any(Function) },
            ]);
            expect(botInstance.mainChoice).toEqual(["home", "away"]);
        });
    });

    describe("getBetChoice", () => {
        it("should return a valid bet choice", () => {
            // Arrange
            botInstance.chance.weighted = jest.fn().mockReturnValue("home");
            const bot = { choices: ["home", "away"] };

            // Act
            const result = botInstance.getBetChoice(bot);

            // Assert
            expect(result).toBe("home");
        });

        it("should return a main choice if available", () => {
            // Arrange
            botInstance.chance.weighted = jest.fn().mockReturnValue("home");
            const bot = { choices: ["home", "draw"] };

            // Act
            const result = botInstance.getBetChoice(bot);

            // Assert
            expect(result).toBe("home");
        });
    });

    describe("getMaxBet", () => {
        it("should return the maximum bet based on strategies", () => {
            // Arrange
            const bot = {};
            const choice = "home";
            const maxBet = 1000;
            const strategy = { getMaxBet: jest.fn().mockReturnValueOnce(maxBet) };
            botInstance.chance.weighted = jest.fn().mockReturnValue(strategy);
            botInstance.getMinBet = jest.fn().mockReturnValue(10);
            botInstance.gameData = { gameConfigs: { choices_maxbet: { home: 100 }, bot_maxbet: 200 } };

            // Act
            const result = botInstance.getMaxBet(bot, choice);

            // Assert
            expect(result).toBe(maxBet);
        });
    });

    describe("convertAmountToChip", () => {
        it("should return the appropriate chip", () => {
            // Arrange
            const amount = 100;

            // Act
            const result = botInstance.convertAmountToChip(amount);

            // Assert
            expect(result).toBe(100);
        });
    });

    describe("updateBotInRoomData", () => {
        it("should update betCount and call super method", () => {
            // Arrange
            spyOn(TableGameBot.prototype, "updateBotInRoomData");
            botInstance.gameData = { betCount: { home: 0, away: 0, draw: 1 } };
            const bot = { choices: ["draw"], betOnChoices: { home: 0, draw: 10 } };
            const choice = "home";
            const amount = 10;
            const balance = 100;

            // Act
            botInstance.updateBotInRoomData(bot, choice, amount, balance);

            // Assert
            expect(botInstance.gameData.betCount[choice]).toBe(1);
            expect(botInstance.gameData.betCount["draw"]).toBe(1);
            expect(TableGameBot.prototype.updateBotInRoomData).toHaveBeenCalledWith(bot, choice, amount, balance);
        });
    });
});
