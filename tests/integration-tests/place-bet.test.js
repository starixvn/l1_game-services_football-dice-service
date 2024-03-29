import { GameClientDriver, eventTypes, normalUser } from "sc-game-service-integration-utils";
import gameSettings from "../../src/game-settings";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";

jest.setTimeout(60000);

function getTimeOutToPlacingBetTime(remainingTime, durations) {
    let timeout = 0;
    if (remainingTime <= durations.lockingBet) {
        timeout = remainingTime + durations.wholeRound - durations.placingBets + 2;
    } else if (remainingTime >= durations.placingBets) {
        timeout = remainingTime - durations.placingBets + 1;
    }

    return timeout;
}

describe("place bet", () => {
    let inGameData, client;
    beforeAll(async () => {
        client = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        inGameData = await client.handleGameEvent((data) => data.remainingTime);
    });

    describe("when place bet in placing bet time with valid client seed", () => {
        it("should return own bet data", async () => {
            // Arrange

            const timeout = getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings.durations) * 1000;

            // Act
            setTimeout(() => {
                client.emit(eventTypes.bet, { betChoice: "home", amount: 100, clientSeed: "1000" });
            }, timeout);

            // Assert
            const data = await client.handleGameEvent((data) => data.endBet);

            expect(data.endBet).toEqual(100);
        });
    });
    describe("when place bet in placing bet time without valid client seed", () => {
        it("should return own bet = -1", async () => {
            // Arrange
            const timeout = getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings.durations) * 1000;

            // Act
            setTimeout(() => {
                client.emit(eventTypes.bet, { betChoice: "home", amount: 100 });
            }, timeout);

            // Assert
            const data = await client.handleGameEvent((data) => data.endBet);

            expect(data.endBet).toEqual(-1);
        });
    });

    afterAll(() => {
        client.close();
    });
});
