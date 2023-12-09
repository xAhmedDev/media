import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ContextProv } from "../../../App";
import AddPostBtn from "../UX/AddPostBtn/AddPostBtn";
import Card from "../Cards/Card";
import { Loader } from "../UX/Loader/Loader";
import Alert from "../UX/Alert/Alert";

const Profile = () => {
  const lastCardRef = useRef(null);
  const firstCardRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { setAlert } = useContext(ContextProv);

  const getUserInfo = (id) => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/users/${id}`)
      .then((response) => {
        setUserInfo(response.data.data);
      })
      .catch((error) => {
        setAlert(
          <Alert
            type={"error"}
            message={`${error.response.message}`}
            isVisible={true}
          />
        );
      });
  };

  const getUserPosts = (id) => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/users/${id}/posts`)
      .then((response) => {
        setUserPosts(response.data.data);
      })
      .catch((error) => {
        setAlert(
          <Alert
            type={"error"}
            message={`${error.response.message}`}
            isVisible={true}
          />
        );
      });
  };

  useEffect(() => {
    if (
      (location.search == "" || location.search == "?userID=me") &&
      userData != null
    ) {
      getUserInfo(userData.id);
      return;
    }
    location.search !== "" &&
      location.search !== "?userID=me" &&
      getUserInfo(location.search.slice(8));
  }, [location.search]);

  useEffect(() => {
    if (
      (location.search == "" || location.search == "?userID=me") &&
      userData != null
    ) {
      getUserPosts(userData.id);
      return;
    }

    location.search !== "" &&
      location.search !== "?userID=me" &&
      getUserPosts(location.search.slice(8));
  }, [location]);

  const profileImage = () => {
    return typeof userInfo.profile_image == "object"
      ? "https://tarmeezacademy.com/images/profile-pics/3.png"
      : userInfo.profile_image;
  };

  const scrollToFirstCard = () => {
    if (firstCardRef.current) {
      const cardTopOffset = firstCardRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      const cardHeight = firstCardRef.current.clientHeight;
      const scrollTo = cardTopOffset - (windowHeight - cardHeight) / 2;

      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {(location.search == "" || location.search == "?userID=me") &&
      !userData ? (
        <div
          className="must-login-alert alert alert-dark col-sm-12 col-md-8 align-self-center align-items-center justify-content-between d-flex "
          role="alert"
        >
          <h1 className="must-login-h2">You must Login</h1>
          <div>
            <Link
              to={"/login"}
              className="fs-3 text-success border border-success p-1 rounded me-3"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="fs-3 text-primary border border-primary p-1 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div className="col-sm-12 col-md-8 align-self-center ">
            <div className="card mb-3">
              <div className="row g-0 user-profile-card">
                <div className="col-md-4 user-profile-card-img">
                  <img
                    src={profileImage()}
                    className="img-fluid rounded-start h-100 w-100"
                    alt="profile image"
                  />
                </div>
                <div className="col-md-8 user-profile-card-info">
                  <div className="card-body h-100 d-flex flex-column gap-4">
                    <h1 className="card-title text-center">{userInfo.name}</h1>
                    <div className="user-info d-flex align-items-center flex-grow-1 justify-content-around fs-5">
                      <div>
                        {userInfo.email ? (
                          <p className="card-text text-body-secondary">
                            <b>Email:</b> {userInfo.email}
                          </p>
                        ) : null}
                        <p className="card-text text-body-secondary">
                          <b>Username: </b>
                          {userInfo.username}
                        </p>
                      </div>
                      <div>
                        <p className="card-text text-body-secondary">
                          <b>Comments: </b>
                          {userInfo.comments_count}
                        </p>
                        <p className="card-text text-body-secondary">
                          <b>Post: </b>
                          {userInfo.posts_count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {userInfo.posts_count !== 0 && (
            <h3
              className="align-self-center text-light p-3 border border-secondary-subtle my-4 posts-btn"
              type="button"
              onClick={scrollToFirstCard}
            >
              {localStorage.getItem("userData")
                ? userInfo.id == userData.id
                  ? "My"
                  : `(${userInfo.name})`
                : `(${userInfo.name})`}{" "}
              Posts <i className="fa-solid fa-arrow-down"></i>
            </h3>
          )}

          <div className="d-flex flex-column align-items-center w-100">
            {userPosts.length == 0 && userInfo.posts_count !== 0 ? (
              <Loader />
            ) : (
              userPosts
                .slice()
                .reverse()
                .map((post, index) => {
                  const isLastCard = index === userPosts.length - 1;
                  const isFirstCard = index === 0;

                  return (
                    <div
                      id={post.id}
                      key={post.id}
                      ref={
                        userPosts.length == 1
                          ? firstCardRef
                          : isLastCard
                          ? lastCardRef
                          : isFirstCard
                          ? firstCardRef
                          : null
                      }
                      className={`card col-sm-12 col-md-8 mt-2 mb-2 ${
                        isLastCard
                          ? "last-card"
                          : isFirstCard
                          ? "first-card"
                          : ""
                      }`}
                    >
                      <Card post={post} userData={userData} />
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}

      {(location.search == "" || location.search == "?userID=me") &&
        userData && <AddPostBtn />}
    </>
  );
};

export default Profile;
