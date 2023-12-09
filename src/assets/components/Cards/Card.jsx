import React, { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import { ContextProv } from "../../../App";
import { GetComments } from "../Comments/GetComments";
import axios from "axios";

const Card = (props) => {
  const {
    setComments,
    setPostId,
    setCommentsCount,
    commentsCount,
    setPostData,
  } = useContext(ContextProv);

  const handleComments = async (id) => {
    setPostId(id);
    GetComments(id, setComments);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`
      );
      const comments = response.data.data.comments;

      setCommentsCount((prevCounts) => ({
        ...prevCounts,
        [id]: comments.length,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getPost = (id) => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`)
      .then((response) => {
        setPostData({
          id: response.data.data.id,
          title: response.data.data.title,
          body: response.data.data.body,
          image: response.data.data.image,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePost = (id) => {
    setPostId(id);
    getPost(id);
  };

  const deletePost = (id) => {
    setPostId(id);
  };

  return (
    <>
      <div className="p-1 d-flex">
        <div className="flex-grow-1">
          <div>
            <Avatar
              avatarClass="card-header"
              profile_image={
                Object.keys(props.post.author.profile_image).length !== 0
                  ? props.post.author.profile_image
                  : "https://tarmeezacademy.com/images/profile-pics/3.png"
              }
              username={props.post.author.username}
              id={props.post.author.id}
              isLoggedIn={true}
            />
          </div>

          <span className=" post-time">{props.post.created_at}</span>
        </div>

        {props.userData
          ? props.userData.id == props.post.author.id && (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => {
                      updatePost(props.post.id);
                    }}
                  >
                    <button
                      className={`dropdown-item bg-info updatePostBtn-${props.post.id}`}
                      data-bs-toggle={"modal"}
                      data-bs-target={"#updatePostModal"}
                    >
                      Edit
                    </button>
                  </li>
                  <li
                    onClick={() => {
                      deletePost(props.post.id);
                    }}
                  >
                    <button
                      className={`dropdown-item bg-danger deletePostBtn-${props.post.id}`}
                      data-bs-toggle={"modal"}
                      data-bs-target={"#deletePostModal"}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )
          : null}
      </div>
      <div className="card-body">
        <div className="mb-4">
          {props.post.image.length ? (
            <img
              className="card-img-top post-image"
              src={props.post.image}
              alt="post image"
              loading="lazy"
            />
          ) : null}
        </div>
        <h2 className="card-title fs-4 fw-bold">
          {props.post.title ? props.post.title : ""}
        </h2>
        <p className="card-text text-secondary fw-md-medium p-2">
          {props.post.body}
        </p>
        <hr />
        <div
          className={`comments-btn d-flex justify-content-center ${`post-${props.post.id}`}`}
          type="button"
          data-bs-toggle={"modal"}
          data-bs-target={"#commentsModal"}
          onClick={() => {
            handleComments(props.post.id);
          }}
        >
          <span className="fs-6 fw-medium text-black">
            <i className="fa-regular fa-comments"></i> (
            {commentsCount[props.post.id] !== undefined
              ? commentsCount[props.post.id]
              : props.post.comments_count}
            ) Comments
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
