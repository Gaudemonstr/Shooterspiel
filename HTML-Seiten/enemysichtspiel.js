let spieler;
let enemy;
let projektil;
let hitcounter = 0;
let deadcounter = 0;
let gif;
let gif2;
let k = false;
let vwin = false;
let wlost = false;
let frameCounter = 0;

function preload() {
  gif = loadImage('./Bilder/4hsr.gif');
  gif2 = loadImage('./Bilder/tenor.gif');
}
spieler = new Spieler(250, 250);
enemyself = new Enemyself(400, 400, spieler);

//projektil = new Projektil(spieler.x, spieler.y, spieler);
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background('green');
  enemyself.draw();
  spieler.draw();
  fill('black')

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


