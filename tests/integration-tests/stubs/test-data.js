const game = {
    id: 78,
    name: "FootballDice",
};

const gameConfig = {
    time: new Date(),
    type: 1,
    name: "footballdice",
    displayName: "",
    enabled: true,
    botenabled: false,
    minbet: 1,
    maxbet: 2000,
    disabledround: null,
    bot_maxbet: 2000,
    hour_maxbot: [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    disabled_message: "Game đang được bảo trì, vui lòng quay lại sau 10 phút.",
    choices_maxbet: {
        home: 2000,
        away: 2000,
        draw: 500,
    },
    odds: {
        home: 1.96,
        away: 1.96,
        draw: 8,
    },
    delayStartTime: 0,
    enableFreeBet: false,
    slotsConfig: null,
    siteExclusions: [],
    smartBotEnabled: false,
    smartBotGroupRatio: 0,
    gameId: 78,
    randomMode: 1,
    cascadingSlotsConfig: null,
    slotRNGConfig: null,
    crashConfig: null,
};

const currencyData = { code: "USD", name: "$US" };

const rounds = [
    {
        time: new Date(),
        id: 1,
        result: {
            home: [4, 2],
            away: [3, 3],
        },
        settlementResult: {
            home: false,
            away: false,
            draw: true,
        },
        exchangeRateId: 4817,
        __v: 0,
    },
];

const socketOptions = {
    socketUri: "http://localhost:5001/user/footballdice",
    gameName: game.name,
    proxyRoute: "/socket.io",
};

export { currencyData, game, gameConfig, rounds, socketOptions };

