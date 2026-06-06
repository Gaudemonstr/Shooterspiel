let socket;
let players = {};
let gif;
let gif2;
let wlostX = false;
let vwinX = false;
let deadcounterX;
let hitcounterX;
let projektilA = [];
let projektile = [];
let frameCounter = 0;
let speedMultiplierX;

function preload() {
    gif = loadImage('./Bilder/4hsr.gif');
    gif2 = loadImage('./Bilder/tenor.gif');
  }
function setup() {
    createCanvas(800, 600);
    socket = io("http://127.0.0.1:3000");
    socket.on('Untergang', (wlost) => {
        wlostX = wlost;
        //console.log(wlostX);
            });
    socket.on('Todesrate', (deadcounter) => {
        deadcounterX = deadcounter;
                //console.log(deadcounterX);
                    });
    socket.on('Sieg', (vwin) => {
        vwinX = vwin;
                        //console.log(vwinX);
                            });
    socket.on('Mordrate', (hitcounter) => {
        hitcounterX = hitcounter;
                                        //console.log(hitcounterX);
                                            });
    socket.on('currentPlayers', (currentPlayers) => {
        players = currentPlayers;
    });

    socket.on('newPlayer', (newPlayer) => {
        players[newPlayer.id] = newPlayer.player;
    });

    socket.on('playerMoved', (playerData) => {
        if (players[playerData.id]) {
            players[playerData.id].x = playerData.x;
            players[playerData.id].y = playerData.y;
        }
    });

    socket.on('roleChanged', (roleData) => {
        if (players[roleData.id]) {
            players[roleData.id].role = roleData.role;
        }
    });

    socket.on('playerDisconnected', (playerId) => {
        delete players[playerId];
    });
    socket.on('projektilMoved', (projekArray) => {
        projektile = projekArray
    });
    socket.on('SpeedMultiplier', (speedMultiplier) =>{
        speedMultiplierX = speedMultiplier;
    })
}

function draw() {
    background(220);
    
    for (let id in players) {
        let player = players[id];
        fill(player.role === 'jäger' ? 'red' : 'blue');
        ellipse(player.x, player.y, 20, 20);
        
        if (wlostX==true) {
    
            image(gif2, player.x - 15, player.y - 15, 30, 30);
        } else if (vwinX==true) {
            if(player.role === 'jäger')
            image(gif, (player.x - 15), (player.y - 15), 30, 30);
            
        } else {
            ;
        };

text(`Todesrate: ${deadcounterX} Mordrate: ${hitcounterX}`, 50, 50);
function emitPlayerMovement(direction) {
    let movement = { x: players[socket.id].x, y: players[socket.id].y };
    
    switch (direction) {
        case 'left':
            movement.x -= speedMultiplierX;
            break;
        case 'right':
            movement.x += speedMultiplierX;
            break;
        case 'up':
            movement.y -= speedMultiplierX;
            break;
        case 'down':
            movement.y += speedMultiplierX;
            break;
    }
    
    socket.emit('playerMovement', movement);
}

if (keyIsDown(LEFT_ARROW)) {
    emitPlayerMovement('left');
} else if (keyIsDown(RIGHT_ARROW)) {
    emitPlayerMovement('right');
} else if (keyIsDown(UP_ARROW)) {
    emitPlayerMovement('up');
} else if (keyIsDown(DOWN_ARROW)) {
    emitPlayerMovement('down');
}

}

if (keyIsDown(32)&& (frameCounter >= 100))  {
    console.log('Ich habe geschossen!!!');
    socket.emit('Geschossen');
    frameCounter = 0;
}
projektile.forEach((projektil,i) => {
    circle(projektil.x, projektil.y, 5);
    //projektile[i].x += 1;
})

frameCounter++;
};

function keyPressed() {
    if (key === 'r') {
        socket.emit('changeRole', 'jäger');
    } else if (key === 'b') {
        socket.emit('changeRole', 'gejagte');
    }
}
frameCounter++;