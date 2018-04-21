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
    enemy1.x += 60 * dt;
    if (enemy1.x > 505) {
        enemy1.x = -100;
    }
    enemy2.x += 40 * dt;
    if (enemy2.x > 505) {
        enemy2.x = -100;
    }
    enemy3.x += 90 * dt;
    if (enemy3.x > 505) {
        enemy3.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    enemy1.y = 63;
    enemy2.y = 145;
    enemy3.y = 228;
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
    } else if ((movement == 'right') && (this.x < 404)) {
        this.x += 101;
    } else if ((movement == 'up') && ((this.y > 0))) {
        this.y -= 83;
        if (this.y == -10) {
            setTimeout(function(){
                player.x = 202;
                player.y = 405;
            }, 500);        
        }
    } else if ((movement == 'down') && ((this.y < 405))) { 
        this.y += 83;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];

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
