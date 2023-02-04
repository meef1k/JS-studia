const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const numBallsInput = document.getElementById("numBalls");
const minDistanceInput = document.getElementById("minDistance");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const performanceDisplay = document.getElementById("performance");

let numBalls = 10;
let minDistance = 100;
let balls = [];
let isRunning = false;

class Ball {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 10 || this.x > canvas.width - 10) {
      this.dx = -this.dx;
    }
    if (this.y < 10 || this.y > canvas.height - 10) {
      this.dy = -this.dy;
    }
  }
}

function connectBalls(ball1, ball2) {
  let distance = calcDistance(ball1, ball2);
  if (distance < minDistance) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.stroke();
  }
}

function calcDistance(ball1, ball2) {
  let dx = ball2.x - ball1.x;
  let dy = ball2.y - ball1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    let ball1 = balls[i];
    ball1.draw();
    ball1.update();
    for (let j = i + 1; j < balls.length; j++) {
      let ball2 = balls[j];
      connectBalls(ball1, ball2);
    }
  }
  if (isRunning) {
    requestAnimationFrame(render);
  }
}

function start() {
  isRunning = true;
  requestAnimationFrame(render);
}

function reset() {
  isRunning = false;
  balls = [];
  numBalls = numBallsInput.value;
  minDistance = minDistanceInput.value;
  for (let i = 0; i < numBalls; i++) {
    let x = Math.random() * (canvas.width - 20) + 10;
    let y = Math.random() * (canvas.height - 20) + 10;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    balls.push(new Ball(x, y, dx, dy));
  }
}

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);
reset();

let startTime = performance.now();
let frameCount = 0;
function updatePerformance() {
  frameCount++;
  let currentTime = performance.now();
  let elapsedTime = currentTime - startTime;
  if (elapsedTime >= 1000) {
    let fps = frameCount / (elapsedTime / 1000);
    performanceDisplay.innerHTML = `FPS: ${fps.toFixed(2)}`;
    startTime = currentTime;
    frameCount = 0;
  }
  requestAnimationFrame(updatePerformance);
}
updatePerformance();