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
    public showGame(id: number) {
        switch (id) {
            case 0:
                $('#gamePanel1').fadeOut(100)
                $('#gamePanel2').fadeOut(100)
                $('#gamePanel0').delay(100).fadeIn(100)
                break
            case 1:
                $('#gamePanel0').fadeOut(100)
                $('#gamePanel2').fadeOut(100)
                $('#gamePanel1').delay(100).fadeIn(100)
                break
            case 2:
                $('#gamePanel0').fadeOut(100)
                $('#gamePanel1').fadeOut(100)
                $('#gamePanel2').delay(100).fadeIn(100)
                break
        }
    }
}

const client = new Client();