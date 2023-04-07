import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'

function Students() {

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchStudents = async () => {
        setLoading(true)
        const res = await axios.get('/api/student/all')
        setStudents(res.data)
        console.log(res.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Students</h1>
            <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-primary">Add Student</button>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Enter student name"/>
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
                    loading ? <Loader /> : 
                    students.map((student, index) => (
                        <tr key={student._id} class="table-secondary text-center">
                            <th scope="row">{index + 1}</th>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.username}</td>
                            <td>
                                <button type="button" class="mx-2 btn btn-warning">Update</button>
                                <button type="button" class="mx-2 btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    )
}

export default Students