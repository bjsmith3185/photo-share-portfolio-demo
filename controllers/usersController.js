const db = require("../models");

module.exports = {

  login: function (email, password, data) {
    return db.Users
      .findOneAndUpdate({ email: email, password: password }, data, { new: true })
  },

  signout: function (id, data) {
    return db.Users
      .findOneAndUpdate({ _id: id }, data, { new: true })
  },

  findAll: function () {
    return db.Users
      .find({})
  },
  findById: function (id) {
    return db.Users
      .findOne({ _id: id })
  },

  findByOnline: function () {
    return db.Users
    .find({loggedIn: true})
  },

  findByName: function (name) {
    return db.Users
      .findOne({ name: name })
  },

  findByEmail: function (email) {
    return db.Users
      .findOne({ email: email })
  },

  create: function (data) {
       return db.Users
      .create(data)
  },

  update: function (name, data) {
    return db.Users
      .findOneAndUpdate({ name: name }, data, { upsert: true })
  },
  // updateByEmail: function (email, data) {
  //   return db.Users
  //     .findOneAndUpdate({ email: email }, data, { upsert: true })
  // },
  updateById: function (id, data) {
    return db.Users
      .findOneAndUpdate({ _id: id }, data, { upsert: true })
  },
  remove: function (name) {
    return db.Users
      .findOneAndRemove({ name: name })
  },

  removeById: function (id) {
    return db.Users
      .findOneAndRemove({ _id: id })
  },

  removeAll: function () {
    return db.Users
      .deleteMany({})
  },
  findUserFavorites: function (id) {
    return db.Users
    .findOne({ _id: id })
    .select('favorites')
  }
};

