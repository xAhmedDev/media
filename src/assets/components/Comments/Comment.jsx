import React, { useContext } from "react";
import { ContextProv } from "../../../App";

const Comment = () => {
  const { comments } = useContext(ContextProv);

  const getCommentTime = (time) => {
    const now_utc = new Date(time.slice(0, -4));

    return now_utc.toUTCString().slice(0, 16);
  };

  return (
    <>
      {comments.length === 0 ? (
        <div className="card-body comment mb-5">No Comments Yet</div>
      ) : (
        comments.map((comment, index) => {
          return (
            <div className="card comment-card mb-5" key={comment.id}>
              <div className="avatar-container">
                <div className={`userInfo d-flex align-items-center p-2`}>
                  <a
                    href="/profile"
                    className="text-decoration-none bg-transparent d-flex align-items-center gap-2"
                  >
                    <img
                      className="rounded-circle border border-secondary"
                      src={
                        Object.keys(comment.author.profile_image).length !== 0
                          ? comment.author.profile_image
                          : "https://tarmeezacademy.com/images/profile-pics/3.png"
                      }
                      alt="user avatar"
                      width={40}
                      height={40}
                    />
                    <div className="d-flex justfiy-content-center flex-column gap-1 ms-2">
                      <span className="fs-5 text-black ms-1">
                        {comment.author.username}
                      </span>
                      <span className="post-time ms-1">
                        {getCommentTime(comment.author.created_at)}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className={`card-body p-0 comment ${
                  index === comments.length - 1 ? "last-comment" : ""
                }`}
              >
                <div className="comment-content">
                  <p className="card-text ps-4 py-2 pe-2 text-secondary">
                    {comment.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Comment;
