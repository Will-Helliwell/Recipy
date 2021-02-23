import axios from "axios";


export const addToFavotites = (id) => dispatch => {
    axios
      .post("/api/userFavorites/addToFavorite", id)
      .then(res => history.push("/favorites")) // re-direct to user's favorites page
      .catch(err =>
        dispatch({
          type: ADD_TO_FAVORITE,
          payload: err.response.data
        })
      );
  };