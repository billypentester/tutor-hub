import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'

function Messages() {

    const [contacts, setcontacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [person, setPerson] = useState('')
    const [reply, setReply] = useState('')

    const fetchcontacts = async () => {
        setLoading(true)
        const res = await axios.get('/api/contact/all')
        setcontacts(res.data)
        setLoading(false)
    }

    const sendEmail = async () => {
        try{
            setLoading(true)
            const res = await axios.post('/api/admin/message/send', person)
            if(res.status === 200)
            {
                console.log(res.data)
                setcontacts((contacts) => contacts.map((contact) => {
                    if(contact._id === res.data._id) {
                        contact = res.data
                    }
                    return contact
                }))
                setLoading(false)
                setAlert({type: 'success', message: 'Email sent successfully'})
                setTimeout(function() {
                    setAlert({type: '', message: ''})
                }
                , 5000);
            }
        }
        catch(err) {
            setLoading(false)
            setAlert({type: 'danger', message: 'Something went wrong'})
            setTimeout(function() {
                setAlert({type: '', message: ''})
            }
            , 5000);
            console.log(err)
        }
    }

    const handleChanges = (e) => {
        const {name, value} = e.target
        setPerson({...person, [name]: value})
    }

    const searchContact = async (e) => {   
        const {value} = e.target
        if(value.length > 0) {
            setcontacts(contacts.filter(contacts => contacts.name.toLowerCase().includes(value.toLowerCase())))
        }
        else {
            fetchcontacts()
        }
    }

    useEffect(() => {
        fetchcontacts()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Messages</h1>
            <div className="d-flex justify-content-end align-items-center">
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Enter contact name" name="search" onChange={searchContact} aria-label="Search" />
                    <button className="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <hr />
            <table class="table table-hover align-middle">
            <thead>
                <tr class="table-dark text-center">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>  
                {
                    loading ? <Loader /> : ''
                }
                {
                    (contacts.length > 0) ? contacts.map((contact, index) => (
                        <tr key={contact._id} class="table-secondary text-center">
                            <th scope="row">{index + 1}</th>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.message}</td>
                            <td>
                                {
                                    contact.status == 'Replied' ?
                                    <button type="button" class="mx-2 btn btn-success" data-toggle="modal" data-target="#viewReply" onClick={() => setReply(contact.reply)}>View Reply</button>
                                    :
                                    <button type="button" class="mx-2 btn btn-info" data-toggle="modal" data-target="#sendEmail" onClick={() => setPerson(contact)}>Send Email</button>
                                }
                            </td>
                        </tr>
                    ))
                    :
                    <tr class="table-secondary text-center">
                        <td colSpan="5">No message found</td>
                    </tr>
                }
            </tbody>
            {
                alert.message ? <Alert type={alert.type} message={alert.message} /> : ''
            }
            </table>

            <div className="modal fade" id="sendEmail" tabindex="-1" aria-labelledby="sendEmailLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Email</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#sendEmail">
                        <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row justify-content-center">
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="message" class="form-label">Message</label>
                                        <input disabled type="text" class="form-control" id="message" placeholder="Message here" name='message' value={person.message} onChange={handleChanges}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="subject" class="form-label mt-4">Subject</label>
                                        <input type="text" class="form-control" id="subject" placeholder="Write headline for email" name='subject' value={person.subject} onChange={handleChanges}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div class="form-group">
                                        <label for="reply" class="form-label mt-4">Reply</label>
                                        <textarea type="text" class="form-control" id="reply" placeholder="Write email for reply" name='reply' value={person.reply} onChange={handleChanges}></textarea>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="button" class="btn btn-primary mt-4 w-75" data-dismiss="modal" onClick={sendEmail}>Send Email</button> 
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="viewReply" tabindex="-1" aria-labelledby="viewReplyLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Reply</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#viewReply">
                        <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row justify-content-center">
                                <div className='row'>
                                    {/* <h5 className="modal-title">Reply</h5> */}
                                    <p className="lead">{reply}</p>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button type="button" class="btn btn-info mt-4 w-25" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Messages