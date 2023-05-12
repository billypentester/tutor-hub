import React, {useState, useEffect} from 'react'
import Loader from '../utils/Loader'
import Empty from '../utils/Empty'
import axios from 'axios'

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  function formatTime(timeStr) {
      let [hours, minutes] = timeStr.split(":").map(Number);
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
  }


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
          <Empty image="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/150/external-appointment-gdpr-smashingstocks-mixed-smashing-stocks.png" title="No Appointments" subtitle="You have not booked any appointments yet." />
        :
        appointments &&
          <div className="container my-5">
            <h1 className="display-5 text-center my-5">Appointments</h1>
            <div className="row">
              {
                appointments.map(appointment => (
                  <div className="col-12 mb-4" key={appointment._id}>
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className='d-flex m-3 align-items-center'>
                            <img src={appointment.teacher.profile} alt="profile" className="rounded-circle" style={{width: '100px', height: '100px'}} />
                            <div className='d-flex flex-column m-3'>
                              <h4 className="card-text">{appointment.teacher.name}</h4>
                              <h5 className="card-text lead">{appointment.teacher.username}</h5>
                            </div>
                          </div>
                          <div className='d-flex flex-column m-3 align-items-center'>
                            <i className="fa-solid fa-calendar fa-2x mb-3"></i>
                            <h5 className="card-text">{formatDate(appointment.appointmentDate)}</h5>
                          </div>
                          <div className='d-flex flex-column m-3 align-items-center'>
                            <i className="fa-solid fa-clock fa-2x mb-3"></i>
                            <h5 className="card-text">{formatTime(appointment.appointmentTime)}</h5>
                          </div>
                          <div className='d-flex flex-column m-3 align-items-center'>
                            <i className="fa-solid fa-stopwatch fa-2x mb-3"></i>
                            <h5 className='card-text'>{appointment.duration} minutes</h5>
                          </div>
                          <div className='d-flex flex-column m-3 align-items-center'>
                            <i className="fa-solid fa-hourglass-start fa-2x mb-3"></i>
                            <h5 className="card-text">{appointment.status ? appointment.status : 'Pending'}</h5>
                          </div>
                          <div className='d-flex flex-column m-3 align-items-center'>
                            {
                              appointment.status === 'Completed' ?
                              <button className="btn btn-success btn-lg" disabled={appointment.status === 'Cancelled' || appointment.status === 'Completed' ? true : false}>Completed</button>
                              :
                              <button className="btn btn-danger btn-lg" disabled={appointment.status === 'Cancelled' || appointment.status === 'Completed' ? true : false}>Cancelled</button>
                            }
                          </div>
                        </div>
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