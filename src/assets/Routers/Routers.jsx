import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Routers;
