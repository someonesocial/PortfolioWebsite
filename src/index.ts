// Imports use relative file paths or Node.js package names
import { textInput, canvas, c } from './dom-utils';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import './styles/styles.css';


//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE

// init App
textInput.addEventListener('input', (e) => {
    //log input value
    console.log((e.target as HTMLInputElement).value);
})




canvas.width = innerWidth
canvas.height = innerHeight

const mouse: { x: number, y: number } = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event: MouseEvent) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class MyObject {
  constructor(public x: number, public y: number, public radius: number, public color: string) {}

  draw(): void {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update(): void {
    this.draw()
  }
}

// Implementation
let objects: MyObject[]
function init(): void {
  objects = []

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate(): void {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()