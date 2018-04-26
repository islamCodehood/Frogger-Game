//Get lifeLost audio element
const lifeLost = document.getElementById('life-lost');
//Get win audio element
const winAudio = document.getElementById('win-audio');
//Get mute icon
const controlAudioElement = document.querySelector('.controlAudioElement');
//determine the status of control Audio
let status = 1;
//src of mute icon
const muteSrc = 'images/icons8-no-audio-40.png';
//src of audio volume icon
const unmuteSrc = 'images/icons8-audio-40.png';
//counter number of lives of player
let lives = 3;
//represents the index of elements of the gemPositions array
let gemNumber = 0;
//variable holds score value and used as a counter of score
let score = 0;
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
    this.x = this.x + this.speed * dt;
    //handle collision function invocation
    handleCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //to return bugs again to the canvas after getting out
    if (this.x > 505) {
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    //player sprite url
    this.sprite = 'images/char-boy.png';
    //x, and y coordinates for player
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (dt > 0) {
        this.x *= dt;
        this.y *= dt;
    };
    //handle collision function invocation
    handleCollision();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle key input for player
Player.prototype.handleInput = function(movement) {
    //'this.x > 0' to prevent player from getting out of canvas
    if ((movement == 'left') && (this.x > 0)) {
        this.x -= 101;
    //'this.x < 404' to prevent player from getting out of canvas
    } else if ((movement == 'right') && (this.x < 404)) {
        this.x += 101;
    //'this.y > 0' to prevent player from getting out of canvas
    } else if ((movement == 'up') && ((this.y > 0))) {
        this.y -= 83;//this will result in this.y = -10
        //means player reach the sea
        if (this.y == -10) {
            //pause game audio and play win audio
            audio.pause();
            winAudio.play();
            //increase score
            score += 5;
            //represent it in the score box
            document.querySelector('.score').innerHTML = score;
            //reset gem number
            gemNumber = 0;
            //pause event listener to prevent any action before returning to the game
            document.removeEventListener('keyup', keyUpHandle);
            //this time out give the chance for win audio not to overlap with the general game audio
            setTimeout(function() {
                //return player to starting position
                this.x = 202;
                this.y = 405;
                //replay general game audio
                audio.play();
                //return event listener listenning
                document.addEventListener('keyup', keyUpHandle);
            }, 3000);
        }
    //'this.y < 405' to prevent player from getting out of canvas
    } else if ((movement == 'down') && ((this.y < 405))) {
        this.y += 83;
    //escape button is a shortcut to mute or replay audio
    } else if (movement == 'escape') {
        //status == 1 means that audio is working
        if (status == 1) {
            //mute all game audio
            audio.volume = 0;
            winAudio.volume = 0;
            lifeLost.volume = 0;
            //change mute icon to the volume icon
            controlAudioElement.src = unmuteSrc;
            //change status to 0 to be able to revert the condition
            status = 0;
        } else {
            //if status == 0 means that audio is muted
            //increase volume  of audio
            audio.volume = 0.4;
            winAudio.volume = 1;
            lifeLost.volume = 1;
            //change volume icon to mute icon
            controlAudioElement.src = muteSrc;
            //change status to 1 to be able to revert the condition
            status = 1;
        }
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Heart class caculates lives available
const Heart = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
};
//update method clear a heart with each decreased life
Heart.prototype.update = function() {
    //to remove a heart with each life lost
    if (lives == 3) {
        heart1.x = 0;
        heart2.x = 60;
        heart3.x = 120;
    } else if (lives == 2) {
        heart3.x = -500;
    } else if (lives == 1) {
        heart2.x = -500;
    } else if (lives == 0) {
        heart1.x = -500;
    }

};
//render method to draw hearts
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60, 101);
};

//Gem class draw and manipulate gems
const Gem = function(x, y) {
    this.sprite = 'images/Gem Green.png';
    this.x = x;
    this.y = y;
};

//interact with gem win
Gem.prototype.update = function() {
    gemWin();
};

//draw the gem
Gem.prototype.render = function() {
    gemWin();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60, 101);
};

