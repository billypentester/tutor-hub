import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './../utils/Loader'
import TutorProfile from './../utils/TutorProfile'

function TeacherProfile() {

    const {username} = useParams()

    const [teacher, setTeacher] = useState('')
    const [appointment, setAppointment] = useState('')
    const [loading, setLoading] = useState(true)

    async function getTeacher() {
        try{
            setLoading(true)
            const res = await axios.get(`/api/teacher/profile/${username}`)
            console.log(res)
            setTeacher(res.data)
            setLoading(false)
        }
        catch(err) {
            setTeacher('')
            console.log(err)
        }
    }

    async function BookAppointment() {
        try{
            setLoading(true)
            appointment.teacher = teacher.username
            appointment.student = await JSON.parse(localStorage.getItem('student')).username
            const res = await axios.post('/api/student/appointment', appointment)
            console.log(res.data)
            setLoading(false)
        }
        catch(err) {
            console.log(err)
        }
    }

    const handleChanges = (e) => {
        setAppointment({...appointment, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        getTeacher()
    }, [])

    return (
        <>
        {
            loading && <Loader loading={loading} />
        }
        {
            teacher == null ?
            <div className="d-flex justify-content-center align-items-center bg-light my-3 rounded-3" style={{height: '85vh'}}>
                <h1>Teacher Not Found</h1>
            </div>
            :
            teacher &&  <TutorProfile teacher={teacher} myself={false} />  
        }

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Arrange Appointment</h5>
                        <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal">
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
                                            <input type="date" class="form-control" id="MeetingDate" placeholder="Enter Date" name='appointmentDate' value={appointment.appointmentDate} onChange={handleChanges}/>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div class="form-group">
                                            <label for="MeetingTime" class="form-label">Time</label>
                                            <input type="time" class="form-control" id="MeetingTime" placeholder="Enter Time" name='appointmentTime' value={appointment.appointmentTime} onChange={handleChanges}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="duration" class="form-label mt-4">Meeting duration (hours)</label>
                                        <input type="number" class="form-control" id="duration" placeholder="How much will it take?" name='duration' value={appointment.duration} onChange={handleChanges}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="MeetingDescription" class="form-label mt-4">What's the purpose of meeting?</label>
                                        <textarea class="form-control" id="MeetingDescription" rows="3" name='notes' value={appointment.notes} onChange={handleChanges}></textarea>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" onClick={BookAppointment}>Arrange Appointment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )

}

export default TeacherProfile