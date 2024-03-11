import Chance from "chance";

const chance = new Chance();

const generateResult = (finalHash) => {
    return {
        home: [chance.integer({ min: 1, max: 6 }), chance.integer({ min: 1, max: 6 })],
        away: [chance.integer({ min: 1, max: 6 }), chance.integer({ min: 1, max: 6 })],
    };
};

const getSettlementResult = (result) => {
    const homeVal = result.home[0] + result.home[1];
    const awayVal = result.away[0] + result.away[1];

    return {
        home: homeVal > awayVal,
        away: awayVal > homeVal,
        draw: homeVal === awayVal,
    };
};

export { generateResult, getSettlementResult };
