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
    <div className="d-flex flex-column align-items-center  mt-4  ">
      <div className=" container--perso  d-flex justify-content-between align-items-center ">
        {/* <div className=" ">
          <div
            className="image--container d-flex justify-content- align-items-center "
            style={{ background: ` #ff${randomColor}` }}
          >
            <span className=" id--perso bold">{props.id}</span>
          </div>
        </div> */}
        <div className=" p-5  ">
          <div className="h1">{props.mark}</div>
          <div>{props.detail}</div>
        </div>
        <div className="litle--container  d-flex justify-content-end align-items-center">
          {props.access ? (
            <lord-icon
              src="https://cdn.lordicon.com/nocovwne.json"
              trigger="click"
              colors="primary:#f25c54,secondary:#f25c54"
              style={{ width: "50px", height: "150px" }}
              onClick={() => {
                droit(comments);
              }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/nocovwne.json"
              trigger="click"
              colors="primary:#f25c54,secondary:#f25c54"
              style={{ width: "50px", height: "150px" }}
              onClick={() => {
                alert("Connecter vous pour commenter");
              }}
            ></lord-icon>
          )}
        </div>
        <div>
          <div className=" container--perso row   border  container--message bot ">
            <div className="m-2 bp-2 w-100 d-flex justify-content-center   ">
              <div className=" m-2 row ">
                {" "}
                <p>dernier comentaire: </p>{" "}
              </div>
            </div>
          </div>

          <div className="container--perso row   border  style--bg">
            <div className="  p-2 w-100 d-flex justify-content-start  ">
              <form className=" m-1 row message--enter">
                <div className=" col-10 d-flex justify-content-end align-items-center">
                  ok bebe
                </div>
                <div
                  className=" col-2 d-flex justify-content-end align-items-center"
                  onClick={() => envoyer(text)}
                ></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
