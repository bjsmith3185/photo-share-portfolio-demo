const router = require("express").Router();
const uploadAWS = require("../../middleware/aws/uploadToAWS");
const picture = require("../../middleware/addingPicture/addingNewPicture");

const imageFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: imageFilter });



// route  /api/aws
router.route("/upload/:id").post(upload.single("image"), (req, res) => {

  let userId = req.params.id;

  let picObj = {
    name: req.file.originalname,
    file: req.file.buffer,
    type: req.file.mimetype
  };

  uploadAWS
    .addPictureToAWS(req.params.id, picObj)
    .then(data => {

      // send data.key to pictures collection to create new document

      let uploadData = {
        imageUrl: "https://s3.amazonaws.com/portfolio-photo-share/" + data.key,
        awsKey: data.key
      };

      picture
        .newPic(userId, uploadData)

        .then(dbresult => {
          res.send(dbresult);
        })
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
