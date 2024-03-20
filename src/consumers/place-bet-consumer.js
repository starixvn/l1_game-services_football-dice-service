import { Core } from "sc-game-base";

export default class PlaceBetConsumer extends Core.BaseEventConsumers.PlaceBetConsumer {
    // Temp Remove Validate ClientSeed for Client Support
    validateClientSeed(request) {
        return [
            {
                failure: false,
            },
        ];
    }
}
