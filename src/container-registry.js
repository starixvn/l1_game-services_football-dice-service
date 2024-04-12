import awilix from "awilix";
import { Table } from "sc-game-base";
import { bets, rounds, tmpBets, results, betLogs } from "./models/index";
import HttpRouter from "./routers/http-router";
import { RunningRoundInfoPublisher } from "./event-publishers/running-round-info-publisher";
import { Bot, GameCron, ProcessBetQueue } from "./crons";
import { InGameConsumer, SettleGameRoundConsumer } from "./consumers";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);
        this.registerPFSettings();

        return this.container;
    }

    registerPFSettings() {
        this.container.register({
            maxCombinedClientSeeds: asValue(5),
        });
    }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(rounds),
            betsRepository: asValue(bets),
            tempBetsRepository: asValue(tmpBets),
            betLogsRepository: asValue(betLogs),
            resultsRepository: asValue(results),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            httpRouter: asClass(HttpRouter),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
            bot: asClass(Bot).singleton(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            runningRoundInfoPublisher: asClass(RunningRoundInfoPublisher).singleton(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
            inGameConsumer: asClass(InGameConsumer).singleton(),
        });
    }
}
