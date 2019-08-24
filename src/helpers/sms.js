const twilioJson = require('../config/apiconfig.json');
accountSid = twilioJson.config.twilio.accountSid;
authToken = twilioJson.config.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

exports.sendSms = () => {
    client.messages
        .create({
            body: 'Hai,This is test message',
            from: '+13852824319',
            to: '918760239085'
        })
        .then(message => console.log(message.sid));
}


// const Nexmo = require('nexmo');


// exports.sendSms = () => {
//     const nexmo = new Nexmo({
//         apiKey: 'a881101c',
//         apiSecret: 'd01Dteh0F0IT4vhG',
//     });

//     const from = 'Nexmo';
//     const to = '918760239085';
//     const text = 'Hello from Nexmo';

//     nexmo.message.sendSms(from, to, text);
// }