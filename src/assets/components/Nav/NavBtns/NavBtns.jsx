import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBtns = () => {
  const loginBtn = useRef(null);
  const registerBtn = useRef(null);
  const location = useLocation();

  useEffect(() => {
    location.pathname == "/login" && loginBtn.current.click();
    location.pathname == "/register" && registerBtn.current.click();
  }, [location.pathname]);

  return (
    <>
      <li>
        <Link to={"/login"}>
          <span
            className="btn btn-success"
            id="spanLoginBtn"
            data-bs-toggle={"modal"}
            data-bs-target={"#loginModal"}
            ref={loginBtn}
          >
            Login
          </span>
        </Link>
      </li>
      <li>
        <Link to={"/register"}>
          <span
            className="btn btn-primary"
            id="spanRegisterBtn"
            data-bs-toggle={"modal"}
            data-bs-target={"#registerleModal"}
            ref={registerBtn}
          >
            Register
          </span>
        </Link>
      </li>
    </>
  );
};

export default NavBtns;
