import React from 'react' 
import classes from './button.css'
import {useDispatch, useSelector} from 'react-redux'
import { recievedAction, friendAction } from  '../../../store/index' 

const Button = (props) => {
    const dispatch = useDispatch()
    const username = useSelector(state => state.credential.username)
    let style = null

    if(props.name === 'Decline') {
        style = classes.decline
    }
    if(props.name === 'Accept') {
        style = classes.accept
    }

    const clickHandler = async () => {
        if(props.name === 'Accept') {
            try {
                const response = await fetch('https://full-stack-chat-app-121.herokuapp.com/acceptedReq', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user: props.user, username})
                })

                if(!response.ok) {
                    throw new Error("something went wrong!")
                }

                const data = await response.json()

                dispatch(recievedAction.delete(props.user))
                dispatch(friendAction.add({name: props.user, room: data.room}))
            } catch(e) {
                alert(e)
            }
        }
    }

    return (
        <button className={style} onClick={clickHandler}>{props.name}</button>
    )
}

export default Button 