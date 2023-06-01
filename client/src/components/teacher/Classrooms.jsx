import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Empty from '../utils/Empty'
import Loader from '../utils/Loader'
import axios from 'axios'

function Classrooms() {

  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(false)

  const getClassrooms = async () => {
    try {
      setLoading(true)
      const {username} = JSON.parse(localStorage.getItem('teacher'))
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
      {
        !loading && classrooms.length === 0 && <Empty image="https://img.icons8.com/ios/100/classroom.png" title="No Classrooms" subtitle="You are not enrolled in any classrooms yet." />
      }
      {
        !loading && classrooms.length > 0 &&
        <div className='p-4'>
        <div className='row'>
        {
          !loading && classrooms.length > 0 && 
          classrooms.map(classroom => (
            <Link className='col-4' style={{textDecoration: 'none'}} to={`/teacher/dashboard/class/${classroom._id}`} key={classroom._id}>
              <div className='m-1 bg-light border-secondary shadow-lg rounded-3 p-0 text-dark'>
                <div className='d-flex justify-content-between align-items-center p-3 bg-info text-white rounded-top'>
                  <div className='d-flex flex-column'>
                    <h3 className='text-white mb-1'>{classroom.name}</h3>
                    <p className='lead mb-0'>{classroom.student.name}</p>
                  </div>
                  <img src={classroom.student.profile} alt="classroom" className="rounded-circle" width="80" height="80" />
                </div>
                <div className='d-flex flex-wrap p-3'>
                  {
                    classroom.subjects.map(subject => (
                      <span key={subject.name} className="px-3 py-1 bg-info rounded-pill text-white m-2">{subject.name}</span>
                    ))
                  }
                </div>
                <hr className='mx-4 my-0'/>
                <div className='d-flex flex-column p-4'>
                  <span className="subject">Class Timing : <strong>{formatTime(classroom.schedule.startTime)} - {formatTime(classroom.schedule.endTime)}</strong></span>
                </div>
              </div>
            </Link>
          ))
        }
        </div>
      </div>
      }
    </>
  )
}

export default Classrooms