const users = require("../../controllers/usersController");
const client = require('./redisConnection')
const util = require('util');
client.get = util.promisify(client.get);


module.exports = {

    redisForUsers: function (id) {

        return new Promise((resolve, reject) => {
        // do we have any cached data related to this query
        client.get(id)
            .then(result => {

                // if yes, then respond to teh request right away
                if (result) {
                    console.log("returning User from Cache")
                    return resolve(JSON.parse(result))
                }

                // if no, we need to reapond to request and update our cache.
                users.findById(id)
                    .then(dbresults => {
                        console.log("returning from Mongo")
                        
                        client.set(id, JSON.stringify(dbresults))
                        resolve(dbresults);
                    })
                    .catch(err => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err))
        })
    }

}










