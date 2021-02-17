import React, { useState, useEffect } from "react";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(
      `http://localhost:5000/api/todos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      } 
    )
      .then((response) =>  response.json()
      )
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
        {
          recipes.map((recipe) => {
            return (
              <>
              <h2>NAME</h2>
               <p> {recipe.name}</p>
               <h2>INGREDIENTS</h2>
                <p>{recipe.ingredients}</p>
               <h2>INSTRUCTIONS</h2>
                <p>{recipe.instructions}</p>
                <h2>SERVING</h2>
                <p>{recipe.serving}</p>
                <>
      
                </>
              </>
            );
          })}
      </>
    </>
  );
};

export default RecipeList;