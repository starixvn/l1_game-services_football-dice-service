import { TableGameCron } from "sc-game-base/src/table/crons";
import GameData from "../../game-data";
import GameCron from "../game-cron";

describe("gameCrons", () => {
    const gameData = new GameData();
    const gameManagementApiClientFactory = { instance: jest.fn() };

    it("should inherit TableGameCron", () => {
        // Act
        const cron = new GameCron({ gameData, gameManagementApiClientFactory });

        // Assert
        expect(cron instanceof TableGameCron);
    });

    describe("constructor", () => {
        it("should call super", () => {
            // Arrange
            spyOn(TableGameCron.prototype, "resetForNewRound");
            const cron = new GameCron({ gameData, gameManagementApiClientFactory });

            // Act
            cron.resetForNewRound();

            // Assert
            expect(TableGameCron.prototype.resetForNewRound).toBeCalled();
        });
    });
});
