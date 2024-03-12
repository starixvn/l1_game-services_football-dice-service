export default {
    id: 78,
    name: "FootballDice",
    durations: {
        wholeRound: 36,
        placingBets: 25,
        lockingBet: 3,
    },
    choices: ["home", "away", "tie"],
    choicesMapper: { home: 1, away: 2, tie: 3 },
    hedgeBetGroups: [["home", "away"]],
    numberOfRoundHistory: 100,
};
