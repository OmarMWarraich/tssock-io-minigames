import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import LuckyNumbersGame from './luckyNumbersGame'
import RandomScreenNameGenerator from './randomScreenNameGenerator'
import Player from './player'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: socketIO.Server
    private games: { [id: number]: LuckyNumbersGame } = {}
    private randomScreenNameGenerator: RandomScreenNameGenerator
    private players: { [id: string]: Player } = {}

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use(
            '/jquery',
            express.static(
                path.join(__dirname, '../../node_modules/jquery/dist')
            )
        )
        app.use(
            '/bootstrap',
            express.static(
                path.join(__dirname, '../../node_modules/bootstrap/dist')
            )
        )

        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)

        this.games[0] = new LuckyNumbersGame(
            0,
            'Bronze Game', 
            '🥉', 
            10,
            this.updateChat
        )

        this.games[1] = new LuckyNumbersGame(
            1,
            'Silver Game', 
            '🥈', 
            16,
            this.updateChat
        )

        this.games[2] = new LuckyNumbersGame(
            2, 
            'Gold Game', 
            '🥇', 
            35,
            this.updateChat
        )

        this.randomScreenNameGenerator = new RandomScreenNameGenerator()

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            let screenName: ScreenName = this.randomScreenNameGenerator.generateRandomScreenName()

            this.players[socket.id] = new Player(screenName)

            socket.emit('playerDetails', this.players[socket.id].player)

            socket.emit('screenName', screenName)

            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id)
                if (this.players && this.players[socket.id]) {
                    delete this.players[socket.id]
                }
            })

            socket.on('chatMessage', (chatMessage: ChatMessage) => {
                socket.broadcast.emit('chatMessage', chatMessage)
            })
        })

        setInterval(() => {
            this.io.emit('GameStates', [
                this.games[0].gameState,
                this.games[1].gameState,
                this.games[2].gameState,
            ])
        }, 1000)
    }

    public updateChat = (chatMessage: ChatMessage) => {
        this.io.emit('chatMessage', chatMessage)
    }

    public Start() {
        this.server.listen(this.port)
        console.log(`Server listening on port ${this.port}.`)
    }
}

new App(port).Start()
