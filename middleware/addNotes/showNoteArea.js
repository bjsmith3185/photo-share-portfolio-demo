const displayPictures = require("../../controllers/displayPicturesController");

module.exports = {
  showNote: function(id, data) {
    return new Promise((resolve, reject) => {
      let picture_id = id;
      let user_id = data.userId;
      let boxValue;
      if (data.openTextBox) {
        boxValue = false;
      } else {
        boxValue = true;
      }

      let showArea = {
        openTextBox: boxValue
      };

      displayPictures
        .update(picture_id, showArea)
        .then(dbresults => {
          displayPictures
            .findByUser(user_id)
            .then(result => {
              resolve(result);
            })
            .catch(err => console.log((422).json(err)));
        })
        .catch(err => res.status(422).json(err));
    });
  }
};
