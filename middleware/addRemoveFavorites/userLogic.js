const users = require("../../controllers/usersController");

// this helper file will add/remove picture _id's to the users favorite [].

module.exports = {

    update: function (id, data) {
        return new Promise((resolve, reject) => {
            let removed = false;
            let picture_id = data._id;
            let user_id = id;

            users.findById(user_id)
                .then(dbresults => {
                    let favoritesArray = dbresults.favorites;
                    if (favoritesArray.length === 0) {
                        let pushArray = {
                            $push: { favorites: picture_id }
                        }

                        users.updateById(user_id, pushArray)
                            .then(dbresults => {
                                resolve(dbresults); // added pic to favs
                            })
                    } else {
                        for (var i = 0; i < favoritesArray.length; i++) {

                            if (picture_id === favoritesArray[i].toString()) {

                                removed = true; // means it is already a fav

                                favoritesArray.splice(i, 1);

                                let updatedArray = {
                                    favorites: favoritesArray
                                }

                                users.updateById(user_id, updatedArray)
                                    .then(dbresults => {
                                        resolve(dbresults);  // removed from fav array
                                    })
                                    .catch(err => console.log(err))
                            }
                        }

                        if (!removed) {
 
                            let pushArray = {
                                $push: { favorites: data._id }
                            }

                            users.updateById(user_id, pushArray)
                                .then(dbresults => {
                                    resolve(dbresults); // added to favs
                                })
                        }
                    }
                })
                .catch(err => console.log((422).json(err)))

        });  // end of promise
    },

};


