import HttpRouter from "../http-router";

jest.mock("sc-common", () => ({
    utils: {
        authentication: {
            useAuthenticate: jest.fn(() => (req, res, next) => next()),
        },
    },
}));

jest.mock("sc-game-base", () => ({
    Table: {
        Routers: {
            TableHttpRouter: class {
                init(app) {}
            },
        },
    },
}));

describe("HttpRouter", () => {
    let app;
    let httpRouter;
    let logServiceMock;
    let gameDataMock;
    let reqMock;
    let resMock;

    beforeEach(() => {
        app = {
            post: jest.fn(),
        };

        logServiceMock = {
            logError: jest.fn(),
            logWarning: jest.fn(),
        };

        gameDataMock = {
            roundId: "12345",
            settlementResultFromAdmin: null,
        };

        reqMock = {
            body: {},
        };

        resMock = {
            send: jest.fn(),
        };

        httpRouter = new HttpRouter();
        httpRouter.appConfigs = {
            apiSettings: { authUrl: "http://auth-url" },
            authenticateSettings: { audiences: ["audience1"] },
        };
        httpRouter.logService = logServiceMock;
        httpRouter.gameData = gameDataMock;

        httpRouter.init(app);
    });

    describe("init", () => {
        it("should initialize route with authentication", () => {
            // Assert
            expect(app.post).toHaveBeenCalledWith("/api/set-result", expect.any(Function), expect.any(Function));
        });
    });

    describe("handleSetResult", () => {
        it("should return successful response for valid set result request", () => {
            // Arrange
            reqMock.body = { result: "win", roundId: "67890" };

            // Act
            httpRouter.handleSetResult(reqMock.body, resMock);

            // Assert
            expect(resMock.send).toHaveBeenCalledWith({ isSuccessful: true, roundId: "67890" });
        });

        it("should log warning for valid set result request", () => {
            // Arrange
            reqMock.body = { result: "win", roundId: "67890" };

            // Act
            httpRouter.handleSetResult(reqMock.body, resMock);

            // Assert
            expect(logServiceMock.logWarning).toHaveBeenCalledWith('receives a result cheating call with the result as "win".');
        });

        it("should update game data for valid set result request", () => {
            // Arrange
            reqMock.body = { result: "win", roundId: "67890" };

            // Act
            httpRouter.handleSetResult(reqMock.body, resMock);

            // Assert
            expect(gameDataMock.settlementResultFromAdmin).toEqual({
                result: "win",
                roundId: "67890",
            });
        });

        it("should return false for request with missing result", () => {
            // Arrange
            reqMock.body = {};

            // Act
            httpRouter.handleSetResult(reqMock.body, resMock);

            // Assert
            expect(resMock.send).toHaveBeenCalledWith(false);
        });

        it("should log error for request with missing result", () => {
            // Arrange
            reqMock.body = {};

            // Act
            httpRouter.handleSetResult(reqMock.body, resMock);

            // Assert
            expect(logServiceMock.logError).toHaveBeenCalledWith("receives a result cheating call with invalid params.");
        });

        it("should not update game data for request with missing result", () => {
            // Arrange
            reqMock.body = {};

            // Act
            httpRouter.handleSetResult(reqMock.body, resMock);

            // Assert
            expect(gameDataMock.settlementResultFromAdmin).toBeNull();
        });
    });
});
