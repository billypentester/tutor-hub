import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './../utils/Loader'
import TutorProfile from './../utils/TutorProfile'
import  {useNavigate} from 'react-router-dom'

function TeacherProfile() {

    const {username} = useParams()
    const navigate = useNavigate()

    const [teacher, setTeacher] = useState('')
    const [appointment, setAppointment] = useState('')
    const [payment, setPayment] = useState('')
    const [loading, setLoading] = useState(true)

    const handlePayment = (e) => {
        const name = e.target.name;
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setPayment({...payment, fee: teacher.availability.fee, [name]: value, totalFee: value.length * teacher.availability.fee})
    }

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

    const sendPayment = async () => {
        const url = `http://localhost:5000/student/payment/?fee=${teacher.availability.fee}&teacher=${teacher.username}&student=${JSON.parse(localStorage.getItem('student')).username}&multipleSubjects=${JSON.stringify(payment.multipleSubject)}`;
        window.location.href = url
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

        <div className="modal fade" id="payment" tabindex="-1" aria-labelledby="paymentLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Payment Checkout</h5>
                        <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#payment">
                        <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row justify-content-center">
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="fee" class="form-label">Fee per subject</label>
                                        <input disabled type="text" class="form-control" id="fee" placeholder="Amount" name='fee' value={teacher && teacher.availability.fee}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group">
                                        <label for="MultipleSubject" class="form-label mt-4">Select subjects that you want to learn</label>
                                        <select multiple class="form-select" id="MultipleSubject" name="multipleSubject" value={payment.multipleSubject} onChange={handlePayment}>
                                        <option>Choose...</option>
                                        <option value="Islamic Studies">Islamic Studies</option>
                                        <option value="Social Studies">Social Studies</option>
                                        <option value="Science">Science (Physics, Chemistry)</option>
                                        <option value="Math">Math</option>
                                        <option value="Urdu">Urdu</option>
                                        <option value="English">English</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Arabic">Arabic</option>
                                        <option value="Others">Others</option>
                                        </select>
                                    </div>    
                                </div>
                                <div className='row mt-4'>
                                    <div className='bg-light p-4 rounded-3'>
                                        <h5 className='mb-2'>Payment Summary</h5>
                                        <div className='row justify-content-center my-3'>
                                            <div className='col-5'>
                                                <p className="mb-0">Fee per subject</p>
                                                <p className="mb-0">Number of subjects</p>
                                                <p className="mb-0">Total Fee</p>
                                            </div>
                                            <div className='col-5 text-end'>
                                                <p className="mb-0">{teacher && teacher.availability.fee}</p>
                                                <p className="mb-0">{payment.multipleSubject && payment.multipleSubject.length ? payment.multipleSubject.length : 0}</p>
                                                <p className="mb-0">{teacher && teacher.availability.fee * (payment.multipleSubject && payment.multipleSubject.length ? payment.multipleSubject.length : 0)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" onClick={sendPayment}>Go to Checkout</button>
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