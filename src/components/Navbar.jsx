import React from "react";
import "./voiture.css";
import AuthService from "./../ services/ auth.service";
import logo from "./../asset/images/myLogo.png";
export default function Navbar() {
  const currentUser = AuthService.getCurrentUser();
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div className="navbar--perso overflow-hidden">
      {currentUser ? (
        <div className="out mr-4 bold d-flex align-items-center ">
          <img
            src={logo}
            height="45px"
            className="rounded-circle "
            width="auto"
          />
          <div className="m-1 h5">{currentUser.username} </div>
          <a
            className=" p-2 border-left deconnect"
            onClick={logOut}
            href="/login"
          >
            Déconnection{" "}
          </a>
        </div>
      ) : (
        <div className="out mr-4 bold d-flex align-items-center ">
          <a className=" p-2  h5" href="/login">
            S'identifier{" "}
          </a>
        </div>
      )}
    </div>
  );
}
