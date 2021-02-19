import React from 'react'

const NextPage = ({ currentPage, setCurrentPage }) => {


    const dataRequest = (URL, methodType, params) => { 
        return fetch(URL, {
          method: methodType,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
          .then(data => {
            return data.json()
          })
          .catch(err => {
            return err
          })
      }
 
     const sendPage = (currentPage) => {
        const queryParams = {};
        queryParams["page"] = currentPage; //Page Number
        this.dataRequest('http://localhost:5000/todos', 'POST', queryParams)
          .then(data => {
            console.log("Data Fetched ", data)
            // this.setState({
            //   users: data.users
            // })
          })
          .catch(err => {
            console.log("Error In Fetching Users ", err)
          })
      }


  return (
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        Next Page
      </button>
  )
}

export default NextPage
