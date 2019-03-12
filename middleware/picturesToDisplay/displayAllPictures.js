const displayPictures = require("../../controllers/displayPicturesController");
const users = require("../../controllers/usersController");
const pictures = require("../../controllers/picturesController");
const useRedis = require("../redis/userAllPics");

module.exports = {
  AllPictures: function(id) {
    return new Promise((resolve, reject) => {
      // send request to redis file, check for saved value....
      useRedis
        .getRedisAllPics(id)
        .then(redisCheck => {
          if (redisCheck) {
            console.log("All From Cache");
            return resolve(redisCheck);
          }

          // continue with creating the pictureDisplayArray

          let all = [];

          // empty collection displaypicture(userId)
          displayPictures
            .removeMany(id)
            .then(dbresults => {
              // get all pictures
              pictures
                .findAll()
                .then(allPics => {
                  // get any user favorites saved
                  users
                    .findUserFavorites(id)
                    .then(favs => {
                      if (favs.favorites.length === 0) {
                        // If length === 0, there are no favorites saved
                        console.log("there are  no favorites");
                        for (var i = 0; i < allPics.length; i++) {
                          let noFav = {
                            userId: id,
                            picture: allPics[i]
                          };
                          all.push(noFav);

                          if (i === allPics.length - 1) {
                            // put this array into the displayPictures collection
                            displayPictures
                              .createMany(all)
                              .then(displayReady => {
                                // get displaypictures and popuate
                                displayPictures.findByUser(id).then(data => {
                                  console.log("Data From MongoDB");

                                  // Send the returned mongo data to redis
                                  useRedis
                                    .setRedisAllPics(id, data)
                                    .then(setData => {})
                                    .catch(err => console.log(json(err)));

                                  resolve(data);
                                });
                              })
                              .catch(err => console.log(json(err)));
                          }
                        }

                        //====================================
                      } else {
                        // if here, there are saved favorties to add to the display pictures
                        let mixedArray = [];

                        for (var k = 0; k < allPics.length; k++) {
                          let newData = {
                            userId: id,
                            picture: allPics[k],
                            showRed: false
                          };

                          for (var t = 0; t < favs.favorites.length; t++) {
                            if (
                              allPics[k]._id.toString() ===
                              favs.favorites[t].toString()
                            ) {
                              newData = {
                                userId: id,
                                picture: allPics[k],
                                showRed: true
                              };
                            }
                          }

                          mixedArray.push(newData);
                          if (k === allPics.length - 1) {
                            displayPictures
                              .createMany(mixedArray)
                              .then(done => {
                                console.log("Data From MongoDB");
                                // Send the result from mongo to redis
                                useRedis
                                  .setRedisAllPics(id, done)
                                  .then(setData => {})
                                  .catch(err => console.log(json(err)));
                                resolve(done);
                              })
                              .catch(err => console.log(json(err)));
                          }
                        }
                      }
                    })
                    .catch(err => console.log(json(err)));
                })
                .catch(err => console.log(json(err)));
            })
            .catch(err => console.log(json(err)));
        })
        .catch(err => res.status(422).json(err));
    });
  }
};
