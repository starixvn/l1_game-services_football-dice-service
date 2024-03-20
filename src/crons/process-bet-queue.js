import { Table } from "sc-game-base";

export default class ProcessBetQueue extends Table.Crons.TableProcessBetQueue {
    adjustTotalBets(player, bet, rate) {
        super.adjustTotalBets(player, bet, rate);

        const playerInGame = this.gameData.ingame[player.profile.name];
        const { betChoice } = bet;

        this.gameData.betCount[betChoice] = playerInGame?.ownBets?.[betChoice] ? 0 : 1;
    }
}
