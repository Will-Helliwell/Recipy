import React from "react";
import hardcodedOptions from "./hardCodedOptions";

const Categories = ({ type, ingredients, setIngredients }) => {
  const options = hardcodedOptions;

  // const hardcodedOptions = {
  //   Dairy: ['Milk', 'Cream', 'Cheese']
  // };

  return (
    <div>
      <h1>{type}</h1>
      {options[type].map((ing) => {
        return (
          <>
            <p>{ing}</p>
            <input
              type="checkbox"
              value={ing}
              onChange={(event) => {
                setIngredients({
                  ...ingredients,
                  [type]: { ...ingredients[type], [ing]: event.target.checked },
                });
              }}
            />
          </>
        );
      })}
    </div>
  );
};

export default Categories;
