import React, {useState, useEffect} from 'react'
import Loader from '../utils/Loader'
import Empty from '../utils/Empty'
import axios from 'axios'

function Appointments() {

    const [appointments, setAppointments] = useState([])
    const [link, setLink] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)

    const getAppointments = async () => {
        setLoading(true)
        const {data} = await axios.post('/api/teacher/appointment/get', {teacher: JSON.parse(localStorage.getItem('teacher')).username})
        setAppointments(data)
        setLoading(false)
    }

    useEffect(() => {
        getAppointments()
    }, [update])

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

    function cancelAppointment(appointment) {
        setLoading(true)
        const {data} = axios.post('/api/teacher/appointment/cancel', {appointment})
        setUpdate(!update)
        setLoading(false)
    }

    const acceptAppointment = async (appointment) => {
        setLoading(true)
        const {data} = await axios.post('/api/teacher/appointment/accept', {appointment, link})
        setUpdate(!update)
        setLoading(false)
    }

    const modifyAppointment = async (appointment) => {
        setLoading(true)
        const {data} = await axios.post('/api/teacher/appointment/modify', {
            appointment: appointment,
            date: date,
            time: time
        })
        console.log(data)
        setUpdate(!update)
        setLoading(false)
    }

    function separateLinkAndText(inputString) {
        const regex = new RegExp(/(https?:\/\/[^\s]+)/g);
        const match = regex.exec(inputString);

        if(match) {
            const link = match[0];
            const text = inputString.replace(link, "").trim();
            return [link, text];
        }
        else {
            return [null, inputString];
        }
    }
      
      

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
                        appointments.map((appointment, index) => (
                        <div className="col-12 mb-4" key={appointment._id}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className='col-5 d-flex m-3 align-items-center'>
                                            <img src={appointment.student.profile} alt="profile" className="rounded-circle" style={{width: '100px', height: '100px'}} />
                                            <div className='d-flex flex-column m-3'>
                                            <h4 className="card-text">{appointment.student.name}</h4>
                                            <h5 className="card-text lead">{appointment.student.username}</h5>
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
                                            {
                                                appointment.status === 'Accepted' &&
                                                <>
                                                    <i className="fa-solid fa-check fa-2x mb-3"></i>
                                                    <h5 className="card-text text-success">{appointment.status}</h5>
                                                </>                                                
                                            }
                                            {
                                                appointment.status === 'Pending' &&
                                                <>
                                                    <i className="fa-solid fa-hourglass-start fa-2x mb-3"></i>
                                                    <h5 className="card-text text-warning">{appointment.status}</h5>
                                                </>
                                            }
                                            {
                                                appointment.status === 'Cancelled' &&
                                                <>
                                                    <i className="fa-solid fa-times fa-2x mb-3"></i>
                                                    <h5 className="card-text text-danger">{appointment.status}</h5>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-column">
                                        <div>
                                            <h5 className="card-text">Notes</h5>
                                            {
                                                appointment.status !== 'Accepted' ?
                                                <p className="card-text">{appointment.notes}</p>
                                                :
                                                <div className="d-flex">
                                                    <p className="card-text me-2">{separateLinkAndText(appointment.notes)[1]}</p>
                                                    <a href={separateLinkAndText(appointment.notes)[0]} target="_blank" className="card-text">{separateLinkAndText(appointment.notes)[0]}</a>
                                                </div>
                                            }
                                        </div>
                                        <div className='row justify-content-center mt-4'>
                                            <button id={appointment._id} className="col-3 mx-2 btn btn-warning" data-toggle="modal" data-target={`#modifyAppointment${index}`}>Modify</button>
                                            <button className="col-3 mx-2 btn btn-success" data-toggle="modal" data-target={`#acceptAppointment${index}`}>Accept</button>
                                            <button className="col-3 mx-2 btn btn-danger" onClick={()=>{cancelAppointment(appointment._id)}}>Cancel</button>
                                        </div>
                                    </div>

                                    <div className="modal fade" id={`acceptAppointment${index}`} tabIndex="-1" aria-labelledby="acceptAppointmentLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Meeting Link</h5>
                                                <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target={`#acceptAppointment${index}`}>
                                                    <span aria-hidden="true"></span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label class="form-label" htmlFor="meetingLink">Meeting Link</label>
                                                    <input type="text" className="form-control" id="meetingLink" placeholder="Enter Meeting Link" onChange={(e)=>{setLink(e.target.value)}} />
                                                </div>
                                                <button type="button" className="btn btn-success mt-4 w-100" data-dismiss="modal" data-toggle="modal" data-target="#acceptAppointment" onClick={()=>{acceptAppointment(appointment._id)}}>Approve</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal fade" id={`modifyAppointment${index}`} tabindex="-1" aria-labelledby="modifyAppointmentLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">modify Appointment</h5>
                                                    <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target={`#modifyAppointment${index}`}>
                                                    <span aria-hidden="true"></span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form>
                                                        <div className="row justify-content-center">
                                                            <div className='row'>
                                                                <div className='col-6'>
                                                                    <div class="form-group">
                                                                        <label for="MeetingDate" class="form-label">Date</label>
                                                                        <input type="date" class="form-control" id="MeetingDate" placeholder="Enter Date" name='appointmentDate' onChange={(e)=>{ setDate(e.target.value) }}/>
                                                                    </div>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <div class="form-group">
                                                                        <label for="MeetingTime" class="form-label">Time</label>
                                                                        <input type="time" class="form-control" id="MeetingTime" placeholder="Enter Time" name='appointmentTime' onChange={(e)=>{ setTime(e.target.value) }}/>
                                                                    </div>
                                                                </div>
                                                            </div>                                    
                                                            <div className='d-flex justify-content-center'>
                                                                <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={()=>{modifyAppointment(appointment._id)}}>Modify Appointment</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
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