import React from 'react'

import classes from './list.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const List = (props) => {
    const friends = useSelector(state => state.friends)
    let room = ''

    friends.forEach(friend => {
        if(friend.name === props.name) {
            room = friend.room
        }
    })

    return(
        <div className={classes.list}> 
            <p className={classes.names}>{props.name}</p>
            {props.bin ? 
            <button onClick={props.click} className={classes.add_btn}>+</button> : 
            <Link to={`/connect/${props.name}/${room}`} className={classes.add_btn}>{">"}</Link>}
        </div>
    )
}

export default List