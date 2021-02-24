import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class FavoriteButton extends React.Component {

    handleClick(user_id) {
        console.log("inside handleClick");
        console.log("User Name: " + user_id.name);
        console.log("User Id: " + user_id.id);
        console.log("Post: " + this.props.post)
        axios.post("/favorites/addfav", this.props.post.name).then(
            res => {
                console.log("inside axios post request")
            }
        );
        // axios
        //   .post("/api/add_to_favourites/add")
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
