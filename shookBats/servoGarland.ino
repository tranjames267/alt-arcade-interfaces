/*
  Ultrasonic Sensor HC-SR04 and Arduino Tutorial

  by Dejan Nedelkovski,
  www.HowToMechatronics.com
  https://howtomechatronics.com/tutorials/arduino/ultrasonic-sensor-hc-sr04/

*/

#include <Servo.h>

// defines pins numbers
const int trigPin = 6;
const int echoPin = 7;

// defines variables
long duration;
int distance;

Servo myservo;  // create servo object to control a servo
Servo myservo2;

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600); // Starts the serial communication
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo2.attach(10);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance
  distance = duration * 0.034 / 2;

  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);  
  
  if(distance <= 120){
    for(int i=0; i<5; i ++){
      myservo.write(0); 
      myservo2.write(0);
      delay(100);  // waits for the servo to get there
      myservo.write(90);
      myservo2.write(90);
      delay(100);  // waits for the servo to get there
    }
  }                           
}
