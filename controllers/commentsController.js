const db = require("../models");

module.exports = {
  findAll: function () {
    return db.Comments
      .find({})
      // .populate("author")
  },

  findByPicture: function (id) {
    return db.Comments
      .findById({ _id : id })
  },

  create: function (data) {
    return db.Comments.create(data)
  },
  
  update: function (id, data) {
    return db.Comments
      .findOneAndUpdate({ _id: id }, data)
  },

  remove: function () {
    return db.Comments
    .remove({})
  },

  removeAll: function () {
    return db.Comments
    .deleteMany({})
  },

  
  
};
