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

  function formatTime(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
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
          <div className='d-flex'>
            {
              classrooms.length > 0 ? classrooms.map(classroom => (
                <div className='col-4 bg-light border border-primary rounded-3 p-0'>
                  <div className='d-flex justify-content-between align-items-center p-3 bg-primary text-white rounded-top'>
                    <div className='d-flex flex-column'>
                      <h3 className='text-white'>{classroom.name}</h3>
                      <p className='lead'>{classroom.teacher}</p>
                    </div>
                    <img src="https://img.icons8.com/ios/100/classroom.png" alt="classroom" className="img-circle" />
                  </div>
                  <div className='d-flex flex-column p-3'>
                    {
                      classroom.subjects.map(subject => (
                        <span key={subject.name} className="subject">{subject.name}</span>
                      ))
                    }
                  </div>
                  <hr className='my-0'/>
                  <div className='d-flex justify-content-between align-items-center p-3'>
                    {
                      formatTime(classroom.schedule.startTime) + ' - ' + formatTime(classroom.schedule.endTime)
                    }
                  </div>
                </div>
              ))
              :
              <Empty image="https://img.icons8.com/ios/100/classroom.png" title="No Classrooms" subtitle="There's no student enrolled with you yet." />
            }
          </div>
        </div>
    </>
  )
}

export default Classroom