import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../App.css";
import RecipeList from "./recipes/RecipeList";
import IngredientList from "./ingredients/IngredientList";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
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
    <Router>
    <div className="App">
  
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <RecipeList selectedIngredients={selectedIngredients} />
 
    </div>
    </Router>
  );
}

export default App;
