import React, { Component } from 'react';
import API from '../../utils/API';
import "./SignIn.css";
import * as ROUTES from '../../constants/routes';
import Navigation from '../../components/Navigation';
import ForgotPassword from '../../components/ForgotPassword'
import AnswerSecretQuestion from '../../components/AnswerSecretQuestion';



class SignIn extends Component {


  state = {
    adminTrue: false,
    _id: "",
    name: "",
    email: "",
    password: "",
    unsuccessful: false,

    showLogInForm: true,
    showForgotPasswordLink: true,
    showForgotPassword: false,
    showSecretQuestionForm: false,
    showEmailPasswordForm: false,
    showAnswerSecretQuestion: false,
    showWrongAnswerMsg: false,


    forgotEmail: "",
    secretQuestion: "",
    secretAnswer: "",
    usersAnswer: "",
    count: 0,

    value: "",
    questions: [],

  };

  componentDidMount() {
    sessionStorage.clear();
  }

  demo = () => {
    this.setState({
      email: "",
      password: "",
      name: ""

    })
    this.setState({
      email: "brian@mail.com",
      password: "123456"
    })
  }

  login = (event) => {
    console.log("logging in to app")
    sessionStorage.clear();
    event.preventDefault();
    this.setState({
      password: "",
    })

    let data = {
      password: this.state.password.toString()
    }

    API.login(this.state.email.toLowerCase(), data)
      .then(res => {

        if (res.data === null) {
          this.setState({
            unsuccessful: true
          })
        } else {

          sessionStorage.setItem("_id", res.data._id);
          if (res.data.secretQuestionCompleted === false) {
            this.setState({
              unsuccessful: false,
              showAnswerSecretQuestion: true,
              name: res.data.name,

            })

            // function to get the secret questions array
            API.getSecretQuestions()
              .then(res => {
                this.setState({
                  questions: res.data,
                  value: res.data[0],
                })
              })
              .catch(err => console.log(err));
          } else {
            this.pageRedirect();
          }
        }
      })
      .catch(err => console.log(err));
  };


  pageRedirect = () => {
    this.props.history.push(ROUTES.HOME);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value.trim() });
  };

  viewForgotPassword = () => {
    this.setState({
      showForgotPassword: true,
      showForgotPasswordLink: false,
      showLogInForm: false,
    })
  }

  viewSignInForm = () => {
    this.setState({
      showForgotPassword: false,
      showForgotPasswordLink: true,
      showLogInForm: true,
    })
  };

  submitEmail = (event) => {
    event.preventDefault();

    API.getUserByEmail(this.state.forgotEmail)
      .then(res => {

        if (res.data === null) {
          console.log("does not match")
          this.welcomePage();


        } else {
          this.setState({
            showSecretQuestionForm: true,
            secretAnswer: res.data.secretAnswer,
            secretQuestion: res.data.secretQuestion,
            _id: res.data._id,
            email: res.data.email,
            password: res.data.password,
            name: res.data.name,
          })
        }
      })
      .catch(err => console.log(err));
  };

  submitAnswer = (event) => {
    event.preventDefault();

    if (this.state.usersAnswer.toLowerCase() === this.state.secretAnswer.toLowerCase()) {
      // log user into app......
      sessionStorage.setItem("_id", this.state._id);
      let data = {
        password: this.state.password.toString()
      }
      API.login(this.state.email.toLowerCase(), data)
        .then(res => {
          this.pageRedirect();
        })
        .catch(err => console.log(err));


    } else {
      console.log("wrong answer")
      if (this.state.count < 1) {
        this.setState({
          usersAnswer: "",
          count: this.state.count + 1,
          showWrongAnswerMsg: true,
        })
      } else {
        console.log("too many tries")

        // function to email user their password
        let data = {
          password: this.state.password,
          email: this.state.email
        }

        // !!!!!!!!!!!!!!!!!!!!1
        API.emailSinglePassword(data)
        .then(res => {
          setTimeout(this.welcomePage, 5000);
        })
        .catch(err => console.log(err));


        this.setState({
          usersAnswer: "",
          showEmailPasswordForm: true,
          showWrongAnswerMsg: false,
        })
      }
    }
  };

  welcomePage = () => {
    this.props.history.push(ROUTES.LANDING);
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value.trim().toLowerCase() });
  };

  submitQuestionAndAnswer = (event) => {
    event.preventDefault();
    let data = {
      secretQuestion: this.state.value,
      secretAnswer: this.state.userAnswer,
      secretQuestionCompleted: true,
    }

    API.updateUser(this.state.name, data)
      .then(res => {
        this.pageRedirect();
      })
      .catch(err => console.log(err));
  };


  render = () => {

    return (

      <div>

        <Navigation />


        <div className="signin-secretQuestion text-center">

          {this.state.showAnswerSecretQuestion ? (
            <div>

              <AnswerSecretQuestion
                value={this.state.value}
                questions={this.state.questions}
                submitQuestionAndAnswer={this.submitQuestionAndAnswer}
                handleChange={this.handleChange}
                usersAnswer={this.state.usersAnswer}
                onChange={this.onChange}

              />

            </div>
          ) : (
              <div>

                {this.state.showLogInForm ? (

                  <div>

                    <div className="signin-title-area text-center">
                      <span className="signin-title text-center">Sign In</span> <span className="signin-help-btn" onClick={this.demo}>Demo Login</span></div>

                    {this.state.unsuccessful ? (
                      <div className="login-incorrect text-center">Incorrect Login Attempt, Try Again</div>
                    ) : (

                        <div className="login-text text-center">Enter you information Below</div>
                      )}


                    <form className="login-form text-center">
                      <input className="login-form-input"
                        value={this.state.email}
                        name="email"
                        onChange={this.onChange}
                        type="text"
                        placeholder="email"
                      />
                      <br />
                      <input className="login-form-input2"
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                        type="password"
                        placeholder="password"
                      />
                      <br />
                      <button className="form-btn btn btn-info" onClick={this.login}>LogIn</button>

                    </form>


                  </div>

                ) : (
                    <div></div>
                  )}
                <div className="signin-fgt-area">
                  <ForgotPassword
                    viewForgotPassword={this.viewForgotPassword}
                    showForgotPasswordLink={this.state.showForgotPasswordLink}
                    forgotEmail={this.state.forgotEmail}
                    onChange={this.onChange}
                    viewSignInForm={this.viewSignInForm}
                    submitEmail={this.submitEmail}
                    secretQuestion={this.state.secretQuestion}
                    submitAnswer={this.submitAnswer}
                    secretAnswer={this.state.secretAnswer}
                    usersAnswer={this.state.usersAnswer}
                    showSecretQuestionForm={this.state.showSecretQuestionForm}
                    showEmailPasswordForm={this.state.showEmailPasswordForm}
                    welcomePage={this.welcomePage}
                    showWrongAnswerMsg={this.state.showWrongAnswerMsg}
                  />
                </div>

              </div>
            )}





        </div>
      </div>
    )
  };
};









export default SignIn;