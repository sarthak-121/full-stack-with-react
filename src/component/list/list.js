import React from 'react'

import classes from './list.css'

const List = (props) => {

    return(
        <div className={classes.list}> 
            <p className={classes.names}>{props.name}</p>
            <button onClick={props.click} className={classes.add_btn}>+</button>
        </div>
    )
}

export default List