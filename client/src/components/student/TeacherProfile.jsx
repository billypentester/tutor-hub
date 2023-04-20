import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function TeacherProfile() {

    const {username} = useParams()

    const [teacher, setTeacher] = useState('')

    async function getTeacher() {
        try{
            const res = await axios.get(`/api/teacher/profile/${username}`)
            console.log(res)
            setTeacher(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTeacher()
    }, [])

    return (
        <div className='row'>
            <div className='col-12'>
                <div className="p-3 mb-3 bg-light rounded">
                    <div className='d-flex justify-content-between'>
                        <div className='col-3 text-center'>
                            <img src={teacher.profile} alt="" className='img-fluid rounded-circle' />
                        </div>
                        <div className='col-8'>
                            <h4>{teacher.name}</h4>
                            <p>@{teacher.username}</p>
                            <div className='col-8'>
                                <div className='d-flex justify-content-evenly my-4'>
                                    <div>
                                        <span className='me-2 d-block'>Rating</span>
                                        <div className='d-flex'>
                                            <i className="fas fa-star"></i>
                                            <span className='me-2 d-block'>4.5</span>                                        
                                        </div>
                                    </div>
                                    <div>
                                        <span className='me-2 d-block'>Experience</span>
                                        <div className='d-flex'>
                                            <i className="fas fa-briefcase"></i>
                                            <span className='me-2 d-block'>professional</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='me-2 d-block'>Qualification</span>
                                        <div className='d-flex'>
                                            <i className="fas fa-graduation-cap"></i>
                                            <span className='me-2 d-block'>{teacher.education.qualification}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='btn btn-primary me-2'>Hire Me</button>
                                <button className='btn btn-primary me-2'>Set Appointment</button>
                                <button className='btn btn-primary me-2'>Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 row'>
                <div className='col-4'>
                    <div className="p-3 mb-3 bg-light rounded">
                        <h5>Personal Details</h5>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <span className='me-2 d-block'>Name</span>
                                <span className='me-2 d-block'>Email</span>
                                <span className='me-2 d-block'>Phone</span>
                            </div>
                            <div>
                                <span className='me-2 d-block'>{teacher.name}</span>
                                <span className='me-2 d-block'>{teacher.email}</span>
                                <span className='me-2 d-block'>{teacher.contactno}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='row'>
                        <div className="p-3 mb-3 bg-light rounded">
                            <h5>Experience</h5>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <span className='me-2 d-block'>Experience</span>
                                    <span className='me-2 d-block'>Qualification</span>
                                    <span className='me-2 d-block'>Institute</span>
                                    <span className='me-2 d-block'>Subjects</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 mb-3 bg-light rounded">
                            <h5>Teaching Style</h5>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <span className='me-2 d-block'>Teaching Style</span>
                                    <span className='me-2 d-block'>Teaching Method</span>
                                    <span className='me-2 d-block'>Teaching Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default TeacherProfile