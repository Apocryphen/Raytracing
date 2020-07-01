class Ray {
  constructor(x, y, rendDist, dir) {
    this.pos = createVector(x, y);
    this.dir = dir;
    this.startDir = dir;
    this.rendDist = rendDist;
    this.length = rendDist;
    this.l = new LineSegment(x,y,x + (cos(dir) * rendDist), y + (sin(dir * rendDist)));
  }
  show() {
    this.l.show();
  }
  updatePos(p){
    this.l.x1 = p.x;
    this.l.y1 = p.y;
    this.l.x2 = this.l.x1 + (cos(this.dir) * this.rendDist);
    this.l.y2 = this.l.y1 + (sin(this.dir) * this.rendDist);
  }

  collide(l) {
    //This mess is line collision,
    //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    let t = (l.x1-this.l.x1)*(this.l.y1-this.l.y2)-(l.y1-this.l.y1)*(this.l.x1-this.l.x2);
    let u = (l.x1-l.x2)*(l.y1-this.l.y1)-(l.y1 - l.y2)*(l.x1 - this.l.x1);
    let den = (l.x1-l.x2)*(this.l.y1-this.l.y2)-(l.y1-l.y2)*(this.l.x1-this.l.x2);

    if (t / den >= 0 && t / den <= 1 && -u / den >= 0 && -u / den <= 1) {
      return createVector(l.x1 + (t / den) * (l.x2 - l.x1),
        l.y1 + (t / den) * (l.y2 - l.y1));
    } else {
      //If both t and u are not between 0 and 1 a point does not exist.
      return null;
    }
    //    (x1-x3)(y3-y4) - (y1-y3)(x3-x4)
    //t = -------------------------------
    //    (x1-x2)(y3-y4) - (y1-y2)(x3-x4)
    //
    //x1,y1,x2,y2 is the intersecting line
    //x3,y3,x4,y4 is the ray
    //
    //pX = x1 + t(x2-x1)
    //py = y1 + t(y2-y1)
  }
}
