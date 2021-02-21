import React from 'react'

const NextPage = ({ currentPage, setCurrentPage, sendPage }) => {

  return (
      <>
      <button onClick={() => { setCurrentPage(currentPage + 1); sendPage(currentPage);}} > 
        Next Page
      </button>

      </>
  )
}

export default NextPage
