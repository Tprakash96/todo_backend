const CronJob = require('cron').CronJob;
const moment = require('moment-timezone');
const mail = require('./email');

exports.sendNotificationEmail = (cronTime, emailOptions) => {
    const time = new Date(cronTime);
    new CronJob(time, function () {
        mail.sendEmail(emailOptions);
    }, null, true, 'Asia/Kolkata');
}