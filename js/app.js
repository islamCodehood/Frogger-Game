//Get lifeLost audio element
const lifeLost = document.getElementById('life-lost');

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    enemy1.x += 65 * dt;
    if (enemy1.x > 505) {
        enemy1.x = -100;
    }
    enemy2.x += 50 * dt;
    if (enemy2.x > 505) {
        enemy2.x = -100;
    }
    enemy3.x += 80 * dt;
    if (enemy3.x > 505) {
        enemy3.x = -100;
    }
    enemy4.x += 70 * dt;
    if (enemy4.x > 505) {
        enemy4.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    handleCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    enemy1.y = 62;
    enemy2.y = 145;
    enemy3.y = 145;
    enemy4.y = 228;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 405;
};
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (dt > 0){
        this.x *= dt;
        this.y *= dt;
    }; 
    handleCollision();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle key input for player
Player.prototype.handleInput = function(movement) {
    if ((movement == 'left') && (this.x > 0)) {
        this.x -= 101;
        console.log(this.y);

    } else if ((movement == 'right') && (this.x < 404)) {
        this.x += 101;
        console.log(this.y);

    } else if ((movement == 'up') && ((this.y > 0))) {
        this.y -= 83;
        console.log(this.y);
        if (this.y == -10) {
            setTimeout(function(){
                player.x = 202;
                player.y = 405;
            }, 300);        
        }
    } else if ((movement == 'down') && ((this.y < 405))) { 
        this.y += 83;
        console.log(this.y);

    }
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };  

    player.handleInput(allowedKeys[e.keyCode]);
});

/*handleCollision function do the following:
*check if the player and bug are on the same position.
*If so 1. pause the game audio. 2. play lifeLost audio.
*3. reset player position. 4. replay game audio after lifeLost audio finish.*/

function handleCollision() {
    allEnemies.forEach(function(enemy) {
        setInterval(function() {
            if ((player.x - enemy.x < 70) && (player.x - enemy.x > - 15) && (player.y - enemy.y == 11)){
                    audio.pause();
                    lifeLost.play();
                    player.x = 202;
                    player.y = 405;
                    setTimeout(function() {
                        audio.play(); 
                    }, 3000);     
            }
        }, 0);
    });    
}





