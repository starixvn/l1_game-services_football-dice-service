import Chance from "chance";
import { generateResult, getSettlementResult, splitHexString, randomDiceFromHex } from "../result-helper";

describe("resultHelper", () => {
    const chance = new Chance();
    describe("splitHexString", () => {
        test.each([["0123456789ABCDEF", ["01234567", "89ABCDEF"]]])(
            "should split hex string '%s' into substrings",
            (hexString, expected) => {
                // Act
                const result = splitHexString(hexString);

                // Assert
                expect(result).toEqual(expected);
            }
        );
    });

    describe("randomDiceFromHex", () => {
        test.each([
            [chance.hash({ length: 8 }), [1, 6]],
            ["FFFFFFFF", [1, 6]],
            ["00000000", [1, 6]],
        ])("should return a random dice value from hex '%s'", (hex, expectedRange) => {
            // Act
            const result = randomDiceFromHex(hex);

            // Assert
            expect(result).toBeGreaterThanOrEqual(expectedRange[0]);
            expect(result).toBeLessThanOrEqual(expectedRange[1]);
        });
    });

    describe("generateResult", () => {
        test.each([
            [chance.hash(), true],
            ["FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", true],
            ["00000000000000000000000000000000", true],
        ])("should generate result with home and away values from hex '%s'", (finalHash, expected) => {
            // Act
            const result = generateResult(finalHash);

            // Assert
            expect(result).toHaveProperty("home");
            expect(result).toHaveProperty("away");
            expect(result.home).toHaveLength(2);
            expect(result.away).toHaveLength(2);
        });
    });

    describe("getSettlementResult", () => {
        test.each([
            [
                { home: [6, 6], away: [5, 6] },
                { home: true, away: false, draw: false },
            ],
            [
                { home: [3, 4], away: [2, 6] },
                { home: false, away: true, draw: false },
            ],
            [
                { home: [2, 3], away: [3, 2] },
                { home: false, away: false, draw: true },
            ],
        ])("should return correct settlement result for scenario %j", (result, expected) => {
            // Act
            const settlementResult = getSettlementResult(result);

            // Assert
            expect(settlementResult).toEqual(expected);
        });
    });
});
