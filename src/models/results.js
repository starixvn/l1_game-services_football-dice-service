import { Core } from "sc-game-base";
import mongoose from "mongoose";

export default mongoose.model("footballdice_results", Core.Models.ResultSchema);
