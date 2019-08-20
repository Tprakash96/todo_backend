const q = require('q');
const db = require('../database/connection');

exports.executeQuery = (query, values) => {
    const deferred = q.defer();
    db.query(query, values, function (err, rows, fields) {
        if (err) deferred.reject(err);
        else deferred.resolve(rows);
    });
    return deferred.promise;
}

exports.create_user = "INSERT INTO users_list(users_name,user_email,password,active) VALUES(?)";

exports.find_user = "SELECT * FROM users_list WHERE USER_EMAIL = ?";

exports.verify_user = "UPDATE users_list SET ACTIVE = 1 WHERE USER_ID = ?";

exports.update_password = "UPDATE users_list SET PASSWORD = ?  WHERE USER_ID = ?";

exports.create_task = "INSERT INTO task_list(task_name,task_details,task_email,task_phone,task_time,status) VALUES(?)"

exports.getTaskList = "SELECT * FROM task_list";