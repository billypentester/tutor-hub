import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Loader from '../utils/Loader'
import axios from 'axios'

function Class() {

    const [classroom, setClassroom] = useState('')
    const [loading, setLoading] = useState(false)
    const [subject, setSubject] = useState('')
    const [announcement, setAnnouncement] = useState('')
    const [show, setShow] = useState(false)
    const params = useParams()

    const getClassroom = async() => {
        try{
            setLoading(true)
            const {id} = params
            const response = await axios.get('/api/student/getclass/' + params.id)
            setClassroom(response.data)
            setLoading(false)
        }
        catch(error){
            console.log(error)
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    useEffect(() => {
        getClassroom()
    }, [])


    return (
        <>
            {
            loading && <Loader />
        }
        {
            !loading && classroom!=='' &&
            <div className='my-4'>
                <div className='bg-light rounded-3 shadow-lg' >
                    <div className='d-flex'>
                        <div className='col-3 rounded-start bg-dark'>
                            <div className='d-flex flex-column justify-content-between' style={{height: '84vh'}}>
                                
                                <div>

                                    <div className='bg-info p-3  w-100 text-center text-white'>
                                        <h3 className='text-white'>{classroom.name}</h3>
                                        <p className='mb-0 lead'>{classroom.teacher.name}</p>
                                    </div>

                                    <div className='my-1 text-start text-white'>
                                        
                                        <div className='d-flex flex-column align-items-center w-100 px-3 py-1 overflow-auto' style={{height: '50vh'}}>
                                        {
                                            classroom.subjects && classroom.subjects.map((subject, index) => (
                                            <button key={index} className='btn btn-outline-info text-white w-100 rounded-3 shadow-lg p-3 my-1' onClick={() => {
                                                setSubject(subject)
                                                setShow('subject')
                                            }}>{subject.name}</button>
                                            ))
                                        }
                                        </div>
                                        
                                    </div>

                                </div>

                                <div className='m-3 text-start text-white'>
                                    <button className='btn btn-info text-white w-100 rounded-3 shadow-lg p-3' onClick={() => {
                                        setAnnouncement(classroom.announcements)
                                        setShow('announcement')
                                    }}>Announcements</button>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-9'>
                            {
                                show==false ?
                                <div className='d-flex justify-content-center align-items-center' style={{height: '84vh'}}>
                                    <div className='bg-secondary p-3 rounded-3 shadow-lg w-100'>
                                        <h3 className='text-center'>Welcome to {classroom.name}</h3>
                                        <p className='lead text-center mb-0'>Select a subject to view the details</p>
                                    </div>
                                </div>
                                :
                                show=='subject' ?
                                <>
                                    <ul class="nav nav-pills p-2 d-flex justify-content-around" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" data-toggle="tab" href="#assignments" aria-selected="true" role="tab">Assignments</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-toggle="tab" href="#quizzes" aria-selected="false" role="tab" tabindex="-1">Quizes</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-toggle="tab" href="#notes" aria-selected="false" role="tab" tabindex="-1">Notes</a>
                                        </li>
                                    </ul>
                                    <hr className='m-0' />
                                    <div id="myTabContent" class="tab-content p-3">
                                        <div class="tab-pane fade active show" id="assignments" role="tabpanel">
                                            {
                                                subject.assignments.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='bg-light p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Assignments</h3>
                                                        <p className='lead text-center'>No assignments have been added yet</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-flex flex-column'>
                                                    {
                                                        subject.assignments.map((assignment, index) => (
                                                            <div className='bg-light p-3 rounded-3 shadow-lg w-100 my-2'>
                                                                <h3 className='text-center'>{assignment.name}</h3>
                                                                <p className='lead text-center'>{assignment.description}</p>
                                                                <div className='d-flex justify-content-center align-items-center'>
                                                                    <Link to={'/student/assignment/' + assignment._id} className='btn btn-info'>View Assignment</Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>   
                                            }
                                        </div>
                                        <div class="tab-pane fade" id="quizzes" role="tabpanel">
                                            {
                                                subject.quizzes.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='bg-light p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Quizzes</h3>
                                                        <p className='lead text-center'>No quizzes have been added yet</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-flex flex-column'>
                                                    {
                                                        subject.quizzes.map((quiz, index) => (
                                                            <div className='bg-light p-3 rounded-3 shadow-lg w-100 my-2'>
                                                                <h3 className='text-center'>{quiz.name}</h3>
                                                                <p className='lead text-center'>{quiz.description}</p>
                                                                <div className='d-flex justify-content-center align-items-center'>
                                                                    <Link to={'/student/quiz/' + quiz._id} className='btn btn-info'>View Quiz</Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div class="tab-pane fade" id="notes" role="tabpanel">
                                            {
                                                subject.notes.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='bg-light p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Notes</h3>
                                                        <p className='lead text-center'>No notes have been added yet</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-flex flex-column'>
                                                    {
                                                        subject.notes.map((note, index) => (
                                                            <div className='bg-light p-3 rounded-3 shadow-lg w-100 my-2'>
                                                                <h3 className='text-center'>{note.name}</h3>
                                                                <p className='lead text-center'>{note.description}</p>
                                                                <div className='d-flex justify-content-center align-items-center'>
                                                                    <Link to={'/student/note/' + note._id} className='btn btn-info'>View Note</Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                show=='announcement' ?
                                <>
                                    <div className='p-3'>
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <h3 className='text-center mb-0'>Announcements</h3>
                                        </div>
                                        <hr className='' />
                                        {
                                            classroom.announcements.length==0 ?
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div className='bg-light border border-info p-3 rounded-3 shadow-lg w-100'>
                                                    <h3 className='text-center'>No Announcements</h3>
                                                    <p className='lead text-center mb-0'>No announcements have been added yet</p>
                                                </div>
                                            </div>
                                            :
                                            <div className='d-flex flex-column my-2 align-items-center overflow-auto' style={{height: '70vh'}}>
                                                {
                                                    announcement.reverse().map((announcement, index) => (
                                                        <div className='col-10 bg-light border border-info p-3 rounded-3 shadow-lg mb-2'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div className='col-2 d-flex justify-content-center align-items-center'>
                                                                <i class="fas fa-bullhorn fa-3x text-success"></i>
                                                                </div>
                                                                <div className='col-10 d-flex flex-column px-3'>                                                                    
                                                                    <div className='d-flex justify-content-between align-items-center'>
                                                                        <h4 className='mb-0'>{announcement.title}</h4>
                                                                        <span className='mb-0'>Posted on <strong>{formatDate(announcement.time)}</strong></span>
                                                                    </div>
                                                                    <p className='mt-2 mb-0'>{announcement.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                </>
                                :
                                <></>
                            } 
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Class