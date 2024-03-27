import mongoose from "mongoose";
import { middlewares } from "sc-common";
import {
    createDummyCurrency,
    createDummyUsers,
    createExchangeRate,
    createGameConfig,
    createPartnerConfig,
} from "sc-game-service-integration-utils";
import { createCurrencyGroupGames } from "./currency-group-games-stub";

import configs from "../../../src/app-configs.IGT";
import { rounds } from "../../../src/models";
import { currencyData, game, gameConfig, rounds as roundDatas } from "./test-data";

const connectDatabase = async () => {
    await middlewares.database.configureDatabase(mongoose, configs.database);
    await clearAllData();
};

const clearAllData = async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany();
    }
};

const createTestData = async () => {
    await connectDatabase();
    await createExchangeRate();
    await createGameConfig(gameConfig);
    const partnerConfig = await createPartnerConfig(game.id);
    const currency = await createDummyCurrency(partnerConfig.partnerId, currencyData.code, currencyData.name);
    await createCurrencyGroupGames(currency.groupId, game.id, gameConfig);
    await createDummyUsers(currency);
    await createRounds();

    console.log("Create exchange rate, game config & dummy user for testing successfully!");
    process.exit(0);
};

const createRounds = async () => {
    return rounds.insertMany(roundDatas);
};

createTestData();
