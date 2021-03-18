import {Socket} from "socket.io";
import {socketEvent} from "./models";

let socketIO;

module.exports.socketConnections = {
    list: [],
    sendGameState: function (gs: socketEvent){
        this.list.forEach(s => {
            s.emit('game-state', gs);
        })
    }
}

module.exports.startSocket = function (_io){
    socketIO = _io;
    socketIO.on('connection', (socket) => {
        console.log('socket -> connect');
        exports.socketConnections.list.push(socket);
        socket.on('disconnect', function (){
            console.log('socket -> disconnect');
            if ( exports.socketConnections.list.some(s => s === socket)){
                exports.socketConnections.list.slice(
                    exports.socketConnections.list.findIndex(ss => ss === socket), 1
                )
                console.log('socket -> delete connection');
            }
        });
    })
    console.log('socket strated');
}
