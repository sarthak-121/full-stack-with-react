import React, { Component } from 'react'
import classes from './App.css'
import List from '../component/list/list'
import Navbar from './../component/navbar/navbar'
import Sidebar from './../component/sidebar/sidebar'
import ChatArea from '../component/chat-area/chat'

class App extends Component {
  state = {
    people: ['sarthak', 'maverick', 'protaker', 'motu'],
    friends: ['prashant', 'sarthak', 'maverick', 'protaker', 'motu'],
    peoples: [],
    user: {
      name: "test",
      password: "123"
    }
  }

  sendRequest = (username) => {
    console.log(username)
  }

  render() {
    let list = (
      <div>
        {this.state.people.map(people => {
          return <List 
            name={people} 
            click={() => this.sendRequest(people)}
            />
        })}
      </div>
    )

    if(list.props.children.length === 0) {
      list = null
    } 

    return (
      <div className={classes.App}>
        <Navbar/>
        <div className={classes.container}>
          <Sidebar
          listOfPeople={list}
          listOfFriends={this.state.friends}
          username={this.state.user.name}/>
          <ChatArea/>
        </div>
      </div>
    )
  }
}

export default App;