//handle earning gems
function gemWin() {
    //check if player win the gem
    if ((gem.x - player.x == 19) && (gem.y - player.y == 32 || gem.y - player.y == 41)) {
        //remove the gem outside canvas
        gem.x = -500;
        //increase score by earning a gem
        score += 5;
        //represent new score
        document.querySelector('.score').innerHTML = score;
        //not to exceed number of objects (places) to move gems using the array gemPositions which is shuffled each page reload.
        gemNumber += 1;
        if (gemNumber < 15) {
            gem.x = gemPositions[gemNumber].x;
            gem.y = gemPositions[gemNumber].y;

        } else {
            gemNumber = 0;
        }
    }
}

//array of gem positions. we will shuffle the array to randomly draw a gem in a new position after winning the previous one
var gemPositions = [{
    x: 19,
    y: 271
}, {
    x: 120,
    y: 271
}, {
    x: 221,
    y: 271
}, {
    x: 322,
    y: 271
}, {
    x: 423,
    y: 271
}, {
    x: 19,
    y: 197
}, {
    x: 120,
    y: 197
}, {
    x: 221,
    y: 197
}, {
    x: 322,
    y: 197
}, {
    x: 423,
    y: 197
}, {
    x: 19,
    y: 105
}, {
    x: 120,
    y: 105
}, {
    x: 221,
    y: 105
}, {
    x: 322,
    y: 105
}, {
    x: 423,
    y: 105
}];


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

//instantiate heart objects
const heart1 = new Heart(0, 510);
const heart2 = new Heart(60, 510);
const heart3 = new Heart(120, 510);

//array of all three hearts
const allHearts = [heart1, heart2, heart3];

//invoke shuffle function to randomly change gem positions
shuffle(gemPositions);

//instantiate gem object using x, and y coordinate from the shuffled gemPositions array
const gem = new Gem(gemPositions[gemNumber].x, gemPositions[gemNumber].y);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', keyUpHandle);

function keyUpHandle(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'escape'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}
/*handleCollision function do the following:
 *check if the player and bug are on the same position.
 *If so 1. pause the game audio. 2. play lifeLost audio.
 *3. reset player position. 4. replay game audio after lifeLost audio finish.*/

function handleCollision() {
    allEnemies.forEach(function(enemy) {

        if ((player.x - enemy.x < 70) && (player.x - enemy.x > -15) && (player.y - enemy.y == 11)) {
            //pause game audio and play life lost audio
            audio.pause();
            lives -= 1;
            if (lives == 0) {
                document.querySelector('.gameOver').classList.remove('gameOverAnimateBack');
                document.querySelector('.bugImage').classList.remove('bugImageHide');
                document.querySelector('.gameOver').classList.add('gameOverAnimate');
                document.querySelector('.bugImage').classList.add('bugImageAnimate');
                document.querySelector('.gameOverText').classList.add('gameOverTextAnimate');
            }
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

    });
}


//choose player character and control audio (on/off) by clicking
document.querySelector('.controls').addEventListener('click', controls);

function controls(e) {
    //choose character at any time during the game
    if (e.target && e.target.matches('img.boy')) {
        player.sprite = 'images/char-boy.png';
    } else if (e.target && e.target.matches('img.cat-girl')) {
        player.sprite = 'images/char-cat-girl.png';
    } else if (e.target && e.target.matches('img.horn-girl')) {
        player.sprite = 'images/char-horn-girl.png';
    } else if (e.target && e.target.matches('img.princess-girl')) {
        player.sprite = 'images/char-princess-girl.png';
        //mute or replay audio
    } else if (e.target && e.target.matches('img.controlAudioElement')) {
        if (status == 1) {
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
}
//Use keyboard tab to focus characters and enter or space buttons to choose one
document.querySelector('.controls').addEventListener('keyup', focusAndChoose);

//handle enter or space button input
function focusAndChoose(e) {
    if (e.keyCode == 13 || e.keyCode == 32) {
        //change character by assigning src attribute value of the focused character (activeElement) to 'player.sprite'
        player.sprite = document.activeElement.getAttribute('src');
    }
}

//Event listener to handle clicking 'play again' to start new game
document.querySelector('.gameOverText').addEventListener('click', startNewGame)

function startNewGame() {
    document.querySelector('.gameOver').classList.add('gameOverAnimateBack');
    document.querySelector('.bugImage').classList.add('bugImageHide');
    document.querySelector('.gameOverText').classList.remove('gameOverTextAnimate');
    //reset lives number
    lives = 3;
    //reset gem number
    gemNumber = 0;
    //reset score
    score = 0;
    //represent the new score
    document.querySelector('.score').innerHTML = score;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}