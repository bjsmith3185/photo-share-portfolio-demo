const router = require("express").Router();
const populatePictures = require("../../controllers/picturesController");


// Matches with "/populate/pictures"


router.route("/")
    .post((req, res) => {
        populatePictures.removeAll()
            .then(dbresults => {

               
                res.json(dbresults)
            })
            .catch(err => res.status(422).json(err))
    });


module.exports = router;


