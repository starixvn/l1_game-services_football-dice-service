import { Table } from "sc-game-base";
import GameData from "../../game-data";
import InGameConsumer from "../in-game-consumer";
import Chance from "chance";

const gameManagementApiClientFactory = {
    instance: jest.fn(),
};

jest.mock("../../helpers/bet-percentage", () => ({
    calculateBetPercentage: jest.fn().mockReturnValue({ home: 0, away: 0, draw: 0 }),
}));

describe("inGameConsumer", () => {
    const chance = new Chance();
    const realPlayer = {
        id: chance.guid(),
    };
    const superPayload = {
        roundId: chance.natural(),
    };
    let consumer, gameData;

    beforeEach(() => {
        gameData = new GameData();
        consumer = new InGameConsumer({}, gameData, {}, {}, {}, gameManagementApiClientFactory);
        jest.spyOn(Table.EventConsumers.TableInGameConsumer.prototype, "buildPayload").mockResolvedValueOnce(superPayload);
    });

    describe("buildPayload", () => {
        it("should call super.buildPayload", async () => {
            // Act
            await consumer.buildPayload(realPlayer);

            // Assert
            expect(Table.EventConsumers.TableInGameConsumer.prototype.buildPayload).toBeCalledWith(realPlayer);
        });
        it("should return userBetPercentage", async () => {
            // Act
            const actualResult = await consumer.buildPayload(realPlayer);

            // Assert
            expect(actualResult).toStrictEqual({ ...superPayload, userBetPercentage: { home: 0, away: 0, draw: 0 } });
        });
    });
});
