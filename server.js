const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./Routes/index');
const helper = require('./utils/helper');
const frontend = require('./boot/frontend');

const contenttype = {
        gif:'image/gif',
    html:'text/html',
    js:'text/javascript'
}


http.createServer(function (req, res) {
    let body = "";


    req.on('data', chunk => body += chunk);
    req.on('end', () => {

        try {
            body = JSON.parse(body.toString());
        } catch (error) {
        }
        req.body = body;

        const url = req.url;
        let routePath = url;

        const query = helper.parseQuery(url);
        if (Object.keys(query).length > 0) req.query = query;

        const file = frontend.readPublic(routePath);
        if (!file) {
            const route = routes[routePath.toLowerCase().substring(1)] || notFoundHandler;
            route(req, res);
        } else {

            contenttype

            const extension = routePath.split('.').pop();

            res.write(file);
            res.end();
        }
    });
}).listen(81);

function notFoundHandler(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write("Nicht Gefunden");
    res.end();
}

const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};
const muenze =  Math.random() < 0.5? 0 : 1;
console.log(muenze);

io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);

    // Spieler initialisieren
    players[socket.id] = {
        x: Math.floor(Math.random() * 800), // Zufällige Startposition
        y: Math.floor(Math.random() * 600),
        role: 'gejagte' // Standardrolle
    };

    // Informiere den neuen Spieler über die existierenden Spieler
    socket.emit('currentPlayers', players);

    // Informiere alle anderen Spieler über den neuen Spieler
    socket.broadcast.emit('newPlayer', { id: socket.id, player: players[socket.id] });

    // Aktualisiere die Position des Spielers
    socket.on('playerMovement', (movementData) => {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;

        // Informiere alle Spieler über die Bewegung
        io.emit('playerMoved', { id: socket.id, x: players[socket.id].x, y: players[socket.id].y });
    });

    // Wenn ein Spieler die Rolle ändert
    socket.on('changeRole', (newRole) => {
        players[socket.id].role = newRole;
        io.emit('roleChanged', { id: socket.id, role: newRole });
    });

    // Wenn der Spieler sich trennt
    socket.on('disconnect', () => {
        console.log('A player disconnected:', socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
