const client = require("./redisConnection");
const util = require("util");
client.get = util.promisify(client.get);

module.exports = {
  clearRedisCache: function(key) {
    return new Promise((resolve, reject) => {
      client.del(key.toString(), function(err, response) {
        if (response == 1) {
          console.log("delete cache");
          resolve(response);
        } else {
          console.log("did not delete cache");
          resolve(response);
        }
      });
    });
  }
};
