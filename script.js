let isRunning = false
let isDone = false
let player1Color = 'white'
let player2Color = 'white'
let centerLineColor = 'white'
let astroidRadius = 3
let astroidColor = 'white'
let astroidNum = 36
let upKey = 'k'
let downKey = 'm'
let canvasColor = 'purple'
let lineSpeed = .125
let endGameMsg = document.querySelector('#endGameMsg')
let musicVolume = .35
let effectsVolume = .5

//////////////////////////////////////////////CANVAS
let canvas = document.querySelector('canvas')

canvas.style.background = canvasColor

canvas.height = innerHeight
canvas.width = canvas.height * (4 / 3)

let c = canvas.getContext('2d')

//////////////////////////////////////////////AUDIO
let collisionAudio = new Audio('./audio/collision4.wav ')
collisionAudio.volume = effectsVolume

let scoreAudio = new Audio('./audio/score2.wav')
scoreAudio.volume = effectsVolume

let gamePlayAudio = new Audio('./audio/stranger-things.mp3')
gamePlayAudio.volume = musicVolume

let endPlayAudio = new Audio('./audio/endPlay2.mp3')
endPlayAudio.volume = musicVolume

//////////////////////////////////////////////BUTTONS and PAGES
let BtnContainer = document.querySelector('.BtnContainer') // contains playBtn and helpBtn

let playBtn = document.querySelector('#playBtn')
playBtn.style.background = canvasColor

let helpBtn = document.querySelector('#helpBtn')
helpBtn.style.background = canvasColor

let playAgainBtn = document.querySelector('#playAgainBtn')

let helpPg = document.querySelector('.helpPg')

let closeHelp = document.querySelector("#closeHelp")

let endGamePg = document.querySelector('.endGamePg')

endGamePg.style.height = `${canvas.height}px`
endGamePg.style.width = `${canvas.width}px`

helpPg.style.height = `${canvas.height}px`
helpPg.style.width = `${canvas.width}px`

closeHelp.onclick = function () {
    helpPg.style.display = 'none'
    BtnContainer.style.display = 'flex'
}

helpBtn.onclick = function () {
    BtnContainer.style.display = 'none'
    helpPg.style.display = 'flex'
}

playBtn.onclick = function () {
    BtnContainer.style.display = 'none'
    isRunning = true
    animate()
}

playAgainBtn.onclick = function () {
    isDone = false
    isRunning = true
    player1.score = 0
    player2.score = 0
    player1.reset()
    player2.reset()
    centerLine.reset()
}

//////////////////////////////////////////////LINE
class Line {
    constructor({ color, bottomPosition, topPosition, velocity }) {
        this.color = color
        this.bottomPosition = bottomPosition
        this.topPosition = topPosition
        this.velocity = velocity
        this.yInitPosition = this.topPosition.y
        this.yInitVelocity = this.velocity.y
    }

    draw() {
        c.beginPath
        c.moveTo(this.bottomPosition.x, this.bottomPosition.y)
        c.lineTo(this.topPosition.x, this.topPosition.y)
        c.strokeStyle = this.color
        c.stroke()
    }

    update() { // each frame of animation
        this.draw()
        if (isRunning) {
            if (gamePlayAudio.muted === true) {
                gamePlayAudio.muted = false
                gamePlayAudio.currentTime = 1
            }
            if (endPlayAudio.muted === false) {
                endPlayAudio.muted = true
            }

            gamePlayAudio.play()

            this.topPosition.y += this.velocity.y
            if (this.bottomPosition.y <= this.topPosition.y) {
                if (endPlayAudio.muted === true) {
                    endPlayAudio.muted = false
                    endPlayAudio.currentTime = 1
                }
                if (gamePlayAudio.muted === false) {
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
        this.topPosition.y = this.yInitPosition
        this.velocity.y = this.yInitVelocity
    }
}

// draw line
let centerLine = new Line({
    color: centerLineColor,
    bottomPosition: {
        x: canvas.width * .50,
        y: canvas.height * .9
    },
    topPosition: {
        x: canvas.width * .50,
        y: canvas.height * .02
    },
    velocity: {
        x: 0,
        y: lineSpeed
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
        this.yInitPosition = this.position.y
    }

    draw() {
        c.beginPath()
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

    reset() {
        this.position.y = this.yInitPosition
    }
}

// draw players
let player1 = new Player({
    name: 'Player 1',
    color: player1Color,
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
    color: player2Color,
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

let currentPlayer = player1

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
            this.position.x = canvas.width
        } else {
            this.position.x -= this.velocity.x
            this.left = this.position.x - this.radius - this.velocity.x
            this.right = this.position.x + this.radius - this.velocity.x
        }
    }
}

// draw astroids
function createAstroids({ arr, num }) {
    for (let i = 0; i < num; i++) {
        arr.push(new Astroid({
            color: astroidColor,
            position: {
                x: getRandomArbitrary(astroidRadius, canvas.width - astroidRadius),
                y: getRandomArbitrary(astroidRadius, canvas.height * .80)
            },
            velocity: {
                x: 2,
                y: 0
            },
            radius: astroidRadius
        }))
    }
}

let rightAstroids = []
let leftAstroids = []

createAstroids({ arr: rightAstroids, num: astroidNum / 2 })
createAstroids({ arr: leftAstroids, num: astroidNum / 2 })

//////////////////////////////////////////////EVENT LISTENERS
addEventListener('keydown', (event) => {
    switch (event.key) {
        case upKey:
            currentPlayer.velocity.y = -2
            break
        case downKey:
            currentPlayer.velocity.y = 2
            break
    }

    if (currentPlayer.position.y < 0) {
        scoreAudio.play()
        currentPlayer.score++
        currentPlayer.position.y = canvas.height * .90
    }

    if (currentPlayer.position.y + currentPlayer.velocity.y > canvas.height * .90) {
        currentPlayer.velocity.y = 0
        currentPlayer.position.y = canvas.height * .90
    }
})

addEventListener('keyup', (event) => {
    switch (event.key) {
        case upKey:
            currentPlayer.velocity.y = 0
            break
        case downKey:
            currentPlayer.velocity.y = 0
            break
    }
})

//////////////////////////////////////////////ANIMATION
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)

    // animate centerLine
    centerLine.update()

    // animate players
    player1.update()

    player2.update()

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

    // animate (update) scores
    c.font = '148px courier new' // change scoreFont
    c.fillStyle = player1Color
    c.fillText(`${player1.score}`, canvas.width * .089, canvas.height * .90 + 70)

    c.font = "148px courier new" // change scoreFont
    c.fillStyle = player2Color
    c.fillText(`${player2.score}`, canvas.width * .844, canvas.height * .90 + 70)

    // animate (update) endGamePg
    if (isDone) {
        if (player1.score > player2.score) {
            endGameMsg.innerHTML = 'PLAYER 1 WINS'
        } else if (player1.score < player2.score) {
            endGameMsg.innerHTML = 'PLAYER 2 WINS'
        } else { // tie
            endGameMsg.innerHTML = 'Tie!'
        }

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


