import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './../utils/Loader'

function TeacherProfile() {

    const {username} = useParams()

    const [teacher, setTeacher] = useState('')
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
            console.log(err)
        }
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
            teacher === '' ? <h1>Teacher Not Found</h1> : 
            <div className='row'>
                <div className='col-12'>
                    <div className="p-3 mb-3 bg-light rounded">
                        <div className='d-flex justify-content-between'>
                            <div className='col-4 text-center'>
                                <img src={teacher.profile} alt="" className='rounded-circle' width='200px' height='200px' />
                            </div>
                            <div className='col-8'>
                                <div className=''>
                                    <div className='col-4'>
                                        <h4 className='mb-0 pb-0'>{teacher.name}</h4>
                                        <p>@{teacher.username}</p>
                                    </div>
                                    <div className='col-10'>
                                        <p>
                                            {teacher.education.description}
                                        </p>
                                    </div>
                                    <div className='mt-4 mb-3'>
                                        <button className='btn btn-primary me-2'>Hire Me</button>
                                        <button className='btn btn-outline-primary me-2'>Set Appointment</button>
                                        <button className='btn btn-primary me-2'>Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className="p-4 mb-3 bg-light rounded">
                            <h5>Personal</h5>
                            <div className='pt-3'>
                                <div className='row'>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-map-marker-alt text-primary"></i>
                                            <span>City</span>
                                        </div>
                                        <span className='mx-3'>{teacher.city}</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-star text-warning"></i>
                                            <span>Rating</span>
                                        </div>
                                        <span className='mx-3'>4.5</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-phone text-info"></i>
                                            <span>Phone</span>
                                        </div>
                                        <span className='mx-3'>{teacher.contactno}</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-money-bill-wave text-success"></i>
                                            <span>Mountly fee</span>
                                        </div>
                                        <span className='mx-3'>{teacher.availability.fee} PKR</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-clock text-success"></i>
                                            <span>Availibility</span>
                                        </div>
                                        <span className='mx-3'>{teacher.availability.hours} hours</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-calendar-alt text-success"></i>
                                            <span>Joined</span>
                                        </div>
                                        <span className='mx-3'>July 2023</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className="mx-3 fas fa-globe text-warning"></i>
                                            <span>Language</span>
                                        </div>
                                        <span className='mx-3'>{teacher.language}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 mb-3 bg-light rounded">
                            <h5>Education</h5>
                            <div className='pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <h6>{teacher.education.qualification} in {teacher.education.major}</h6>
                                </div>
                                <p className='my-2'>{teacher.education.institute}</p>
                                <span className='text-end d-block'>July {teacher.education.passedYear}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='row'>
                            <div className="p-4 mb-3 bg-light rounded">
                                <h5>Experience</h5>
                                <div className='pt-3'>
                                    <div className='row'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fas fa-briefcase text-primary"></i>
                                            <span className='mx-3'>I'm <strong>{teacher.experience.experience}</strong> level tutor having 3-4 years experience.</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fa-solid fa-heart text-danger"></i>
                                            <span className='mx-3'>My area of interest is <strong>{teacher.experience.interest} </strong> and related subjects.</span> 
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fa-solid fa-chalkboard-user text-dark"></i>
                                            <span className='mx-3'>I can teach <strong>{teacher.experience.subjectType} subject</strong> to <strong>{teacher.experience.subjectLevel}</strong> level students.</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fas fa-solid fa-bolt text-success"></i>
                                            <span className='mx-3'>I've huge expertise level in <strong>{teacher.experience.expertise} </strong>subjects.</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fa-solid fa-book text-info"></i>
                                            <span className='mx-3'>I can teach other subjects including <strong>{
                                                
                                                teacher.experience.multipleSubject.map((subject, index) => {
                                                    return (
                                                        <span key={index}>{subject}, </span>
                                                    )
                                                })

                                            }</strong> as well.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 mb-3 bg-light rounded">
                                <h5>Aailibility</h5>
                                <div className='pt-3'>
                                    <div className='row mb-3'>
                                        <h5 className='lead'>Days</h5>
                                        <div className='my-2'>
                                        <div className='d-flex'>
                                            {
                                                teacher.availability.days.map((day, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <span className='p-0 mx-3'>{day}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>   
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <h5 className='lead'>Shifts</h5>
                                        <div className='my-2'>
                                        <div className='d-flex'>
                                            {
                                                teacher.availability.timeslot.map((time, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <span className='p-0 mx-3'>{time}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        
        </>
    )

}

export default TeacherProfile