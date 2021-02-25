import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
 } from "react";
 import Popup from "reactjs-popup";
 import FavoriteButton from "./favoriteButton"

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
      // setFilteredRecipes([])
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

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      console.log("in filtered pagination branch");
      setRecipes([]);
      setFilteredRecipes([])
      setPageNumber(0)
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
  }, [selectedIngredients]);

  return (
    <div className="all-recipes">
      <>
        {recipes.map((recipe, index) => {
          const recipeObject = recipe
          if (recipes.length === index + 1) {
              return (
                <div className="recipe-card" ref={lastRecipeElementRef}>
                   <img className="recipe-image" alt={recipe.image} src={recipe.image}></img>
                    <p className="recipe-name"> {recipe.name}</p>
                    <p className="recipe-summary"> {recipe.summary}</p>
                    <p className="time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
                    < FavoriteButton
                      post={recipeObject}
                    />
                      <Popup
                        trigger={<button> Recipe Info</button>}
                        position="center center"
                        >
                        <div className="popup-container">
                        <img className="popup recipe-image" alt={recipe.image} src={recipe.image}></img>
                        <p className="popup recipe-name"> {recipe.name}</p>
                        <p className="popup recipe-summary"> {recipe.summary}</p>
                        <p className="popup time-text">
                          Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                        </p>
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
                      );
                      </div>
              </Popup>
              </div>
              )} else {
            return (
              <div className="recipe-card" ref={lastRecipeElementRef}>
                    <img className="recipe-image" alt={recipe.image} src={recipe.image}></img>
                    <p className="recipe-name"> {recipe.name}</p>
                    <p className="recipe-summary"> {recipe.summary}</p>
                    <p className="time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
                    < FavoriteButton
                      post={recipeObject}
                    />
                      <Popup
                        trigger={<button> Recipe Info</button>}
                        position="center center"
                        >
                        <div className="popup-container">
                        <img className="popup recipe-image" alt={recipe.image} src={recipe.image}></img>
                        <p className="popup recipe-name"> {recipe.name}</p>
                        <p className="popup recipe-summary"> {recipe.summary}</p>
                        <p className="popup time-text">
                          Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                        </p>
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
                      );
                      </div>
              </Popup>
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
      </>
      <div>
        {filteredRecipes.map((recipe, index) => {
          const recipeObject = recipe
          if (filteredRecipes.length === index + 1) {
            return (
              <div className="recipe-card" ref={lastRecipeElementRef}>
                    <img className="recipe-image" alt={recipe.image} src={recipe.image}></img>
                    <p className="recipe-name"> {recipe.name}</p>
                    <p className="recipe-summary"> {recipe.summary}</p>
                    <p className="time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
                    < FavoriteButton
                      post={recipeObject}
                    />
                      <Popup
                        trigger={<button> Recipe Info</button>}
                        position="center center"
                        >
                        <div className="popup-container">
                        <img className="popup recipe-image" alt={recipe.image} src={recipe.image}></img>
                        <p className="popup recipe-name"> {recipe.name}</p>
                        <p className="popup recipe-summary"> {recipe.summary}</p>
                        <p className="popup time-text">
                          Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                        </p>
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
                      );
                      </div>
              </Popup>
              </div>
            );
          } else {
            return (
              <div className="recipe-card" ref={lastRecipeElementRef}>
                    <img className="recipe-image" alt={recipe.image} src={recipe.image}></img>
                    <p className="recipe-name"> {recipe.name}</p>
                    <p className="recipe-summary"> {recipe.summary}</p>
                    <p className="time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
                    < FavoriteButton
                      post={recipeObject}
                    />
                      <Popup
                        trigger={<button> Recipe Info</button>}
                        position="center center"
                        >
                        <div className="popup-container">
                        <img className="popup recipe-image" alt={recipe.image} src={recipe.image}></img>
                        <p className="popup recipe-name"> {recipe.name}</p>
                        <p className="popup recipe-summary"> {recipe.summary}</p>
                        <p className="popup time-text">
                          Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                        </p>
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
                      );
                      </div>
              </Popup>
              </div>
            );
          }
        })}
      </div>

    </div>
  );
 };

 export default RecipeList;
