const router = require("express").Router();
const comments = require("../../controllers/commentsController");
const pictures = require("../../controllers/picturesController");



// route  /api/comments

router.route("/")
  .get((req, res) => {
    comments.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/")
  .post((req, res) => {
    comments.create(req.body)
    .then(dbresults => {
      // console.log("what does this show");
      // console.log(dbresults)
      // send this comment to the picture model
      // console.log(req.body.picture_id)
      pictures.addNote(req.body.picture_id, dbresults._id)
      .then(dbresults => {
        // console.log("this is the picture model with notes added");
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))

    })
    .catch(err => res.status(422).json(err))
});



router.route("/:comment")
  .get((req, res) => {
    comments.findByPicture({_id: req.params.comment})
    .then(dbresults => {
      res.json(dbresults)
    })
      .catch(err => res.status(422).json(err))
  });


router.route("/:comment")
  .put((req, res) => {
   
    comments.update(req.params.comment, req.body)
      .then(dbresults => {
        // console.log("this is the return for update")
        // console.log(dbresults)
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

router.route("/:comment")
  .delete((req, res) => {
    comments.remove({_id: req.params.comment})
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });




module.exports = router;





