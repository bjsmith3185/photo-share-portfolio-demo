import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import API from '../../utils/API';
// import "./Pictures.css";

import Navigation from '../../components/Navigation';
import PictureList from '../../components/PictureList';
import PictureNavbar from '../../components/PictureNavbar';
import PictureUpload from '../../components/PictureUpload';
import PictureLightbox from '../../components/PictureLightbox';
import UserIdBar from '../../components/UserIdBar';
import ViewSlideshowNav from '../../components/ViewSlideshowNav';


class Pictures extends Component {

  state = {
    loggedIn: false,
    authUser: false,
    admin: false,

    displayPictures: [],

    noPics: true,
    isOpen: false,
    photoIndex: 0,

    name: "",
    email: "",
    _id: "",

    showAllPictures: false,
    viewUpload: false,
    showAllFavorites: false,

    files: "",

    rotation: 0,

    note: "",
    showNoteInput: false,

  };

  componentDidMount() {
    this.getUserInfo();
    this.checkIfUserExists();
    this.createDisplayPicturesAll();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signOut = () => {
    // console.log("signing out")
    let _id = sessionStorage.getItem("_id");
  
    API.signOutUser(_id)
    .then(res => {
      console.log("signed out")
    })
    .catch(error => {
      console.log(error)
    });
    sessionStorage.clear();
    this.props.history.push(ROUTES.LANDING);
  };

  checkIfUserExists = () => {
    let _id = sessionStorage.getItem("_id");

    API.getUser(_id)
      .then(res => {
        // console.log("users info")
        // console.log(res.data)

        if (res.data === null) {
          this.setState({
            loggedIn: false,
            authUser: false,
          })
        } else {
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("email", res.data.email);
          this.setState({
            loggedIn: res.data.loggedIn,
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
            authUser: true,
            admin: res.data.admin,
          })
        }
      })
      .catch(error => {
        console.log(error)
      });

  };

  getUserInfo = () => {

    let email = sessionStorage.getItem("email")
    let name = sessionStorage.getItem("name");
    let _id = sessionStorage.getItem("_id");
    // console.log(`setting user info: ${name}, ${email}, ${_id}`)
    this.setState({
      name: name,
      email: email,
      _id: _id,
    })
  };

  createDisplayPicturesAll = () => {
    let name = sessionStorage.getItem("name");
    let userId = sessionStorage.getItem("_id");
    // let name = this.state.name;
    // let userId = this.state._id;
    let all = [];
    let fav = [];


    API.emptySpecificDisplayPictures(userId)
      .then(res => {
        // console.log(`user display pictures emptied`)

        API.getAllPictures()
          .then(res => {
            // console.log("$$$$$$$$$$$$$ all pictures")
            // console.log(res.data)
            if (res.data.length === 0) {
              console.log("no pictures to display")
              return;
            }

            for (var i = 0; i < res.data.length; i++) {
              all.push(res.data[i]._id);
            }
            // console.log(all);
            //------------------------------
            API.getUserFavorites(name)
              .then(res => {
                fav = res.data.favorites;
                // console.log(fav.length)

                if (fav.length === 0) {
                  console.log("no favs saved for " + name)
                  let allPics = []
                  for (var g = 0; g < all.length; g++) {
                    let noFav = {
                      userId: userId,
                      picture: all[g],
                    }
                    allPics.push(noFav)
                    if (g === all.length - 1) {
                      API.createManyDisplayPictures(allPics)
                        .then(res => {
                          // console.log("@@@@@@@")
                          // console.log(res.data)
                          API.getSpecificUserDisplayPictures(userId)
                            .then(res => {
                              // console.log("getting pictures to display")
                              // console.log(res.data); // this is populated correctly

                              this.setState({
                                displayPictures: res.data,
                                showAllPictures: true,
                              })
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    }
                  }

                } else {
                  let mixedArray = [];

                  for (var i = 0; i < all.length; i++) {
                    let data = {
                      userId: userId,
                      picture: all[i],
                      showRed: false,
                    };

                    for (var k = 0; k < fav.length; k++) {

                      if (all[i] === fav[k]) {
                        data = {
                          userId: userId,
                          picture: all[i],
                          showRed: true,
                        }
                      }
                    }
                    mixedArray.push(data);
                    if (i === all.length - 1) {
                      API.createManyDisplayPictures(mixedArray)
                        .then(res => {
                          API.getSpecificUserDisplayPictures(userId)
                            .then(res => {
                              // console.log("getting pictures to display")
                              // console.log(res.data); // this is populated correctly

                              this.setState({
                                displayPictures: res.data,
                                showAllPictures: true,
                              })
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    }
                  }
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  createdisplayPicturesFav = () => {
    let name = sessionStorage.getItem("name");
    let userId = sessionStorage.getItem("_id");

    let fav = [];

    API.emptySpecificDisplayPictures(userId)
      .then(res => {
        // console.log(`user display pictures emptied`)
        // console.log(res.data)

        API.getUserFavorites(name)
          .then(res => {
            fav = res.data.favorites;
            // console.log("all favs")
            // console.log(fav)

            if (fav.length === 0) {
              console.log("no favs to show");

              this.setState({
                displayPictures: fav
              })

              return;
            }

            let allFavs = [];
            for (var g = 0; g < fav.length; g++) {
              let data = {
                userId: userId,
                picture: fav[g],
                showRed: true,
              }
              allFavs.push(data)
              if (g === fav.length - 1) {
                API.createManyDisplayPictures(allFavs)
                  .then(res => {
                    API.getSpecificUserDisplayPictures(userId)
                      .then(res => {
                        // console.log("getting pictures to display")
                        // console.log(res.data); // this is populated correctly
                        // this is correct above

                        this.setState({
                          displayPictures: res.data,
                        })
                      })
                      .catch(err => console.log(err));
                  })
              }
            }

          })
          .catch(err => console.log(err));


      })
      .catch(err => console.log(err));

  };


  viewAllPictures = () => {
    // console.log("clicked view all pics")
    this.createDisplayPicturesAll();

    if (this.state.showAllPictures === false) {
      this.setState({
        viewUpload: false,
        showAllFavorites: false,
        showAllPictures: true,
      })
    } else {
      this.setState({
        viewUpload: false,
        showAllFavorites: false,
        showAllPictures: true,
      })
    }
  };

  viewMyFavorites = () => {
    // console.log("clicked my favs")
    this.createdisplayPicturesFav();

    if (this.state.showAllFavorites === false) {
      this.setState({
        viewUpload: false,
        showAllFavorites: true,
        showAllPictures: false,
      })
    } else {
      this.setState({
        showAllFavorites: false,
        viewUpload: false,
        showAllPictures: true,
      })
    }
  };

  viewUpload = () => {
    if (this.state.viewUpload === false) {
      this.setState({
        viewUpload: true,
        showAllFavorites: false,
        showAllPictures: false,
      })
    } else {
      this.setState({
        viewUpload: false,
        showAllFavorites: false,
        showAllPictures: true,
      })
    }
  };


  viewSlideshow = () => {

    if (this.state.isOpen === true) {
      this.setState({
        isOpen: false,
        showAllPictures: true,
        viewUpload: false,
        showAllFavorites: false,
      })
    } else {
      this.setState({
        isOpen: true,
        showAllPictures: false,
        viewUpload: false,
        showAllFavorites: false,
      })
    }

  };


  next = () => {
    // console.log("hello")
    // console.log(this.state.displayPictures.length)
    let newIndex = this.state.photoIndex + 1;
    if (newIndex > (this.state.displayPictures.length - 1)) {
      newIndex = 0;
    }
    // console.log(newIndex)
    this.setState({
      photoIndex: newIndex
    })

  };

  back = () => {
    // console.log("hello")
    // console.log(this.state.displayPictures.length)
    let newIndex = this.state.photoIndex - 1;
    if (newIndex === -1) {
      newIndex = (this.state.displayPictures.length - 1)
    }

    // console.log(newIndex)
    this.setState({
      photoIndex: newIndex
    })

  };

  
  rotate = () => {
    let newRotation = this.state.rotation + 90;
    if (newRotation >= 360) {
      newRotation = - 360;
    }
    this.setState({
      rotation: newRotation,
    })
  };


  addToFavorites = (id, showRed, picture_id) => {
    // id=displaypicture._id, picture_id = picture_id
    let userId = sessionStorage.getItem("_id");
    // console.log("adding to fav")
    // console.log(id);
    // console.log(showRed)
    // console.log(picture_id)
    let updateHeart = {}

    if (showRed) {
      updateHeart = {
        showRed: false
      }
    } else {
      updateHeart = {
        showRed: true
      }
    }

    API.updateDisplayPicture(id, updateHeart)
      .then(res => {
        // console.log("is this updated")
        // console.log(res.data)
     
        API.getSpecificUserDisplayPictures(userId)
          .then(res => {
            // console.log("getting pictures to display")
            // console.log(res.data)
            this.setState({
              displayPictures: res.data,
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    let data = {
      favorites: picture_id
    }
    API.addToFavorites(this.state.name, data)
      .then(res => {
      })
      .catch(err => console.log(err));

  };

  viewPic = (id) => {
    console.log(id)
  }

  onSelect = (event) => {
    // console.log(event.target.files);

    this.setState({
      files: event.target.files
    })
  }

  uploadFiles = (event) => {
    event.preventDefault();

    API.uploadFiles(this.state.files[0])
      .then(res => {
        this.setState({
          viewUpload: false,
          showAllFavorites: false,
          showAllPictures: true,
        })
        this.createDisplayPicturesAll();

      })
      .catch(err => console.log(err));
  };

  seeNoteInput = (id, status) => {
    let userId = sessionStorage.getItem("_id");
    let newStatus = {};

    if (status) {
      newStatus = {
        openTextBox: false,
      }
    } else {
      newStatus = {
        openTextBox: true,
      }
    }

    API.updateDisplayPicture(id, newStatus)
      .then(res => {
        // console.log("return from openTextBox")
        API.getSpecificUserDisplayPictures(userId)
          .then(res => {
            // console.log("getting pictures to display")
            this.setState({
              displayPictures: res.data,
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  addNote = (picture_id, display_id) => {
    let userId = sessionStorage.getItem("_id");

    let data = {
      author: this.state._id,
      text: this.state.note,
      picture_id: picture_id,
    }

    let newStatus = {
      openTextBox: false,
    }

    API.addPictureNote(data)
      .then(res => {
        API.updateDisplayPicture(display_id, newStatus)
          .then(res => {

            API.getSpecificUserDisplayPictures(userId)
              .then(res => {
                // console.log("getting pictures to display")
                this.setState({
                  displayPictures: res.data,
                  note: "",
                })
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  };


  render = () => {

    // const { photoIndex, isOpen, allPictures } = this.state;

    return (

      <div>

        {this.state.loggedIn ? (
          <div>
            <Navigation
          authUser={this.state.authUser}
          admin={this.state.admin}
          signOut={this.signOut}
        />

            <UserIdBar name={this.state.name} />

            <br />
            <PictureNavbar
              allPictures={this.viewAllPictures}
              myFavorites={this.viewMyFavorites}
              viewUpload={this.viewUpload}

            />


            {
              this.state.viewUpload ? (
                <PictureUpload
                  onSelect={this.onSelect}
                  uploadFiles={this.uploadFiles}
                />
              ) : (<div></div>)
            }

            {
              this.state.showAllPictures ? (
                <div>
                  <ViewSlideshowNav
                    viewSlideshow={this.viewSlideshow}
                  />
                  <PictureList
                    pictures={this.state.displayPictures}
                    viewPic={this.viewPic}
                    addToFavorites={this.addToFavorites}

                    rotation={this.state.rotation}
                    rotate={this.rotate}

                    note={this.state.note}
                    onChange={this.onChange}
                    addNote={this.addNote}
                    seeNoteInput={this.seeNoteInput}
                    showNoteInput={this.state.showNoteInput}

                    viewSlideshow={this.viewSlideshow}

                  />
                </div>
              ) : (<div></div>)
            }

            {
              this.state.showAllFavorites ? (
                <div>
                  <ViewSlideshowNav
                    viewSlideshow={this.viewSlideshow}
                  />
                  <PictureList
                    pictures={this.state.displayPictures}
                    viewPic={this.viewPic}
                    addToFavorites={this.addToFavorites}

                    rotation={this.state.rotation}
                    rotate={this.rotate}

                    note={this.state.note}
                    onChange={this.onChange}
                    addNote={this.addNote}
                    seeNoteInput={this.seeNoteInput}
                    showNoteInput={this.state.showNoteInput}

                    viewSlideshow={this.viewSlideshow}
                  />
                </div>
              ) : (<div></div>)
            }

            {
              this.state.isOpen ? (

                <PictureLightbox
                  _id={this.state.displayPictures[this.state.photoIndex].picture._id}
                  image={this.state.displayPictures[this.state.photoIndex].picture.image}
                  name={this.state.displayPictures[this.state.photoIndex].picture.name}
                  next={this.next}
                  back={this.back}
                  viewSlideshow={this.viewSlideshow}

                />

              ) : (<div></div>)
            }



          </div>



        ) : (
            <div className="home-signin-link">
              <div> <Link to={ROUTES.SIGNIN}>Sign In</Link> </div >
            </div >
          )
        }




      </div >

    );
  };
};



export default Pictures;


