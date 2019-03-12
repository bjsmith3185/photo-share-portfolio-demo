const addRemove = require("./userLogic");
const displayFavs = require("../picturesToDisplay/displayFavoritePictures");
const displayAll = require("../picturesToDisplay/displayAllPictures");
const redisCache = require("../redis/clearCache");
const clearCache = require('../redis/clearImagesCache')

module.exports = {
  updateFav: function(id, data) {
    return new Promise((resolve, reject) => {
      let picData = {
        _id: data._id
      };

      let fav = data.fav;
      let all = data.all;

      // clear cache for both allpics and favpics
      clearCache.clear(id)
      .then(cacheCleared => {

        addRemove.update(id, picData)
        .then(results => {
          if (fav) {
            displayFavs
              .FavoritePictures(id)
              .then(result => {
                resolve(result);
              })
              .catch(err => console.log((422).json(err)));
          } else if (all) {
            displayAll
              .AllPictures(id)
              .then(result => {
                resolve(result);
              })
              .catch(err => console.log(err));
          }
        })
        

      })
      .catch(err => console.log(err))

      // addRemove
      //   .update(id, picData)
      //   .then(results => {
      //     // this result had new favs array

      //     // here i should clear cache for: allPics and favPics

      //     let newKeyAll = id + "/allPics";
      //     redisCache
      //       .clearRedisCache(newKeyAll)
      //       .then(clearCacheAll => {
      //         let newKeyFav = id + "/favPics";
      //         redisCache
      //           .clearRedisCache(newKeyFav)
      //           .then(clearCacheFav => {

      //           })
      //           .catch(err => console.log(err));
      //       })
      //       .catch(err => console.log(err));

      //     //-----------------------------------

      //     if (fav) {
      //       displayFavs
      //         .FavoritePictures(id)
      //         .then(result => {
      //           resolve(result);
      //         })
      //         .catch(err => console.log((422).json(err)));
      //     } else if (all) {
      //       displayAll
      //         .AllPictures(id)
      //         .then(result => {
      //           resolve(result);
      //         })
      //         .catch(err => console.log(err));
      //     }
      //   })
      //   .catch(err => console.log(err));
    });
  }
};
