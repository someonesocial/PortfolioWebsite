# Portfolio

## Inspiration

Inspired by this [Machine](https://xkcd.com/2916) from xkcd, I thought it could be the basis for a cool background on an interactive portfolio site.
The original uses [Rapier](https://rapier.rs) as the physics engine, but after having problems installing it and its prerequisite 😒 I thought it would be cool and educational for me to code the physics from scratch using HTML Canvas. Little did I know that this would quickly turn into a maths and physics project.

# Canvas-Based Physics Simulation

## Overview

The **Canvas-Based Physics Simulation** is an interactive TypeScript project that simulates the motion and collision of bouncing balls within an HTML canvas. Inspired by the xkcd comic "Machine," this project serves as an engaging background for an interactive portfolio site. The simulation includes gravity, collision detection, and dynamic resizing.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Ball Class](#ball-class)
5. [Simulation Logic](#simulation-logic)
6. [Reflection](#reflection)
7. [Future Enhancements](#future-enhancements)
8. [Conclusion](#conclusion)

---

## Introduction

The Canvas-Based Physics Simulation aims to create an eye-catching visual experience for portfolio websites. By animating bouncing balls, we demonstrate fundamental physics concepts while showcasing creativity and technical skills.

## Getting Started

1. **Installation**:
   - Clone this repository to your local machine.
   - Open the project folder in your preferred code editor.

2. **Running the Simulation**:
   - Open `index.html` in a web browser.
   - Observe the bouncing balls within the canvas.

## Project Structure

The project is organized into several key components:

1. **DOM Utilities**:
   - Provides access to the canvas context (`c`).
   - Manages toggle switches for movement (`movement_switch`) and gravity (`gravity_switch`).

2. **Utility Functions**:
   - `randomFloatFromRange(min, max)`: Generates a random floating-point number within a specified range.
   - `distance(x1, y1, x2, y2)`: Calculates the distance between two points.
   - `rotate(velocity, angle)`: Rotates a velocity vector by a given angle.
   - `resolveCollision(particle, otherParticle)`: Handles collision resolution between two particles.

3. **Styles**:
   - The `styles.css` file provides styling for the canvas and balls.

## Ball Class

The `Ball` class encapsulates the behavior of individual balls:

- **Properties**:
  - `x`, `y`: Position coordinates.
  - `velocity`: Object with `x` and `y` components representing the ball's speed.
  - `radius`: Size of the ball.
  - `mass`: Mass of the ball (used for collision calculations).
  - `color`: Color of the ball.

- **Methods**:
  - `update()`: Updates the ball's position, handles collisions, and applies gravity.
  - `draw()`: Renders the ball on the canvas.

The modular design of the `Ball` class allows for easy expansion and alteration. For example:

- **Adding New Properties**:
  - To introduce additional ball properties (e.g., elasticity, texture), simply extend the class.

- **Custom Behavior**:
  - Create subclasses (e.g., `BouncingBall`, `ElasticBall`) with specialized behavior.
  - Override methods (e.g., `update()`) to implement custom rules.

## Simulation Logic

1. **Initialization (`init()`)**:
   - Determines the number of balls based on the canvas area.
   - Ensures non-overlapping initial positions.

2. **Animation Loop (`animate()`)**:
   - Updates and redraws the balls on each frame.
   - Controlled by the `movement_switch`.

## Reflection

- **Challenges**:
There were times during development when I wished I had used a physics library. For example, some of the balls would get stuck on the sides because when I was calculating the collision I forgot to include their current velocity, which is added after the check but before the draw function. Bugs like this were time-consuming to diagnose.

## Future Enhancements

1. **Interactive Features**:
   - Mouse interactions (e.g., dragging balls).
   - User-configurable parameters (e.g., elasticity, gravity strength).

2. **Physics Engine Integration**:
   - Consider using a physics library (e.g., Matter.js) for more robust behavior.

## Conclusion

The Canvas-Based Physics Simulation combines creativity, physics, and modular design. As you explore this project, imagine its potential as a captivating portfolio background. 🚀🎨
---

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
