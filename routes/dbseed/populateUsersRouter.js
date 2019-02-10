const router = require("express").Router();
const populateUsers = require("../../controllers/usersController");


// Matches with "/populate/users"

const adminSeedArray = [
    {
        name: "brian smith",
        admin: true,
        email: "brian@mail.com",
        // password: "123456",
    },

    // {
    //     name: "Ann Smith",
    //     admin: true,
    //     email: "ann@mail.com",
    //     password: "123456",
    // },
]




router.route("/")
    .post((req, res) => {
        populateUsers.removeAll()
            .then(dbresults => {

                for (var i = 0; i < adminSeedArray.length; i++) {
                    populateUsers.create(adminSeedArray[i])
                        .then(dbresults => {
                            console.log("deleted and populated users collection")
                            console.log(dbresults);

                        })
                        .catch(err => res.status(422).json(err))
                }
                res.json(dbresults)
            })
            .catch(err => res.status(422).json(err))
    });


module.exports = router;


