export default {
    hostingPort: 8087,
    apiSettings: {
        enabledApi: true,
        apiUrl: "https://l1-api1.lumigame.com",
        authUrl: "https://l1-auth1.lumigame.com",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        requestTimeout: 10000,
        placeBetTimeout: 2000,
        enabledApiLogs: true,
    },
    gameManagementApiSettings: {
        BASE: "https://l1-proxy1.lumigame.com/game-management-service",
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://127.0.0.1:27017",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "http://e6e2bdc2d3ab40c682d0d27c1b1f912a@sentry.lumigame.com/13",
        logIdentifier: "FootballDice",
        env: "LOCAL",
    },
    authenticateSettings: {
        url: "https://l1-auth1.lumigame.com/",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: true,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "http://127.0.0.1:5000",
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableMsgpackParser: false,
    otel: {
        system: "SG",
        enabled: true,
        endpoint: "https://jaeger-collector.lumigame.com/v1/traces",
    },
};
