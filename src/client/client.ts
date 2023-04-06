class Client {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io();

        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('disconnect', (message: any) => {
            console.log('Disconnected from server' + message);
            location.reload();
        });
    }
}