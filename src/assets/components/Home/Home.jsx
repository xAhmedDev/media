import Cards from "../Cards/Cards";
import AddPostBtn from "../UX/AddPostBtn/AddPostBtn";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Cards />
      {token && <AddPostBtn />}
    </>
  );
};

export default Home;
