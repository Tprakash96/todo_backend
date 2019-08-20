const queries = require('../database/queries');
const mail = require('../helpers/email');

exports.task_create = (req, res, next) => {
    const reqData = req.body;
    const taskName = reqData.taskName;
    const taskDetails = reqData.taskDetails;
    const email = reqData.email;
    const phoneNumber = reqData.phoneNumber;
    const time = reqData.time;

    queries.executeQuery(queries.create_task, [[taskName, taskDetails, email, phoneNumber, time, 1]])
        .then((response) => {
            return res.status(201).json({
                status: 2001,
                message: "Task Created"
            });
        })
        .catch(err => console.log(err));
};


exports.task_list = (req, res, next) => {
    queries.executeQuery(queries.getTaskList, [])
        .then((response) => {
            return res.status(201).json({
                status: 2001,
                message: response
            });
        })
        .catch(err => console.log(err));
};
