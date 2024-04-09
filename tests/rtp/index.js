import { SeedHelper, ServerSeedHelper } from "sc-game-base/src/core/helpers";
import { generateSeed } from "sc-pf-client-seed";
import { generateResult, getSettlementResult } from "../../src/helpers/result-helper";
import Chance from "chance";

const chance = new Chance();

const betChoices = ["home", "away", "draw"];

const odds = {
    home: 1.96,
    away: 1.96,
    draw: 8,
    draw12: 50,
};

const generateClientSeeds = () => {
    return [generateSeed(), generateSeed(), generateSeed(), generateSeed(), generateSeed()];
};

const exportRtpResult = (randomMode = 1, numberOfRuns = 1_000_000, choices = betChoices) => {
    let max = 0;
    let maxwin = 0;
    let diceValStat = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };
    let diceStat = [{ ...diceValStat }, { ...diceValStat }, { ...diceValStat }, { ...diceValStat }];
    let resultStat = {
        home: 0,
        draw: 0,
        away: 0,
        draw12: 0,
    };
    let totalWinAmount = 0;
    let winCount = 0;
    let totalBetAmount = 0;
    const winStreaks = {
        home: {},
        away: {},
        draw: {},
        draw12: {},
    };
    let curChoice = "";
    let curStreak = 0;

    for (let index = 0; index < numberOfRuns; index++) {
        const betAmount = chance.pickone([1, 5, 10, 50, 100]);
        const choice = chance.pickone(choices);
        totalBetAmount += betAmount;

        const clientSeeds = generateClientSeeds();
        const serverSeed = ServerSeedHelper.generateServerSeed(randomMode);
        const mergeClientSeed = SeedHelper.getMergeClientSeed(clientSeeds);
        const mergeSeed = serverSeed + mergeClientSeed;
        const finalHash = SeedHelper.getSHA512Hash(mergeSeed);
        const result = generateResult(finalHash);
        const settlementResult = getSettlementResult(result);

        const dices = result.away.concat(result.home);
        dices.forEach((dice, index) => {
            diceValStat[dice]++;
            diceStat[index][dice]++;
        });

        const winningChoice = Object.keys(settlementResult).find((choice) => settlementResult[choice]);
        Object.keys(settlementResult).forEach((key) => settlementResult[key] && resultStat[key]++);

        if (choice === winningChoice) {
            let winAmount = odds[choice] * betAmount;

            if (settlementResult.draw12) {
                winAmount = odds["draw12"] * betAmount;
            }

            winCount++;
            totalWinAmount += winAmount;
        } else {
            if (winningChoice == "draw") {
                totalWinAmount += betAmount;
            }
        }

        if (curChoice != winningChoice) {
            if (curStreak >= 4)
                winStreaks[curChoice][curStreak] = winStreaks[curChoice][curStreak] ? winStreaks[curChoice][curStreak] + 1 : 1;

            curChoice = winningChoice;
            curStreak = 1;
        } else {
            curStreak++;
        }
    }

    console.log(diceStat);
    console.log(diceValStat);
    console.log(resultStat);
    console.log(winStreaks);
    console.log({ rtp: totalWinAmount / totalBetAmount });
};

const randomMode = 1;
const rounds = 1_0_000;

exportRtpResult(randomMode, rounds, ["draw"]);
