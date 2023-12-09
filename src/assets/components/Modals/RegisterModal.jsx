import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../UX/Alert/Alert";
import { Loader } from "../UX/Loader/Loader";
import { ContextProv } from "../../../App";
const RegisterModal = () => {
  const { setAlert } = useContext(ContextProv);
  const [loader, setLoader] = useState(null);
  const username = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const repeatPassword = useRef(null);
  const closeBtn = useRef(null);
  const navigateTo = useNavigate();
  const [btnClicked, setBtnClicked] = useState(false);
  const [invalidRepeatPassword, setInvalidRepeatPassword] = useState(false);

  const handleRegister = () => {
    const body = {
      username: username.current.value,
      password: password.current.value,
      name: name.current.value,
      email: email.current.value,
    };

    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/register`, body)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));

        setLoader(null);
        setAlert(
          <Alert
            type="success"
            message="Registered Successfully"
            isVisible={true}
          />
        );

        closeBtn.current.click();
        navigateTo("/home");
        setLogout(false);

        setTimeout(() => {
          setAlert(
            <Alert
              type="success"
              message="Registered Successfully"
              isVisible={false}
            />
          );
        }, 2000);
      })
      .catch((error) => {
        setBtnClicked(true);
        setAlert(
          <Alert
            type="error"
            message={error.response.data.message}
            isVisible={true}
          />
        );
        setLoader(null);

        setTimeout(() => {
          setAlert(
            <Alert
              type="error"
              message={error.response.data.message}
              isVisible={false}
            />
          );
        }, 2000);
      });
  };

  const handleClick = () => {
    setLoader(<Loader />);

    if (
      !username.current.value.trim() ||
      !name.current.value.trim() ||
      !email.current.value.trim() ||
      !password.current.value.trim() ||
      !repeatPassword.current.value.trim()
    ) {
      setLoader(null);
      return;
    }

    if (invalidRepeatPassword) {
      setLoader(null);
      setAlert(
        <Alert
          type="error"
          message="Password and repeat password do not match"
          isVisible={true}
        />
      );
      setTimeout(() => {
        setAlert(
          <Alert
            type="error"
            message="Password and repeat password do not match"
            isVisible={false}
          />
        );
      }, 2000);
    } else {
      handleRegister();
    }

    username.current.value = "";
    password.current.value = "";
    repeatPassword.current.value = "";
    email.current.value = "";
    name.current.value = "";
  };

  const passwordComparison = () => {
    password.current.value !== repeatPassword.current.value
      ? setInvalidRepeatPassword(true)
      : setInvalidRepeatPassword(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="registerleModal"
        tabIndex="-1"
        aria-labelledby="registerleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Register Page</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeBtn}
              ></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "white" }}>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${btnClicked && "clicked"}`}
                    id="name"
                    ref={name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register_username" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${btnClicked && "clicked"}`}
                    id="register_username"
                    ref={username}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className={`form-control ${btnClicked && "clicked"}`}
                    id="email"
                    ref={email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register_password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control ${btnClicked && "clicked"}`}
                    id="register_password"
                    ref={password}
                    required
                    onChange={passwordComparison}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repeat_password" className="col-form-label">
                    Repeat Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      invalidRepeatPassword ? "invalidRepeatPassword" : ""
                    }`}
                    id="repeat_password"
                    ref={repeatPassword}
                    required
                    onChange={passwordComparison}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ backgroundColor: "white" }}>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader}
    </>
  );
};

export default RegisterModal;
