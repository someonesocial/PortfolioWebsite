// Imports use relative file paths or Node.js package names
import { canvas, c } from "./dom-utils";
import { randomIntFromRange } from "./utils";
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import "./styles/styles.css";

//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse: { x: number; y: number } = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const color: string = "#ff0000";

const gravity = 0.2;
const friction = 0.98;

// Event Listeners
addEventListener("mousemove", (event: MouseEvent) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => {
  init();
});

// Objects
class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;

  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  update(): void {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
      this.dy *= friction;
      this.dx *= friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * friction;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw(): void {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }
}

// Implementation
let ballArray: Ball[] = [];

function init(): void {
  ballArray = [];

  for (let i = 0; i < 600; i++) {
    const radius = 20;
    const x = randomIntFromRange(radius, canvas.width - radius);
    const y = randomIntFromRange(0, canvas.height - radius);
    const dx = randomIntFromRange(-3, 3);
    const dy = randomIntFromRange(-2, 2);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate(): void {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}
init();
animate();
