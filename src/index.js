import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "firebase";
import App from "./App";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import StartInventory from "./components/StartInventory";

class Root extends Component {
  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      user: null
    };
  }

  loginUser(user) {
    console.log(user);
    this.setState({ user });
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ user: null });
  };

  render() {
    return (
      <Router>
        <div>
          {/* Path to main app page */}
          <Route
            exact
            path="/"
            render={props => (
              <App user={this.state.user} logout={this.logout} />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LoginPage
                loginUser={this.loginUser}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={props => (
              <Register
                loginUser={this.loginUser}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/start-inventory"
            render={props => (
              <StartInventory
                loginUser={this.loginUser}
                logout={this.logout}
                user={this.state.user}
                {...props}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector("#root"));
registerServiceWorker();
