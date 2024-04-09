import SettleGameRoundConsumer from "../settle-game-round-consumer";
import { Table } from "sc-game-base";

describe("SettleGameRoundConsumer", () => {
    const gameManagementApiClientFactory = { instance: jest.fn() };
    const odds = {
        home: 1.96,
        away: 1.96,
        draw: 8,
        draw12: 50,
    };
    let consumer;

    beforeEach(() => {
        consumer = new SettleGameRoundConsumer({ gameManagementApiClientFactory });
    });

    describe("calculateBetResult", () => {
        it("should calculate bet result for draw scenario", () => {
            // Arrange
            const settlementResult = { draw: true, draw12: false };
            const bet = { totalAmount: 7, home: 5, away: 0, draw: 2 };

            // Act
            const result = consumer.calculateBetResult(settlementResult, bet, odds);

            // Assert
            expect(result).toStrictEqual({
                totalBetAmount: 7,
                totalWin: 21,
                netWin: 14,
                totalLost: 0,
                winningByChoices: { draw: 16 },
            });
        });

        it("should calculate bet result for draw12 scenario", () => {
            // Arrange
            const settlementResult = { draw: true, draw12: true };
            const bet = { totalAmount: 5, home: 0, away: 3, draw: 2 };

            // Act
            const result = consumer.calculateBetResult(settlementResult, bet, odds);

            // Assert
            expect(result).toStrictEqual({
                totalBetAmount: 5,
                totalWin: 103,
                netWin: 98,
                totalLost: 0,
                winningByChoices: { draw: 100 },
            });
        });

        it("should delegate calculation to super class for non-draw scenarios", () => {
            // Arrange
            const expectedResult = { betResult: true };
            const settlementResult = { draw: false };
            const bet = { totalAmount: 10, home: 5, away: 3, draw: 2 };
            jest.spyOn(Table.EventConsumers.TableSettleGameRoundConsumer.prototype, "calculateBetResult").mockReturnValueOnce(
                expectedResult
            );

            // Act
            const result = consumer.calculateBetResult(settlementResult, bet, odds);

            // Assert
            expect(result).toStrictEqual(expectedResult);
        });
    });
});
