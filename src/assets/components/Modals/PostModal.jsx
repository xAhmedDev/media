import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Alert from "../UX/Alert/Alert";
import { Loader } from "../UX/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextProv } from "../../../App";
const PostModal = (props) => {
  const { setAlert, postData } = useContext(ContextProv);
  const closeBtn = useRef(null);
  const [loader, setLoader] = useState(null);
  const titleVal = useRef(null);
  const messageVal = useRef(null);
  const imgRef = useRef(null);
  const navigateTo = useNavigate();
  const location = useLocation();

  const createPostUrl = `${import.meta.env.VITE_APP_BASE_URL}/posts`;
  const updatePostUrl = `${import.meta.env.VITE_APP_BASE_URL}/posts/${
    postData.id
  }`;

  const handlePost = () => {
    let formData = new FormData();

    if (!imgRef.current.files[0]) {
      formData.append("title", titleVal.current.value);
      formData.append("body", messageVal.current.value);
      props.type === "update" && formData.append("_method", "put");
    } else {
      formData.append("title", titleVal.current.value);
      formData.append("body", messageVal.current.value);
      formData.append("image", imgRef.current.files[0]);
      props.type === "update" && formData.append("_method", "put");
    }

    axios
      .post(
        `${props.type === "create" ? createPostUrl : updatePostUrl}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then(() => {
        navigateTo(`${location.pathname}`);
        setLoader(null);
        closeBtn.current.click();
        props.type === "create" &&
          window.scrollTo({ top: 0, behavior: "smooth" });

        setAlert(
          <Alert
            type="success"
            message={`${
              props.type === "create"
                ? "Post Created Successfully"
                : "Post Updated Successfully"
            }`}
            isVisible={true}
          />
        );

        setTimeout(() => {
          setAlert(
            <Alert
              type="success"
              message={`${
                props.type === "create"
                  ? "Post Created Successfully"
                  : "Post Updated Successfully"
              }`}
              isVisible={false}
            />
          );
        }, 2000);
      })
      .catch((error) => {
        setLoader(null);
        setAlert(
          <Alert
            type="error"
            message={error ? error.response.data.message : ""}
            isVisible={true}
          />
        );

        setTimeout(() => {
          setAlert(
            <Alert
              type="error"
              message={error ? error.response.data.message : ""}
              isVisible={false}
            />
          );
        }, 3000);
      });
  };

  const handleCreatPost = () => {
    setLoader(<Loader />);

    if (!titleVal.current.value.trim() || !messageVal.current.value.trim()) {
      setLoader(null);
      setAlert(
        <Alert
          type="error"
          message="There Are Required Fields"
          isVisible={true}
        />
      );

      setTimeout(() => {
        setAlert(
          <Alert
            type="error"
            message="There Are Required Fields"
            isVisible={false}
          />
        );
      }, 2000);

      return;
    }

    if (imgRef.current.files[0]) {
      if (imgRef.current.files[0].size <= 2000000) {
        handlePost();
        messageVal.current.value = "";
        titleVal.current.value = "";
        imgRef.current.value = "";
      } else {
        setLoader(null);
        setAlert(
          <Alert
            type="error"
            message="The image size must not be greater 2MB"
            isVisible={true}
          />
        );

        setTimeout(() => {
          setAlert(
            <Alert
              type="error"
              message="The image size must not be greater 2MB"
              isVisible={false}
            />
          );
        }, 3000);
      }

      return;
    }

    handlePost();

    messageVal.current.value = "";
    titleVal.current.value = "";
    imgRef.current.value = "";
  };

  useEffect(() => {
    if (props.type !== "create") {
      titleVal.current.value = postData.title;
      messageVal.current.value = postData.body;
    }
  }, [postData]);

  return (
    <>
      <div
        className="modal fade"
        id={`${props.type}PostModal`}
        tabIndex="-1"
        aria-labelledby={`${props.type}PostModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="postModalLabel">
                {props.type === "create" ? "Create A New Post" : "Edit Post"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeBtn}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor={`post-title-${props.type}`}
                    className="col-form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`post-title-${props.type}`}
                    ref={titleVal}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor={`post-message-${props.type}`}
                    className="col-form-label"
                  >
                    Message
                  </label>
                  <textarea
                    className="form-control p-3"
                    id={`post-message-${props.type}`}
                    style={{ resize: "none" }}
                    placeholder={`What's on your mind, ${
                      localStorage.getItem("userData")
                        ? JSON.parse(localStorage.getItem("userData")).name
                        : ""
                    }?`}
                    ref={messageVal}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor={`formFile-${props.type}`}
                    className="col-form-label"
                  >
                    Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id={`formFile-${props.type}`}
                    ref={imgRef}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
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
                onClick={handleCreatPost}
              >
                {props.type === "create" ? "Create" : "Save Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader}
    </>
  );
};

export default PostModal;
