const pictures = require("../../controllers/picturesController");
const aws = require("../aws/bucketAccess");
const redisCache = require("../redis/clearCache");
const clearCache = require('../redis/clearImagesCache')

module.exports = {
  deletePic: function(id, data) {
    return new Promise((resolve, reject) => {
      let user_id = data.user_id;

      // clear cache
      clearCache.clear(user_id)
      .then(cacheCleared => {

        pictures
        .remove(id)
        .then(dbresults => {
          // send request to aws to remove by awsKey
          aws.deleteAWSpicture(data.awsKey);

          // // clear cache for all and favs
          // let newKeyAll = user_id + "/allPics";
          // redisCache
          //   .clearRedisCache(newKeyAll)
          //   .then(clearCacheAll => {
          //     let newKeyFav = user_id + "/favPics";
          //     redisCache
          //       .clearRedisCache(newKeyFav)
          //       .then(clearCacheFav => {
          //         console.log(clearCacheFav);
          //       })
          //       .catch(err => console.log(err));
          //   })
          //   .catch(err => console.log(err));

          resolve(dbresults);
        })
        .catch(err => console.log(err));

      })

    });
  }
};
