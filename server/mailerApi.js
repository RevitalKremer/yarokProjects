'use strict';
 
var nodemailer = require('nodemailer');

var ses = require('nodemailer-ses-transport');
// var transporter = nodemailer.createTransport(ses({
//     correctClockSkew: true,
//     accessKeyId: 'AWSACCESSKEY',
//     secretAccessKey: 'AWS/Secret/key'
// }));
var transporter = nodemailer.createTransport('smtps://rrevital@gmail.com:Rr040979');
// var transporter = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: {
//         user: "rrevital@gmail.com",
//         pass: "Rr040979"
//     }
// });

// //create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport({
//     host: 'smtp.example.com',
//     port: 465,
//     secure: true, // secure:true for port 465, secure:false for port 587
//     auth: {
//         user: 'username@example.com',
//         pass: 'userpass'
//     }
// });

// // setup email data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//     to: 'revital@prana-bindu.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };


// function sendMail(newBook) {
//     console.log("sendMail called");
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }

// module.exports = {
//     sendMail: sendMail
// };

 
/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(data) 
{
    return new Promise(function(resolve, reject){

        transporter.sendMail(
        {
            from: data.contactEmail,
            to: 'revital@prana-bindu.com',
            subject: 'Message from ' + data.contactName,
            text: data.contactMsg
        }, 
        (err, info) => 
        {
            if(err)
            {
                reject("send mail failed: " + err);
            }
            if(info)
            {
                resolve(info);    
            }
        });
    });
};
