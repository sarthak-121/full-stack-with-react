import React from 'react'

import classes from './list.css'

const list = (props) => {
    return(
        <div className={classes.container}>
            <div className={classes.head}>
                <p>{props.name}</p>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default list