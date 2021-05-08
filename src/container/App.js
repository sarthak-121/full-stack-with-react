import React, { useState, useEffect} from 'react'
import classes from './App.css'
import Navbar from './../component/navbar/navbar'
import Sidebar from './../component/sidebar/sidebar'
import ChatArea from '../component/chat-area/chat'
import Model from '../component/UI/model/model'
import Register from '../component/signup-login-model/model'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

const app = () => {
    const [userdata, setUserdata] = useState({username: 'Maverick', password: '123', email: "xyz@abc.com"})
    const [authenticated, setAuthenticated] = useState(false)
    const [connRequestSent, setConnRequestSent] = useState([])
    const [connRequestRecieved, setConnRequestRecieved] = useState([])

    useEffect(() => {
      const data = JSON.parse(sessionStorage.getItem('userdata'))

      if(data) {
        authenticationHandler(data)
        socket.on('welcomeMessage', (msg) => {
          console.log(msg)
        })
      }
   
    }, [])

    const authenticationHandler = (data) => {
      setUserdata({
        username: data.username,
        password: data.password, 
        email: data.email
      })
      setConnRequestSent(data.sended)
      setConnRequestRecieved(data.recieved)
      setAuthenticated(true)

      sessionStorage.setItem('userdata', JSON.stringify(data))
    }

    return (
      <div className={classes.App}>
        {authenticated ? null :
          <Model>
            <Register authenticate={authenticationHandler}/>
          </Model>}
        <Navbar userdata={userdata}/>
        <div className={classes.container}>
          <Sidebar
          username={userdata.username}
          authenticated={authenticated}/>
          <ChatArea/>
        </div>
      </div>
    )
}

export default app;
