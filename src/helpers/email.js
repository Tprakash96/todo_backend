const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tprakashkce@gmail.com',
        pass: 'prakash4112240821'
    }
});

exports.sendEmail = (mailOptions, userId) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        return true;
    });
}