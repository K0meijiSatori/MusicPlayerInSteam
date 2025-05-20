// drag.js: Make .player draggable with mouse and touch support
const player = document.querySelector('.player');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Helper to start drag
function startDrag(x, y) {
  isDragging = true;
  // Calculate offset within element
  offsetX = x - player.getBoundingClientRect().left;
  offsetY = y - player.getBoundingClientRect().top;
  player.style.cursor = 'grabbing';
  player.style.userSelect = 'none';
}

// Helper to perform drag
function doDrag(x, y) {
  if (!isDragging) return;
  const left = x - offsetX;
  const top = y - offsetY;
  player.style.position = 'absolute';
  player.style.left = `${left}px`;
  player.style.top = `${top}px`;
}

// Helper to end drag
function endDrag() {
  isDragging = false;
  player.style.cursor = 'grab';
  player.style.userSelect = '';
}

// Mouse events
player.addEventListener('mousedown', (e) => {
  startDrag(e.clientX, e.clientY);
});
document.addEventListener('mousemove', (e) => {
  doDrag(e.clientX, e.clientY);
});
document.addEventListener('mouseup', () => {
  endDrag();
});

// Touch events (mobile support)
player.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startDrag(touch.clientX, touch.clientY);
});
document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  doDrag(touch.clientX, touch.clientY);
  e.preventDefault(); // Prevent scrolling while dragging
}, { passive: false });
document.addEventListener('touchend', () => {
  endDrag();
});

// Set initial cursor
player.style.cursor = 'grab';
