import { Table } from "sc-game-base";

export default class SettleGameRoundConsumer extends Table.EventConsumers.TableSettleGameRoundConsumer {
    calculateBetResult(settlementResult, bet, odds) {
        if (settlementResult.draw) {
            const drawOdds = settlementResult.draw12 ? odds.draw12 : odds.draw;
            const winAmount = bet.draw * drawOdds;

            return {
                totalBetAmount: bet.totalAmount,
                totalWin: +(bet.home + bet.away + winAmount).toFixed(2),
                netWin: winAmount > 0 ? +(winAmount - bet.draw).toFixed(2) : 0,
                totalLost: 0,
                winningByChoices: { draw: winAmount },
            };
        } else {
            return super.calculateBetResult(settlementResult, bet, odds);
        }
    }
}
