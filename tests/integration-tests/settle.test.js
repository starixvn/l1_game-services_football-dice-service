import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";

jest.setTimeout(60000);

describe("place bet", () => {
    let inGameData, client;
    beforeAll(async () => {
        client = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        inGameData = await client.handleGameEvent((data) => data.remainingTime);
    });

    describe("when round is finished", () => {
        it("should return finish data", async () => {
            // Assert
            const data = await client.handleGameEvent((data) => data.finish);
            expect(data.finish).not.toBeNull();
        });
    });

    afterAll(() => {
        client.close();
    });
});
