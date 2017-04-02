int led1 = D0;
int led2 = D7;

void setup()
{

   // Here's the pin configuration, same as last time
   pinMode(led1, OUTPUT);
   pinMode(led2, OUTPUT);

   // We are also going to declare a Particle.function so that we can turn the LED on and off from the cloud.
   Particle.function("led",ledToggle);
   Particle.function("zoneSelect",moveToZone);
   // This is saying that when we ask the cloud for the function "led", it will employ the function ledToggle() from this app.

   // For good measure, let's also make sure both LEDs are off when we start:
   digitalWrite(led1, LOW);
   digitalWrite(led2, LOW);
   
   Serial1.begin(9600, SERIAL_9N1); // via TX/RX pins, 9600 9N1 mode

}


void loop()
{
   // Nothing to do here
}


int ledToggle(String command) {

    if (command=="on") {
        digitalWrite(led1,HIGH);
        digitalWrite(led2,HIGH);
        return 1;
    }
    else if (command=="off") {
        digitalWrite(led1,LOW);
        digitalWrite(led2,LOW);
        return 0;
    }
    else {
        return -1;
    }
}

int moveToZone(String zone) {
    
    if (zone=="1") {
        Serial1.write(1);
    } else if (zone=="2") {
        Serial1.write(2);
    } else if (zone=="3") {
        Serial1.write(3);
    } else {
        digitalWrite(led2,HIGH);
        delay(5000);
        digitalWrite(led2,LOW);
    }
    
    return 0;
    
}
