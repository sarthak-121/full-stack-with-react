import React from 'react'

import classes from './model.css'
import Backdrop from '../backdrop/backdrop'
import Aux from '../../../hoc/Auxillary'

const model = (props) => {
    return (
        <Aux>
            <Backdrop/>
            <div className={classes.model}>  
                {props.children}  
            </div>
        </Aux>
    )
}

export default model