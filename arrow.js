class Arrow {
  constructor(x, y, width, height, archerAngle) {
    var options = {
      isStatic: true,
      density: 0.1
    };
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    this.image = loadImage("./assets/arrow.png");
    this.archerAngle = archerAngle;
    this.velocity = p5.Vector.fromAngle(archerAngle);
    World.add(world, this.body);
  }

  remove(index) {
    this.isRemoved = true;
    Matter.World.remove(world, this.body);
    delete playerArrows[index];
  }

  shoot() {
    var newAngle = this.archerAngle ; 
    newAngle = newAngle *(3.14/180) 
    var velocity = p5.Vector.fromAngle(newAngle); 
    velocity.mult(0.5); 
    Matter.Body.setStatic(this.body, false); 
    Matter.Body.setVelocity(this.body, { 
      x: velocity.x *(180/3.14),
       y: velocity.y * (180/3.14)
    });
  }

  display() {
    var tmpAngle;
    if (this.body.velocity.y === 0) {
      tmpAngle = this.archerAngle + PI / 2;
    } else {
      tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x);
    }

    Matter.Body.setAngle(this.body, tmpAngle);

    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();

    if (this.body.velocity.x > 0 && this.body.position.x > 400) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      fill("white");
      ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
