import React from "react";
import "./voiture.css";
import AuthService from "./../ services/ auth.service";

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
            src="https://imgur.com/coPKq9l.png"
            height="35px"
            className="rounded-circle "
            width="45px"
          />
          <div className="m-1">{currentUser.username} </div>
          <a className=" p-2 border-left " onClick={logOut} href="/login">
            Déconnection{" "}
          </a>
        </div>
      ) : (
        <div className="out mr-4 bold d-flex align-items-center ">
          <a className=" p-2  " href="/login">
            S'identifier{" "}
          </a>
        </div>
      )}
    </div>
  );
}
