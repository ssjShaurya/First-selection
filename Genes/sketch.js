var vehicle = [];
var food = [];
var poison = [];

var debug;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    vehicle[i] = new Vehicle(x, y);
  }
  for (var i = 0; i < 800; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  for (var i = 0; i < 300; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
  debug = createCheckbox('debug').position(10 , window.innerHeight - 50).style('color', 'white');
}



function mouseDragged() {
  vehicle.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(51);

  let target = createVector(mouseX, mouseY);

  if (random(1) < 0.1) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  if (random(1) < 0.05) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  // Draw an ellipse at the mouse position
  /*fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(target.x, target.y, 48, 48);*/

  // Draw the food & poison particles
  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }
  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  // Call the appropriate steering behaviors for our agents
  for (var i = vehicle.length - 1; i >= 0; i--) {
    vehicle[i].boundaries();
    vehicle[i].behaviours(food, poison);
    // vehicle.seek(target);
    vehicle[i].update();
    vehicle[i].display();

    var newVehicle = vehicle[i].clone();
    if (newVehicle !== null) {
      vehicle.push(newVehicle);
    }

    if (vehicle[i].dead()) {
      var x = vehicle[i].position.x;
      var y = vehicle[i].position.y;
      food.push(createVector(x, y));
      vehicle.splice(i, 1);
    }
  }
}