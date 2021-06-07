import React from 'react'

import classes from './requests.css'
import { useSelector } from 'react-redux'
import {Route, Switch, NavLink} from 'react-router-dom'
import useMakeReqList from '../../hooks/use-makeReqList'

const requests = () => {
    let sendedList = useSelector(state => state.sended)
    let recievedList = useSelector(state => state.recieved)

    let generatedSendedList = <h6>No requests yet!</h6>
    let generatedRecievedList = <h6>No requests yet!</h6>

    if(sendedList !== undefined && sendedList.length !== 0) {
        generatedSendedList = useMakeReqList(sendedList, true)
    }
    if(recievedList !== undefined && recievedList.length !== 0) {
        generatedRecievedList = useMakeReqList(recievedList, false)
    }

    return(
        <div className={classes.requests}>
            <div className={classes.head}>
                <h4>Requests</h4>
                <ul>
                    <NavLink activeClassName={classes.active} className={classes.toggel_btn} to='/requests/sended'>
                        Sended
                    </NavLink>
                    <NavLink activeClassName={classes.active} className={classes.toggel_btn} to='/requests/recieved'>
                        Recieved
                    </NavLink>
                </ul>
            </div>
            <Switch>
            <Route path='/requests/sended'>
                {generatedSendedList}
            </Route>
            <Route path='/requests/recieved'>
                {generatedRecievedList}
            </Route>
            <Route path='*'>
                Not found
            </Route>
            </Switch>
        </div>
    )
}

export default requests