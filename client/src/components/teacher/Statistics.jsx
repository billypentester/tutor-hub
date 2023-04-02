import React from 'react'

function Statistics({teacher}) {
  return (
    <div>
      <h3 className='text-center my-3'>Statistics</h3>
      <table className="table table-hover text-center">
        <thead className='table-dark'>
          <tr>
            <th scope="col">Key</th>
            <th scope="col">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>{teacher.name}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{teacher.email}</td>
          </tr>
          <tr>
            <th scope="row">Username</th>
            <td>{teacher.username}</td>
          </tr>
          <tr>
            <th scope="row">Role</th>
            <td>{teacher.role}</td>
          </tr>
          <tr>
            <th scope="row">Verified</th>
            <td>{JSON.stringify(teacher.isVerified)}</td>
          </tr>
          <tr>
            <th scope="row">Password</th>
            <td>{teacher.password}</td>
          </tr>
        </tbody>
      </table>  
    </div>
  )
}

export default Statistics