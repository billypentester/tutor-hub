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
    const [announcement, setAnnouncement] = useState('')
    const [addAnnouncement, setAddAnnouncement] = useState('')
    const [addNotes, setAddNotes] = useState('')
    const [addQuiz, setAddQuiz] = useState('')
    const [addAssignment, setAddAssignment] = useState('')
    const [show, setShow] = useState(false)

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

    const assignmentHandleChange = (e) => {
        const {name, value} = e.target
        setAddAssignment({...addAssignment, [name]: value})
    }

    const quizHandleChange = (e) => {
        const {name, value} = e.target
        setAddQuiz({...addQuiz, [name]: value})
    }

    const notesHandleChange = (e) => {
        const {name, value} = e.target
        setAddNotes({...addNotes, [name]: value})
    }

    const announcementHandleChange = (e) => {
        const {name, value} = e.target
        setAddAnnouncement({...addAnnouncement, [name]: value})
    }

    const AssignmenthandleFileChange = (e) => {
        const {name, files} = e.target
        setAddAssignment({...addAssignment, [name]: files[0]})
    }

    const QuizhandleFileChange = (e) => {
        const {name, files} = e.target
        setAddQuiz({...addQuiz, [name]: files[0]})
    }

    const NoteshandleFileChange = (e) => {
        const {name, files} = e.target
        setAddNotes({...addNotes, [name]: files[0]})
    }

    const assignmentHandler = async() => {
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('classroom', classroom._id)
            formData.append('subject', subject._id)
            formData.append('title', addAssignment.title)
            formData.append('description', addAssignment.description)
            formData.append('link', addAssignment.link)
            formData.append('content', addAssignment.content)
            formData.append('dueDate', addAssignment.dueDate)

            const {data} = await axios.post('/api/teacher/classroom/assignment', formData)

            data.subjects.map((SubjectList) => {
                if(SubjectList._id==subject._id){
                    setSubject(SubjectList)
                }
            })

            setAddAssignment('')
            setAlert({type: 'success', message: 'Assignment added successfully'})
            setLoading(false)
            setTimeout(() => {setAlert({type: '', message: ''})}, 4000)
        }
        catch(error){
            console.log(error)
        }
    }

    const quizHandler = async() => {
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('classroom', classroom._id)
            formData.append('subject', subject._id)
            formData.append('title', addQuiz.title)
            formData.append('description', addQuiz.description)
            formData.append('link', addQuiz.link)
            formData.append('content', addQuiz.content)
            formData.append('dueDate', addQuiz.dueDate)

            const {data} = await axios.post('/api/teacher/classroom/quiz', formData)

            data.subjects.map((SubjectList) => {
                if(SubjectList._id==subject._id){
                    setSubject(SubjectList)
                }
            })

            setAddQuiz('')
            setAlert({type: 'success', message: 'Quiz added successfully'})
            setLoading(false)
            setTimeout(() => {setAlert({type: '', message: ''})}, 4000)
        }
        catch(error){
            console.log(error)
        }
    }

    const notesHandler = async() => {
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('classroom', classroom._id)
            formData.append('subject', subject._id)
            formData.append('title', addNotes.title)
            formData.append('description', addNotes.description)
            formData.append('link', addNotes.link)
            formData.append('content', addNotes.content)

            const {data} = await axios.post('/api/teacher/classroom/notes', formData)

            data.subjects.map((SubjectList) => {
                if(SubjectList._id==subject._id){
                    setSubject(SubjectList)
                }
            })

            setAddNotes('')
            setAlert({type: 'success', message: 'Notes added successfully'})
            setLoading(false)
            setTimeout(() => {setAlert({type: '', message: ''})}, 4000)
        }
        catch(error){
            console.log(error)
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
                                            <div className='m-5 p-3' style={{position:'absolute', bottom:'0%', right:'0%', zIndex:999}}>
                                                <button className='btn btn-success shadow-lg' data-toggle='modal' data-target='#addAssignment'>
                                                    <i className='fa fa-plus fa-1x'></i>
                                                </button>
                                            </div> 
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
                                                                    <p className='lead'>{assignment.description}</p>
                                                                    <div className='d-flex text-dark my-3'>
                                                                        <strong className='me-2 text-danger'>Deadline:</strong>
                                                                        <span>{formatDate(assignment.dueDate)}</span>
                                                                    </div>
                                                                    {
                                                                        assignment.link == "undefined" ? null :
                                                                        <div className='d-flex text-dark my-3'>
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
                                                                <hr />
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    {
                                                                        assignment.answer ?
                                                                        <>
                                                                            <hr/>
                                                                            <h4 className='mb-0 lead'>Submitted by student at <strong>{formatDate(assignment.uploadDate)}</strong></h4>
                                                                        </>
                                                                        :
                                                                        <></>
                                                                    }
                                                                    <div className='d-flex justify-content-between'>
                                                                    {
                                                                        assignment.answer ?
                                                                        <>
                                                                        {
                                                                            assignment.answer.split('/')[assignment.answer.split('/').length-1].split('.')[1]=='pdf' ?
                                                                            <a target='_blank' href={assignment.answer} className='btn btn-outline-info'>
                                                                                <img src="https://img.icons8.com/color/48/000000/pdf-2.png" width='30px' height='30px' className='me-2'/>
                                                                                {assignment.answer.split('/')[assignment.answer.split('/').length-1]}
                                                                            </a>
                                                                            :
                                                                            assignment.answer.split('/')[assignment.answer.split('/').length-1].split('.')[1]=='docx' ?
                                                                            <a target='_blank' href={assignment.answer} className='btn btn-outline-info'>
                                                                                <img src="https://img.icons8.com/color/48/000000/ms-word.png" width='30px' height='30px' className='me-2'/>
                                                                                {assignment.answer.split('/')[assignment.answer.split('/').length-1]}
                                                                            </a>
                                                                            :
                                                                            assignment.answer.split('/')[assignment.answer.split('/').length-1].split('.')[1]=='pptx' ?
                                                                            <a target='_blank' href={assignment.answer} className='btn btn-outline-info'>
                                                                                <img src="https://img.icons8.com/color/48/000000/ms-powerpoint.png" width='30px' height='30px' className='me-2'/>
                                                                                {assignment.answer.split('/')[assignment.answer.split('/').length-1]}
                                                                            </a>
                                                                            :
                                                                            <></>
                                                                        }
                                                                        </>
                                                                        :
                                                                        <></>
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>   
                                            }
                                        </div>
                                        <div class="tab-pane fade position-relative" id="quizzes" role="tabpanel" style={{height: '75vh'}}>
                                            <div className='m-5 p-3' style={{position:'absolute', bottom:'0%', right:'0%', zIndex:999}}>
                                                <button className='btn btn-success shadow-lg' data-toggle='modal' data-target='#addQuiz'>
                                                    <i className='fa fa-plus fa-1x'></i>
                                                </button>
                                            </div> 
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
                                                                    <p className='lead'>{quiz.description}</p>
                                                                    <div className='d-flex text-dark my-3'>
                                                                        <strong className='me-2 text-danger'>Deadline:</strong>
                                                                        <span>{formatDate(quiz.dueDate)}</span>
                                                                    </div>
                                                                    {
                                                                        quiz.link == "undefined" ? null :
                                                                        <div className='d-flex text-dark my-3'>
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
                                                                <hr />
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    {
                                                                        
                                                                        quiz.answer ?
                                                                        <>
                                                                            <hr />
                                                                            <h4 className='mb-0 lead'>Submitted by student at <strong>{formatDate(quiz.uploadDate)}</strong></h4>
                                                                        </>
                                                                        :
                                                                        <></>
                                                                    }
                                                                    <div className='d-flex justify-content-between'>
                                                                    {
                                                                        quiz.answer ?
                                                                        <>
                                                                        {
                                                                            quiz.answer.split('/')[quiz.answer.split('/').length-1].split('.')[1]=='pdf' ?
                                                                            <a target='_blank' href={quiz.answer} className='btn btn-outline-info'>
                                                                                <img src="https://img.icons8.com/color/48/000000/pdf-2.png" width='30px' height='30px' className='me-2'/>
                                                                                {quiz.answer.split('/')[quiz.answer.split('/').length-1]}
                                                                            </a>
                                                                            :
                                                                            quiz.answer.split('/')[quiz.answer.split('/').length-1].split('.')[1]=='docx' ?
                                                                            <a target='_blank' href={quiz.answer} className='btn btn-outline-info'>
                                                                                <img src="https://img.icons8.com/color/48/000000/ms-word.png" width='30px' height='30px' className='me-2'/>
                                                                                {quiz.answer.split('/')[quiz.answer.split('/').length-1]}
                                                                            </a>
                                                                            :
                                                                            quiz.answer.split('/')[quiz.answer.split('/').length-1].split('.')[1]=='pptx' ?
                                                                            <a target='_blank' href={quiz.answer} className='btn btn-outline-info'>
                                                                                <img src="https://img.icons8.com/color/48/000000/ms-powerpoint.png" width='30px' height='30px' className='me-2'/>
                                                                                {quiz.answer.split('/')[quiz.answer.split('/').length-1]}
                                                                            </a>
                                                                            :
                                                                            <></>
                                                                        }
                                                                        </>
                                                                        :
                                                                        <></>
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div class="tab-pane fade position-relative" id="notes" role="tabpanel" style={{height: '75vh'}}>
                                            <div className='m-5 p-3' style={{position:'absolute', bottom:'0%', right:'0%', zIndex:999}}>
                                                <button className='btn btn-success shadow-lg' data-toggle='modal' data-target='#addNotes'>
                                                    <i className='fa fa-plus fa-1x'></i>
                                                </button>
                                            </div> 
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
                                                                        <div className='d-flex text-dark my-3'>
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

                {/* Assignment Modal */}

                <div className="modal fade" id="addAssignment" tabindex="-1" aria-labelledby="AssignmentLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Assignment</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#Assignment">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="assignmentTitle" className='form-label'>Title</label>
                                        <input type="text" className="form-control" id="assignmentTitle" placeholder="Enter Assignment title" name='title' value={addAssignment.title} onChange={assignmentHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="assignmentDescription" className='form-label mt-4'>Description</label>
                                        <textarea className="form-control" id="assignmentDescription" rows="3" placeholder="Enter Quiz Description" name='description' value={addAssignment.description} onChange={assignmentHandleChange}></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                   <div className="form-group">
                                        <label for="assignmentLink" className='form-label mt-4'>Link (optional)</label>
                                        <input type="text" className="form-control" id="assignmentLink" placeholder="Type here link" name='link' value={addAssignment.link} onChange={assignmentHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="formFile" class="form-label mt-4">Upload File</label>
                                        <input class="form-control" type="file" name="content" id="formFile" onChange={AssignmenthandleFileChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="assignmentDueDate" className='form-label mt-4'>Due Date</label>
                                        <input type="date" className="form-control" id="assignmentDueDate" placeholder="Enter Assignment Due Date" name='dueDate' value={addAssignment.dueDate} onChange={assignmentHandleChange} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={assignmentHandler}>Add</button> 
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Quiz Modal */}

                <div className="modal fade" id="addQuiz" tabindex="-1" aria-labelledby="addQuizLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Quiz</h5>
                            <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#addQuiz">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="quizTitle" className='form-label'>Title</label>
                                        <input type="text" className="form-control" id="quizTitle" placeholder="Enter Quiz title" name='title' value={addQuiz.title} onChange={quizHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="quizDescription" className='form-label mt-4'>Description</label>
                                        <textarea className="form-control" id="quizDescription" rows="3" placeholder="Enter Quiz Description" name='description' value={addQuiz.description} onChange={quizHandleChange}></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                   <div className="form-group">
                                        <label for="quizLink" className='form-label mt-4'>Link (optional)</label>
                                        <input type="text" className="form-control" id="quizLink" placeholder="Type here link" name='link' value={addQuiz.link} onChange={quizHandleChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="formFile" class="form-label mt-4">Upload File</label>
                                        <input class="form-control" type="file" name="content" id="formFile" onChange={QuizhandleFileChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group">
                                        <label for="assignmentDueDate" className='form-label mt-4'>Due Date</label>
                                        <input type="date" className="form-control" id="assignmentDueDate" placeholder="Enter Assignment Due Date" name='dueDate' value={addQuiz.dueDate} onChange={quizHandleChange} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={quizHandler}>Add</button> 
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
                                        <input class="form-control" type="file" name="content" id="formFile" onChange={NoteshandleFileChange} />
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