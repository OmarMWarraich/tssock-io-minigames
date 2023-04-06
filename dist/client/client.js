"use strict";
class Client {
    constructor() {
        this.socket = io();
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', (message) => {
            console.log('Disconnected from server' + message);
            location.reload();
        });
    }
}
