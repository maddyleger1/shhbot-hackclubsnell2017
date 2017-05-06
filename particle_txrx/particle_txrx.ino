int led1 = D7; // on board led - if you don't want to use this LED, you can use port D0 for the built in particle one

void setup()
{
   // LED configuration
   pinMode(led1, OUTPUT);

   // Declare a Particle.function to control Particle from the cloud
   // Basically, it exposes functions inside this file to a cloud interface by the name in quotations
   Particle.function("led",ledToggle);
   Particle.function("zoneSelect",moveToZone);

   // make sure the led is off
   digitalWrite(led1, LOW);
   
   // open up the tx/rx Serial connection to the arduino
   Serial1.begin(9600, SERIAL_9N1); // via TX/RX pins, 9600 9N1 mode

}


void loop()
{
   // Nothing to do here
}

int moveToZone(String zone) {
    // zone is passed in from slackbot.js
    if (zone=="1") {
        Serial1.write(1);
    } else if (zone=="2") {
        Serial1.write(2);
    } else if (zone=="3") {
        Serial1.write(3);
    } else {
        // this won't happen from the bot, but is here to acknowledge you if you give a wrong argument from the cloud
        digitalWrite(led1,HIGH);
        delay(5000);
        digitalWrite(led1,LOW);
    }
    // will error check eventually
    return 0;
}
