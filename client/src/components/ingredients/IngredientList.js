import React from "react";
import Categories from "./Categories";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const IngredientList = ({ ingredients, setIngredients }) => {
  const options = ["Dairy", "Vegetables", "Fruits", "Meats", "Seafood", "Fish"];
  return (
    <div className="sidebar">
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
      </div>
    </div>
  );
};

export default IngredientList;
