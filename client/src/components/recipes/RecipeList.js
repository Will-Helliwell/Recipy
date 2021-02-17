import React, { useState, useEffect } from "react";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(
      `http://localhost:3000/api/todos`,
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
        {recipes.length &&
          recipes.map((recipe) => {
            return (
              <>
                <p>{recipe.title}</p>
                <>
                  {recipe.usedIngredients.length &&
                    recipe.usedIngredients.map((used) => {
                      return (
                        <>
                          <p>{used.amount}</p>
                          <p>{used.unit}</p>
                          <p>{used.unitLong}</p>
                          <p>{used.unitShort}</p>
                        </>
                      );
                    })}
                </>
              </>
            );
          })}
      </>
    </>
  );
};

export default RecipeList;