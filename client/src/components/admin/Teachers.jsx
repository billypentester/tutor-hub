import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'

function Teachers() {

    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const fetchTeachers = async () => {
        setLoading(true)
        const res = await axios.get('/api/teacher/all')
        setTeachers(res.data)
        console.log(res.data)
        setLoading(false)
    }

    const deleteTeacher = async (e) => {
        try {
            setLoading(true)
            const {id} = e.target.parentNode.parentNode.childNodes[0];
            await axios.delete(`/api/admin/teacher/delete/${id}`)
            setTeachers(teachers.filter(teacher => teacher._id !== id))
            setLoading(false)
            setAlert({type: 'success', message: 'Teacher deleted successfully'})
            setTimeout(function() {
                setAlert({type: '', message: ''})
            }, 5000);
        } 
        catch (err) {
            console.log(err)
        }
    }

    const searchTeacher = async (e) => {
        const {value} = e.target
        if(value.length > 0) {
            setTeachers(teachers.filter(teacher => teacher.name.toLowerCase().includes(value.toLowerCase())))
        }
        else {
            fetchTeachers()
        }
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Teachers</h1>
            <div className="d-flex justify-content-end align-items-center">
                {/* <button type="button" className="btn btn-primary">Add Teacher</button> */}
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Enter teacher name" onChange={searchTeacher} aria-label="Search"/>
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
                    <th scope="col">Username</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>  
                {
                    loading ? <Loader /> : ''
                }
                {
                    (teachers.length > 0) ? teachers.map((teacher, index) => (
                        <tr key={teacher._id} class="table-secondary text-center">
                            <th id={teacher._id} scope="row">{index + 1}</th>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.username}</td>
                            <td>{teacher.contactno}</td>
                            <td>
                                {/* <button type="button" class="mx-2 btn btn-warning">Update</button> */}
                                <button type="button" class="mx-2 btn btn-danger" onClick={deleteTeacher}>Delete</button>
                            </td>
                        </tr>
                    ))
                    :
                    <tr class="table-secondary text-center">
                        <td colSpan="5">No teacher found</td>
                    </tr>
                }
            </tbody>
            {
                alert.message ? <Alert type={alert.type} message={alert.message} /> : ''
            }
            </table>
        </div>
    )
}

export default Teachers