const queries = require('../database/queries');
const cronJobs = require('../helpers/cron-job');
const sms = require('../helpers/sms');

exports.task_create = (req, res, next) => {
    const reqData = req.body;
    const taskName = reqData.taskName;
    const taskDetails = reqData.taskDetails;
    const email = reqData.email;
    const phoneNumber = reqData.phoneNumber;
    const time = reqData.time;
    const userId = reqData.userId;

    queries.executeQuery(queries.create_task, [[taskName, taskDetails, email, phoneNumber, time, userId, 1]])
        .then((response) => {
            const mailOptions = {
                from: '"Prakas T" <tprakashkce@gmail.com>',
                to: email,
                subject: "Verfication mail",
                text: "This is notification email",
                html: '<a>Hi, I am notification mail</a>'
            }
            cronJobs.sendNotificationEmail(time, mailOptions);
            return res.status(201).json({
                status: 2001,
                message: "Task Created"
            });
        })
        .catch(err => console.log(err));
};


exports.task_list = (req, res, next) => {
    const userId = req.body.userId;
    queries.executeQuery(queries.getTaskList, [userId])
        .then((response) => {
            sms.sendSms();
            return res.status(201).json({
                status: 2001,
                message: response
            });
        })
        .catch(err => console.log(err));
};
