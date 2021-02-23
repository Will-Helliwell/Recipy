import React from 'react'
import { connect } from 'react-redux'

class FavoriteButton extends React.Component {
    render() {

        console.log(this.props)
        const { user } = this.props.auth;
        console.log(user.name)
        console.log(user.id)

  return (
      <button className="addtofavorite">
          Add to Favorites
      </button>
  )
    }
    
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(FavoriteButton)
