const client = require("./redisConnection");

module.exports = {
  clear: function(user_id) {
    return new Promise((resolve, reject) => {
      // create a key that includes unique identifyer to remove all pifc / favs
      let keyPic = user_id.toString() + "/allPics";
      let keyFav = user_id.toString() + "/favPics";

      // clear all pic cache
      client.del(keyPic, function(err, response) {
        if (response == 1) {
          console.log("delete all pic cache");
        } else {
          console.log("did not delete all pic cache");
        }
        // clear all fav cache
        client.del(keyFav, function(err, response) {
          if (response == 1) {
            console.log("delete all fav cache");
          } else {
            console.log("did not delete fav cache");
          }
        });
        resolve(response);
      });
    });
  }
};
