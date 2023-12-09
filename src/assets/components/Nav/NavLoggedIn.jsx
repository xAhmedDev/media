import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useContext, useEffect, useRef } from "react";
import { ContextProv } from "../../../App";

const NavLoggedIn = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { setLogout } = useContext(ContextProv);
  const homeRef = useRef(null);
  const navbarNav = useRef(null);
  const location = useLocation();
  const navigateTo = useNavigate();
  const handleLogout = () => {
    setLogout(true);
    navigateTo("/home");
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      homeRef.current.classList.add("active");
    } else {
      homeRef.current.classList.remove("active");
    }

    navbarNav.current.classList =
      "navbar-collapse justify-content-end collapse";
  }, [location.pathname]);

  return (
    <>
      {userData ? (
        <Avatar
          profile_image={
            Object.keys(userData.profile_image).length !== 0
              ? userData.profile_image
              : "https://tarmeezacademy.com/images/profile-pics/3.png"
          }
          username={userData.username}
          avatarClass="navbar-brand"
          isLoggedIn={true}
          id={JSON.parse(localStorage.getItem("userData")).id}
        />
      ) : (
        <Avatar
          profile_image="https://tarmeezacademy.com/images/profile-pics/3.png"
          username="Guest"
        />
      )}

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
        ref={navbarNav}
      >
        <ul className="nav gap-3 flex-lg-row flex-column align-items-center fw-medium">
          <li className="nav-item">
            <NavLink to={"/home"} className="nav-link text-dark" ref={homeRef}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/profile"} className="nav-link text-dark">
              Profile
            </NavLink>
          </li>

          <li>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavLoggedIn;
