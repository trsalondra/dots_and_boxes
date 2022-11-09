var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerWidth


var c = canvas.getContext('2d')

// c.fillStyle = 'rgba(0, 255, 0, 0.3)'
// c.fillRect(100, 100, 300, 200)
// c.fillStyle = 'rgba(255, 0, 0, 0.3)'
// c.fillRect(500, 500, 100, 200)
// c.fillStyle = 'rgba(0, 0, 255, 0.3)'
// c.fillRect(800, 800, 300, 200)

// line 
// c.beginPath()
// c.moveTo(500, 100)
// c.lineTo(500, 300)
// c.lineTo(400, 300)
// c.strokeStyle = 'green'
// c.stroke()

// arc / circle
// c.beginPath()
// c.arc(1000, 500, 300, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()

// for (let i = 0; i < 3; i++) {
// let x = Math.random() * window.innerWidth
// let y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.arc(x, y, 100, 0, Math.PI * 2, false)
//     c.strokeStyle = 'blue'
//     c.stroke()
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40
var minRadius = 2

var colorArr = [
    '#F2637E',
    '#F20CCC',
    '#0476D9',
    '#F2E30F',
    '#F2CC0C'
]

window.addEventListener('mouseover',
    function (event) {
        mouse.x = event.x
        mouse.y = event.y
        console.log(mouse)
    })

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerWidth
})

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.minRadius = radius
        this.color = colorArr[Math.floor(Math.random() * colorArr.length) + 1]
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'rgba(0, 0, 0, 0)'
        c.fill()
        c.fillStyle = this.color
        c.stroke()
    }

    update() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx
        this.y += this.dy

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius++
            }
        } else if (this.radius > 2) {
            if (this.radius < this.minRadius) {
                this.radius--
            }
        }
        this.draw()
    }
}

let circleArr = []

function init() {

    circleArr = []
    for (let i = 0; i < 50; i++) {
        var x = ((Math.random() * innerWidth) - radius * 2) + radius
        var y = ((Math.random() * innerHeight) - radius * 2) + radius
        var dx = ((Math.random() - 0.5) * 2)
        var dy = ((Math.random() - 0.5) * 2)
        var radius = Math.floor(Math.random() * 3) + 1

        circleArr.push(new Circle(x, y, dx, dy, radius))
    }
}

init()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
    }
}

animate()
