const users = require("../controllers/usersController");

// this helper file will add/remove picture _id's to the users favorite [].

module.exports = {

    update: function (name, data) {
        return new Promise((resolve, reject) => {
            let removed = false;
            // console.log("!!!!!!!!! ")
            // console.log(typeof (data.favorites));
            // console.log(data)
            // { favorites: '5c2e90a4c53ed12b78b25835' }

            users.findByName(name)
                .then(dbresults => {
                    // console.log("$$$$$")
                    // console.log(dbresults)

                    // console.log(typeof (dbresults[0].favorites))
                    let favoritesArray = dbresults.favorites;
                    // console.log(favoritesArray)
                    for (var i = 0; i < favoritesArray.length; i++) {

                        if (data.favorites === favoritesArray[i].toString()) {

                            removed = true;
                            // console.log("it matches at index: " + i)
                            // it is already in the favorites array so lets remove it
                            favoritesArray.splice(i, 1);
                            // send the new array back to the collection
                            let updatedArray = {
                                favorites: favoritesArray
                            }
                            users.update(name, updatedArray)
                                .then(dbresults => {
                                    // console.log("the entry was removed from favorites")
                                    // console.log(dbresults)
                                    resolve(dbresults);
                                })

                        }

                    } // end of for loop

                    if (!removed) {


                        // update the user's favorites [] with the new picture

                        let pushArray = {
                            $push: data
                        }

                        users.update(name, pushArray)
                            .then(dbresults => {
                                // console.log("the entry was added to favorites")
                                // console.log(dbresults)
                                resolve(dbresults);
                            })

                    }
                })
                .catch(err => console.log((422).json(err)))

        });  // end of promise

    },


    //   .put((req, res) => {
    //     console.log("made it here")
    //     console.log(req.params.name)
    //     console.log(req.body)
    //     let pushData = {
    //       $push: req.body
    //     }
    //     users.update(req.params.name, pushData)
    //       .then(dbresults => res.json(dbresults))
    //       .catch(err => res.status(422).json(err))
};