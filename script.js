var rain = [];
var speed;

let mySound;

function preload() {
  mySound = loadSound("lib/sound/forestrain.wav");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvasWrapper');
  for (var i = 0; i < 800; i++) {
    rain[i] = new Rain();
  }
  mySound.play();
}

function draw() {
  if(!mySound.isPlaying()){

    mySound.loop();
  }
  clear();
  var distance = dist(mouseX, mouseY, width / 2, height / 2);
  speed = map(distance, 0, dist(0, 0, width / 2, height / 2), 35, 0);
  
  translate(width / 2, height / 2);
  for (var i = 0; i < rain.length; i++) {
    rain[i].update();
    rain[i].show();
  }
}