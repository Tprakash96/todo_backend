const bcrypt = require("bcrypt");
const queries = require('../database/queries');
const mail = require('../helpers/email');
const jwt = require("jsonwebtoken");
const url = require('../config/apiconfig.json');

exports.user_create = (req, res, next) => {
    const reqData = req.body;
    const userName = reqData.user_name;
    const email = reqData.email;
    const password = reqData.password;

    queries.executeQuery(queries.find_user, email).then((response) => {
        const isUserExist = (response.length > 0);
        if (!isUserExist) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(5000).json({
                        error: err
                    });
                }
                else {
                    queries.executeQuery(queries.create_user, [[userName, email, hash, 0]])
                        .then((response) => {
                            const verficationURL = url.config.webUrl.baseUrl + "user/verification/" + response.insertId;
                            const mailOptions = {
                                from: '"Prakas T" <tprakashkce@gmail.com>',
                                to: email,
                                subject: "Verfication mail",
                                text: "Please click Verification link",
                                html: '<a href="' + verficationURL + '">Click Me</a>'
                            }
                            mail.sendEmail(mailOptions);
                            return res.status(201).json({
                                status: 2001,
                                userId: response.insertId,
                                message: "Verification mail send to your mail id"
                            });
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            return res.status(201).json({
                status: 4009,
                message: "User Already Exist"
            });
        }
    }).catch(err => console.log(err));
};


exports.user_verifcation = (req, res, next) => {
    queries.executeQuery(queries.verify_user, [req.body.userId])
        .then((response) => {
            return res.status(201).json({
                status: 3001,
                message: "User Has Been Verified"
            });
        })
        .catch((err) => { console.log(err); });
}

exports.user_login = (req, res, next) => {
    const reqData = req.body;
    const email = reqData.email;
    const password = reqData.password;
    queries.executeQuery(queries.find_user, [email]).then((response) => {
        const isUserExist = (response.length > 0);
        if (isUserExist && response[0].active) {
            const userData = response[0];
            bcrypt.compare(password, response[0].password, (err, result) => {
                if (err) {
                    return res.status(201).json({
                        status: 4001,
                        message: "Invalid login credentials"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: response[0].email,
                            userId: response[0].user_id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1d"
                        }
                    );
                    return res.status(200).json({
                        status: 2001,
                        message: "Auth successful",
                        payload: {
                            user_id: userData.user_id,
                            user_name: userData.users_name,
                            user_email: userData.user_email,
                            active: userData.active
                        },
                        token: token,
                    });
                }
                res.status(201).json({
                    status: 4001,
                    message: "Invalid login credentials"
                });
            })
        }
        else if (!isUserExist) {
            return res.status(201).json({
                status: 4001,
                message: "Invalid login credentials"
            });
        }
        else {
            return res.status(201).json({
                status: 3001,
                message: "Account not verified"
            });
        }
    }).catch(err => console.log(err));
}

exports.forget_password = (req, res, next) => {
    const email = req.body.email;
    queries.executeQuery(queries.find_user, [email]).then((response) => {
        const isUserExist = (response.length > 0);
        if (isUserExist) {
            const verficationURL = url.config.webUrl.baseUrl + "/user/resetPassword/" + response[0].user_id;
            const mailOptions = {
                from: '"Prakas T" <tprakashkce@gmail.com>',
                to: email,
                subject: "reset password",
                text: "reset password",
                html: '<a href="' + verficationURL + '">Click Me</a>'
            }
            mail.sendEmail(mailOptions);
            return res.status(201).json({
                status: 2001,
                userId: response.insertId,
                message: "User Created"
            });
        }
        else {
            return res.status(201).json({
                status: 4001,
                message: "your account doesn't exist our database"
            });
        }
    });
}

exports.reset_password = (req, res, next) => {
    const userId = req.body.userId;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(5000).json({
                status: 5001,
                message: "Password encrption failed"
            });
        }
        else {
            queries.executeQuery(queries.update_password, [hash, userId])
                .then((response) => {
                    return res.status(201).json({
                        status: 2001,
                        message: "Password Updated"
                    });
                })
                .catch(err => console.log(err));
        }
    });
}