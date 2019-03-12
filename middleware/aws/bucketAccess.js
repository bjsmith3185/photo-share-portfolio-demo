const AWS = require('aws-sdk');
require('dotenv').load();

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  })


module.exports = {

    uploadPicture: function (file, key) {

      let params = {
        Body: file,
        Bucket: process.env.S3_BUCKET,
        Key: key 
      }

      return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
          resolve(data);
        })
      })
    },
  
    deleteAWSpicture: function (awsKey) {

        s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: awsKey,
        },
        (err, data) => {
            if(err) console.log(err);
            else console.log("delete", data)
        })
    },
    

    emptyBucket: function () {

        var params = {
          Bucket: provess.env.S3_BUCKET,
        };
      
        s3.listObjects(params, function(err, data) {
          if (err) console.log(err);
      
          if (data.Contents.length == 0) return;
      
          params = {Bucket: bucketName};
          params.Delete = {Objects:[]};
      
          data.Contents.forEach(function(content) {
            params.Delete.Objects.push({Key: content.Key});
          });
      
          s3.deleteObjects(params, function(err, data) {
            if (err) console.log(err);

          });
        });
    }


}

  




