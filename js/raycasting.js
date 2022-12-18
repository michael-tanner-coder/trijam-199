var lights = [],
  blocks = [];

let vector = function (_x, _y) {
  this.x = _x;
  this.y = _y;
};
let light = function (_position, _radius, _angleSpread, _color) {
  this.color = _color;
  this.radius = _radius;
  this.angleSpread = _angleSpread;
  this.position = _position;
  this.angle = Math.random() * 180;
  this.brightness = 1;
};
let block = function (_position, _w, _h) {
  this.position = _position;
  this.x = _position.x;
  this.y = _position.y;
  this.w = _w;
  this.h = _h;
  this.visible = false;
};
angle = 0;

// FIND DISTANCE ************************
function findDistance(
  light,
  block,
  angle,
  rLen,
  start,
  shortest,
  closestBlock
) {
  var y = block.y + block.h / 2 - light.position.y,
    x = block.x + block.w / 2 - light.position.x,
    dist = Math.sqrt(y * y + x * x);

  if (light.radius >= dist) {
    var rads = angle * (Math.PI / 180),
      pointPos = new vector(light.position.x, light.position.y);

    pointPos.x += Math.cos(rads) * dist;
    pointPos.y += Math.sin(rads) * dist;

    if (
      pointPos.x > block.x &&
      pointPos.x < block.x + block.w &&
      pointPos.y > block.y &&
      pointPos.y < block.y + block.h
    ) {
      if (start || dist < shortest) {
        start = false;
        shortest = dist;
        rLen = dist;
        closestBlock = block;
      }

      return {
        start: start,
        shortest: shortest,
        rLen: rLen,
        block: closestBlock,
      };
    }
  }
  return { start: start, shortest: shortest, rLen: rLen, block: closestBlock };
}
// **************************************

// SHINE LIGHT**************************
function shineLight(light, objects) {
  var curAngle = light.angle - light.angleSpread / 2,
    dynLen = light.radius,
    addTo = 1 / light.radius;

  for (
    curAngle;
    curAngle < light.angle + light.angleSpread / 2;
    curAngle += addTo * (180 / Math.PI) * 2
  ) {
    dynLen = light.radius;

    var findDistRes = {};
    findDistRes.start = true;
    findDistRes.shortest = 0;
    (findDistRes.rLen = dynLen), (findDistRes.block = {});

    for (var i = 0; i < objects.length; i++) {
      findDistRes = findDistance(
        light,
        objects[i],
        curAngle,
        findDistRes.rLen,
        findDistRes.start,
        findDistRes.shortest,
        findDistRes.block
      );
    }

    var rads = curAngle * (Math.PI / 180),
      end = new vector(light.position.x, light.position.y);

    findDistRes.block.visible = true;
    findDistRes.block.lit = true;
    end.x += Math.cos(rads) * findDistRes.rLen;
    end.y += Math.sin(rads) * findDistRes.rLen;

    context.beginPath();
    context.moveTo(light.position.x, light.position.y);
    context.lineTo(end.x, end.y);
    context.closePath();
    // context.clip();
    context.stroke();
  }
}
// ************************************

function drawLight(objects, renderMethod = () => {}) {
  //   context.fillStyle = "#000";
  //   context.fillRect(0, 0, 512, 512);
  angle += 0.6;

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    renderMethod(object);
    object.lit = false;
    object.visible = false;
  }

  for (var i = 0; i < lights.length; i++) {
    context.strokeStyle = lights[i].color;
    lights[i].radius += Math.sin(angle);
    shineLight(lights[i], objects);
  }
}

function updateLight() {
  lights.forEach((light) => {
    // light.position.x = canvas.w / 2 + Math.sin(angle * 10) * 100;
    // light.position.y = canvas.h / 2 + Math.cos(angle * 10) * 100;
  });
}

function loopLight() {
  update();
  draw();
  setTimeout(loop, 30);
}

for (var i = 0; i < 50; i++) {
  var size = Math.random() * 20 + 2;
  blocks.push(
    new block(new vector(Math.random() * 512, Math.random() * 512), size, size)
  );
}

// for (var i = 0; i < 2; i++) {
//   var r = Math.floor(Math.random() * 256),
//     g = Math.floor(Math.random() * 256),
//     b = Math.floor(Math.random() * 256);

//   lights.push(
//     new light(
//       new vector(Math.random() * 512, Math.random() * 512),
//       Math.random() * 200 + 100,
//       60,
//       "rgba(" + r + "," + g + "," + b + ",0.1)"
//     )
//   );
// }
