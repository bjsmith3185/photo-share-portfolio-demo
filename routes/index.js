const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
// const populateRoutes = require("./dbseed");
const systemRoutes = require("./system");


// API Routes
router.use("/api", apiRoutes);

// // Populate Route
// router.use("/populated", populateRoutes);

// System route
router.use("/system", systemRoutes);


module.exports = router;
