"use strict";
class Client {
    constructor() {
        this.scrollChatWindow = () => {
            $('#messages').animate({
                scrollTop: $('#messages li:last-child').position().top,
            }, 500);
            setTimeout(() => {
                let messagesLength = $('#messages li');
                if (messagesLength.length > 10) {
                    messagesLength.eq(0).remove();
                }
            }, 500);
        };
        this.socket = io();
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', (message) => {
            console.log('Disconnected from server' + message);
            location.reload();
        });
        this.socket.on('GameStates', (gameStates) => {
            gameStates.forEach((gameState) => {
                let gid = gameState.id;
                if (gameState.gameClock >= 0) {
                    if (gameState.gameClock >= gameState.duration) {
                        $('#gamephase' + gid).text('New Game, Guess the Lucky Number');
                    }
                    $('#timer' + gid).css('display', 'block');
                    $('#timer' + gid).text(gameState.gameClock.toString());
                    var progressParent = (gameState.gameClock / gameState.duration) * 100;
                    $('#timerBar' + gid).css('background-color', '#4caf50');
                    $('#timerBar' + gid).css('width', progressParent + '%');
                }
                else {
                    $('#timerBar' + gid).css('background-color', '#ff0000');
                    $('#timerBar' + gid).css('width', '100%');
                    $('#timer' + gid).css('display', 'none');
                    $('#gamephase' + gid).text('Game Over');
                }
            });
        });
        this.socket.on('playerDetails', (player) => {
            this.player = player;
            $('#screenName').text(this.player.screenName.name);
            $('#score').text(this.player.score);
        });
        /* this.socket.on('screenName', (screenName: ScreenName) => {
            this.screenName = screenName;
            $('#screenName').text(this.screenName.name);
        });

        this.socket.on('screenName', (screenName: ScreenName) => {
            this.screenName = screenName;
            $('#screenName').text(this.screenName.name);
        }); */
        this.socket.on('chatMessage', (chatMessage) => {
            $('#messages').append("<li><span class='float-right'><span class='circle'>" +
                chatMessage.from +
                "</span></span><div class='otherMessage'>" +
                chatMessage.message +
                '</div></li>');
            this.scrollChatWindow();
        });
        $(document).ready(() => {
            $('#messageText').keypress((e) => {
                var key = e.which;
                if (key == 13) {
                    // the enter key code
                    this.sendMessage();
                    return false;
                }
            });
        });
    }
    sendMessage() {
        let messageText = $('#messageText').val();
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', {
                message: messageText,
                from: this.player.screenName.abbreviation,
            });
            $('#messages').append("<li><span class='float-right'><span class='circle'>" +
                this.player.screenName.abbreviation +
                "</span></span><div class='myMessage'>" +
                messageText +
                '</div></li>');
            /* this.socket.emit('chatMessage', <ChatMessage>{
                message: messageText,
                from: 'AB',
            })

            $('#messages').append(
                "<li><span class='float-left'><span class='circle'>AB</span></span><div class='myMessage'>" +
                    messageText +
                    '</div></li>'
            ) */
            this.scrollChatWindow();
            $('#messageText').val('');
        }
    }
    showGame(id) {
        switch (id) {
            case 0:
                $('#gamePanel1').fadeOut(100);
                $('#gamePanel2').fadeOut(100);
                $('#gamePanel0').delay(100).fadeIn(100);
                break;
            case 1:
                $('#gamePanel0').fadeOut(100);
                $('#gamePanel2').fadeOut(100);
                $('#gamePanel1').delay(100).fadeIn(100);
                break;
            case 2:
                $('#gamePanel0').fadeOut(100);
                $('#gamePanel1').fadeOut(100);
                $('#gamePanel2').delay(100).fadeIn(100);
                break;
        }
    }
}
const client = new Client();
