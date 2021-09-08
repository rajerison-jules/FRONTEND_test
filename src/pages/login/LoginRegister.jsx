import React, { useState, useRef, useContext } from "react";
import "./style.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./../../ services/ auth.service";
import "./login.css";
import voiture from "./../../asset/images/voiture.svg";
import image1 from "./../../asset/images/image1.svg";
import SignIn from "./../../components/login/Signin";
import { Context } from "./../../Context";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger message--perso" role="alert">
        Ce champ est requis!
      </div>
    );
  }
};

export default function LoginRegister(props) {
  const [context, setContext] = useContext(Context);
  const [mode, setMode] = useState("sign-in-mode");
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const modeSetup = () => {
    setMode("sign-up-mode");
  };
  const modeRem = () => {
    setMode("");
  };
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
      if (username == context.username && password == context.password) {
        props.history.push("/user");
        window.location.reload();
        localStorage.setItem("user", JSON.stringify(context));
      } else {
        alert("motDepasse ou Username faux");
      }
    } else {
      setLoading(false);
    }
  };
  console.log(context);
  return (
    <div className={`containers  p-0 w-100 ${mode}`}>
      <div className="forms-containers">
        <div className="signin-signup">
          <Form
            onSubmit={handleLogin}
            ref={form}
            action="#"
            className="sign-in-form"
          >
            <h2 className="title">S'identifier</h2>
            <div className="input-field d-flex align-items-center justify-content-between ">
              <i className="fas fa-user ml-4"></i>
              <Input
                type="text"
                placeholder="Nom d'itilisateur"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="input-field d-flex align-items-center justify-content-between">
              <i className="fas fa-lock ml-4"></i>
              <Input
                placeholder="Mot de passe"
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
            <input type="submit" value="Connexion" className="btn solid" />
            <p className="social-text">
              Ou Connectez-vous avec les plateformes sociales
            </p>
            <div className="social-media">
              <a
                href="https://facebook.com"
                target="_blank"
                className="social-icon"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="social-icon"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://mail.google.com"
                target="_blank"
                className="social-icon"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="social-icon"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
          <SignIn changeClass={(el) => setMode(el)} />
        </div>
      </div>

      <div className="panels-containers">
        <div className="panel left-panel">
          <div className="content">
            <h3>vous êtes nouveau?</h3>
            <p>
              Vous pouvez vous inscrire en appuyant sur le bouton en dessous!
            </p>
            <button
              className="btn transparent"
              onClick={modeSetup}
              id="sign-up-btn"
            >
              S'inscrire
            </button>
          </div>
          <img src={image1} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Vous avez deja un compte ?</h3>
            <p>
              Vous pouvez vous inscrire en appuyant sur le bouton en dessous!
            </p>
            <button
              className="btn transparent"
              onClick={modeRem}
              id="sign-in-btn"
            >
              Connexion
            </button>
          </div>
          <img src={voiture} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
