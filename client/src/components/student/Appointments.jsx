import React, {useState, useEffect} from 'react'
import Loader from '../utils/Loader'
import axios from 'axios'

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true)
      const {data} = await axios.post('/api/student/appointment/get', {student: JSON.parse(localStorage.getItem('student')).username})
      setAppointments(data)
      setLoading(false)
    }
    getAppointments()
  }, [])

  return (
    <>
      {
        loading && <Loader />
      }
      {
        appointments.length === 0 ?
          <div className="d-flex justify-content-center align-items-center bg-light my-3 rounded-3" style={{height: '85vh'}}>
              <h1>Appointment Not Found</h1>
          </div>
        :
        appointments &&
          <div className="container my-5">
            <h1 className="display-5 text-center my-5">Appointments</h1>
            <div className="row">
              {
                appointments.map(appointment => (
                  <div className="col-12" key={appointment._id}>
                    <div className="card shadow">
                      <div className="card-body">
                        <p className="card-text">{appointment.teacher.name}</p>
                        <img src={appointment.teacher.profile} alt="profile" className="rounded-circle" style={{width: '50px', height: '50px'}} />
                        <p className="card-text">{appointment.teacher.username}</p>
                        <p className="card-text">{appointment.appointmentDate}</p>
                        <p className="card-text">{appointment.appointmentTime}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
      }
    </>
  )
}

export default Appointments