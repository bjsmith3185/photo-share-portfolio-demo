const db = require("../models");

module.exports = {

  login: function (email, password, data) {
    // console.log("inside usersController")
    // console.log(email)
    // console.log(password)
    // console.log(email)

    return db.Users
      .findOneAndUpdate({ email: email, password: password }, data, { new: true })
  },

  signout: function (id, data) {
    // console.log("inside usersController")
    // console.log(email)
    // console.log(password)
    // console.log(email)

    return db.Users
      .findOneAndUpdate({ _id: id }, data, { new: true })
  },

  // createMany: function (data) {
  //   console.log("!!!!! inserting many users")
  //   console.log(data)
  //   return db.Users
  //   .insertMany(data, {new: true})
  // },


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
    // console.log("########### usercontroller")
    // console.log(name)
    return db.Users
      .findOne({ name: name })
  },

  create: function (data) {
    console.log("!!!")
    console.log(data)
    // db.Users.createIndex( { favorites: 1 } )
    return db.Users
      .create(data)
  },


  update: function (name, data) {
    return db.Users
      .findOneAndUpdate({ name: name }, data, { upsert: true })
  },
  updateByEmail: function (email, data) {
    return db.Users
      .findOneAndUpdate({ email: email }, data, { upsert: true })
  },
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

  findByNameAndPopulate: function (name) {
    // console.log("@@@@ " + name)
    return db.Users
      .findOne({ name: name })
    // .populate({
    //   path: 'favorites',
    //   populate: {
    //     path: 'notes',
    //     populate: {
    //       path: 'author'
    //     }
    //   }
    // })


  },
};

