import React from 'react'
import { connect } from 'react-redux'

class FavoriteButton extends React.Component {

    handleClick(user_id) {
        console.log("inside handleClick")
        console.log(user_id.name);
        console.log(user_id.id);
        // console.log(user2);
    };
    render() {
        const { user } = this.props.auth;
  return (
      <button className="addtofavorite" onClick={this.handleClick.bind(this, user)}>
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
