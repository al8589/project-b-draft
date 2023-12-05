let player;
let trees = [];
let treeCount = 65;

let treeImage; // A variable to hold the tree image

function preload() {
  treeImage = loadImage('treetop.webp'); // Make sure to provide the correct path to your tree image
}

function setup() {
  createCanvas(600, 400);
  player = new Player();

  // Generate some trees at random locations
  for (let i = 0; i < treeCount; i++) {
    let tree = new Tree(random(width), random(height), 20); // 20 is the tree radius
    trees.push(tree);
  }
}

function draw() {
  background(51, 43, 42);

  // Display and check collision for all trees
  for (let tree of trees) {
    tree.display();
    player.collide(tree);
  }

  // Update and display the player
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
  return false; // Prevent default behavior
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 25; // Size of the bird head
    this.speedX = 0;
    this.speedY = 0;
    this.direction = 'down'; // Initial direction
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Update direction based on the movement
    if (this.speedX > 0) this.direction = 'left';
    else if (this.speedX < 0) this.direction = 'right';
    else if (this.speedY > 0) this.direction = 'up';
    else if (this.speedY < 0) this.direction = 'down';
  }

  display() {
    fill(122, 31, 20); // Color for the bird
    noStroke();

    // Draw the head (circle)
    ellipse(this.x, this.y, this.size, this.size);

    // Draw the beak-shaped hood (diamond-ish shape)
    this.drawBeak();
  }
   drawBeak() {
    const beakWidth = this.size * 1; // Width of the beak
    const beakHeight = this.size * 1.3; // Height of the beak
    const beakOffsetX = this.size * -0.4; // Horizontal offset of the beak from the center of the circle
    const beakOffsetY = 0; // Vertical offset of the beak from the center of the circle

    push(); // Save the current state of the canvas
    translate(this.x, this.y); // Move the origin to the player's location
    rotate(this.getBeakDirection()); // Rotate based on direction

    // Draw the beak as a rounded triangle
    fill(150, 35, 21); 
     beginShape();
    // Point of the beak
    vertex(beakOffsetX + beakWidth, beakOffsetY);
    // Bottom right curve
    quadraticVertex(beakOffsetX + beakWidth / 2, beakOffsetY + beakHeight, beakOffsetX, beakOffsetY);
    // Top right curve
    quadraticVertex(beakOffsetX + beakWidth / 2, beakOffsetY - beakHeight, beakOffsetX + beakWidth, beakOffsetY);
    endShape(CLOSE);

    pop(); // Restore the state of the canvas
  }

  getBeakDirection() {
    if (this.direction === 'right') {
      return 0;
    } else if (this.direction === 'left') {
      return PI;
    } else if (this.direction === 'down') {
      return HALF_PI;
    }
    // Default rotation for 'up'
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
    // If the images are not too big and there are not too many, you can assign the image to each tree.
    // Otherwise, consider using a static class variable to hold the image to save memory.
  }

  display() {
    // imageMode(CENTER) ensures that the image is drawn centered on (this.x, this.y)
    imageMode(CENTER);
    // Draws the image at the tree's location with the specified width and height
    image(treeImage, this.x, this.y, this.radius * 3, this.radius * 3);
  }
}