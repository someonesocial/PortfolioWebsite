const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;
let movement_switch = document.querySelector("#movement") as HTMLInputElement;
let gravity_switch = document.querySelector("#gravity") as HTMLInputElement;
export { canvas, c, movement_switch, gravity_switch };
