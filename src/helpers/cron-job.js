const CronJob = require('cron').CronJob;
const moment = require('moment-timezone');
const mail = require('./email');

exports.sendNotificationEmail = (cronTime, emailOptions) => {
    const momentTime = moment(cronTime).add('570', 'minutes');
    // const momentTime = moment().utc(utcTime);
    console.log("momentTime", momentTime);
    new CronJob(momentTime, function () {
        mail.sendEmail(emailOptions);
    }, null, true, 'America/Los_Angeles');
}