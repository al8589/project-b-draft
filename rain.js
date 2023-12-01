function Rain() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.previousZ = this.z;  

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.previousZ = this.z;  
    }
  }

  this.show = function() {
    fill(87, 94, 91);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);

    var previousx = map(this.x / this.previousZ, 0, 1, 0, width);  // Update this reference
    var previousy = map(this.y / this.previousZ, 0, 1, 0, height);  // And this one

    this.previousZ = this.z;  

    stroke(161, 171, 166);
    line(previousx, previousy, sx, sy);
  }
}