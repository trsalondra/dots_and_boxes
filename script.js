
var boardHeight = innerHeight
var boardWidth = innerHeight

var layer2 = document.querySelector('#c2')

layer2.width = innerWidth
layer2.height = innerHeight


var c2 = layer2.getContext('2d')

class Dot {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw() {
        c2.beginPath()
        c2.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c2.lineWidth = 3
        c2.strokeStyle = 'black'
        c2.fillStyle = 'white'
        c2.fill()
        c2.stroke()
    }
}

var dotsArr = []

function dotGrid(rows, columns) {
    for (let k = 0; k < rows; k++) {
        var y = 250 + (130 * k)
        for (let j = 0; j < columns; j++) {
            var x = 250 + (130 * j)
            dotsArr.push(new Dot(x, y, 20))
        }
    }
}

dotGrid(5, 6)
console.log(dotsArr)
console.log(dotsArr[0])
console.log(dotsArr[29])

function drawDots(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].draw()
    }
}

drawDots(dotsArr)

//////////////////////////////////////////////////////////////////////////

var layer1 = document.querySelector('#c1')

layer1.width = innerWidth
layer1.height = innerHeight

var c1 = layer1.getContext('2d')

function roundedRect(c, x, y, width, height, radius) {
    // ctx.beginPath()
    c.moveTo(x, y + radius)
    c.arcTo(x, y + height, x + radius, y + height, radius)
    c.arcTo(x + width, y + height, x + width, y + height - radius, radius)
    c.arcTo(x + width, y, x + width - radius, y, radius)
    c.arcTo(x, y, x, y + radius, radius)
    c.stroke()
}



c1.beginPath();
c1.lineWidth = 3
c1.strokeStyle = 'red'
c1.fill()
roundedRect(c1, 150, 150, 850, 720, 20)

function dotToDot(c, dot1, dot2) {
    c.beginPath();
    c.lineWidth = 3
    c.strokeStyle = 'green'
    c.fill()
    c.moveTo(dot1.x, dot1.y)
    c.lineTo(dot2.x, dot2.y)
    c.stroke();
}

//horizontal lines
for (let i = 0; i < 6; i++) {
    dotToDot(c1, dotsArr[i], dotsArr[i + 24])
}

// vertical lines
for (let i = 0; i < 6; i++) {
    dotToDot(c1, dotsArr[i * 6], dotsArr[(i * 6) + 5])
}