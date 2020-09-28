import React from "react"
import HikeForm from '../components/hike_form'
import HikeContainer from './hike_container'
import FavoriteContainer from './favorite_container'


class User extends React.Component {

    state = {
        user: {}
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/users/3")
        .then(resp => resp.json())
        .then(user => this.setState({user: user}))
    }
    
    
    render() {
        // console.log("faves in user", this.props.faves)
        return (
            this.state.user.hikes
            ?
            <>
            <h1>Welcome, {this.state.user.username}!</h1>
            <img src={this.state.user.image} alt={this.state.user.username}/>
            <h4>About Me: {this.state.user.bio}</h4>
            <FavoriteContainer faves={this.props.faves}/>
            <HikeForm trails={this.props.trails}/>
            <HikeContainer hikes={this.state.user.hikes}/>
            </>
            :
            null 
        )
    }
        
}

export default User;