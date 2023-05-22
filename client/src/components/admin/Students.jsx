import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'

function Students() {

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const fetchStudents = async () => {
        setLoading(true)
        const res = await axios.get('/api/student/all')
        setStudents(res.data)
        setLoading(false)
    }

    const deleteStudent = async (e) => {
        try {
            setLoading(true)
            const {id} = e.target.parentNode.parentNode.childNodes[0];
            await axios.delete(`/api/admin/student/delete/${id}`)
            setStudents(students.filter(student => student._id !== id))
            setLoading(false)
            setAlert({type: 'success', message: 'Student deleted successfully'})
            setTimeout(function() {
                setAlert({type: '', message: ''})
            }, 5000);
        } 
        catch (err) {
            console.log(err)
        }
    }

    const searchStudent = async (e) => {   
        const {value} = e.target
        if(value.length > 0) {
            setStudents(students.filter(student => student.name.toLowerCase().includes(value.toLowerCase())))
        }
        else {
            fetchStudents()
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Students</h1>
            <div className="d-flex justify-content-end align-items-center">
                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createStudent">Add Student</button> */}
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Search student name" name="search" onChange={searchStudent} aria-label="Search" />
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
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>  
                    {
                        loading ? <Loader /> : ''
                    }
                    {
                        (students.length > 0) ? students.map((student, index) => (
                            <tr key={student._id} class="table-secondary text-center">
                                <th id={student._id} scope="row">{index + 1}</th>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.username}</td>
                                <td>
                                    {/* <button type="button" class="mx-2 btn btn-warning" data-toggle="modal" data-target="#updateStudent">Update</button> */}
                                    <button type="button" class="mx-2 btn btn-danger" onClick={deleteStudent}>Delete</button>
                                </td>
                            </tr>
                        ))
                        :
                        <tr class="table-secondary text-center">
                            <td colSpan="5">No students found</td>
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

export default Students