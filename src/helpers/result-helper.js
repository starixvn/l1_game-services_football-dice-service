import Chance from "chance";

const chance = new Chance();

const generateResult = (finalHash) => {
    return chance.pickone([
        { home: [5, 4], away: [2, 3] },
        { home: [4, 2], away: [3, 3] },
        { home: [1, 1], away: [6, 5] },
    ]);
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
