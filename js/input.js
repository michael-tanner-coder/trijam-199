var mouseX = -1,
  mouseY = -1;
var unscaledMouseX = -1,
  unscaledMouseY = -1;
var mouseDragging = false;
var mouseNewDragStarted = false; // flips true for single frame of new drag
var dragX = 0,
  dragY = 0;
var cumulativeDrag = 0; // total amount of drag since button down, for click detection

function mousemoved(evt) {
  var rect = scaledCanvas.getBoundingClientRect();
  var root = document.documentElement;

  // to calculate delta for drag inputs, initially being done for editor usage
  var wasUMX = unscaledMouseX;
  var wasUMY = unscaledMouseY;

  // account for the margins, canvas position on page, scroll amount, etc.
  unscaledMouseX = evt.clientX - rect.left - root.scrollLeft;
  unscaledMouseY = evt.clientY - rect.top - root.scrollTop;

  if (mouseNewDragStarted) {
    mouseNewDragStarted = false;
  }

  if (mouseDragging) {
    dragX = unscaledMouseX - wasUMX;
    dragY = unscaledMouseY - wasUMY;
    cumulativeDrag += Math.abs(dragX) + Math.abs(dragY);
    editorDrag();
  }
  mouseX = Math.floor((unscaledMouseX * GAME_W) / SCALED_W);
  mouseY = Math.floor((unscaledMouseY * GAME_H) / SCALED_H);

  console.log(mouseX, mouseY);
}

function handleMouseClick(evt) {}

function handleMouseRelease(evt) {
  mouseDragging = false;
  dragX = dragY = 0;
  cumulativeDrag = 0;
}

function mouseSetup() {
  document.addEventListener("mousedown", handleMouseClick);
  document.addEventListener("mouseup", handleMouseRelease);
  document.addEventListener("mousemove", mousemoved);
}

// mouseSetup();
