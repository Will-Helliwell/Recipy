import React, { useState } from "react";

import "../App.css";
import RecipeList from "./recipes/RecipeList";
import IngredientList from "./ingredients/IngredientList";

function App() {
  const [ingredients, setIngredients] = useState({});
  console.log("ingredients", ingredients);
  return (
    <div className="App">
      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <RecipeList />
    </div>
  );
}

export default App;
