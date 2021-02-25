import React, { useState } from "react";
import hardcodedOptions from "./hardCodedOptions";
import {Collapse} from 'react-collapse';

const Categories = ({ type, ingredients, setIngredients }) => {

  const [opened, setOpened] = useState({opened: false})
  const options = hardcodedOptions;

  const handleClick = () => {
    console.log("in handleClick")
    console.log(opened)
    setOpened(!opened)
    };
  

  return (
    <div>
          <h1 className="categ flow-text grey-text text-darken-1" onClick={handleClick.bind()}>{type}</h1>
      <div className="content">    
      {options[type].map((ing) => {
        return (
          <>
          <Collapse isOpened={opened ? false : true}>
            <p >{ing}</p>
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
            </Collapse>
          </>
      
         
        );
      })}
            </div>
    </div>
  );
};

export default Categories;
