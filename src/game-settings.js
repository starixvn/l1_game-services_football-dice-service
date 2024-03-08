
export default {
    id: 75,
    name: "footballdice",
    durations: {
        wholeRound: 36,
        placingBets: 25,
        lockingBet: 3,
    },
    choices: ["home", "away", "draw"],
    choicesMapper: { home: 1, away: 2, tie: 3 },
    hedgeBetGroups: [["home", "draw"]],
    numberOfRoundHistory: 100,
};
