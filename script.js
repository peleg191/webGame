const directions = { left: 'left', right: 'right', up: 'up', down: 'down' };
const canvas = document.getElementById('canvas1');
canvas.addEventListener('click', canvasClicked,false);
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
var keys = {};
let kills = 0;
let escaped = 0;
var incomingMoneyTransaction = 0;
evaluatePlayerStats();
renderSkillDisplay();
const player = {
    x: 200,
    y: 200,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: playerStats.speed,
    moving: false,
    direction: '',
    fireCooldown: false,
    timeSinceLastFire: Date.now(),
    playerEvents() {
        if (keys.ArrowDown && player.y  < canvas.height - player.height ) {
            player.moving = true;
            player.y += player.speed;
            player.frameY = 0;
            player.direction = directions.down;
        }
        if (keys.ArrowLeft && player.x  > 0) {
            player.moving = true;
            player.x -= player.speed;
            player.frameY = 1;
            player.directionRight = false;
            player.direction = directions.left;
        }
        if (keys.ArrowRight && player.x  < canvas.width - player.width) {
            player.moving = true;
            player.x += player.speed;
            player.frameY = 2;
            player.directionRight = true;
            player.direction = directions.right;
        }
        if (keys.ArrowUp && player.y > 100) {
            player.moving = true;
            player.y -= player.speed;
            player.frameY = 3;
            player.direction = directions.up;
        }
        if (keys.x || keys.X) {
            if (missiles.length > playerStats.missiles - 1)
                return;
            player.firing = true;
            // if (Date.now() - this.timeSinceLastFire > 100)
                createMissiles();
            // this.timeSinceLastFire = Date.now();
        }
        if (keys.z || keys.Z) {
            player.speed += playerStats.dash;
        }
        this.handlePlayerFrame();
    },
    resetSpeed() {
        player.speed = playerStats.speed;
    },
    resetMoving(){
        player.moving = false;
        player.frameX = 0;
    },
    handlePlayerFrame() {
        if (player.moving)
            player.frameX = player.frameX < 3 ? player.frameX += 1 : 0;
    },
    drawPlayer() {
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y, player.width, player.height);
    }
};
const enemies = [];
const missiles = [];
const explosions = [];
let explosion = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    frameX: 0,
    frameY: 0,
    sprite: {}
}
explosion.sprite = new Image();
explosion.sprite.src = './assets/explosion.png';
let enemySprites = ['./assets/yoda.png', './assets/jedi.png',
    './assets/rebelpilot.png', './assets/jawa.png', './assets/oola.png',
    './assets/twilek.png', './assets/stormtrooper.png'
];
setInterval(createEnemies, 1000);
setInterval(player.resetSpeed, 1000);
function createEnemies() {
    if (enemySprites.length == 0) {
        showEnemy();
        return;
    }
    let enemy = {
        x: canvas.width,
        y: getRandomIntGap(110, canvas.height - 100),
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0,
        speed: 12,
        moving: false,
        direction: '',
        sprite: {},
        movmentToDo: [],
        drawEnemy() {
            if (this.hide)
                return;
            drawSprite(this.sprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height,
                this.x, this.y, this.width, this.height);
        },
        moveEnemy(index) {
            let handleEnemyFrame = () => {
                enemy.frameX = enemy.frameX < 3 ? enemy.frameX += 1 : 0;
            }
            let moveEnemyUp = () => {
                if (this.y < 100)
                    return;
                this.direction = directions.up;
                this.y -= enemy.speed;
                this.frameY = 3;
                return;
            }
            let moveEnemyDown = () => {
                if (this.y > canvas.height - this.height)
                    return;
                this.direction = directions.down;
                this.frameY = 0;
                this.y += this.speed;
                return;
            }
            let moveEnemyLeft = () => {
                if (this.x < 0 && !this.hide) {
                    //removes one element from the specific index.
                    enemies[index].hide = true;
                    escaped++;
                    return;
                }
                this.direction = directions.left;
                this.frameY = 1;
                this.x -= enemy.speed;
                return;
            }
            let checkForMovmentInToDO = () => {
                let movementToDoLength = enemy.movmentToDo.length;
                if (movementToDoLength > 0) {
                    let movment = enemy.movmentToDo[movementToDoLength - 1];
                    switch (movment) {
                        case directions.left:
                            moveEnemyLeft();
                            break;
                        case directions.down:
                            moveEnemyDown();
                            break;
                        case directions.up:
                            moveEnemyUp();
                            break;
                    }
                    handleEnemyFrame();
                    this.movmentToDo.pop();
                    return true;
                }
                return false;
            }
            this.moving = true;
            if (checkForMovmentInToDO())
                return;
            let number = getRandomInt(10);
            lastNumber = number;
            if (number < 2) {
                this.movmentToDo.push(directions.up, directions.up, directions.up, directions.up, directions.up, directions.up);
            }
            else if (number < 4) {
                this.movmentToDo.push(directions.down, directions.down, directions.down, directions.down, directions.down, directions.down);
            }
            else {
                this.movmentToDo.push(directions.left, directions.left, directions.left, directions.left, directions.left, directions.left);
            }
        },

    }
    enemy.sprite = new Image();
    let randomNum = getRandomInt(enemySprites.length);
    enemy.sprite.src = enemySprites[randomNum] || './assets/yoda.png';
    enemy.index = enemies.length;
    enemies.push(enemy);
    enemySprites.splice(randomNum, 1);
}
function resetPosition(entity) {
    entity.x = canvas.width;
    entity.y = getRandomIntGap(110, canvas.height - 100);
}
function respawnEnemy(specificEnemy) {
    resetPosition(specificEnemy);
    specificEnemy.hide = false;
}
function showEnemy() {
    let specificEnemy = enemies.filter(enemy => enemy.hide)[0];
    if (!specificEnemy)
        return;
    respawnEnemy(specificEnemy);
}
function createMissiles() {
    const missile = {
        x: player.x,
        y: player.y,
        width: 50,
        height: 50,
        frameX: 0,
        frameY: 0,
        speed: playerStats.missileSpeed,
        moving: false,
        firing: false,
        direction: player.direction,
        sprite: {}
    };
    console.log('missileCreated');
    const missileSprite = new Image();
    missile.firing = true;
    missileSprite.src = './assets/missile1.png';
    missile.sprite = missileSprite;
    missile.id = missile.length;
    missiles.push(missile);
}
const playerSprite = new Image();
playerSprite.src = './assets/mandalorian.png';

