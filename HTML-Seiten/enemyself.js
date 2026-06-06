class Enemyself{
    constructor(x,y){
    this.x = x
    this.y = y
    }

    draw(){
        if (keyIsDown(37) === true) {

            socket.emit('enemyself', this.x, this.y);

            this.x -= 2;
            if (this.x < 0) {
              this.x=0;
            }
          }
          if (keyIsDown(39) === true) {

              socket.emit('enemyself', this.x, this.y);
   
            this.x += 2;
            if (this.x > 500) {
              this.x = 500;
            }
          }
        
        
          if (keyIsDown(38) === true) {

              socket.emit('enemyself', this.x, this.y);
  
            this.y -= 2;
            if (this.y < 0) {
              this.y = 0;
            }
          }
        
        
          if (keyIsDown(40) === true) {
              socket.emit('enemyself', this.x, this.y);
            this.y += 2;
            if (this.y > 500) {
              this.y = 500;
            }
          }
          circle(this.x, this.y, 20);
    }
}