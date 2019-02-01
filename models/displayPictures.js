const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisplayPicturesSchema = new Schema({

  userId: {
    type: String
  },

  picture: {
    type: Schema.Types.ObjectId,
    ref: "Pictures"
  },

  showRed: {
    type: Boolean,
    default: false,
  },

  openTextBox: {
    type: Boolean,
    default: false
  },

  rotateImage: {
    type: Boolean,
    default: false,
  }



});

const DisplayPictures = mongoose.model("DisplayPictures", DisplayPicturesSchema);

module.exports = DisplayPictures;
