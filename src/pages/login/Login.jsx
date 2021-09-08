import React, { useState, useRef } from "react";
import "./login.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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
export default function Login(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/user");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className=" d-flex align-items-center justify-content-center  border container--login p-0 ">
      <div className="form--login rounded">
        <div>
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
            <h4 className="titre--login">Se connecter</h4>
          </div>
          <hr />
          <Form onSubmit={handleLogin} ref={form} className="text-center">
            <Input
              type="text"
              placeholder="username"
              className="form-control "
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
            <br />
            <Input
              placeholder="password"
              type="password"
              className="form-control "
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
            <br />
            <button className="btn btn-primary  btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger " role="alert">
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
