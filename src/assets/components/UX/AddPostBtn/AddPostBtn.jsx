const AddPostBtn = () => {

  return (
    <div
      className="addPost btn btn-primary d-flex position-sticky justify-content-center align-items-center border rounded-circle"
      data-bs-toggle={'modal'}
      data-bs-target={'#createPostModal'}
      title="Add a New Post"
      style={{
        bottom: "100px",
        left: "100%",
        padding: "15px 15.5px",
        width: "fit-content",
        transform: "translateX(200%)",
      }}
    >
      <i className="fa-solid fa-plus fs-3 text-light"></i>
    </div>
  );
};

export default AddPostBtn;
