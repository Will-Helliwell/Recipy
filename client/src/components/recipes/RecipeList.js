import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Popup from "reactjs-popup";

const RecipeList = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const lastRecipeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible", node);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      console.log("in filtered pagination branch");
      setRecipes([]);
      fetch(`http://localhost:5000/api/todos?page=${pageNumber}`, {
        method: "POST",
        body: JSON.stringify({ ingredients: selectedIngredients }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        // .then((response) => console.log("response:", response))
        .then(
          ({ totalFilteredRecipesCount, totalPages, totalFilteredRecipes }) => {
            console.log(totalPages, totalFilteredRecipesCount, filteredRecipes);
            setFilteredRecipes((state) => {
              console.log(
                "state1.totalFilteredRecipes",
                state.totalFilteredRecipes
              );
              console.log("totalFilteredRecipes", totalFilteredRecipes);
              console.log("returning", [...state, ...totalFilteredRecipes]);
              console.log("state", state);
              return [...state, ...totalFilteredRecipes];
            });
            setHasMore(totalFilteredRecipes.length > 0);
            setLoading(false);
          }
        );
    } else {
      fetch(`http://localhost:5000/api/todos?page=${pageNumber}`)
        .then((response) => response.json())
        // .then((response) => console.log("response:", response))
        .then(({ totalPages, totalRecipes, recipes }) => {
          // console.log(totalPages, totalRecipes, recipes);
          setRecipes((state) => {
            console.log("state2", state);
            console.log("recipes", recipes);
            return [...state, ...recipes];
          });
          setHasMore(recipes.length > 0);
          setLoading(false);
        });
    }
  }, [pageNumber, selectedIngredients]);

  console.log("outside of all branches");
  console.log("-------------");
  console.log("recipes:", recipes);
  console.log("recipes length:", recipes.length);

  console.log("filtered recipes:", filteredRecipes);
  console.log("filtered recipes length:", filteredRecipes.length);

  return (
    <div className="all-recipes">
      <>
        {recipes.map((recipe, index) => {
          if (recipes.length === index + 1) {
            return (
              <div ref={lastRecipeElementRef}>
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
              </div>
            );
          } else {
            return (
              <div>
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
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
      </>
      <div>
        {filteredRecipes.map((recipe, index) => {
          if (filteredRecipes.length === index + 1) {
            return (
              <div ref={lastRecipeElementRef}>
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
              </div>
            );
          } else {
            return (
              <div>
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
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default RecipeList;
