const router = require("express").Router();
const populateUsers = require("../../controllers/usersController");
const pictures = require("../../controllers/picturesController");
const comments = require("../../controllers/commentsController");


// Matches with "/populate/reset/users"

const adminSeedArray = [
  {
    name: "brian smith",
    admin: true,
    email: "brian@mail.com"
    // secretQuestion: "What is your favorite pet",
    // secretAnswer: "dog"
    // password: "123456",
  }
];

router.route("/users").post((req, res) => {
  populateUsers
    .removeAll()
    .then(dbresults => {
      for (var i = 0; i < adminSeedArray.length; i++) {
        populateUsers
          .create(adminSeedArray[i])
          .then(dbresults => {
            console.log("deleted and populated users collection");
            console.log(dbresults);
          })
          .catch(err => res.status(422).json(err));
      }
      res.json(dbresults);
    })
    .catch(err => res.status(422).json(err));
});

// Matches with "/populate/reset/pictures"

router.route("/pictures").delete((req, res) => {
  pictures
    .removeAll()
    .then(dbresult => {
      res.json(dbresult);
    })
    .catch(err => res.status(422).json(err));
});

// Matches with "/populate/reset/comments"

router.route("/comments").delete((req, res) => {
  comments
    .removeAll()
    .then(dbresult => {
      res.json(dbresult);
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
