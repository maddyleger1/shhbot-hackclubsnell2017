// Global Vars
int motorPin1 = 3;
int motorPin2 = 2;
int speed = 150;

// set up pins, particle connection, and make sure bot is off
void setup() 
{ 
  Serial.begin(9600);      // open the serial port at 9600 bps:    
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(13, OUTPUT);

  stopBot();
} 

// the buzzer noise
void beep()
{
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
}

// turn on the motors
void go()
{
  analogWrite(motorPin1, speed);
  analogWrite(motorPin2, speed);
}

// stop the motors
void stopBot() {
  analogWrite(motorPin1, 0);
  analogWrite(motorPin2, 0);
}
 
void loop() 
{ 
  // see if the Particle is sending data
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
