import { betChoices } from "./constants";

export default {
    id: 75,
    name: "footballdice",
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
