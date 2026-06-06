let hitcounter = 0;
let deadcounter = 0;

class Spieler {
  constructor(x, y, enemy) {
    this.x = x;
    this.y = y;
    this.enemy = enemy;
    this.speedMultiplier = 1; // Standardgeschwindigkeit
    this.timer = 0; // Timer für die Geschwindigkeitsänderung
    this.fastSpeedDuration = 100; // Dauer der hohen Geschwindigkeit in Millisekunden (2 Sekunde)
    this.normalSpeedInterval = 300; // Gesamtes Intervall inklusive hoher und normaler Geschwindigkeit in Millisekunden (6 Sekunden)
    this.cyclewert = 0;
    this.muenzewert = muenzewert; // Initialisiere muenze als falsch, da es keine Definition gibt
    this.acceleration = 2;
  }

  draw() {
    this.normalSpeedInterval = 300 - ((hitcounter - deadcounter) * 10);
    this.cyclewert = Math.floor(this.timer % this.normalSpeedInterval);

    if (this.cyclewert >= this.fastSpeedDuration) {
      this.speedMultiplier = 1;
    } else {
      this.speedMultiplier = 1.55 + ((hitcounter - deadcounter) * 0.1);
    }
    text("                                                      " + this.speedMultiplier + ' ' + this.cyclewert + ' ' + this.normalSpeedInterval, 50, 70);
    if (this.muenzewert === 0) {
      this.acceleration = 1.5 * this.speedMultiplier;
    }  else {
      this.acceleration = 2;
    }
    if (keyIsDown(37)) { // Links

      this.x -= this.acceleration;
        if (this.x < 0) {
          this.x = 0;
        }
        socket.emit("spieler", this.x, this.y);
      
    }
    if (keyIsDown(39)) { // Rechts
      
        this.x += this.acceleration;
        if (this.x > 500) { // Korrektur hier
          this.x = 500;
        }
        socket.emit('spieler', this.x, this.y);
      
    }
    if (keyIsDown(38)) { // Oben
        this.y -= this.acceleration;
        if (this.y < 0) {
          this.y = 0;
        }
        socket.emit('spieler', this.x, this.y);
    }
    if (keyIsDown(40)) { // Unten
        this.y += this.acceleration;
        if (this.y > 500) { // Korrektur hier
          this.y = 500;
        }
        socket.emit('spieler', this.x, this.y);
    }
    circle(this.x, this.y, 20);

    this.timer++;
  }
}