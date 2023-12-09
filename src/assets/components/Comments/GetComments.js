import axios from "axios";

export const GetComments = (id, commentCont) => {
  axios
    .get(`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`)
    .then((response) => {
      commentCont(response.data.data.comments);
    })
    .catch((error) => {
      console.log(error);
    });
};
