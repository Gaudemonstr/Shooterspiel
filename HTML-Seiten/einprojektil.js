let projekArray = [];
class Einprojektil{
    constructor(x, y){
this.x = x;
this.y = y;
    
    }
draw() {
        // Zeichnet das Kreis-Element und aktualisiert seine x-Position
        circle(this.x, this.y, 5);
        this.x++;
    
}}