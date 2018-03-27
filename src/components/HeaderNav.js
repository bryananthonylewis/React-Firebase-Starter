import React from "react";
import "../stylesheets/HeaderNav.css";

class AppBar extends React.Component {
  render() {
    function NavLinks(props) {
      if (props.user) {
        return (
          <div>
            <li>
              <a onClick={() => props.logout()}>Log Out</a>
            </li>
          </div>
        );
      }
      return (
        <div>
          <li>
            <a href="/register">Sign Up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </div>
      );
    }

    return (
      <div>
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              <i className="material-icons">computer</i>
              AIM
            </a>
            <button
              data-target="mobile-demo"
              className="sidenav-trigger hide-on-med-and-up"
            >
              <i className="material-icons">menu</i>
            </button>
            <ul className="right hide-on-small-only">
              <NavLinks logout={this.props.logout} user={this.props.user} />
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <NavLinks logout={this.props.logout} user={this.props.user} />
        </ul>
      </div>
    );
  }
}

export default AppBar;
