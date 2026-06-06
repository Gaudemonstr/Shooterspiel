const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./Routes/index');
const helper = require('./utils/helper');
const frontend = require('./boot/frontend');
let wlost = false;
let vwin = false;
let deadcounter = 0;
let hitcounter = 0;
let k = false;
let frameCounter = 0;

let normalZeit = 500;
let speedMultiplier;



let projekArray = [];
class Einprojektil {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      // Speichern der Interval-ID, damit das Intervall später gestoppt werden kann
      this.intervalId = setInterval(() => {
          this.move();
      }, 41.66); // Bewegt das Projektil alle 200 Millisekunden
  }

  // Methode zum Bewegen des Projektils
  move() {
      this.x += 1; // Bewegt das Projektil nach rechts
  }

  // Methode zum Stoppen der Bewegung
/*  stop() {
      clearInterval(this.intervalId);
  }*/
}

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

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types


const muenze =  Math.random() < 0.5? 0 : 1;
console.log(muenze)
const { Server } = require("socket.io");

const io = new Server({  cors: {
    origin: ["http://127.0.0.1:81","http://localhost:81"]
  } });
  let players = {};
  let projektil = {x:0, y: 0};
  let projektilInterval = null;


    
io.on("connection", (socket) => { //Eventlistener wenn sich eine neue Socket verbindet und (socket) ist die instanz davon
  console.log(socket.id) // Damit lassen wir uns dann von der neuen Socket die ID ausgeben diese wurde von Socket io automatisch vergeben und ist einmalig

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

  socket.on('Geschossen', () => {
    if (players[socket.id].role === 'gejagte') {
    console.log("GESCHOSSEN?");
    const newProjektil = new Einprojektil(players[socket.id].x, players[socket.id].y);
    projekArray.push(newProjektil);
  } else {
    console.log("Nur Gejagte dürfen schießen.");
  }
    // Direkt nach dem Hinzufügen eines neuen Projektils senden wir die aktualisierten Positionen aller aktiven Projektils
    //io.emit('projektilMoved', projekArray.map(proj => ({ x: proj.x, y: proj.y })));

    // Optional: Setzen Sie einen Timeout, um das Projektil nach einer bestimmten Zeit zu stoppen
    /*setTimeout(() => {
        const index = projekArray.findIndex(proj => proj === newProjektil);
        if (frameCounter < 500) {
            newProjektil.stop();
            frameCounter = 0; // Stoppt die Bewegung des Projektils
            projekArray.splice(index, 1); // Entfernt das Projektil aus dem Array
            io.emit('projektilMoved', projekArray.map(proj => ({ x: proj.x, y: proj.y }))); // Aktualisiert die Positionen der verbleibenden Projektils
        }
    }, 10000);*/ // Beispiel: Stoppt das Projektil nach 5 Sekunden
});


setInterval(() => {
  io.emit('projektilMoved', projekArray.map(proj => ({ x: proj.x, y: proj.y })));
},1000)

frameCounter++;
  // Wenn ein Spieler die Rolle ändert
  socket.on('changeRole', (newRole) => {
      players[socket.id].role = newRole;
      io.emit('roleChanged', { id: socket.id, role: newRole });
  });
  function checkImmer () {
    
    
    const playerIdsZwei = Object.keys(players);

    for (let i = 0; i < playerIdsZwei.length; i++) {
          if ((players[playerIdsZwei[i]].role === 'jäger')){
      if ((Math.random() * normalZeit) >= 200)   {
        speedMultiplier = 3;
      } else  {
        speedMultiplier = 0.5;
      }
    }
   else {
      speedMultiplier = 2;
    }
  }};
  setInterval(() => {
    checkImmer();
    socket.emit('SpeedMultiplier', speedMultiplier);
  }, 300);
  function hasCloseValues(players) {
    let wlost = false;
    const playerIds = Object.keys(players);

    for (let i = 0; i < playerIds.length; i++) {
        for (let j = i + 1; j < playerIds.length; j++) {
            const player1 = players[playerIds[i]];
            const player2 = players[playerIds[j]];

            // Direktes Prüfen der Distanz zwischen den Spielern
            let distance = Math.sqrt(Math.pow((player1.x - player2.x), 2) + Math.pow((player1.y - player2.y), 2));

            // Überprüfen, ob die Distanz kleiner als 30 ist
            if (distance < 20) {
                wlost = true; // Korrekte Zuweisung
                break;
            }
        }
        if (wlost) break;
    }

    return wlost;
}
setInterval(() => {
    wlost = hasCloseValues(players); // Korrekte Zuweisung des Rückgabewerts von hasCloseValues
    //console.log(wlost);
    socket.emit('Untergang', wlost);
    socket.emit('Todesrate', deadcounter);
}, 3000);
setInterval(() => {
  vwin = hasCloseValuesProjektil(players);
  socket.emit('Sieg', vwin);
  socket.emit('Mordrate', hitcounter);
  //console.log(vwin + '+' + hitcounter);
  }, 41.6);
  //function alertGewinnFunktion() {
    //alert(`Sie haben ${hitcounter} mal gewonnen.`);
  //    setTimeout(() => vwin = false, 2000);
  //  };
  function hasCloseValuesProjektil(players) {


    const playerIds = Object.keys(players);

    for (let i = 0; i < playerIds.length; i++) {
          if ((players[playerIds[i]].role === 'jäger')){
            const player1 = players[playerIds[i]];
            for(let l = 0; l < projekArray.length; l++) {
              const distanz = Math.sqrt(Math.pow((player1.x - projekArray[l].x), 2) + Math.pow((player1.y - projekArray[l].y), 2));
              console.log(distanz,player1.x,player1.y);
              if ((distanz < 30)) {
                console.log("GETROFFEN");
                
                //console.log(vwin);
                return true;
              }
        }
    }

   
}

return false

}
  function checkWin() {
    if ((vwin == true) && (k == false)){
        hitcounter++;
        k = true;
        setTimeout(() => k = false, 3000);

        console.log('Sie haben ' + hitcounter + ' mal gewonnen');
      }
    };
  
  function checkLost() {
    if ((wlost == true) && (k==false)) {
    deadcounter++;
    k=true;
    setTimeout(() => k = false, 3000)
    console.log("Sie haben " + deadcounter + " mal verloren");
  }
  }

  setInterval(checkLost, 41.66);
  setInterval(checkWin, 41.66);

  // Wenn der Spieler sich trennt
  socket.on('disconnect', () => {
      console.log('A player disconnected:', socket.id);
      delete players[socket.id];
      io.emit('playerDisconnected', socket.id);
  });
});
io.listen(3000);