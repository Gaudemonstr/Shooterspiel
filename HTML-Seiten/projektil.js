let projekArray = [];
class Projektil{
    constructor(x,y, spieler){
    this.x = x;
    this.y = y;
    this.spieler = spieler;
    this.frameCounter = 0;
    this.k = false;
    this.projekArray = [];
    }

    
    draw() {
      
      projekArray.push({x: this.spieler.x, y: this.spieler.y});
        if ((keyIsDown(32)) && (this.frameCounter >= 100)) {
  
            // Fügt ein neues Objekt zum Array hinzu, wenn die Bedingungen erfüllt sind
            this.projekArray.push({x: this.spieler.x, y: this.spieler.y});
            
            // Setzt den Frame-Zähler zurück
            this.frameCounter = 0;
            this.k = true; // Verhindert weiteres Schießen, bis 100 Frames vergangen sind
        }
    
        // Iteriert über jedes Element im Array und aktualisiert seine Position
        this.projekArray.forEach((obj, index) => {
          if (obj.x >= 500) {
              // Entfernt das Element aus dem Array, wenn seine x-Position 500 überschreitet
              this.projekArray.splice(index, 1);
          } else {
              // Zeichnet das Kreis-Element und aktualisiert seine x-Position
              circle(obj.x, obj.y, 5);
              obj.x++;
          }
      });
        // Inkrementiert den Frame-Zähler
        this.frameCounter++;
    }
};
