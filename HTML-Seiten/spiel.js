let spieler;
let enemy;
let projektil;
let gif;
let gif2;
let k = false;
let vwin = false;
let wlost = false;
let frameCounter = 0;
var muenzewert = null;
;
socket.on("muenze", (muenze) => {
muenzewert = muenze;
console.log("muenze: " + muenze);
}); 

function preload() {
  gif = loadImage('./Bilder/4hsr.gif');
  gif2 = loadImage('./Bilder/tenor.gif');
}
spieler = new Spieler(250, 250);
enemy = new Enemy(500, 500);
socket.on("enemy", (x, y) => {
  enemy.x = x;
  enemy.y = y;
})
//projektil = new Projektil(spieler.x, spieler.y, spieler);
function setup() {
  createCanvas(500, 500);

}

function draw() {
  if(muenzewert != null){
  background('green');
  spieler.draw();
  if (vwin==true) {
    fill('blue');
  } else if (vwin == false && k == true){
  fill('aqua');  
  }
   else {
    fill('yellow');
  }
  enemy.draw();
  fill('black')
  if ((keyIsDown(32)) && (frameCounter >= 100) && (muenzewert === 1)) {

      // Fügt ein neues Objekt zum Array hinzu, wenn die Bedingungen erfüllt sind
      projekArray.push(new Einprojektil(spieler.x,spieler.y));
      
      // Setzt den Frame-Zähler zurück
      frameCounter = 0;
  
  }

  // Iteriert über jedes Element im Array und aktualisiert seine Position
  projekArray.forEach((einprojektil, index) => {
    if (einprojektil.x >= 500) {
      // Entfernt das Element aus dem Array, wenn seine x-Position 500 überschreitet
      projekArray.splice(index, 1);}
    einprojektil.draw();
  })
  frameCounter++;


  

  if (vwin == true) {
    image(gif, (enemy.x - 15), (enemy.y - 15), 30, 30);
  };
  if (wlost == true) {
    image(gif2, (spieler.x - 15), (spieler.y - 15), 30, 30);
  };
checkWin()
checkLost()
text(`Gewonnen: ${hitcounter}, Verloren: ${deadcounter}`, 50, 50);
  }
};

function alertGewinnFunktion() {
  //alert(`Sie haben ${hitcounter} mal gewonnen.`);
    setTimeout(() => vwin = false, 2000);
  };

function checkWin() {
  for(let j = 0; j < projekArray.length; j++) {
    if (Math.sqrt(Math.pow((enemy.x - projekArray[j].x ),2 ) + Math.pow((enemy.y - projekArray[j].y), 2)) <= 10 && !k) {
      hitcounter++;
      vwin = true;
      k = true
      setTimeout(() => k = false,3000)
      alertGewinnFunktion(); // Direkter Aufruf ohne setTimeout
      frameCounter = 0;
    }
  }
};

function checkLost() {
  if ((Math.sqrt(Math.pow((enemy.x - spieler.x ),2 ) + Math.pow((enemy.y - spieler.y), 2)) <= 20) && (k==false) && (frameCounter >= 50)) {
    deadcounter++;
    wlost =true;
       
    function alertLostFunktion() {
      //alert(`Sie haben ${deadcounter} mal verloren`);
    //  location.reload();
      setTimeout(() => wlost = false, 2000);
      k = false;
  }
  alertLostFunktion();
  k=true;
  setTimeout(() => k = false,3000)
  frameCounter = 0;
}
}
if (wlost) {
  setTimeout(function() {
     // location.reload();
  }, 1500); // 1500 Millisekunden = 1,5 Sekunden
}

