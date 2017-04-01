if (!process.env.token || !process.env.username || !process.env.password) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('Botkit');
var Particle = require('particle-api-js')
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

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

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

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

controller.hears(['zone 1'],
'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message,
        'Shhh! In zone 1!');
    particle.callFunction({ deviceId: device_id, name: 'zoneSelect', argument: '1', auth: token })
    .then(
        function(data) {
            console.log('Function called succesfully:', data);
        }, function(err) {
            console.log('An error occurred:', err);
    });
});

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