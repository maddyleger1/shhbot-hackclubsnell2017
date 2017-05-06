// Check for required environment variables
if (!process.env.token || !process.env.username || !process.env.password) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

// require important things
var Botkit = require('Botkit');
var Particle = require('particle-api-js')
var os = require('os');

// start up the slackbot
var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

// set up the particle interface and login
var particle = new Particle();
var token;
var device_id = '2c0018001447353136383631';

particle.login({username: process.env.username, password: process.env.password}).then(
  function(data){
    console.log('API call completed on promise resolve: ', data.body.access_token);
    token = data.body.access_token;
  },
  function(err) {
    console.log('API call completed on promise fail: ', err);
  }
);

// handle regular greetings - from the original botkit
controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello!!');
        }
    });
});

// zone 1 movement
controller.hears(['zone 1'],
'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message,
        'Shhh! In zone 1!');
    // call the function "zoneSelect" on the particle, which is from the /particle_txrx file
    // notice that the argument is "1", for zone 1
    particle.callFunction({ deviceId: device_id, name: 'zoneSelect', argument: '1', auth: token })
    .then(
        function(data) {
            console.log('Function called succesfully:', data);
        }, function(err) {
            console.log('An error occurred:', err);
    });
});

// zones 2 and 3 are handled the same with different args
controller.hears(['zone 2'],
'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message,
        'Shhh! In zone 2!');
    particle.callFunction({ deviceId: device_id, name: 'zoneSelect', argument: '2', auth: token })
    .then(
        function(data) {
            console.log('Function called succesfully:', data);
        }, function(err) {
            console.log('An error occurred:', err);
    });
});

controller.hears(['zone 3'],
'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message,
        'Shhh! In zone 3!');
    particle.callFunction({ deviceId: device_id, name: 'zoneSelect', argument: '3', auth: token })
    .then(
        function(data) {
            console.log('Function called succesfully:', data);
        }, function(err) {
            console.log('An error occurred:', err);
    });
});
