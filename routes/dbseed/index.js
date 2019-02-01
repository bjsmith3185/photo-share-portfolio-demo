const router = require("express").Router();
const populateUsersRoutes = require("./populateUsersRouter");
const populatePicturesRoutes = require("./populatePicturesRouter");


//  routes /populate/user
router.use("/users", populateUsersRoutes);
router.use("/pictures", populatePicturesRoutes);





module.exports = router;
