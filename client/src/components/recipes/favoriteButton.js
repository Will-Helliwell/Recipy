import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class FavoriteButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            liked: false,
          };
    }

    sendData(user_id){
            if (this.state.liked) {
                const removeFav = { name: user_id.name, recipe: this.props.post }
                console.log(removeFav)
                axios
                    .post("/api/favorites/removefav", removeFav)
                    .then(
                        res => {
                        console.log("deleting fav")
                        console.log(res)
                        }
                );

            } else {
            const addToFav = { name: user_id.name, recipe: this.props.post }
            console.log(addToFav)
            axios
              .post("/api/favorites/addfav", addToFav)
              .then(
                res => {
                console.log("inside axios post request")
                console.log(res)
                }
              );
        }
    }

    handleClick(user_id) {
        this.setState(prevState => (prevState, {
            liked: !prevState.liked
          }));
          this.sendData(user_id);
    };
    render() {
        const { user } = this.props.auth;
  return (
      <button className="addtofavorite" onClick={this.handleClick.bind(this, user)}>
          {this.state.liked ? "Remove from Favorites" : "Add to Favorites"}
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
