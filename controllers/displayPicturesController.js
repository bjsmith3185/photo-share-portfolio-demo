const db = require("../models");

module.exports = {
  findAll: function () {
    return db.DisplayPictures
      .find({})
      .populate({
        path: 'picture',
        populate: {
          path: 'notes',
          populate: {
            path: 'author'
          }
        }
      })
      
  },
  //===================================

  findByUser: function (id) {
    console.log("!!!!! " + id)
    return db.DisplayPictures
      .find({ userId : id })
      .populate({
        path: 'picture',
        populate: {
          path: 'notes',
          populate: {
            path: 'author'
          }
        }
      })
  },

  create: function (data) {
    // console.log("!!!!!")
    // console.log(data)
    return db.DisplayPictures
    .create(data)
  },

  createMany: function (data) {
    console.log("!!!!! create many")
    console.log(data)
    return db.DisplayPictures
    .insertMany(data, {new: true})
  },
  
  update: function (id, data) {
    return db.DisplayPictures
      .findOneAndUpdate({ _id: id }, data,{ new : true })
  },

  remove: function () {
    return db.DisplayPictures
    .remove({})
  },

  removeAll: function () {
    return db.DisplayPictures
    .deleteMany({}, { new : true })
  },

  removeMany: function (id) {
    return db.DisplayPictures
    .deleteMany({ userId : id}, {new:true})
  },
  
};
