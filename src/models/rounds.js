import mongoose from "mongoose";

const modelName = "footballdice_rounds";

const resultSchema = new mongoose.Schema(
    {
        home: { type: Array },
        away: { type: Array },
    },
    { _id: false }
);

const settlementResultSchema = new mongoose.Schema(
    {
        home: { type: Boolean },
        away: { type: Boolean },
        tie: { type: Boolean },
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
