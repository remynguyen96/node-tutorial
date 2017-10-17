const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = transporter;

// let mailOptions = {
//     from: `"Demo Express Js With Remy Nguyen 👻" <remynguyen@enlightened.com>`,
//     to: `nguyentietngocchau@gmail.com, buttercut8@gmail.com`,
//     subject: `Hello Mail Send From Blog Remy Nguyen ✔`,
//     html: `
//       <h2>Remy Nguyen</h2>
//       <h4 style="color:#7c4dff">This is remy nguyen send mail demo from express</h4>
//     `
// };
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
