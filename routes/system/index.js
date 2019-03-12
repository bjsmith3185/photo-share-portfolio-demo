const router = require("express").Router();
const email = require("../../middleware/nodeMailer/passwordReset");
const getQuestions = require("../../middleware/newUser/secretQuestion");

//  routes /system

router.route("/questions").get((req, res) => {
  let questions = getQuestions.secretQuestions();
  res.json(questions);
});

router.route("/password").put((req, res) => {
  email.emailPassword(req.body.email, req.body.password);
  res.json({email: "password emailed"});
});

module.exports = router;
