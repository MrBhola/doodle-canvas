const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop; 

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let autoclear = false;
let autoClearAt = 0;

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#4eeb35';
  ctx.lineCap = 'round';

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
}

toolbar.addEventListener("click", e => {
  if(e.target.id === 'clear'){
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener('change', e => {
  if(e.target.id === 'stroke') {
    ctx.strokeStyle = e.target.value;
  }
  if(e.target.id === 'lineWidth') {
    lineWidth = e.target.value;
  }
});

canvas.addEventListener('mousedown', (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
  clearTimeout(timeoutId);
});

canvas.addEventListener('mouseup', (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
  // Set a new timeout after mouse up
  timeoutId = setTimeout(function () {
    if (document.getElementById('autoclear').checked && !isPainting) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, 4000);
});

canvas.addEventListener('mousemove', draw);


