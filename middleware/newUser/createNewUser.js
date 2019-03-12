const users = require('../../controllers/usersController');
const email = require('../nodeMailer/mailer')
module.exports = {

    addUser: function (data) {

        return new Promise((resolve, reject) => {

            users.create(data)
                .then(dbresults => {

                    email.sendEmail(dbresults.email, dbresults.password)

                    // can i get a response from a promise here?

                    resolve(dbresults)

                })
                .catch(err => console.log((err)))
        })
    }

};