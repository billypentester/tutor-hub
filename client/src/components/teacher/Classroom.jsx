import React, {useState ,useEffect} from 'react'
import Empty from '../utils/Empty'
import Loader from '../utils/Loader'
import axios from 'axios'

function Classroom() {

  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(false)

  const getClassrooms = async () => {
    try {
      setLoading(true)
      const {username} = JSON.parse(localStorage.getItem('teacher'))
      console.log(username)
      const response = await axios.post('/api/teacher/getclassrooms', {username})
      setClassrooms(response.data)
      setLoading(false)
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClassrooms()
  }, [])

  return (
    <>
      {
        loading && <Loader />
      }
        <div className='my-4'>
          <div className='row'>
            {
              classrooms.length > 0 && classrooms.map(classroom => (
                <div className='col-4 bg-light border border-primary rounded-3'>
                  <h3>{classroom.teacher}</h3>
                  <h4>{classroom.student}</h4>
                  <p>
                    {
                      classroom.subjects.map(subject => (
                        <span key={subject.name} className="subject">{subject.name}</span>
                      ))
                    }
                  </p>
                </div>
              ))
            }
          </div>
        </div>
        {/* <Empty image="https://img.icons8.com/ios/100/classroom.png" title="No Classrooms" subtitle="There's no student enrolled with you yet." /> */}
    </>
  )
}

export default Classroom