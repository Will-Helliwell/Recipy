import React from 'react'

const FilterButton = () => {

     const filterRecipes = () => {
        console.log("Button Working!")
        fetch('http://localhost:5000/api/todos', {
            method: "POST",
            body: JSON.stringify({ingredients: ["chicken", "sweetcorn"]}),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Great Success:", result);
            });
      }


  return (
      <>
      <button onClick={() =>  filterRecipes()}>
        Filter
      </button>

      </>
  )
}

export default FilterButton
