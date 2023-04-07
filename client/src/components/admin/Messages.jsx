import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'

function Messages() {

    const [contacts, setcontacts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchcontacts = async () => {
        setLoading(true)
        const res = await axios.get('http://localhost:3000/contact/all')
        setcontacts(res.data)
        console.log(res.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchcontacts()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Messages</h1>
            <div className="d-flex justify-content-end align-items-center">
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Enter contact name"/>
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
                    loading ? <Loader /> : 
                    contacts.map((contact, index) => (
                        <tr key={contact._id} class="table-secondary text-center">
                            <th scope="row">{index + 1}</th>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.message}</td>
                            <td>
                                <button type="button" class="mx-2 btn btn-info">Send Email</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    )
}

export default Messages