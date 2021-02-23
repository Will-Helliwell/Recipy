import React, { useState } from "react";
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

import Login from "./spotify/login.js"
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPlayer from 'react-spotify-web-playback';
var spotifyApi = new SpotifyWebApi();

import PrivateRoute from "./private-route/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
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
        <div className="spotify">
        <Login/>
        <SpotifyPlayer
            token={token}
            uris={['spotify:playlist:1VaucNthO1eR7A51BJoEtS']}
        />
        <div className="spotify-button">
          { loggedIn &&
            <button onClick={() => getPlaylist()}>
            Get My Playlists
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
    </Router>
    </Provider>
  );
}

export default App;
