import React from "react";
import Dairy from "./Dairy";
import Fish from "./Fish";
import Fruits from "./Fruits";
import Meats from "./Meats";
import Seafood from "./Seafood";
import Vegetables from "./Vegetables";

const IngredientList = ({ ingredients, setIngredients }) => {
  const options = ["Dairy", "Vegetables", "Fruits", "Meats", "Seafood", "Fish"];
  return (
    <div>
      {options.map((type) => {
        return (
          <Fish
            type={type}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        );
      })}
      {/* <Dairy />
      <Vegetables />
      <Fruits />
      <Meats />
      <Seafood />
      <Fish ingredients={ingredients} setIngredients={setIngredients} /> */}
    </div>
  );
};

export default IngredientList;
