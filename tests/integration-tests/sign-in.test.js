import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";

describe("event signin", () => {
    it("should receive signed in response", async () => {
        const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
        // Assert
        await normalUserClientDriver.handleSignedInEvent();
        normalUserClientDriver.close();
    });
});
