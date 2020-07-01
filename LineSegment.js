//This entire class is just for making math easier.
class LineSegment
{
  constructor (x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  show (w){
    strokeWeight(w);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}
