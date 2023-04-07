"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const luckyNumbersGame_1 = __importDefault(require("./luckyNumbersGame"));
const randomScreenNameGenerator_1 = __importDefault(require("./randomScreenNameGenerator"));
const player_1 = __importDefault(require("./player"));
const port = 3000;
class App {
    constructor(port) {
        this.games = {};
        this.players = {};
        this.updateChat = (chatMessage) => {
            this.io.emit('chatMessage', chatMessage);
        };
        this.port = port;
        const app = (0, express_1.default)();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        app.use('/jquery', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/jquery/dist')));
        app.use('/bootstrap', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/bootstrap/dist')));
        this.server = new http_1.default.Server(app);
        this.io = new socket_io_1.default.Server(this.server);
        this.games[0] = new luckyNumbersGame_1.default(0, 'Bronze Game', '🥉', 10, this.updateChat);
        this.games[1] = new luckyNumbersGame_1.default(1, 'Silver Game', '🥈', 16, this.updateChat);
        this.games[2] = new luckyNumbersGame_1.default(2, 'Gold Game', '🥇', 35, this.updateChat);
        this.randomScreenNameGenerator = new randomScreenNameGenerator_1.default();
        this.io.on('connection', (socket) => {
            console.log('a user connected : ' + socket.id);
            let screenName = this.randomScreenNameGenerator.generateRandomScreenName();
            this.players[socket.id] = new player_1.default(screenName);
            socket.emit('playerDetails', this.players[socket.id].player);
            socket.emit('screenName', screenName);
            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id);
                if (this.players && this.players[socket.id]) {
                    delete this.players[socket.id];
                }
            });
            socket.on('chatMessage', (chatMessage) => {
                socket.broadcast.emit('chatMessage', chatMessage);
            });
        });
        setInterval(() => {
            this.io.emit('GameStates', [
                this.games[0].gameState,
                this.games[1].gameState,
                this.games[2].gameState,
            ]);
        }, 1000);
    }
    Start() {
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}.`);
    }
}
new App(port).Start();
//# sourceMappingURL=server.js.map