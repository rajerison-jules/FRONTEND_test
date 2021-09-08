import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./login.css";

import AuthService from "./../../ services/ auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger message--perso" role="alert">
        Ce champ est requis!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ceci n'est pas un email valide.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit comporter entre 3 et 20 caractères.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit comporter entre 6 et 40 caractères.
      </div>
    );
  }
};
export default function Signin(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className=" d-flex align-items-center justify-content-center  border container--login ">
      <div className="form--login rounded ">
      <div >
        <div className="blobs">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 310 350"
          >
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
          </svg>
        </div>
        <div className="text-center text-secondary">
          <h4 className="titre--login">S'inscrire</h4>
        </div>
        <hr />
        <Form onSubmit={handleRegister} ref={form} className="text-center">
          {!successful && (
            <div>
              <Input
                type="text"
                className="form-control"
                placeholder="username"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
              <br />
              <Input
                type="text"
                className="form-control"
                name="email"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
              <br />
              <Input
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
              <br />
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
      </div>
    </div>
  );
}
