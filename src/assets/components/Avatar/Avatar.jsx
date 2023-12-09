import React from "react";
import { Link } from "react-router-dom";

const Avatar = (props) => {
  return (
    <div>
      <div
        className={`userInfo d-flex align-items-center p-2 ${props.avatarClass}`}
      >
        <Link
          to={
            props.isLoggedIn == true
              ? props.id ==
                (localStorage.getItem("userData") &&
                  JSON.parse(localStorage.getItem("userData")).id)
                ? `/profile?userID=me`
                : `/profile?userID=${props.id}`
              : "/home"
          }
          className="text-decoration-none bg-transparent d-flex align-items-center gap-2"
        >
          <img
            className="rounded-circle border border-secondary"
            src={props.profile_image}
            alt="User Avtar"
            width={40}
            height={40}
          />
          <span className="fs-5 text-black ms-1">{props.username}</span>
        </Link>
      </div>
    </div>
  );
};

export default Avatar;
