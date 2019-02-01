const router = require("express").Router();
const pictures = require("../../controllers/picturesController");


const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: imageFilter });

// route  /api/pictures

router.route("/")
  .get((req, res) => {
    pictures.findAll()
      .then(dbresults => {
        // console.log()
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/")
  .post(upload.single('image'), (req, res) => {

    let picObj = {
      name: req.file.originalname,
      encodedImage:
      {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    };

    pictures.create(picObj)
      .then(dbresults => {
        //add image value to model with _id
        
        let data = {

          // image: "http://localhost:3001/api/pictures/" + dbresults._id
          image: "https://morning-garden-46388.herokuapp.com/api/pictures/" + dbresults._id

        }

        pictures.update(dbresults._id, data)
          .then(dbresults => {
            res.json(dbresults)
          })
          .catch(err => res.status(422).json(err))

        // res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))

  });



router.route("/:picture")
  .get((req, res) => {
    pictures.findByPicture(req.params.picture)
      .then(dbresults => {
        if (dbresults.encodedImage.contentType) {
          res.contentType(dbresults.encodedImage.contentType);
          return res.send(dbresults.encodedImage.data);
        } else {
          return res.json(dbresults);
        }
      })
      .catch(err => res.status(422).json(err))
  });

// route to add note
router.route("/note/:picture")
  .put((req, res) => {
    // console.log("inside the add note route")
    // console.log(req.params.picture)
    // console.log(req.body)
    pictures.addNote(req.params.picture, req.body)
      .then(dbresults => {
        // console.log("this is the return with populated note")
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });
  


router.route("/:id")
  .put((req, res) => {
    pictures.update(req.params.id, req.body)
      .then(dbresults => {
        // console.log("this is the return for update picture")
        // console.log(dbresults)
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/:id")
  .delete((req, res) => {
    pictures.remove(req.params.id)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

  router.route("/")
  .delete((req, res) => {
    pictures.removeAll()
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });





module.exports = router;