const background = new Image();
background.src = './assets/background.png';
const coin = new Image(); 
coin.src= './assets/coin.svg';
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
    player.resetMoving();
});


function handleMissiles(missile, index) {
    function disposeMissile() {
        if (missile.x > canvas.width || missile.x < 0 || missile.y < 0 || missile.y > canvas.height) {
            missiles.splice(index, 1);
        }
    }
    function missileMovement() {
        switch (missile.direction) {
            case directions.right:
                missile.frameY = 0;
                missile.x += missile.speed;
                break;
            case directions.left:
                missile.frameY = 1;
                missile.x -= missile.speed;
                break;
            case directions.down:
                missile.frameY = 3;
                missile.y += missile.speed;
                break;
            case directions.up:
                missile.frameY = 2;
                missile.y -= missile.speed;
                break;
        }
    }
    function missileHit() {
        let visibleEnemies = enemies.filter(enemy => !enemy.hide);
        let relevantMissiles = missiles;
        let collisions = detectCollisions(relevantMissiles, visibleEnemies);
        if (collisions.length == 0)
            return;
        collisions.forEach(collision => {
            let missile = collision.object;
            let enemy = collision.secondObject;
            missiles.splice(missile.id, 1);
            let currentEnemy = enemies[enemy.index];
            resetPosition(currentEnemy);
            explosion.x = collision.position.x;
            explosion.y = collision.position.y;
            explosion.sprite.src = './assets/explosion.png';
            explosions.push(explosion);
            kills++;
            incomingMoneyTransaction++;
        });
    }
    missileMovement();
    missileHit();
    drawSprite(missile.sprite, missile.width * missile.frameX, missile.height * missile.frameY, missile.width, missile.height,
        missile.x, missile.y, missile.width, missile.height);
    missile.frameX = missile.frameX < 2 ? missile.frameX += 1 : 0;
    disposeMissile();
}
function handleEnemiesRender() {
    enemies.forEach((enemy, index) => {
        enemy.drawEnemy();
        enemy.moveEnemy(index);
    });
}
function handlePlayerEnemiesCollision() {
    let visibleEnemies = enemies.filter(enemy => !enemy.hide);
    let players = [player];
    let collisions = detectCollisions(players, visibleEnemies);
    if (collisions.length == 0)
        return;
    collisions.forEach(collision => {
        let enemy = collision.secondObject;
        let currentEnemy = enemies[enemy.index];
        currentEnemy.hide = true;
        resetPosition(currentEnemy);
        explosion.x = collision.position.x;
        explosion.y = collision.position.y;
        explosion.sprite.src = './assets/smoke.png';
        explosions.push(explosion);
        kills++;
        incomingMoneyTransaction++;
    });
}
function handleTextOnCanvas() {
    ctx.font = 'bold 24px cursive';
    ctx.fillStyle = "#fefefe"; //<======= here
    ctx.fillText('Kills:' + kills, canvas.width - 150, 30);
    ctx.fillText('Escaped:' + escaped, canvas.width - 150, 60)
    ctx.fillStyle = 'yellow';
    ctx.fillText(playerStats.money + incomingMoneyTransaction, 35, 25);
}

let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    if (menuOpen) {
        return;
    }
    now = Date.now();
    elapsed = now - then;
    if (fpsInterval > elapsed)
        return;
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(coin,0,0,32,32);
    player.drawPlayer();
    if(isMobile())
        mobileControl.drawControl(ctx);
    player.playerEvents();
    handleEnemiesRender();
    handlePlayerEnemiesCollision();
    if (missiles.length > 0) {
        missiles.forEach((missile, index) => {
            handleMissiles(missile, index);
        });
    }
    if (explosions.length > 0) {
        explosions.forEach((explosion, index) => {
            drawSprite(explosion.sprite, explosion.width * explosion.frameX, explosion.height * explosion.frameY, explosion.width, explosion.height,
                explosion.x, explosion.y, explosion.width, explosion.height);
            if (explosion.frameX > 3) {
                explosion.frameX = 0;
                explosions.splice(index, 1);
            }
            explosion.frameX++;
        });
    }
    handleTextOnCanvas();
}
startAnimating(18);