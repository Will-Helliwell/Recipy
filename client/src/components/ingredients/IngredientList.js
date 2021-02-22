import React from "react";
import Categories from "./Categories";
import FilterButton from "./filterButton"

const IngredientList = ({ ingredients, setIngredients }) => {
  const options = ["Dairy", "Vegetables", "Fruits", "Meats", "Seafood", "Fish"];
  return (
    <div>
      {options.map((type) => {
        return (
          <Categories
            type={type}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        );
      })}
      <FilterButton/>
    </div>
  );
};

export default IngredientList;
