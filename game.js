function load_image() {
    // player, virus, gem
    enemyImage = new Image
    enemyImage.src = 'assets/v1.png'

    playerImage = new Image
    playerImage.src = 'assets/superhero.png'

    gemImage = new Image
    gemImage.src = 'assets/gem.png'
}

function init() {
    // define objects we will have in the game
    canvas = document.getElementById('mycanvas')
    W = 700
    H = 400
    canvas.width = W
    canvas.height = H

    //create a context
    pen = canvas.getContext('2d')
    gameOver = false

    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20
    }
    e2 = {
        x: 300,
        y: 150,
        w: 60,
        h: 60,
        speed: 30
    }
    e3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 40
    }

    enemy = [e1, e2, e3]

    player = {
        x: 20,
        y: H / 2,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        health: 100
    }
    gem = {
        x: W - 100,
        y: H / 2,
        w: 60,
        h: 60,
    }

    //listen to events on the canvas
    canvas.addEventListener('mousedown', function() {
        player.moving = true
    })
    canvas.addEventListener('mouseup', function() {
        player.moving = false
    })
}

function isOverlap(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true
    }
    return false
}

function draw() {
    //clear the canvas area for the old frame
    pen.clearRect(0, 0, W, H)

    //draw player
    pen.drawImage(playerImage, player.x, player.y, player.w, player.h)
    //draw gem
    pen.drawImage(gemImage, gem.x, gem.y, gem.w, gem.h)

    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemyImage, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h)
    }

    pen.fillStyle = 'white'
    pen.fillText('Score' + player.health, 10, 10)
}

function update() {
    //if the player is moving
    if (player.moving) {
        player.x += player.speed
        player.health += 20;
    }

    //overlap enemy
    for (let i = 0; i < enemy.length; i++) {
        if (isOverlap(player, enemy[i])) {
            player.health -= 50;
            if (player.health < 0) {
                gameOver = true
                alert("Game Over" + player.health)
            }
        }
    }

    //overlap gem
    if (isOverlap(player, gem)) {
        alert('You Won!')
        gameOver = true
        return
    }

    // update each enemy
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed

        if (enemy[i].y >= H - enemy[i].h || enemy[i].y < 0) {
            enemy[i].speed *= -1
        }
    }
}

function gameLoop() {
    if (gameOver) {
        clearInterval(f)
    }
    draw()
    update()
    console.log("In gameLoop")
}

load_image();
init();
let f = setInterval(gameLoop, 100)