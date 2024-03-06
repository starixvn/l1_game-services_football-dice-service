import mongoose from "mongoose";

const modelName = "footballdice_rounds";

const resultSchema = new mongoose.Schema(
    {
        home: { type: Number },
        away: { type: Number },
    },
    { _id: false }
);

const settlementResultSchema = new mongoose.Schema(
    {
        home: { type: Number },
        away: { type: Number },
        tie: { type: Number },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: resultSchema,
    settlementResult: settlementResultSchema,
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, required: true },
});

export default mongoose.model(modelName, Schema);
