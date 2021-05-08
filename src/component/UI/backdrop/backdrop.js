import React from 'react'

import classes from './backdrop.css'

const backdrop = (props) => {
   let styleClass = [classes.backdrop]

   if(props.clickHandler) {
      styleClass.push(classes.plain)
   }

   return (
      <div className={styleClass.join(' ')} onClick={props.clickHandler}></div>
   )
}

export default backdrop