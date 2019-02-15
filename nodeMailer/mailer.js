
const nodemailer = require("nodemailer");

require('dotenv').load()



module.exports = {
    sendEmail: function (email, pass) {
        // console.log(`inside sendEmail(), email ${email}, pass ${pass}`)
        // console.log(`system password: ${process.env.Email_Pass}, system email: ${process.env.Email_User}`)

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
            from: '"Family-foto-share" <familyfotoshare@outlook.com>', // sender address
            to: email, // list of receivers
            subject: "Family Foto Share app, login info.", // Subject line
            text: `You have been included in the family photo share app.

            Visit: https://powerful-eyrie-82524.herokuapp.com/

            Your user name is: ${email}
            Your temporary password: ${pass}

            Please change your password after you log in the first time.

            * Click My Profile tab in the nav bar.
            * Click the View User Info button.
            * Click Update beside the password info.
            

            Thank you, `
            , // plain text body
            // html: "<b>Hello world?</b>" // html body
        };

        // console.log(mailOptions)
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {

        //         console.log("it messed up....")
        //         return console.log(error);
        //     }

        //     console.log("Message sent: %s", info.messageId);
        //     // console.log(info.accepted) // should show an array of emails that went thru
        //     // console.log(info.response) // may show ok status?
        // })

    }
}






























