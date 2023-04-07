import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Statistics() {

  const [statistics, setStatistics] = useState([])

  const getStatistics = async () => {
    const res = await axios.get('/api/admin/statistics')
    console.log(res.data)
    setStatistics(res.data)
  }

  useEffect(() => {
    getStatistics()
  }, [])

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-primary mx-1">
            <div className='text-center'>
              <i className="fas fa-users display-5 text-white"></i>
            </div>  
            <div>
              <h1 className="display-6 text-center text-white">{statistics.studentCount}</h1>
              <h5 className='my-2 text-center text-white'>Students</h5> 
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-success mx-1">
            <div className='text-center'>
              <i className="fas fa-chalkboard-teacher display-5 text-white"></i>
            </div>
            <div>
              <h1 className="display-6 text-center text-white">{statistics.teacherCount}</h1>
              <h5 className='my-2 text-center text-white'>Teachers</h5>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-warning mx-1">
            <div className='text-center'>
              <i className="fas fa-envelope display-5 text-white"></i>
            </div>
            <div>
              <h1 className="display-6 text-center text-white">{statistics.contactCount}</h1>
              <h5 className='my-2 text-center text-white'>Messages</h5>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-danger mx-1">
            <div className='text-center'>
              <i className="fas fa-calendar-alt display-5 text-white"></i>
            </div>
            <div>
              <h1 className="display-6 text-center text-white">0</h1>
              <h5 className='my-2 text-center text-white'>Appointments</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics