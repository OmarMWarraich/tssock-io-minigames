export default class LuckyNumbersGame {
    private _id: number
    private _title: string
    private _logo: string
    private _duration: number
    private _gamePhase: number = 0
    private _gameClock: number = 0
    private _gameState: GameState

    constructor(id: number, title: string, logo: string, duration: number) {
        this._id = id
        this._title = title
        this._logo = logo
        this._duration = duration

        setInterval(() => {
            if (this._gamePhase === 0) {
                this._gameClock = this._duration
                this._gamePhase = 1
            } else if (this._gamePhase === 1) {
                if (this._gameClock < 0) {
                    this._gamePhase = 2
                }
            } else if (this._gamePhase === 2) {
                if (this._gameClock <= -5) {
                    this._gamePhase = 0
                }
            }
            this._gameState = {
                id: this._id,
                title: this._title,
                logo: this._logo,
                gamePhase: this._gamePhase,
                gameClock: this._gameClock,
                duration: this._duration
            }
            this._gameClock -= 1
        }, 1000)
    }
    public get gameState() {
        return this._gameState
    }
}