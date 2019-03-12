const router = require("express").Router();
const noteArea = require("../../middleware/addNotes/showNoteArea");

// route  /api/display

// route to open and close text box
router.route("/:id").put((req, res) => {
  noteArea
    .showNote(req.params.id, req.body)
    .then(dbresults => {
      res.json(dbresults);
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
