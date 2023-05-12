import React from 'react'

function Empty({image, title, subtitle}) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light my-3 rounded-3" style={{height: '85vh'}}>
        <img width="100" height="100" src={image} />
        <h1 className='m-3 display-5'>{title}</h1>
        <h5 className=''>{subtitle}</h5>
    </div>
  )
}

export default Empty