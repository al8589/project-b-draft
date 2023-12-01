var rain = [];
var speed;

function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < 800; i++) {
    rain[i] = new Rain();
  }
}

function draw() {
  clear();
  var distance = dist(mouseX, mouseY, width / 2, height / 2);
  speed = map(distance, 0, dist(0, 0, width / 2, height / 2), 30, 0);
   
  translate(width / 2, height / 2);
  for (var i = 0; i < rain.length; i++) {
    rain[i].update();
    rain[i].show();
  }
}
