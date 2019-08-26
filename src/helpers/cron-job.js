const CronJob = require('cron').CronJob;
const moment = require('moment-timezone');
const mail = require('./email');

exports.sendNotificationEmail = (cronTime, emailOptions) => {
    new CronJob(moment(cronTime), function () {
        mail.sendEmail(emailOptions);
    }, null, true, 'Asia/Kolkata');
}