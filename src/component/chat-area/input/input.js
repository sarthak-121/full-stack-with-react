import React from 'react'

import classes from './input.css'

const input = (props) => {
    return(
        <div className={classes.msg_input}>
            <input className={classes.text_input} placeholder="Enter msg here... "></input>
            <button className={classes.send_btn}>Send</button>
        </div>
    )
}

export default input