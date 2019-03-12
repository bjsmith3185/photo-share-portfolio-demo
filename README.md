# PS-deployed-aws-practice

This app is in github repo: photo-share-aws
This app is deployed to:  https://photoshare-aws-practice.herokuapp.com/ 

The heroku deployed link is https://photoshare-aws-practice.herokuapp.com/   ,

Technologies used:
    HTML, CSS, React.js, JavaScript, Node.js, Express.js, MongoDB, AWS-s3, redis, nodemailer, GitHub, Heroku.

This app allows users to upload and share photos.

2 types of accounts: User or Administrator

User:
    * view all photos
    * save photos to their favorites
    * comment on any photo
    * update their user data
    * change their password

Administrator:
    * do all the above features plus
    * add new users
        (enter a new users name and email, the app will send the new user an email with their username and password)
    * view current online users
    * update any users data
    * remove pictures
    * delete a user


This app currently uses auth that was created from scratch using mongodb.
    - the default password is 123456 when a user is created
    - each user is encouraged to change this password asap
    - the password and email are checked against those stored in the database 
        - if incorrectly entered the user will be prompted to try again
    - if the user forgets their password they will be given a security question to answer
        - if the question is answered incorrectly more than 2 times, an email is sent with the password
        - if the user correctly answers the security question they are signed into the app


Only a user classified as Admin can add new users
    - the admin enters a new users 1) full name  2) email
    - the app will email the new user their login information and a link to the site


This app uses mongodb, redis and AWS-s3 for storage
    - picture data is stored in a s3 bucket on AWS
        - that picture's key is then stored in a picture collection in MongoDB
    - cache is stored using redis

    - the following collections are stored using MongoDB, MLab
        - a collection stores picture data (key to AWS-s3, name, notes, date)
        - a collection stores user data (name, id, email, favorites, date)
        - a colleciton stores comments for photos (comments, user_id, date)
        - a collection stores a 'template' used to display each picture
            ( this template allows each picture box to display a red heart if that specific user has saved it as a favorite)  


future plans:
 
    - fix the rotate image button...

BJS