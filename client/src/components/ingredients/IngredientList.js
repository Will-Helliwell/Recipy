import React from "react";
import Categories from "./Categories";
import FilterButton from "./filterButton";

const IngredientList = ({ ingredients, setIngredients }) => {
  const options = ["Dairy", "Vegetables", "Fruits", "Meats", "Seafood", "Fish"];
  return (
    <div className="sidebar">
   
        {options.map((type) => {
          return (
            <div >
            <Categories
              type={type}
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
              </div>
          );
        })}
 
    </div>
  );
};

export default IngredientList;
