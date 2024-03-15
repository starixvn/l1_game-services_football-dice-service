const MaxHexValue = parseInt("FFFFFFFF", 16);
const MaxDiceVal = 6;

function splitHexString(hexString) {
    const substrings = [];
    for (let i = 0; i < hexString.length; i += 8) {
        substrings.push(hexString.substr(i, 8));
    }
    return substrings;
}

function randomDiceFromHex(hex) {
    const decimalVal = parseInt(hex, 16);

    return Math.floor((decimalVal / MaxHexValue) * MaxDiceVal) + 1;
}

const generateResult = (finalHash) => {
    const subHex = splitHexString(finalHash);

    return {
        home: [randomDiceFromHex(subHex[0]), randomDiceFromHex(subHex[1])],
        away: [randomDiceFromHex(subHex[2]), randomDiceFromHex(subHex[3])],
    };
};

const getSettlementResult = (result) => {
    const { home, away } = result;
    const homeVal = home[0] + home[1];
    const awayVal = away[0] + away[1];

    return {
        home: homeVal > awayVal,
        away: awayVal > homeVal,
        draw: homeVal === awayVal,
    };
};

export { generateResult, getSettlementResult };
