const client = require('./redisConnection')
const util = require('util');
client.get = util.promisify(client.get);


module.exports = {

    getRedisAllPics: function (id) {
        return new Promise((resolve, reject) => {
            // do we have any cached data related to this query

            // create a new key that includes unique identifyer for all pictures
            let newKeyAll = id + "/allPics";

            // check redis for key/value data
            client.get(newKeyAll)
                // if true return the data
                // if false return and perform query to mongo
                .then(result => {
                    // if yes, then respond to teh request right away
                    if (result) {
                        return resolve(JSON.parse(result))
                    }
                    return resolve(false)
                })
                .catch(err => res.status(422).json(err))
        })
    },

    setRedisAllPics: function (id, results) {
        return new Promise((resolve, reject) => {

            let newKey = id + "/allPics";

            client.set(newKey, JSON.stringify(results))
            resolve("added to redis");
        })
    }

}

