import React, { Component } from "react";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="container mt-25">
        <h1 className="blue m-100">
          <b>
            Welcome to Admin Panel. <br />
          </b>
        </h1>
        <h3>
          Select the section you want <b className="blue">from the menu</b>
        </h3>
      </div>
    );
  }
}

export default Home;
