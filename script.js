var canvas = document.querySelector('canvas')

canvas.width = 1150
canvas.height = innerHeight

var c = canvas.getContext('2d')

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

const player1 = new Player({
    position: {
        x: (canvas.width / 4) * 1,
        y: (canvas.height / 10) * 9
    },
    velocity: {
        x: 0,
        y: 0
    }
})
player1.draw()

const player2 = new Player({
    position: {
        x: (canvas.width / 4) * 3,
        y: (canvas.height / 10) * 9
    },
    velocity: {
        x: 0,
        y: 0
    }
})
player2.draw()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player1.update()
}

// animate()

addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player1.velocity.y = -2
            break
        case 'ArrowDown':
            player1.velocity.y = 2
            break
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

// astroids

class Circle {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.strokeStyle = 'white'
        c.stroke()
    }

    update() { // each frame of animation
        this.draw()
        this.position.x += this.velocity.x
    }
}

const astroid = new Circle({
    position: {
        x: 500,
        y: 500,
    },
    velocity: {
        x: 0,
        y: 0
    }
})

let astroids = []

function createAstroids(num) {
    astroids = []

    for (let i = 0; i < num; i++) {

        astroids.push(new Circle({
            position: {
                x: getRandomArbitrary(4, canvas.width - 4),
                y: getRandomArbitrary(4, ((canvas.height / 10) * 9) + 10)
            },
            velocity: {
                x: 0,
                y: 0
            }
        }))
    }
}

createAstroids(18)

console.log(astroids)
console.log(astroids.length)

for(let i = 0; i < astroids.length; i++) {
    astroids[i].draw()
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


