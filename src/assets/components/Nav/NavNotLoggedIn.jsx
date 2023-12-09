import Avatar from "../Avatar/Avatar";
import NavBtns from "./NavBtns/NavBtns";

const NavLoggedIn = () => {
  return (
    <>
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Avatar
          profile_image="https://tarmeezacademy.com/images/profile-pics/3.png"
          username="Guest"
          theClass="navbar-brand"
          isLoggedIn={false}
        />
      </div>

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
      >
        <ul className="nav gap-3 flex-lg-row flex-column align-items-center fw-medium">
          <NavBtns />
        </ul>
      </div>
    </>
  );
};

export default NavLoggedIn;
