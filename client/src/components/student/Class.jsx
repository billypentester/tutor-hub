import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Loader from '../utils/Loader'
import Alert from '../utils/Alert'
import axios from 'axios'

function Class() {

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})
    const params = useParams()

    const [classroom, setClassroom] = useState('')
    const [subject, setSubject] = useState('')
    const [assignment, setAssignment] = useState('')
    const [quiz, setQuiz] = useState('')
    const [announcement, setAnnouncement] = useState('')
    const [show, setShow] = useState(false)

    const [UploadAssignment, setUploadAssignment] = useState('')
    const [UploadQuiz, setUploadQuiz] = useState('')
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const assignmentUploadHandler = async(e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('classroom', classroom._id)
            formData.append('subject', subject._id)
            formData.append('assignment', assignment._id)
            formData.append('link', UploadAssignment.link)
            formData.append('content', UploadAssignment.content)

            const {data} = await axios.post('/api/student/upload/assignment', formData)

            data.subjects.map((SubjectList) => {
                if(SubjectList._id==subject._id){
                    setSubject(SubjectList)
                }
            })

            setUploadAssignment('')
            setAlert({type: 'success', message: 'Assignment Uploaded Successfully'})
            setLoading(false)
            setTimeout(() => { setAlert({type: '', message: ''}) } , 5000)
        }
        catch(error){
            setAlert({type: 'danger', message: 'Error Uploading Assignment'})
            setLoading(false)
        }
    }

    const quizUploadHandler = async(e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('classroom', classroom._id)
            formData.append('subject', subject._id)
            formData.append('quiz', quiz._id)
            formData.append('link', UploadQuiz.link)
            formData.append('content', UploadQuiz.content)

            const {data} = await axios.post('/api/student/upload/quiz', formData)

            data.subjects.map((SubjectList) => {
                if(SubjectList._id==subject._id){
                    setSubject(SubjectList)
                }
            })

            setUploadQuiz('')
            setAlert({type: 'success', message: 'Assignment Uploaded Successfully'})
            setLoading(false)
            setTimeout(() => { setAlert({type: '', message: ''}) } , 5000)
        }
        catch(error){
            setAlert({type: 'danger', message: 'Error Uploading Assignment'})
            setLoading(false)
        }
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
                                    <div id="myTabContent" class="tab-content">
                                        <div class="tab-pane fade active show position-relative" id="assignments" role="tabpanel" style={{height: '75vh'}}>
                                            {
                                                subject.assignments.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center p-3'>
                                                    <div className='bg-ino border border-info p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Assignment</h3>
                                                        <p className='lead text-center mb-0'>No assignment have been added yet</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-flex flex-column py-3 align-items-center overflow-auto' style={{height:'75vh'}}>
                                                    {
                                                        subject.assignments.map((assignment, index) => (
                                                            <div className='col-11 bg-light border border-muted p-4 rounded-3 shadow-lg mb-3'>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <span className='badge bg-info'># {index+1}</span>
                                                                    <span className=''>May 12, 2023</span>
                                                                </div>
                                                                <div className='d-flex flex-column'>
                                                                    <h3 className='mt-3 mb-1'>{assignment.title}</h3>
                                                                    <p className='lead mb-0'>{assignment.description}</p>
                                                                    <div className='d-flex text-dark my-2'>
                                                                        <strong className='me-2 text-danger'>Deadline:</strong>
                                                                        <span>{formatDate(assignment.dueDate)}</span>
                                                                    </div>
                                                                    {
                                                                        assignment.link == "undefined" ? null :
                                                                        <div className='d-flex text-dark my-2'>
                                                                            <strong className='me-2'>Link:</strong>
                                                                            <a target='_blank' href={assignment.link}>
                                                                                {assignment.link}
                                                                            </a>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {
                                                                    assignment.content.split('/')[assignment.content.split('/').length-1].split('.')[1]=='pdf' ?
                                                                    <a target='_blank' href={assignment.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/pdf-2.png" width='30px' height='30px' className='me-2'/>
                                                                        {assignment.content.split('/')[assignment.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    assignment.content.split('/')[assignment.content.split('/').length-1].split('.')[1]=='docx' ?
                                                                    <a target='_blank' href={assignment.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/ms-word.png" width='30px' height='30px' className='me-2'/>
                                                                        {assignment.content.split('/')[assignment.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    assignment.content.split('/')[assignment.content.split('/').length-1].split('.')[1]=='pptx' ?
                                                                    <a target='_blank' href={assignment.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/ms-powerpoint.png" width='30px' height='30px' className='me-2'/>
                                                                        {assignment.content.split('/')[assignment.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    <></>
                                                                }
                                                                <hr/>
                                                                <div className='text-end'>
                                                                    {
                                                                        assignment.uploadDate == undefined ?
                                                                        <button className='btn btn-info' data-toggle="modal" data-target="#uploadAssignment" onClick={() => {setAssignment(assignment) }}>
                                                                            Submit Assignment
                                                                        </button>
                                                                        :
                                                                        <button disabled className='btn btn-success'>
                                                                            Submitted
                                                                        </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>   
                                            }
                                        </div>
                                        <div class="tab-pane fade position-relative" id="quizzes" role="tabpanel" style={{height: '75vh'}}>
                                            {
                                                subject.quizzes.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center p-3'>
                                                    <div className='bg-ino border border-info p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Quiz</h3>
                                                        <p className='lead text-center mb-0'>No quiz have been added yet</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-flex flex-column py-3 align-items-center overflow-auto' style={{height:'75vh'}}>
                                                    {
                                                        subject.quizzes.map((quiz, index) => (
                                                            <div className='col-11 bg-light border border-muted p-4 rounded-3 shadow-lg mb-3'>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <span className='badge bg-info'># {index+1}</span>
                                                                    <span className=''>May 12, 2023</span>
                                                                </div>
                                                                <div className='d-flex flex-column'>
                                                                    <h3 className='mt-3 mb-1'>{quiz.title}</h3>
                                                                    <p className='lead mb-0'>{quiz.description}</p>
                                                                    <div className='d-flex text-dark my-2'>
                                                                        <strong className='me-2 text-danger'>Deadline:</strong>
                                                                        <span>{formatDate(quiz.dueDate)}</span>
                                                                    </div>
                                                                    {
                                                                        quiz.link == "undefined" ? null :
                                                                        <div className='d-flex text-dark my-2'>
                                                                            <strong className='me-2'>Link:</strong>
                                                                            <a target='_blank' href={quiz.link}>
                                                                                {quiz.link}
                                                                            </a>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {
                                                                    quiz.content.split('/')[quiz.content.split('/').length-1].split('.')[1]=='pdf' ?
                                                                    <a target='_blank' href={quiz.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/pdf-2.png" width='30px' height='30px' className='me-2'/>
                                                                        {quiz.content.split('/')[quiz.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    quiz.content.split('/')[quiz.content.split('/').length-1].split('.')[1]=='docx' ?
                                                                    <a target='_blank' href={quiz.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/ms-word.png" width='30px' height='30px' className='me-2'/>
                                                                        {quiz.content.split('/')[quiz.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    quiz.content.split('/')[quiz.content.split('/').length-1].split('.')[1]=='pptx' ?
                                                                    <a target='_blank' href={quiz.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/ms-powerpoint.png" width='30px' height='30px' className='me-2'/>
                                                                        {quiz.content.split('/')[quiz.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    <></>
                                                                }
                                                                <hr/>
                                                                <div className='text-end'>
                                                                    {
                                                                        quiz.uploadDate == undefined ?
                                                                        <button className='btn btn-info' data-toggle="modal" data-target="#uploadQuiz" onClick={() => {setQuiz(quiz) }}>
                                                                            Submit Quiz
                                                                        </button>
                                                                        :
                                                                        <button disabled className='btn btn-success'>
                                                                            Submitted
                                                                        </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div class="tab-pane fade position-relative" id="notes" role="tabpanel" style={{height: '75vh'}}>
                                            {
                                                subject.notes.length==0 ?
                                                <div className='d-flex justify-content-center align-items-center p-3'>
                                                    <div className='bg-ino border border-info p-3 rounded-3 shadow-lg w-100'>
                                                        <h3 className='text-center'>No Notes</h3>
                                                        <p className='lead text-center mb-0'>No notes have been added yet</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className='d-flex flex-column py-3 align-items-center overflow-auto' style={{height:'75vh'}}>
                                                    {
                                                        subject.notes.map((note, index) => (
                                                            <div className='col-11 bg-light border border-muted p-4 rounded-3 shadow-lg mb-3'>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <span className='badge bg-info'># {index+1}</span>
                                                                    <span className=''>May 12, 2023</span>
                                                                </div>
                                                                <div className='d-flex flex-column'>
                                                                    <h3 className='mt-3 mb-1'>{note.title}</h3>
                                                                    <p className='lead'>{note.description}</p>
                                                                    {
                                                                        note.link == "undefined" ? null :
                                                                        <div className='d-flex text-dark my-2'>
                                                                            <strong className='me-2'>Link:</strong>
                                                                            <a target='_blank' href={note.link}>
                                                                                {note.link}
                                                                            </a>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {
                                                                    note.content.split('/')[note.content.split('/').length-1].split('.')[1]=='pdf' ?
                                                                    <a target='_blank' href={note.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/pdf-2.png" width='30px' height='30px' className='me-2'/>
                                                                        {note.content.split('/')[note.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    note.content.split('/')[note.content.split('/').length-1].split('.')[1]=='docx' ?
                                                                    <a target='_blank' href={note.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/ms-word.png" width='30px' height='30px' className='me-2'/>
                                                                        {note.content.split('/')[note.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    note.content.split('/')[note.content.split('/').length-1].split('.')[1]=='pptx' ?
                                                                    <a target='_blank' href={note.content} className='btn btn-outline-info'>
                                                                        <img src="https://img.icons8.com/color/48/000000/ms-powerpoint.png" width='30px' height='30px' className='me-2'/>
                                                                        {note.content.split('/')[note.content.split('/').length-1]}
                                                                    </a>
                                                                    :
                                                                    <></>
                                                                }
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

                <div className="modal fade" id="uploadAssignment" tabindex="-1" aria-labelledby="uploadAssignmentLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Assignment</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#uploadAssignment">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                   <div className="form-group">
                                        <label for="assignmentLink" className='form-label mt-4'>Link (optional)</label>
                                        <input type="text" className="form-control" id="assignmentLink" placeholder="Type here link" name='link' value={UploadAssignment.link} onChange={(e) => setUploadAssignment({...UploadAssignment, [e.target.name]: e.target.value})} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="formFile" class="form-label mt-4">Upload File</label>
                                        <input class="form-control" type="file" name="content" id="formFile" onChange={(e) => setUploadAssignment({...UploadAssignment, [e.target.name]: e.target.files[0]})} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={assignmentUploadHandler}>Add</button> 
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="uploadQuiz" tabindex="-1" aria-labelledby="uploadQuizLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Quiz</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#uploadQuiz">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                   <div className="form-group">
                                        <label for="assignmentLink" className='form-label mt-4'>Link (optional)</label>
                                        <input type="text" className="form-control" id="assignmentLink" placeholder="Type here link" name='link' value={UploadQuiz.link} onChange={(e) => setUploadQuiz({...UploadQuiz, [e.target.name]: e.target.value})} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="formFile" class="form-label mt-4">Upload File</label>
                                        <input class="form-control" type="file" name="content" id="formFile" onChange={(e) => setUploadQuiz({...UploadQuiz, [e.target.name]: e.target.files[0]})} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={quizUploadHandler}>Add</button> 
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