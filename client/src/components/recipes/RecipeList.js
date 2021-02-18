import React, { useState, useEffect } from "react";

const RecipeList = () => {
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
        setRecipes(result);
        console.log("Success:", result);
      });
  };

  useEffect(getRecipes, []);

  console.log("rep", recipes);

  return (
    <>
      <>
        {recipes.map((recipe) => {
          return (
            <>
              <img src={recipe.image}></img>
              <h2>NAME</h2>
              <p> {recipe.name}</p>
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
            </>
          );
        })}
      </>
    </>
  );
};

export default RecipeList;
