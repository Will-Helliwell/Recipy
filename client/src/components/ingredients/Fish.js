import React from "react";

const Fish = ({ type, ingredients, setIngredients }) => {
  const options = ["Milk", "Cream", "Cheese"];

  // const hardcodedOptions = {
  //   Dairy: ['Milk', 'Cream', 'Cheese']
  // };

  return (
    <div>
      <h1>{type}</h1>
      {options.map((ing) => {
        console.log("ingredients", ing);
        return (
          <>
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
            <p>{ing}</p>
          </>
        );
      })}
    </div>
  );
};

export default Fish;
