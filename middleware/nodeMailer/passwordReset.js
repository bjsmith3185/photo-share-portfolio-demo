const nodemailer = require("nodemailer");
require('dotenv').load()



module.exports = {
    emailPassword: function (email, pass) {
        // console.log(`inside sendEmail(), email ${email}, pass ${pass}`)
       

        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: process.env.Email_User,
                pass: process.env.Email_Pass
            }
        });

     
        // email the user their new info
        let mailOptions = {
            from: '"PhotoShare-Practice-App" <photoshare-practice@outlook.com>', // sender address
            to: email, // list of receivers
            subject: "Photoshare practice app, reset password.", // Subject line
            text: `You exceded the number of attempts to correctly answer your secret question. Your email has been sent to you. You can log in at the link below.

            Visit: https://photoshare-aws-practice.herokuapp.com/

            Your user name is: ${email}
            Your password is: ${pass}
  

            Thank you, `
            , // plain text body
            // html: "<b>Hello world?</b>" // html body
        };

        // console.log(mailOptions)
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {

                console.log("it messed up....")
                return console.log(error);
            }

            console.log("Message sent: %s", info.messageId);
            console.log(info.accepted) // should show an array of emails that went thru
            console.log(info.response) // may show ok status?
        })

    }
}






























