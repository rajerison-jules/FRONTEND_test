import React, { useState, useEffect } from "react";
import "./voiture.css";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineSend } from "react-icons/ai";
import axios from "./../axios";
import authHeader from "./../ services/auth-header";
export default function Voiture(props) {
  const [comments, setComments] = useState(false);
  const [text, setText] = useState();
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  var objDiv = document.getElementsByClassName(".bot");
  objDiv.scrollTop = objDiv.scrollHeight;
  function envoyer(el) {
    if (el) {
      axios
        .post(
          `api/voitures/coms`,
          {
            name: "test",
            value: el,
            voitureId: props.id,
            userId: props.user.id,
          },
          { headers: authHeader() }
        )
        .then((response) => {
          console.log(response.data);
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
  return (
    <div className="d-flex  justify-content-center mt-4">
      <div className=" container--perso row d-flex justify-content-center align-items-center rounded ">
        <div className=" col-4 col-md-2 p-1">
          <div
            className="image--container d-flex justify-content-center align-items-center "
            style={{ background: ` #ff${randomColor}` }}
          >
            <span className=" id--perso bold">{props.id}</span>
          </div>
        </div>
        <div className="litle--container col-4 d-flex justify-content-start align-items-center">
          <div>
            <span className="row text1 bold"> {props.mark}</span>

            <span className="row text2"> {props.detail}</span>
          </div>
        </div>
        <div className="litle--container col-4 d-flex justify-content-end align-items-center">
          {props.access ? (
            <lord-icon
              src="https://cdn.lordicon.com/nocovwne.json"
              trigger="click"
              colors="primary:#0466c8,secondary:#0466c8"
              style={{ width: "50px", height: "150px" }}
              onClick={() => {
                droit(comments);
              }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/nocovwne.json"
              trigger="click"
              colors="primary:#0466c8,secondary:#0466c8"
              style={{ width: "50px", height: "150px" }}
              onClick={() => {
                alert("Connecter vous pour commenter");
              }}
            ></lord-icon>
          )}
        </div>
        {comments ? (
          <div>
            {props.comment ? (
              <div className=" container--perso row   border  container--message bot ">
                {props.comment.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className="m-2 bp-2 w-100 d-flex justify-content-center   "
                    >
                      <div className="container--messageme m-2 row ">
                        {" "}
                        <p>{el.value}</p>{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <div className="container--perso row   border ">
              <div className="  p-2 w-100 d-flex justify-content-start  ">
                <form className=" m-1 row message--enter">
                  <div className=" col-10 d-flex justify-content-end align-items-center">
                    <TextareaAutosize
                      className=" pt-2 pl-2 pb-1"
                      onChange={(e) => getvalue(e)}
                      value={text}
                    />
                  </div>
                  <div
                    className=" col-2 d-flex justify-content-end align-items-center"
                    onClick={() => envoyer(text)}
                  >
                    <AiOutlineSend className="text-primary  " />
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
