const router = require("express").Router();
const users = require("../../controllers/usersController");
const newUser = require("../../middleware/newUser/createNewUser")
const addRemoveFav = require("../../middleware/addRemoveFavorites/handleAddRemoveFav");
const cacheModule = require("../../middleware/redis/usersRedis");
const checkLogin = require('../../middleware/signIn/loginUser')
const cacheAll = require('../../middleware/redis/clearAllCache')
const cacheUser = require('../../middleware/redis/clearUserCache')



// Matches with "/api/users"

router.route("/")
  .get((req, res) => {
    users.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });


router.route("/:id")
  .get((req, res) => {
    cacheModule.redisForUsers(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => res.status(422).json(err))

  });

  router.route("/new")
  .post((req, res) => {
    newUser.addUser(req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))

  });

  router.route("/id/:id")
  .put((req, res) => {
    users.updateById(req.params.id, req.body)
      .then(dbresults => {
        // clear users cache
        cacheUser.clear(req.params.id)
        .then(cache => {
          
        })

        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

  router.route("/signout/:id")
  .put((req, res) => {
    let data = {
      loggedIn: false,
    }
    users.signout(req.params.id, data)
      .then(dbresults => {
        // clear redis cache for user id
        
        cacheAll.clear(req.params.id)
        .then(cacheBack => {
        })
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

  router.route("/login/:email")
  .put((req, res) => {
    checkLogin.login(req.params.email, req.body.password)
      .then(dbresults => {
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
router.route("/favorites/:id")
  .put((req, res) => {
    addRemoveFav.updateFav(req.params.id, req.body)
      .then(dbresults => {
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

  // this route is used to log in
  router.route("/email/:email")
  .get((req, res) => {
   users.findByEmail(req.params.email)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
    });


module.exports = router;

