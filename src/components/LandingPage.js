import React, { Component } from "react";
import "../stylesheets/LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <br />
          <h1 className="header center">Welcome to AIM!</h1>
          <div className="row center">
            <a className="btn waves-effect waves-light" href="/login">
              Get Started
            </a>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">format_list_bulleted</i>
                </h2>
                <h5 className="center light-blue-text">Quick</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">shopping_basket</i>
                </h2>
                <h5 className="center light-blue-text">Fast</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">phone_iphone</i>
                </h2>
                <h5 className="center light-blue-text">Easy</h5>
                {/* <p className="light">
                  Our Web App is made for mobile, so you'll have your grocery
                  list on-hand to check things off.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
