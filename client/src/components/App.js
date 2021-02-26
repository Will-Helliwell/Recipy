import React, { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";

import RecipeList from "./recipes/RecipeList";
import IngredientList from "./ingredients/IngredientList";

import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { Provider } from "react-redux";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import PrivateRoute from "./private-route/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
import SpotifyLogin from "./spotify/login.js";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-web-playback";
var spotifyApi = new SpotifyWebApi();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const validateURI = (input: string): boolean => {
  let isValid = false;

  if (input && input.indexOf(':') > -1) {
    const [key, type, id] = input.split(':');

    if (key && type && type !== 'user' && id && id.length === 22) {
      isValid = true;
    }
  }

  return isValid;
};

const parseURIs = (input: string): string[] => {
  const ids = input.split(',');

  return ids.every((d) => validateURI(d)) ? ids : [];
};

function App() {
  const params = getHashParams();
  const token = params.access_token;
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [playlists, setPlaylists] = useState([]);
  const [URIs, setURIs] = useState(['spotify:album:51QBkcL7S3KYdXSSA0zM9R']);
  const URIsInput = useRef(null);

  if (token) {
    spotifyApi.setAccessToken(token);
    console.log(token);
  }

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  function getPlaylist() {
    spotifyApi
      .getUserPlaylists()
      .then((response) => {
        console.log("User playlists", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmitURIs = useCallback((e) => {
  e.preventDefault();

  if (URIsInput && URIsInput.current) {
    setURIs(URIsInput.current.value);
  }
  }, []);

  const handleClickURIs = useCallback((e) => {
  e.preventDefault();
  const { uris } = e.currentTarget.dataset;

  setURIs(uris);

  if (URIsInput && URIsInput.current) {
    URIsInput.current.value = uris;
  }
  }, []);

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
  // console.log("selectedIngredients", selectedIngredients);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>

          <div className="spotify-player">
            <SpotifyLogin />
            <SpotifyPlayer
              token={token}
              uris={URIs}
            />
          </div>
            <div className="playlist-buttons">

              <button className="gen" onClick={handleClickURIs} data-uris="spotify:playlist:0gUutpl4Vqbbh9gHFKZwX1">
              All American
              </button>
              <button className="gen" onClick={handleClickURIs} data-uris="spotify:playlist:4MsR10XAYWsDCSrP1DhrUJ">
              French
              </button>
              <button className="gen" onClick={handleClickURIs} data-uris="spotify:playlist:0iuKmZRRdh8zvFjmMKWjFg">
              Latin American
              </button>
              <button className="gen" onClick={handleClickURIs} data-uris="spotify:playlist:6wADQ2Pq08RZvEEO7D8Ncn">
              Oriental
              </button>
              <button className="gen" onClick={handleClickURIs} data-uris="spotify:playlist:2YTGWJIg1z2eJaLVv9QsSH">
              Italian
              </button>

            </div>

          <div className="ing-rec">
            <IngredientList
              ingredients={ingredients}
              setIngredients={setIngredients}
            />

          <RecipeList selectedIngredients={selectedIngredients} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
