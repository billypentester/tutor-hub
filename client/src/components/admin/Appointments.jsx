import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'

function Appointments() {

    const [appointment, setAppointment] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const fetchAppointment = async () => {
      setLoading(true)
      const res = await axios.get('/api/appointment/all')
      setAppointment(res.data)
      setLoading(false)
    }

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

    const searchAppointment = async (e) => {   
        const {value} = e.target
        console.log(value)
        if(value.length > 0) {
            setAppointment(appointment.filter(appointment => appointment.student.toLowerCase().includes(value.toLowerCase())))
        }
        else {
            fetchAppointment()
        }
    }

    useEffect(() => {
        fetchAppointment()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Appointment</h1>
            <div className="d-flex justify-content-end align-items-center">
                {/* <button type="button" className="btn btn-primary">Add Appointment</button> */}
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Enter student name" name="search" onChange={searchAppointment} aria-label="Search" />
                    <button className="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <hr />
            <table class="table table-hover align-middle">
            <thead>
                <tr class="table-dark text-center">
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Student</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Action</th> */}
                </tr>
            </thead>
            <tbody>  
                {
                    loading && <Loader />
                }
                {
                    (appointment.length > 0) ? appointment.map((appointment, index) => (
                        <tr key={appointment._id} class="table-secondary text-center">
                            <th scope="row">{index + 1}</th>
                            <td>{formatDate(formatDate(appointment.createdAt))}</td>
                            <td>{appointment.student}</td>
                            <td>{formatDate(appointment.appointmentDate)}</td>
                            <td>{formatTime(appointment.appointmentTime)}</td>
                            <td>{appointment.duration} min</td>
                            <td>
                              {
                                appointment.status === 'Pending' ? <span className="badge bg-warning text-dark">{appointment.status}</span> :
                                appointment.status === 'Accepted' ? <span className="badge bg-success">{appointment.status}</span> :
                                <span className="badge bg-danger">{appointment.status}</span>
                              }
                            </td>
                            {/* <td>
                                <button type="button" class="mx-2 btn btn-warning">Update</button>
                                <button type="button" class="mx-2 btn btn-danger">Delete</button>
                            </td> */}
                        </tr>
                    ))
                    :
                    <tr class="table-secondary text-center">
                        <td colSpan="7">No Appointment Found</td>
                    </tr>
                }
            </tbody>
            {
                alert.message && <Alert type={alert.type} message={alert.message} />
            }
            </table>
        </div>
    )
}

export default Appointments