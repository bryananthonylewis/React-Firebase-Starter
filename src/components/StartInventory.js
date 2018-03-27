import React, { Component } from "react";
import HeaderNav from "./HeaderNav";

class StartInventory extends Component {
  render() {
    console.log(this.props.user);
    if (this.props.user) {
      return (
        <div className="App">
          {this.props.user.email}
          <HeaderNav user={this.props.user} logout={this.props.logout} />
          <div className="center-align">
            <h1 className="app-title">Start Inventory</h1>
          </div>
        </div>
      );
    }
    return <div>{this.props.history.push("/")}</div>;
  }
}

export default StartInventory;
