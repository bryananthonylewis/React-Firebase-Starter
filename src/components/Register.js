import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import { ToastContainer, toast } from "react-toastify";
import HeaderNav from "./HeaderNav";

class Register extends Component {
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  errorToast = error => {
    toast.error(error);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  authenticate = provider => {
    // const authProvider = new firebase.auth.TwitterAuthProvider();
    // const authProvider = new firebase.auth.FacebookAuthProvider();
    // const authProvider = new firebase.auth.GithubAuthProvider();
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  register(e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const passConfirm = this.passwordConfirm.value;

    if (email && password === passConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          console.log(error);
          this.errorToast(error.message);
        });
    } else if (password !== passConfirm) {
      this.errorToast("Passwords do not match");
    } else if (!email) {
      this.errorToast("Please enter an email");
    }
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return err;
    }
    // console.log(authData);
    this.props.loginUser(authData.user);
  }

  render() {
    if (!this.props.user) {
      return (
        <div>
          <HeaderNav user={this.props.user} logout={this.props.logout} />
          <div className="login-container container">
            <div className="row">
              <div className="col s12">
                <form>
                  <div className="card">
                    <div className="card-content">
                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            name="email"
                            id="email"
                            type="email"
                            className="validate"
                            ref={input => (this.email = input)}
                          />
                          <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field col s12">
                          <input
                            name="password"
                            id="password"
                            type="password"
                            className="validate"
                            ref={input => (this.password = input)}
                          />
                          <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-field col s12">
                          <input
                            id="password-confirm"
                            type="password"
                            className="validate"
                            ref={input => (this.passwordConfirm = input)}
                          />
                          <label htmlFor="password-confirm">
                            Confirm Password
                          </label>
                        </div>

                        <div className="input-field col s12">
                          <button
                            className="btn waves-effect waves-light"
                            onClick={e => this.register(e)}
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-action center-align">
                      <a
                        className="waves-effect waves-light btn social facebook"
                        onClick={() => this.authenticate("Facebook")}
                      >
                        <i className="fa fa-facebook" /> Sign up with facebook
                      </a>

                      <a
                        className="waves-effect waves-light btn social twitter"
                        onClick={() => this.authenticate("Twitter")}
                      >
                        <i className="fa fa-twitter" /> Sign up with twitter
                      </a>

                      <a
                        className="waves-effect waves-light btn social google"
                        onClick={() => this.authenticate("Google")}
                      >
                        <i className="fa fa-google" /> Sign up with Google
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer
              toastClassName="warning-toast"
              position="top-right"
              type="default"
              autoClose={50000000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />
          </div>
        </div>
      );
    }
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location }
        }}
      />
    );
  }
}

export default Register;
