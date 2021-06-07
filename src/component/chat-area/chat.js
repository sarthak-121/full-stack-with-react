import React, {useEffect, useState} from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import classes from './chat.css'
import Navbar from './sc-navbar/sc-navbar'
import Message from './msg/msg'
import MsgInput from './input/input'
import Aux from '../../hoc/Auxillary'
import {useParams} from 'react-router-dom'

const chat = (props) => {   
    const [messages, setMessages] = useState([])
    const [renderedList, setRenderedList] = useState([])
    const params = useParams()
    const room = params.room

    useEffect(() => {
        props.socket.emit('join', {room})
    }, [])

    useEffect(() => {
        let counter = 0
        const generatedList = (
            <Aux>
                {messages.map(msg => {
                    counter += 1
                    return <Message txt={msg.txt} end={msg.end} key={counter} time={msg.time}/>
                })}
            </Aux>
        )

        setRenderedList(generatedList)
    }, [messages, setRenderedList])
    
    useEffect(() => {
        props.socket.on('messageSend', msg => {
            setMessages(preState => {
                return [...preState, msg]
            })
        })
    }, [setMessages])

    const sendMsgHandler = (msg) => {
        const date = new Date()
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        setMessages(preState => {
            return [...preState, {txt: msg, end: true, time}]
        })
        props.socket.emit('messageRecieved', {txt: msg, end: false, time})
    }
    
    return(
        <div className={classes.chatarea}>
            <Navbar/>
            <ScrollableFeed className={classes.msg}>
                {renderedList}  
            </ScrollableFeed>
            <MsgInput click={sendMsgHandler}/>
        </div>
    )

}

export default chat