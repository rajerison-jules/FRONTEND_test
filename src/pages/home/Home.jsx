import React, { useState, useEffect, useRef } from "react";

import axios from "./../../axios";

import Modal from "react-bootstrap/Modal";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import "./user.css";

import Navbar from "./../../components/Navbar";
import Voit from "../../components/Voit";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="alert alert-danger modal--perso message--perso"
        role="alert"
      >
        Ce champ est requis!
      </div>
    );
  }
};
export default function Home(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setMark();
    setDetail();
  };
  const handleShow = () => setShow(true);
  const [voiture, setVoiture] = useState(null);
  const access = false;

  const form = useRef();
  const checkBtn = useRef();

  const [mark, setMark] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeMark = (e) => {
    const mark = e.target.value;
    setMark(mark);
  };
  const onChangeDetail = (e) => {
    const detail = e.target.value;
    setDetail(detail);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    form.current.validateAll();
    axios
      .get(
        `api/voitPubl`,
        {
          mark: mark,
          detail: detail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        props.history.push("/");
        window.location.reload();
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://my-json-server.typicode.com/rajerison-jules/databases_voitures/voiture`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setVoiture(response.data);
      });
  }, []);

  return (
    <div className="w-100 m-0">
      <Navbar />
      {/* <div className="d-flex justify-content-center align-items-center align-center row  imgBg w-100">
        <div className="text-white divTex col-6 d-flex justify-content-center align-items-center">
          <img width="500px" src={image2} />
        </div>
        <div className="text-white divTex col-6 d-flex justify-content-center align-items-center">
          <Button
            className="  d-flex align-items-center "
            variant="primary"
            onClick={handleShow}
          >
            <span>
              <VscAdd className="h6 m-1 d-flex d-flex justify-content-center " />
            </span>
            <span className="button--ajout">Ajouter Des Voitures </span>{" "}
          </Button>
        </div>
      </div> */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span className="modal--perso text-center"> Cree voiture</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} className="text-center">
            <label htmlFor="mark" className="label--perso">
              Marque du voiture
            </label>
            <Input
              type="text"
              className="form-control "
              name="mark"
              value={mark}
              onChange={onChangeMark}
              validations={[required]}
            />
            <br />
            <label htmlFor="mark" className="label--perso">
              Detail du voiture
            </label>
            <Input
              type="text"
              className="form-control "
              name="detail"
              value={detail}
              onChange={onChangeDetail}
              validations={[required]}
            />
            <br />
            <div className="btn btn-primary  btn-block" onClick={handleLogin}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Valider</span>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {message && (
            <div className="form-group modal--perso">
              <div className="alert alert-danger " role="alert">
                {message}
              </div>
            </div>
          )}
        </Modal.Footer>
      </Modal>
      <div></div>

      {voiture && (
        <div className="">
          <div className="d-flex flex-wrap justify-content-center">
            {voiture.map((el) => {
              return (
                <Voit
                  key={el.id}
                  mark={el.Name}
                  description={el.Description}
                  detail={el.Year}
                  access={access}
                  id={el.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
