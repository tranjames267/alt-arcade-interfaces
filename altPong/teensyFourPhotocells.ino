int lightUpPin = A6; //analog pins, use 'A'
int lightUpVal = 0;

int lightDownPin = A2;
int lightDownVal = 0;

int lightBallPin = A8;
int lightBallVal = 0; 

int lightPaddlePin = A4;
int lightPaddleVal = 0; 

bool ballLightActive = false; // these active variables prevent spamming controls for lighting the ball or paddles
bool paddleLightActive = false; 

int timer = 0; // controls how often the sensors pick up information and type keyboard letters

void setup() {
  Serial.begin(9600);
}

void loop() {
  timer ++;
  lightUpVal = analogRead(lightUpPin); //photocell reading (up)
  lightDownVal = analogRead(lightDownPin); //photocell reading (down)
  lightBallVal = analogRead(lightBallPin); // photocell reading (for the ball)
  lightPaddleVal = analogRead(lightPaddlePin); // photocell reading (for the paddles)
  
  Serial.print(lightUpVal);
  Serial.print(" , ");
  Serial.print(lightDownVal);
  Serial.print(" , ");
  Serial.print(lightBallVal);
  Serial.print(" , ");
  Serial.println(lightPaddleVal);

  if(lightUpVal >= 900 && timer % 250 == 0){
    Keyboard.print("o");
  }
  if(lightDownVal >= 900 && timer % 250 == 0){
    Keyboard.print("l");
  }
  if(lightBallVal == 1023 && ballLightActive == false && timer % 200 == 0){
    Keyboard.print("s");
    ballLightActive = true; 
  }
  if(lightBallVal < 1023){
    ballLightActive = false;
  }
  if(lightPaddleVal == 1023 && paddleLightActive == false && timer % 200 == 0){
    Keyboard.print("a");
    paddleLightActive = true; 
  }
   if(lightPaddleVal < 1023){
    paddleLightActive = false;
  }
}
