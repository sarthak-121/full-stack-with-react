import React from 'react'

import classes from './sidebar.css'

const sidebar = (props) => {

    return(
            <div className={classes.sidebar}>
                <h2 className={classes.heading}>Hi, {props.username}</h2>
                <hr/>
                <h2 className={classes.heading}>People</h2>
                {props.listOfPeople ?  props.listOfPeople: <p className={classes.msg}>No people Yet!</p>}
                <hr/>
                <h2 className={classes.heading}>Friends</h2>
                {props.listOfPeople ?  props.listOfPeople: <p className={classes.msg}>No people Yet!</p>}
                <hr/>
                <h2 className={classes.heading}>About</h2>
                <p className={classes.msg}>Sarthak Kavidayal</p>
                <p className={classes.msg}>&#169; 2021</p>
            </div>
    )
}

export default sidebar