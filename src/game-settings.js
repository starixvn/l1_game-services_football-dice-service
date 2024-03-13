export default {
    id: 78,
    name: "FootballDice",
    durations: {
        wholeRound: 38,
        placingBets: 23,
        lockingBet: 3,
    },
    choices: ["home", "away", "draw"],
    choicesMapper: { home: 1, away: 2, draw: 3 },
    hedgeBetGroups: [["home", "away"]],
    numberOfRoundHistory: 100,
};
