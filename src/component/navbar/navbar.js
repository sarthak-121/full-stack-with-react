import React, {useState} from 'react'
import classes from './navbar.css'
import avatar from '../assets/images/avatar.png'
import Dropdown from '../UI/dropdown/dropdown'

const Navbar = (props) => {
    const [userBtn, setUserBtn] = useState(false)

    const dropdownHandler = () => {
        userBtn ? setUserBtn(false) : setUserBtn(true)
    }

    return(
            <div className={classes.navbar}>
                <div className={classes.navbar_item}>
                    <a className={classes.navbar_link}>Application</a>
                </div>
                <div className={classes.navbar_item}>
                    {userBtn ? <Dropdown clickHandler={dropdownHandler} userdata={props.userdata}/> : null}
                    <button onClick={dropdownHandler} className={classes.user_btn}><img src={avatar} alt=""></img></button>
                </div> 
            </div>
    )
}

export default Navbar