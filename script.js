let isRunning = false
let isDone = false

//////////////////////////////////////////////CANVAS
let canvas = document.querySelector('canvas')

canvas.height = innerHeight
canvas.width = canvas.height * (4 / 3)

let c = canvas.getContext('2d')

//get start button
let playBtn = document.querySelector('#playBtn')

let endGamePg = document.querySelector('.endGamePg')

endGamePg.style.height = `${canvas.height}px`
endGamePg.style.width = `${canvas.width}px`

let playAgainBtn = document.querySelector('#playAgainBtn')

let helpBtn = document.querySelector('#helpBtn')

let helpPg = document.querySelector('.helpPg')

helpPg.style.height = `${canvas.height}px`
helpPg.style.width = `${canvas.width}px`

let closeHelp = document.querySelector("#closeHelp")

let BtnContainer = document.querySelector('.BtnContainer')

let collisionAudio = new Audio ('./audio/collision4.wav ')

let scoreAudio = new Audio('./audio/score2.wav')

let gamePlayAudio = new Audio('./audio/stranger-things.mp3')
gamePlayAudio.volume = .35

let endPlayAudio = new Audio('./audio/endPlay2.mp3')
endPlayAudio.volume = .35

closeHelp.onclick = function () {
    helpPg.style.display = 'none'
    BtnContainer.style.display = 'flex'
}

helpBtn.onclick = function () {
    helpPg.style.display = 'flex'
    BtnContainer.style.display = 'none'
}

playBtn.onclick = function () {
    isRunning = true
    BtnContainer.style.display = 'none'
    animate()
}

playAgainBtn.onclick = function () {
    isDone = false
    isRunning = true
    centerLine.reset()
    player1.score = 0
    player2.score = 0
}





//////////////////////////////////////////////LINE
class Line {
    constructor({ color, startPosition, endPosition, velocity }) {
        this.color = color
        this.startPosition = startPosition
        this.endPosition = endPosition
        this.velocity = velocity
        this.initPositionY = this.endPosition.y
        this.initVelocityY = this.velocity.y
    } 

    draw() {
        c.beginPath
        c.moveTo(this.startPosition.x, this.startPosition.y)
        c.lineTo(this.endPosition.x, this.endPosition.y)
        c.strokeStyle = this.color
        c.stroke()
    }

    update() {
        this.draw()
        if (isRunning) {
            if (gamePlayAudio.muted === true){
                gamePlayAudio.muted = false
                gamePlayAudio.currentTime = 1
            }

            if (endPlayAudio.muted === false){
                endPlayAudio.muted = true
            }

            gamePlayAudio.play()

            this.endPosition.y += this.velocity.y
            if (this.startPosition.y <= this.endPosition.y) {
                if (endPlayAudio.muted === true){
                    endPlayAudio.muted = false
                    endPlayAudio.currentTime = 1
                }
                if (gamePlayAudio.muted === false){
                    gamePlayAudio.muted = true
                }
                
                endPlayAudio.play()
                this.velocity.y = 0
                isRunning = false
                isDone = true
            }
        }
    }

    reset() {
        this.endPosition.y = this.initPositionY
        this.velocity.y = this.initVelocityY
    }
}

// draw line
let centerLine = new Line({
    color: 'white',
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
        y: 2
    }
})


//////////////////////////////////////////////PLAYERS
class Player {
    constructor({ name, color, position, velocity }) {
        this.name = name
        this.position = position
        this.velocity = velocity
        this.color = color
        this.top = this.position.y
        this.bottom = this.position.y + 70
        this.left = this.position.x - 30
        this.right = this.position.x + 30
        this.score = 0
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
        c.lineTo(this.position.x - 10, this.position.y + 60)
        c.lineTo(this.position.x - 10, this.position.y + 70)
        c.lineTo(this.position.x - 18, this.position.y + 70)
        c.lineTo(this.position.x - 18, this.position.y + 60)
        c.lineTo(this.position.x - 30, this.position.y + 60)
        c.lineTo(this.position.x - 10, this.position.y + 40)
        c.lineTo(this.position.x - 10, this.position.y + 20)
        c.lineTo(this.position.x - 20, this.position.y + 20)
        c.closePath()
        // c.fillStyle = this.color 
        // c.fill()      
        c.strokeStyle = this.color
        c.stroke()
    }

    update() { // each frame of animation
        this.draw()
        if (isRunning) {
            
            this.position.y += this.velocity.y
            this.top = this.position.y + this.velocity.y
            this.bottom = this.position.y + 70 + this.velocity.y
            this.left = this.position.x - 30
            this.right = this.position.x + 30
        }

    }
}

