import { useContext, useRef, useState } from "react";
import { ContextProv } from "../../../App";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../UX/Alert/Alert";
import axios from "axios";
import { Loader } from "../UX/Loader/Loader";

const DeletePostModal = (props) => {
  const { setAlert, postId } = useContext(ContextProv);
  const navigateTo = useNavigate();
  const location = useLocation();
  const closeBtn = useRef(null);
  const [loader, setLoader] = useState(null);

  const deletePost = () => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/posts/${postId}`, {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      })

      .then(() => {
        navigateTo(location.pathname);
        setLoader(null);
        closeBtn.current.click();

        setAlert(
          <Alert
            type="success"
            message={`Post Deleted Successfully`}
            isVisible={true}
          />
        );

        setTimeout(() => {
          setAlert(
            <Alert
              type="success"
              message={`Post Deleted Successfully`}
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
            message={error.response.data.message}
            isVisible={true}
          />
        );

        setTimeout(() => {
          setAlert(
            <Alert
              type="error"
              message={error.response.data.message}
              isVisible={false}
            />
          );
        }, 3000);
      });
  };

  const handleDeletePost = () => {
    setLoader(<Loader />);
    deletePost();
  };

  return (
    <>
      <div
        className="modal fade"
        id="deletePostModal"
        tabIndex="-1"
        aria-labelledby="deletePostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deletePostModalLabel">
                Delete Post?
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
              You Are Sure You Want To Delete This Post?
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
                className="btn btn-danger"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader}
    </>
  );
};

export default DeletePostModal;
