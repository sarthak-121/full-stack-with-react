import React from 'react'

import classes from './sc-navbar.css'
import {useParams} from 'react-router-dom'

const navbar = () => {
    const params = useParams()

    return(
        <div className={classes.navbar}>
            <div className={classes.navbar_item}>
                <a className={classes.navbar_link}>{params.user}</a>
            </div>
            <div className={classes.navbar_item}>
                <a className={classes.navbar_link}>Options</a>
            </div> 
         </div>
    )
}


export default navbar