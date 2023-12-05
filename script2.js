let player;
let trees = [];
let treeCount = 65;

let treeImage;
let mySound; // Declare the sound variable here

function preload() {
  treeImage = loadImage('treetop.webp');
  mySound = loadSound("lib/sound/forestrain.wav");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  background(0);
  player = new Player();

  for (let i = 0; i < treeCount; i++) {
    let tree = new Tree(random(width), random(height), 20);
    trees.push(tree);
  }
mySound.play();
}

function draw() {
  if (!mySound.isPlaying()) {
    mySound.loop();
  }
  clear();

  for (let tree of trees) {
    tree.display();
    player.collide(tree);
  }

  player.update();
  player.display();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move(0, -2);
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 2);
  } else if (keyCode === LEFT_ARROW) {
    player.move(-2, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(2, 0);
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    player.stopY();
  }
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.stopX();
  }
  return false;
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 25;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = 'down';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.speedX > 0) this.direction = 'left';
    else if (this.speedX < 0) this.direction = 'right';
    else if (this.speedY > 0) this.direction = 'up';
    else if (this.speedY < 0) this.direction = 'down';
  }

  display() {
    fill(122, 31, 20);
    noStroke();

    ellipse(this.x, this.y, this.size, this.size);

    this.drawBeak();
  }
  
  drawBeak() {
    const beakWidth = this.size * 1;
    const beakHeight = this.size * 1.3;
    const beakOffsetX = this.size * -0.4;
    const beakOffsetY = 0;

    push();
    translate(this.x, this.y);
    rotate(this.getBeakDirection());

    fill(150, 35, 21);
    beginShape();
    vertex(beakOffsetX + beakWidth, beakOffsetY);
    quadraticVertex(beakOffsetX + beakWidth / 2, beakOffsetY + beakHeight, beakOffsetX, beakOffsetY);
    quadraticVertex(beakOffsetX + beakWidth / 2, beakOffsetY - beakHeight, beakOffsetX + beakWidth, beakOffsetY);
    endShape(CLOSE);

    pop();
  }

  getBeakDirection() {
    if (this.direction === 'right') {
      return 0;
    } else if (this.direction === 'left') {
      return PI;
    } else if (this.direction === 'down') {
      return HALF_PI;
    }
    return -HALF_PI;
  }

  move(x, y) {
    this.speedX = x;
    this.speedY = y;
  }

  stopX() {
    this.speedX = 0;
  }

  stopY() {
    this.speedY = 0;
  }

  collide(tree) {
    let d = dist(this.x, this.y, tree.x, tree.y);
    if (d < this.size / 2 + tree.radius) {
      this.x -= this.speedX;
      this.y -= this.speedY;
      this.speedX = this.speedY = 0;
    }
  }
}

class Tree {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  display() {
    imageMode(CENTER);
    image(treeImage, this.x, this.y, this.radius * 3, this.radius * 3);
  }
}
