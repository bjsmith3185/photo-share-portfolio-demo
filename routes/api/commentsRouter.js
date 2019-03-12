const router = require("express").Router();
const comments = require("../../controllers/commentsController");
const makeNote = require("../../middleware/addNotes/createNewNote");


// route  /api/comments

router.route("/")
  .post((req, res) => {
    makeNote.addNote(req.body)
    .then(dbresults => {
      res.json(dbresults)
    })
    .catch(err => res.status(422).json(err))
});

router.route("/")
  .delete((req, res) => {
    comments.removeAll()
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });


module.exports = router;

