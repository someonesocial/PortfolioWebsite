// Imports use relative file paths or Node.js package names
import { canvas, c } from "./dom-utils"; // Importing canvas and context from a utility file
import { randomIntFromRange, distance, resolveCollision } from "./utils"; // Importing utility functions
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import "./styles/styles.css"; // Importing CSS for styling

// Set the canvas dimensions to the window's inner dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse: { x: number; y: number } = {
  // Mouse object to store the mouse position for posible future interactivity use
  x: innerWidth / 2, // Initial horizontal position of the mouse
  y: innerHeight / 2, // Initial vertical position of the mouse
};

const color: string = "#fff"; // Color for the balls (red)

const gravity = 0.1; // Gravity value that will affect the ball's vertical velocity

// Event Listeners
addEventListener("mousemove", (event: MouseEvent) => {
  mouse.x = event.clientX; // Update mouse x position
  mouse.y = event.clientY; // Update mouse y position
});

addEventListener("resize", () => {
  canvas.width = innerWidth; // Update canvas width on window resize
  canvas.height = innerHeight; // Update canvas height on window resize

  init(); // Re-initialize the animation on window resize
});

addEventListener("click", () => {
  init(); // Re-initialize the animation on mouse click
});

// Objects
class Ball {
  // Ball class to create and update balls
  x: number; // Horizontal position
  y: number; // Vertical position
  velocity: { x: number; y: number }; // Velocity in both x and y directions
  radius: number; // Radius of the ball
  mass: number; // Mass of the ball (used in collision resolution)
  color: string; // Color of the ball

  constructor(
    x: number,
    y: number,
    velocity: { x: number; y: number },
    radius: number,
    mass: number,
    color: string
  ) {
    // Constructor to initialize the ball properties
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.mass = mass;
    this.color = color;
  }

  update(ballArray: Ball[]): void {
    // Update function to change ball position and handle collisions
    this.draw(); // Draw the ball

    // Collision detection with the bottom of the canvas
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y; // Invert y velocity to bounce
    } else {
      this.velocity.y += gravity; // Apply gravity to y velocity
    }

    // Collision detection with the top of the canvas
    if (this.y - this.radius + this.velocity.y <= 0) {
      this.velocity.y = -this.velocity.y; // Invert y velocity to bounce
    }

    // Collision detection with the sides of the canvas
    if (
      this.x + this.radius + this.velocity.x >= canvas.width ||
      this.x - this.radius + this.velocity.x <= 0
    ) {
      this.velocity.x = -this.velocity.x; // Invert x velocity to bounce
    }

    // Check for collisions with other balls
    for (let i = 0; i < ballArray.length; i++) {
      if (this === ballArray[i]) continue; // Skip self
      if (
        distance(this.x, this.y, ballArray[i].x, ballArray[i].y) -
          this.radius * 2 <
        0
      ) {
        resolveCollision(this, ballArray[i]); // Resolve collision with another ball
      }
    }

    // Update the ball's position based on its velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw(): void {
    // Draw function to render the ball on the canvas
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Draw a circle
    c.fillStyle = this.color; // Set the fill color
    c.fill(); // Fill the circle with color
    c.closePath();
  }
}

// Implementation
let ballArray: Ball[] = []; // Array to hold all the balls

function init(): void {
  // Initialization function to create balls
  ballArray = []; // Reset the ball array

  for (let i = 0; i < 50; i++) {
    // Create 50 balls
    const radius = 20; // Set a fixed radius for all balls
    const mass = 1; // Set a fixed mass for all balls
    let x = randomIntFromRange(radius, canvas.width - radius); // Random x position
    let y = randomIntFromRange(radius, canvas.height - radius); // Random y position

    // Avoid overlapping balls on creation
    if (i !== 0) {
      for (let j = 0; j < ballArray.length; j++) {
        if (distance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1; // Reset loop to check for overlaps again
        }
      }
    }

    // Random velocity for each ball
    const velocity = {
      x: randomIntFromRange(-2, 2),
      y: randomIntFromRange(-2, 2),
    };

    // Add the new ball to the array
    ballArray.push(new Ball(x, y, velocity, radius, mass, color));
  }
}

// Animation Loop
function animate(): void {
  // Animation function to update and draw balls
  requestAnimationFrame(animate); // Call animate again on the next frame

  c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Update and draw each ball
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update(ballArray); // Update the position and draw the ball
  }
}

init(); // Initialize the balls
animate(); // Start the animation loop
