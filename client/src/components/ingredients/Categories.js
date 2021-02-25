import React from "react";
import hardcodedOptions from "./hardCodedOptions";

const Categories = ({ type, ingredients, setIngredients }) => {
  const options = hardcodedOptions;

  // const hardcodedOptions = {
  //   Dairy: ['Milk', 'Cream', 'Cheese']
  // };

  return (
    <div>
          <h1 className="categ">{type}</h1>
      <div className="content">

      {options[type].map((ing) => {
        return (
          <>
          
            <p>{ing}</p>
            <label>
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
            <span></span>
            </label>
           
          </>
      
         
        );
      })}
            </div>
    </div>
  );
};

export default Categories;
