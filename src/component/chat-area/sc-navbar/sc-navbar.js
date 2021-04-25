import React from 'react'

import classes from './sc-navbar.css'

const navbar = (props) => {
    return(
        <div className={classes.navbar}>
            <div className={classes.navbar_item}>
                <a className={classes.navbar_link}>Username</a>
            </div>
            <div className={classes.navbar_item}>
                <a className={classes.navbar_link}>Options</a>
            </div> 
         </div>
    )
}


export default navbar