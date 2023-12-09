import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextProv } from "../../../App";
import { Loader } from "../UX/Loader/Loader";
import Alert from "../UX/Alert/Alert";

const LoginModal = () => {
  const { setAlert, setLogout } = useContext(ContextProv);
  const [loader, setLoader] = useState(null);
  const username = useRef(null);
  const password = useRef(null);
  const closeBtn = useRef(null);
  const navigateTo = useNavigate();

  const handleLogin = () => {
    const body = {
      username: username.current.value,
      password: password.current.value,
    };

    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/login`, body)
      .then((response) => {
        setLoader(null);
        setAlert(
          <Alert type="success" message="Login Successfully" isVisible={true} />
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setLogout(false);
        closeBtn.current.click();
        navigateTo("/home");

        setTimeout(() => {
          setAlert(
            <Alert
              type="success"
              message="Login Successfully"
              isVisible={false}
            />
          );
        }, 2000);
      })
      .catch((error) => {
        setAlert(
          <Alert
            type="error"
            message={error.response.data.message}
            isVisible={true}
          />
        );
        setLoader(false);

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
    if (!username.current.value.trim() || !password.current.value.trim()) {
      return;
    }

    setLoader(<Loader />);
    handleLogin();
    username.current.value = "";
    password.current.value = "";
  };

  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Login Page</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    ref={username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    ref={password}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeBtn}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {loader}
    </>
  );
};

export default LoginModal;
