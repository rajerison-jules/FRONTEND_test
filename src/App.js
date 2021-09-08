import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Context } from "./Context.js";
import React, { useState } from "react";
// import "./App.css";
import Voiture from "./components/Voiture";
import Navbar from "./components/Navbar";
import Login from "./pages/login/LoginRegister";
import Signin from "./pages/login/Singnin";
import User from "./pages/home/User";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import AuthService from "./ services/ auth.service";

function App() {
  const currentUser = AuthService.getCurrentUser();
  const [context, setContext] = useState({
    username: "",
    password: "",
    email: "",
  });
  return (
    <Router>
      {currentUser ? (
        <div>
          <Context.Provider value={[context, setContext]}>
            <Switch>
              <Route exact path="/user" component={User} />
              <Route exact path="/" render={() => <Redirect to="/Home" />} />
              <Route component={NotFound} />
            </Switch>
          </Context.Provider>
        </div>
      ) : (
        <div>
          <Context.Provider value={[context, setContext]}>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/" render={() => <Redirect to="/Home" />} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signin" component={Signin} />
              <Route component={NotFound} />
            </Switch>
          </Context.Provider>
        </div>
      )}
    </Router>
  );
}

export default App;
