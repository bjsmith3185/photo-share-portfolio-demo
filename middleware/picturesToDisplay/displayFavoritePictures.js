// require in dbs
const displayPictures = require("../../controllers/displayPicturesController");
const users = require("../../controllers/usersController");
const useRedis = require("../redis/userFavPics");

module.exports = {
  FavoritePictures: function(id) {
    return new Promise((resolve, reject) => {
      // send requrest to redis, check for saved values....
      useRedis
        .getRedisFavPics(id)
        .then(redisCheck => {
          if (redisCheck) {
            console.log("Favs from Cache");
            return resolve(redisCheck);
          } else {
            let fav = [];
            // empty collection displaypicture(userId)

            displayPictures
              .removeMany(id)
              .then(dbresults => {
                // get any user favorites saved
                users
                  .findUserFavorites(id)
                  .then(favs => {
                    if (favs.favorites.length === 0) {
                      // if length === 0 there are no favorites saved
                      let data = [];
                      resolve(data);
                    }

                    // if here, there are favorites saved

                    for (var i = 0; i < favs.favorites.length; i++) {
                      let data = {
                        userId: id,
                        picture: favs.favorites[i],
                        showRed: true
                      };
                      fav.push(data);

                      if (i === favs.favorites.length - 1) {
                        // put this array into the displayPictures collection
                        displayPictures
                          .createMany(fav)
                          .then(displayReady => {
                            // get displaypictures and popuate
                            displayPictures.findByUser(id).then(data => {
                              console.log("Favs From MongoDB");

                              // send the result from mongo to redis
                              useRedis
                                .setRedisFavPics(id, data)
                                .then(setData => {})
                                .catch(err => console.log(json(err)));

                              resolve(data);
                            });
                          })
                          .catch(err => console.log(json(err)));
                      }
                    }
                  })
                  .catch(err => console.log(json(err)));
              })
              .catch(err => console.log(json(err)));
          }
        })
        .catch(err => console.log(json(err)));
    });
  }
};
