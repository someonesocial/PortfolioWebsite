/**
 * Generates a random float within a specified range.
 *
 * @param  min: number | The lower bound of the range (inclusive).
 * @param  max: number | The upper bound of the range (inclusive).
 * @return number | A random float between the min and max values.
 */

function randomFloatFromRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Calculates the distance between two points in 2D space.
 *
 * @param  x1: number | The x-coordinate of the first point.
 * @param  y1: number | The y-coordinate of the first point.
 * @param  x2: number | The x-coordinate of the second point.
 * @param  y2: number | The y-coordinate of the second point.
 * @return number | The distance between points (x1, y1) and (x2, y2).
 */

function distance(x1: number, y1: number, x2: number, y2: number): number {
  const xDist: number = x2 - x1;
  const yDist: number = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  velocity: Object | The velocity of an individual particle
 * @param  angle: number    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(
  velocity: { x: number; y: number },
  angle: number
): { x: number; y: number } {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  particle: Object      | A particle object with x and y coordinates, plus velocity
 * @param  otherParticle: Object | A particle object with x and y coordinates, plus velocity
 * @return void | Does not return a value
 */

function resolveCollision(
  particle: {
    velocity: { x: number; y: number };
    x: number;
    y: number;
    mass: number;
  },
  otherParticle: {
    velocity: { x: number; y: number };
    x: number;
    y: number;
    mass: number;
  }
): void {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m2 - m1)) / (m1 + m2) + (u1.x * 2 * m1) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

export { randomFloatFromRange, distance, resolveCollision };
