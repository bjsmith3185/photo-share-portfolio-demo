# photo_share_mongo_auth
Used previous version of photo_share but added an auth using mongobd instead of firebase_auth.

The heroku deployed link is  https://morning-garden-46388.herokuapp.com/

This app allows users to upload and share photos.

The administrator can create new account for a user by entering a name and email.
    - A user without admin rights can
        * view all photos
        * save photos to their favorites
        * comment on any photo
        * update their user data
        * change their password

    - A user with admin right can
        * do all the above features plus
        * add new users
        * view current online users
        * update any users data
        * remove pictures
        * delete a user

This app currently uses auth that was created from scratch using mongodb.
    - the default password is 123456 when a user is created
    - each user is encouraged to change this password asap
    - the password and email are checked against those stored in the database 
        - if incorrectly entered the user will be prompted to try again

This app also used mongodb for storage
    - a collection stores picture data
    - a collection stores user data
    - a colleciton stores comments for photos
    - a collection stores a 'template' used to display each picture
        ( this template allows individual users to see which pictures are their own favorites)


future plans:
    - store all picture data on AWS S3
    - use npm nodemailer to send new usere an email with the site url and password
    - I need to add some style and responsiveness to the UI!!!!!!
    - fix the rotate image button...

BJS