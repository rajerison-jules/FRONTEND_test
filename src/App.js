import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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

  return (
    <Router>
      {currentUser ? (
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/user" component={User} />
            <Route exact path="/" render={() => <Redirect to="/Home" />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      ) : (
        <div>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" render={() => <Redirect to="/Home" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signin" component={Signin} />
            <Route component={NotFound} />
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;
