import React from 'react'

function Statistics({student}) {
  return (
    <div>
      <h3 className='text-center my-3'>Statistics</h3>
      <table class="table table-hover text-center">
        <thead class='table-dark'>
          <tr>
            <th scope="col">Key</th>
            <th scope="col">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>{student.name}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{student.email}</td>
          </tr>
          <tr>
            <th scope="row">Username</th>
            <td>{student.username}</td>
          </tr>
          <tr>
            <th scope="row">Role</th>
            <td>{student.role}</td>
          </tr>
          <tr>
            <th scope="row">Verified</th>
            <td>{JSON.stringify(student.isVerified)}</td>
          </tr>
          <tr>
            <th scope="row">Password</th>
            <td>{student.password}</td>
          </tr>
        </tbody>
      </table>  
    </div>
  )
}

export default Statistics