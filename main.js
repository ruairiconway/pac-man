'use strict'

// ============== VARIABLES ==============
// grid
const width = 25
const grid = document.querySelector('.grid')
let squares = []
//score
const score = document.querySelector('.score')
let scoreCount = 0
// arrow buttons
const btnUp = document.querySelector('#btn-up')
const btnRight = document.querySelector('#btn-right')
const btnDown = document.querySelector('#btn-down')
const btnLeft = document.querySelector('#btn-left')
// grid
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,3,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,3,1,
    1,0,1,1,0,1,0,0,0,1,1,1,0,1,1,1,0,0,0,1,0,1,1,0,1,
    1,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1,
    1,0,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,1,1,1,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,
    1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,
    1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,
    1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,
    1,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,
    1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,
    4,4,4,4,4,4,4,4,1,4,1,2,2,2,1,4,1,4,4,4,4,4,4,4,4,
    1,1,1,1,1,0,1,1,1,4,1,2,2,2,1,4,1,1,1,0,1,1,1,1,1,
    1,1,1,1,1,0,1,1,1,4,1,1,1,1,1,4,1,1,1,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,0,1,1,0,1,1,1,4,1,1,1,0,1,1,0,1,1,1,0,1,
    1,0,1,0,0,0,0,0,0,0,1,0,4,0,1,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,
    1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,
    1,0,1,1,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,1,0,1,1,0,1,
    1,0,0,0,0,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,1,
    1,0,1,1,1,0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,1,1,1,0,1,
    1,3,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,3,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
// Target score
function createTargetScore(layout) {
    let target = 0
    for (let block of layout) {
        if (block === 0) {
            target += 1
        } else if (block === 3) {
            target += 10
        }
    }
    return target
}
let targetScore = createTargetScore(layout)


//  ============== BOARD ==============
// build board
function createBoard() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 4) {
            squares[i].classList.add('empty')
        }
    }
}
//render board
createBoard()


// ============== PACMAN ==============
// pac-man start
let pacmanCurrentIndex = 437
squares[pacmanCurrentIndex].classList.add('pac-man')

// pac-man direction
function movePacManUp() {
    if (
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        pacmanCurrentIndex >= width
        ) {
        pacmanCurrentIndex -= width
    }
}

function movePacManDown() {
    if (
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + width].classList.contains('wall', 'ghost-lair') &&
        pacmanCurrentIndex <= (width * (width - 1))
        )  {
        pacmanCurrentIndex += width
    }
}

function movePacManLeft() {
    if (pacmanCurrentIndex === 300) {
        pacmanCurrentIndex = 324
    } else if (
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        pacmanCurrentIndex % width !== 0
        ) {
        pacmanCurrentIndex -= 1
    }
}

function movePacManRight() {
    if (pacmanCurrentIndex === 324) {
        pacmanCurrentIndex = 300
    } else if (
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        pacmanCurrentIndex % width < width - 1
        ) {
        pacmanCurrentIndex += 1
    }
}

// controls
function control(e) {
    // move
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    if (e.keyCode === 38 || e.currentTarget.id === 'btn-up') { // up
        movePacManUp()
    } else if (e.keyCode === 40 || e.currentTarget.id === 'btn-down') { // down
        movePacManDown()
    } else if (e.keyCode === 37 || e.currentTarget.id === 'btn-left') { // left
        movePacManLeft()
    } else if (e.keyCode === 39 || e.currentTarget.id === 'btn-right') { // right
        movePacManRight()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    // run dot/pellet conditions
    pacDotEaten()
    powerPelletEaten()
    // run game conditions
    watchGameOver()
    watchGameWin()
}

// key event attached to control
document.addEventListener('keydown', control)
// click event attached to control
btnUp.addEventListener('click', control)
btnDown.addEventListener('click', control)
btnLeft.addEventListener('click', control)
btnRight.addEventListener('click', control)


// ============== PAC DOT / PELLETS ==============
function pacDotEaten() {
    // if pacman overlaps on a div containing pac-dot
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        scoreCount++
        score.innerHTML = scoreCount
    }
}

// Power pellet
function powerPelletEaten() {
    // if pacman overlaps on a div containing power-pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        scoreCount += 10
        score.innerHTML = scoreCount
        ghosts.forEach(ghost => {
            ghost.isScared = true
            setTimeout( () => {
                ghosts.forEach(ghost => {
                    ghost.isScared = false
                })
            }, 10000)
        })
    }
}


// ============== GHOSTS ==============
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 311, 250),
    new Ghost('pinky', 336, 400),
    new Ghost('inky', 313, 300),
    new Ghost('clyde', 338, 500),
]

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    // ghost moves on class assigned interval in a random direction till it hits wall / other ghost
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval( () => {
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }
        // if ghost is scared
        if (ghost.isScared) {
            ghosts.forEach(ghost => {
                squares[ghost.currentIndex].classList.add('scared')
            })
        }
        // if ghost is scared and pac-man overlaps
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared')
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        // run game conditions
        watchGameOver()
        watchGameWin()
    }, ghost.speed)

}


function watchGameOver() {
    // check for game over conditions - ghost overlaps with pac-man
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared')
        ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        score.innerHTML = `You Lose`
    }

}


function watchGameWin() {
    // check for game win conditions - all dots + pellets eaten - target score reached
    let dotCheck = document.querySelectorAll('.pac-dot').length
    let pelletCheck = document.querySelectorAll('.power-pellet').length
    let remaining = dotCheck + pelletCheck

    if (scoreCount >= targetScore || remaining === 0) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        score.innerHTML = `You Win`
    }

}


// ============== SCORE ==============
score.innerHTML = scoreCount