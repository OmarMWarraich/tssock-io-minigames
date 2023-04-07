"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LuckyNumbersGame {
    constructor(id, title, logo, duration, entryPoints, players, updateChatCallback) {
        this._gamePhase = 0;
        this._gameClock = 0;
        this._result = -1;
        this._players = {};
        this._guesses = {};
        this._id = id;
        this._title = title;
        this._logo = logo;
        this._duration = duration;
        this._players = players;
        this._enterPoints = entryPoints;
        this._updateChatCallback = updateChatCallback;
        setInterval(() => {
            if (this._gamePhase === 0) {
                this._gameClock = this._duration;
                this._gamePhase = 1;
                this._result = -1;
                this._guesses = {};
                this._updateChatCallback({
                    message: 'New Game, Guess the Lucky Number',
                    from: this._logo,
                    type: 'gameMessage'
                });
            }
            else if (this._gamePhase === 1) {
                if (this._gameClock < 0) {
                    this._gamePhase = 2;
                    this._updateChatCallback({
                        message: 'Game Over, No Winner',
                        from: this._logo,
                        type: 'gameMessage'
                    });
                }
            }
            else if (this._gamePhase === 2) {
                if (this._gameClock === -2) {
                    this._result = Math.floor(Math.random() * 10) + 1;
                    this._updateChatCallback({
                        message: 'The Lucky Number is ' + this._result,
                        from: this._logo,
                        type: 'gameMessage'
                    });
                }
                else if (this._gameClock <= -5) {
                    this._gamePhase = 0;
                }
            }
            this._gameState = {
                id: this._id,
                title: this._title,
                logo: this._logo,
                gamePhase: this._gamePhase,
                gameClock: this._gameClock,
                duration: this._duration,
                result: this._result
            };
            this._gameClock -= 1;
        }, 1000);
    }
    get gameState() {
        return this._gameState;
    }
    submitGuess(playerSocketId, guess) {
        if (!this._guesses[playerSocketId]) {
            this._guesses[playerSocketId] = [];
        }
        this._players[playerSocketId].adjustScore(this._enterPoints * -1);
        this._guesses[playerSocketId].push(guess);
        if (this._guesses[playerSocketId].length === 1) {
            let chatMessage = {
                message: this._players[playerSocketId].screenName.name +
                    ' is playing',
                from: this._logo,
                type: 'gameMessage',
            };
            this._updateChatCallback(chatMessage);
        }
        return true;
    }
}
exports.default = LuckyNumbersGame;
//# sourceMappingURL=luckyNumbersGame.js.map