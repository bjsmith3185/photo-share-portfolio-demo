const pictures = require("../../controllers/picturesController");
const aws = require("../aws/bucketAccess");
const clearCache = require('../redis/clearImagesCache');
const redisCache = require("../redis/clearCache");

module.exports = {
  deleteAll: function(user_id) {
    return new Promise((resolve, reject) => {
      // clear cache
      clearCache
        .clear(user_id)
        .then(cacheCleared => {
          // clear pictures collection from mongoDB
          pictures
            .removeAll()
            .then(dbresults => {
              // delete all pics from aws s3
              aws.emptyBucket();

              // // clear cache for all and favs
              // let newKeyAll = user_id + "/allPics";
              // redisCache
              //   .clearRedisCache(newKeyAll)
              //   .then(clearCacheAll => {
              //     let newKeyFav = user_id + "/favPics";
              //     redisCache
              //       .clearRedisCache(newKeyFav)
              //       .then(clearCacheFav => {})
              //       .catch(err => console.log(err));
              //   })
              //   .catch(err => console.log(err));

              resolve(dbresults);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
};
