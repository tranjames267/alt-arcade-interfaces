// ball color toggle
var ballColor = 255;
var revealBall = false;
var ballTimer = 0;

// paddle color toggle
var paddleColor = 255;
var revealPaddle = false;
var paddleTimer = 0;

// playing the game?
var isPlayingGame = 0;

// ball variables
var ballX;
var ballY;
var ballWidth = 12;
var ballHeight = 12;

var ballXSpeed = 2;
var ballYSpeed = 2;
var ballDirectionX = 1; // 1 is right, -1 is left
var ballDirectionY = 1; // -1 is up, 1 is down

// player variables
var paddle1X = 15;
var paddle1Y = 250;

var paddle2X = 735;
var paddle2Y = 250;

var paddleWidth = 10;
var paddleHeight = 80;
var playerSpeed = 3;

p1Score = 0;
p2Score = 0;

function setup() {
    createCanvas(750, 500);
    background(0, 0, 0);
    rectMode(CENTER);
    textAlign(CENTER);
    ballX = width / 2;
    ballY = height / 2;
}

function preload() {
    // from the mobile game Color Switch
    goalNoise = loadSound('goalNoise.mp3');
    song = loadSound('ColorSwitchTower.mp3');
    wallHit = loadSound('wallHit.mp3');
    paddleHit = loadSound('paddleHit.mp3');
    lightOn = loadSound('lightOn.mp3');
    lightOff = loadSound('lightOff.mp3');
}

function draw() {
    keyPressed();

    background(0, 0, 0, 30);

    song.setVolume(0.5);
    if (!song.isPlaying()) {
        song.play();
    }
    if (isPlayingGame == 0) {
        noStroke();
        fill(255);
        textSize(110);

        textFont('Helvetica');
        text('PONG', width / 2, 190);

        textSize(25);
        text('Press ENTER to start, SHIFT to reset', width / 2, 300);
        text('Press A to light the paddles, S for the ball', width / 2, 350);
        text('Use UP and DOWN arrow keys to move', width / 2, 400);

        noFill();
        strokeWeight(10);
        stroke(255);
        rect(width / 2, height / 2, width - 50, height - 50);


    }

    if (isPlayingGame == 1) {
        // line
        strokeWeight(1);
        stroke(255);
        line(width / 2, 10, width / 2, height - 10);

        // ball
        if (revealBall) {
            rect(ballX, ballY, 35, 35);
            lightOn.play();
            revealBall = false;
        }
        if (ballColor == 255) {
            ballTimer++;
        }
        if (ballTimer == 300) { // 5 seconds due to fr of 60f/s
            ballColor = 0;
            ballTimer = 0;
            lightOff.play();
        }

        fill(ballColor);
        noStroke();
        rect(ballX, ballY, ballWidth, ballHeight);

        // paddles
        if (revealPaddle) {
            lightOn.play();
            revealPaddle = false;
        }
        if (paddleColor == 255) {
            paddleTimer++;
        }
        if (paddleTimer == 780) { // 13 seconds due to fr of 60f/s
            paddleColor = 0;
            paddleTimer = 0;
            lightOff.play();
        }

        fill(paddleColor);
        rect(paddle1X, paddle1Y, paddleWidth, paddleHeight); //p1
        rect(paddle2X, paddle2Y, paddleWidth, paddleHeight); //p2

        // walls
        fill(255);
        rect(width / 2, 10, width, 7);
        rect(width / 2, 490, width, 7);

        // physics
        ballX = ballX + ballDirectionX * ballXSpeed;
        ballY = ballY + ballDirectionY * ballYSpeed;

        // collisions
        wallHit.setVolume(3);
        if (ballY >= height - 20) { // bottom wall collision
            ballDirectionY = ballDirectionY * -1;
            wallHit.play();
            rect(width / 2, 490, width, 15);
        }
        if (ballY <= 20) { // top wall collision
            ballDirectionY = ballDirectionY * -1;
            wallHit.play();
            rect(width / 2, 10, width, 15);
        }

        paddleHit.setVolume(3);
        // right paddle collision
        if (ballX >= paddle2X - 6 && ballX <= paddle2X + 6) {
            if (ballY <= paddle2Y + 41 && ballY >= paddle2Y - 41) {

                if (ballY >= paddle1Y - 41 && ballY <= paddle1Y - 20) {
                    ballYSpeed *= 1.5;
                }
                else if (ballY <= paddle1Y + 41 && ballY >= paddle1Y + 20) {
                    ballYSpeed *= 1.5;
                }
                else if (ballYSpeed > 2) {
                    ballYSpeed *= 0.9;
                }
                else {
                    ballYSpeed = 2;
                }

                ballDirectionX = ballDirectionX * -1;
                ballXSpeed += 0.2;
                paddleHit.play();
            }
        }
        // left paddle collision 
        if (ballX >= paddle1X - 6 && ballX <= paddle1X + 6) {
            if (ballY <= paddle1Y + 41 && ballY >= paddle1Y - 41) {

                if (ballY >= paddle1Y - 41 && ballY <= paddle1Y - 20) {
                    ballYSpeed *= 1.5;
                }
                else if (ballY <= paddle1Y + 41 && ballY >= paddle1Y + 20) {
                    ballYSpeed *= 1.5;
                }
                else if (ballYSpeed > 2) {
                    ballYSpeed *= 0.9;
                }
                else {
                    ballYSpeed = 2;
                }

                ballDirectionX = ballDirectionX * -1;
                ballXSpeed += 0.2;
                paddleHit.play();
            }
        }

        // scores
        textFont("Courier New");
        textSize(50);
        text(p1Score, width / 2 - 60, 70);
        text(p2Score, width / 2 + 60, 70);

        if (ballX >= width) { // player1 scores
            p1Score++;
            ballX = width / 2;
            ballY = height / 2;
            ballXSpeed = 2;
            ballYSpeed = 2;
            goalNoise.play();
        }
        if (ballX <= 0) { // player 2 scores
            p2Score++;
            ballX = width / 2;
            ballY = height / 2;
            ballXSpeed = 2;
            ballYSpeed = 2;
            goalNoise.play();
        }

        textSize(20);
        text("P1", 50, 50);
        text("CPU", width - 50, 50);

        // computer player
        if (paddle2Y > ballY && paddle2Y > 50) {
            paddle2Y -= playerSpeed;
        }
        if (paddle2Y < ballY && paddle2Y < height - 50) {
            paddle2Y += playerSpeed;
        }
    }
} // close draw

function keyTyped() {
    if (key == 's' && keyIsPressed) {
        ballColor = 255;
        revealBall = true;
    }
    if (key == 'a' && keyIsPressed) {
        paddleColor = 255;
        revealPaddle = true;
    }
}

function keyPressed() {
    if (key == "o" && paddle1Y > 50 && keyIsPressed) {
        paddle1Y = paddle1Y - playerSpeed;
    }
    if (key == "l" && paddle1Y < height - 50 && keyIsPressed) {
        paddle1Y = paddle1Y + playerSpeed;
    }
    if (keyCode == SHIFT && keyIsPressed) {
        ballX = width / 2;
        ballY = height / 2;
        ballXSpeed = 2;
        ballYSpeed = 2;
        p1Score = 0;
        p2Score = 0;
        isPlayingGame = 0;
    }
    if (keyCode == ENTER && keyIsPressed) {
        isPlayingGame = 1;
    }
}