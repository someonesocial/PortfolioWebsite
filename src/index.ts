// Imports use relative file paths or Node.js package names
import { canvas, c } from "./dom-utils";
import {
  randomIntFromRange,
  distance,
  rotate,
  resolveCollision,
} from "./utils";
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
  velocity: { x: number; y: number };
  radius: number;
  mass: number;
  color: string;

  constructor(
    x: number,
    y: number,
    velocity: { x: number; y: number },
    radius: number,
    mass: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.mass = mass;
    this.color = color;
  }

  update(ballArray: Ball[]): void {
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      //bounce bottom
      this.velocity.y = -this.velocity.y;
      this.velocity.y *= friction;
      this.velocity.x *= friction;
    } else {
      this.velocity.y += gravity;
    }

    if (this.y + this.radius >= canvas.height) {
      //bounce top
      this.velocity.y = -this.velocity.y * friction;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      //bounce left right
      this.velocity.x = -this.velocity.x * friction;
    }

    for (let i = 0; i < ballArray.length; i++) {
      if (this === ballArray[i]) continue;
      if (
        distance(this.x, this.y, ballArray[i].x, ballArray[i].y) -
          this.radius * 2 <
        0
      ) {
        resolveCollision(this, ballArray[i]);
      }
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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

  for (let i = 0; i < 50; i++) {
    const radius = 20;
    const mass = 1;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    if (i !== 0) {
      for (let j = 0; j < ballArray.length; j++) {
        if (distance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }
    const velocity = {
      x: randomIntFromRange(-2, 2),
      y: randomIntFromRange(-2, 2),
    };
    ballArray.push(new Ball(x, y, velocity, radius, mass, color));
  }
}

// Animation Loop
function animate(): void {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update(ballArray);
  }
}
init();
animate();
