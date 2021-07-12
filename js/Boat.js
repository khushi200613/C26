class Boat {
    constructor(x, y,width,height,boatposition) {
      var options = {
       
        restitution:1,
        friction:1,
        density:1
      };
      this.image = loadImage("assets/boat.png");
     
      
      this.body = Bodies.rectangle(x, y,width,height, options);
     this.width=width;
     this.height=height;
     this.pos=boatposition;
      World.add(world, this.body);
    }
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
      push ()
      translate (pos.x,pos.y)
      rotate (angle)
      imageMode(CENTER);
      image(this.image, 0, this.pos,this.width,this.height);
     pop ()
    }
    remove(index){
        World.remove(world,boats[index].body)
         boats.splice(index,1)
    }
}