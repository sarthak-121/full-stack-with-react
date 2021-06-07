import React, { useState, useEffect} from 'react'

import classes from './input.css'

const input = (props) => {
    const [msg, setMsg] = useState('')


    const sendBtnHandler = () => {
        console.log('msg:==== ', msg);
        if(msg !== '') {
            props.click(msg)
            setMsg('')
        }
    }

    const handleKeypress = e => {
      if (e.charCode === 13 || e.code === 'Enter') {
        sendBtnHandler();
      }
    };

    return(
        <div className={classes.msg_input}>
            <input 
            className={classes.text_input} 
            placeholder="Enter message here... "
            value={msg}
            onChange={event => setMsg(event.target.value)} 
            onKeyPress={handleKeypress}
            />
            <button className={classes.send_btn} onClick={sendBtnHandler}>Send</button>
        </div>
    )
}

export default input