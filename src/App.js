import React, { Component } from "react";
import HeaderNav from "./components/HeaderNav";
import LandingPage from "./components/LandingPage";
import { Link } from "react-router-dom";

class App extends Component {
  startInventory = e => {
    e.preventDefault();
  };

  render() {
    if (this.props.user) {
      return (
        <div className="App">
          {this.props.user.email}
          <HeaderNav user={this.props.user} logout={this.props.logout} />
          <div className="center-align">
            <h1 className="app-title">Welcome to AIM</h1>

            <Link to="/start-inventory">Start New Inventory</Link>
          </div>
        </div>
      );
    }
    return (
      <div>
        <HeaderNav user={this.props.user} logout={this.props.logout} />
        <LandingPage />
      </div>
    );
  }
}

export default App;
