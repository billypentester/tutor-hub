import React from 'react'
import { useParams } from 'react-router-dom'

function Verifier() {

    const { status } = useParams()

    console.log(status)

  return (
    <div>
        {
            status == 'true' ? <h1>Success</h1> : <h1>Check your email</h1>
        }
    </div>
  )
}

export default Verifier