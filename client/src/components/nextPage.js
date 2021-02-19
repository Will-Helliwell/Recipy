import React from 'react'

const NextPage = ({ currentPage, setCurrentPage }) => {
  return (
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        Next Page
      </button>
  )
}

export default NextPage
