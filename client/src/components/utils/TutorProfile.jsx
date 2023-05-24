import React from 'react'

function TutorProfile({teacher, myself}) {

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

    return (
        <div className='row my-4'>
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
                                {
                                    myself && myself ? 
                                    <div className='mt-4 mb-3'>
                                        <button className='btn btn-primary'>Edit Profile</button>
                                    </div>
                                    :
                                    <div className='mt-4 mb-3'>
                                        <button className='btn btn-primary me-2' data-toggle="modal" data-target="#payment">Hire Me</button>
                                        <button className='btn btn-outline-primary me-2' data-toggle="modal" data-target="#exampleModal">Set Appointment</button>
                                        <button className='btn btn-outline-primary me-2' data-toggle="modal" data-target="#message">Message</button>
                                    </div>
                                }
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
                                    <span className='mx-3'>{teacher.rating}</span>
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
                                    <span className='mx-3'>{teacher.availability.hour} hours</span>
                                </div>
                                <div className='d-flex justify-content-between mb-2'>
                                    <div className='d-flex align-items-center'>
                                        <i className="mx-3 fas fa-calendar-alt text-success"></i>
                                        <span>Joined</span>
                                    </div>
                                    <span className='mx-3'>{formatDate(teacher.joinedDate)}</span>
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
                                        <span className='mx-3'>I'm <strong>{teacher.experience.experience}</strong> level tutor having vast experience.</span>
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
                                        <div className='d-flex flex-wrap'>
                                            {
                                                teacher.availability.days.map((day, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='px-3 py-2 m-2 border rounded-pill text-white bg-info border-1 border-info text-capitalize'>
                                                                <span className='p-0 mx-3'>{day}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>   
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <h5 className='lead'>Shifts</h5>
                                    <div className='my-2'>
                                        <div className='d-flex'>
                                            {
                                                teacher.availability.timeslot.map((time, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='px-3 py-2 m-2 border rounded-pill border-1 border-info text-capitalize text-info'>
                                                                <span className='p-0 mx-3'>{time}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <h5 className='lead'>Time Range</h5>
                                    <div className='my-2'>
                                        <div className='d-flex justify-content-center'>
                                            <div className='col-7'>
                                                <div className='d-flex justify-content-between px-3 py-2 m-2 border border-1 border-end-0 border-start-0 border-info text-capitalize text-info'>
                                                    <span className='p-0 mx-3 text-start'>{formatTime(teacher.availability.startDate)}</span>
                                                    <span className='p-0 mx-3 text-center'>to</span>
                                                    <span className='p-0 mx-3 text-end'>{formatTime(teacher.availability.endDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TutorProfile