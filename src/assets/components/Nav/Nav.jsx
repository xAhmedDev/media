import { useContext, useEffect, useState } from "react";
import "./Nav.css";
import NavLoggedIn from "./NavLoggedIn";
import NavNotLoggedIn from "./NavNotLoggedIn";
import { useNavigate } from "react-router-dom";
import { Loader } from "../UX/Loader/Loader";
import Alert from "../UX/Alert/Alert";
import { ContextProv } from "../../../App";

const Nav = () => {
  const { logout, setAlert } = useContext(ContextProv);
  const [showLoader, setShowLoader] = useState(false);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    setShowLoader(true);
    setAlert(
      <Alert type="success" message="Logout Successfully" isVisible={true} />
    );

    setTimeout(() => {
      setAlert(
        <Alert type="success" message="Logout Successfully" isVisible={false} />
      );
      localStorage.clear();
      setShowLoader(false);
      navigateTo("/");
    }, 2000);
  };

  useEffect(() => {
    if (logout) {
      handleLogout();
    }
  }, [logout]);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="nav-info container-fluid col-sm-12 col-md-8 d-flex justify-content-between align-items-center shadow-lg p-2 mt-1 mb-3 rounded">
          {localStorage.getItem("token") ? <NavLoggedIn /> : <NavNotLoggedIn />}
        </div>
      </nav>
      {showLoader && <Loader />}
    </>
  );
};

export default Nav;