// draw players
let player1 = new Player({
    name: 'Player 1',
    color: 'white',
    position: {
        x: canvas.width * .25,
        y: canvas.height * .90
    },
    velocity: {
        x: 0,
        y: 0
    }
})

let player2 = new Player({
    name: 'Player 2',
    color: 'white',
    position: {
        x: canvas.width * .75,
        y: canvas.height * .90
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player1.draw()

player2.draw()

//////////////////////////////////////////////ASTROIDS
class Astroid {
    constructor({ color, position, velocity, radius }) {
        this.position = position
        this.velocity = velocity
        this.color = color
        this.radius = radius
        this.top = this.position.y - this.radius
        this.bottom = this.position.y + this.radius
        this.left = this.position.x - this.radius
        this.right = this.position.x + this.radius
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // c.fillStyle = this.color
        // c.fill()
        c.strokeStyle = this.color
        c.stroke()
    }

    rightUpdate() { // each frame of animation
        this.draw()
        if (this.position.x + this.velocity.x > canvas.width) {
            this.position.x = 0 // maybe add more
        } else {
            this.position.x += this.velocity.x
            this.left = this.position.x - this.radius + this.velocity.x
            this.right = this.position.x + this.radius + this.velocity.x
        }
    }

    leftUpdate() { // each frame of animation
        this.draw()
        if (this.position.x - this.velocity.x < 0) {
            this.position.x = canvas.width // maybe add more
        } else {
            this.position.x -= this.velocity.x
            this.left = this.position.x - this.radius - this.velocity.x
            this.right = this.position.x + this.radius - this.velocity.x
        }
    }
}

// draw astroids
let astroidRadius = 3

function createAstroids({ arr, num }) {
    for (let i = 0; i < num; i++) {
        arr.push(new Astroid({
            color: 'white',
            position: {
                x: getRandomArbitrary(astroidRadius, canvas.width - astroidRadius),
                y: getRandomArbitrary(astroidRadius, canvas.height * .80)
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

let rightAstroids = []

let leftAstroids = []

createAstroids({ arr: rightAstroids, num: 18 })

createAstroids({ arr: leftAstroids, num: 18 })

//////////////////////////////////////////////PAGEs



//////////////////////////////////////////////ANIMATION
let currentPlayer = player1

// player event listeners
addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'k':
            currentPlayer.velocity.y = -2
            break
        case 'm':
            currentPlayer.velocity.y = 2
            break
    }

    if (currentPlayer.position.y < 0) {
        scoreAudio.play()
        currentPlayer.score++
        currentPlayer.position.y = canvas.height * .90
        console.log(`${currentPlayer.name} Score: ${currentPlayer.score}`)
    }

    if (currentPlayer.position.y + currentPlayer.velocity.y > canvas.height * .90) {
        currentPlayer.velocity.y = 0
        currentPlayer.position.y = canvas.height * .90
    }
})

addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'k':
            currentPlayer.velocity.y = 0
            break
        case 'm':
            currentPlayer.velocity.y = 0
            break
    }
})

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)

    // animate right moving astroids
    for (let i = 0; i < rightAstroids.length; i++) {
        rightAstroids[i].rightUpdate()

        if (rightAstroids[i].right > currentPlayer.left && rightAstroids[i].left < currentPlayer.right && rightAstroids[i].bottom > currentPlayer.top && rightAstroids[i].top < currentPlayer.bottom) {
            collisionAudio.play()
            currentPlayer.velocity.y = 0
            currentPlayer.position.y = canvas.height * .90

            if (currentPlayer === player1) {
                currentPlayer = player2
            } else {
                currentPlayer = player1
            }
        }
    }

    // animate left moving astroids
    for (let i = 0; i < leftAstroids.length; i++) {
        leftAstroids[i].leftUpdate()

        if (leftAstroids[i].right > currentPlayer.left && leftAstroids[i].left < currentPlayer.right && leftAstroids[i].bottom > currentPlayer.top && leftAstroids[i].top < currentPlayer.bottom) {
            collisionAudio.play()
            currentPlayer.velocity.y = 0
            currentPlayer.position.y = canvas.height * .90

            if (currentPlayer === player1) {
                currentPlayer = player2
            } else {
                currentPlayer = player1
            }
        }
    }

    centerLine.update()

    // animate players
    player1.update()

    player2.update()

    c.font = '148px courier new'
    c.fillStyle = 'white'
    c.fillText(`${player1.score}`, canvas.width * .089, canvas.height * .90 + 70)

    c.font = "148px courier new"
    c.fillText(`${player2.score}`, canvas.width * .844, canvas.height * .90 + 70)

    if (isDone) {
        endGamePg.style.display = 'flex'
    }

    if (isRunning) {
        endGamePg.style.display = 'none'
    }
}

//////////////////////////////////////////////EXTRA FUNCTION
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


