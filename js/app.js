//Get lifeLost audio element
const lifeLost = document.getElementById('life-lost');
//Get win audio element
const winAudio = document.getElementById('win-audio');
//Get mute icon
const controlAudioElement = document.querySelector('.controlAudioElement');
//determine the status of control Audio
let status = 1;
// Enemies our player must avoid
const Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //x, and y coordinates for enemy
    this.x = x;
    this.y = y;
    //speed for enemy 
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed *dt;
    handleCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x > 505) {
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    //x, and y coordinates for player
    this.x = x;
    this.y = y;
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
            //pause game audio and play win audio
            audio.pause();
            winAudio.play();
            //pause event listener to prevent any action before restart the game
            document.removeEventListener('keyup', keyUpHandle);
            setTimeout(function(){
                //return player to starting position
                player.x = 202;
                player.y = 405;
                //replay game audio
                audio.play();
                //return event listener
                document.addEventListener('keyup', keyUpHandle);
            }, 3000);        
        }
    } else if ((movement == 'down') && ((this.y < 405))) { 
        this.y += 83;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const enemy1 = new Enemy(-50, 62);
const enemy2 = new Enemy(0, 145);
const enemy3 = new Enemy(-200, 145);
const enemy4 = new Enemy(-100, 228);

//array of all enemy objects
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player
const player = new Player(202, 405);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', keyUpHandle);

function keyUpHandle(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        117: 'f6'
    };  

    player.handleInput(allowedKeys[e.keyCode]);
}
/*handleCollision function do the following:
*check if the player and bug are on the same position.
*If so 1. pause the game audio. 2. play lifeLost audio.
*3. reset player position. 4. replay game audio after lifeLost audio finish.*/

function handleCollision() {
    allEnemies.forEach(function(enemy) {
        setInterval(function() {
            if ((player.x - enemy.x < 70) && (player.x - enemy.x > - 15) && (player.y - enemy.y == 11)){
                    //pause game audio and play life lost audio
                    audio.pause();
                    lifeLost.play();
                    //return player to starting position
                    player.x = 202;
                    player.y = 405; 
                    //pause event listener to prevent any action before restart the game
                    document.removeEventListener('keyup', keyUpHandle);
                    setTimeout(function() {
                        //replay game audio
                        audio.play(); 
                        //return event listener
                        document.addEventListener('keyup', keyUpHandle);
                    }, 2000);  
            }
        }, 0);
    });    
}

//control audio function (on/off)
function controlAudio() {
    const muteSrc = 'images/icons8-no-audio-40.png';
    const unmuteSrc = 'images/icons8-audio-40.png';
    if (status == 1){
        audio.volume = 0;
        winAudio.volume = 0;
        lifeLost.volume = 0;
        controlAudioElement.src = unmuteSrc;
        status = 0;
    } else {
        audio.volume = 0.4;
        winAudio.volume = 1;
        lifeLost.volume = 1;
        controlAudioElement.src = muteSrc;
        status = 1;
    }
        
    }  

//Click Event listener to control audio
controlAudioElement.addEventListener('click', controlAudio);











