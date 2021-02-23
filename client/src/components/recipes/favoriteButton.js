import React from 'react'

const FavoriteButton = () => {

    const { user } = this.props.auth;
    console.log(user)

  return (
      <button className="addtofavorite" type="submit">
          Add to Favorites
      </button>
  )
}

export default FavoriteButton
