import React, {useState, useEffect, useCallback} from 'react'

import classes from './sidebar.css'
import List from '../list/list'

const sidebar = (props) => {

    const [peopleList, setPeopleList] = useState(['sarthak', 'maverick', 'protaker', 'motu'])
    const [friendsList, setFriendsList] = useState(['prashant', 'sarthak', 'maverick', 'protaker', 'motu'])

    useEffect(() => {
      if(props.authenticated) {
        getFriendsLists()
        getPeopleList()
      }

    }, [props.authenticated, getPeopleList, getPeopleList])

    const getFriendsLists = useCallback(async () => {

    }, [])

    const getPeopleList = useCallback(async () => {
      try{
        const response = await fetch('http://localhost:8080/people', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
        })
        if(!response.ok){
          throw new Error("something went wrong")
        }
        const data = await response.json()
        setPeopleList(data)
      }
      catch(e) {
        console.log(e)
      }
    }, [])

    let counter = 0
    let renderedPeopleList = (
        <div>
          {peopleList.map(people => {
            counter += 1
            if(people === props.username) {
              return null
            }

            if(people.length > 23) {
              people = people.slice(0,20) + '...'
            }

            return ( <List 
              name={people} 
              click={() => sendRequest(people)}
              key={counter}/>)
          })}
        </div>
      )
  
      if(renderedPeopleList.props.children.length === 0) {
        renderedPeopleList = null
      }
      
    const sendRequest = (people) => {
        console.log(people)
    }

    return(
            <div className={classes.sidebar}>
                <h2 className={classes.heading}>Hi, {props.username}</h2>
                <hr/>
                <h2 className={classes.heading}>People</h2>
                {renderedPeopleList ?  renderedPeopleList : <p className={classes.msg}>No people Yet!</p>}
                <hr/>
                <h2 className={classes.heading}>Friends</h2>
                {renderedPeopleList ?  renderedPeopleList : <p className={classes.msg}>No people Yet!</p>}
                <hr/>
                <h2 className={classes.heading}>About</h2>
                <p className={classes.msg}>Sarthak Kavidayal</p>
                <p className={classes.msg}>&#169; 2021</p>
            </div>
    )
}

export default sidebar