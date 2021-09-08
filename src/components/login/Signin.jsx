import React, { useState, useRef, useContext } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Context } from "./../../Context";
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
  const [context, setContext] = useContext(Context);
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
      setContext({
        ...context,
        username: username,
        password: password,
        email: email,
      });
      props.changeClass("sign-in-mode");
    }
  };
  console.log(context);
  return (
    <Form onSubmit={handleRegister} ref={form} className="sign-up-form">
      <h2 className="title">Inscription</h2>
      <div className="input-field d-flex align-items-center justify-content-between">
        <i className="fas fa-user ml-4"></i>
        <Input
          type="text"
          placeholder="Nom d'itilisateur"
          name="username"
          value={username}
          onChange={onChangeUsername}
          validations={[required, vusername]}
        />
      </div>
      <div className="input-field d-flex align-items-center justify-content-between">
        <i className="fas fa-envelope ml-4"></i>
        <Input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
          validations={[required, validEmail]}
        />
      </div>
      <div className="input-field d-flex align-items-center justify-content-between">
        <i className="fas fa-lock ml-4"></i>
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
          validations={[required, vpassword]}
        />
      </div>
      <input type="submit" className="btn" value="S'inscrire" />
      <p className="social-text">
        Ou Connectez-vous avec les plateformes sociales
      </p>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://mail.google.com"
          target="_blank"
          className="social-icon"
        >
          <i className="fab fa-google"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" className="social-icon">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
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
    </Form>
  );
}
