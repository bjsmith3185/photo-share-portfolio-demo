const router = require("express").Router();
require('dotenv').load();
const displayAll = require("../../middleware/picturesToDisplay/displayAllPictures");
const displayFav = require("../../middleware/picturesToDisplay/displayFavoritePictures")


// route  /api/system/displaypictures


router.route("/all/:id")
    .get((req, res) => {
        displayAll.AllPictures(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => console.log(json(err)))
    });


router.route("/fav/:id")
    .get((req, res) => {
        displayFav.FavoritePictures(req.params.id)
        .then(data  => {
            res.json(data)
        })
        .catch(err => console.log(json(err)))
    });


module.exports = router;