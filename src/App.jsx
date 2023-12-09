import { createContext, useState } from "react";
import "./App.css";
import Routers from "./assets/Routers/Routers";
import Nav from "./assets/components/Nav/Nav";
import Alert from "./assets/components/UX/Alert/Alert";
import CommentsModal from "./assets/components/Modals/CommentsModal";
import DeletePostModal from "./assets/components/Modals/DeletePostModal";
import PostModal from "./assets/components/Modals/PostModal";
import LoginModal from "./assets/components/Modals/LoginModal";
import RegisterModal from "./assets/components/Modals/RegisterModal";

export const ContextProv = createContext();

function App() {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(undefined);
  const [postData, setPostData] = useState({});
  const [alert, setAlert] = useState(
    <Alert type={""} message={""} isVisible={false} />
  );
  const [logout, setLogout] = useState(false);
  const [commentsCount, setCommentsCount] = useState({});
  const token = localStorage.getItem("token");




  return (
    <>
      <ContextProv.Provider
        value={{
          comments,
          setComments,
          postId,
          setPostId,
          alert,
          setAlert,
          logout,
          setLogout,
          commentsCount,
          setCommentsCount,
          setPostData,
          postData,
        }}
      >
        <div className="container d-flex flex-column" style={{ gap: "100px" }}>
          <Nav />
          <Routers />
          {<LoginModal />}
          {<RegisterModal />}
          {<CommentsModal />}
          {<PostModal token={token} type={"create"} />}
          {<PostModal token={token} type={"update"} />}
          {<DeletePostModal token={token} />}
          {alert}
        </div>
      </ContextProv.Provider>
    </>
  );
}

export default App;
