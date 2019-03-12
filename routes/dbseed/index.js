const router = require("express").Router();
const resetRoutes = require("./resetRouter");


//  routes /populate/user
router.use("/reset", resetRoutes);



module.exports = router;
