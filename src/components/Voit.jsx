import React from "react";

import { AiOutlineSend } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import axios from "./../axios";
import authHeader from "./../ services/auth-header";
import AuthService from "../ services/ auth.service";
export default function Voit(props) {
  const [comments, setComments] = React.useState(false);
  const [faker, setFaker] = React.useState();
  const [text, setText] = React.useState();
  const [change, setChange] = React.useState("");
  const [state, setState] = React.useState();
  const messagesEndRef = React.useRef(null);
  const currentUser = AuthService.getCurrentUser();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick = () => {
    if (currentUser) {
      setChange("2");
    } else {
      alert("connecter vous d'abord");
    }
  };
  const close = () => {
    setChange("");
  };

  function envoyer(el) {
    if (el) {
      axios
        .post(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            name: "test",
            body: el,
            postId: props.id,
            email: "Hayden@althea.biz",
          },
          { headers: authHeader() }
        )
        .then((response) => {
          setState(faker.push(response.data));
        });
    } else {
      alert("erreur");
    }
    setText("");
  }
  const droit = (val) => {
    setComments(!val);
  };

  function getvalue(e) {
    setText(e.target.value);
  }
  React.useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${props.id}/comments`, {
        headers: authHeader(),
      })
      .then((response) => {
        setFaker(response.data);
      });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [state]);
  return (
    <div className={`principal${change}`}>
      <div onClick={close} className="fa-time">
        <i className="fas fa-times"></i>
      </div>
      <div className={`containerVoit${change}`} onClick={handleClick}>
        <div className="headVoit">
          <div className="textV">
            <h1 className="titre h5">{props.mark}</h1>
            <span className="stitre">Annee : {props.detail}</span>
          </div>
        </div>
        <div className={`contentVoit${change}`}>
          <div className="mode1">
            <h6>description</h6>
            <p>{props.description}</p>
          </div>
          <div className="mode2 d-flex flex-column">
            <div className="messageVoit">
              {faker &&
                faker.map((el) => {
                  return (
                    <div className="mess">
                      <p>{el.body}</p>
                    </div>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>
            <div>
              <div className="textA mt-5 align-items-center">
                <TextareaAutosize
                  className=" pt-2 pl-2 pb-1 textArea"
                  maxRows="4"
                  onChange={(e) => getvalue(e)}
                  value={text}
                />
                <div
                  className=" col-2 d-flex justify-content-end align-items-center"
                  onClick={() => envoyer(text)}
                >
                  <AiOutlineSend className="text-primary  h1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
