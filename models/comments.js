const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({

  text: {
    type: String
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },

  date: {
    type: Date,
    default: Date.now
  },

});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
