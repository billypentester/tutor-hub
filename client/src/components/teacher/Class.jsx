import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Loader from '../utils/Loader'
import Alert from '../utils/Alert'
import axios from 'axios'

function Class() {

    const [classroom, setClassroom] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [subject, setSubject] = useState('')
    const [announcement, setAnnouncement] = useState('')
    const [addAnnouncement, setAddAnnouncement] = useState('')
    const [addNotes, setAddNotes] = useState('')
    const [show, setShow] = useState(false)
    const params = useParams()

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const getClassroom = async() => {
        try{
            setLoading(true)
            const response = await axios.get('/api/student/getclass/' + params.id)
            setClassroom(response.data)
            setLoading(false)
        }
        catch(error){
            console.log(error)
        }
    }

    const announcementHandleChange = (e) => {
        const {name, value} = e.target
        setAddAnnouncement({...addAnnouncement, [name]: value})
    }

    const notesHandleChange = (e) => {
        const {name, value} = e.target
        setAddNotes({...addNotes, [name]: value})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAddNotes({...addNotes, content: reader.result})
        }
    }

    const announcementHandler = async() => {
        try{
            setLoading(true)
            const response = await axios.post('/api/teacher/classroom/update', {classroom: classroom._id, announcement: addAnnouncement})
            console.log(response.data)
            setAnnouncement(response.data.announcements)
            setAddAnnouncement('')
            setAlert({type: 'success', message: 'Announcement added successfully'})
            setLoading(false)
            setTimeout(() => {
                setAlert({type: '', message: ''})
            }
            , 4000)
        }
        catch(error){
            console.log(error)
        }
    }

    const notesHandler = async() => {
        try{
            setLoading(true)
            const response = await axios.post('/api/teacher/classroom/notes', {classroom: classroom._id, notes: addNotes})
            console.log(response.data)
            setSubject(response.data)
            setAddNotes('')
            setAlert({type: 'success', message: 'Notes added successfully'})
            setLoading(false)
            setTimeout(() => {
                setAlert({type: '', message: ''})
            }
            , 4000)
        }
        catch(error){
            console.log(error)
        }
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
                                        <p className='mb-0 lead'>{classroom.student.name}</p>
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
                                        <div class="tab-pane fade position-relative" id="notes" role="tabpanel" style={{height:'70vh'}}>
                                            <div className='m-3' style={{position:'absolute', bottom:'0%', right:'0%', zIndex:999}}>
                                                <button className='btn btn-primary ' data-toggle='modal' data-target='#addNotes'>
                                                    <i className='fa fa-plus'></i>
                                                </button>
                                            </div> 
                                            {
                                                subject.notes.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='bg-light border border-info p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Notes</h3>
                                                        <p className='lead text-center mb-0'>No notes have been added yet</p>
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
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h3 className='text-center mb-0'>Announcements</h3>
                                            <button className='btn btn-success mx-3' data-toggle='modal' data-target='#addAnnouncementModal'>Add Announcement</button>
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

                {/* Announcement Modal */}

                <div className="modal fade" id="addAnnouncementModal" tabindex="-1" aria-labelledby="addAnnouncementModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Announcement</h5>
                            <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#addAnnouncementModal">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="announcementName" className='form-label'>Name</label>
                                        <input type="text" className="form-control" id="announcementName" placeholder="Enter Announcement Name" name='title' value={addAnnouncement.title} onChange={announcementHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="announcementDescription" className='form-label mt-4'>Description</label>
                                        <textarea className="form-control" id="announcementDescription" rows="3" placeholder="Enter Announcement Description" name='description' value={addAnnouncement.description} onChange={announcementHandleChange}></textarea>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={announcementHandler}>Add</button> 
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Notes Modal */}

                <div className="modal fade" id="addNotes" tabindex="-1" aria-labelledby="addNotesLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Notes</h5>
                            <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#addNotes">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="notesTitle" className='form-label'>Title</label>
                                        <input type="text" className="form-control" id="notesTitle" placeholder="Enter Notes title" name='title' value={addNotes.title} onChange={notesHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="notesDescription" className='form-label mt-4'>Description</label>
                                        <textarea className="form-control" id="notesDescription" rows="3" placeholder="Enter Notes Description" name='description' value={addNotes.description} onChange={notesHandleChange}></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                   <div className="form-group">
                                        <label for="notesLink" className='form-label mt-4'>Link (optional)</label>
                                        <input type="text" className="form-control" id="notesLink" placeholder="Type here link" name='link' value={addNotes.link} onChange={notesHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="formFile" class="form-label mt-4">Upload File</label>
                                        <input class="form-control" type="file" name="content" accept="image/*" id="formFile" onChange={handleFileChange} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={notesHandler}>Add</button> 
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        }
        {
            alert.message ? <Alert type={alert.type} message={alert.message} /> : ''
        }
        </>
    )
}

export default Class