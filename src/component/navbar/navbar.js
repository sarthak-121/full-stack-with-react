import React from 'react'
import classes from './navbar.css'

const Navbar = (props) => {
    return(
        <div className={classes.navbar}>
            <div className={classes.navbar_item}>
                <a className={classes.navbar_link}>Application</a>
            </div>
            <div className={classes.navbar_item}>
                <a className={classes.navbar_link}>users</a>
            </div> 
        </div>
    )
}

export default Navbar