import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'

function Teachers() {

    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchTeachers = async () => {
        setLoading(true)
        const res = await axios.get('http://localhost:3000/teacher/all')
        setTeachers(res.data)
        console.log(res.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    return (
        <div>
            <h1 className="display-4 mt-2 mb-5 text-center">Teachers</h1>
            <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-primary">Add Teacher</button>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Enter teacher name"/>
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
                    loading ? <Loader /> : 
                    teachers.map((teacher, index) => (
                        <tr key={teacher._id} class="table-secondary text-center">
                            <th scope="row">{index + 1}</th>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.username}</td>
                            <td>{teacher.contactno}</td>
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

export default Teachers