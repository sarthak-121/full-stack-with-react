import React from 'react'

import classes from './style.css'
import Aux from '../../hoc/Auxillary'

const signup = (props) => {
    return (
        <Aux>
            <label className={classes.label}>Username</label>
            <br/>
            <input  className={classes.input_field} type="text" placeholder="Username" required />
            <br/>
            <label className={classes.label}>Email</label>
            <br />
            <input className={classes.input_field} type="email" placeholder="example@gmail.com" required />
            <br />
            <label className={classes.label}>Password</label>
            <br />
            <input className={classes.input_field} type="Password" placeholder="password" required />
            <br />
            <label className={classes.label}>Confirm Password</label>
            <br />
            <input className={classes.input_field} type="Password" placeholder="password" required />
            <br />
            <h6 id="error-msg"></h6>
            <button className={classes.submit_btn} >Submit</button>
            <hr />
        </Aux>
    )
}

export default signup