const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls=[];
var boats=[];



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  //PI means 180 
  angle = -PI/4

  tower = new Tower(150, 350, 160, 310);
  ground = new Ground(600,height-1,width,10)
  canon = new Canon(180,110,110,50,angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();
  

  tower.display();
  canon.display();
  showboats()
 for(var i=0;i<balls.length;i++){
   showcanonballs(balls[i],i)
   for(var j=0;j<boats.length;j++){
     if(balls[i]!==undefined&&boats[j]!==undefined){
       var collision=Matter.SAT.collides(balls[i].body,boats[j].body)
       if(collision.collided){
         boats[j].remove(j)
         World.remove(world,balls[i].body)
         balls.splice(i,1)
       }
     }
   }
 }
 
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
    canonball=new Ball (canon.x,canon.y)
    balls.push(canonball)
  }

}
function showcanonballs(ball,index){
  ball.display()
  if(ball.body.position.x>=width||ball.body.position.y>= height-100){
    World.remove(world,ball.body)
    balls.splice(index,1)
  }
}
function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length-1].shoot()
  }

}
function showboats(){
  if(boats.length>0){
    if(boats.length<4 && boats[boats.length-1].body.position.x<width-300){
     var position=[-120,-90,-105,-70]
     var boatpos=random(position)
     boat= new Boat(width,height-100,150,150,boatpos)
     boats.push(boat)
    }
    for(var i=0;i<boats.length;i++){
      Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
      boats[i].display()
    }
  }
  else{
    boat= new Boat(width,height-100,150,150,-100)
     boats.push(boat)
  }
}







