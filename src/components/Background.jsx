import React from 'react'
import crgImg from '../images/cryptogam.jpg'

const Background = props => {
  let divStyle = {
    width: '100%',
    height: '400px',
    backgroundImage: 'url(' + crgImg + ')',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <div style={divStyle}>
      {props.children}
    </div>
  )
}

export default Background
