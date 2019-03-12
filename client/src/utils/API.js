import axios from "axios";


export default {

  // =========== route /populate/....

  populateUser: function () {
    return axios.post("/api/populate/reset/users");
  },

  deleteAllPictures: function () {
    return axios.delete('/api/populate/reset/pictures')
  },

  deleteAllComments: function () {
    return axios.delete('/api/populate/reset/comments');
  },

 
  // =========== route /system/....

  getdisplayPicturesAll: function (id) {
     return axios.get("/api/system/displaypictures/all/" + id)
  },

  getdisplayPicturesFav: function (id) {
    return axios.get("/api/system/displaypictures/fav/" + id)
  },

  getSecretQuestions: function () {
    return axios.get('/system/questions')
 },

  // emailing user their forgotten password
  emailSinglePassword: function (data) {
    return axios.put("/system/password", data);
  },

  // =========== route /api/user/....

  getAllUsers: function () {
    return axios.get("/api/users");
  },

  getUser: function (_id) {
    return axios.get("/api/users/" + _id)
  },

  addUser: function (data) {
    return axios.post("/api/users/new", data);
  },

  updateUserById: function (id, data) {
    return axios.put("/api/users/id/" + id, data)
  },

  signOutUser: function (id) {
    return axios.put("/api/users/signout/" + id)
  },

  login: function (email, data) {
    return axios.put("/api/users/login/" + email, data)
  }, 

  updateUser: function (name, data) {
    return axios.put("/api/users/" + name, data)
  },

  addToFavorites: function (id, data) {
    return axios.put("/api/users/favorites/" + id, data);
  },

  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // this route is used to log in with email
  getUserByEmail: function (email) {
  return axios.get("/api/users/email/" + email)
},

  //------- is this necessary----
  updateUserByEmail: function (email, data) {
    return axios.put("/api/users/email/" + email, data)
  },
  //------------------------------------


  // ========= route /api/pictures

  removeOnePicture: function (id, data) {
    return axios.put('/api/pictures/deleteone/' + id , data)
  },

  getAllPictures: function () {
    return axios.get("/api/pictures");
  },

  removeAllPictures: function (id) {
    return axios.delete('/api/pictures/deleteall/' + id)
  },
  
  addPicture: function (id, data) {
    return axios.post('/api/pictures/'+ id, data)
  },


  // =========== route /api/comments

  addPictureNote: function (data) {
    return axios.post('/api/comments', data);
  },

  


  // ========== route /api/aws

  uploadImage: function (id, file) {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return axios.post("/api/aws/upload/" + id, formData, {
      onUploadProgress: progressEvent => {
        console.log("upload progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%")
      }
    })
  },


  uploadToAWS: function (url, file, type) {
    return axios.put(url, file, {
      headers: {
        'Content-Type': type
      }
    })
  },


  // ========== route /api/display

  updateDisplayPicture: function (id, data) {
    return axios.put("/api/display/" + id, data)
 },




};

