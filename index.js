const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('new user', (msg) => {
        io.emit('new user', msg);
        console.log('here')
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('typing', (msg) => {
        io.emit('typing', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
