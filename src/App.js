import React from 'react';
import './App.css';
import TrailsContainer from './containers/TrailsContainer'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar';
import User from './containers/user_show';
import Home from './components/Home';
import Login from './components/login'

class App extends React.Component {
  
  state = {
    trailArray: [],
    search: "",
    faveArray: []
  }

  
  componentDidMount = () => {
    fetch('http://localhost:3000/trails')
    .then(resp => resp.json())
    .then(trails => this.setState({trailArray: trails}))

    fetch("http://localhost:3000/favorites")
    .then(resp => resp.json())
    .then(
      faves => this.setState(previousState => ({
      faveArray: previousState.faveArray.concat(faves)
    }))
    )


    // let person = {
    //   username: "sylvia",
    //   password: "whatscooking",
    //   bio: "Sylvia Woods was an American restaurateur who founded the sould food restaurant Sylvia's in Harlem on Lenox Avenue, New York City in 1962. She published two cookbooks and was an important figure in the community.",
    //   image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Syvia_of_Sylvia%27s_reaturant_N.Y.C_%28cropped%29.jpg"
    // }

    // fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',

    //   },
    //   body: JSON.stringify({user: person})
    // })
    //   .then(r => r.json())
    //   .then(console.log)


  }

  searchHandler = (searchString) => {
    this.setState({search: searchString})
    this.filterTrails()
  }

  filterTrails = () => {
    return this.state.trailArray.filter(trail => trail.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }
  
  
  faveHandler = (faveTrail) => {
    let favorite = this.state.faveArray.find(fave => fave.user_id === 3 && fave.trail_id === faveTrail.id)
    if (favorite) {
      let newArray = this.state.faveArray
      let index = newArray.findIndex(fav => fav.id === favorite.id)
      newArray.splice(index, 1)
      this.setState({faveArray: newArray})
      fetch(`http://localhost:3000/favorites/${favorite.id}`, {
        method: "DELETE"
      })
    } else {
    let object = {
      user_id: 3,
      trail_id: faveTrail.id}

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"},
      body: JSON.stringify(object)}

    fetch("http://localhost:3000/favorites", options)
    .then(resp => resp.json())
    .then(result => {console.log("newfaves:", result)
    this.setState(() => ({
      faveArray: [result, ...this.state.faveArray]
    }))})
      }
  }

  locationSubmitHandler = (searchTerm) => {
    fetch(`http://localhost:3000/trails/?location=${searchTerm}`)
    .then(resp => resp.json())
    .then(trails => this.setState({trailArray: trails}))
  }

  

  render() { 
    //  return this.state.trailArray.length > 0  
    //  ?
    return (
     <>
      <div className="App">
          <NavBar />
        <Switch>
          <Route path="/trails" render={() => <TrailsContainer trails={this.filterTrails()} locationSubmitHandler={this.locationSubmitHandler} searchHandler={this.searchHandler} faveHandler={this.faveHandler}/>} />
          <Route path="/users" render={() => <User trails={this.filterTrails()} faves={this.state.faveArray} faveHandler={this.faveHandler}/>} />
          <Route path="/login" render={() => <Login />}/>
          <Route path="/" render={() => <Home />}/>
        </Switch>
      </div>
    </>
    )
    // :
    // "loading..."
  }
}

export default App;
