const client = require("./redisConnection");

module.exports = {
  clear: function(user_id) {
    return new Promise((resolve, reject) => {
      // Create a key to remove user id
      let keyUser = user_id.toString();

      // clear user cache
      client.del(keyUser, function(err, response) {
        if (response == 1) {
          console.log("delete user cache");
          //   resolve(response);
        } else {
          console.log("did not delete user cache");
        }

        resolve(response);
      });
    });
  }
};
