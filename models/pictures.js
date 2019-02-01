const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PicturesSchema = new Schema({
  name: { type: String },
  image: { type: String },
  location: { type: String },
  encodedImage: { data: Buffer, contentType: String },

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ],

  date: {
    type: Date,
    default: Date.now
  },

  // openTextBox: {
  //   type: Boolean,
  //   default: false
  // },

});

const Pictures = mongoose.model("Pictures", PicturesSchema);

module.exports = Pictures;
