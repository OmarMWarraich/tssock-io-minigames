"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LuckyNumbersGame {
    constructor(id, title, logo, duration, updateChatCallback) {
        this._gamePhase = 0;
        this._gameClock = 0;
        this._id = id;
        this._title = title;
        this._logo = logo;
        this._duration = duration;
        this._updateChatCallback = updateChatCallback;
        setInterval(() => {
            if (this._gamePhase === 0) {
                this._gameClock = this._duration;
                this._gamePhase = 1;
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
                if (this._gameClock <= -5) {
                    this._gamePhase = 0;
                }
            }
            this._gameState = {
                id: this._id,
                title: this._title,
                logo: this._logo,
                gamePhase: this._gamePhase,
                gameClock: this._gameClock,
                duration: this._duration
            };
            this._gameClock -= 1;
        }, 1000);
    }
    get gameState() {
        return this._gameState;
    }
}
exports.default = LuckyNumbersGame;
//# sourceMappingURL=luckyNumbersGame.js.map