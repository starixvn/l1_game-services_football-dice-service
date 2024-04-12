import { calculateBetPercentage } from "../bet-percentage";

describe("calculateBetPercentage", () => {
    it("should return all percentages as 0 when all bet counts are 0", () => {
        // Arrange
        const betCount = { home: 0, draw: 0, away: 0 };

        // Act
        const result = calculateBetPercentage(betCount);

        // Assert
        expect(result).toEqual({ home: 0, draw: 0, away: 0 });
    });

    it("should calculate percentages correctly when bet counts are non-zero", () => {
        // Arrange
        const betCount = { home: 25, draw: 10, away: 15 };

        // Act
        const result = calculateBetPercentage(betCount);

        // Assert
        expect(result).toEqual({ home: 50, draw: 20, away: 30 });
    });

    it("should handle scenarios where only one type of bet has count", () => {
        // Arrange
        const betCount = { home: 0, draw: 0, away: 10 };

        // Act
        const result = calculateBetPercentage(betCount);

        // Assert
        expect(result).toEqual({ home: 0, draw: 0, away: 100 });
    });
});
