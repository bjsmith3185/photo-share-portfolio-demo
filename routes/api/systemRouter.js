const router = require("express").Router();
const picturesTodisplayRoutes = require("../picturesToDisplay")


// route  /api/system

router.use("/displaypictures", picturesTodisplayRoutes);


module.exports = router;

