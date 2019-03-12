const users = require("../../controllers/usersController");
const clearCache = require("../redis/clearCache");
const cache = require("../redis/clearAllCache");

module.exports = {
  login: function(email, data) {
    return new Promise((resolve, reject) => {
      let active = {
        loggedIn: true
      };
      users.login(email, data, active).then(dbresults => {
        if (dbresults === null) {
          console.log("dbresults is null, no user found");
          return resolve(null);
        }

        // clear all cache 
       

        cache
          .clear(dbresults._id)
          .then(cleared => {
            // console.log("cache cleared");

            return resolve(dbresults);
          })
          .catch(err => console.log(err));

        //   clearCache.clearRedisCache(dbresults._id).then(clearcache => {
        //     console.log("cache for user cleared");

        //     return resolve(dbresults);
        //   });
        // })
        // .catch(err => console.log(err));
      });
    });
  }
};
