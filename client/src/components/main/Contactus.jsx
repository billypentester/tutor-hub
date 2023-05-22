import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'

function Contactus() {

    const [contact, setContact] = useState({name: '', email: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const inputHandler = (e) => {
        setContact({...contact, [e.target.name]: e.target.value})
    }

    const sendMessage = async() => {
        try{
            setLoading(true)
            const res = await axios.post('/api/contactus', contact)
            console.log(res)
            if(res.status === 200){
                setLoading(false)
                setAlert({type: 'success', message: 'Message sent successfully'})
                setTimeout(function() {
                    setAlert({type: '', message: ''})
                }
                , 5000);
            }
        }
        catch(err){
            setErrors(err.response.data.msg)
        }
    }


    return (
        <section id="contactus">
            {
                loading && <Loader />
            }
            <div className="bg-light py-5 py-xl-6">
                <div className="container my-5 mb-md-6">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 text-center">
                            <h2 className="mb-4 display-5">Get in touch</h2>
                            <p className="text-dark mb-4 mb-md-5">At Tutor Hub, we understand that every student is unique, and our tutors work closely with each student to develop personalized learning plans that address their individual needs and learning styles. </p>
                            <hr className="w-50 mx-auto mb-0 text-dark" />
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-lg-6 mx-auto">
                        <form>
                            <div className="form-group">
                                <label for="ContactName" className="form-label mt-4">Name</label>
                                <input type="text" className="form-control" id="ContactName" placeholder="Enter full name" name="name" value={contact.name} onChange={inputHandler}/>
                            </div>
                            <div className="form-group">
                                <label for="ContactEmail" className="form-label mt-4">Email Address</label>
                                <input type="email" className="form-control" id="ContactEmail" placeholder="Enter email address" name="email" value={contact.email} onChange={inputHandler}/>
                            </div>
                            <div className="form-group">
                                <label for="ContactMessage" className="form-label mt-4">Message</label>
                                <textarea className="form-control" id="ContactMessage" rows="3" placeholder="Write your message for us..." name="message" value={contact.message} onChange={inputHandler}></textarea>
                            </div>
                            <button type="button" className="btn btn-primary my-5" onClick={sendMessage}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
            {
                alert.message ? <Alert type={alert.type} message={alert.message} /> : ''
            }
        </section>
    )
}

export default Contactus