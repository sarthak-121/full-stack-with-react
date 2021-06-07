import React from 'react'

import classes from './msg.css'

const msg = (props) => {
    const style = props.end ? classes.msg_send : classes.msg_recieved
  
    return(
        <div className={style}>
            <p className={classes.text}>{props.txt}</p>
            <p className={classes.time}>{props.time}</p>
        </div>
    )
}

export default msg