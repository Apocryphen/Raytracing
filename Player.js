class Player
{
 constructor (x,y,speed){
   this.pos = createVector(x,y);
   this.speed = speed;
   this.moveDir = createVector(0,0);
 }
  update(){
    this.movement();
    this.show();
  }
  show(){
    strokeWeight(10);
    stroke(255);
    point (this.pos.x, this.pos.y);
  }
  movement(){
    this.pos.x += this.moveDir.x * this.speed;
    this.pos.y += this.moveDir.y * this.speed;
  }
  keyEvent(k, pr){
    switch(k){
      case UP_ARROW:
        pr ? this.moveDir.y += 1 : this.moveDir.y -= 1;
        break;
      case DOWN_ARROW:
        pr ? this.moveDir.y -= 1 : this.moveDir.y += 1;
        break;
      case LEFT_ARROW:
        pr ? this.moveDir.x += 1 : this.moveDir.x -= 1;
        break;
      case RIGHT_ARROW:
        pr ? this.moveDir.x -= 1 : this.moveDir.x += 1;
        break;
    }
  }
  lookDir(){
   return atan2(mouseY-this.pos.y, mouseX-this.pos.x);
  }
}
