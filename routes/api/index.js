const router = require("express").Router();
const picturesRoutes = require("./picturesRouter");
const usersRoutes = require("./usersRouter");
const commentsRoutes = require("./commentsRouter");
const displayPicturesRoutes = require("./displayPicturesRouter");

//  routes
router.use("/pictures", picturesRoutes);
router.use("/users", usersRoutes);
router.use("/comments", commentsRoutes);
router.use("/display", displayPicturesRoutes);

// populate routes
// router.use("/populate", populateRoutes);


module.exports = router;
