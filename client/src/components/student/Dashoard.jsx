import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Dashoard() {

    const { id } = useParams()
    const [student, setStudent] = useState([])

    async function getStudent() {
      const res = await axios.get(`http://localhost:3000/student/details/${id}`)
      console.log(res.data)
      setStudent(res.data)
    }

    useEffect(() => {
      getStudent()
    }, [id])


  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>{student.name}</h2>
      <h2>{student.email}</h2>
      <h2>{student.username}</h2>
    </div>
  )
}

export default Dashoard