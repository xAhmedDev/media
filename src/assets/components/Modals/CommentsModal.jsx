import { useContext, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "../UX/Loader/Loader";
import { ContextProv } from "../../../App";
import Alert from "../UX/Alert/Alert";
import Comment from "../Comments/Comment";
import { GetComments } from "../Comments/GetComments";

const CommentsModal = () => {
  const { postId, setComments, setAlert, setCommentsCount, setPostId } =
    useContext(ContextProv);
  const commentVal = useRef(null);
  const [loader, setLoader] = useState(null);
  const token = localStorage.getItem("token");

  const handleCreateComment = () => {
    const body = {
      body: commentVal.current.value,
    };

    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/posts/${postId}/comments`,
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleComments(postId);
        setAlert(
          <Alert
            type="success"
            message="Your comment added successfully"
            isVisible={true}
          />
        );
        setLoader(null);

        setTimeout(() => {
          setAlert(
            <Alert
              type="success"
              message="Your comment added successfully"
              isVisible={false}
            />
          );
          const lastEl = document.querySelector(".last-comment");
          lastEl.scrollIntoView({ behavior: "smooth" });
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setAlert(
          <Alert type="error" message={error.message} isVisible={true} />
        );
        setTimeout(() => {
          setAlert(
            setAlert(
              <Alert type="error" message={error.message} isVisible={false} />
            )
          );
        }, 2000);
      });
  };

  const handleClick = () => {
    if (!commentVal.current.value.trim()) {
      return;
    }

    setLoader(<Loader />);

    if (token) {
      handleCreateComment();
    } else {
      setAlert(
        <Alert
          type="error"
          message="You must login to post comments"
          isVisible={true}
        />
      );
      setLoader(null);
    }

    setTimeout(() => {
      setAlert(
        <Alert
          type="error"
          message="You must login to post comments"
          isVisible={false}
        />
      );
    }, 2000);

    commentVal.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && commentVal.current.value.trim()) {
      handleClick();
    }
  };

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

  return (
    <>
      <div
        className="modal fade modal-xl mh-80"
        id="commentsModal"
        tabIndex="-1"
        aria-labelledby="commentsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="commentsModalLabel">
                Comments
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body overflow-auto" id="scroll-to-bottom">
              <Comment />
            </div>
            <div className="modal-footer">
              <input
                type="text"
                className="form-control"
                id="comment-input"
                placeholder="Add Your Comment..."
                ref={commentVal}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader}
    </>
  );
};

export default CommentsModal;
