import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

const RecipeList = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
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
    fetch(`http://localhost:5000/api/todos?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, totalRecipes, recipes }) => {
        console.log(totalPages, totalRecipes, recipes);
        setRecipes((state) => {
          console.log("state", state);
          return [...state, ...recipes];
        });
        setHasMore(recipes.length > 0);
        setLoading(false);
      });
  }, [pageNumber]);

  // const getRecipes = () => {
  //   fetch(`http://localhost:5000/api/todos?page=${pageNumber}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(({ totalPages, totalRecipes, recipes }) => {
  //       console.log(totalPages, totalRecipes, recipes);
  //       setRecipes(recipes);
  //       setHasMore(totalRecipes.length > 0);
  //       setLoading(false);
  //     });
  // };

  // useEffect(getRecipes, [selectedIngredients, pageNumber]);

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

  console.log("recipes", recipes.length && JSON.stringify(recipes[0]));
  console.log("filteredRecipes", filteredRecipes);

  return (
    <>
      <>
        {filteredRecipes.map((recipe, index) => {
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
    </>
  );
};

export default RecipeList;
