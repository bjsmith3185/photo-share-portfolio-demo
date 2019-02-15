import axios from "axios";


export default {

  //  route /populate/....
  populateUsers: function () {
    return axios.post("/populate/users");
  },

  removePicures: function () {
    return axios.post("/populate/pictures");
  },



  // route /api/user/login
  login: function (email, data) {
    return axios.put("/api/users/login/" + email, data)
  },


  // route /api/users
  getAllUsers: function () {
    return axios.get("/api/users");
  },

  getOnlineUsers: function () {
    return axios.get("/api/users/online");
  },

  addUser: function (data) {
    console.log(data)
    return axios.post("/api/users/new", data);
  },

  updateUser: function (name, data) {
    return axios.put("/api/users/" + name, data)
  },

  updateUserById: function (id, data) {
    // console.log("api")
    // console.log(id);
    // console.log(data)
    return axios.put("/api/users/id/" + id, data)
  },

  signOutUser: function (id) {
    return axios.put("/api/users/signout/" + id)
  },

  updateUserByEmail: function (email, data) {
    return axios.put("/api/users/email/" + email, data)
  },

  getUser: function (_id) {
    return axios.get("/api/users/" + _id)
  },

  addToFavorites: function (name, id) {
    // console.log("api: " + name + ":" + id)
    return axios.put("/api/users/favorites/" + name, id);
  },

  getUserFavorites: function (name) {
    // console.log("this is api for getuserfavorites()")
    // console.log(name);
    return axios.get("/api/users/favorites/" + name);
  },

  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },






  // route /api/pictures
  getAllPictures: function () {
    return axios.get("/api/pictures");
  },

  // uploadFiles: function(data) {
  //   console.log("api")
  //   console.log(data)
  //   return axios.post("/api/pictures", data)
  // },

  uploadFiles: function (file) {

    // TODO
    // multiple files are much more difficult. let's keep the user doing one at a time
    // might want to change all references to 'uploadFiles' to 'uploadFile'

    console.log(file);
    const formData = new FormData();
    formData.append('image', file, file.name);

    return axios.post("/api/pictures", formData, {
      onUploadProgress: progressEvent => {
        console.log("upload progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%")
      }
    })
  },


  updatePicture: function (id, data) {
    return axios.put("/api/pictures/" + id, data)
  },

  removeAllPictures: function () {
    return axios.delete('/api/pictures')
  },

  removeOnePicture: function (id) {
    return axios.delete('/api/pictures/' + id)
  },



  // route /api/comments

  addPictureNote: function (data) {
    console.log("api for add note")

    console.log(data)
    return axios.post('/api/comments', data);
  },


  


  // route /api/display

  addToDisplayPictures: function (data) {
    // console.log("api")
    // console.log(data)
    return axios.post("/api/display", data)
  },


  getAllDisplayPictures: function () {
    return axios.get("/api/display")
  },


  getSpecificUserDisplayPictures: function (userId) {
    return axios.get("/api/display/" + userId)
  },

  emptySpecificDisplayPictures: function (userId) {
    return axios.delete("/api/display/" + userId);
  },


  updateDisplayPicture: function (id, data) {
   
    return axios.put("/api/display/" + id, data)
  },

  // createManyDisplayPictures: function (data) {
  //   return axios.post("/api/display/many", data)
  // },

  createManyDisplayPictures: function (data) {
    return axios.post("/api/display/many", data)
  },




};

