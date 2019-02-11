const router = require("express").Router();
const users = require("../../controllers/usersController");
const usersHelper = require("../../routesHelper/userLogic");
const email = require("../../nodeMailer/mailer");

const nodemailer = require("nodemailer");

require('dotenv').load()
// Matches with "/api/users"

router.route("/")
  .get((req, res) => {
    users.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/online")
  .get((req, res) => {
    // console.log("inside find online users")
    users.findByOnline({})
      .then(dbresults => {
        // console.log("return for online users");
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/new")
  .post((req, res) => {
    // console.log("!!!!!!!!!!!")
    // console.log(req.body)
    users.create(req.body)
      .then(dbresults => {
        // console.log("getting ready to send email ")
        // console.log(dbresults)
        email.sendEmail(dbresults.email, dbresults.password)

        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });


router.route("/:id")
  .get((req, res) => {
    users.findById(req.params.id)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

// login
router.route("/login/:email")
  .put((req, res) => {
    let data = {
      loggedIn: true,
    }
    // console.log("route for login")
    // console.log(req.params.email)
    // console.log(req.body.password)
    users.login(req.params.email, req.body.password, data)
      .then(dbresults => {
        // console.log("return from login")
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });


// signout
router.route("/signout/:id")
  .put((req, res) => {
    let data = {
      loggedIn: false,
    }
    // console.log("route for login")
    // console.log(req.params.email)
    // console.log(req.body.password)
    users.signout(req.params.id, data)
      .then(dbresults => {
        // console.log("return from signout")
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });



// find by name and populate pictures for favorites
router.route("/favorites/:name")

  .get((req, res) => {
    // console.log("@@@@@@@@@@@@@@@@@@")
    users.findByNameAndPopulate(req.params.name)
      .then(dbresults => {
        // console.log("this is the populated result");
        // console.log(dbresults)
        // console.log(typeof(dbresults.favorites[0]))
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });


// update by email
router.route("/email/:email")
  .put((req, res) => {
    users.updateByEmail(req.params.email, req.body)
      .then(dbresults => {
        // console.log("this is updated user")
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

// update by id
router.route("/id/:id")
  .put((req, res) => {
    users.updateById(req.params.id, req.body)
      .then(dbresults => {
        // console.log("this is updated user")
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });



router.route("/:name")
  .put((req, res) => {
    users.update(req.params.name, req.body)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

// this route adds/removes favorites for specific user
router.route("/favorites/:name")

  .put((req, res) => {
    // console.log("made it here")
    // console.log(req.params.name)
    // console.log(req.body)
    usersHelper.update(req.params.name, req.body)
      .then(dbresults => {
        // console.log("back in business")
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))



  });


router.route("/:id")
  .delete((req, res) => {
    users.removeById(req.params.id)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });




module.exports = router;




