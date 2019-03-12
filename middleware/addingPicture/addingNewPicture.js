const pictures = require("../../controllers/picturesController");
const redisCache = require('../redis/clearCache')
const clearCache= require('../redis/clearImagesCache')


module.exports = {
    newPic: function (id, data) {
        return new Promise((resolve, reject) => {

            // create a key for redis for all pictures
            let newKeyAll = id + "/allPics";

            // need data to create new pic document
            pictures.create(data)
                .then(dbresults => {
                    // clear cache
                    clearCache.clear(id)
                    .then(done => {
                    })
                    .catch(err => console.log(err))

                    // redisCache.clearRedisCache(newKeyAll)
                    //     .then(done => {
                    //     })
                    //     .catch(err => console.log(err))
                   resolve(dbresults)
                })
                .catch(err => console.log(err))
        })
    }
};
