import React, { useState, useEffect, useMemo } from "react";
import Popup from "reactjs-popup";
import FavoriteButton from "./favoriteButton"

const RecipeList = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`http://localhost:5000/api/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let recipe = result
          .filter((entry) => entry.author == "Esther Clark") // Created after X
          .slice(0, 10);
        setRecipes(recipe);
        console.log("Success:", result);
      });
  };

  useEffect(getRecipes, []);

  // Good for performance as it only recalculates upon dependency changes
  const filteredRecipes = useMemo(() => {
    // Return the original list of recipes if no ingredients are selected
    if (!selectedIngredients.length) return recipes;
    // Loop through the recipes
    const filteredRecipes = recipes.reduce((all, recipe) => {
      // Because recipe.ingredients is an array we also have to loop through that
      // in this case we're using find
      const doesIngredientExist = recipe.ingredients.find((item) => {
        // Loop through the checked ingredients and if ONE of the values of recipe.ingredients includes the selected ingredient key (e.g onion) then return true
        const checkedIngredients = selectedIngredients.find((selectedItem) => {
          return item.includes(selectedItem.toLowerCase());
        });
        return checkedIngredients;
      });
      // If this is true then add it to the list
      if (doesIngredientExist) {
        return [...all, recipe];
      }
      // If the ingredient doesn't exist at all within recipe.ingredients then just return what we've got
      return all;
    }, []);
    return filteredRecipes;
  }, [selectedIngredients, recipes]);

  return (
    <div className="all-recipes">
      <>
        {filteredRecipes.map((recipe) => {
          const recipe_id = recipe._id
          return (
            <div className="recipe-card" key={recipe._id}>
              <img className="recipe-image" src={recipe.image}></img>
              <p className="recipe-name"> {recipe.name}</p>
              <p className="recipe-summary"> {recipe.summary}</p>
              <p className="time-text">
                Cook: {recipe.time.cook} Prep: {recipe.time.prep}
              </p>
              < FavoriteButton
                post_id={recipe_id}
               />
              <Popup
                trigger={<button> Recipe Info</button>}
                position="top center"
              >
                <div className="popup-container">
                  <img className="popup recipe-image" src={recipe.image}></img>
                  <p className="popup recipe-name"> {recipe.name}</p>
                  <p className="popup recipe-author"> {recipe.author}</p>
                  <p className="popup recipe-summary"> {recipe.summary}</p>
                  <p className="popup time-text">
                    Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                  </p>
                  <h2>INGREDIENTS</h2>
                  {recipe.ingredients.map((ing) => {
                    return (
                      <>
                        <li>{ing}</li>
                      </>
                    );
                  })}
                  <h2>INSTRUCTIONS</h2>
                  {recipe.instructions.map((steps) => {
                    return (
                      <ul>
                        <li>{steps}</li>
                      </ul>
                    );
                  })}
                  <h2>Time</h2>
                  <p>Cook: {recipe.time.cook}</p>
                  <p>Prep: {recipe.time.prep}</p>
                </div>
              </Popup>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default RecipeList;
