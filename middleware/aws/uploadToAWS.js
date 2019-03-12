const uuid = require('uuid/v1');
const upload = require('./bucketAccess')


module.exports = {
    addPictureToAWS: function (id, data) {
        return new Promise((resolve, reject) => {
            // console.log("inside addPicturetoAWS() middleware, line 10")
            // console.log(id)
            // console.log(data)
            let type = data.type;

            // need to add type to the end of this below
            let key = `${id}/${uuid()}.jpeg`;
            // console.log(key)
            
            upload.uploadPicture(data.file, key)

            .then(url => {
                // send back the key and the url
              resolve({ key, url });
            })
            .catch(err => console.log(err))
        })
    }
}






