import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import HeaderNav from "./HeaderNav";
import "../stylesheets/LoginPage.css";

class LoginPage extends Component {
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

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

  register() {
    const email = this.email.value;
    const password = this.password.value;
    firebase
      .auth()
      .onAuthStateChanged()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      });
  }

  signIn(e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      });
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
                          <button
                            className="btn waves-effect waves-light"
                            onClick={e => this.signIn(e)}
                          >
                            Login
                            <i className="material-icons right">send</i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-action center-align">
                      <a
                        className="waves-effect waves-light btn center-align"
                        href="/register"
                      >
                        Sign Up
                      </a>

                      <a
                        className="waves-effect waves-light btn social facebook"
                        onClick={() => this.authenticate("Facebook")}
                      >
                        <i className="fa fa-facebook" /> Sign in with facebook
                      </a>

                      <a
                        className="waves-effect waves-light btn social twitter"
                        onClick={() => this.authenticate("Twitter")}
                      >
                        <i className="fa fa-twitter" /> Sign in with twitter
                      </a>

                      <a
                        className="waves-effect waves-light btn social google"
                        onClick={() => this.authenticate("Google")}
                      >
                        <i className="fa fa-google" /> Sign in with Google
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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

export default LoginPage;
