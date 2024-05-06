# Portfolio

## Inspiration

Inspired by this [Machine](https://xkcd.com/2916) from xkcd, I thought it could be the basis for a cool background on an interactive portfolio site.
The original uses [Rapier](https://rapier.rs) as the physics engine, but after having problems installing it and its prerequisite 😒 I thought it would be cool and educational for me to code the physics from scratch using HTML Canvas. Little did I know that this would quickly turn into a maths and physics project.

## Technical Documentation: Canvas-Based Physics Simulation
### Overview
This TypeScript module is designed to simulate the motion and collision of balls within a canvas element in a web browser. It includes gravity and movement toggles, collision detection, and dynamic canvas resizing.

### Module Imports
DOM Utilities: Provides access to the canvas context (c), and toggle switches for movement and gravity (movement_switch, gravity_switch).
Utility Functions: Includes functions for generating random numbers within a range (randomFloatFromRange), calculating the distance between two points (distance), and resolving collisions between particles (resolveCollision).
Styles: A separate CSS file for styling (styles.css).

### Global Variables
canvas: The HTML canvas element where the simulation runs.
mouse: An object to track the mouse position on the canvas (during the development i had planned some interactions to be controlled with the mouse, but later decided against it).
color: The color of the balls in the simulation.
gravity: A variable to control the gravity effect in the simulation.

### Event Listeners
Gravity Toggle: Listens for changes on the gravity_switch and updates the gravity variable accordingly.
Mouse Movement: Updates the mouse object with the current mouse position.
Window Resize: Adjusts the canvas dimensions and re-initializes the simulation.

### Ball Class
Defines the properties and methods for individual balls in the simulation:

Properties: Position (x, y), velocity, radius, mass, and color.
Methods:
update(): Updates the ball’s position and handles collisions with other balls.
draw(): Renders the ball on the canvas.

### Simulation Functions
calculateNumberOfBalls(): Determines the number of balls to display based on the canvas area.
init(): Initializes the simulation by creating and positioning the balls.
animate(): The main animation loop that updates and redraws the balls on each frame.

### Utility Functions
randomFloatFromRange(min, max): Returns a random floating-point number between min and max.
distance(x1, y1, x2, y2): Calculates the distance between two points.
rotate(velocity, angle): Rotates a velocity vector by a given angle.
resolveCollision(particle, otherParticle): Adjusts the velocities of two colliding particles based on their masses and velocities.

## Reflection

There were times during development when I wished I had used a physics library. For example, some of the balls would get stuck on the sides because when I was calculating the collision I forgot to include their current velocity, which is added after the check but before the draw function. Bugs like this were time-consuming to diagnose.

## How to work with Vite

### Prerequisites

Have a modern version of Node.installed. Last check was with v20.11

### How to set up

- Open a Terminal in the folder containing the package.json
- Type `npm i` to install the dependencies inside of the project automatically
- Type `npm run dev` into the terminal and see if your files would be compiled correctly
- Take a look at the `index.ts`, the package.json and the `tsconfig.json` file to see how they work
- The `index.ts` file is the entry-point of your application (defined in `rollup.config.js`) - see how it can import other modules
- after you watched how the typescript modules work with each other you can delete all .ts files in the src folder except `index.ts`
- then empty the `index.ts` file and empty the body of your `index.html` file and start building your own app

### Starting the app

- After you did set up your application, run `npm run build` to compile it. If there are no erros, there should be a "build"-folder in your project folder
- take a look at `index.html` - it should already have a script file connected to your TypeScript (The browser can only run JavaScript)
-

Write any source files in typescript inside the source folder, the main file being index.ts as entry file for vite.

run `npm run preview` to preview your executed build
