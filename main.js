'use strict'

// ============== VARIABLES ==============
const width = 25
const grid = document.querySelector('.grid')
const score = document.querySelector('.score')
let scoreCount = 0
let squares = []
// Grid
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


//  ============== RENDER BOARD ==============

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

createBoard()


// ============== PACMAN ==============
// pac-man start
let pacmanCurrentIndex = 437
squares[pacmanCurrentIndex].classList.add('pac-man')

// Controls
function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
        case 38: // up
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex >= width
                ) {
                pacmanCurrentIndex -= width
            }
        break
        case 40: // down
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall', 'ghost-lair') &&
                pacmanCurrentIndex <= (width * (width - 1))
                )  {
                pacmanCurrentIndex += width
            }
        break
        case 37: // left
            if (pacmanCurrentIndex === 300) {
                pacmanCurrentIndex = 324
            } else if (
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
                ) {
                pacmanCurrentIndex -= 1
            }
        break
        case 39: // right
            if (pacmanCurrentIndex === 324) {
                pacmanCurrentIndex = 300
            } else if (
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
                ) {
                pacmanCurrentIndex += 1
            }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    watchGameOver()
    watchGameWin()
}

document.addEventListener('keydown', control)


// ============== PAC DOT / PELLETS ==============
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        scoreCount++
        score.innerHTML = scoreCount
    }
}

// Power pellet
function powerPelletEaten() {
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

        if (ghost.isScared) {
            ghosts.forEach(ghost => {
                squares[ghost.currentIndex].classList.add('scared')
            })
        }

        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared')
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        watchGameOver()
        watchGameWin()
    }, ghost.speed)

}


function watchGameOver() {

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

    let dotCheck = document.querySelectorAll('.pac-dot').length
    let pelletCheck = document.querySelectorAll('.power-pellet').length
    let remaining = dotCheck + pelletCheck

    if (scoreCount >= targetScore || remaining === 0) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        score.innerHTML = `You Win`
    }

}


// ============== ON LOAD ==============
score.innerHTML = scoreCount