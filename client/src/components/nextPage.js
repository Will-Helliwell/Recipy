import React from 'react'

const NextPage = ({ currentPage, setCurrentPage }) => {

     const sendPage = (currentPage) => {
        console.log(currentPage)
        fetch('http://localhost:5000/api/todos', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              body: JSON.stringify({
                page: currentPage
              })
            },
          })
            .then((response) => response.json()
            )
            .then((result) => {
              console.log("Success:", result);
            });
      }


  return (
      <>
      <button onClick={() => { setCurrentPage(currentPage + 1); sendPage(currentPage);}} > 
        Next Page
      </button>

      </>
  )
}

export default NextPage
