// create canvas 
var canvas = document.querySelector('canvas')

canvas.height = outerHeight
canvas.width = canvas.height * (4 / 3)

var c = canvas.getContext('2d')

var hasStarted = false

// to-do add resize 

// line class
class Line {
    constructor({ startPosition, endPosition, velocity }) {
        this.startPosition = startPosition
        this.endPosition = endPosition
        this.velocity = velocity
    }

    draw() {
        c.beginPath
        c.moveTo(this.startPosition.x, this.startPosition.y)
        c.lineTo(this.endPosition.x, this.endPosition.y)
        c.strokeStyle = 'white'
        c.stroke()
    }

    update() {
        this.draw()

        if (hasStarted) {
            this.endPosition.y += this.velocity.y
            console.log(this.endPosition.y )
            if (this.startPosition.y < this.endPosition.y) {
                this.endPosition.y = this.startPosition.y
            }
        }
    }
}

const centerLine = new Line({
    startPosition: {
        x: canvas.width * .50,
        y: canvas.height * .9
    },
    endPosition: {
        x: canvas.width * .50,
        y: canvas.height * .02
    },
    velocity: {
        x: 0,
        y: 1
    }
})

centerLine.draw()

//get start button
var startBtn = document.querySelector('#startBtn')

startBtn.addEventListener('click', () => {
    console.log('pressed')
    hasStarted = true
})

// player class
class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        //right side
        c.moveTo(this.position.x, this.position.y)
        c.lineTo(this.position.x + 20, this.position.y + 20)
        c.lineTo(this.position.x + 10, this.position.y + 20)
        c.lineTo(this.position.x + 10, this.position.y + 40)
        c.lineTo(this.position.x + 30, this.position.y + 60)
        c.lineTo(this.position.x + 18, this.position.y + 60)
        c.lineTo(this.position.x + 18, this.position.y + 70)
        c.lineTo(this.position.x + 10, this.position.y + 70)
        c.lineTo(this.position.x + 10, this.position.y + 60)
        c.lineTo(this.position.x, this.position.y + 60)
        //left side
        c.moveTo(this.position.x, this.position.y)
        c.lineTo(this.position.x - 20, this.position.y + 20)
        c.lineTo(this.position.x - 10, this.position.y + 20)
        c.lineTo(this.position.x - 10, this.position.y + 40)
        c.lineTo(this.position.x - 30, this.position.y + 60)
        c.lineTo(this.position.x - 18, this.position.y + 60)
        c.lineTo(this.position.x - 18, this.position.y + 70)
        c.lineTo(this.position.x - 10, this.position.y + 70)
        c.lineTo(this.position.x - 10, this.position.y + 60)
        c.lineTo(this.position.x, this.position.y + 60)
        c.strokeStyle = 'white'
        c.stroke()
    }

    update() { // each frame of animation
        this.draw()
        this.position.y += this.velocity.y
    }
}

// draw players
const player1 = new Player({
    position: {
        x: canvas.width * .25,
        y: canvas.height * .90
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player1.draw()

const player2 = new Player({
    position: {
        x: canvas.width * .75,
        y: canvas.height * .90
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player2.draw()

var score = 0
// player event listeners
addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player1.velocity.y = -2
            console.log(player1.position.y)
            break
        case 'ArrowDown':
            player1.velocity.y = 2
            console.log(player1.position.y)
            break
    }

    if (player1.position.y < 0) {
        score++
        player1.position.y = canvas.height * .90
        console.log(`Score: ${score}`)
    }

    if (player1.position.y > canvas.height) {
        player1.velocity.y = 0
        player1.position.y = canvas.height * .90 + 70
        console.log('bottom')
    }
})

addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player1.velocity.y = 0
            break
        case 'ArrowDown':
            player1.velocity.y = 0
            break
    }
})

// astroid class
let astroidRadius = 3;

class Circle {
    constructor({ position, velocity, radius, color }) {
        this.position = position
        this.velocity = velocity
        this.color = color
        this.radius = radius
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.strokeStyle = this.color
        c.stroke()
    }

    rightUpdate() { // each frame of animation
        this.draw()
        if (this.position.x + this.velocity.x > canvas.width) {
            this.position.x = 0
        } else {
            this.position.x += this.velocity.x
        }
    }

    leftUpdate() { // each frame of animation
        this.draw()
        if (this.position.x - this.velocity.x < 0) {
            this.position.x = canvas.width
        } else {
            this.position.x -= this.velocity.x
        }
    }
}

// draw astroids
function createAstroids({ arr, num }) {
    for (let i = 0; i < num; i++) {
        arr.push(new Circle({
            position: {
                x: getRandomArbitrary(astroidRadius, canvas.width - astroidRadius),
                y: getRandomArbitrary(astroidRadius, (canvas.height / 10) * 8)
            },
            velocity: {
                x: 2,
                y: 0
            },
            radius: astroidRadius,
            color: 'white'
        }))
    }
}

var rightAstroids = []

createAstroids({ arr: rightAstroids, num: 18 })

var leftAstroids = []

createAstroids({ arr: leftAstroids, num: 18 })



// animate
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // animate players
    player1.update()

    // animate right moving astroids
    for (let i = 0; i < rightAstroids.length; i++) {
        rightAstroids[i].rightUpdate()
    }

    // animate left moving astroids
    for (let i = 0; i < leftAstroids.length; i++) {
        leftAstroids[i].leftUpdate()
    }

    centerLine.update()


}

animate()

// extra functions
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}