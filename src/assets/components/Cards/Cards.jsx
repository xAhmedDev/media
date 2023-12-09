import React, { useContext, useEffect, useRef, useState } from "react";
import "./Cards.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ContextProv } from "../../../App";
import Alert from "../UX/Alert/Alert";
import { Loader } from "../UX/Loader/Loader";
import "../../../../node_modules/@popperjs/core/dist/umd/popper.js";
import Card from "./Card.jsx";

const Cards = () => {
  const { setAlert } = useContext(ContextProv);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState(
    `${import.meta.env.VITE_APP_BASE_URL}/posts?page=1`
  );

  const lastCardRef = useRef(null);
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getPosts = (url, fun) => {
    axios
      .get(url)
      .then((response) => {
        setNextPage(response.data.links.next);
        fun(response);
      })
      .catch((error) => {
        setAlert(
          <Alert
            type={"error"}
            message={`${error.response.message}`}
            isVisible={true}
          />
        );
      });
  };

  useEffect(() => {
    const getFirstPagePosts = (response) => {
      setPosts(response.data.data);
    };

    if (location.pathname == "/home" || location.pathname == "/") {
      getPosts(
        `${import.meta.env.VITE_APP_BASE_URL}/posts?page=1`,
        getFirstPagePosts
      );
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (lastCardRef.current) {
        const { top } = lastCardRef.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        setIsIntersecting(top <= windowHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getNextPagePosts = (response) => {
      setPosts([...posts, ...response.data.data]);
    };

    if (isIntersecting) {
      getPosts(nextPage, getNextPagePosts);
    }
  }, [isIntersecting]);

  return (
    <div className="d-flex flex-column align-items-center w-100">
      {posts.length == 0 && location.pathname == "/home" ? (
        <Loader />
      ) : (
        posts.map((post, index) => {
          const isLastCard = index === posts.length - 1;
          return (
            <div
              id={post.id}
              key={post.id}
              ref={isLastCard ? lastCardRef : null}
              className={`card col-sm-12 col-md-8 mt-2 mb-2 ${
                isLastCard ? "last-card" : ""
              }`}
            >
              <Card post={post} userData={userData} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cards;
