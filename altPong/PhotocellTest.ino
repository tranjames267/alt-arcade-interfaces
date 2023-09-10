int lightUpPin = A0; //analog pins, use 'A'
int lightUpVal = 0;

int lightDownPin = A1;
int lightDownVal = 0;


void setup() {
  Serial.begin(9600);
}

void loop() {
  lightUpVal = analogRead(lightUpPin); //photocell reading (up)
  lightDownVal = analogRead(lightDownPin); //photocell reading (down)
  
  // Serial.print(lightUpVal);
  // Serial.print(" , ");
  // Serial.println(lightDownVal);

  // photocells read about 930 in a fully lit room
  if(lightUpVal >= 960){
    Serial.println("UP");
  }
  if(lightDownVal >= 960){
    Serial.println("DOWN");
  }

}
