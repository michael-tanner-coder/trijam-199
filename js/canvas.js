const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var scaledCanvas, scaledCtx;
var fxCanvas, fxContext;
var depthSpawnCanvas, depthSpawnContext, depthSpawnData;

const GAME_W = 320;
const GAME_H = 240;
canvas.width = GAME_W;
canvas.height = GAME_H;

const SCALED_W = 640;
const SCALED_H = 480;

function setupCanvas() {
  scaledCanvas = document.getElementById("showCanvas");
  if (scaledCanvas) {
    scaledCanvas.width = SCALED_W;
    scaledCanvas.height = SCALED_H;
    scaledCtx = scaledCanvas.getContext("2d");
  }

  canvas = document.getElementById("canvas");
  canvas.width = GAME_W;
  canvas.height = GAME_H;
  context = canvas.getContext("2d");

  fxCanvas = document.createElement("canvas");
  if (fxCanvas) {
    fxCanvas.style.display = "none";
    fxCanvas.width = GAME_W;
    fxCanvas.height = GAME_H;
    fxContext = fxCanvas.getContext("2d");
  }

  context.mozImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  scaledCtx.mozImageSmoothingEnabled = false;
  scaledCtx.imageSmoothingEnabled = false;
  scaledCtx.msImageSmoothingEnabled = false;
}

function stretchLowResCanvasToVisibleCanvas() {
  scaledCtx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    scaledCanvas.width,
    scaledCanvas.height
  );
}

// setupCanvas();
