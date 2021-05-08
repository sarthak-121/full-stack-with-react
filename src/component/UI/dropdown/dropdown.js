import React from 'react'

import classes from './dropdown.css'
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../backdrop/backdrop'

const dropdown = (props) => {
    return(
        <Aux>    
            <Backdrop clickHandler={props.clickHandler}/>
            <div className={classes.container}>
                <p className={classes.name}>{props.userdata.username}</p>
                <p className={classes.email}>{props.userdata.email}</p>
                <div><hr/></div>
                <button className={classes.dropdown_items}>Requests</button>
                <button className={classes.dropdown_items}>Settings</button>
            </div>
        </Aux>
    )
}

export default dropdown