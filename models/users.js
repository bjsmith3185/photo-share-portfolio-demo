const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: { type: String},
  email: {type: String},
  password: {type: String, default: "123456"},
  loggedIn: {type: Boolean, default: false},
  admin: {type: Boolean, default: false},
  secretQuestion : {type: String, default: ""},
  secretAnswer: {type: String, default: ""},
  secretQuestionCompleted: {type: Boolean, default: false},
 
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pictures",
      default: "",
      // unique: true
    }
  ],
  createdDate: { type: Date, default: Date.now },
  // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  
});

// UsersSchema.index({
//   favorites: 1
// })



const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
