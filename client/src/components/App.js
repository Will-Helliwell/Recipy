import React, { useState } from "react";

import "../App.css";
import RecipeList from "./recipes/RecipeList";
import IngredientList from "./ingredients/IngredientList";
import NextPage from "./nextPage";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="App">
      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <RecipeList selectedIngredients={selectedIngredients} />
      <NextPage
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
