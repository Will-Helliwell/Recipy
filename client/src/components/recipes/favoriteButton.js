import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class FavoriteButton extends React.Component {

    handleClick(user_id) {
        console.log("inside handleClick");
        console.log("User Name: " + user_id.name);
        console.log("User Id: " + user_id.id);
        console.log("Post: " + this.props.post)
        const addToFav = { name: user_id.name, recipe: this.props.post }
        console.log(addToFav)
        axios
          .post("http://localhost:5000/api/favorites/addfav", addToFav)
          .then(
            res => {
                console.log("inside axios post request")
                console.log(res)
            }
        );
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
