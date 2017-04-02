/*
Adafruit Arduino - Lesson 13. DC Motor
*/


int motorPin1 = 3;
int motorPin2 = 2;
int speed = 150;

 
void setup() 
{ 
  Serial.begin(9600);      // open the serial port at 9600 bps:    
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(13, OUTPUT);

  stopBot();
} 

void beep()
{
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
}

void go()
{
  analogWrite(motorPin1, speed);
  analogWrite(motorPin2, speed);
}

void stopBot() {
  analogWrite(motorPin1, 0);
  analogWrite(motorPin2, 0);
}
 
void loop() 
{ 
  if (Serial.available()) {
    int dest_zone = Serial.read();
    if (dest_zone == 1) {
      go();
      delay(1500);
      stopBot();
      beep();
    }
    else if (dest_zone == 2) {
      go();
      delay(3000);
      stopBot();
      beep();
    }
    else if (dest_zone == 3) {
      go();
      delay(4500);
      stopBot();
      beep();
    }
  }
} 

//void serialEvent() {
//    
//}
