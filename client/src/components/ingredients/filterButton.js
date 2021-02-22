import React from 'react'

const FilterButton = ({ currentPage, setCurrentPage }) => {

     // const sendPage = (currentPage) => {
     //    console.log(currentPage)
     //    fetch('http://localhost:5000/api/todos', {
     //        method: "POST",
     //        body: JSON.stringify({page: currentPage}),
     //        headers: {
     //          "Content-Type": "application/json",
     //        },
     //      })
     //        .then((response) => response.json())
     //        .then((result) => {
     //          console.log("Success:", result);
     //        });
     //  }


  return (
      <>
      <button onClick={() =>  console.log("Button Working")}>
        Filter
      </button>

      </>
  )
}

export default FilterButton
