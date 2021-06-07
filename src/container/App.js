import React, { useState, useEffect} from 'react'
import classes from './App.css'
import Navbar from './../component/navbar/navbar'
import Sidebar from './../component/sidebar/sidebar'
import ChatArea from '../component/chat-area/chat'
import Model from '../component/UI/model/model'
import Register from '../component/signup-login-model/model'
import Requests from '../component/requests/requests'
import Feeds from '../component/feeds/feeds'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import {sendedAction, recievedAction, credentialAction, friendAction} from '../store/index'
import {Route, Switch} from 'react-router-dom'

const socket = io('http://localhost:8080')

const app = () => {
    const dispatch = useDispatch()

    const [userdata, setUserdata] = useState({username: '....', password: '', email: ""})
    const [authenticated, setAuthenticated] = useState(false)
    const [sidebarState, setSidebarState] = useState(false)

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
      dispatch(credentialAction.set({
        username: data.username,
        password: data.password, 
        email: data.email
      }))

      dispatch(sendedAction.addArray(data.sended))
      dispatch(recievedAction.addArray(data.recieved))
      dispatch(friendAction.addArray(data.friends))
      setAuthenticated(true)

      sessionStorage.setItem('userdata', JSON.stringify(data))
    }

    const sidebarHandler = () => {
      sidebarState ? setSidebarState(false) : setSidebarState(true)
    }

    const sendedRequestsHandler = async (people) => {
      const data = {
        sender: userdata.username,
        reciever: people
      }

      try {
        const response = await fetch('http://localhost:8080/setRequest', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if(response.ok) {
          const data = JSON.parse(sessionStorage.getItem('userdata'))

          if(data) {
            data.sended.push(people)
          }

          sessionStorage.setItem('userdata', JSON.stringify(data))
          dispatch(sendedAction.add(people))
        } else {
          throw new Error('something went wrong!')
        }
      } catch(e) {
        alert(e)
      }
    }

    return (
      <div className={classes.App}>
        <Switch>
          <Route path='/requests'>
            <Requests />
          </Route>
          <Route path='/connect/:user/:room'>
          {authenticated ? null :
            <Model>
              <Register authenticate={authenticationHandler}/>
            </Model>}
          <Navbar 
          userdata={userdata}
          sidebarHandler={sidebarHandler}/>
          <div className={classes.container}>
            <Sidebar
            username={userdata.username}
            authenticated={authenticated}
            sidebarState={sidebarState}
            sendedRequestsHandler={sendedRequestsHandler}
            />
            <ChatArea
            socket={socket}/>
          </div>
          </Route>
          <Route path='/' exact>
          {authenticated ? null :
            <Model>
              <Register authenticate={authenticationHandler}/>
            </Model>}
          <Navbar 
          userdata={userdata}
          sidebarHandler={sidebarHandler}/>
          <div className={classes.container}>
            <Sidebar
            username={userdata.username}
            authenticated={authenticated}
            sidebarState={sidebarState}
            sendedRequestsHandler={sendedRequestsHandler}
            />
            <Feeds />
          </div>
          </Route>
          <Route path='*'>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </div>
    )
}

export default app;
