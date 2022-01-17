import "antd/dist/antd.css";
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Contracts from "./components/contracts/Contracts";
import Home from "./components/home/home";
import Header from "./components/header/header";
import { Result } from "antd";
import Login from "./components/login/login";
import { getToken } from "./utilits";
import Prosses from "./components/prosses/Prosses";
import Params from "./components/params/Params";
import Schedulers from "./components/schedulers/Schedulers";

const App = () => {
  return (
    <div>
      <div className="app">
        <Router>
          {getToken() ? (
            <div>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/contracts">
                  <Contracts />
                </Route>
                <Route path="/process">
                  <Prosses />
                </Route>
                <Route path="/params">
                  <Params />
                </Route>
                <Route path="/schedulers">
                  <Schedulers />
                </Route>
                <Route>
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                  />
                  ,
                </Route>
              </Switch>
            </div>
          ) : (
            <div>
              <Login />
              <Redirect to="login" />
            </div>
          )}
        </Router>
      </div>
    </div>
  );
};

export default App;
