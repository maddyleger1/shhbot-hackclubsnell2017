# ShhBot
Quiet down those people on the silent floor of the library who are bothering you! Just message @shhbot `quiet down in zone 1` or `someone is being loud in zone 3!`

## ShhBot is a Slackbot, but also a physical robot
When you message ShhBot in Slack, you tell it what zone to go to - _zone 1, zone 2, or zone 3_. It knows to move a certain distance based on that zone, and the physical robot drives there and beeps at the person being loud!

## The Tech: Slack + Particle Photon + Arduino + Hot Glue & Cardboard
ShhBot's Slack personality is built using [botkit](https://github.com/howdyai/botkit). Using [particle-api-js](https://docs.particle.io/reference/javascript/), ShhBot calls a function living on a [Particle Photon](https://www.particle.io/products/hardware/photon-wifi-dev-kit) on its on-board system. The Photon communicates over serial tx/rx with the also on-board [Arduino Uno](https://www.arduino.cc/en/main/arduinoBoardUno), which controls the two motors that drive ShhBot, the buzzer that tells people they're being too loud, as well as some pretty cool looking LEDs. All of it is powered from a single 9V battery!
![ShhBot](/img/shhbot.jpg)
![ShhBot2](/img/shhbot2.jpg)
In the future, we'd love to make ShhBot out of something besides cardboard and rubber bands, because it's currently really difficult to turn the bot around with its current chassis, and ShhBot is not exactly waterproof (or step-proof!).

## Hack Club Snell
Hack Club Snell was a 24-hour hardware hackathon hosted by [Generate NU](http://www.northeastern.edu/generate/) and [NU Wireless Club](http://www.wireless.neu.edu/). The goal was to create any solution that helps the lives of folks who regularly go to Snell Library at Northeastern University. 

## Spin up your own ShhBot
### Materials
* Particle Photon (uses code in particle_txrx)
* Arduino Uno (uses code in arduino_txrx)
* Slack domain that you can add bots to
* Breadboard, a whole bunch of jumper cables,  2 transistors, 3 diode LEDs, 2 little motors, and 1 buzzer
* 9V battery and cap
* A robot that can hold that breadboard, the components, the Arduino, and the Particle Photon, with 2 wheels that can be hooked up to the motor
![Our ShhBot Board](/img/board1.jpg)
### Basic Instructions
#### Physical Bot Wiring
The general idea of the wiring is that the Arduino is powered by the 9V, and is the central hub that communicates with all of the componenets. The Arduino and Particle Photon _only_ communicate through Tx/Rx on each board, and the Particle Photon itself is connected to the 5V out on the Arduino. The motors, buzzer, and diodes are all powered through the 3.3V out on the Arduino. The diodes are necessary so that when ShhBot powers off or stops, the motors don't push electricity back up and fry the Arduino.
![Our ShhBot Board](/img/board2.jpg)
#### Setting up the Code
_Note: Do NOT upload code to both the Particle and Arduino at the same time if they're both plugged in to the board. Connect and upload one at a time over USB. Weird power things will happen. Also, don't do any of these steps with the 9V plugged in. That is the last step!_
Upload the particle_txrx code to the Particle Photon. We used the [Particle Build](https://build.particle.io/) system and connected it over USB to set it up! Make sure your Particle is connected to wifi - breathing a blue/cyan color.
Upload the arduino_txrx code to your Arduino over USB using the Arduino IDE. Side note: it won't upload if it's plugged in to the Particle Photon via tx/rx (beacuse serial).
Create a bot on Slack and store the token as an environment variable (`token=_slack token_` on Mac/Linux terminal, `set token=_slack token_` on Windows cmd). Also, store your Particle username/password as environment variables the same way.
Make sure you have [node.js](https://nodejs.org/) on your system. Once you do, run `npm install` in the main directory of this code, then `node slackbot.js`.
Once all the code is uploaded, the bot is alive, and nothing is plugged into your computer, put the 9V into the 9V cap. Wait until the Particle Photon's LED is breathing blue/cyan, then message your bot!