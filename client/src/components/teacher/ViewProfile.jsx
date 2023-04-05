import React, {useEffect, useState} from 'react'

function ViewProfile() {

    const [teacher, setTeacher] = useState('');

    const getProfile = () => {
        const info = JSON.parse(localStorage.getItem('info'))
        console.log(info)
        setTeacher(info)
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Name: {teacher.name}</h5>
                            <h6 className='card-subtitle mb-2 text-muted'>Email: {teacher.email}</h6>
                            <p className='card-text'>Phone: {teacher.contactno}</p>
                            <p className='card-text'>Address: {teacher.address}</p>
                            <p className='card-text'>Age: {teacher.age}</p>
                            <p className='card-text'>Gender: {teacher.gender}</p>
                            <p className='card-text'>Image: 
                                <img src={teacher.profile} alt='profile' />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile