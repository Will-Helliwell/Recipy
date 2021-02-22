import React, { useState } from "react";

import "../App.css";
import RecipeList from "./recipes/RecipeList";
import IngredientList from "./ingredients/IngredientList";
import SpotifyWebApi from 'spotify-web-api-js';
var spotifyApi = new SpotifyWebApi();

function App() {
  const params = getHashParams();
  const token = params.access_token;
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [nowPlaying, setNowPlaying] = useState( { name: 'Not Checked', albumArt: '' } );
  // const [myPlaylists, setMyPlaylists] = useState

  if (token) {
    spotifyApi.setAccessToken(token);
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

  function getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response);
      setNowPlaying({
          name: response.item.name,
          albumArt: response.item.album.images[0].url
      });
    })
    .catch((error) => {
      console.log(error)
    });
  }

  function getPlaylist(){
    spotifyApi.getUserPlaylists()
    .then((response) => {
      console.log('User playlists', response)
    })
    .catch((error) => {
      console.log(error)
    });
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
        <a href='http://localhost:8888'> Login to Spotify </a>
        <div className="spotify-playing">
          Now Playing: { nowPlaying.name }
        </div>
        <div className="spotify-art">
          <img src={ nowPlaying.albumArt } style={{ height: 150 }}/>
        </div>
        <div className="spotify-button">
          { loggedIn &&
            <button onClick={() => getNowPlaying()}>
            Check Now Playing
            </button>
          }
        </div>
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
