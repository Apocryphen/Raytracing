let rays = [];
let renderLines = [];

let numOfRays = 100;
let maxRenderDist = 1000;
let distToDisplay = 200;
let fadeDist = 150;
let fov;

let player;
let walls = [];

function setup() {
  createCanvas(800, 400);
  frameRate(30);

  fov = PI/4;
  //Create the rays and render lines
  for (let i = 0; i < numOfRays; i++){
    rays.push( new Ray(100,100, maxRenderDist, (i*(fov))/numOfRays));
    renderLines.push(new LineSegment(i*width/(2*numOfRays) + width/2,0,i*width/(2*numOfRays) + width/2,height));
  }
  //Create the walls
  for (let i = 0; i < 5; i++){
    walls.push(new LineSegment(random(width/2),random(height),random(width/2),random(height),random(255)));
  }
  player = new Player(200,200,-5,20);
}

function draw() {
  background(0);
  player.update();
  render();
}

function render(){
  for (let i = 0; i < numOfRays; i++){
    let curRay = rays[i];
    curRay.dir = curRay.startDir + player.lookDir() - fov/2;
    curRay.length = maxRenderDist;
    curRay.updatePos(player.pos);

    for (let wall of walls){
      stroke(255);
      wall.show(1);

      let collidePoint = curRay.collide(wall);
      if(collidePoint != null){
        //Fix this, SQRT isnt perticularly efficient
        let length = sqrt(pow(player.pos.x - collidePoint.x, 2) + pow(player.pos.y - collidePoint.y, 2));
        if(length < curRay.length){
          line(player.pos.x, player.pos.y, collidePoint.x, collidePoint.y);
          curRay.length = length;
          //Maps ray length to camera plane
          length = length * cos(curRay.startDir - PI/4);
          //Render the length as a line
          renderLines[i].y1 = map (length, 0, distToDisplay, 0, height/2);
          renderLines[i].y2 = map (length, 0, distToDisplay, height, height/2);
          //Fade effect
          stroke(map(length, 0, fadeDist, 255, 0));

          renderLines[i].show(5);
        }
      }
    }
  }
}

//Not a fan of this but not sure how else to do it :(
function keyPressed(){
  player.keyEvent(keyCode, true);
}
function keyReleased(){
  player.keyEvent(keyCode, false);
}
