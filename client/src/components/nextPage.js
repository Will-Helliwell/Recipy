import React from 'react'

const NextPage = ({ currentPage, setCurrentPage }) => {

     const sendPage = (currentPage) => {
        console.log(currentPage)
        fetch('http://localhost:5000/api/todos', {
            method: "POST",
            body: JSON.stringify({page: currentPage}),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Success:", result);
            });
      }


  return (
      <>
      {/* <button onClick={() => setCurrentPage(currentPage + 1)}> */}
      <button onClick={() =>  sendPage(currentPage)}>
        Next Page
      </button>

      </>
  )
}

export default NextPage
