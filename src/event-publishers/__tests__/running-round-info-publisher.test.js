import { Core } from "sc-game-base";
import { RunningRoundInfoPublisher } from "../running-round-info-publisher";

describe("RunningRoundInfoPublisher", () => {
    let runningRoundInfoPublisher;

    beforeEach(() => {
        runningRoundInfoPublisher = new RunningRoundInfoPublisher();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("publish", () => {
        beforeEach(() => {
            jest.spyOn(Core.BaseEventPublishers.RunningRoundInfoPublisher.prototype, "publish").mockImplementation(() => {});
            runningRoundInfoPublisher.publishBetPercentage = jest.fn();
        });

        it("should call super.publish", () => {
            // Act
            runningRoundInfoPublisher.publish();

            // Assert
            expect(Core.BaseEventPublishers.RunningRoundInfoPublisher.prototype.publish).toHaveBeenCalled();
        });

        it("should call publishBetPercentage", () => {
            // Act
            runningRoundInfoPublisher.publish();

            // Assert
            expect(runningRoundInfoPublisher.publishBetPercentage).toHaveBeenCalled();
        });
    });

    describe("publishBetPercentage", () => {
        it("should publish user bet percentage if there are non-zero bets", () => {
            // Arrange
            runningRoundInfoPublisher.calculateBetPercentage = jest.fn().mockReturnValue({ home: 40, draw: 30, away: 30 });
            runningRoundInfoPublisher.publishToAllUsers = jest.fn();
            runningRoundInfoPublisher.gameData = { betCount: { home: 4, draw: 3, away: 3 } };

            // Act
            runningRoundInfoPublisher.publishBetPercentage();

            // Assert
            expect(runningRoundInfoPublisher.publishToAllUsers).toHaveBeenCalledWith({
                userBetPercentage: { home: 40, draw: 30, away: 30 },
            });
        });

        it("should not publish user bet percentage if all bets are zero", () => {
            // Arrange
            runningRoundInfoPublisher.publishToAllUsers = jest.fn();
            runningRoundInfoPublisher.gameData = { betCount: { home: 0, draw: 0, away: 0 } };

            // Act
            runningRoundInfoPublisher.publishBetPercentage();

            // Assert
            expect(runningRoundInfoPublisher.publishToAllUsers).not.toHaveBeenCalled();
        });
    });

    describe("calculateBetPercentage", () => {
        it("should calculate bet percentage correctly", () => {
            // Arrange
            const betCount = { home: 4, draw: 3, away: 3 };
            const expectedBetPercentage = { home: 40, draw: 30, away: 30 };

            // Act
            const result = runningRoundInfoPublisher.calculateBetPercentage(betCount);

            // Assert
            expect(result).toEqual(expectedBetPercentage);
        });
    });
});
