import { TableProcessBetQueue } from "sc-game-base/src/table/crons";
import ProcessBetQueue from "../process-bet-queue";
import GameData from "../../game-data";
import Chance from "chance";

describe("processBetQueue", () => {
    const chance = new Chance();
    const player = {
        profile: { name: chance.name() },
    };
    const bet = {
        betChoice: "home",
    };
    const rate = {};
    let gameData = new GameData();
    const gameManagementApiClientFactory = { instance: jest.fn() };

    let processBetQueue;

    beforeEach(() => {
        gameData = new GameData();
        processBetQueue = new ProcessBetQueue({ gameData, gameManagementApiClientFactory });
    });

    describe("adjustTotalBets", () => {
        it("should call super.adjustTotalBets", () => {
            // Arrange
            spyOn(TableProcessBetQueue.prototype, "adjustTotalBets");

            // Act
            processBetQueue.adjustTotalBets(player, bet, rate);
        });

        describe("when first bet on choice", () => {
            it("should increase bet count", () => {
                // Act
                processBetQueue.adjustTotalBets(player, bet, rate);

                // Assert
                expect(gameData.betCount[bet.betChoice]).toBe(1);
            });
        });

        describe("when NOT first bet on choice", () => {
            it("should NOT increase bet count", () => {
                // Arrange
                gameData.ingame[player.profile.name] = { ownBets: { [bet.betChoice]: 1 } };

                // Act
                processBetQueue.adjustTotalBets(player, bet, rate);

                // Assert
                expect(gameData.betCount[bet.betChoice]).toBe(0);
            });
        });
    });
});
