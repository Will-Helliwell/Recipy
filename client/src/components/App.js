import React, { useState } from "react";

import "../App.css";
import Login from "./spotify/login.js"
import RecipeList from "./recipes/RecipeList";
import IngredientList from "./ingredients/IngredientList";
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPlayer from 'react-spotify-web-playback';
var spotifyApi = new SpotifyWebApi();

function App() {
  const params = getHashParams();
  const token = params.access_token;
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  if (token) {
    spotifyApi.setAccessToken(token);
    console.log(token);
  }

  function getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  const [ingredients, setIngredients] = useState({});
  const selectedIngredients = Object.values(ingredients).reduce(
    (selectedIngredients, next) => {
      // Loop through selected ingredients object to get all keys that have a truthy value
      const ingredientsSelected = Object.entries(next).reduce(
        (all, [key, value]) => {
          if (!value) return all;
          return [...all, key];
        },
        []
      );
      // Return all selected ingredient keys to use for filtering recipes
      return [...selectedIngredients, ...ingredientsSelected];
    },
    []
  );
  // Object.values ['value' 'value]
  // Object.keys ['key', 'key', 'key']
  // Object.entries [['key', 'value'], ['key', 'value]]
  console.log("selectedIngredients", selectedIngredients);
  return (
    <div className="App">
      <div className="spotify">
        <Login/>
        <SpotifyPlayer
            token={token}
            uris={['spotify:playlist:1VaucNthO1eR7A51BJoEtS']}
        />
      </div>
      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <RecipeList selectedIngredients={selectedIngredients} />
    </div>
  );
}

export default App;
