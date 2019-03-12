const router = require("express").Router();
const pictures = require("../../controllers/picturesController");
const removePic = require("../../middleware/deletingPictures/removePicture")
const addPic = require('../../middleware/addingPicture/addingNewPicture');
const removeAllPics = require('../../middleware/deletingPictures/removeAllPictures');


// route  /api/pictures

router.route("/")
  .get((req, res) => {
    pictures.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/deleteone/:id")
  .put((req, res) => {
    removePic.deletePic(req.params.id, req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/deleteall/:id")
  .delete((req, res) => {
    removeAllPics.deleteAll(req.params.id)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

  router.route("/:id")
  .post((req, res) => {
    addPic.newPic(req.params.id, req.body)
      .then(dbresults => {
        res.send(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });


module.exports = router;

