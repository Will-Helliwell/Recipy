import React from 'react'

const NextPage = ({ currentPage, setCurrentPage }) => {


    // const dataRequest = (URL, methodType, params) => {
    //     return fetch(URL, {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(params)
    //     })
    //       .then(data => {
    //         return data.json()
    //       })
    //       .catch(err => {
    //         return err
    //       })
    //   }

     const sendPage = (currentPage) => {
        console.log(currentPage)
        fetch(`${process.env.REACT_APP_API}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              body: JSON.stringify({
                page: currentPage
              })
            },
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Success:", result);
            });
    //     const queryParams = {};
    //     queryParams["page"] = currentPage; //Page Number
    //   dataRequest('http://localhost:5000/todos', 'POST', queryParams)
    //       .then(data => {
    //         console.log("Data Fetched ", data)
    //         // this.setState({
    //         //   users: data.users
    //         // })
    //       })
    //       .catch(err => {
    //         console.log("Error In Fetching ", err)
    //       })
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
