const router = require("express").Router();
const displayPictures = require("../../controllers/displayPicturesController");


// route  /api/display

router.route("/")
  .get((req, res) => {
    displayPictures.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/")
  .post((req, res) => {
    displayPictures.create(req.body)
    .then(dbresults => {
      res.json(dbresults)
    })
    .catch(err => res.status(422).json(err))
});

router.route("/many")
  .post((req, res) => {
    displayPictures.createMany(req.body)
    .then(dbresults => {
      res.json(dbresults)
    })
    .catch(err => res.status(422).json(err))
});

//===========================================================

router.route("/:id")
  .get((req, res) => {
    displayPictures.findByUser(req.params.id)
    .then(dbresults => {
      res.json(dbresults)
    })
      .catch(err => res.status(422).json(err))
  });


router.route("/:id")
  .put((req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!updating displayPictures")
    console.log(req.params.id)
    console.log(req.body)
    displayPictures.update(req.params.id, req.body)
      .then(dbresults => {
        console.log("this is the return for update displaypictures")
        console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });



// router.route("/:picture")
//   .put((req, res) => {
//     comments.update(req.params.picture, req.body)
//       .then(dbresults => res.json(dbresults))
//       .catch(err => res.status(422).json(err))
//   });

router.route("/")
  .delete((req, res) => {
    displayPictures.removeAll()
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });
  

router.route("/:id")
  .delete((req, res) => {
    console.log("deleting all user id's: " + req.params.id)
    displayPictures.removeMany(req.params.id)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });




module.exports = router;





