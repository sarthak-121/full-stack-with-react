import React, {Component} from 'react'

import classes from './chat.css'
import Navbar from './sc-navbar/sc-navbar'
import Message from './msg/msg'
import MsgInput from './input/input'

class Chat extends Component {
    render() {
        return(
            <div className={classes.chatarea}>
                <Navbar/>
                <div className={classes.msg}>
                    <Message classs={classes.msg_send}/>
                    <br/>
                    <Message classs={classes.msg_recieved}/>
                </div>
                <MsgInput/>
            </div>
        )
    }

}

export default Chat